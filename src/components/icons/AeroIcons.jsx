'use client';

function IconBase({ size = 28, children, gradId, from, mid, to }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradId} x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={from} />
          <stop offset="45%" stopColor={mid} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <linearGradient id={`${gradId}-gloss`} x1="16" y1="2" x2="16" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0.85" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      {children}
    </svg>
  );
}

export function GlobeIcon({ size = 28 }) {
  return (
    <IconBase size={size} gradId="globe" from="#b3ecff" mid="#00A8E8" to="#005f99">
      <circle cx="16" cy="16" r="13" fill="url(#globe)" stroke="rgba(0,50,90,0.45)" strokeWidth="1" />
      <path d="M3 16h26M16 3c4 4 6 8 6 13s-2 9-6 13c-4-4-6-8-6-13s2-9 6-13z"
        stroke="rgba(255,255,255,0.65)" strokeWidth="1" fill="none" />
      <path d="M6 9c3 2 17 2 20 0M6 23c3-2 17-2 20 0"
        stroke="rgba(255,255,255,0.45)" strokeWidth="1" fill="none" />
      <path d="M4 12a13 13 0 0 1 20-7" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
      <ellipse cx="16" cy="10" rx="11" ry="6" fill="url(#globe-gloss)" />
    </IconBase>
  );
}

export function ClockIcon({ size = 28 }) {
  return (
    <IconBase size={size} gradId="clock" from="#d4ffb3" mid="#7CFC00" to="#3a8800">
      <circle cx="16" cy="16" r="13" fill="url(#clock)" stroke="rgba(30,70,0,0.45)" strokeWidth="1" />
      <circle cx="16" cy="16" r="9.5" fill="white" fillOpacity="0.9" stroke="rgba(0,0,0,0.15)" />
      {[...Array(12)].map((_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        const r1 = i % 3 === 0 ? 6.8 : 7.6;
        const x1 = round(16 + r1 * Math.sin(a));
        const y1 = round(16 - r1 * Math.cos(a));
        const x2 = round(16 + 8.6 * Math.sin(a));
        const y2 = round(16 - 8.6 * Math.cos(a));
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3a5f1a" strokeWidth={i % 3 === 0 ? 1.1 : 0.6} />;
      })}
      <line x1="16" y1="16" x2="16" y2="10.5" stroke="#2c4a12" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="16" y1="16" x2="20.5" y2="17.8" stroke="#2c4a12" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="16" cy="16" r="1.3" fill="#2c4a12" />
      <ellipse cx="16" cy="10" rx="11" ry="6" fill="url(#clock-gloss)" />
    </IconBase>
  );
}

function round(n) {
  return Math.round(n * 1000) / 1000;
}

export function NotepadIcon({ size = 28 }) {
  return (
    <IconBase size={size} gradId="pad" from="#ffe9b3" mid="#ffb800" to="#a86a00">
      <rect x="4" y="3" width="24" height="26" rx="3" fill="url(#pad)" stroke="rgba(90,55,0,0.45)" strokeWidth="1" />
      <rect x="7.5" y="7" width="17" height="18" rx="1" fill="white" fillOpacity="0.92" />
      <line x1="9.5" y1="11" x2="22" y2="11" stroke="#c98a00" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="9.5" y1="14.5" x2="22" y2="14.5" stroke="#c98a00" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="9.5" y1="18" x2="18" y2="18" stroke="#c98a00" strokeWidth="1.3" strokeLinecap="round" />
      <rect x="10.5" y="1.5" width="4" height="4" rx="1" fill="#a86a00" />
      <rect x="17.5" y="1.5" width="4" height="4" rx="1" fill="#a86a00" />
      <ellipse cx="16" cy="9" rx="10" ry="5" fill="url(#pad-gloss)" />
    </IconBase>
  );
}

export function WeatherIcon({ size = 28 }) {
  return (
    <IconBase size={size} gradId="wthr" from="#d6f0ff" mid="#5bc8f5" to="#0077b6">
      <circle cx="16" cy="16" r="13" fill="url(#wthr)" stroke="rgba(0,50,90,0.45)" strokeWidth="1" />
      <circle cx="13" cy="14" r="5" fill="#ffd23f" stroke="#e0a800" strokeWidth="0.6" />
      <path d="M10 22c0-3 2.5-5 5.5-5 2 0 3.7 1 4.6 2.6.4-.1.8-.1 1.2-.1 2.3 0 4.2 1.8 4.2 4.1 0 .5-.1.9-.2 1.3H9.3c-.5-.6-.8-1.4-.8-2.3 0-1.5 1-2.8 2.4-3.2z"
        fill="white" fillOpacity="0.95" stroke="rgba(0,60,100,0.25)" strokeWidth="0.5" />
      <ellipse cx="16" cy="9" rx="10" ry="5" fill="url(#wthr-gloss)" />
    </IconBase>
  );
}

export function WifiIcon({ size = 16, color = '#ffffff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 9c4.5-4 11.5-4 16 0" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <path d="M7 13c3-2.5 7-2.5 10 0" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.75" />
      <path d="M10 17c1.5-1.2 2.5-1.2 4 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="20" r="1.4" fill={color} />
    </svg>
  );
}

export function BatteryIcon({ size = 18, color = '#ffffff', level = 0.8 }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 24 12" fill="none">
      <rect x="1" y="1" width="19" height="10" rx="2" stroke={color} strokeWidth="1.4" opacity="0.85" />
      <rect x="21.5" y="4" width="1.8" height="4" rx="0.8" fill={color} opacity="0.85" />
      <rect x="2.5" y="2.5" width={16 * level} height="7" rx="1" fill={color} opacity="0.9" />
    </svg>
  );
}

export function SettingsIcon({ size = 28 }) {
  return (
    <IconBase size={size} gradId="settings" from="#ffffff" mid="#a0b4c8" to="#405b73">
      <path fillRule="evenodd" clipRule="evenodd" d="M19.4 29.5c-1 .2-2.3.2-3.3 0l-.8-3.4c-1-.4-2-.9-2.8-1.5l-3.3 1.3c-1-.5-1.8-1.1-2.5-1.9l1.6-3c-.6-.7-1.1-1.6-1.5-2.6L3.5 17.5c-.3-1-.3-2.1 0-3.1l3.3-.6c.4-1 .9-1.9 1.5-2.7l-1.5-3.1c.7-.8 1.6-1.5 2.5-1.9l3.2 1.4c.9-.7 1.8-1.2 2.8-1.6l.8-3.4c1-.2 2.3-.2 3.3 0l.8 3.4c1 .4 2 .9 2.8 1.5l3.3-1.3c1 .5 1.8 1.1 2.5 1.9l-1.6 3c.6.7 1.1 1.6 1.5 2.6l3.3.9c.3 1 .3 2.1 0 3.1l-3.3.6c-.4 1-.9 1.9-1.5 2.7l1.5 3.1c-.7.8-1.6 1.5-2.5 1.9l-3.2-1.4c-.9.7-1.8 1.2-2.8 1.6l-.8 3.4zm-3.4-17c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5z" fill="url(#settings)"
        stroke="rgba(0, 30, 60, 0.6)" strokeWidth="1" />
      <circle cx="16" cy="16" r="4.5" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="1.5" fill="none" />
      <circle cx="16" cy="16" r="11.5" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" fill="none" strokeDasharray="2 4" />
      <ellipse cx="16" cy="9.5" rx="10" ry="6" fill="url(#settings-gloss)" />
    </IconBase>
  );
}