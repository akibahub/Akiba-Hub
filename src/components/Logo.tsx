import React from 'react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Icon Emblem from User's Logo Graphic */}
      <div className="relative w-[50px] h-[50px] flex-shrink-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_8px_rgba(230,0,18,0.25)]">
          {/* Mask to cut horizontal stripes at the bottom of the sun */}
          <defs>
            <mask id="sun-stripes-mask">
              {/* White allows full visibility */}
              <rect x="0" y="0" width="100" height="100" fill="white" />
              {/* Black horizontal lines cut cuts/holes out of the red sun */}
              <rect x="10" y="65" width="80" height="2" fill="black" />
              <rect x="10" y="69.5" width="80" height="2.5" fill="black" />
              <rect x="10" y="74.5" width="80" height="3" fill="black" />
              <rect x="10" y="80.5" width="80" height="3.5" fill="black" />
            </mask>
          </defs>

          {/* 1. Large Traditional Kanji "秋" (Aki) Watermark in the background */}
          <text
            x="50"
            y="76"
            fill="rgba(255, 255, 255, 0.16)"
            fontSize="88"
            fontFamily="serif, 'Noto Serif JP', '游明朝', 'MS Mincho'"
            textAnchor="middle"
            fontWeight="bold"
          >
            秋
          </text>

          {/* 2. Red Rising Sun (Nippon Hinomaru) with Slice Gaps from Mask */}
          <circle
            cx="50"
            cy="48"
            r="32"
            fill="#e60012"
            mask="url(#sun-stripes-mask)"
          />

          {/* 3. Small Kanji "秋葉原" (Akihabara) embedded beautifully on the lower right of solid sun region */}
          <text
            x="76"
            y="60"
            fill="white"
            fontSize="7"
            fontFamily="sans-serif, 'Noto Sans JP', 'Hiragino Kaku Gothic ProN'"
            fontWeight="900"
            letterSpacing="0.05em"
            textAnchor="end"
          >
            秋葉原
          </text>
        </svg>
      </div>

      {/* Primary Brand Typography */}
      <div className="flex flex-col">
        <span className="font-display font-black tracking-widest text-xl leading-none italic text-white flex gap-1 glow-pink-text">
          AKIBA <span className="text-white filter drop-shadow-[0_0_2px_#e60012]">HUB</span>
        </span>
        <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-[#e60012] leading-none mt-1.5 uppercase">
          FROM FANS TO FANS
        </span>
      </div>
    </div>
  );
}
