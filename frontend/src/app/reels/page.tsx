"use client";

import React, { useState, useRef, useEffect } from 'react';
import ReelPlayer, { Reel } from '@/components/ReelPlayer';

// Mock CMS Data (Can be replaced with an API call later)
const MOCK_REELS: Reel[] = [
  {
    id: "reel-1",
    videoUrl: "https://videos.pexels.com/video-files/3752531/3752531-uhd_1440_2560_24fps.mp4",
    title: "Morning Mangala Aarti",
    description: "Experience the divine energy of early morning Mangala Aarti at Hare Krishna Mandir Dehradun. The perfect start to the day.",
    likes: 1240,
    comments: 86,
    hashtags: ["MangalaAarti", "HareKrishna", "DehradunTemple", "MorningVibes"]
  },
  {
    id: "reel-2",
    videoUrl: "https://videos.pexels.com/video-files/5896379/5896379-uhd_1440_2560_24fps.mp4",
    title: "Maha Abhishek Preparation",
    description: "Glimpses behind the scenes as devotees lovingly prepare for the upcoming Maha Abhishek ceremony.",
    likes: 856,
    comments: 42,
    hashtags: ["MahaAbhishek", "Devotion", "Seva", "KrishnaConsciousness"]
  },
  {
    id: "reel-3",
    videoUrl: "https://videos.pexels.com/video-files/4458897/4458897-uhd_1440_2560_24fps.mp4",
    title: "Youth Festival Highlights",
    description: "Our recent youth empowerment festival was a massive success! Music, wisdom, and prasadam.",
    likes: 2104,
    comments: 154,
    hashtags: ["YouthFestival", "Empowerment", "Kirtan", "Prasadam"]
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
    <main className="bg-black min-h-screen">
      {/* 
        We use h-[100dvh] (dynamic viewport height) for optimal mobile browser experience
        snap-y and snap-mandatory create the TikTok-like vertical swipe effect 
      */}
      <div 
        ref={containerRef}
        className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar relative flex justify-center"
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

        {/* Content Container: limits width on desktop, full width on mobile */}
        <div className="w-full sm:max-w-md h-full bg-black shadow-2xl relative">
          
          {/* Top navigation gradient (to ensure back button visibility) */}
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/60 to-transparent z-20 pointer-events-none" />
          
          {/* Back button */}
          <a href="/" className="absolute top-6 left-4 z-30 text-white flex items-center gap-2 hover:opacity-80 transition pointer-events-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-semibold shadow-sm">Home</span>
          </a>
          
          {/* Render the reels */}
          {MOCK_REELS.map((reel, index) => (
            <div 
              key={reel.id} 
              data-index={index}
              className="reel-container h-full w-full snap-start snap-always"
            >
              <ReelPlayer 
                reel={reel} 
                isActive={activeIndex === index} 
              />
            </div>
          ))}

        </div>
      </div>
    </main>
  );
}
