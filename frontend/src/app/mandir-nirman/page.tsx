"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// --- MOCK CMS DATA ---
type DarshanImage = {
  id: string;
  url: string;
  date: string;
  title: string;
};

// Data for Mandir Nirman
const MOCK_DATA: DarshanImage[] = [
  { id: 'm1', url: '/mandir-nirman/render-1.webp', date: '2026-06-09', title: 'Main Temple View' },
  { id: 'm2', url: '/mandir-nirman/render-2.webp', date: '2026-06-09', title: 'Temple Entrance' },
  { id: 'm3', url: '/mandir-nirman/render-3.webp', date: '2026-06-09', title: 'Lush Gardens' },
  { id: 'm4', url: '/mandir-nirman/render-4.webp', date: '2026-06-09', title: 'Goshala' },
  { id: 'm5', url: '/mandir-nirman/render-5.webp', date: '2026-06-09', title: 'Water Features' },
  { id: 'm6', url: '/mandir-nirman/render-6.webp', date: '2026-06-09', title: 'Aerial Campus Layout' },
  { id: 'm7', url: '/mandir-nirman/render-7.webp', date: '2026-06-09', title: 'Central Lawn' },
  { id: 'm8', url: '/mandir-nirman/render-8.webp', date: '2026-06-09', title: 'Cascading Waterfalls' },
  { id: 'm9', url: '/mandir-nirman/render-9.webp', date: '2026-06-09', title: 'Goshala Pathways' },
  { id: 'm11', url: '/mandir-nirman/render-11.webp', date: '2026-06-09', title: 'Courtyard Fountain' },
];

export default function MandirNirmanPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedIndex === null) return;
    if (e.key === 'ArrowRight') {
      setSelectedIndex(prev => (prev !== null && prev < MOCK_DATA.length - 1 ? prev + 1 : prev));
    }
    if (e.key === 'ArrowLeft') {
      setSelectedIndex(prev => (prev !== null && prev > 0 ? prev - 1 : prev));
    }
    if (e.key === 'Escape') {
      setSelectedIndex(null);
    }
  }, [selectedIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <main className="min-h-screen bg-[#faf8f5] font-sans pb-20 text-[#333]">
      
      {/* ── HERO SECTION ─────────────────────────────────────── */}
      <section className="relative pt-4 sm:pt-6 pb-2 overflow-hidden z-10 bg-[#faf8f5]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          
          {/* Decorative Tag */}
          <div className="flex items-center gap-3 text-[#d4af37] mb-2">
            <div className="h-px w-10 bg-current"></div>
            <span className="uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">HARE KRISHNA MOVEMENT DEHRADUN</span>
            <div className="h-px w-10 bg-current"></div>
          </div>

          {/* Page Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#072149] tracking-tight mb-3">
            Mandir <span className="text-[#d4af37]">Nirman</span>
          </h1>

          {/* Subheading */}
          <p className="text-[#5c5245] max-w-2xl text-[16px] sm:text-[18px] leading-relaxed font-medium mb-4">
            Discover the grand architectural vision, serene landscapes, and magnificent renders of the upcoming Hare Krishna Movement temple complex in Dehradun.
          </p>

        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-8 lg:py-12 bg-[#faf8f5]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 text-[#d4af37] mb-2">
              <div className="h-px w-10 bg-current"></div>
              <span className="uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">GRAND VISION</span>
              <div className="h-px w-10 bg-current"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#072149] tracking-tight mb-2">
              Architecture <span className="text-[#d4af37]">Gallery</span>
            </h2>
          </div>

          {/* Grid Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-[300px]">
          {MOCK_DATA.map((img, idx) => {
            // Give some items a wider span to make the grid look organic like the reference
            const isWide = idx === 0 || idx === 5 || idx === 8;
            
            return (
              <motion.div 
                key={img.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.1, ease: "easeOut" }}
                onClick={() => openLightbox(idx)}
                className={`relative cursor-pointer group overflow-hidden shadow-md bg-[#e0dfdb] ${isWide ? 'md:col-span-2' : 'col-span-1'} rounded-sm`}
              >
                {/* Image */}
                <img 
                  src={img.url} 
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                
                {/* Gradient Overlay for Text Readability - Similar to reference image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                
                {/* Title Text */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white text-lg md:text-xl font-light tracking-wide">
                    {img.title}
                  </h3>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>

      {/* Lightbox Modal (No Share/Download buttons) */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md text-white flex flex-col"
          >
            {/* Top Toolbar */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 pointer-events-none">
              <div className="flex flex-col pointer-events-auto">
                <span className="text-lg font-light tracking-wide">
                  {MOCK_DATA[selectedIndex].title}
                </span>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors pointer-events-auto"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Image Container */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
              {/* Left Navigation */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-1/4 z-10 cursor-pointer flex items-center pl-4 md:pl-8 group"
                onClick={() => setSelectedIndex(prev => prev !== null && prev > 0 ? prev - 1 : prev)}
              >
                {selectedIndex > 0 && (
                  <div className="p-4 rounded-full bg-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronLeft className="w-8 h-8" />
                  </div>
                )}
              </div>

              {/* The Image */}
              <motion.img
                key={MOCK_DATA[selectedIndex].id}
                src={MOCK_DATA[selectedIndex].url}
                alt={MOCK_DATA[selectedIndex].title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="max-w-[90vw] max-h-[85vh] object-contain select-none shadow-2xl"
                draggable={false}
              />

              {/* Right Navigation */}
              <div 
                className="absolute right-0 top-0 bottom-0 w-1/4 z-10 cursor-pointer flex items-center justify-end pr-4 md:pr-8 group"
                onClick={() => setSelectedIndex(prev => prev !== null && prev < MOCK_DATA.length - 1 ? prev + 1 : prev)}
              >
                {selectedIndex < MOCK_DATA.length - 1 && (
                  <div className="p-4 rounded-full bg-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-8 h-8" />
                  </div>
                )}
              </div>
            </div>
            
            {/* Note: Share and Download buttons intentionally removed per request */}
            
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
