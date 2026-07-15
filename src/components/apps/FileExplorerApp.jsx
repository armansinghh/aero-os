'use client';

import { ArrowLeft, ArrowRight, RotateCw, Search, Folder, HardDrive, Image as ImageIcon, Music, FileText, Film } from 'lucide-react';
import { FILE_SYSTEM } from '../config/files';

export default function FileExplorerApp({ onOpenApp }) {
  const folders = [
    { name: 'Documents', icon: <FileText size={40} color="#0058a3" strokeWidth={1} />, type: 'System Folder' },
    { name: 'Pictures', icon: <ImageIcon size={40} color="#0058a3" strokeWidth={1} />, type: 'System Folder' },
    { name: 'Music', icon: <Music size={40} color="#0058a3" strokeWidth={1} />, type: 'System Folder' },
    { name: 'Downloads', icon: <Folder size={40} fill="#d4e8ff" color="#6ba6d9" strokeWidth={1} />, type: 'File Folder' },
    { name: 'Local Disk (C:)', icon: <HardDrive size={40} color="#555" strokeWidth={1.5} />, type: 'Local Disk' },
  ];

  const handleDoubleClickFile = (file) => {
    if (['video', 'audio', 'image'].includes(file.type)) {
      onOpenApp?.('media', { file: file });
    } else {
      console.log('No default app for this file type yet:', file.type);
    }
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'video': return <Film size={32} color="#8854d0" strokeWidth={1.5} />;
      case 'image': return <ImageIcon size={32} color="#20bf6b" strokeWidth={1.5} />;
      case 'audio': return <Music size={32} color="#eb3b5a" strokeWidth={1.5} />;
      default: return <FileText size={32} color="#555" strokeWidth={1.5} />;
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-white select-none" style={{ fontFamily: '"Segoe UI", Tahoma, sans-serif' }}>

      <div
        className="flex flex-col p-2 gap-2 border-b border-[#a0a0a0] z-10"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #e5ebf2 49%, #d4e0eb 50%, #eef3f7 100%)',
          boxShadow: 'inset 0 1px 0 #ffffff'
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-[#979797] hover:border-[#3399ff] hover:bg-[#e5f3ff] shadow-sm"><ArrowLeft size={16} color="#444" /></button>
            <button className="w-6 h-6 rounded-full flex items-center justify-center bg-transparent border border-transparent opacity-50"><ArrowRight size={14} color="#444" /></button>
          </div>

          <div className="flex-1 flex items-center border border-[#979797] bg-white h-7 shadow-inner relative group hover:border-[#3399ff]">
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-linear-to-b from-[#e5f3ff]/50 to-transparent pointer-events-none" />
            <div className="px-2 border-r border-[#d4d4d4] flex items-center h-full bg-[#f0f4f9]">
              <Folder size={14} fill="#d4e8ff" color="#6ba6d9" />
            </div>
            <div className="px-2 flex items-center text-[12px] text-gray-800 flex-1">
              Libraries <span className="text-gray-400 mx-1">▸</span> Computer <span className="text-gray-400 mx-1">▸</span>
            </div>
            <button className="px-2 h-full hover:bg-[#e5f3ff] border-l border-transparent transition-colors"><RotateCw size={12} color="#555" /></button>
          </div>

          <div className="w-48 flex items-center border border-[#979797] bg-white h-7 shadow-inner px-2 hover:border-[#3399ff]">
            <input type="text" placeholder="Search Computer" className="flex-1 outline-none text-[12px] italic text-gray-500 placeholder-gray-400 bg-transparent" />
            <Search size={14} color="#0058a3" />
          </div>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="w-48 bg-[#f0f4f9] border-r border-[#d4d4d4] overflow-y-auto p-2 text-[12px]">
          <div className="mb-2">
            <div className="flex items-center gap-1 font-bold text-gray-800 px-1 py-1 hover:bg-[#cce8ff] rounded-xs cursor-pointer">
              <span className="text-gray-500 w-3 text-center">▼</span> Favorites
            </div>
            <div className="pl-5 py-1 text-gray-700 hover:bg-[#e5f3ff] cursor-pointer rounded-xs">Desktop</div>
            <div className="pl-5 py-1 text-gray-700 hover:bg-[#e5f3ff] cursor-pointer rounded-xs">Downloads</div>
          </div>

          <div>
            <div className="flex items-center gap-1 font-bold text-gray-800 px-1 py-1 hover:bg-[#cce8ff] rounded-xs cursor-pointer">
              <span className="text-gray-500 w-3 text-center">▼</span> Libraries
            </div>
            <div className="pl-5 py-1 text-gray-700 hover:bg-[#e5f3ff] cursor-pointer rounded-xs">Documents</div>
            <div className="pl-5 py-1 text-gray-700 hover:bg-[#e5f3ff] cursor-pointer rounded-xs">Music</div>
            <div className="pl-5 py-1 text-gray-700 hover:bg-[#e5f3ff] cursor-pointer rounded-xs">Pictures</div>
          </div>
        </div>

        <div className="flex-1 bg-white p-4 overflow-y-auto">

          <div className="border-b border-[#e0e0e0] mb-3 pb-1">
            <span className="text-[12px] font-bold text-[#003399]">System Folders ({folders.length})</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
            {folders.map((folder, i) => (
              <div key={i} className="flex items-center gap-3 p-2 border border-transparent hover:border-[#b8d6fb] hover:bg-[#e5f3ff] rounded-xs cursor-pointer group">
                {folder.icon}
                <div className="flex flex-col overflow-hidden">
                  <span className="text-[12px] text-gray-900 group-hover:underline truncate">{folder.name}</span>
                  <span className="text-[10px] text-gray-500">{folder.type}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-b border-[#e0e0e0] mb-3 pb-1">
            <span className="text-[12px] font-bold text-[#003399]">Files ({FILE_SYSTEM.length})</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {FILE_SYSTEM.map((file) => (
              <div
                key={file.id}
                onDoubleClick={() => handleDoubleClickFile(file)}
                className="flex items-center gap-3 p-2 border border-transparent hover:border-[#b8d6fb] hover:bg-[#e5f3ff] rounded-xs cursor-pointer group"
              >
                {getFileIcon(file.type)}
                <div className="flex flex-col overflow-hidden">
                  <span className="text-[12px] text-gray-900 group-hover:underline truncate">{file.name}</span>
                  <span className="text-[10px] text-gray-500 capitalize">{file.type} File</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <div className="h-8 bg-[#f0f4f9] border-t border-[#d4d4d4] flex items-center px-4 text-[11px] text-gray-600 gap-4">
        <span>{folders.length + FILE_SYSTEM.length} items</span>
        <div className="w-px h-4 bg-gray-300" />
        <span>Ready</span>
      </div>
    </div>
  );
}