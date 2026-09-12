'use client';

import React from 'react';

export function BackgroundGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Top Center Ocean/Cyan Glow */}
      <div 
        className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[500px] rounded-full opacity-35 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, rgba(37, 99, 235, 0.25) 50%, transparent 80%)'
        }}
      />

      {/* Right Side Violet Orb */}
      <div 
        className="absolute top-[35%] -right-[10%] w-[500px] sm:w-[700px] h-[500px] rounded-full opacity-25 blur-[130px]"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(59, 130, 246, 0.15) 60%, transparent 80%)'
        }}
      />

      {/* Left Center Cyan Ambient Glow */}
      <div 
        className="absolute bottom-[20%] -left-[10%] w-[550px] sm:w-[750px] h-[550px] rounded-full opacity-25 blur-[140px]"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.35) 0%, rgba(30, 58, 138, 0.2) 60%, transparent 80%)'
        }}
      />

      {/* Subtle Grid Accent */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
}
