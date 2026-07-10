# NourBest OS architecture

NourBest uses one product identity with platform-specific delivery instead of claiming that locked vendor kernels can be merged.

## Layers

1. **Nour Shell** — adaptive Arabic interface, application lifecycle, window management, search, settings, and offline runtime.
2. **Nour Local Services** — notes, tasks, virtual files, import/export, preferences, and update coordination.
3. **Web/PWA adapter** — iOS, iPadOS, Android, HarmonyOS, Windows, macOS, and Linux browser installation.
4. **Nour Linux adapter** — Debian Live userspace, hardware drivers supplied by Linux, local HTTP shell host, allowlisted native file/application bridge, installer and updater.
5. **Compatibility adapters** — opt-in Waydroid and Wine installation helpers for supported Linux installations; availability still depends on the device, kernel and vendor packages.

## Platform truth table

| Capability | iOS PWA | Android/Harmony PWA | Windows PWA | Nour Linux |
|---|---:|---:|---:|---:|
| Offline shell | Yes | Yes | Yes | Yes |
| Notes/tasks/files | Yes | Yes | Yes | Yes |
| Native filesystem bridge | Limited | Limited | Limited | Yes, restricted to the user's home |
| Replace vendor kernel | No | Device-specific | No | Yes, by booting the ISO |
| Android app compatibility | No | Host OS only | No | Optional Waydroid helper; hardware-dependent |
| Windows app compatibility | No | No | Host OS only | Optional Wine helper; application-dependent |

The project reports unavailable capabilities honestly and provides the closest supported adapter for each platform.
