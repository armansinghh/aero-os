'use client';

export default function Dock({ apps, openWindows, onOpen }) {
  function isOpen(appId) {
    return openWindows.some((w) => w.id === appId && !w.minimized);
  }
  function isMinimized(appId) {
    return openWindows.some((w) => w.id === appId && w.minimized);
  }

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
      {/* ── Glass pill shell ── */}
      <div
        className="aero-glass flex items-end gap-3 px-5 py-3 rounded-3xl"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0.30) 0%, rgba(91,200,245,0.18) 100%)',
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

        {/* Divider + System clock pill */}
        <div className="w-px h-10 bg-white/30 mx-1 self-center rounded-full" />
        <SystemClock />
      </div>
    </div>
  );
}

function DockIcon({ app, open, minimized, onClick }) {
  return (
    <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={onClick}>
      {/* Icon container */}
      <div
        className="dock-icon relative w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(91,200,245,0.35) 100%)`,
          border: '1px solid rgba(255,255,255,0.7)',
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.9),
            inset 0 -1px 0 rgba(0,0,0,0.08),
            0 4px 12px rgba(0,40,80,0.3)
          `,
        }}
        title={app.label}
      >
        {app.icon}

        {/* Gloss reflection — top half shine */}
        <div
          className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 100%)',
          }}
        />
      </div>

      {/* App label */}
      <span
        className="text-on-glass text-white font-medium text-[10px] leading-tight tracking-wide"
        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}
      >
        {app.label}
      </span>

      {/* Open / minimized indicator dot */}
      <div className="h-1.5 w-1.5 rounded-full mt-0.5"
        style={{
          background: open
            ? '#2ADFB8'
            : minimized
            ? '#8FD400'
            : 'transparent',
          boxShadow: open
            ? '0 0 6px #2ADFB8'
            : minimized
            ? '0 0 4px #8FD400'
            : 'none',
          transition: 'all 0.2s',
        }}
      />
    </div>
  );
}

function SystemClock() {
  const [time, setTime] = React.useState(() => formatTime(new Date()));

  React.useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-2 min-w-[52px]">
      <span
        className="text-white font-semibold text-sm tabular-nums leading-tight"
        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
      >
        {time.hhmm}
      </span>
      <span
        className="text-white/70 font-medium text-[9px] uppercase tracking-widest"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}
      >
        {time.ampm}
      </span>
    </div>
  );
}

import React from 'react';

function formatTime(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return { hhmm: `${hours}:${minutes}`, ampm };
}