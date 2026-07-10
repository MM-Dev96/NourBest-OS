#!/usr/bin/env bash
set -euo pipefail
if [[ $(uname -m) != "x86_64" && $(uname -m) != "aarch64" ]]; then
  echo "Waydroid requires x86_64 or ARM64." >&2
  exit 1
fi
if ! grep -q binder /proc/filesystems 2>/dev/null && [[ ! -e /dev/binderfs ]]; then
  echo "This kernel does not expose Android binder support. Install a compatible kernel first." >&2
  exit 1
fi
sudo apt-get update
sudo apt-get install -y curl ca-certificates
curl -s https://repo.waydro.id | sudo bash
sudo apt-get install -y waydroid
sudo waydroid init
echo "Waydroid initialized. Start it with: waydroid session start"
