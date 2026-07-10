#!/usr/bin/env bash
set -euo pipefail

if [[ ${EUID:-$(id -u)} -ne 0 ]]; then
  echo "Run this build as root: sudo ./linux/build-image.sh" >&2
  exit 1
fi
if ! command -v lb >/dev/null 2>&1; then
  echo "Missing live-build. Install it with: apt install live-build" >&2
  exit 1
fi

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
BUILD_DIR=${NOURBEST_BUILD_DIR:-"$ROOT_DIR/.build/linux-live"}
mkdir -p "$BUILD_DIR"
cd "$BUILD_DIR"

lb clean --purge || true
lb config \
  --architectures amd64 \
  --distribution bookworm \
  --archive-areas "main contrib non-free-firmware" \
  --binary-images iso-hybrid \
  --bootappend-live "boot=live components quiet splash username=nourbest hostname=nourbest-os" \
  --iso-application "NourBest OS" \
  --iso-publisher "NourBest Project" \
  --iso-volume "NOURBEST_OS"

mkdir -p config/package-lists config/includes.chroot/opt/nourbest-os config/includes.chroot/etc/skel/.config/autostart
cat > config/package-lists/nourbest.list.chroot <<'PACKAGES'
task-xfce-desktop
chromium
network-manager
network-manager-gnome
sudo
curl
git
flatpak
pipewire-audio
fonts-noto-core
fonts-noto-color-emoji
PACKAGES

cp "$ROOT_DIR/index.html" "$ROOT_DIR/styles.css" "$ROOT_DIR/app.js" "$ROOT_DIR/sw.js" "$ROOT_DIR/manifest.webmanifest" config/includes.chroot/opt/nourbest-os/
cp -R "$ROOT_DIR/icons" config/includes.chroot/opt/nourbest-os/

cat > config/includes.chroot/etc/skel/.config/autostart/nourbest.desktop <<'DESKTOP'
[Desktop Entry]
Type=Application
Name=NourBest OS Shell
Exec=chromium --app=file:///opt/nourbest-os/index.html --start-maximized --no-first-run
X-GNOME-Autostart-enabled=true
DESKTOP

lb build
echo "NourBest OS image created at: $BUILD_DIR/live-image-amd64.hybrid.iso"
