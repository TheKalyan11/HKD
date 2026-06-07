"use client";

import React from 'react';

export default function MandirNirmanPage() {
  return (
    <div className="w-full h-[calc(100vh-70px)] bg-black flex items-center justify-center">
      <video 
        className="w-full h-full object-contain pointer-events-none"
        autoPlay 
        loop 
        muted
        playsInline
      >
        <source src="/411b74d3e69abbfdcc5d0f2fd25ebac0.mov" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
