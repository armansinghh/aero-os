'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const BOOT_STEPS = [
  'Initializing kernel modules',
  'Mounting glass filesystem',
  'Calibrating specular highlights',
  'Starting Aero composition services',
  'Loading dock and desktop shell',
];

export default function BootScreen() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    let flow = null;
    try {
      flow = window.sessionStorage.getItem('aeroos-flow');
    } catch {}
    if (flow !== 'boot') {
      router.replace('/shutdown');
      return;
    }
    setAllowed(true);
  }, [router]);

  useEffect(() => {
    if (!allowed) return;
    
    if (stepIndex >= BOOT_STEPS.length) {
      const t = setTimeout(() => {
        try {
          window.sessionStorage.setItem('aeroos-flow', 'lock');
        } catch {}
        router.push('/lock');
      }, 600); // Short mechanical pause before screen switch
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setStepIndex((i) => i + 1), stepIndex === 2 ? 800 : 400);
    return () => clearTimeout(t);
  }, [allowed, stepIndex, router]);

  if (!allowed) return <div className="w-screen h-screen bg-black" />;

  const progress = Math.min(100, (stepIndex / BOOT_STEPS.length) * 100);

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center select-none bg-black overflow-hidden"
    >
      <div 
        className="mb-8 text-white font-bold tracking-widest"
        style={{ 
          fontFamily: '"Tahoma", sans-serif', 
          fontSize: '24px',
          textShadow: '2px 2px 0px #000',
          WebkitFontSmoothing: 'none'
        }}
      >
        AeroOS
      </div>
      <div
        style={{
          width: '224px',
          height: '16px',
          border: '1px solid #555',
          borderBottomColor: '#ccc',
          borderRightColor: '#ccc',
          background: '#000',
          padding: '1px',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: '#00FF00',
            backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 8px, #000 8px, #000 10px)',
            transition: 'none',
          }}
        />
      </div>

      <span
        style={{
          marginTop: '8px',
          fontFamily: '"Tahoma", sans-serif',
          fontSize: '11px',
          color: '#c0c0c0',
        }}
      >
        Starting...
      </span>

      <div 
        className="mt-12 flex flex-col gap-1" 
        style={{ width: '320px' }}
      >
        {BOOT_STEPS.map((label, i) => {
          const state = i < stepIndex ? 'done' : i === stepIndex ? 'active' : 'pending';
          if (state === 'pending') return null;
          
          return (
            <div 
              key={label} 
              className="flex items-center justify-between"
              style={{
                fontFamily: '"Consolas", "Courier New", monospace',
                fontSize: '12px',
                color: state === 'done' ? '#888888' : '#ffffff',
                WebkitFontSmoothing: 'none'
              }}
            >
              <span>{label}</span>
              <span className="shrink-0 ml-4 font-bold text-[11px]">
                {state === 'done' ? (
                  <span style={{ color: '#00FF00' }}>[ OK ]</span>
                ) : (
                  <span className="animate-[blink_0.5s_step-end_infinite]">_</span>
                )}
              </span>
            </div>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}} />
    </div>
  );
}