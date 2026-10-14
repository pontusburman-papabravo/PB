#!/usr/bin/env python3
"""Cookieless stats for the public site.

Records a page path and referring origin only. No cookie, no visitor id,
and no IP address. The collector listens on 127.0.0.1. Reports are ordinary
files under the site root, copied in by the existing apply helper, because
that helper will not add a reverse proxy and will not reload Caddy while a
reload would change Körpasset's certificate policy.

Token and report URL are written on the server, never in this repository.
"""

from __future__ import annotations

import argparse
import getpass
import html
import json
import os
import subprocess
import sys
import threading
from datetime import datetime, timedelta, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

PORT = 8791
KEEP_DAYS = 40
TOP = 20


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


def state_dir() -> Path:
    override = os.environ.get("PAPA_STATS_STATE")
    if override:
        return Path(override)
    return Path.home() / "state" / "stats"


def web_root() -> Path:
    override = os.environ.get("PAPA_WEB")
    if override:
        return Path(override)
    return Path("/var/www") / getpass.getuser()


def apply_bin() -> Path:
    return Path("/usr/local/sbin") / f"{getpass.getuser()}-caddy-apply"


def ensure_token(root: Path) -> str:
    root.mkdir(parents=True, exist_ok=True)
    path = root / "token"
    if path.exists():
        token = path.read_text().strip()
        if len(token) >= 32:
            return token
    token = os.urandom(32).hex()
    path.write_text(token + "\n")
    path.chmod(0o600)
    return token


def events_path(root: Path) -> Path:
    return root / "events.jsonl"


def parse_time(value: str) -> datetime:
    return datetime.fromisoformat(value.replace("Z", "+00:00"))


def clean_path(value: str) -> str:
    path = (value or "").split("?", 1)[0].split("#", 1)[0].strip()
    if not path.startswith("/") or "\\" in path or ".." in path.split("/"):
        raise ValueError("bad path")
    if len(path) > 200:
        raise ValueError("bad path")
    return path


def clean_referrer(value: str) -> str:
    raw = (value or "").strip()
    if not raw:
        return "(direct)"
    parts = urlparse(raw)
    if parts.scheme in ("http", "https") and parts.netloc and len(parts.netloc) <= 200:
        return f"{parts.scheme}://{parts.netloc}"
    return "(direct)"


def append_event(root: Path, path: str, referrer: str, when: datetime | None = None) -> None:
    root.mkdir(parents=True, exist_ok=True)
    event = {
        "t": (when or utcnow()).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "path": clean_path(path),
        "referrer": clean_referrer(referrer),
    }
    with events_path(root).open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(event, ensure_ascii=False) + "\n")


def load_events(root: Path, now: datetime) -> list[dict]:
    path = events_path(root)
    if not path.exists():
        return []
    cutoff = now - timedelta(days=KEEP_DAYS)
    kept: list[dict] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        try:
            event = json.loads(line)
            when = parse_time(event["t"])
        except (json.JSONDecodeError, KeyError, ValueError):
            continue
        if when >= cutoff:
            kept.append(event)
    serialized = "".join(json.dumps(event, ensure_ascii=False) + "\n" for event in kept)
    current = path.read_text(encoding="utf-8")
    if serialized != current:
        path.write_text(serialized, encoding="utf-8")
    return kept


def window(events: list[dict], now: datetime, days: int) -> dict:
    cutoff = now - timedelta(days=days)
    pages: dict[str, int] = {}
    referrers: dict[str, int] = {}
    total = 0
    for event in events:
        try:
            when = parse_time(event["t"])
        except (KeyError, ValueError):
            continue
        if when < cutoff:
            continue
        total += 1
        pages[event.get("path") or "/"] = pages.get(event.get("path") or "/", 0) + 1
        referrers[event.get("referrer") or "(direct)"] = referrers.get(event.get("referrer") or "(direct)", 0) + 1

    def ranked(bucket: dict[str, int], key: str) -> list[dict]:
        ordered = sorted(bucket.items(), key=lambda item: (-item[1], item[0]))[:TOP]
        return [{key: name, "pageviews": count} for name, count in ordered]

    return {
        "days": days,
        "pageviews": total,
        "pages": ranked(pages, "path"),
        "referrers": ranked(referrers, "referrer"),
    }


def report(events: list[dict], now: datetime | None = None) -> dict:
    now = now or utcnow()
    return {
        "generatedAt": now.strftime("%Y-%m-%dT%H:%M:%SZ"),
        "privacy": "page path and referring origin only; no cookie; no visitor id; no IP",
        "days": {
            "7": window(events, now, 7),
            "30": window(events, now, 30),
        },
    }


def csv_for(section: dict) -> str:
    lines = ["section,name,pageviews", f"pageviews,total,{section['pageviews']}"]
    for row in section["pages"]:
        lines.append(f"page,{csv_cell(row['path'])},{row['pageviews']}")
    for row in section["referrers"]:
        lines.append(f"referrer,{csv_cell(row['referrer'])},{row['pageviews']}")
    return "\n".join(lines) + "\n"


def csv_cell(value: str) -> str:
    if any(char in value for char in ",\"\n"):
        return '"' + value.replace('"', '""') + '"'
    return value


def dashboard(data: dict) -> str:
    def rows(items: list[dict], key: str) -> str:
        if not items:
            return "<tr><td colspan=\"2\">None yet</td></tr>"
        return "\n".join(
            f"<tr><td>{html.escape(item[key])}</td><td>{item['pageviews']}</td></tr>" for item in items
        )

    blocks = []
    for label in ("7", "30"):
        section = data["days"][label]
        blocks.append(
            f"<h2>Last {label} days</h2>"
            f"<p>Pageviews: {section['pageviews']}</p>"
            f"<h3>Top pages</h3><table><tbody>{rows(section['pages'], 'path')}</tbody></table>"
            f"<h3>Top referrers</h3><table><tbody>{rows(section['referrers'], 'referrer')}</tbody></table>"
        )
    return (
        "<!doctype html><html lang=\"en\"><meta charset=\"utf-8\">"
        "<title>Papa Bravo stats</title><h1>Papa Bravo stats</h1>"
        f"<p>Generated {html.escape(data['generatedAt'])}. Cookieless. No visitor id.</p>"
        + "".join(blocks)
    )


def write_public(root: Path, web: Path, host: str, data: dict) -> bool:
    token = ensure_token(root)
    dest = web / "stats-private" / token
    dest.mkdir(parents=True, exist_ok=True)
    files = {
        "stats.json": json.dumps(data, ensure_ascii=False, indent=2) + "\n",
        "7.json": json.dumps(data["days"]["7"], ensure_ascii=False, indent=2) + "\n",
        "30.json": json.dumps(data["days"]["30"], ensure_ascii=False, indent=2) + "\n",
        "7.csv": csv_for(data["days"]["7"]),
        "30.csv": csv_for(data["days"]["30"]),
        "index.html": dashboard(data),
    }
    changed = False
    existing = dest / "stats.json"
    if existing.exists():
        try:
            previous = json.loads(existing.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            previous = {}
        if previous.get("days") == data["days"]:
            files = {}
    for name, body in files.items():
        path = dest / name
        if not path.exists() or path.read_text(encoding="utf-8") != body:
            path.write_text(body, encoding="utf-8")
            changed = True
    if host:
        access = root / "access.txt"
        url = f"https://{host}/stats-private/{token}"
        text = "\n".join(
            [
                f"Dashboard: {url}/",
                f"JSON 7 and 30 days: {url}/stats.json",
                f"JSON last 7 days: {url}/7.json",
                f"JSON last 30 days: {url}/30.json",
                f"CSV last 7 days: {url}/7.csv",
                f"CSV last 30 days: {url}/30.csv",
                f"Token file: {root / 'token'}",
                "The path is the secret. There is no cookie and no password form.",
                "",
                f"curl -sS {url}/7.json",
                f"curl -sS {url}/30.json",
                f"curl -sS {url}/stats.json",
                "",
            ]
        )
        if not access.exists() or access.read_text(encoding="utf-8") != text:
            access.write_text(text, encoding="utf-8")
            access.chmod(0o600)
    return changed


def run_apply() -> None:
    binary = apply_bin()
    if not binary.exists():
        return
    completed = subprocess.run([ "sudo", "-n", str(binary) ], capture_output=True, text=True)
    output = (completed.stdout or "") + (completed.stderr or "")
    if completed.returncode == 0:
        return
    if "Körpasset certificate policy would change" in output:
        return
    sys.stderr.write(output)
    raise SystemExit(completed.returncode or 1)


def tick() -> None:
    root = state_dir()
    ensure_server(root)
    now = utcnow()
    data = report(load_events(root, now), now)
    host = os.environ.get("PAPA_SITE_HOST", "")
    if write_public(root, web_root(), host, data):
        run_apply()


def ensure_server(root: Path) -> None:
    if health():
        return
    root.mkdir(parents=True, exist_ok=True)
    proc = subprocess.Popen(
        [sys.executable, str(Path(__file__).resolve()), "--serve"],
        start_new_session=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    (root / "serve.pid").write_text(str(proc.pid) + "\n")
    for _ in range(20):
        if health():
            return
        threading.Event().wait(0.1)
    raise SystemExit("stats collector did not start")


def health() -> bool:
    import urllib.request

    try:
        with urllib.request.urlopen(f"http://127.0.0.1:{PORT}/health", timeout=0.5) as response:
            return response.status == 200
    except Exception:
        return False


class Handler(BaseHTTPRequestHandler):
    root: Path = Path(".")

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path == "/health":
            self.respond(200, b"ok\n", "text/plain")
            return
        if parsed.path != "/api/stats":
            self.respond(404, b"not found\n", "text/plain")
            return
        if not self.authorized():
            self.respond(401, b"unauthorized\n", "text/plain")
            return
        data = report(load_events(self.root, utcnow()))
        self.respond(200, json.dumps(data).encode(), "application/json")

    def do_POST(self) -> None:
        if urlparse(self.path).path != "/collect":
            self.respond(404, b"not found\n", "text/plain")
            return
        length = int(self.headers.get("Content-Length") or "0")
        if length > 2048:
            self.respond(413, b"too large\n", "text/plain")
            return
        try:
            body = json.loads(self.rfile.read(length) or b"{}")
            append_event(self.root, str(body.get("path") or ""), str(body.get("referrer") or ""))
        except (json.JSONDecodeError, ValueError):
            self.respond(400, b"bad request\n", "text/plain")
            return
        self.respond(204, b"", "text/plain")

    def authorized(self) -> bool:
        header = self.headers.get("Authorization") or ""
        token = ensure_token(self.root)
        return header == f"Bearer {token}"

    def respond(self, status: int, body: bytes, content_type: str) -> None:
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        if body:
            self.wfile.write(body)

    def log_message(self, fmt: str, *args) -> None:
        return


def serve() -> None:
    root = state_dir()
    root.mkdir(parents=True, exist_ok=True)
    ensure_token(root)
    Handler.root = root
    server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    server.serve_forever()


def self_test() -> None:
    import tempfile
    import urllib.request

    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp) / "state"
        web = Path(tmp) / "web"
        now = datetime(2026, 10, 14, 12, 0, tzinfo=timezone.utc)
        append_event(root, "/about?x=1", "https://example.com/a?q=1", now)
        append_event(root, "/about", "", now - timedelta(days=3))
        append_event(root, "/sv", "https://news.ycombinator.com/item", now - timedelta(days=10))
        append_event(root, "/old", "(direct)", now - timedelta(days=20))
        try:
            clean_path("/../etc/passwd")
            raise SystemExit("path traversal was accepted")
        except ValueError:
            pass
        data = report(load_events(root, now), now)
        week = data["days"]["7"]
        month = data["days"]["30"]
        if week["pageviews"] != 2 or month["pageviews"] != 4:
            raise SystemExit(f"unexpected counts {week['pageviews']} {month['pageviews']}")
        if week["pages"][0] != {"path": "/about", "pageviews": 2}:
            raise SystemExit(f"unexpected pages {week['pages']}")
        if week["referrers"][0]["referrer"] != "(direct)":
            raise SystemExit(f"unexpected referrers {week['referrers']}")
        if "example.com/a" in json.dumps(data):
            raise SystemExit("referrer query was stored")
        os.environ["PAPA_STATS_STATE"] = str(root)
        os.environ["PAPA_WEB"] = str(web)
        os.environ["PAPA_SITE_HOST"] = "example.test"
        write_public(root, web, "example.test", data)
        token = ensure_token(root)
        published = json.loads((web / "stats-private" / token / "7.json").read_text())
        if published["pageviews"] != 2:
            raise SystemExit("published 7.json mismatch")
        access = (root / "access.txt").read_text()
        if token not in access or "curl -sS https://example.test/stats-private/" not in access:
            raise SystemExit("access file is missing the curl example")
        if "Sprängarvägen" in access:
            raise SystemExit("access file picked up an unrelated address")

    # HTTP auth and collect, on the fixed local port if it is free.
    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp)
        Handler.root = root
        server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        port = server.server_address[1]
        token = ensure_token(root)
        body = json.dumps({"path": "/consulting", "referrer": "https://www.google.com/search?q=x"}).encode()
        request = urllib.request.Request(f"http://127.0.0.1:{port}/collect", data=body, method="POST")
        with urllib.request.urlopen(request, timeout=2) as response:
            if response.status != 204:
                raise SystemExit(f"collect status {response.status}")
        denied = urllib.request.Request(f"http://127.0.0.1:{port}/api/stats")
        try:
            urllib.request.urlopen(denied, timeout=2)
            raise SystemExit("unauthenticated stats read succeeded")
        except urllib.error.HTTPError as error:
            if error.code != 401:
                raise
        authed = urllib.request.Request(
            f"http://127.0.0.1:{port}/api/stats",
            headers={"Authorization": f"Bearer {token}"},
        )
        with urllib.request.urlopen(authed, timeout=2) as response:
            payload = json.loads(response.read().decode())
        server.shutdown()
        if payload["days"]["7"]["pageviews"] != 1:
            raise SystemExit("collector did not record the test pageview")
        if payload["days"]["7"]["referrers"][0]["referrer"] != "https://www.google.com":
            raise SystemExit("referrer origin was not kept")
    print("stats self-test ok")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--serve", action="store_true")
    parser.add_argument("--tick", action="store_true")
    parser.add_argument("--self-test", action="store_true")
    parser.add_argument("--record", metavar="PATH")
    parser.add_argument("--referrer", default="")
    args = parser.parse_args()
    if args.self_test:
        self_test()
    elif args.serve:
        serve()
    elif args.record:
        append_event(state_dir(), args.record, args.referrer)
    elif args.tick:
        tick()
    else:
        parser.error("choose --serve, --tick, --record or --self-test")


if __name__ == "__main__":
    main()
