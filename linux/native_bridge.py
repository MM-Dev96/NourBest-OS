#!/usr/bin/env python3
import json
import os
import platform
import shutil
import subprocess
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import parse_qs, urlparse

ROOT = Path("/opt/nourbest-os").resolve()
HOME = Path.home().resolve()
ALLOWED_APPS = {"files": "thunar", "terminal": "xfce4-terminal", "settings": "xfce4-settings-manager"}

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_json(self, payload, status=200):
        body = json.dumps(payload, ensure_ascii=False).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def safe_home_path(self, raw):
        candidate = (HOME / str(raw).lstrip("/")).resolve()
        if candidate != HOME and HOME not in candidate.parents:
            raise ValueError("path outside home")
        return candidate

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/system":
            total, used, free = shutil.disk_usage(HOME)
            return self.send_json({"native": True, "os": platform.platform(), "machine": platform.machine(), "home": str(HOME), "disk": {"total": total, "used": used, "free": free}})
        if parsed.path == "/api/files":
            try:
                path = self.safe_home_path(parse_qs(parsed.query).get("path", [""])[0])
                items = [{"name": item.name, "path": str(item.relative_to(HOME)), "folder": item.is_dir(), "size": item.stat().st_size, "modified": item.stat().st_mtime} for item in sorted(path.iterdir(), key=lambda p: (not p.is_dir(), p.name.lower()))]
                return self.send_json({"path": str(path.relative_to(HOME)) if path != HOME else "", "items": items})
            except Exception as error:
                return self.send_json({"error": str(error)}, 400)
        return super().do_GET()

    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", "0"))
            data = json.loads(self.rfile.read(length) or b"{}")
            if self.path == "/api/launch":
                command = ALLOWED_APPS.get(data.get("app"))
                if not command:
                    return self.send_json({"error": "unsupported app"}, 400)
                subprocess.Popen([command], start_new_session=True)
                return self.send_json({"ok": True})
            if self.path == "/api/open":
                path = self.safe_home_path(data.get("path", ""))
                subprocess.Popen(["xdg-open", str(path)], start_new_session=True)
                return self.send_json({"ok": True})
        except Exception as error:
            return self.send_json({"error": str(error)}, 400)
        self.send_error(404)

if __name__ == "__main__":
    ThreadingHTTPServer(("127.0.0.1", 8765), Handler).serve_forever()
