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
ARCH=${NOURBEST_ARCH:-amd64}
case "$ARCH" in amd64|arm64) ;; *) echo "Supported architectures: amd64, arm64" >&2; exit 1;; esac
mkdir -p "$BUILD_DIR"
cd "$BUILD_DIR"

lb clean --purge || true
lb config \
  --architectures "$ARCH" \
  --distribution bookworm \
  --archive-areas "main contrib non-free-firmware" \
  --binary-images iso-hybrid \
  --debian-installer live \
  --bootappend-live "boot=live components persistence quiet splash username=nourbest hostname=nourbest-os" \
  --iso-application "NourBest OS" \
  --iso-publisher "NourBest Project" \
  --iso-volume "NOURBEST_OS"

mkdir -p config/package-lists config/includes.chroot/opt/nourbest-os config/includes.chroot/etc/skel/.config/autostart config/includes.chroot/usr/local/lib/nourbest config/includes.chroot/usr/share/xsessions config/includes.chroot/etc/lightdm/lightdm.conf.d config/includes.chroot/usr/share/applications
cat > config/package-lists/nourbest.list.chroot <<'PACKAGES'
task-xfce-desktop
chromium
python3
network-manager
network-manager-gnome
sudo
curl
git
flatpak
debian-installer-launcher
thunar
xfce4-terminal
xfce4-settings
zenity
policykit-1
pipewire-audio
fonts-noto-core
fonts-noto-color-emoji
PACKAGES

cp "$ROOT_DIR/index.html" "$ROOT_DIR/styles.css" "$ROOT_DIR/app.js" "$ROOT_DIR/storage-db.js" "$ROOT_DIR/plugin-api.js" "$ROOT_DIR/sw.js" "$ROOT_DIR/manifest.webmanifest" "$ROOT_DIR/release.json" config/includes.chroot/opt/nourbest-os/
cp -R "$ROOT_DIR/icons" "$ROOT_DIR/plugins" "$ROOT_DIR/vendor" "$ROOT_DIR/screenshots" config/includes.chroot/opt/nourbest-os/
install -m 0755 "$ROOT_DIR/linux/nourbest-session.sh" config/includes.chroot/usr/local/bin/nourbest-session
install -m 0755 "$ROOT_DIR/linux/native_bridge.py" config/includes.chroot/usr/local/lib/nourbest/native_bridge.py
install -m 0755 "$ROOT_DIR/linux/install-to-disk.sh" config/includes.chroot/usr/local/bin/nourbest-install
install -m 0755 "$ROOT_DIR/linux/install-wine.sh" config/includes.chroot/usr/local/bin/nourbest-install-wine
install -m 0755 "$ROOT_DIR/linux/install-waydroid.sh" config/includes.chroot/usr/local/bin/nourbest-install-waydroid
install -m 0755 "$ROOT_DIR/linux/nourbest-updater.sh" config/includes.chroot/usr/local/bin/nourbest-update

cat > config/includes.chroot/etc/skel/.config/autostart/nourbest.desktop <<'DESKTOP'
[Desktop Entry]
Type=Application
Name=NourBest OS Shell
Exec=/usr/local/bin/nourbest-session
X-GNOME-Autostart-enabled=true
DESKTOP

cat > config/includes.chroot/usr/share/xsessions/nourbest.desktop <<'SESSION'
[Desktop Entry]
Name=NourBest OS
Comment=NourBest native hybrid shell
Exec=/usr/local/bin/nourbest-session
TryExec=/usr/local/bin/nourbest-session
Type=Application
DesktopNames=NourBest
SESSION

cat > config/includes.chroot/etc/lightdm/lightdm.conf.d/50-nourbest.conf <<'LIGHTDM'
[Seat:*]
autologin-user=nourbest
autologin-user-timeout=0
user-session=nourbest
autologin-session=nourbest
LIGHTDM

cat > config/includes.chroot/usr/share/applications/nourbest-installer.desktop <<'INSTALLER'
[Desktop Entry]
Type=Application
Name=Install NourBest OS
Name[ar]=تثبيت NourBest OS
Exec=/usr/local/bin/nourbest-install
Icon=drive-harddisk
Categories=System;
INSTALLER

cat > config/includes.chroot/usr/share/applications/nourbest-update.desktop <<'UPDATER'
[Desktop Entry]
Type=Application
Name=NourBest Update
Name[ar]=تحديث NourBest OS
Exec=/usr/local/bin/nourbest-update
Icon=system-software-update
Categories=System;
UPDATER

lb build
echo "NourBest OS image created in: $BUILD_DIR (architecture: $ARCH)"
