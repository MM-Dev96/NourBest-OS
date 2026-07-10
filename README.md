# NourBest OS

NourBest OS is an Arabic-first, offline-capable universal workspace. It combines a responsive desktop shell with a Progressive Web App delivery model, so the same experience can be installed on iOS, Android, HarmonyOS, Windows, Linux, and modern browsers.

## What is real today

- Adaptive desktop/mobile shell with window management
- App launcher, command search, control center, lock screen, calendar, and notifications
- Local Files UI, Notes, Tasks, Calculator, Terminal, Gallery, Settings, and a safe web launcher
- Local-first persistence for notes, tasks, theme, and accessibility preferences
- Offline cache through a service worker
- Installable PWA manifest and platform icons
- Debian Live build foundation for an x86-64 bootable ISO

## Platform model

| Platform | Delivery | Capability |
|---|---|---|
| iPhone / iPad | Install from Safari as a PWA | NourBest interface and local apps; does not replace the protected iOS kernel |
| Android / HarmonyOS | Installable PWA, future native wrapper | Full shell plus browser-permitted device APIs |
| Windows / macOS | Installable PWA, future desktop wrapper | Desktop shell and local-first apps |
| Linux x86-64 | PWA or Debian Live image | Native boot path and full Linux userspace |

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
```

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
