'use client';

import { useState, useCallback } from 'react';
import Window from './Window';
import WelcomeApp from './apps/WelcomeApp';
import ClockApp from './apps/ClockApp';

// ─── App content registry ──────────────────────────────────────────────────────
// Maps an app id to its title/icon/default size/content component.

export const APP_CONFIG = {
  welcome: {
    title:  'Welcome',
    icon:   '🌐',
    width:  440,
    height: 380,
    content: <WelcomeApp />,
  },
  clock: {
    title:  'Clock',
    icon:   '🕐',
    width:  280,
    height: 280,
    content: <ClockApp />,
  },
};

// ─── WindowManager ──────────────────────────────────────────────────────────────
// Receives the openWindows array ({id, x, y, minimized}) from Desktop and
// handles internal concerns: z-index stacking on focus, drag position updates.
export default function WindowManager({ openWindows, onClose, onMinimize, onUpdatePosition }) {
  // zOrder: array of window ids in stacking order (last = topmost)
  const [zOrder, setZOrder] = useState([]);

  const bringToFront = useCallback((id) => {
    setZOrder((prev) => [...prev.filter((wid) => wid !== id), id]);
  }, []);

  function getZIndex(id) {
    const idx = zOrder.indexOf(id);
    // Base z-index of 10 so windows always sit above the wallpaper/switcher,
    // below the dock (z-50).
    return idx === -1 ? 10 : 10 + idx;
  }

  return (
    <div className="absolute inset-0">
      {openWindows.map((win) => {
        const config = APP_CONFIG[win.id];
        if (!config) return null;

        return (
          <Window
            key={win.id}
            id={win.id}
            title={config.title}
            icon={config.icon}
            x={win.x}
            y={win.y}
            width={config.width}
            height={config.height}
            zIndex={getZIndex(win.id)}
            minimized={win.minimized}
            onClose={onClose}
            onMinimize={onMinimize}
            onFocus={bringToFront}
            onMove={onUpdatePosition}
          >
            {config.content}
          </Window>
        );
      })}
    </div>
  );
}