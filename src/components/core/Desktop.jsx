'use client';

import { useCallback, useEffect, useState } from 'react';
import { Monitor, Image as ImageIcon } from 'lucide-react';
import { useContextMenu } from '@/hooks/useContextMenu';
import { APP_REGISTRY } from '../config/apps';
import Dock from './Dock';
import StartMenu from './StartMenu';
import WindowManager from './WindowManager';
import TopMenuBar from './TopMenuBar';
import ContextMenu from './ContextMenu';

const WALLPAPERS = [
  { id: 'wp1', src: '/wallpapers/wallpaper-1.jpg', label: 'Aero Theme 1 (Aurora)' },
  { id: 'wp2', src: '/wallpapers/wallpaper-2.jpg', label: 'Aero Theme 2 (Meadow)' },
  { id: 'wp3', src: '/wallpapers/wallpaper-3.jpg', label: 'Aero Theme 3 (Droplets)' },
  { id: 'custom', src: null, label: 'Custom URL' },
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

  const { menuState, setMenuState } = useContextMenu();

  useEffect(() => {
    const savedIndex = localStorage.getItem('desktop_wallpaper_index');
    const savedCustomUrl = localStorage.getItem('desktop_custom_wallpaper_url');

    if (savedIndex !== null) setWallpaperIndex(parseInt(savedIndex, 10));
    if (savedCustomUrl !== null) setCustomUrl(savedCustomUrl);
    setIsHydrated(true);
  }, []);

  const openApp = useCallback((appId, customProps = {}) => {
    setOpenWindows((prev) => {
      if (prev.find((w) => w.id === appId)) {
        return prev.map((w) => (w.id === appId ? { ...w, minimized: false, props: customProps } : w));
      }
      return [
        ...prev,
        {
          id: appId,
          minimized: false,
          x: 120 + prev.length * 30,
          y: 100 + prev.length * 30,
          props: customProps
        }
      ];
    });
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('welcome_show_at_startup');
    if (stored === null || stored === 'true') {
      openApp('welcome');
    }
  }, [openApp]);

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

  function closeWindow(appId) {
    setOpenWindows((prev) => prev.filter((w) => w.id !== appId));
  }

  function minimizeWindow(appId) {
    setOpenWindows((prev) => prev.map((w) => (w.id === appId ? { ...w, minimized: true } : w)));
  }

  function updateWindowPosition(appId, newX, newY) {
    setOpenWindows((prev) => prev.map((w) => (w.id === appId ? { ...w, x: newX, y: newY } : w)));
  }

  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenuState({ isVisible: true, x: e.pageX, y: e.pageY });
  };

  const desktopMenuItems = [
    { label: 'View', hasSubmenu: true },
    { label: 'Sort by', hasSubmenu: true },
    { label: 'Refresh', onClick: () => window.location.reload() },
    { type: 'divider' },
    { label: 'Paste', disabled: true },
    { label: 'Paste shortcut', disabled: true },
    { type: 'divider' },
    { label: 'New', hasSubmenu: true },
    { type: 'divider' },
    { label: 'Screen resolution', icon: <Monitor size={14} color="#0058a3" /> },
    { label: 'Gadgets' },
    { label: 'Personalize', icon: <ImageIcon size={14} color="#0058a3" onClick={() => openApp('settings')} /> },
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none" onContextMenu={handleContextMenu}>
      {isHydrated ? <Wallpaper src={resolvedSrc} /> : <div className="absolute inset-0 bg-[#0a2540]" />}

      <TopMenuBar activeTitle={activeTitle} />

      <WindowManager
        openWindows={openWindows}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onUpdatePosition={updateWindowPosition}
        onActiveChange={setActiveTitle}
        onOpen={openApp}
        wallpaperProps={{
          wallpapers: WALLPAPERS,
          activeIndex: wallpaperIndex,
          customUrl: customUrl,
          onSelect: handleWallpaperSelect,
          onSetCustomUrl: handleCustomUrlSet
        }}
      />

      <StartMenu onOpenApp={openApp} />

      <Dock apps={APP_REGISTRY} openWindows={openWindows} onOpen={openApp} />

      <ContextMenu isVisible={menuState.isVisible} x={menuState.x} y={menuState.y} items={desktopMenuItems} />
    </div>
  );
}