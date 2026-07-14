'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function PowerGlyph({ size = 24, color = '#ffffff' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className="relative z-10"
      shapeRendering="crispEdges" 
    >
      <path d="M12 4v8" stroke={color} strokeWidth="2" />
      <path d="M7 6.5a8 8 0 1 0 10 0" stroke={color} strokeWidth="2" fill="none" />
    </svg>
  );
}

export default function ShutdownScreen() {
  const router = useRouter();
  const [powering, setPowering] = useState(false);

  function handlePowerOn() {
    if (powering) return;
    setPowering(true);
    try {
      window.sessionStorage.setItem('aeroos-flow', 'boot');
    } catch {}
    setTimeout(() => router.push('/boot'), 400);
  }

  return (
    <div 
      className="w-screen h-screen flex flex-col items-center justify-center relative overflow-hidden select-none"
      style={{ backgroundColor: '#000000' }}
    >
      
      <button
        onClick={handlePowerOn}
        aria-label="Power on"
        className="relative flex items-center justify-center outline-none"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '4px',
          background: powering 
            ? 'linear-gradient(180deg, #8a0000 0%, #5c0000 100%)' 
            : 'linear-gradient(180deg, #d90000 0%, #990000 100%)',
          border: '1px solid #4a0000',
          boxShadow: powering
            ? 'inset 1px 2px 4px rgba(0,0,0,0.8)'
            : 'inset 0px 1px 0px rgba(255,150,150,0.8), 1px 1px 0px rgba(0,0,0,0.5)',
          transition: 'background 75ms linear, box-shadow 75ms linear',
          cursor: 'pointer',
        }}
      >
        {!powering && (
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{
              height: '50%',
              background: 'rgba(255, 255, 255, 0.25)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          />
        )}

        <PowerGlyph color={powering ? '#aaaaaa' : '#ffffff'} />
      </button>
      <span
        style={{
          marginTop: '16px',
          fontFamily: '"Tahoma", "Segoe UI", sans-serif',
          fontSize: '11px',
          color: '#ffffff',
          textShadow: '1px 1px 0px #000000',
          opacity: powering ? 0.7 : 1,
          animation: powering ? 'blink 0.2s step-end infinite alternate' : 'none',
        }}
      >
        {powering ? 'Starting...' : 'Power ON'}
      </span>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}} />
    </div>
  );
}