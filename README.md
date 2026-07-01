# AeroOS

A browser based desktop operating system themed around the glossy, optimistic Frutiger Aero aesthetic of the mid-2000s.

**Live:** [aero-os.vercel.app](https://aero-os.vercel.app)

---

## what it is

aeroOS is a web based desktop environment that brings back the glass, light, and water motifs of the Windows Vista and Windows 7 era. It features a custom window manager, a skeuomorphic 3D glass dock, a top menu bar, and several built-in apps all designed with heavy specular highlights, frosted glass blurs, and "gel" buttons

---

## available apps

| App | Description |
|---|---|
| Welcome | presentational about page |
| Notepad | text editor (bold, italic, underline) |
| Clock | analog clock face with integrated date window |
| Weather | real- ime search using Geocoding API and providing live weather results using Open-Meteo API |

---

## features

1. Window manager - draggable, closable, and minimizable aero glass windows with active focus tracking and smooth transitions
2. 3D Glass Dock - classic bottom taskbar featuring bottom-anchored icon magnification, glowing hardware LED indicators, and an etched glass system clock
3. Top Menu Bar - global system bar for desktop status and actions
4. Authentic Frutiger Aero UI - true to era implementation of specular highlights, diagonal glass cuts, multi-layered borders, and sub-surface scattering
5. localStorage persistence - notepad contents automatically save and survive browser refreshes

---

## tech stack

| Layer | Library |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS & standard CSS (for complex gradients/glass) |
| State | React State / Context |
| Components | Custom built Window Manager & Dock |

---

## running locally

```bash
git clone [https://github.com/yourusername/aero-os](https://github.com/yourusername/aero-os)
cd aero-os
npm install
npm run dev