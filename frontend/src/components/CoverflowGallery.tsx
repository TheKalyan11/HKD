"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const galleryItems = [
  { id: 1, src: '/deity-1.jpg', title: 'Jhulan Yatra', subtitle: 'Divine Swing Festival' },
  { id: 2, src: '/deity-2.jpg', title: 'Janmashtami', subtitle: 'Appearance of Lord Krishna' },
  { id: 3, src: '/annadan.jpg', title: 'Annadaan Seva', subtitle: 'Feeding the pilgrims' },
  { id: 4, src: '/gau_seva.jpg', title: 'Gau Seva', subtitle: 'Serving the sacred cows' },
  { id: 5, src: '/about-1.png', title: 'Temple Construction', subtitle: 'Building the grand monument' },
  { id: 6, src: '/about-us.jpg', title: 'Community Outreach', subtitle: 'Spreading the holy name' },
  { id: 7, src: '/mandir_nitya_seva.png', title: 'Nitya Seva', subtitle: 'Daily deity worship' },
];

export default function CoverflowGallery() {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(galleryItems.length / 2));
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const getCardStyles = (index: number) => {
    const total = galleryItems.length;
    let offset = (index - currentIndex) % total;
    if (offset > Math.floor(total / 2)) offset -= total;
    if (offset < -Math.floor(total / 2)) offset += total;

    const absOffset = Math.abs(offset);
    const sign = Math.sign(offset);
    
    // Flat 3D scaling carousel
    let translateX = 0;
    let scale = 1;
    let zIndex = 10;
    let opacity = 1;
    
    if (absOffset === 0) {
      translateX = 0;
      scale = 1;
      zIndex = 10;
      opacity = 1;
    } else if (absOffset === 1) {
      translateX = sign * 65; // Shifts side images 65% of their width
      scale = 0.85; // Slightly smaller
      zIndex = 5; // Behind the center image
      opacity = 1;
    } else {
      translateX = sign * 120;
      scale = 0.7;
      zIndex = 1;
      opacity = 0; // Hides images further out, keeping focus on the middle 3
    }
    
    return {
      transform: `translateX(${translateX}%) scale(${scale})`,
      zIndex,
      opacity,
      visibility: (Math.abs(offset) > 1 ? 'hidden' : 'visible') as 'hidden' | 'visible',
    };
  };

  return (
    <section 
      className="relative w-full pt-16 pb-0 overflow-hidden bg-[#fdfdfd] flex flex-col min-h-[500px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Top Left Title */}
      <div className="absolute top-12 left-6 md:left-16 lg:left-24 flex items-center gap-4 z-20">
        <span className="w-5 h-[2px] bg-gray-800"></span>
        <h2 className="text-lg md:text-xl font-bold tracking-[0.15em] text-gray-800 font-sans uppercase">
          GALLERY
        </h2>
      </div>
      
      {/* Flat 3D Carousel Container */}
      <div 
        className="relative w-full max-w-[100vw] h-[300px] sm:h-[400px] md:h-[450px] flex justify-center items-center z-10 mt-12"
      >
        {galleryItems.map((item, index) => {
          const style = getCardStyles(index);
          const isCenter = index === currentIndex;
          
          return (
            <div
              key={item.id}
              className="absolute w-[280px] h-[200px] sm:w-[450px] sm:h-[300px] md:w-[650px] md:h-[400px] rounded-3xl overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.25)] transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer bg-white"
              style={style}
              onClick={() => setCurrentIndex(index)}
            >
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
              {/* Dark overlay for side images to highlight the center one */}
              <div 
                className={`absolute inset-0 bg-black/40 pointer-events-none transition-opacity duration-700 ${isCenter ? 'opacity-0' : 'opacity-100'}`} 
              />
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows Bottom Center */}
      <div className="mt-10 flex justify-center items-center gap-4 z-20">
        <button 
          onClick={handlePrev}
          className="w-12 h-12 flex items-center justify-center rounded-full border-[1.5px] border-gray-400 text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-600 transition-all active:scale-95 bg-transparent"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
        </button>
        <button 
          onClick={handleNext}
          className="w-12 h-12 flex items-center justify-center rounded-full border-[1.5px] border-gray-400 text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-600 transition-all active:scale-95 bg-transparent"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5 stroke-[1.5]" />
        </button>
      </div>
    </section>
  );
}
