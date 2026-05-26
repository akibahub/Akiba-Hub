import React from 'react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* outer pokeball border with pulse glow */}
        <div className="absolute inset-0 bg-[#e60012] rounded-full border-2 border-white shadow-[0_0_15px_rgba(230,0,18,0.6)] animate-pulse"></div>
        
        {/* bottom cyber dark half */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#0c0c12] rounded-b-full border-t-2 border-white"></div>
        
        {/* central black divider line */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white -translate-y-1/2"></div>
        
        {/* Torii Gate Accent inside */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-[6px] z-10">
          <svg viewBox="0 0 100 100" className="w-5 h-5 text-white filter drop-shadow-[0_0_3px_#e60012]" fill="currentColor">
            {/* Top curved lintel */}
            <path d="M15 25 H85 V32 H15 Z" />
            <path d="M8 15 C30 22, 70 22, 92 15 V22 C70 28, 30 28, 8 22 Z" />
            
            {/* Supporting double columns */}
            <rect x="30" y="32" width="8" height="50" />
            <rect x="62" y="32" width="8" height="50" />
            
            {/* Tie-beam (Nuki) */}
            <rect x="20" y="45" width="60" height="6" />
          </svg>
        </div>

        {/* Pokeball center button dot */}
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white border border-[#e60012] rounded-full z-20 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center shadow-[0_0_8px_#ffffff]">
          <div className="w-1.5 h-1.5 bg-[#0a0a0c] rounded-full"></div>
        </div>
      </div>
      
      <div className="flex flex-col">
        <span className="font-display font-black tracking-widest text-xl leading-none italic text-white flex gap-1 glow-pink-text">
          AKIBA <span className="text-white filter drop-shadow-[0_0_2px_#e60012]">HUB</span>
        </span>
        <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-[#e60012] leading-none mt-1">
          TOKYO PROTOCOL // UK PIPELINE
        </span>
      </div>
    </div>
  );
}
