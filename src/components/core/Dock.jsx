'use client';

import DockIcon from '../ui/DockIcon';

export default function Dock({ apps, openWindows, onOpen }) {
  const isOpen = (appId) => openWindows.some((w) => w.id === appId && !w.minimized);
  const isMinimized = (appId) => openWindows.some((w) => w.id === appId && w.minimized);

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 select-none">
      <div className="relative flex items-end gap-3 px-4 py-2 rounded-2xl overflow-hidden aero-dock-container">
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <defs>
            <radialGradient id="dockGloss" cx="50%" cy="0%" r="75%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.65)" />
              <stop offset="60%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>
          <ellipse cx="50" cy="0" rx="55" ry="45" fill="url(#dockGloss)" />
        </svg>

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