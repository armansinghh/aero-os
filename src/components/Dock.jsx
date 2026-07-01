'use client';

import React from 'react';

export default function Dock({ apps, openWindows, onOpen }) {
  function isOpen(appId) {
    return openWindows.some((w) => w.id === appId && !w.minimized);
  }
  function isMinimized(appId) {
    return openWindows.some((w) => w.id === appId && w.minimized);
  }

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 select-none">
      <div
        className="flex items-end gap-3 px-4 py-2 rounded-2xl"
        style={{
          background: 'rgba(255, 255, 255, 0.18)',
          backdropFilter: 'blur(18px) saturate(1.7)',
          WebkitBackdropFilter: 'blur(18px) saturate(1.7)',
          border: '1px solid rgba(255, 255, 255, 0.40)',
          boxShadow: `
            inset 0 1px 1px rgba(255, 255, 255, 0.75),
            0 8px 24px rgba(0, 20, 50, 0.25),
            0 2px 8px rgba(0, 0, 0, 0.18)
          `,
        }}
      >
        {apps.map((app) => (
          <DockIcon
            key={app.id}
            app={app}
            open={isOpen(app.id)}
            minimized={isMinimized(app.id)}
            onClick={() => onOpen(app.id)}
          />
        ))}
      </div>
    </div>
  );
}

function DockIcon({ app, open, minimized, onClick }) {
  const tileBg = app.tileBg || 'linear-gradient(180deg, #5bb4eb 0%, #178add 49%, #056bbb 50%, #004d8c 100%)';

  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      style={{ minWidth: '56px' }}
      onClick={onClick}
      title={app.label}
    >
      <div
        className="relative w-12 h-12 rounded-[10px] mt-2 flex items-center justify-center hover:scale-110"
        style={{
          fontSize: '1.7rem',
          background: tileBg,
          border: '1px solid rgba(0, 40, 80, 0.45)',
          boxShadow: `
            inset 0 1px 1px rgba(255, 255, 255, 0.75),
            inset 0 -1px 2px rgba(0, 0, 0, 0.15),
            0 3px 6px rgba(0, 0, 0, 0.30)
          `,
          transition: 'transform 0.1s linear',
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 rounded-t-[10px] pointer-events-none"
          style={{
            height: '48%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 100%)',
          }}
        />
        <span className="relative" style={{ display: 'inline-flex', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.40))' }}>
          {app.icon}
        </span>
      </div>

      <span
        style={{
          color: '#ffffff',
          fontFamily: '"Segoe UI", Tahoma, sans-serif',
          fontSize: '10px',
          fontWeight: 600,
          marginTop: '2px',
          textShadow: '0 1px 2px rgba(0,0,0,0.75)',
        }}
      >
        {app.label}
      </span>

      <div style={{ height: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px' }}>
        {(open || minimized) && (
          <div
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: open ? '#40e0d0' : '#ffb800',
              border: '1px solid rgba(0,0,0,0.25)',
            }}
          />
        )}
      </div>
    </div>
  );
}