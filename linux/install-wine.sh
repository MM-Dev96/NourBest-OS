#!/usr/bin/env bash
set -euo pipefail
sudo dpkg --add-architecture i386
sudo apt-get update
sudo apt-get install -y wine wine32 wine64 winetricks
wine --version
echo "Wine is ready. Run Windows programs with: wine program.exe"
