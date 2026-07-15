# AeroOS

A desktop operating system that lives entirely in your browser, rebuilt around the glossy, water and glass "Frutiger Aero" look of mid 2000s Windows and Mac OS X.

![AeroOS desktop screenshot](/public/ss.png)

## Try it

**[aero-os.vercel.app →](https://aero-os.vercel.app)**

## Quick start

Open the link above. That's it! boots straight into a shutdown screen, hit power, and it walks itself through a boot sequence into the desktop.

## Features

1. **Draggable, minimizable windows** - a custom window manager with focus tracking, smooth open/close transitions, and per-window z-ordering
2. **3D glass dock** - bottom-anchored icon magnification with glowing status indicators for open/minimized apps
3. **Full boot flow** - shutdown > boot sequence > lock screen > desktop, all wired through real navigation state
4. **Top menu bar with live flyouts** - battery, wifi, volume, system tray, and a working calendar
5. **9 built-in apps** - Notepad (autosaving, with bold/italic/underline), a mechanical analog Clock, live Weather (real geocoding + forecast APIs), File Explorer, Media Player, a Games Explorer with 5 playable embedded games, Settings, a Browser, and a Welcome app
6. **Custom right-click context menu** and a Start menu with app search
7. **Persistent state** - wallpaper choice, notes, and volume all survive a refresh via localStorage

## Running it locally

Requires Node 18+.

```bash
git clone https://github.com/armansinghh/WebOS2.git
cd webos2
npm install
npm run dev
```

Then open `http://localhost:3000`. No environment variables or external services are required — Weather calls the free Open-Meteo API directly from the client, and the Games app loads public game URLs in sandboxed iframes.

## How it works

AeroOS is a Next.js (App Router) app with no backend, the entire "OS" is client-side React state. The trickiest part wasn't any single app, it was making the *shell* feel real: windows are positioned and clamped against the viewport on every drag frame, z-order is tracked separately from the window list so newly-opened windows always come to front without fighting focus state, and the shutdown > boot sequence > lock screen > desktop flow is driven by `sessionStorage` flags so refreshing mid-flow doesn't strand you on the wrong screen.

The visual language was the actual hard problem. Modern CSS defaults to soft, blurred glassmorphism: Frutiger Aero is sharper: 50% split linear gradients for hard glass seams, stacked inset shadows to fake acrylic thickness, and a top half specular highlight on almost every surface. A shared `FlyoutShell` component and synced `useVolumeState`, `useNetworkState` hook keep that styling (and the app's actual state) consistent across the top bar, Settings, and Media Player instead of duplicating it per component.

## Credits

- Icons: [Lucide](https://lucide.dev)
- Sample media: Blender Foundation, MDN learning-area assets, SoundHelix
- Games: Solitaire (mrdoob), 2048 (FunHTML5Games), Flappy Bird (nebezb), Cut the Rope (ZeptoLab), HexGL (BKcore)
- Weather data: [Open-Meteo](https://open-meteo.com)
- Built with Next.js, Tailwind CSS, and an unreasonable number of box-shadows