'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle, Film, Music, Image as ImageIcon } from 'lucide-react';
import { FILE_SYSTEM } from '../config/files';
import { useVolumeState } from '../../hooks/useVolumeState';

export default function MediaPlayerApp({ file }) {
  const [selectedFile, setSelectedFile] = useState(file || FILE_SYSTEM[2]);
  const activeFile = file || selectedFile;
  const [volume, setVolume] = useVolumeState();

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const mediaRef = useRef(null);

  useEffect(() => {
    const resetPlayback = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime('0:00');
      setDuration('0:00');
    };

    resetPlayback();

    if (mediaRef.current) {
      mediaRef.current.load();
    }
  }, [activeFile]);

  useEffect(() => {
    if (!mediaRef.current) return;

    mediaRef.current.volume = volume / 100;
    mediaRef.current.muted = volume === 0;
  }, [volume]);

  const togglePlay = () => {
    if (activeFile.type === 'image') return;
    if (isPlaying) {
      mediaRef.current?.pause();
    } else {
      mediaRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!mediaRef.current) return;
    const current = mediaRef.current.currentTime;
    const total = mediaRef.current.duration;
    setProgress((current / total) * 100);

    const formatTime = (time) => {
      if (isNaN(time)) return '0:00';
      const m = Math.floor(time / 60);
      const s = Math.floor(time % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
    };

    setCurrentTime(formatTime(current));
    setDuration(formatTime(total));
  };

  return (
    <div className="flex flex-col w-full h-full select-none wmp-container" style={{ fontFamily: '"Segoe UI", Tahoma, sans-serif' }}>
      <div className="h-7 border-b border-[#b4c6d8] bg-linear-to-b from-[#ffffff] to-[#e8eff5] flex items-center justify-between px-3 text-[11px] text-gray-700">
        <div className="flex items-center gap-4">
          <span className="text-[#003399] font-semibold cursor-pointer">Organize</span>
          <span className="hover:text-black cursor-pointer">Stream</span>
          <span className="hover:text-black cursor-pointer">Create playlist</span>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">

        <div className="w-44 wmp-sidebar p-2 flex flex-col gap-1 text-[11px] text-gray-700">
          <div className="font-bold text-gray-800 px-2 py-1 flex items-center gap-1">
            <span className="text-gray-400">▼</span> Library
          </div>
          <div className="pl-4 flex flex-col gap-0.5">
            <button className={`text-left px-2 py-1 rounded-xs flex items-center gap-1.5 ${activeFile.type === 'audio' ? 'bg-[#bcccdc] font-semibold text-black' : 'hover:bg-[#deebf6]'}`}>
              <Music size={12} color="#555" /> Music
            </button>
            <button className={`text-left px-2 py-1 rounded-xs flex items-center gap-1.5 ${activeFile.type === 'video' ? 'bg-[#bcccdc] font-semibold text-black' : 'hover:bg-[#deebf6]'}`}>
              <Film size={12} color="#555" /> Videos
            </button>
            <button className={`text-left px-2 py-1 rounded-xs flex items-center gap-1.5 ${activeFile.type === 'image' ? 'bg-[#bcccdc] font-semibold text-black' : 'hover:bg-[#deebf6]'}`}>
              <ImageIcon size={12} color="#555" /> Pictures
            </button>
          </div>

          <div className="mt-2 border-t border-[#d3dce7] pt-2">
            <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-500">Files</div>
            <div className="flex flex-col gap-0.5 max-h-48 overflow-y-auto pr-1">
              {FILE_SYSTEM.map((item) => {
                const isActive = activeFile?.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedFile(item)}
                    className={`text-left rounded-xs px-2 py-1 hover:bg-[#deebf6] ${isActive ? 'bg-[#bcccdc] font-semibold text-black' : 'text-gray-700'}`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex-1 relative bg-black flex flex-col items-center justify-center overflow-hidden border-l border-[#b4c6d8]">

          {activeFile.type === 'video' && (
            <video ref={mediaRef} src={activeFile.url} className="w-full h-full object-contain" onTimeUpdate={handleTimeUpdate} onEnded={() => setIsPlaying(false)} />
          )}

          {activeFile.type === 'image' && (
            <img src={activeFile.url} alt={activeFile.name} className="max-w-full max-h-full object-contain animate-in fade-in duration-300" />
          )}

          {activeFile.type === 'audio' && (
            <>
              <audio ref={mediaRef} src={activeFile.url} onTimeUpdate={handleTimeUpdate} onEnded={() => setIsPlaying(false)} />
              <div className="absolute inset-0 bg-linear-to-tr from-[#021b3a] via-[#0b3866] to-[#021b3a] flex items-center justify-center">
                <div className="absolute w-[80%] h-[70%] bg-[#1b5fa8]/20 blur-[60px] rounded-full mix-blend-screen animate-pulse" />
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-32 h-32 rounded border border-white/10 shadow-[0_8px_16px_rgba(0,0,0,0.5)] bg-linear-to-b from-[#1b5fa8] to-[#082952] flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-linear-to-b from-white/20 to-transparent pointer-events-none" />
                  <Music size={48} color="rgba(255,255,255,0.6)" strokeWidth={1} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="h-18 relative flex items-center justify-between px-4 z-20 wmp-control-deck">

        <div className="flex flex-col w-48 text-[11px] truncate leading-tight">
          <span className="font-bold text-gray-800 truncate">{activeFile.name}</span>
          <span className="text-gray-500 truncate">{activeFile.artist || (activeFile.type === 'image' ? 'Image Viewer' : 'Media')}</span>
        </div>

        <div className={`flex flex-col items-center gap-1.5 flex-1 max-w-sm ${activeFile.type === 'image' ? 'opacity-40 pointer-events-none' : ''}`}>

          <div className="flex items-center gap-2">
            <Shuffle size={13} className="text-gray-600 hover:text-black cursor-pointer mx-1" />

            <button className="w-7 h-7 rounded-full bg-linear-to-b from-white to-[#dce5ed] border border-[#a3b8cc] active:bg-[#cce3f6] flex items-center justify-center shadow-xs">
              <SkipBack size={13} fill="#445566" color="#445566" />
            </button>

            <button onClick={togglePlay} className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 wmp-play-button relative group active:scale-95">
              <div className="absolute top-px left-0.5 right-0.5 h-[40%] rounded-t-full bg-linear-to-b from-white/40 to-transparent pointer-events-none" />
              {isPlaying ? <Pause size={16} fill="white" color="white" /> : <Play size={16} fill="white" color="white" className="ml-0.5" />}
            </button>

            <button className="w-7 h-7 rounded-full bg-linear-to-b from-white to-[#dce5ed] border border-[#a3b8cc] active:bg-[#cce3f6] flex items-center justify-center shadow-xs">
              <SkipForward size={13} fill="#445566" color="#445566" />
            </button>

            <Repeat size={13} className="text-gray-600 hover:text-black cursor-pointer mx-1" />
          </div>

          <div className="w-full flex items-center gap-2 text-[10px] text-gray-600 font-medium font-mono">
            <span>{currentTime}</span>
            <div className="flex-1 h-1.25 bg-[#d5e0ea] rounded-full shadow-inner relative overflow-hidden border border-[#b5c7d6] cursor-pointer">
              <div className="absolute top-0 left-0 bottom-0 bg-linear-to-b from-[#70caff] to-[#007cd6] transition-all duration-100" style={{ width: `${progress}%` }} />
            </div>
            <span>{duration}</span>
          </div>
        </div>

        <div className={`w-48 flex items-center justify-end gap-2 ${activeFile.type === 'image' ? 'opacity-40' : ''}`}>
          <Volume2 size={14} className="text-gray-600" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            className="w-16 h-1 accent-[#007cd6] cursor-pointer"
          />
          <span className="text-[10px] text-gray-600 w-7 text-right">{volume}</span>
        </div>
      </div>
    </div>
  );
}