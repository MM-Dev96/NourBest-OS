# NourBest OS architecture

NourBest uses one product identity with platform-specific delivery instead of claiming that locked vendor kernels can be merged.

## Layers

1. **Nour Shell** — adaptive Arabic interface, application lifecycle, window management, search, settings, and offline runtime.
2. **Nour Local Services** — notes, tasks, virtual files, import/export, preferences, and update coordination.
3. **Web/PWA adapter** — iOS, iPadOS, Android, HarmonyOS, Windows, macOS, and Linux browser installation.
4. **Nour Linux adapter** — Debian Live userspace, hardware drivers supplied by Linux, local HTTP shell host, and future native application bridges.
5. **Compatibility adapters** — planned Waydroid and Wine integrations on supported Linux installations; these are never advertised as available until built and tested.

## Platform truth table

| Capability | iOS PWA | Android/Harmony PWA | Windows PWA | Nour Linux |
|---|---:|---:|---:|---:|
| Offline shell | Yes | Yes | Yes | Yes |
| Notes/tasks/files | Yes | Yes | Yes | Yes |
| Native filesystem bridge | Limited | Limited | Limited | Planned native service |
| Replace vendor kernel | No | Device-specific | No | Yes, by booting the ISO |
| Android app compatibility | No | Host OS only | No | Planned via Waydroid |
| Windows app compatibility | No | No | Host OS only | Planned via Wine |

The project reports unavailable capabilities honestly and provides the closest supported adapter for each platform.
