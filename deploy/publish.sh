#!/bin/bash
# Publish origin/main to papabravo.se. # pragma: allowlist secret
#
# Runs on the VPS as the papabravo user, from cron. It builds the site and # pragma: allowlist secret
# asks /usr/local/sbin/papabravo-caddy-apply to swap the tree into the Caddy # pragma: allowlist secret
# volume. That helper is the only privileged command used here.
#
# Körpasset is left alone. This script does not edit a Caddyfile, reload
# Caddy, or touch Körpasset's containers or volumes. papabravo-caddy-apply # pragma: allowlist secret
# refuses a reload that would change Körpasset's certificate policy. The
# file swap has already finished by then, so the refusal is a successful
# publish. Do not call /usr/local/sbin/papabravo-deploy: it treats that # pragma: allowlist secret
# refusal as failure and puts the previous tree back.
#
#   deploy/publish.sh              publish origin/main when CI is green
#   deploy/publish.sh --dry-run    show the decision, change nothing
#   deploy/publish.sh --rollback <sha>
#                                  republish a kept release and pause cron

set -euo pipefail

if [[ -z "${PAPA_PUBLISH_EXEC:-}" ]]; then
  export PAPA_PUBLISH_EXEC=1
  copy="$(mktemp)"
  cp "$0" "$copy"
  exec /bin/bash "$copy" "$@"
fi

if [[ "${PAPA_PUBLISH_EXEC:-}" == "1" && "$0" == /tmp/* ]]; then
  trap 'rm -f -- "$0"' EXIT
fi

export PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
export npm_config_update_notifier=false
export ASTRO_TELEMETRY_DISABLED=1
export LANG="${LANG:-C.UTF-8}"
umask 022

SRC="${HOME}/src"
WEB="/var/www/papabravo" # pragma: allowlist secret
RELEASES="${HOME}/releases"
STATE="${HOME}/state"
LOG_DIR="${HOME}/log"
APPLY="/usr/local/sbin/papabravo-caddy-apply" # pragma: allowlist secret
SITE_HOST="papabravo.se" # pragma: allowlist secret
KEEP_RELEASES=5

usage() {
  echo "usage: deploy/publish.sh [--dry-run | --rollback <40-char sha>]" >&2
  exit 2
}

note() {
  local msg="$1"
  local key file
  mkdir -p "$STATE"
  key="$(printf '%s' "$msg" | sha256sum | awk '{print $1}')"
  file="$STATE/last-note"
  if [[ -f "$file" ]] && [[ "$(cat "$file")" == "$key" ]]; then
    return 0
  fi
  printf '%s\n' "$key" > "$file"
  printf '%s %s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$msg"
}

require_server() {
  if [[ ! -d "$WEB" || ! -x "$APPLY" || ! -d "$SRC/.git" ]]; then
    echo "publish.sh runs on the Papa Bravo VPS, as the site user" >&2
    exit 1
  fi
}

origin_slug() {
  local url path
  url="$(git -C "$SRC" remote get-url origin)"
  case "$url" in
    *github.com[:/]*) ;;
    *)
      echo "origin is not a GitHub URL" >&2
      exit 1
      ;;
  esac
  path="${url#*github.com[:/]}"
  path="${path%.git}"
  case "$path" in
    */PB) printf '%s\n' "$path" ;;
    *)
      echo "origin must be the PB repository" >&2
      exit 1
      ;;
  esac
}

ensure_schedule() {
  local wrapper line current filtered
  if [[ ! -f "$SRC/deploy/publish.sh" ]]; then
    return 0
  fi
  mkdir -p "${HOME}/bin" "$LOG_DIR" "$STATE" "$RELEASES"
  wrapper="${HOME}/bin/papa-publish"
  cat > "$wrapper" << EOF
#!/bin/bash
set -euo pipefail
export PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
exec /bin/bash "\${HOME}/src/deploy/publish.sh"
EOF
  chmod 755 "$wrapper"
  line="* * * * * ${wrapper} >> ${LOG_DIR}/publish.log 2>&1"
  current="$(crontab -l 2>/dev/null || true)"
  if [[ "$current" == *"${wrapper}"* && "$current" == *'MAILTO=""'* ]]; then
    return 0
  fi
  filtered="$(printf '%s\n' "$current" | grep -v 'papa-publish' | grep -v '^MAILTO=' || true)"
  {
    printf '%s\n' 'MAILTO=""'
    if [[ -n "$filtered" ]]; then
      printf '%s\n' "$filtered"
    fi
    printf '%s\n' "$line"
  } | crontab -
  note "installed cron ${line}"
}

sync_tree() {
  local src="$1" dest="$2" link
  mkdir -p "$dest"
  rsync -a --delete "${src}/" "${dest}/"
  link="$(find "$dest" -xdev -type l -print -quit || true)"
  if [[ -n "$link" ]]; then
    echo "refusing symlink ${link}" >&2
    return 1
  fi
}

release_ready() {
  local dir="$1"
  [[ -f "${dir}/index.html" && -f "${dir}/consulting.html" && -f "${dir}/404.html" ]] || return 1
  [[ -f "${dir}/sv.html" || -f "${dir}/sv/index.html" ]] || return 1
  [[ -f "${dir}/cv/Pontus_Burman_CV_sv.pdf" && -f "${dir}/cv/Pontus_Burman_CV_en.pdf" ]] || return 1
}

classify_apply() {
  local status="$1" out="$2"
  if grep -q "already running" "$out"; then
    printf 'busy\n'
    return 0
  fi
  if grep -q "apply is blocked" "$out"; then
    printf 'fail\n'
    return 0
  fi
  if [[ "$status" -eq 0 ]]; then
    printf 'ok\n'
    return 0
  fi
  if grep -F -q "Körpasset certificate policy would change" "$out"; then
    printf 'ok\n'
    return 0
  fi
  printf 'fail\n'
}

apply_site() {
  local attempt status verdict out
  out="$STATE/apply.out"
  for attempt in 1 2 3 4 5 6; do
    set +e
    sudo -n "$APPLY" >"$out" 2>&1
    status=$?
    set -e
    verdict="$(classify_apply "$status" "$out")"
    case "$verdict" in
      ok) return 0 ;;
      busy) sleep 5 ;;
      *)
        echo "caddy apply failed:" >&2
        cat "$out" >&2
        return 1
        ;;
    esac
  done
  echo "caddy apply stayed busy" >&2
  return 1
}

http_get() {
  local url="$1" dest="$2"
  curl -sS --http1.1 --max-time 20 \
    --resolve "${SITE_HOST}:443:127.0.0.1" \
    -o "$dest" \
    -w '%{http_code}' \
    "$url"
}

smoke() {
  local sha="$1" attempt
  for attempt in 1 2 3 4 5; do
    if smoke_once "$sha"; then
      return 0
    fi
    sleep 1
  done
  echo "smoke test failed for ${sha}" >&2
  return 1
}

smoke_once() {
  local sha="$1" code pdf
  code="$(http_get "https://${SITE_HOST}/" "$STATE/home.html")" || return 1
  [[ "$code" == "200" ]] || return 1
  grep -q "name=\"papa-deploy\" content=\"${sha}\"" "$STATE/home.html" || return 1
  code="$(http_get "https://${SITE_HOST}/sv" "$STATE/sv.html")" || return 1
  [[ "$code" == "200" ]] || return 1
  grep -q "name=\"papa-deploy\" content=\"${sha}\"" "$STATE/sv.html" || return 1
  for pdf in Pontus_Burman_CV_sv.pdf Pontus_Burman_CV_en.pdf; do
    code="$(http_get "https://${SITE_HOST}/cv/${pdf}" "$STATE/${pdf}")" || return 1
    [[ "$code" == "200" ]] || return 1
    [[ "$(head -c 5 "$STATE/${pdf}")" == "%PDF-" ]] || return 1
  done
}

home_ok() {
  local code
  code="$(http_get "https://${SITE_HOST}/" "$STATE/home.html")" || return 1
  [[ "$code" == "200" ]]
}

restore_snapshot() {
  if [[ ! -f "$RELEASES/previous-web/index.html" ]]; then
    echo "no previous web root to restore" >&2
    return 1
  fi
  sync_tree "$RELEASES/previous-web" "$WEB"
  apply_site
}

prune_releases() {
  local keep_extra="${1:-}" dir name
  local -a dirs=()
  while IFS= read -r dir; do
    name="$(basename "$dir")"
    [[ "$name" =~ ^[0-9a-f]{40}$ ]] || continue
    dirs+=("$name")
  done < <(find "$RELEASES" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' | sort -nr | awk '{print $2}')
  local kept=0 name
  for name in "${dirs[@]}"; do
    if [[ "$name" == "$keep_extra" ]]; then
      continue
    fi
    kept=$((kept + 1))
    if (( kept > KEEP_RELEASES )); then
      rm -rf "${RELEASES}/${name}"
    fi
  done
}

ci_decision() {
  local sha="$1" slug code
  slug="$(origin_slug)"
  code="$(curl -sS --max-time 20 -o "$STATE/checks.json" -w '%{http_code}' \
    -H 'Accept: application/vnd.github+json' \
    -H 'User-Agent: papa-bravo-publish' \
    "https://api.github.com/repos/${slug}/commits/${sha}/check-runs?per_page=100")" || {
    printf 'wait\n'
    return 0
  }
  if [[ "$code" != "200" ]]; then
    printf 'wait\n'
    return 0
  fi
  python3 - "$STATE/checks.json" << 'PY'
import json, sys
data = json.load(open(sys.argv[1]))
def is_test(run):
    name = run.get("name") or ""
    return name == "test" or name.endswith("/ test")

runs = [run for run in data.get("check_runs") or [] if is_test(run)]
if not runs or any(run.get("status") != "completed" for run in runs):
    print("wait")
else:
    latest = max(runs, key=lambda run: run.get("started_at") or "")
    print("ok" if latest.get("conclusion") == "success" else "fail")
PY
}

recent() {
  local file="$1" limit="$2" now stamp
  [[ -f "$file" ]] || return 1
  now="$(date +%s)"
  stamp="$(stat -c %Y "$file")"
  if (( now - stamp < limit )); then
    return 0
  fi
  return 1
}

build_release() {
  local sha="$1" rel="$2"
  git -C "$SRC" checkout -f -B main "$sha"
  git -C "$SRC" clean -fd
  export DEPLOY_SHA="$sha"
  if ! timeout 20m npm ci --prefix "$SRC"; then
    return 1
  fi
  if ! timeout 10m npm run build --prefix "$SRC"; then
    return 1
  fi
  rm -rf "$rel"
  mkdir -p "$rel"
  sync_tree "$SRC/dist" "$rel"
  release_ready "$rel"
}

publish_sha() {
  local sha="$1" rel="$RELEASES/$sha"
  mkdir -p "$RELEASES" "$STATE"
  if ! release_ready "$rel"; then
    if ! build_release "$sha" "$rel"; then
      touch "$STATE/build-failed-${sha}"
      note "build failed for ${sha}; retrying after five minutes"
      exit 0
    fi
  fi
  if ! release_ready "$rel"; then
    note "release ${sha} is missing pages or CV files"
    exit 1
  fi
  rm -rf "$RELEASES/previous-web"
  mkdir -p "$RELEASES/previous-web"
  sync_tree "$WEB" "$RELEASES/previous-web"
  sync_tree "$rel" "$WEB"
  if ! apply_site || ! smoke "$sha"; then
    echo "publish failed; restoring the previous site" >&2
    restore_snapshot || true
    home_ok || echo "restored site did not answer 200" >&2
    printf '%s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" > "$STATE/publish-failed-${sha}"
    note "publish failed for ${sha}; previous site restored; remove ${STATE}/publish-failed-${sha} to retry"
    exit 0
  fi
  printf '%s\n' "$sha" > "$STATE/published"
  rm -f "$STATE/build-failed-${sha}" "$STATE/ci-failed-${sha}"
  prune_releases "$sha"
  note "published ${sha}"
}

rollback() {
  local sha="$1"
  [[ "$sha" =~ ^[0-9a-f]{40}$ ]] || usage
  if [[ ! -f "$RELEASES/$sha/index.html" ]]; then
    echo "no kept release ${sha} under ${RELEASES}" >&2
    exit 1
  fi
  if ! release_ready "$RELEASES/$sha"; then
    echo "release ${sha} is incomplete" >&2
    exit 1
  fi
  rm -rf "$RELEASES/previous-web"
  mkdir -p "$RELEASES/previous-web"
  sync_tree "$WEB" "$RELEASES/previous-web"
  if ! sync_tree "$RELEASES/$sha" "$WEB" || ! apply_site || ! smoke "$sha"; then
    echo "rollback failed; restoring the site that was live" >&2
    restore_snapshot || true
    exit 1
  fi
  printf '%s\n' "$sha" > "$STATE/hold"
  printf '%s\n' "$sha" > "$STATE/published"
  note "rolled back to ${sha}; automatic publish paused until ${STATE}/hold is removed"
}

main() {
  local mode="publish" sha decision
  case "${1:-}" in
    "") mode="publish" ;;
    --dry-run) mode="dry-run" ;;
    --rollback)
      [[ $# -eq 2 ]] || usage
      mode="rollback"
      sha="$2"
      ;;
    *) usage ;;
  esac

  require_server
  mkdir -p "$STATE" "$RELEASES"
  exec 9>"$STATE/publish.lock"
  if [[ "$mode" == "publish" || "$mode" == "dry-run" ]]; then
    flock -n 9 || exit 0
  else
    flock -w 60 9
  fi

  if [[ "$mode" != "dry-run" ]]; then
    ensure_schedule
  fi

  if [[ "$mode" == "rollback" ]]; then
    rollback "$sha"
    return 0
  fi

  if [[ -f "$STATE/hold" ]]; then
    note "automatic publish paused by ${STATE}/hold"
    return 0
  fi

  if ! git -C "$SRC" fetch --prune origin main; then
    note "git fetch failed"
    return 0
  fi
  sha="$(git -C "$SRC" rev-parse origin/main)"
  [[ "$sha" =~ ^[0-9a-f]{40}$ ]] || {
    note "origin/main is not a commit sha"
    return 0
  }
  if [[ -f "$STATE/published" && "$(cat "$STATE/published")" == "$sha" ]]; then
    return 0
  fi
  if [[ -f "$STATE/publish-failed-${sha}" ]]; then
    note "publish failed for ${sha}; previous site restored; remove ${STATE}/publish-failed-${sha} to retry"
    return 0
  fi
  if recent "$STATE/ci-failed-${sha}" 300 || recent "$STATE/build-failed-${sha}" 300; then
    return 0
  fi

  decision="$(ci_decision "$sha")"
  case "$decision" in
    wait)
      note "waiting for the test check on ${sha}"
      return 0
      ;;
    fail)
      touch "$STATE/ci-failed-${sha}"
      note "CI failed for ${sha}; not publishing"
      return 0
      ;;
    ok) ;;
    *)
      note "unexpected CI decision ${decision}"
      return 0
      ;;
  esac

  if [[ "$mode" == "dry-run" ]]; then
    printf 'would publish %s\n' "$sha"
    return 0
  fi

  publish_sha "$sha"
}

main "$@"
