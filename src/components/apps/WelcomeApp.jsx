'use client';

export default function WelcomeApp() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-between px-6 py-5 overflow-auto select-none relative"
      style={{
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
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)',
          backgroundSize: '4px 4px',
        }}
      />

      <div className="flex flex-col items-center gap-2 pt-1 relative z-10">
        <HeroBadge />

        <h1
          style={{
            fontFamily: '"Segoe UI", Frutiger, "Frutiger Linotype", sans-serif',
            fontSize: '18px',
            fontWeight: 700,
            color: '#062640',
            textShadow:
              '0 0 8px rgba(255,255,255,1), 0 0 4px rgba(255,255,255,0.8), 0 1px 1px rgba(255,255,255,0.9)',
            letterSpacing: '0.02em',
            marginTop: '6px',
          }}
        >
          AeroOS
        </h1>

        <p
          style={{
            fontFamily: '"Segoe UI", Tahoma, sans-serif',
            fontSize: '12px',
            color: '#1a3b5c',
            textAlign: 'center',
            lineHeight: 1.4,
            maxWidth: '280px',
            textShadow: '0 1px 1px rgba(255,255,255,0.8)',
            fontWeight: 500,
          }}
        >
          A weekend build, mostly an excuse to play with glass, gradients,
          and bring back a desktop look from the Vista era.
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap justify-center my-4 relative z-10">
        {['Glass UI', 'Draggable Windows', 'Live Dock'].map((label) => (
          <span
            key={label}
            className="relative overflow-hidden"
            style={{
              fontSize: '10px',
              fontFamily: 'Tahoma, sans-serif',
              fontWeight: 700,
              color: '#ffffff',
              padding: '4px 12px',
              borderRadius: '9999px',
              border: '1px solid rgba(0, 50, 100, 0.4)',
              background:
                'linear-gradient(180deg, #5bb4eb 0%, #178add 49%, #056bbb 50%, #004d8c 100%)',
              boxShadow: `
                0 2px 4px rgba(0,0,0,0.2),
                inset 0 -2px 4px rgba(0,0,0,0.2)
              `,
              textShadow: '0 -1px 1px rgba(0,0,0,0.4)',
            }}
          >
            <div
              className="absolute top-0 left-0 w-full rounded-full"
              style={{
                height: '45%',
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.1) 100%)',
                transform: 'scaleY(0.9)',
              }}
            />
            <span className="relative z-10">{label}</span>
          </span>
        ))}
      </div>

      <div
        className="w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg relative z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%)',
          borderTop: '1px solid rgba(255,255,255,0.8)',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          boxShadow: `
            inset 0 1px 3px rgba(255,255,255,0.9),
            inset 0 -1px 2px rgba(255,255,255,0.4),
            0 2px 5px rgba(0,40,80,0.1)
          `,
        }}
      >
        <span
          style={{
            fontSize: '10px',
            fontFamily: '"Segoe UI", Tahoma, sans-serif',
            fontWeight: 600,
            color: '#1a3b5c',
            textShadow: '0 1px 1px rgba(255,255,255,0.9)',
          }}
        >
          Built by{' '}
          <a
            href="http://armansingh.me"
            target="_blank"
            style={{ color: '#0066cc', textDecoration: 'none' }}
            onMouseOver={(e) => (e.target.style.textDecoration = 'underline')}
            onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
          >
            Arman
          </a>
        </span>
      </div>
    </div>
  );
}

// --- Hero badge: The "Vista Pearl" ------------------------------------------
function HeroBadge() {
  return (
    <div
      style={{
        width: '72px',
        height: '72px',
        borderRadius: '50%',
        position: 'relative',
        background:
          'radial-gradient(circle at 30% 30%, #38bdf8 0%, #0284c7 40%, #0369a1 80%, #0c4a6e 100%)',
        boxShadow: `
          inset 0 -4px 8px rgba(124, 252, 0, 0.4), 
          inset 0 -1px 2px rgba(255, 255, 255, 0.5),
          0 6px 12px rgba(0, 50, 100, 0.4),
          0 1px 3px rgba(0, 0, 0, 0.3)
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '10%',
          width: '80%',
          height: '60%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(167, 243, 208, 0.7) 0%, transparent 70%)',
          filter: 'blur(4px)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: '120%',
          height: '120%',
          borderTop: '6px solid rgba(255,255,255,0.6)',
          borderRadius: '50%',
          transform: 'rotate(-30deg) translateY(-25px)',
          filter: 'blur(1px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '90%',
          height: '90%',
          borderBottom: '4px solid rgba(255,255,255,0.4)',
          borderRadius: '50%',
          transform: 'rotate(-15deg) translateY(20px)',
          filter: 'blur(1px)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '2px',
          left: '12%',
          width: '76%',
          height: '45%',
          borderRadius: '50% 50% 30% 30% / 100% 100% 30% 30%',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0) 100%)',
          zIndex: 10,
        }}
      />
    </div>
  );
}