'use client';

import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AeroSlider({ value, onChange }) {
  const [isMuted, setIsMuted] = useState(false);
  const displayValue = isMuted ? 0 : value;

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      onChange(65);
      return;
    }

    setIsMuted(true);
    onChange(0);
  };

  return (
    <div className="flex flex-col items-center gap-4 py-2 select-none">
      {/* The Vertical Track */}
      <div className="relative flex justify-center" style={{ height: '100px', width: '24px' }}>
        
        {/* Track Background (Recessed) */}
        <div 
          className="absolute bottom-0 w-1.5 h-full rounded-full"
          style={{ 
            background: '#d4d4d4', 
            boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.4), inset -1px -1px 2px rgba(255,255,255,0.8)' 
          }}
        />

        {/* The Green Fill */}
        <div 
          className="absolute bottom-0 w-1.5 rounded-b-full transition-all duration-100 ease-linear"
          style={{ 
            height: `${displayValue}%`,
            background: 'linear-gradient(90deg, #18b518 0%, #22d922 50%, #18b518 100%)',
            boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.5), inset -1px -1px 2px rgba(0,0,0,0.2)'
          }}
        />

        {/* Invisible Native Input overlaid for interaction */}
        <input 
          type="range" 
          min="0" max="100" 
          value={displayValue}
          onChange={(e) => {
            setIsMuted(false);
            onChange(Number(e.target.value));
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical' }}
        />

        {/* Visual Thumb (moves based on value) */}
        <div 
          className="absolute w-5 h-3 rounded-[3px] pointer-events-none"
          style={{
            bottom: `calc(${displayValue}% - 6px)`,
            background: 'linear-gradient(180deg, #ffffff 0%, #e0e0e0 49%, #cccccc 50%, #b3b3b3 100%)',
            border: '1px solid #7a7a7a',
            boxShadow: '0 1px 2px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.9)'
          }}
        />
      </div>

      {/* Mute Button */}
      <button 
        onClick={handleToggleMute}
        className="p-1.5 rounded hover:bg-black/10 active:bg-black/20"
      >
        {isMuted || value === 0 ? <VolumeX size={16} color="#333" /> : <Volume2 size={16} color="#333" />}
      </button>
    </div>
  );
}