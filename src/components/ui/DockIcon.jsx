'use client';

export default function DockIcon({ app, open, minimized, onClick }) {
  const tileBg = app.tileBg || 'linear-gradient(180deg, #5bb4eb 0%, #178add 49%, #056bbb 50%, #004d8c 100%)';

  return (
    <div
      className="relative z-10 flex flex-col items-center cursor-pointer min-w-14"
      onClick={onClick}
      title={app.label}
    >
      <div
        className="relative w-12 h-12 rounded-[10px] mt-2 flex items-center justify-center hover:scale-110 text-[1.7rem] aero-dock-tile"
        style={{ background: tileBg }}
      >
        <div className="absolute top-0 left-0 right-0 h-[48%] rounded-t-[10px] bg-linear-to-b from-white/65 to-transparent pointer-events-none" />

        <span className="relative inline-flex filter-[drop-shadow(0_1px_2px_rgba(0,0,0,0.40))]" >
          {app.icon}
        </span>
      </div>

      <span className="text-white text-[10px] font-semibold mt-0.5 tracking-wide subpixel-antialiased aero-text-effect">
        {app.label}
      </span>

      <div className="h-1.5 flex items-center justify-center mt-px">
        {(open || minimized) && (
          <div
            className="w-1.25 h-1.25 rounded-full border border-black/25"
            style={{ backgroundColor: open ? '#40e0d0' : '#ffb800' }}
          />
        )}
      </div>
    </div>
  );
}