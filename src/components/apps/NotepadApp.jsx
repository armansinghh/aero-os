'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const STORAGE_KEY = 'aeroos-notepad-content';

export default function NotepadApp() {
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(true);
  const [formats, setFormats] = useState({ bold: false, italic: false, underline: false });
  const editorRef = useRef(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored !== null && editorRef.current) {
        editorRef.current.innerHTML = stored;
        setText(stored);
      }
    } catch { }
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, text);
        setSaved(true);
      } catch { }
    }, 400);
    setSaved(false);
    return () => clearTimeout(id);
  }, [text]);

  const checkFormatting = useCallback(() => {
    setFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
    });
  }, []);

  const formatText = (command) => {
    document.execCommand(command, false, null);
    if (editorRef.current) {
      editorRef.current.focus();
      setText(editorRef.current.innerHTML);
    }
    checkFormatting();
  };

  const handleInput = () => {
    if (editorRef.current) {
      setText(editorRef.current.innerHTML);
    }
    checkFormatting();
  };

  const handleClear = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
      setText('');
      editorRef.current.focus();
    }
    checkFormatting();
  };

  return (
    <div
      className="w-full h-full flex flex-col select-none"
      style={{ background: '#f0f4f8' }}
    >
      <div
        className="flex items-center gap-1.5 px-3 py-2 shrink-0 relative"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #e4f0fa 49%, #cce1f0 50%, #eaf4fb 100%)',
          borderBottom: '1px solid #8ca0b3',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <ToolBtn
          label="B"
          style={{ fontWeight: 800, fontFamily: 'Times New Roman, serif' }}
          onClick={() => formatText('bold')}
          isActive={formats.bold}
          title="Bold"
        />
        <ToolBtn
          label="I"
          style={{ fontStyle: 'italic', fontFamily: 'Times New Roman, serif' }}
          onClick={() => formatText('italic')}
          isActive={formats.italic}
          title="Italic"
        />
        <ToolBtn
          label="U"
          style={{ textDecoration: 'underline', fontFamily: 'Times New Roman, serif' }}
          onClick={() => formatText('underline')}
          isActive={formats.underline}
          title="Underline"
        />

        <div
          style={{
            width: '2px',
            height: '20px',
            background: 'linear-gradient(to right, #9baebb 50%, #ffffff 50%)',
            margin: '0 4px'
          }}
        />

        <ToolBtn label="Clear" onClick={handleClear} isActive={false} title="Clear note" />
        <span
          style={{
            marginLeft: 'auto',
            fontSize: '11px',
            fontFamily: '"Segoe UI", Tahoma, sans-serif',
            color: '#4a6582',
            textShadow: '0 1px 0 rgba(255,255,255,0.8)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <div
            style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: saved ? '#4ade80' : '#facc15',
              boxShadow: saved
                ? 'inset 0 1px 1px rgba(255,255,255,0.8), 0 0 4px #4ade80'
                : 'inset 0 1px 1px rgba(255,255,255,0.8), 0 0 4px #facc15',
              border: '1px solid rgba(0,0,0,0.2)'
            }}
          />
          {saved ? 'Saved' : 'Saving…'}
        </span>
      </div>
      <div
        className="flex-1 w-full p-1.5"
        style={{
          background: '#d9e4ee',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
        }}
      >
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onMouseUp={checkFormatting}
          onKeyUp={checkFormatting}
          className="w-full h-full outline-none px-3 py-2 overflow-auto"
          style={{
            background: '#ffffff',
            boxShadow: 'inset 0 2px 5px rgba(0,30,60,0.15), inset 0 0 0 1px rgba(100,120,140,0.3)',
            borderRadius: '2px',
            fontFamily: '"Segoe UI", Tahoma, sans-serif',
            fontSize: '13px',
            color: '#000000',
            lineHeight: 1.5,
            cursor: 'text',
          }}
          data-placeholder="Type a note… it autosaves."
        />
      </div>
    </div>
  );
}

function ToolBtn({ label, onClick, style, title, isActive }) {
  const [isHovered, setIsHovered] = useState(false);
  const normalStyle = {
    border: '1px solid transparent',
    background: 'transparent',
    boxShadow: 'none',
  };

  const hoverStyle = {
    border: '1px solid rgba(120, 160, 200, 0.6)',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(220,240,255,0.6) 49%, rgba(180,220,250,0.7) 50%, rgba(230,250,255,0.8) 100%)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 1px rgba(0,0,0,0.05)',
  };

  const activeStyle = {
    border: '1px solid rgba(90, 130, 170, 0.8)',
    background: 'linear-gradient(180deg, rgba(200,225,245,0.8) 0%, rgba(160,200,230,0.6) 49%, rgba(130,180,220,0.7) 50%, rgba(190,230,255,0.8) 100%)',
    boxShadow: 'inset 0 2px 4px rgba(0,40,80,0.2), inset 0 0 2px rgba(0,0,0,0.1)',
  };

  let currentStyle = normalStyle;
  if (isActive) {
    currentStyle = activeStyle;
  } else if (isHovered) {
    currentStyle = hoverStyle;
  }

  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={title}
      className="relative overflow-hidden flex items-center justify-center transition-all duration-100 active:scale-95"
      style={{
        padding: '3px 12px',
        fontSize: '12px',
        fontFamily: '"Segoe UI", Tahoma, sans-serif',
        color: '#1e3a5f',
        borderRadius: '3px',
        ...currentStyle,
        ...style,
      }}
    >
      <span className="relative z-10 drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
        {label}
      </span>
    </button>
  );
}