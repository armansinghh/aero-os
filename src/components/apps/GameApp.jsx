'use client';

import { useState } from 'react';
import { Gamepad2, ArrowLeft, ArrowRight, RotateCw, Search, Play, X, Star, Bomb, Spade, Hash, Bird, Scissors, CarFront } from 'lucide-react';

function GameArt({ Icon, color1, color2 }) {
  return (
    <div
      className="w-full h-full rounded flex items-center justify-center relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
        border: '1px solid rgba(0,0,0,0.3)',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.4)'
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-[45%] bg-linear-to-b from-white/70 to-transparent pointer-events-none" />

      <Icon className="w-1/2 h-1/2 text-white relative z-10" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} strokeWidth={1.5} />
    </div>
  );
}

export default function GamesApp() {
  const gamesList = [
    {
      id: 'solitaire', name: 'Solitaire', genre: 'Card', publisher: 'Microsoft', developer: 'Microsoft', rating: 'E',
      art: <GameArt Icon={Spade} color1="#4facfe" color2="#00f2fe" />, url: 'https://mrdoob.com/lab/javascript/effects/solitaire/'
    },
    {
      id: '2048', name: '2048', genre: 'Puzzle', publisher: 'FunHTML5Games', developer: 'FunHTML5Games', rating: 'E',
      art: <GameArt Icon={Hash} color1="#f6d365" color2="#fda085" />, url: 'https://funhtml5games.com?embed=2048bit'
    },
    {
      id: 'flappy', name: 'Flappy Bird', genre: 'Arcade', publisher: 'GEARS', developer: 'Dong Nguyen', rating: 'E',
      art: <GameArt Icon={Bird} color1="#43e97b" color2="#38f9d7" />, url: 'https://nebezb.com/floppybird/'
    },
    {
      id: 'cuttherope', name: 'Cut the Rope', genre: 'Puzzle', publisher: 'ZeptoLab', developer: 'ZeptoLab', rating: 'E',
      art: <GameArt Icon={Scissors} color1="#a8ff78" color2="#78ffd6" />, url: 'https://ctrhome.github.io/games/cut-the-rope/play/famobi/'
    },
    {
      id: 'hexgl', name: 'HexGL', genre: 'Racing', publisher: 'BKcore', developer: 'Thibaut Despoulain', rating: 'E',
      art: <GameArt Icon={CarFront} color1="#cfd9df" color2="#e2ebf0" />, url: 'https://hexgl.bkcore.com/play/'
    }
  ];

  const [selectedGame, setSelectedGame] = useState(gamesList[0]);
  const [playingGame, setPlayingGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredGames = gamesList.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (playingGame) {
    return (
      <div className="flex flex-col w-full h-full bg-black relative">
        <div className="h-8 bg-linear-to-b from-gray-700 to-gray-900 border-b border-gray-600 flex items-center justify-between px-2 text-white text-[12px] select-none">
          <div className="flex items-center gap-2">
            <Gamepad2 size={16} className="text-green-400" />
            <span className="font-bold">{playingGame.name}</span>
          </div>
          <button
            onClick={() => setPlayingGame(null)}
            className="flex items-center gap-1 bg-red-600 hover:bg-red-500 border border-red-800 text-white px-3 py-1 rounded-xs shadow-inner"
          >
            <X size={14} /> Close Game
          </button>
        </div>
        <iframe
          src={playingGame.url}
          className="flex-1 w-full bg-white border-none"
          sandbox="allow-scripts allow-same-origin allow-forms"
          allow="autoplay"
        />
      </div>
    );
  }


  return (
    <div className="flex flex-col w-full h-full bg-white select-none" style={{ fontFamily: '"Segoe UI", Tahoma, sans-serif' }}>

      <div className="flex flex-col p-2 gap-2 border-b border-[#a0a0a0] z-10" style={{ boxShadow: 'inset 0 1px 0 #ffffff' }}>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-[#979797] hover:border-[#3399ff] hover:bg-[#e5f3ff] shadow-sm"><ArrowLeft size={16} color="#444" /></button>
            <button className="w-6 h-6 rounded-full flex items-center justify-center bg-transparent border border-transparent opacity-50"><ArrowRight size={14} color="#444" /></button>
          </div>

          <div className="flex-1 flex items-center border border-[#979797] bg-white h-7 shadow-inner relative group hover:border-[#3399ff]">
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-linear-to-b from-[#e5f3ff]/50 to-transparent pointer-events-none" />
            <div className="px-2 border-r border-[#d4d4d4] flex items-center h-full bg-[#f0f4f9]"><Gamepad2 size={14} color="#22c55e" /></div>
            <div className="px-2 flex items-center text-[12px] text-gray-800 flex-1">
              Computer <span className="text-gray-400 mx-1">▸</span> Games <span className="text-gray-400 mx-1">▸</span>
            </div>
            <button className="px-2 h-full hover:bg-[#e5f3ff] border-l border-transparent"><RotateCw size={12} color="#555" /></button>
          </div>

          <div className="w-48 flex items-center border border-[#979797] bg-white h-7 shadow-inner px-2 hover:border-[#3399ff]">
            <input
              type="text"
              placeholder="Search Games"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 outline-none text-[12px] italic text-gray-500 bg-transparent"
            />
            <Search size={14} color="#0058a3" />
          </div>
        </div>

        <div className="flex items-center gap-4 px-2 text-[12px] text-[#003399]">
          <span className="hover:underline cursor-pointer flex items-center gap-1">Organize <span className="text-[8px]">▼</span></span>
          <span className="hover:underline cursor-pointer">Options</span>
          <span className="hover:underline cursor-pointer flex items-center gap-1">Tools <span className="text-[8px]">▼</span></span>
          <span className="hover:underline cursor-pointer text-gray-800">Parental Controls</span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">

        {/* left */}
        <div className="flex-1 bg-white p-4 overflow-y-auto border-r border-[#d4d4d4]">
          <div className="mb-2">
            <h3 className="text-[14px] text-[#003399] font-semibold border-b border-[#e0e0e0] pb-1 mb-3 flex items-center gap-1">
              <span className="text-gray-600 text-[10px]">▼</span> Games ({filteredGames.length})
            </h3>

            {filteredGames.length === 0 ? (
              <div className="text-gray-500 text-[12px] mt-4">No games match your search.</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredGames.map((game) => {
                  const isSelected = selectedGame?.id === game.id;
                  return (
                    <div
                      key={game.id}
                      onClick={() => setSelectedGame(game)}
                      onDoubleClick={() => setPlayingGame(game)}
                      className={`flex flex-col items-center gap-2 p-2 rounded-xs cursor-pointer border ${isSelected
                          ? 'bg-[#cce8ff] border-[#99d1ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]'
                          : 'border-transparent hover:border-[#b8d6fb] hover:bg-[#e5f3ff]'
                        }`}
                    >
                      <div className="w-16 h-16 shadow-md drop-shadow-sm">
                        {game.art}
                      </div>
                      <span className="text-[12px] text-gray-900 text-center leading-tight">{game.name}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* right */}
        <div className="w-64 bg-[#f0f4f9] p-4 flex flex-col items-center shadow-[-2px_0_10px_rgba(0,0,0,0.05)] z-10 overflow-y-auto">
          {selectedGame ? (
            <div className="flex flex-col items-center w-full animate-in fade-in">
              <div className="w-32 h-32 shadow-xl mb-4 drop-shadow-md">
                {selectedGame.art}
              </div>

              <h2 className="text-[18px] font-bold text-gray-800 text-center mb-1">{selectedGame.name}</h2>

              <button
                onClick={() => setPlayingGame(selectedGame)}
                className="flex items-center gap-1 mt-2 mb-6 px-4 py-1.5 bg-[#f0f0f0] border border-[#979797] rounded-xs hover:bg-[#e5f1fb] hover:border-[#0078d7] active:bg-[#cce4f7] text-[12px] text-gray-800 shadow-sm"
              >
                <Play size={12} className="text-[#0058a3]" /> Play Now
              </button>

              <div className="w-full border-t border-[#d4d4d4] pt-4 flex flex-col items-center gap-2">
                <div className="flex items-center gap-3 bg-white p-2 border border-gray-300 rounded-xs w-full shadow-sm">
                  <div className="border-2 border-black p-1 flex flex-col items-center justify-center w-10 h-14 bg-white">
                    <span className="text-[5px] font-bold leading-none mb-0.5">{selectedGame.rating === 'E' ? 'EVERYONE' : 'EVERYONE 10+'}</span>
                    <span className="text-[24px] font-black leading-none">{selectedGame.rating === 'E' ? 'E' : '10+'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-[#0058a3] uppercase">{selectedGame.rating === 'E' ? 'Everyone' : 'Everyone 10+'}</span>
                    <span className="text-[10px] text-[#0058a3] hover:underline cursor-pointer mt-1">Learn more about ratings</span>
                  </div>
                </div>

                <div className="w-full flex items-center justify-between px-2 mt-2 text-[11px] text-gray-700">
                  <span>Performance:</span>
                  <div className="flex items-center text-yellow-500">
                    <Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" opacity={0.3} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-[12px] text-gray-500 text-center mt-10">Select a game to see details.</div>
          )}
        </div>
      </div>

      {/* bottom */}
      <div
        className="h-18 bg-[#f0f4f9] border-t border-[#d4d4d4] flex items-center px-4 gap-4 z-10"
        style={{ boxShadow: 'inset 0 1px 0 #ffffff' }}
      >
        {selectedGame && (
          <>
            <div className="w-12 h-12 shadow-sm drop-shadow-sm">
              {selectedGame.art}
            </div>
            <div className="flex flex-col text-[11px] text-gray-600 gap-0.5 min-w-50">
              <span className="font-bold text-[13px] text-gray-800 mb-0.5">{selectedGame.name}</span>
              <div className="flex items-center gap-1">Publisher: <span className="text-[#003399] hover:underline cursor-pointer">{selectedGame.publisher}</span></div>
              <div className="flex items-center gap-1">Developer: <span className="text-gray-800">{selectedGame.developer}</span></div>
            </div>
            <div className="flex flex-col text-[11px] text-gray-600 gap-0.5 border-l border-gray-300 pl-4">
              <div>Product version: <span className="text-gray-800">1.0.0.0</span></div>
              <div>Genre: <span className="text-gray-800">{selectedGame.genre}</span></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}