import React from 'react';
import { CLASS_COLORS, rgb } from './constants';

const ScatterPlot = ({ data, selectedNode, hoveredNode, onSelect, onHover }) => {
    const mapX = (val) => ((val + 3.2) / 6.4) * 100;
    const mapY = (val) => ((3.2 - val) / 6.4) * 100;

    const activeNode = hoveredNode || selectedNode;

    return (
        <div className="hidden md:block lg:col-span-2 h-[500px] lg:h-[600px] relative bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
            {/* Axis Labels */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-stone-400 text-xs font-mono-jb tracking-widest uppercase bg-white/80 px-2 rounded">Soft</div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-stone-400 text-xs font-mono-jb tracking-widest uppercase bg-white/80 px-2 rounded">Hard</div>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 text-stone-400 text-xs font-mono-jb tracking-widest uppercase bg-white/80 px-2 rounded">Cool</div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-stone-400 text-xs font-mono-jb tracking-widest uppercase bg-white/80 px-2 rounded">Warm</div>

            {/* Grid Lines */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-full h-px bg-stone-100" />
                <div className="absolute left-1/2 top-0 w-px h-full bg-stone-100" />
            </div>

            {/* Plot Area */}
            <div className="absolute inset-4 md:inset-10">
                {data.map((point, idx) => {
                    const x = mapX(point.x);
                    const y = mapY(point.y);
                    const isSelected = selectedNode === point;
                    const isHovered = hoveredNode === point;
                    const isActive = isSelected || isHovered;
                    const isDimmed = activeNode && !isActive;

                    return (
                        <button
                            key={idx}
                            onClick={() => onSelect(isSelected ? null : point)}
                            onMouseEnter={() => onHover(point)}
                            onMouseLeave={() => onHover(null)}
                            className={`absolute w-3 h-3 rounded-full transition-all duration-300 ease-out
                                ${isActive ? 'z-50 shadow-md ring-2 ring-white' : ''}
                                ${isDimmed ? 'opacity-10 grayscale scale-75' : 'opacity-90'}
                            `}
                            style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                backgroundColor: CLASS_COLORS[point.class] || rgb(point.clst[0]),
                                transform: `translate(-50%, -50%) ${isActive ? 'scale(1.5)' : 'scale(1)'}`
                            }}
                            aria-label={`${point.image} (${point.class})`}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ScatterPlot;
