'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { User, Power, Search, Lock, RotateCcw, Wind } from 'lucide-react';
import { APP_REGISTRY } from '../config/apps';

export default function StartMenu({ onOpenApp }) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const menuRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredApps = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        if (!normalizedQuery) return APP_REGISTRY;

        return APP_REGISTRY.filter((app) => {
            const haystack = `${app.title} ${app.label} ${app.id}`.toLowerCase();
            return haystack.includes(normalizedQuery);
        });
    }, [query]);

    const handleAppLaunch = (appId) => {
        setIsOpen(false);
        setQuery('');
        onOpenApp?.(appId);
    };

    const handlePowerAction = (action) => {
        setIsOpen(false);
        setQuery('');

        if (action === 'lock') {
            try {
                window.sessionStorage.setItem('aeroos-flow', 'lock');
            } catch {}
            router.push('/lock');
            return;
        }

        if (action === 'restart') {
            try {
                window.sessionStorage.setItem('aeroos-flow', 'boot');
            } catch {}
            router.push('/boot');
            return;
        }

        router.push('/shutdown');
    };

    return (
        <div ref={menuRef} className="absolute bottom-4 left-4 z-50 flex flex-col justify-end select-none">
            {isOpen && (
                <div
                    className="w-105 h-120 rounded-xl flex flex-col overflow-hidden aero-start-menu mb-3 animate-in fade-in slide-in-from-bottom-2 duration-200"
                    style={{ fontFamily: '"Segoe UI", Tahoma, sans-serif' }}
                >
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-linear-to-b from-white/30 to-transparent pointer-events-none z-0" />

                    <div className="flex flex-1 z-10 m-0.5 rounded-lg overflow-hidden border border-white/20 shadow-inner">
                        <div className="w-[60%] bg-white/95 flex flex-col p-2">
                            <div className="flex items-center gap-3 p-2 border-b border-gray-300 mb-2 shadow-[0_1px_0_rgba(255,255,255,0.8)]">
                                <div className="w-10 h-10 rounded border border-gray-400 flex items-center justify-center bg-gray-100 shadow-inner overflow-hidden">
                                    <User size={24} color="#666" />
                                </div>
                                <span className="font-bold text-gray-800 text-[14px]">Guest User</span>
                            </div>

                            <div className="flex-1 flex flex-col gap-1 overflow-y-auto pr-1 mt-1">
                                {filteredApps.length > 0 ? (
                                    filteredApps.map((app) => (
                                        <button
                                            key={app.id}
                                            type="button"
                                            onClick={() => handleAppLaunch(app.id)}
                                            className="flex items-center gap-2 p-1.5 hover:bg-[#cce8ff] hover:border-[#99d1ff] border border-transparent rounded cursor-pointer transition-colors text-left"
                                        >
                                            <span className="flex items-center justify-center w-5 h-5 shrink-0">
                                                {app.icon}
                                            </span>
                                            <span className="text-[12px] text-gray-900 leading-tight">{app.label}</span>
                                        </button>
                                    ))
                                ) : (
                                    <div className="px-2 py-4 text-[12px] text-gray-600">No apps found.</div>
                                )}
                            </div>

                            <div className="mt-2 relative">
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    placeholder="Search programs and files"
                                    className="w-full pl-3 pr-8 py-1.5 text-[12px] italic text-gray-500 border border-gray-300 rounded-full shadow-inner outline-none focus:border-[#3399ff]"
                                />
                                <Search size={14} className="absolute right-3 top-2 text-gray-400" />
                            </div>
                        </div>

                        <div className="w-[40%] bg-transparent flex flex-col p-2 py-4">
                            <div className="flex-1 flex flex-col justify-end gap-1.5">
                                <button
                                    type="button"
                                    onClick={() => handlePowerAction('lock')}
                                    className="flex items-center gap-2 px-3 py-2 rounded aero-shutdown-btn text-left"
                                >
                                    <Lock size={14} className="text-gray-800" />
                                    <span className="text-[12px] font-semibold text-gray-800">Lock</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handlePowerAction('restart')}
                                    className="flex items-center gap-2 px-3 py-2 rounded aero-shutdown-btn text-left"
                                >
                                    <RotateCcw size={14} className="text-gray-800" />
                                    <span className="text-[12px] font-semibold text-gray-800">Restart</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handlePowerAction('shutdown')}
                                    className="flex items-center gap-2 px-3 py-2 rounded aero-shutdown-btn text-left"
                                >
                                    <Power size={14} className="text-red-600" />
                                    <span className="text-[12px] font-semibold text-gray-800">Shut down</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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