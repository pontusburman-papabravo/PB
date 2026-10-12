#!/bin/bash
# Republish a kept release and pause automatic publishes.
# Usage, on the VPS: deploy/rollback.sh <full git sha>
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
exec /bin/bash "${here}/publish.sh" --rollback "$@"
