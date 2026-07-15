'use client';

import { useState, useRef, useEffect } from 'react';
import { User, ChevronRight, Power, Search, Music, Gamepad2, Folder, Wind } from 'lucide-react';

export default function StartMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={menuRef} className="absolute bottom-4 left-4 z-50 flex flex-col justify-end select-none">
            {isOpen && (
                <div
                    className="w-105 h-120 rounded-xl flex flex-col overflow-hidden aero-start-menu mb-3 animate-in fade-in slide-in-from-bottom-2 duration-200"
                    style={{ fontFamily: '"Segoe UI", Tahoma, sans-serif' }}
                >
                    {/* glare overlay */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-linear-to-b from-white/30 to-transparent pointer-events-none z-0" />

                    <div className="flex flex-1 z-10 m-0.5 rounded-lg overflow-hidden border border-white/20 shadow-inner">

                        {/* left */}
                        <div className="w-[60%] bg-white/95 flex flex-col p-2">
                            <div className="flex items-center gap-3 p-2 border-b border-gray-300 mb-2 shadow-[0_1px_0_rgba(255,255,255,0.8)]">
                                <div className="w-10 h-10 rounded border border-gray-400 flex items-center justify-center bg-gray-100 shadow-inner overflow-hidden">
                                    <User size={24} color="#666" />
                                </div>
                                <span className="font-bold text-gray-800 text-[14px]">Guest User</span>
                            </div>

                            <div className="flex-1 flex flex-col gap-1 overflow-y-auto pr-1 mt-1">
                                <div className="flex items-center gap-2 p-1.5 hover:bg-[#cce8ff] hover:border-[#99d1ff] border border-transparent rounded cursor-pointer transition-colors">
                                    <Folder size={20} className="text-blue-600" />
                                    <span className="text-[12px] text-gray-900 leading-tight">File Explorer</span>
                                </div>
                                <div className="flex items-center gap-2 p-1.5 hover:bg-[#cce8ff] hover:border-[#99d1ff] border border-transparent rounded cursor-pointer transition-colors">
                                    <Music size={20} className="text-orange-500" />
                                    <span className="text-[12px] text-gray-900 leading-tight">Media Player</span>
                                </div>
                                <div className="flex items-center gap-2 p-1.5 hover:bg-[#cce8ff] hover:border-[#99d1ff] border border-transparent rounded cursor-pointer transition-colors">
                                    <Gamepad2 size={20} className="text-green-600" />
                                    <span className="text-[12px] text-gray-900 leading-tight">Games Explorer</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-2 mt-2 border-t border-gray-300 hover:bg-gray-100 cursor-pointer rounded transition-colors">
                                <span className="font-bold text-[#003399] text-[12px]">All Programs</span>
                                <ChevronRight size={14} className="text-gray-500" />
                            </div>

                            <div className="mt-2 relative">
                                <input
                                    type="text"
                                    placeholder="Search programs and files"
                                    className="w-full pl-3 pr-8 py-1.5 text-[12px] italic text-gray-500 border border-gray-300 rounded-full shadow-inner outline-none focus:border-[#3399ff]"
                                />
                                <Search size={14} className="absolute right-3 top-2 text-gray-400" />
                            </div>
                        </div>

                        {/* right */}
                        <div className="w-[40%] bg-transparent flex flex-col p-2 py-4">
                            <div className="flex-1 flex flex-col gap-1.5">
                                <div className="px-3 py-1 hover:bg-white/20 rounded cursor-pointer text-white font-semibold text-[12px] aero-text-effect">Documents</div>
                                <div className="px-3 py-1 hover:bg-white/20 rounded cursor-pointer text-white font-semibold text-[12px] aero-text-effect">Pictures</div>
                                <div className="px-3 py-1 hover:bg-white/20 rounded cursor-pointer text-white font-semibold text-[12px] aero-text-effect">Music</div>

                                <div className="h-px bg-black/20 shadow-[0_1px_0_rgba(255,255,255,0.3)] my-1 mx-2" />

                                <div className="px-3 py-1 hover:bg-white/20 rounded cursor-pointer text-white font-semibold text-[12px] aero-text-effect">Games</div>
                                <div className="px-3 py-1 hover:bg-white/20 rounded cursor-pointer text-white font-semibold text-[12px] aero-text-effect">Computer</div>

                                <div className="h-px bg-black/20 shadow-[0_1px_0_rgba(255,255,255,0.3)] my-1 mx-2" />

                                <div className="px-3 py-1 hover:bg-white/20 rounded cursor-pointer text-white font-semibold text-[12px] aero-text-effect">Control Panel</div>
                            </div>

                            {/* Shutdown Button Area */}
                            <div className="flex items-center justify-end gap-1 mt-4">
                                <button className="flex items-center gap-1.5 px-3 py-1 rounded aero-shutdown-btn">
                                    <Power size={12} className="text-red-600" />
                                    <span className="text-[12px] font-semibold text-gray-800">Shut down</span>
                                </button>
                                <button className="px-1 py-1 rounded aero-shutdown-btn flex items-center justify-center">
                                    <ChevronRight size={14} className="text-gray-800" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-18 h-21 rounded-xl flex items-center justify-center aero-start-btn group ${isOpen ? 'shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_0_8px_rgba(51,153,255,0.6)]' : ''}`}
                title="Start"
            >
                <Wind
                    size={24}
                    color="#ffffff"
                    strokeWidth={2.5}
                    className="group-hover:scale-110"
                    style={{ filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.7))' }}
                />
            </button>
        </div>
    );
}