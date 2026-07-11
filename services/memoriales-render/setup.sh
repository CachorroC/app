#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

python3 -m venv .venv
.venv/bin/pip install --upgrade pip
.venv/bin/pip install -r requirements.txt
.venv/bin/pip freeze > requirements.lock

echo "Done. Run with:"
echo "  .venv/bin/uvicorn render_service:app --host 127.0.0.1 --port 8787 --reload"
