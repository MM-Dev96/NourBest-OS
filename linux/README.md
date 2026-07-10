# NourBest OS Linux image

This directory provides the native boot path. The build uses Debian Live rather than pretending a web application is a hardware kernel.

## Host requirements

- Debian 12/13 or a compatible Ubuntu host
- `live-build`, `debootstrap`, `xorriso`, and root privileges
- At least 12 GB free disk and an internet connection for Debian packages

## Build

```bash
sudo apt update
sudo apt install live-build debootstrap xorriso
sudo ./linux/build-image.sh
```

The resulting `live-image-amd64.hybrid.iso` boots in BIOS and UEFI environments. Test it in QEMU before real hardware:

```bash
qemu-system-x86_64 -m 4096 -enable-kvm -cdrom live-image-amd64.hybrid.iso
```

## Architecture roadmap

1. **Nour Shell:** the universal interface already shipped in the repository.
2. **Nour Linux:** Debian-based live/installable desktop for x86-64 and later ARM64.
3. **Compatibility:** Waydroid for Android applications and Wine for selected Windows applications, enabled only on supported Linux hardware.
4. **Mobile delivery:** standards-based PWA on locked devices; optional native wrappers can expose approved platform APIs.

Apple does not permit a third-party OS to replace iOS on retail iPhones. On iPhone, NourBest runs as an installed web app within Apple's security model.
