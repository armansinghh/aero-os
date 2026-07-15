'use client';

import { useState, useEffect, useRef } from 'react';
import { Wifi, BatteryMedium, BatteryCharging, Volume2, ChevronUp } from 'lucide-react';
import { useBattery } from '../../hooks/useBattery';
import { useVolumeState } from '../../hooks/useVolumeState';

import { useClock } from '@/hooks/useClock';
import MenuBarButton from '../ui/MenuBarButton';

import CalendarFlyout from '../flyouts/CalendarFlyout';
import VolumeFlyout from '../flyouts/VolumeFlyout';
import SystemTrayFlyout from '../flyouts/SystemTrayFlyout';
import BatteryFlyout from '../flyouts/BatteryFlyout';
import WifiFlyout from '../flyouts/WifiFlyout';

export default function TopMenuBar({ activeTitle }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [volume, setVolume] = useVolumeState();

  const { level, charging } = useBattery();
  const { time, dateFormatted } = useClock();

  const menuBarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuBarRef.current && !menuBarRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const macMenus = ['File', 'Edit', 'View', 'Help'];

  return (
    <div ref={menuBarRef} className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-2 select-none h-9 aero-glass-effect">

      {/* gloss vverlay */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-linear-to-b from-white/40 to-transparent pointer-events-none" />

      {/* left */}
      <div className="flex items-center z-10 h-full">
        <div className="flex items-center h-full px-3">
          <span className="text-white text-[13px] tracking-wide font-bold subpixel-antialiased aero-text-effect">AeroOS</span>
        </div>

        <div className="flex items-center ml-2 h-full">
          {macMenus.map((menu) => (
            <MenuBarButton key={menu}>
              <span className="text-white text-[12px] subpixel-antialiased aero-text-effect">{menu}</span>
            </MenuBarButton>
          ))}
        </div>

        {activeTitle && (
          <div className="flex items-center gap-3 h-full">
            <div className="w-px h-4 mx-1 aero-divider-effect" />
            <span className="text-white text-[12px] font-bold subpixel-antialiased aero-text-effect">{activeTitle}</span>
          </div>
        )}
      </div>

      {/* right */}
      <div className="flex items-center h-full z-10 text-white drop-shadow-md">

        <MenuBarButton onClick={() => toggleMenu('tray')}>
          <ChevronUp size={14} strokeWidth={2.5} />
        </MenuBarButton>

        <MenuBarButton onClick={() => toggleMenu('battery')} title={`${Math.round(level * 100)}%`}>
          {charging ? <BatteryCharging size={15} strokeWidth={2} className="text-[#4ade80]" /> : <BatteryMedium size={14} strokeWidth={2} />}
        </MenuBarButton>

        <MenuBarButton onClick={() => toggleMenu('volume')}>
          <Volume2 size={14} strokeWidth={2} />
        </MenuBarButton>

        <MenuBarButton onClick={() => toggleMenu('wifi')}>
          <Wifi size={14} strokeWidth={2} />
        </MenuBarButton>

        <div className="w-px h-4 mx-1 aero-divider-effect" />

        <MenuBarButton onClick={() => toggleMenu('calendar')}>
          <div className="flex flex-col items-center justify-center leading-none mt-0.5">
            <span className="text-white text-[11px] tabular-nums subpixel-antialiased aero-text-effect">{time}</span>
            <span className="text-white/85 text-[10px] tabular-nums subpixel-antialiased aero-text-effect">{dateFormatted}</span>
          </div>
        </MenuBarButton>

      </div>

      {/* flyouts */}
      <CalendarFlyout isOpen={activeMenu === 'calendar'} onClose={() => setActiveMenu(null)} />
      <VolumeFlyout isOpen={activeMenu === 'volume'} volume={volume} setVolume={setVolume} />
      <SystemTrayFlyout isOpen={activeMenu === 'tray'} />
      <BatteryFlyout isOpen={activeMenu === 'battery'} level={level} charging={charging} />
      <WifiFlyout isOpen={activeMenu === 'wifi'} />
    </div>
  );
}