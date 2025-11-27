import React from 'react';
import { CLASS_COLORS } from './constants';

const ClassLegend = () => {
    return (
        <div className="hidden md:block bg-white rounded-2xl border border-stone-200 shadow-sm p-4 shrink-0 overflow-y-auto max-h-[200px]">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 font-mono-jb">Class Legend</h3>
            <div className="flex flex-wrap gap-2">
                {Object.entries(CLASS_COLORS).map(([cls, color]) => (
                    <div key={cls} className="flex items-center gap-1.5 bg-stone-50 px-2 py-1 rounded-md border border-stone-100">
                        <div 
                            className="w-2.5 h-2.5 rounded-full shrink-0" 
                            style={{ backgroundColor: color }}
                        />
                        <span className="text-xs text-stone-600 capitalize">{cls}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassLegend;
