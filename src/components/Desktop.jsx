'use client';

import { useState, useEffect } from 'react';
import Dock from './Dock';
import WindowManager from './WindowManager';
import TopMenuBar from './TopMenuBar';
import { GlobeIcon, ClockIcon, NotepadIcon, WeatherIcon } from './icons/AeroIcons';

const WALLPAPERS = [
  { id: 'wp1', src: '/wallpapers/wallpaper-1.jpg', label: 'Aurora' },
  { id: 'wp2', src: '/wallpapers/wallpaper-2.jpg', label: 'Meadow' },
  { id: 'wp3', src: '/wallpapers/wallpaper-3.jpg', label: 'Droplets' },
  { id: 'custom', src: null, label: 'Custom' },
];

const APP_REGISTRY = [
  { id: 'welcome', label: 'Welcome', icon: <GlobeIcon size={26} />, tileBg: 'linear-gradient(135deg, #b3ecff 0%, #00A8E8 50%, #005f99 100%)' },
  { id: 'clock', label: 'Clock', icon: <ClockIcon size={26} />, tileBg: 'linear-gradient(135deg, #d4ffb3 0%, #7CFC00 50%, #3a8800 100%)' },
  { id: 'notepad', label: 'Notepad', icon: <NotepadIcon size={26} />, tileBg: 'linear-gradient(135deg, #ffe9b3 0%, #ffb800 50%, #a86a00 100%)' },
  { id: 'weather', label: 'Weather', icon: <WeatherIcon size={26} />, tileBg: 'linear-gradient(135deg, #d6f0ff 0%, #5bc8f5 50%, #0077b6 100%)' },
];

function Wallpaper({ src }) {
  if (!src) {
    return (
      <div className="absolute inset-0" style={{ background: `linear-gradient(175deg, #0a2540 0%, #0d4f8c 20%, #0077b6 42%, #00b4d8 62%, #90e0ef 80%, #caf0f8 92%, #e0f7fa 100%)` }} />
    );
  }
  return (
    <div className="absolute inset-0" style={{ backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', transition: 'background-image 0.4s ease' }}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 110% 110% at 50% 50%, transparent 35%, rgba(5, 18, 45, 0.28) 100%)` }} />
    </div>
  );
}

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState([]);
  const [wallpaperIndex, setWallpaperIndex] = useState(0);
  const [customUrl, setCustomUrl] = useState(null);
  const [activeTitle, setActiveTitle] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedIndex = localStorage.getItem('desktop_wallpaper_index');
    const savedCustomUrl = localStorage.getItem('desktop_custom_wallpaper_url');

    if (savedIndex !== null) {
      setWallpaperIndex(parseInt(savedIndex, 10));
    }
    if (savedCustomUrl !== null) {
      setCustomUrl(savedCustomUrl);
    }

    setIsHydrated(true);
  }, []);

  const handleWallpaperSelect = (index) => {
    setWallpaperIndex(index);
    localStorage.setItem('desktop_wallpaper_index', index.toString());
  };

  const handleCustomUrlSet = (url) => {
    setCustomUrl(url);
    if (url) {
      localStorage.setItem('desktop_custom_wallpaper_url', url);
    } else {
      localStorage.removeItem('desktop_custom_wallpaper_url');
    }
  };

  const activeWp = WALLPAPERS[wallpaperIndex] || WALLPAPERS[0];
  const resolvedSrc = activeWp.id === 'custom' ? customUrl : activeWp.src;

  function openApp(appId) {
    setOpenWindows((prev) => {
      if (prev.find((w) => w.id === appId)) {
        return prev.map((w) => (w.id === appId ? { ...w, minimized: false } : w));
      }
      return [...prev, { id: appId, minimized: false, x: 120 + prev.length * 30, y: 100 + prev.length * 30 }];
    });
  }

  function closeWindow(appId) {
    setOpenWindows((prev) => prev.filter((w) => w.id !== appId));
  }

  function minimizeWindow(appId) {
    setOpenWindows((prev) => prev.map((w) => (w.id === appId ? { ...w, minimized: true } : w)));
  }

  function updateWindowPosition(appId, newX, newY) {
    setOpenWindows((prev) => prev.map((w) => (w.id === appId ? { ...w, x: newX, y: newY } : w)));
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none">
      {isHydrated ? (
        <Wallpaper src={resolvedSrc} />
      ) : (
        <div className="absolute inset-0 bg-[#0a2540]" />
      )}

      <TopMenuBar activeTitle={activeTitle} />

      <WallpaperSwitcher
        wallpapers={WALLPAPERS}
        activeIndex={wallpaperIndex}
        customUrl={customUrl}
        onSelect={handleWallpaperSelect}
        onSetCustomUrl={handleCustomUrlSet}
      />

      <WindowManager
        openWindows={openWindows}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onUpdatePosition={updateWindowPosition}
        onActiveChange={setActiveTitle}
      />

      <Dock apps={APP_REGISTRY} openWindows={openWindows} onOpen={openApp} />
    </div>
  );
}

// WallpaperSwitcher 
function WallpaperSwitcher({ wallpapers, activeIndex, customUrl, onSelect, onSetCustomUrl }) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [status, setStatus] = useState('');

  function handleThumbClick(i, wp) {
    if (wp.id === 'custom') {
      setPopoverOpen((v) => !v);
    } else {
      onSelect(i);
      setPopoverOpen(false);
    }
  }

  function validateAndApply(e) {
    e.preventDefault();
    const url = inputUrl.trim();
    if (!/\.(jpe?g|png|gif|webp|avif)(\?.*)?$/i.test(url)) {
      setStatus('error');
      return;
    }
    setStatus('checking');
    const img = new Image();
    img.onload = () => {
      onSetCustomUrl(url);
      const customIndex = wallpapers.findIndex((w) => w.id === 'custom');
      onSelect(customIndex);
      setStatus('');
      setPopoverOpen(false);
    };
    img.onerror = () => setStatus('error');
    img.src = url;
  }

  return (
    <div className="absolute bottom-5 left-5 z-40">
      {popoverOpen && (
        <div
          className="absolute bottom-14 left-0 rounded-xl p-3 w-56"
          style={{
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.6)',
            boxShadow: '0 8px 24px rgba(0,20,50,0.25)',
          }}
        >
          <form onSubmit={validateAndApply} className="flex flex-col gap-2">
            <input
              value={inputUrl}
              onChange={(e) => { setInputUrl(e.target.value); setStatus(''); }}
              placeholder="https://example.com/image.jpg"
              className="rounded-md px-2 py-1 outline-none"
              style={{ fontSize: '11px', border: '1px solid rgba(0,80,140,0.3)', color: '#0a2540' }}
            />
            <button type="submit" className="aero-btn" style={{ padding: '0.25rem 0.8rem', fontSize: '10px' }}>
              {status === 'checking' ? 'Checking…' : 'Set wallpaper'}
            </button>
            {status === 'error' && (
              <span style={{ fontSize: '10px', color: '#a11' }}>Couldn't load that image URL.</span>
            )}
          </form>
        </div>
      )}

      <div
        className="flex items-center gap-2 px-3 py-2 rounded-2xl"
        style={{
          background: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(20px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
          border: '1px solid rgba(255,255,255,0.40)',
          boxShadow: `inset 0 1px 1px rgba(255,255,255,0.75), 0 4px 16px rgba(31,38,135,0.14), 0 1px 4px rgba(0,0,0,0.16)`,
        }}
      >
        {wallpapers.map((wp, i) => {
          const isActive = i === activeIndex;
          const isCustom = wp.id === 'custom';
          const previewSrc = isCustom ? customUrl : wp.src;

          return (
            <button
              key={wp.id}
              onClick={() => handleThumbClick(i, wp)}
              title={wp.label}
              style={{
                width: '40px', height: '28px', borderRadius: '8px', overflow: 'hidden',
                border: isActive ? '2px solid rgba(255,255,255,0.90)' : '1px solid rgba(255,255,255,0.35)',
                cursor: 'pointer', padding: 0, flexShrink: 0, position: 'relative',
                background: isCustom && !previewSrc ? 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(0,168,232,0.25))' : 'transparent',
                boxShadow: isActive ? '0 0 0 1px rgba(0,168,232,0.7), 0 2px 6px rgba(0,0,0,0.30)' : '0 1px 3px rgba(0,0,0,0.25)',
                transition: 'box-shadow 0.2s, border 0.2s',
              }}
            >
              {isCustom && !previewSrc && (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', fontSize: '14px', color: 'rgba(255,255,255,0.80)', fontWeight: 700, textShadow: '0 1px 2px rgba(0,0,0,0.50)' }}>+</span>
              )}
              {previewSrc && (
                <img src={previewSrc} alt={wp.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              )}
              {isActive && (
                <div style={{ position: 'absolute', inset: 0, borderRadius: '6px', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.60)', pointerEvents: 'none' }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}