"use client";

import React, { useState, useRef, useEffect } from 'react';
import ReelPlayer, { Reel } from '@/components/ReelPlayer';

// Mock CMS Data (Can be replaced with an API call later)
const MOCK_REELS: Reel[] = [
  {
    id: "reel-1",
    videoUrl: "/Video from Vishwas Murthy.mp4",
    likes: 1240,
  },
  {
    id: "reel-2",
    videoUrl: "/donation video .mp4",
    likes: 856,
  },
  {
    id: "reel-3",
    videoUrl: "/jk.mp4",
    likes: 2104,
  }
];

export default function ReelsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Setup Intersection Observer to detect which reel is currently visible
  useEffect(() => {
    const observerOptions = {
      root: containerRef.current,
      rootMargin: "0px",
      threshold: 0.6 // Trigger when 60% of the video is visible
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          setActiveIndex(index);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all reel containers
    const elements = containerRef.current?.querySelectorAll('.reel-container');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
      
      {/* Desktop External Header (Top Left of Screen) */}
      <div className="hidden sm:flex absolute top-8 left-8 md:left-12 xl:left-16 items-center gap-4 z-30">
        <a href="/" className="text-white hover:bg-white/10 transition flex items-center justify-center p-2 rounded-full border border-transparent hover:border-white/20 backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </a>
        <div className="flex items-center gap-3">
          <img src="/HKM White logo.webp" alt="HKM Logo" className="h-14 w-auto object-contain drop-shadow-md" />
          <span className="text-white font-bold text-3xl tracking-wide drop-shadow-md pb-1">Reels</span>
        </div>
      </div>

      {/* 
        On mobile: full height and width.
        On desktop: limited height and width with rounded corners to resemble a phone screen.
      */}
      <div 
        ref={containerRef}
        className="h-[100dvh] sm:h-[90vh] sm:max-h-[850px] w-full sm:max-w-[430px] overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar relative bg-black sm:rounded-3xl sm:border-[6px] sm:border-gray-900 shadow-2xl"
      >
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Hide scrollbar for Chrome, Safari and Opera */
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            /* Hide scrollbar for IE, Edge and Firefox */
            .no-scrollbar {
              -ms-overflow-style: none;  /* IE and Edge */
              scrollbar-width: none;  /* Firefox */
            }
          `
        }} />


        {/* Top navigation gradient (to ensure back button visibility) */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/60 to-transparent z-20 pointer-events-none sm:hidden" />
        {/* Top Header: Back Button, Logo, Title (Mobile Only) */}
        <div className="absolute top-5 left-4 z-30 flex sm:hidden items-center gap-3 pointer-events-auto">
          <a href="/" className="text-white hover:opacity-80 transition flex items-center justify-center p-1 -ml-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </a>
          
          <div className="flex items-center gap-2.5">
            <img src="/HKM White logo.webp" alt="HKM Logo" className="h-9 w-auto object-contain drop-shadow-md" />
            <span className="text-white font-bold text-[22px] tracking-wide drop-shadow-md pb-0.5">Reels</span>
          </div>
        </div>
        {/* Render the reels */}
        {MOCK_REELS.map((reel, index) => (
          <div 
            key={reel.id} 
            data-index={index}
            className="reel-container h-full w-full snap-start snap-always relative"
          >
            <ReelPlayer 
              reel={reel} 
              isActive={activeIndex === index} 
              onNext={() => {
                const elements = containerRef.current?.querySelectorAll('.reel-container');
                elements?.[index + 1]?.scrollIntoView({ behavior: 'smooth' });
              }}
              onPrev={() => {
                const elements = containerRef.current?.querySelectorAll('.reel-container');
                elements?.[index - 1]?.scrollIntoView({ behavior: 'smooth' });
              }}
              hasNext={index < MOCK_REELS.length - 1}
              hasPrev={index > 0}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
