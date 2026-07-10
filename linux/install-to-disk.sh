#!/usr/bin/env bash
set -euo pipefail
if command -v debian-installer-launcher >/dev/null 2>&1; then
  exec pkexec debian-installer-launcher
fi
echo "Debian Installer launcher is not installed in this image. Rebuild NourBest OS with the installer package list." >&2
exit 1
