'use client';

import { useEffect, useState } from 'react';
import { Monitor, Paintbrush, FolderSearch, Music, Gamepad2, Info } from 'lucide-react';

const STARTUP_KEY = 'welcome_show_at_startup';

export default function WelcomeApp({ onOpenApp }) {
  const [showAtStartup, setShowAtStartup] = useState(true);
  const welcomeTasks = [
    {
      id: 'settings',
      icon: <Paintbrush size={28} className="text-[#0058a3]" strokeWidth={1.5} />,
      title: 'Personalize Windows',
      desc: 'Change your desktop background, window colors, and sounds to make your computer your own.',
    },
    {
      id: 'explorer',
      icon: <FolderSearch size={28} className="text-[#0058a3]" strokeWidth={1.5} />,
      title: 'Browse your files',
      desc: 'Open the File Explorer to view your documents, pictures, and local disk drives.',
    },
    {
      id: 'media',
      icon: <Music size={28} className="text-[#0058a3]" strokeWidth={1.5} />,
      title: 'Listen to music',
      desc: 'Launch Windows Media Player to stream your audio and video files.',
    },
    {
      id: 'games',
      icon: <Gamepad2 size={28} className="text-[#0058a3]" strokeWidth={1.5} />,
      title: 'Games Explorer',
      desc: 'Discover and play classic embedded games built for AeroOS.',
    },
  ];

  useEffect(() => {
    const stored = localStorage.getItem(STARTUP_KEY);
    if (stored !== null) {
      setShowAtStartup(stored === 'true');
    }
  }, []);

  const handleStartupToggle = () => {
    setShowAtStartup((current) => {
      const next = !current;
      localStorage.setItem(STARTUP_KEY, next.toString());
      return next;
    });
  };

  return (
    <div className="w-full h-full flex flex-col bg-white select-none font-['Segoe_UI',Tahoma,sans-serif]">

      {/* header */}
      <div
        className="flex items-center gap-4 px-6 py-5 border-b border-[#dfdfdf]"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #f0f4f9 100%)'
        }}
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-linear-to-br from-[#e5f3ff] to-[#cce8ff] border border-[#99d1ff] shadow-[inset_0_1px_3px_rgba(255,255,255,0.8),0_2px_4px_rgba(0,0,0,0.1)]">
          <Monitor size={32} color="#0058a3" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-[22px] font-normal text-[#003399] tracking-tight">
            Getting Started with AeroOS
          </h1>
          <p className="text-[12px] text-gray-600 mt-0.5">
            Discover what you can do with your new desktop environment.
          </p>
        </div>
      </div>

      {/* main content */}
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        <div className="max-w-2xl mx-auto flex flex-col gap-1">
          {welcomeTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onOpenApp?.(task.id)}
              className="flex items-start gap-4 p-3 border border-transparent hover:border-[#b8d6fb] hover:bg-[#e5f3ff] rounded cursor-pointer group transition-colors"
            >
              <div className="mt-1 drop-shadow-sm">
                {task.icon}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] text-[#003399] group-hover:underline font-semibold">
                  {task.title}
                </span>
                <span className="text-[12px] text-gray-700">
                  {task.desc}
                </span>
              </div>
            </div>
          ))}

          <div className="flex items-start gap-4 p-3 border border-transparent mt-2">
            <div className="mt-1 drop-shadow-sm">
              <Info size={28} className="text-[#555]" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] text-gray-800 font-semibold">
                About this project
              </span>
              <span className="text-[12px] text-gray-600">
                A weekend build by Arman, mostly an excuse to play with glass, gradients, and bring back a desktop look from the Vista era.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="h-10 bg-[#f0f4f9] border-t border-[#dfdfdf] flex items-center justify-between px-4 text-[11px] text-gray-600">
        <label className="flex items-center gap-1.5 cursor-pointer hover:text-black">
          <input
            type="checkbox"
            checked={showAtStartup}
            onChange={handleStartupToggle}
            className="mt-0.5"
          />
          Show this screen at startup
        </label>

        <div className="flex items-center gap-4">
          <span className="w-px h-3 bg-gray-300" />
          <span>AeroOS Core v2.0</span>
        </div>
      </div>

    </div>
  );
}