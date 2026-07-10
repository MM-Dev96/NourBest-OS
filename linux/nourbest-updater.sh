#!/usr/bin/env bash
set -euo pipefail
if command -v zenity >/dev/null 2>&1; then
  pkexec sh -c 'apt-get update && DEBIAN_FRONTEND=noninteractive apt-get -y full-upgrade' 2>&1 | zenity --progress --pulsate --auto-close --title="NourBest Update" --text="جارٍ تحديث النظام…"
  zenity --info --text="اكتمل تحديث NourBest OS"
else
  sudo apt-get update
  sudo apt-get -y full-upgrade
fi
