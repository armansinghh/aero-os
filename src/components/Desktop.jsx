'use client';

import { useState } from 'react';
import Dock from './Dock';

const WALLPAPERS = [
  { id: 'wp1',    src: '/wallpapers/wallpaper-1.jpg', label: 'Aurora'   },
  { id: 'wp2',    src: '/wallpapers/wallpaper-2.jpg', label: 'Meadow'   },
  { id: 'wp3',    src: '/wallpapers/wallpaper-3.jpg', label: 'Droplets' },
  { id: 'custom', src: null,                          label: 'Custom'   },
];

function Wallpaper({ src }) {
  if (!src) {
    return (
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            175deg,
            #0a2540 0%, #0d4f8c 20%, #0077b6 42%,
            #00b4d8 62%, #90e0ef 80%, #caf0f8 92%, #e0f7fa 100%
          )`,
        }}
      />
    );
  }
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:    `url(${src})`,
        backgroundSize:     'cover',
        backgroundPosition: 'center',
        backgroundRepeat:   'no-repeat',
        transition:         'background-image 0.4s ease',
      }}
    >
      {/* Vignette so dock + windows read cleanly against any photo */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse 110% 110% at 50% 50%,
            transparent 35%,
            rgba(5, 18, 45, 0.28) 100%
          )`,
        }}
      />
    </div>
  );
}

const APP_REGISTRY = [
  {
    id:     'welcome',
    label:  'Welcome',
    icon:   '🌐',
    tileBg: 'linear-gradient(135deg, #b3ecff 0%, #00A8E8 50%, #005f99 100%)',
  },
  {
    id:     'clock',
    label:  'Clock',
    icon:   '🕐',
    tileBg: 'linear-gradient(135deg, #d4ffb3 0%, #7CFC00 50%, #3a8800 100%)',
  },
];

export default function Desktop() {
  const [openWindows,    setOpenWindows]    = useState([]);
  const [wallpaperIndex, setWallpaperIndex] = useState(0);
  // customUrl is the placeholder for the "add from link" feature
  const [customUrl] = useState(null);
  const activeWp  = WALLPAPERS[wallpaperIndex];
  const resolvedSrc = activeWp.id === 'custom' ? customUrl : activeWp.src;

  function openApp(appId) {
    setOpenWindows((prev) => {
      if (prev.find((w) => w.id === appId)) {
        return prev.map((w) => w.id === appId ? { ...w, minimized: false } : w);
      }
      return [
        ...prev,
        { id: appId, minimized: false, x: 120 + prev.length * 30, y: 80 + prev.length * 30 },
      ];
    });
  }

  function closeWindow(appId) {
    setOpenWindows((prev) => prev.filter((w) => w.id !== appId));
  }

  function minimizeWindow(appId) {
    setOpenWindows((prev) => prev.map((w) => w.id === appId ? { ...w, minimized: true } : w));
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none">

      <Wallpaper src={resolvedSrc} />

      <WallpaperSwitcher
        wallpapers={WALLPAPERS}
        activeIndex={wallpaperIndex}
        onSelect={setWallpaperIndex}
      />

      <div className="absolute inset-0 pointer-events-none">
        {/* WindowManager mounts here*/}
      </div>

      <Dock
        apps={APP_REGISTRY}
        openWindows={openWindows}
        onOpen={openApp}
      />
    </div>
  );
}

function WallpaperSwitcher({ wallpapers, activeIndex, onSelect }) {
  return (
    <div
      className="absolute bottom-5 left-5 z-40 flex items-center gap-2 px-3 py-2 rounded-2xl"
      style={{
        background:           'rgba(255,255,255,0.18)',
        backdropFilter:       'blur(20px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
        border:               '1px solid rgba(255,255,255,0.40)',
        boxShadow: `
          inset 0 1px 1px rgba(255,255,255,0.75),
          0 4px 16px rgba(31,38,135,0.14),
          0 1px 4px rgba(0,0,0,0.16)
        `,
      }}
    >
      {wallpapers.map((wp, i) => {
        const isActive  = i === activeIndex;
        const isCustom  = wp.id === 'custom';

        return (
          <button
            key={wp.id}
            onClick={() => onSelect(i)}
            title={wp.label}
            style={{
              width:        '40px',
              height:       '28px',
              borderRadius: '8px',
              overflow:     'hidden',
              border:       isActive
                ? '2px solid rgba(255,255,255,0.90)'
                : '1px solid rgba(255,255,255,0.35)',
              cursor:       'pointer',
              padding:      0,
              flexShrink:   0,
              position:     'relative',
              background:   isCustom
                ? 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(0,168,232,0.25))'
                : 'transparent',
              boxShadow: isActive
                ? '0 0 0 1px rgba(0,168,232,0.7), 0 2px 6px rgba(0,0,0,0.30)'
                : '0 1px 3px rgba(0,0,0,0.25)',
              transition:   'box-shadow 0.2s, border 0.2s',
            }}
          >
            {isCustom ? (
              // "+" icon for the URL slot
              <span style={{
                display:     'flex',
                alignItems:  'center',
                justifyContent: 'center',
                width:       '100%',
                height:      '100%',
                fontSize:    '14px',
                color:       'rgba(255,255,255,0.80)',
                fontWeight:  700,
                textShadow:  '0 1px 2px rgba(0,0,0,0.50)',
              }}>+</span>
            ) : (
              // Thumbnail — tiny version of the actual image
              <img
                src={wp.src}
                alt={wp.label}
                style={{
                  width:      '100%',
                  height:     '100%',
                  objectFit:  'cover',
                  display:    'block',
                }}
              />
            )}

            {/* Active ring overlay */}
            {isActive && (
              <div style={{
                position:  'absolute',
                inset:     0,
                borderRadius: '6px',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.60)',
                pointerEvents: 'none',
              }} />
            )}
          </button>
        );
      })}
    </div>
  );
}