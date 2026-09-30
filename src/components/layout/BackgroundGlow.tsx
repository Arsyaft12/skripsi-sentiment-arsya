'use client';

import React from 'react';

export function BackgroundGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
      {/* Top Center Ocean/Cyan Glow */}
      <div 
        className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[450px] rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.45) 0%, rgba(37, 99, 235, 0.2) 60%, transparent 80%)'
        }}
      />

      {/* Right Side Violet Orb */}
      <div 
        className="absolute top-[30%] -right-[15%] w-[450px] sm:w-[600px] h-[450px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(59, 130, 246, 0.15) 60%, transparent 80%)'
        }}
      />

      {/* Left Center Cyan Ambient Glow */}
      <div 
        className="absolute bottom-[15%] -left-[15%] w-[450px] sm:w-[600px] h-[450px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(30, 58, 138, 0.15) 60%, transparent 80%)'
        }}
      />

      {/* Subtle Grid Accent */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />
    </div>
  );
}
