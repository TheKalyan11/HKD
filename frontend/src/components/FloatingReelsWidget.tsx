"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FloatingReelsWidget() {
  const pathname = usePathname();
  
  if (pathname === '/reels') return null;

  return (
    <Link href="/reels" className="fixed bottom-[100px] sm:bottom-[110px] right-4 sm:right-[18px] z-[40] hover:scale-110 transition-transform drop-shadow-xl group">
      <div className="relative">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-white/20 blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <img 
          src="https://png.pngtree.com/png-vector/20260118/ourlarge/pngtree-instagram-reels-logo-featuring-a-play-button-within-gradient-square-resembling-png-image_18532941.webp" 
          alt="Reels" 
          className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] object-cover rounded-xl relative z-10" 
        />
      </div>
    </Link>
  );
}
