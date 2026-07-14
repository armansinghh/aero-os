'use client';

import { useState } from 'react';
import { Monitor, Volume2, Paintbrush, Wifi, Info, User } from 'lucide-react';

export default function SettingsApp({ wallpaperProps }) {
    const [activeTab, setActiveTab] = useState('personalization');

    // Custom URL states for the personalization tab
    const [inputUrl, setInputUrl] = useState('');
    const [status, setStatus] = useState('');

    const { wallpapers, activeIndex, customUrl, onSelect, onSetCustomUrl } = wallpaperProps || {};

    const tabs = [
        { id: 'personalization', label: 'Personalization', icon: <Paintbrush size={16} /> },
        { id: 'system', label: 'System & Sound', icon: <Volume2 size={16} /> },
        { id: 'network', label: 'Network & Internet', icon: <Wifi size={16} /> },
        { id: 'accounts', label: 'User Accounts', icon: <User size={16} /> },
        { id: 'about', label: 'About AeroOS', icon: <Info size={16} /> },
    ];

    const SectionHeader = ({ title }) => (
        <div className="mb-4">
            <h2 style={{ fontFamily: '"Segoe UI", Tahoma, sans-serif', fontSize: '18px', color: '#003399', fontWeight: 400 }}>
                {title}
            </h2>
            <div style={{ height: '1px', background: 'linear-gradient(to right, #003399 0%, transparent 100%)', marginTop: '2px', opacity: 0.3 }} />
        </div>
    );

    function validateAndApply(e) {
        e.preventDefault();
        const url = inputUrl.trim();
        if (!/\.(jpe?g|png|gif|webp|avif)(\?.*)?$/i.test(url)) {
            setStatus('error');
            return;
        }
        setStatus('checking');
        const img = new Image();
        img.onload = () => {
            onSetCustomUrl(url);
            const customIndex = wallpapers.findIndex((w) => w.id === 'custom');
            onSelect(customIndex);
            setStatus('success');
            setInputUrl(''); // clear input on success
        };
        img.onerror = () => setStatus('error');
        img.src = url;
    }

    return (
        <div className="flex w-full h-full select-none" style={{ fontFamily: '"Tahoma", "Segoe UI", sans-serif', fontSize: '12px', WebkitFontSmoothing: 'none' }}>

            {/* Left Sidebar */}
            <div className="w-48 flex flex-col py-4 border-r border-[#d4d4d4]" style={{ background: 'linear-gradient(to right, #f0f4f9 0%, #e3eaf3 100%)', boxShadow: 'inset -1px 0 0 #ffffff' }}>
                <div className="px-4 mb-4"><span className="font-bold text-gray-800 text-[13px]">Control Panel</span></div>
                <div className="flex flex-col">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="flex items-center gap-3 px-4 py-2 text-left outline-none"
                            style={{
                                background: activeTab === tab.id ? '#ffffff' : 'transparent',
                                borderColor: activeTab === tab.id ? '#c4d5e8' : 'transparent',
                                borderRightColor: activeTab === tab.id ? '#ffffff' : 'transparent',
                                borderStyle: 'solid',
                                borderWidth: '1px',
                                marginRight: '-1px',
                                color: activeTab === tab.id ? '#000000' : '#003399',
                            }}
                        >
                            <div style={{ color: activeTab === tab.id ? '#0058a3' : '#444' }}>{tab.icon}</div>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Content Area */}
            <div className="flex-1 bg-white p-6 overflow-y-auto">

                {activeTab === 'personalization' && wallpapers && (
                    <div className="flex flex-col animate-in fade-in duration-200">
                        <SectionHeader title="Change the visuals and sounds on your computer" />
                        <p className="text-gray-600 mb-4">Click a theme to change the desktop background, window color, and sounds all at once.</p>

                        {/* Theme Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {wallpapers.map((wp, i) => {
                                const isActive = i === activeIndex;
                                const isCustom = wp.id === 'custom';
                                const previewSrc = isCustom ? customUrl : wp.src;

                                return (
                                    <div key={wp.id} onClick={() => onSelect(i)} className="flex flex-col items-center gap-2 cursor-pointer group">
                                        <div
                                            className="w-24 h-16 rounded border p-0.5 transition-all"
                                            style={{
                                                borderColor: isActive ? '#3399ff' : '#cccccc',
                                                boxShadow: isActive ? '0 0 5px rgba(51,153,255,0.6)' : 'none',
                                                background: isActive ? '#e5f3ff' : 'transparent'
                                            }}
                                        >
                                            {previewSrc ? (
                                                <img src={previewSrc} alt={wp.label} className="w-full h-full object-cover border border-gray-400" />
                                            ) : (
                                                <div className="w-full h-full border border-gray-400 bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 font-bold text-lg">+</div>
                                            )}
                                        </div>
                                        <span className={`text-[11px] ${isActive ? 'font-bold text-black' : 'group-hover:underline text-gray-800'}`}>
                                            {wp.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Custom URL Input Area */}
                        <SectionHeader title="Set Custom Background URL" />
                        <form onSubmit={validateAndApply} className="flex items-center gap-2 mt-2">
                            <input
                                type="text"
                                value={inputUrl}
                                onChange={(e) => { setInputUrl(e.target.value); setStatus(''); }}
                                placeholder="https://example.com/image.jpg"
                                className="w-72 px-2 py-1 outline-none border"
                                style={{ borderColor: '#a0a0a0', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}
                            />
                            <button
                                type="submit"
                                className="px-4 py-1 text-black bg-[#f0f0f0] border border-[#707070] rounded-xs hover:bg-[#e5f1fb] hover:border-[#0078d7] active:bg-[#cce4f7] active:border-[#005499]"
                            >
                                {status === 'checking' ? 'Checking...' : 'Apply'}
                            </button>
                        </form>
                        {status === 'error' && <p className="text-red-600 mt-2 text-[11px]">Invalid image URL. Must end in .jpg, .png, etc.</p>}
                        {status === 'success' && <p className="text-green-600 mt-2 text-[11px]">Custom wallpaper applied successfully.</p>}
                    </div>
                )}
                {activeTab === 'system' && (
                    <div className="flex flex-col animate-in fade-in duration-200">
                        <SectionHeader title="Adjust system volume" />
                        <div className="flex items-center gap-4 mt-4 px-4 py-6 bg-[#f8fafd] border border-[#e0e0e0] rounded-xs">
                            <Volume2 size={24} color="#0058a3" />
                            <input type="range" className="w-64 cursor-pointer" />
                        </div>
                    </div>
                )}

                {activeTab === 'about' && (
                    <div className="flex flex-col animate-in fade-in duration-200">
                        <div className="flex items-center gap-4 mb-6">
                            <Monitor size={48} color="#0058a3" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: '"Segoe UI", sans-serif' }}>AeroOS</h1>
                                <p className="text-gray-500">Version 1.0 (Build 7601: Service Pack 1)</p>
                            </div>
                        </div>
                        <SectionHeader title="System Information" />
                        <table className="w-full text-left mt-2 border-collapse">
                            <tbody>
                                <tr className="border-b border-gray-100"><th className="py-2 font-normal text-gray-500 w-32">Processor:</th><td className="py-2 text-gray-800">WebOS Virtual CPU @ 3.40GHz</td></tr>
                                <tr className="border-b border-gray-100"><th className="py-2 font-normal text-gray-500">Installed memory:</th><td className="py-2 text-gray-800">16.0 GB</td></tr>
                                <tr className="border-b border-gray-100"><th className="py-2 font-normal text-gray-500">System type:</th><td className="py-2 text-gray-800">64-bit Web Operating System</td></tr>
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
        </div>
    );
}