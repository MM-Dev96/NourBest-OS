#!/usr/bin/env bash
set -euo pipefail

PORT=8765
python3 -m http.server "$PORT" --directory /opt/nourbest-os >/tmp/nourbest-http.log 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT

for _ in $(seq 1 30); do
  if python3 -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:$PORT/', timeout=1)" >/dev/null 2>&1; then
    break
  fi
  sleep 0.1
done

exec chromium --app="http://127.0.0.1:$PORT/" --start-maximized --no-first-run --disable-session-crashed-bubble
