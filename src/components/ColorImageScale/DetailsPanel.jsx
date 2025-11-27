import React from 'react';
import { Palette, X } from 'lucide-react';
import { CLASS_COLORS, rgb } from './constants';

const PaletteBar = ({ colors }) => {
  if (!colors || colors.length === 0) return null;
  
  return (
    <div className="flex w-full h-12 rounded-lg overflow-hidden shadow-sm border border-stone-200">
      {colors.map((color, i) => (
        <div 
          key={i} 
          className="flex-1 h-full transition-all hover:flex-[1.5]"
          style={{ backgroundColor: rgb(color) }}
          title={`RGB: ${color.join(', ')}`}
        />
      ))}
    </div>
  );
};

const DetailsPanel = ({ activeNode, variations, onClose, selectedNode }) => {
    return (
        <div className={`flex-1 bg-white rounded-2xl border border-stone-200 shadow-sm p-6 transition-all duration-300 overflow-y-auto ${activeNode ? 'opacity-100' : 'opacity-80'}`}>
            {activeNode ? (
                <div className="flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-4xl font-bold text-stone-800 mb-1">{activeNode.image}</h2>
                            <div className="flex items-center gap-2 mb-1">
                                <span 
                                    className="px-2 py-0.5 rounded-full text-xs font-bold text-white uppercase tracking-wider"
                                    style={{ backgroundColor: CLASS_COLORS[activeNode.class] }}
                                >
                                    {activeNode.class}
                                </span>
                                <p className="text-xl text-stone-500 font-serif">{activeNode.image_cht}</p>
                            </div>
                        </div>
                        {selectedNode && (
                            <button 
                                onClick={onClose}
                                className="p-2 hover:bg-stone-100 rounded-full text-stone-400 hover:text-stone-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>

                    <div className="space-y-8">
                        {/* Coordinates */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                                <div className="text-stone-400 text-[10px] uppercase tracking-wider mb-1 font-mono-jb">Warm-Cool</div>
                                <div className="text-2xl font-mono-jb text-stone-700">{activeNode.x.toFixed(2)}</div>
                            </div>
                            <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                                <div className="text-stone-400 text-[10px] uppercase tracking-wider mb-1 font-mono-jb">Soft-Hard</div>
                                <div className="text-2xl font-mono-jb text-stone-700">{activeNode.y.toFixed(2)}</div>
                            </div>
                        </div>

                        {/* Palette */}
                        <div>
                            <div className="text-stone-400 text-[10px] uppercase tracking-wider mb-3 font-mono-jb">
                                Color Palettes ({variations.length})
                            </div>
                            <div className="space-y-8">
                                {variations.map((variation, vIdx) => (
                                    <div key={vIdx} className="border-b border-stone-100 pb-6 last:border-0 last:pb-0">
                                        <div className="text-xs font-bold text-stone-400 mb-2 font-mono-jb">
                                            Combination {vIdx + 1}
                                        </div>
                                        <PaletteBar colors={variation.clst} />
                                        <div className="mt-4 space-y-2">
                                            {variation.clst.map((color, i) => (
                                                <div key={i} className="flex items-center justify-between text-xs font-mono-jb text-stone-500 border-b border-stone-50 pb-1">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: rgb(color) }} />
                                                        <span>Color {i + 1}</span>
                                                    </div>
                                                    <span>{rgb(color)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-stone-400 text-center p-6">
                    <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mb-4">
                        <Palette size={24} className="opacity-50" />
                    </div>
                    <p className="text-lg font-medium text-stone-600">Select a color point</p>
                    <p className="text-sm mt-2 max-w-[200px]">Hover to preview, click to lock details</p>
                </div>
            )}
        </div>
    );
};

export default DetailsPanel;
