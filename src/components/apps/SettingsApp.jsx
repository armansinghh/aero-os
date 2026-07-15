'use client';

import { useState } from 'react';
import { Monitor, Volume2, Paintbrush, Wifi, Info, User, HardDrive, ShieldCheck, Lock, ChevronRight, CheckCircle2, Volume1 } from 'lucide-react';
import { useNetworkState } from '../../hooks/useNetworkState';
import { useVolumeState } from '../../hooks/useVolumeState';

function SectionHeader({ title }) {
    return (
        <div className="mb-4">
            <h2 style={{ fontFamily: '"Segoe UI", Tahoma, sans-serif', fontSize: '18px', color: '#003399', fontWeight: 400 }}>
                {title}
            </h2>
            <div style={{ height: '1px', background: 'linear-gradient(to right, #003399 0%, transparent 100%)', marginTop: '2px', opacity: 0.3 }} />
        </div>
    );
}

export default function SettingsApp({ wallpaperProps }) {
    const [activeTab, setActiveTab] = useState('personalization');
    const [inputUrl, setInputUrl] = useState('');
    const [status, setStatus] = useState('');
    const [volume, setVolume] = useVolumeState();
    const [networkState, updateNetworkState] = useNetworkState();
    const [selectedAccount] = useState('guest');

    const { wifiEnabled, airplaneMode } = networkState;

    const { wallpapers, activeIndex, customUrl, onSelect, onSetCustomUrl } = wallpaperProps || {};

    const tabs = [
        { id: 'personalization', label: 'Personalization', icon: <Paintbrush size={16} /> },
        { id: 'system', label: 'System & Sound', icon: <Volume2 size={16} /> },
        { id: 'network', label: 'Network & Internet', icon: <Wifi size={16} /> },
        { id: 'accounts', label: 'User Accounts', icon: <User size={16} /> },
        { id: 'about', label: 'About AeroOS', icon: <Info size={16} /> },
    ];

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
                {/* <div className="px-4 mb-4"><span className="font-bold text-gray-800 text-[13px]">Control Panel</span></div> */}
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
                        <SectionHeader title="System settings" />
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded border border-[#e0e0e0] bg-[#f8fafd] p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <Volume2 size={18} color="#0058a3" />
                                    <span className="font-semibold text-gray-800">Master Sound</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Volume1 size={16} color="#666" />
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={volume}
                                        onChange={(e) => setVolume(Number(e.target.value))}
                                        className="w-full cursor-pointer"
                                    />
                                    <span className="text-[11px] text-gray-700 w-10">{volume}%</span>
                                </div>
                            </div>

                            <div className="rounded border border-[#e0e0e0] bg-[#f8fafd] p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <HardDrive size={18} color="#0058a3" />
                                    <span className="font-semibold text-gray-800">Storage</span>
                                </div>
                                <p className="text-sm text-gray-700">Available space: 412 GB of 512 GB</p>
                                <div className="mt-3 h-2 rounded bg-[#e0e0e0] overflow-hidden">
                                    <div className="h-full rounded bg-[#0058a3]" style={{ width: '80%' }} />
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 rounded border border-[#e0e0e0] p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <ShieldCheck size={18} color="#0058a3" />
                                <span className="font-semibold text-gray-800">Security</span>
                            </div>
                            <p className="text-sm text-gray-600">Device encryption and browser-based sign-in protections are enabled for this desktop session.</p>
                        </div>
                    </div>
                )}

                {activeTab === 'network' && (
                    <div className="flex flex-col animate-in fade-in duration-200">
                        <SectionHeader title="Network & Internet" />
                        <div className="rounded border border-[#e0e0e0] bg-[#f8fafd] p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Wifi size={18} color="#0058a3" />
                                    <div>
                                        <div className="font-semibold text-gray-800">Wi-Fi</div>
                                        <div className="text-sm text-gray-500">
                                            {airplaneMode ? 'Airplane mode enabled' : wifiEnabled ? 'Connected to Aero_Network_5G' : 'Disabled'}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => updateNetworkState({ wifiEnabled: airplaneMode ? false : !wifiEnabled })}
                                    className="px-3 py-1 border border-[#707070] bg-white text-gray-800 rounded-xs hover:bg-[#e5f1fb]"
                                >
                                    {airplaneMode ? 'Off' : wifiEnabled ? 'On' : 'Off'}
                                </button>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-gray-700">
                                <span className="rounded bg-[#e8f3ff] px-2 py-1">IP: 192.168.1.42</span>
                                <span className="rounded bg-[#f0f0f0] px-2 py-1">DNS: 8.8.8.8</span>
                            </div>
                        </div>

                        <div className="mt-4 rounded border border-[#e0e0e0] p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Lock size={16} color="#666" />
                                    <span className="font-semibold text-gray-800">Airplane mode</span>
                                </div>
                                <button
                                    onClick={() => updateNetworkState({ airplaneMode: !airplaneMode, wifiEnabled: !airplaneMode ? false : wifiEnabled })}
                                    className="px-3 py-1 border border-[#707070] bg-white text-gray-800 rounded-xs hover:bg-[#e5f1fb]"
                                >
                                    {airplaneMode ? 'On' : 'Off'}
                                </button>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">Turning this on disables Wi-Fi and shows the same state in the flyout.</p>
                        </div>

                        <div className="mt-4 rounded border border-[#e0e0e0] p-4">
                            <div className="mb-2 text-sm font-semibold text-gray-800">Available networks</div>
                            <div className="flex flex-col gap-2">
                                {['Guest_WIFI', 'Home_Net_2.4'].map((network) => (
                                    <div key={network} className="flex items-center justify-between rounded bg-[#fafafa] px-3 py-2">
                                        <span className="text-sm text-gray-700">{network}</span>
                                        <ChevronRight size={14} color="#666" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'accounts' && (
                    <div className="flex flex-col animate-in fade-in duration-200">
                        <SectionHeader title="Manage your account" />
                        <div className="rounded border border-[#e0e0e0] bg-[#f8fafd] p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6b7280] text-white font-bold">G</div>
                                    <div>
                                        <div className="font-semibold text-gray-800">Guest User</div>
                                        <div className="text-sm text-gray-500">Guest • Last sign in Today</div>
                                    </div>
                                </div>
                                <button className="px-3 py-1 border border-[#707070] bg-white text-gray-800 rounded-xs opacity-50 cursor-not-allowed">
                                    Manage
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 grid gap-3 md:grid-cols-2">
                            {[
                                { id: 'guest', title: 'Guest', desc: 'Limited access for quick demos and shared sessions.' },
                                { id: 'admin', title: 'Administrator', desc: 'Full access to apps, settings, and system controls.' },
                            ].map((account) => {
                                const isSelected = selectedAccount === account.id;
                                const isGuest = account.id === 'guest';
                                return (
                                    <button
                                        key={account.id}
                                        disabled={!isGuest}
                                        className={`rounded border p-3 text-left ${isSelected ? 'border-[#0058a3] bg-[#eef6ff]' : 'border-[#e0e0e0] bg-white'} ${!isGuest ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <User size={16} color={isSelected ? '#0058a3' : '#666'} />
                                                <span className={`font-semibold ${isGuest ? 'text-gray-800' : 'text-gray-500'}`}>{account.title}</span>
                                            </div>
                                            {isSelected && <CheckCircle2 size={16} color="#0058a3" />}
                                        </div>
                                        <p className={`mt-2 text-sm ${isGuest ? 'text-gray-600' : 'text-gray-400'}`}>{account.desc}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {activeTab === 'about' && (
                    <div className="flex flex-col animate-in fade-in duration-200">
                        <SectionHeader title="System Information" />
                        <div className="flex items-center gap-4 mb-6">
                            <Monitor size={48} color="#0058a3" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: '"Segoe UI", sans-serif' }}>AeroOS</h1>
                                <p className="text-gray-500">Version 2.0 (Build 7601: Service Pack 1)</p>
                            </div>
                        </div>
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