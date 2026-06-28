'use client';

import { useState } from 'react';
import Dock from './Dock';

function AeroWallpaper() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Base gradient sky */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% 110%,
              #a8e6cf 0%,
              #56c8e0 30%,
              #2ea8d5 55%,
              #1a6fa8 75%,
              #0d3d6b 100%
            )
          `,
        }}
      />

      {/* Aurora / lens flare layer */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(ellipse 60% 30% at 25% 20%, #8FD400 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 80% 15%, #2ADFB8 0%, transparent 65%),
            radial-gradient(ellipse 40% 20% at 60% 60%, rgba(255,255,255,0.5) 0%, transparent 60%)
          `,
        }}
      />

      {/* Subtle cloud / bokeh shapes */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="bubble1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bubble2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2ADFB8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2ADFB8" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Bokeh / water-droplet bubbles */}
        <circle cx="180" cy="160" r="90"  fill="url(#bubble1)" />
        <circle cx="900" cy="80"  r="130" fill="url(#bubble1)" />
        <circle cx="1280" cy="220" r="70" fill="url(#bubble2)" />
        <circle cx="400" cy="700" r="110" fill="url(#bubble2)" />
        <circle cx="1100" cy="650" r="85" fill="url(#bubble1)" />
        {/* Lens flare streaks */}
        <ellipse cx="720" cy="200" rx="300" ry="8" fill="white" opacity="0.15"
          transform="rotate(-12, 720, 200)" />
        <ellipse cx="400" cy="350" rx="180" ry="4" fill="white" opacity="0.1"
          transform="rotate(8, 400, 350)" />
      </svg>

      {/* Bottom grass / ground fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 opacity-30"
        style={{
          background: 'linear-gradient(to top, #4a9e2f 0%, transparent 100%)',
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(0,20,50,0.35) 100%)',
        }}
      />
    </div>
  );
}

const APP_REGISTRY = [
  {
    id: 'welcome',
    label: 'Welcome',
    icon: '🌐',
    iconBg: 'from-sky-400 to-cyan-300',
  },
  {
    id: 'clock',
    label: 'Clock',
    icon: '🕐',
    iconBg: 'from-lime-400 to-emerald-300',
  },
];

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState([]);

  function openApp(appId) {
    setOpenWindows((prev) => {
      if (prev.find((w) => w.id === appId)) {
        return prev.map((w) =>
          w.id === appId ? { ...w, minimized: false } : w
        );
      }
      return [
        ...prev,
        {
          id: appId,
          minimized: false,
          x: 120 + prev.length * 30,
          y: 80  + prev.length * 30,
        },
      ];
    });
  }

  function closeWindow(appId) {
    setOpenWindows((prev) => prev.filter((w) => w.id !== appId));
  }

  function minimizeWindow(appId) {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === appId ? { ...w, minimized: true } : w))
    );
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none">
      {/* Layer 1: Wallpaper */}
      <AeroWallpaper />

      {/* Layer 2: Windows (Phase 3 — placeholder for now) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* WindowManager will mount here in Phase 3 */}
      </div>

      {/* Layer 3: Dock — always on top */}
      <Dock apps={APP_REGISTRY} openWindows={openWindows} onOpen={openApp} />
    </div>
  );
}