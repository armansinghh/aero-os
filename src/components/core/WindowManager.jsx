'use client';

import { useState, useCallback, useEffect } from 'react';
import Window from './Window';
import { getAppConfig } from '../config/apps';

export default function WindowManager({
  openWindows,
  onClose,
  onMinimize,
  onUpdatePosition,
  onActiveChange,
  wallpaperProps,
  onOpen
}) {
  const [zOrder, setZOrder] = useState([]);

  const bringToFront = useCallback((id) => {
    setZOrder((prev) => [...prev.filter((wid) => wid !== id), id]);
  }, []);

  useEffect(() => {
    const newWindowId = openWindows.find(
      (w) => !w.minimized && !zOrder.includes(w.id)
    )?.id;

    if (newWindowId) {
      bringToFront(newWindowId);
    }
  }, [openWindows, zOrder, bringToFront]);

  function getZIndex(id) {
    const idx = zOrder.indexOf(id);
    return idx === -1 ? 10 : 10 + idx;
  }

  useEffect(() => {
    const visible = zOrder.filter((id) => {
      const w = openWindows.find((ow) => ow.id === id);
      return w && !w.minimized;
    });
    const topId = visible[visible.length - 1];

    const activeApp = getAppConfig(topId);
    onActiveChange?.(activeApp ? activeApp.title : null);
  }, [zOrder, openWindows, onActiveChange]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {openWindows.map((win) => {
        const config = getAppConfig(win.id);
        if (!config) return null;
        const AppComponent = config.component;

        return (
          <Window
            key={win.id}
            id={win.id}
            title={config.title}
            icon={config.smallIcon}
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
            <AppComponent
              wallpaperProps={wallpaperProps}
              onOpenApp={onOpen}
              {...win.props}
            />
          </Window>
        );
      })}
    </div>
  );
}