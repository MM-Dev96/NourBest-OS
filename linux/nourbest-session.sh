#!/usr/bin/env bash
set -euo pipefail

PORT=8765
xfsettingsd >/tmp/nourbest-xfsettings.log 2>&1 &
xfwm4 --replace >/tmp/nourbest-xfwm.log 2>&1 &
python3 /usr/local/lib/nourbest/native_bridge.py >/tmp/nourbest-http.log 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT

for _ in $(seq 1 30); do
  if python3 -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:$PORT/', timeout=1)" >/dev/null 2>&1; then
    break
  fi
  sleep 0.1
done

exec chromium --app="http://127.0.0.1:$PORT/" --start-maximized --no-first-run --disable-session-crashed-bubble
