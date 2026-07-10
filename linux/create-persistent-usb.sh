#!/usr/bin/env bash
set -euo pipefail
ISO=${1:-}
DEVICE=${2:-}
if [[ -z "$ISO" || -z "$DEVICE" || ! -f "$ISO" || ! -b "$DEVICE" ]]; then
  echo "Usage: sudo $0 live-image-amd64.hybrid.iso /dev/sdX" >&2
  exit 1
fi
echo "WARNING: all data on $DEVICE will be erased. Type the full device path to continue:"
read -r confirmation
[[ "$confirmation" == "$DEVICE" ]] || { echo "Cancelled"; exit 1; }
umount "${DEVICE}"* 2>/dev/null || true
dd if="$ISO" of="$DEVICE" bs=4M status=progress conv=fsync
partprobe "$DEVICE"
start=$(parted -ms "$DEVICE" unit MiB print free | awk -F: '$5=="free;" {gsub("MiB","",$2); value=$2} END {print int(value)+1}')
parted -s "$DEVICE" mkpart primary ext4 "${start}MiB" 100%
partition=$(lsblk -lnpo NAME "$DEVICE" | tail -n1)
mkfs.ext4 -F -L persistence "$partition"
mount_dir=$(mktemp -d)
mount "$partition" "$mount_dir"
echo "/ union" > "$mount_dir/persistence.conf"
sync
umount "$mount_dir"
rmdir "$mount_dir"
echo "Persistent NourBest USB created on $DEVICE"
