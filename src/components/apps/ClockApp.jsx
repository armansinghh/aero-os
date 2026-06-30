'use client';

import { useState, useEffect } from 'react';

// ─── ClockApp ─────────────────────────────────────────────────────────────────
// Pure skeuomorphic Aero analog dial. Features a translucent "Aero Aurora" 
// nature-inspired background with a frosted glass backdrop blur.

export default function ClockApp() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Calculate analog hand rotations
  const secDegrees = now.getSeconds() * 6;
  const minDegrees = now.getMinutes() * 6 + now.getSeconds() * 0.1;
  const hourDegrees = (now.getHours() % 12) * 30 + now.getMinutes() * 0.5;
  const currentDay = now.getDate();

  return (
    <div
      className="w-full h-full flex items-center justify-center select-none relative overflow-hidden"
      style={{
        // Sweeping aurora/nature background converted to rgba for transparency
        background: `
          radial-gradient(circle at 15% 0%, rgba(255, 255, 255, 0.4) 0%, transparent 40%),
          radial-gradient(circle at 85% 100%, rgba(124, 252, 0, 0.15) 0%, transparent 50%),
          linear-gradient(165deg, rgba(220, 240, 250, 0.5) 0%, rgba(179, 227, 255, 0.35) 45%, rgba(128, 208, 255, 0.25) 75%, rgba(168, 240, 182, 0.25) 100%)
        `,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: 'inset 0 0 20px rgba(255,255,255,0.4)',
      }}
    >
      {/* ── Subtly textured background grid ── */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)',
          backgroundSize: '4px 4px'
        }}
      />

      {/* ── Skeuomorphic Analog Dial ── */}
      <div
        className="relative rounded-full flex items-center justify-center z-10"
        style={{
          width: '180px',
          height: '180px',
          // Outer metallic bezel
          background: 'linear-gradient(135deg, #ffffff 0%, #b0c4de 45%, #ffffff 55%, #87ceeb 100%)',
          boxShadow: `
            0 15px 35px rgba(0, 40, 80, 0.25),
            inset 0 1px 2px rgba(255,255,255,1),
            inset 0 -2px 5px rgba(0,0,0,0.2)
          `,
          padding: '7px', // Thickness of the bezel
        }}
      >
        {/* Inner Clock Face */}
        <div
          className="relative w-full h-full rounded-full overflow-hidden"
          style={{
            background: 'radial-gradient(circle at center, #ffffff 0%, #e0f2fe 70%, #bae6fd 100%)',
            boxShadow: 'inset 0 4px 10px rgba(0,30,60,0.25)',
            border: '1px solid rgba(0,0,0,0.1)',
          }}
        >
          {/* Hour Markers (Ticks) */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-full flex justify-center"
              style={{ transform: `rotate(${i * 30}deg)` }}
            >
              <div 
                className="w-0.75 bg-slate-400/80 rounded-b-sm shadow-sm"
                style={{ 
                  height: i % 3 === 0 ? '12px' : '8px', 
                  marginTop: '2px' 
                }} 
              />
            </div>
          ))}

          {/* Mechanical Date Window (3 o'clock position) */}
          <div 
            className="absolute z-10 flex items-center justify-center"
            style={{
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '22px',
              height: '18px',
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.3)',
              borderRadius: '2px',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.15), 0 1px 1px rgba(255,255,255,0.8)',
            }}
          >
            <span 
              style={{ 
                fontSize: '11px', 
                fontWeight: 'bold', 
                color: '#1e293b',
                fontFamily: 'Tahoma, sans-serif'
              }}
            >
              {currentDay}
            </span>
          </div>

          {/* The iconic Frutiger Aero crescent glass reflection */}
          <div
            className="absolute top-0 left-0 w-full z-20 pointer-events-none"
            style={{
              height: '45%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.05) 100%)',
              borderRadius: '50% 50% 40% 40% / 100% 100% 10% 10%',
              transform: 'scale(0.92) translateY(2px)',
            }}
          />

          {/* Clock Center Pin */}
          <div 
            className="absolute z-40 rounded-full"
            style={{
              width: '14px', height: '14px',
              top: 'calc(50% - 7px)', left: 'calc(50% - 7px)',
              background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #a0aec0 50%, #334155 100%)',
              boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
            }}
          />

          {/* Hour Hand */}
          <div
            className="absolute z-30 origin-bottom rounded-full"
            style={{
              width: '6px', height: '45px',
              bottom: '50%', left: 'calc(50% - 3px)',
              background: 'linear-gradient(to right, #334155 0%, #1e293b 50%, #475569 100%)',
              transform: `rotate(${hourDegrees}deg)`,
              boxShadow: '-3px 3px 5px rgba(0,0,0,0.25)',
            }}
          />

          {/* Minute Hand */}
          <div
            className="absolute z-30 origin-bottom rounded-full"
            style={{
              width: '4px', height: '60px',
              bottom: '50%', left: 'calc(50% - 2px)',
              background: 'linear-gradient(to right, #475569 0%, #334155 50%, #64748b 100%)',
              transform: `rotate(${minDegrees}deg)`,
              boxShadow: '-3px 3px 5px rgba(0,0,0,0.25)',
            }}
          />

          {/* Second Hand (Classic Aero Red) */}
          <div
            className="absolute z-30 origin-bottom"
            style={{
              width: '2px', height: '70px',
              bottom: '50%', left: 'calc(50% - 1px)',
              background: 'linear-gradient(to right, #ef4444 0%, #b91c1c 100%)',
              transform: `rotate(${secDegrees}deg)`,
              boxShadow: '-2px 4px 5px rgba(0,0,0,0.2)',
            }}
          >
            {/* Counterweight for second hand */}
            <div 
              className="absolute rounded-full"
              style={{
                width: '6px', height: '18px',
                bottom: '-14px', left: '-2px',
                background: '#b91c1c',
                boxShadow: '-2px 2px 3px rgba(0,0,0,0.2)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}