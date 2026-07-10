# NourBest OS 3.0

NourBest OS is an Arabic-first, offline-capable universal workspace. It combines a responsive desktop shell with a Progressive Web App delivery model, so the same experience can be installed on iOS, Android, HarmonyOS, Windows, Linux, and modern browsers.

## What is real today

- Adaptive desktop/mobile shell with window management
- App launcher, command search, control center, lock screen, calendar, and notifications
- Hierarchical local files with folders, move/copy, favorites, trash, import/export and content search
- Notes with Markdown preview, tags, folders, templates and version history; recurring tasks with subtasks, reminders and calendar
- Scientific calculator, timers, unit converter, audio player, recorder and offline QR generator
- Three virtual desktops, resizable/snap-capable windows, task switcher, previews and session restoration
- Local-first IndexedDB persistence, snapshots, full JSON backup/restore and per-app storage diagnostics
- Offline cache through a service worker
- Installable PWA manifest and platform icons
- Desktop packages for Windows, macOS and Linux through Electron build workflows
- Installable Debian Live image source for x86-64/ARM64 with a native file/application bridge, updater, installer, persistent USB helper, Wine and Waydroid setup helpers

## Platform model

| Platform | Delivery | Capability |
|---|---|---|
| iPhone / iPad | Install from Safari as a PWA | NourBest interface and local apps; does not replace the protected iOS kernel |
| Android / HarmonyOS | Installable PWA | Full shell plus browser-permitted device APIs |
| Windows / macOS | PWA or generated Electron package | Desktop shell and local-first apps |
| Linux x86-64 / ARM64 | PWA, desktop package, or Debian Live image | Native boot path, Linux userspace and allowlisted native bridge |

No project can legally merge proprietary iOS, Windows, Android, and HarmonyOS source code. NourBest OS instead uses a clean universal shell and open compatibility layers.

## Run locally

Service workers require HTTP rather than opening the file directly:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Validate

```bash
npm test
npm run test:e2e
```

The automated suite covers desktop, iPhone-sized and iPad-sized touch layouts, persistence, QR generation, overflow and serious accessibility violations.

## Build desktop packages

```bash
cd desktop
npm ci
npm run dist
```

The GitHub workflow produces AppImage, Windows NSIS and macOS DMG artifacts on their native runners.

## Build the Linux image

On Debian 12 or Ubuntu with `live-build` installed:

```bash
sudo apt install live-build
sudo ./linux/build-image.sh
```

The ISO workflow is intentionally isolated under `linux/`; see [linux/README.md](linux/README.md).

## Security principles

- Local-first data and explicit browser permissions
- No analytics, ads, remote fonts, CDN scripts, or hidden network calls
- Keyboard shortcuts ignore text inputs and editable controls
- No claim of kernel-level access on locked mobile platforms

## License

MIT — see [LICENSE](LICENSE).
