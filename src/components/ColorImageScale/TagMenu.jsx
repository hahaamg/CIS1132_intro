import React from 'react';

const TagMenu = ({ images, activeImage, onSelect }) => {
    return (
        <div className="h-64 bg-white rounded-2xl border border-stone-200 shadow-sm shrink-0 flex flex-col overflow-hidden order-2 md:order-3">
            <div className="px-4 py-3 border-b border-stone-50 bg-white z-10">
                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider font-mono-jb">
                    Filter by Image ({images.length})
                </h3>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
                <div className="flex flex-wrap gap-2">
                    {images.map(item => (
                        <button 
                            key={item.image}
                            onClick={() => onSelect(item.image)}
                            className={`px-3 py-1.5 rounded-md text-xs transition-all duration-200 font-mono-jb border flex items-center gap-2 ${
                                activeImage === item.image 
                                ? 'bg-stone-800 text-white border-stone-800 shadow-md' 
                                : 'bg-white text-stone-500 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                            }`}
                        >
                            <span>{item.image}</span>
                            <span className={activeImage === item.image ? "text-stone-300" : "text-stone-400"}>{item.image_cht}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TagMenu;
