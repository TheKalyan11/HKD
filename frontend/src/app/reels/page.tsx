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
    <main className="bg-[#0a0a0a] sm:bg-[#1a1a1a] min-h-screen flex items-center justify-center">
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
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/60 to-transparent z-20 pointer-events-none sm:rounded-t-3xl" />
        
        {/* Back button */}
        <a href="/" className="absolute top-6 left-4 z-30 text-white flex items-center gap-2 hover:opacity-80 transition pointer-events-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-semibold drop-shadow-md">Home</span>
        </a>
        
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
            />
          </div>
        ))}
      </div>

      {/* Desktop Navigation Arrows */}
      <div className="hidden sm:flex flex-col gap-4 absolute right-8 md:right-12 xl:right-32 top-1/2 -translate-y-1/2 z-30">
        <button 
          onClick={() => {
            if (activeIndex > 0) {
              const elements = containerRef.current?.querySelectorAll('.reel-container');
              elements?.[activeIndex - 1]?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          disabled={activeIndex === 0}
          className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white disabled:opacity-30 disabled:hover:bg-white/10 disabled:cursor-not-allowed transition-all shadow-xl"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        
        <button 
          onClick={() => {
            if (activeIndex < MOCK_REELS.length - 1) {
              const elements = containerRef.current?.querySelectorAll('.reel-container');
              elements?.[activeIndex + 1]?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          disabled={activeIndex === MOCK_REELS.length - 1}
          className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white disabled:opacity-30 disabled:hover:bg-white/10 disabled:cursor-not-allowed transition-all shadow-xl"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </main>
  );
}
