import React from 'react';

const Header = () => {
    return (
        <header className="flex justify-between items-end mb-2 pb-2 border-b border-stone-200 shrink-0 order-1">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-stone-900">
                    Kobayashi Color Image Scale(1991)
                </h1>
                <p className="text-stone-500 mt-1 text-sm">
                    174 emotional keywords in psychological color space
                </p>
            </div>
            <div className="hidden md:flex gap-4 text-xs font-mono-jb text-stone-400">
                <span>X: WARM-COOL</span>
                <span>Y: SOFT-HARD</span>
            </div>
        </header>
    );
};

export default Header;
