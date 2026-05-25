"use client";

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useCms } from '@/components/CmsContext';
import { VisualEditable } from '@/components/VisualEditable';
import { ChevronLeft, ChevronRight, ArrowRight, Play } from 'lucide-react';

// Stable constant declared outside component to prevent re-creation on render
const heroSlides = [
  '/deity-1.jpg',
  '/deity-2.jpg',
  '/deity-1.jpg',
  '/deity-2.jpg'
];

export default function Home() {
  const { fetchPageContent, isLoading, isEditMode, renderEditableText, renderEditableImage } = useCms();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt Effect Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
    const rotateY = ((x - centerX) / centerX) * 10;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  // 1. Initial CMS Fetch Effect
  useEffect(() => {
    fetchPageContent('home');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Dedicated Auto-scrolling slide interval effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000); // Slower auto-scrolling (8 seconds)
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const getSlidePositionClass = (idx: number) => {
    if (idx === currentSlide) {
      return 'left-0 w-full scale-100 z-10 opacity-100';
    }
    return 'left-0 w-full scale-105 z-0 opacity-0 pointer-events-none';
  };



  return (
    <div className="relative overflow-hidden">
      
      {/* 1. HERO SLIDER SECTION (Vivanta-inspired 3-slide peeking layout) */}
      <section className="relative w-full h-[75vh] md:h-[80vh] overflow-hidden bg-[#0a0a0a] z-0 flex items-center">
        
        {/* Slides Container */}
        <div className="relative w-full h-full">
          {heroSlides.map((slide, idx) => (
            <div
              key={idx}
              onClick={() => {
                if (idx !== currentSlide) {
                  setCurrentSlide(idx);
                }
              }}
              className={`absolute top-0 h-full w-full rounded transition-all duration-700 ease-out shadow-2xl overflow-hidden flex items-center justify-center ${getSlidePositionClass(idx)}`}
            >
              {/* Full Width/Height bg-cover Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: `url('${slide}')` }}
              />

              {/* Inset White Outline Border (Reference Image Match) */}
              <div className="absolute inset-4 sm:inset-6 border border-white/20 pointer-events-none z-30" />
              
              {/* Dark overlay gradient for beautiful text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none z-10" />
            </div>
          ))}
        </div>

        {/* Liquid Glass Navigation Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center rounded-full w-12 h-12 bg-white/75 hover:bg-white text-gray-800 hover:scale-110 shadow-lg active:scale-95 transition-all duration-300"
          title="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        {/* Liquid Glass Navigation Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center rounded-full w-12 h-12 bg-white/75 hover:bg-white text-gray-800 hover:scale-110 shadow-lg active:scale-95 transition-all duration-300"
          title="Next Slide"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>

      </section>

      {/* 2. ABOUT US SECTION (HKM Dehradun & PNG Graphics with Animated Music) */}
      <section className="relative w-full py-8 lg:py-12 bg-[#fbf6f0] overflow-hidden text-gray-800 flex items-center justify-center">
        {/* Subtle decorative background elements */}
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-[#d4af37]/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-white/50 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-8">
            
            {/* Left Content (Text & Mission) */}
            <div className="flex-1 flex flex-col justify-center space-y-6 lg:pr-12 relative z-20">
              
              {/* Header area */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-[#d4af37]">
                  <div className="h-px w-16 bg-current"></div>
                  <span className="uppercase tracking-[0.25em] font-bold text-sm">About Us</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-serif text-[#3b2b2f] font-bold leading-tight drop-shadow-sm">
                  Hare Krishna Movement <br/>
                  <span className="text-[#d4af37]">Dehradun</span>
                </h2>
              </div>

              {/* Body Text (Dehradun Matter) */}
              <div className="space-y-4 text-[#4a4a4a] text-[16px] leading-relaxed max-w-lg">
                <p>
                  We aspire to create a world-class and iconic spiritual centre for Sri Krishna in the picturesque valley of Dehradun in pursuance of Srila Prabhupada's direction.
                </p>
                <p>
                  Hare Krishna Movement Dehradun will place Krishna proudly on the minds of the people and Dehradun on the global spiritual map.
                </p>
              </div>
            </div>

            {/* Right Graphics (PNG Combo & Music Animation) */}
            <div className="flex-1 w-full flex items-center justify-center lg:justify-end z-10">
              <div className="relative w-[95%] lg:w-[85%] max-w-[500px] animate-float drop-shadow-2xl">
                {/* Uploaded Combined Krishna & Cow PNG */}
                <img 
                  src="/krishna-cow-combo.png" 
                  alt="Krishna and Cow" 
                  className="w-full h-auto object-contain z-20 relative" 
                />
                
                {/* Floating Music Notes Animation (Positioned exactly near the flute's tip) */}
                <div className="absolute top-[34%] left-[53%] w-10 h-10 pointer-events-none z-30">
                  <div className="absolute animate-music-float-1 opacity-0 text-2xl md:text-3xl text-[#d4af37]" style={{ animationDelay: '0s' }}>&#9835;</div>
                  <div className="absolute animate-music-float-2 opacity-0 text-3xl md:text-4xl text-[#d4af37]" style={{ animationDelay: '1.5s', left: '10px', top: '-10px' }}>&#9834;</div>
                  <div className="absolute animate-music-float-3 opacity-0 text-xl md:text-2xl text-[#d4af37]" style={{ animationDelay: '3s', left: '-10px', top: '10px' }}>&#9835;</div>
                  <div className="absolute animate-music-float-2 opacity-0 text-2xl md:text-3xl text-[#d4af37]" style={{ animationDelay: '4.5s', left: '20px', top: '-5px' }}>&#9834;</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Global CSS for music floating animations */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes musicFloat1 {
            0% { transform: translate(0, 0) scale(0.5) rotate(-10deg); opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translate(60px, -100px) scale(1.5) rotate(20deg); opacity: 0; }
          }
          @keyframes musicFloat2 {
            0% { transform: translate(0, 0) scale(0.5) rotate(10deg); opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translate(90px, -70px) scale(1.2) rotate(-20deg); opacity: 0; }
          }
          @keyframes musicFloat3 {
            0% { transform: translate(0, 0) scale(0.5) rotate(0deg); opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translate(40px, -120px) scale(1.8) rotate(15deg); opacity: 0; }
          }
          .animate-music-float-1 { animation: musicFloat1 5s linear infinite; }
          .animate-music-float-2 { animation: musicFloat2 5s linear infinite; }
          .animate-music-float-3 { animation: musicFloat3 5s linear infinite; }
          
          @keyframes gentleFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
          }
          .animate-float { animation: gentleFloat 6s ease-in-out infinite; }
        `}} />
      </section>

      {/* 3. UPCOMING FESTIVALS SECTION */}
      <section className="relative w-full py-24 bg-[#faf8f5] flex flex-col items-center overflow-hidden">
        
        {/* Style tags for advanced, premium animations (bird gliding and flapping) */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes birdFlapping {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(0.4) translateY(2px); }
          }
          @keyframes birdGlide1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-25px, -12px) scale(1.02); }
          }
          @keyframes birdGlide2 {
            0%, 100% { transform: translate(0, 0) scale(0.85); }
            50% { transform: translate(-18px, -18px) scale(0.87); }
          }
          @keyframes birdGlide3 {
            0%, 100% { transform: translate(0, 0) scale(0.7); }
            50% { transform: translate(-12px, -8px) scale(0.72); }
          }
          
          .animate-bird-flap {
            animation: birdFlapping 0.75s ease-in-out infinite;
          }
          .animate-bird-glide-1 {
            animation: birdGlide1 8s ease-in-out infinite;
          }
          .animate-bird-glide-2 {
            animation: birdGlide2 10s ease-in-out infinite;
          }
          .animate-bird-glide-3 {
            animation: birdGlide3 7s ease-in-out infinite;
          }
        `}} />

        {/* Peach/Orange Sky Glow behind Gopuram */}
        <div className="absolute top-0 right-0 w-[320px] md:w-[420px] lg:w-[460px] h-[100%] pointer-events-none z-0 hidden sm:block overflow-hidden">
          <div className="absolute top-24 right-6 w-72 h-72 bg-[#fde9d2]/90 rounded-full blur-3xl opacity-85" />
          <div className="absolute top-48 right-24 w-56 h-56 bg-[#ebd9b3]/60 rounded-full blur-3xl opacity-70" />
          <div className="absolute top-64 right-12 w-64 h-64 bg-[#ebd5c2]/80 rounded-full blur-[100px] opacity-80" />
        </div>

        {/* Right side Temple Illustration & Clouds Background */}
        <div className="absolute top-0 right-0 w-[35%] lg:w-[30%] h-full pointer-events-none z-0 hidden sm:block overflow-hidden" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 100%)', maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 100%)' }}>
          <img 
            src="/ti.png" 
            alt="Temple Gopuram" 
            className="absolute top-24 right-[-8px] h-[65%] w-[260px] md:w-[320px] lg:w-[360px] object-contain object-right-top opacity-[0.94] transition-all duration-700 select-none mix-blend-darken"
          />
          {/* Smooth radial gradient overlay to further blend the illustration base and left edges */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f5] via-[#faf8f5]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#faf8f5]/30 to-[#faf8f5] h-[20%] top-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f5] via-transparent to-transparent h-[30%] bottom-0" />
        </div>

        {/* Animated Flying Birds in the Sky (left of gopuram) */}
        <div className="absolute top-24 right-[180px] md:right-[230px] lg:right-[260px] w-48 h-32 pointer-events-none z-10 hidden md:block select-none">
          {/* Bird 1 */}
          <div className="absolute top-[10%] left-[20%] animate-bird-glide-1">
            <svg width="28" height="14" viewBox="0 0 30 15" fill="none" className="text-[#3c1b29] animate-bird-flap">
              <path d="M2 11C6 7 11 3 15 7C19 3 24 7 28 11C23 9 17 10 15 11C13 10 7 9 2 11Z" fill="currentColor" />
            </svg>
          </div>
          
          {/* Bird 2 */}
          <div className="absolute top-[40%] left-[48%] animate-bird-glide-2" style={{ animationDelay: '1.2s' }}>
            <svg width="24" height="12" viewBox="0 0 30 15" fill="none" className="text-[#3c1b29]/85 animate-bird-flap" style={{ animationDelay: '0.15s' }}>
              <path d="M2 11C6 7 11 3 15 7C19 3 24 7 28 11C23 9 17 10 15 11C13 10 7 9 2 11Z" fill="currentColor" />
            </svg>
          </div>
          
          {/* Bird 3 */}
          <div className="absolute top-[25%] left-[76%] animate-bird-glide-3" style={{ animationDelay: '0.6s' }}>
            <svg width="18" height="9" viewBox="0 0 30 15" fill="none" className="text-[#3c1b29]/75 animate-bird-flap" style={{ animationDelay: '0.3s' }}>
              <path d="M2 11C6 7 11 3 15 7C19 3 24 7 28 11C23 9 17 10 15 11C13 10 7 9 2 11Z" fill="currentColor" />
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-20">
          
          {/* Section Header with Lotus & Ornament Lines */}
          <div className="flex flex-col items-center text-center space-y-2 mb-16 relative">
            
            {/* Top Gold Ornament with Lotus (Screenshot Match) */}
            <div className="flex items-center justify-center gap-3 w-full max-w-[340px] md:max-w-[420px] mb-2 text-[#cca75b]">
              <div className="flex-1 flex items-center">
                <div className="h-[1px] w-full bg-[#cca75b]/60" />
                <span className="text-[10px] -ml-1">◆</span>
              </div>
              
              {/* Golden Lotus Outline Symbol */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="mx-1">
                <path d="M12 3C12 3 9 9 12 21C15 9 12 3 12 3Z" fill="currentColor" fillOpacity="0.1" />
                <path d="M12 21C8 18 5 13 7 9C9 9 11 15 12 21Z" fill="currentColor" fillOpacity="0.1" />
                <path d="M12 21C5 19 3 16 5 12C7 12 10 17 12 21Z" fill="currentColor" fillOpacity="0.05" />
                <path d="M12 21C16 18 19 13 17 9C15 9 13 15 12 21Z" fill="currentColor" fillOpacity="0.1" />
                <path d="M12 21C19 19 21 16 19 12C17 12 14 17 12 21Z" fill="currentColor" fillOpacity="0.05" />
              </svg>
              
              <div className="flex-1 flex items-center">
                <span className="text-[10px] -mr-1">◆</span>
                <div className="h-[1px] w-full bg-[#cca75b]/60" />
              </div>
            </div>
            
            <h2 className="text-4xl md:text-[44px] font-serif text-[#3c1b29] tracking-normal mb-1 font-bold">
              Upcoming Festivals
            </h2>

            {/* Bottom Gold Ornament Knot (Screenshot Match) */}
            <div className="flex items-center justify-center gap-3 w-full max-w-[200px] md:max-w-[280px] mt-2 text-[#cca75b]">
              <div className="flex-1 flex items-center justify-end">
                <div className="h-[1px] w-full bg-[#cca75b]/50" />
                <span className="text-[8px] -ml-1">◆</span>
              </div>
              
              {/* Sacred Knot/Scroll Symbol SVG */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-1">
                <path d="M12 6 C10 4, 8 4, 8 6 C8 8, 12 10, 12 12 C12 14, 8 16, 8 18 C8 20, 10 20, 12 18 C14 20, 16 20, 16 18 C16 16, 12 14, 12 12 C12 10, 16 8, 16 6 C16 4, 14 4, 12 6 Z" fill="none" />
              </svg>
              
              <div className="flex-1 flex items-center justify-start">
                <span className="text-[8px] -mr-1">◆</span>
                <div className="h-[1px] w-full bg-[#cca75b]/50" />
              </div>
            </div>
            
            <p className="text-[#5c5245] max-w-2xl text-[15px] leading-relaxed pt-3 font-medium">
              Celebrate divine moments and spiritual traditions with us. <br className="hidden md:block" />
              Join our upcoming festivals and be a part of the sacred experience.
            </p>
          </div>

          {/* Festivals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-20">
            
            {/* Card 1: Jhulan Yatra */}
            <div className="bg-white rounded-2xl overflow-hidden flex flex-col items-center pb-8 relative group border border-[#e0cba0]/60 shadow-[0_8px_30px_rgba(235,220,185,0.12)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(235,220,185,0.25)] transition-all duration-300 cursor-pointer">
              <div className="w-full h-48 overflow-hidden relative">
                <img src="/deity-1.jpg" alt="Jhulan Yatra" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
              </div>
              
              {/* Overlapping Circle Icon - Lotus SVG */}
              <div className="absolute top-[164px] w-14 h-14 bg-[#fdf8eb] rounded-full flex items-center justify-center border border-[#ebdcb9] text-[#b58c3d] shadow-md transition-transform duration-300 group-hover:scale-105 z-20">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22C12 22 9.5 16 12 10C14.5 16 12 22 12 22Z" fill="currentColor" fillOpacity="0.1" />
                  <path d="M12 22C10 20 8 16.5 10 13C12 13.5 12 19 12 22Z" fill="currentColor" fillOpacity="0.05" />
                  <path d="M12 22C14 20 16 16.5 14 13C12 13.5 12 19 12 22Z" fill="currentColor" fillOpacity="0.05" />
                  <path d="M12 22C8 20 6.5 17 8.5 14.5C10.5 15.5 11.5 19 12 22Z" fill="currentColor" fillOpacity="0.02" />
                  <path d="M12 22C16 20 17.5 17 15.5 14.5C13.5 15.5 12.5 19 12 22Z" fill="currentColor" fillOpacity="0.02" />
                  <path d="M8 22C9.5 20.5 14.5 20.5 16 22" />
                </svg>
              </div>
              
              <div className="pt-10 px-6 flex flex-col items-center text-center">
                <h3 className="text-xl font-serif text-[#3c1b29] font-bold mb-2">Jhulan Yatra</h3>
                <div className="flex items-center gap-1.5 text-xs text-[#b8964d] mb-4 font-bold tracking-wider uppercase">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#cca75b]"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  <span>July 06 – July 14, 2025</span>
                </div>
                <p className="text-[#5c5245] text-[14px] leading-relaxed mb-6 font-medium">
                  Celebrate the divine swing festival of Radha Krishna with kirtans, beautiful decorations and devotion.
                </p>
                
                {/* View Details Link */}
                <div className="flex items-center gap-1 text-[13px] font-bold text-[#4a2133] hover:text-[#5d2a40] transition-colors mt-auto font-serif">
                  <span>View Details</span>
                  <span className="text-[#cca75b] font-sans ml-1 text-base transform transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </div>
              </div>
            </div>

            {/* Card 2: Janmashtami */}
            <div className="bg-white rounded-2xl overflow-hidden flex flex-col items-center pb-8 relative group border border-[#e0cba0]/60 shadow-[0_8px_30px_rgba(235,220,185,0.12)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(235,220,185,0.25)] transition-all duration-300 cursor-pointer">
              <div className="w-full h-48 overflow-hidden relative">
                <img src="/deity-2.jpg" alt="Janmashtami" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
              </div>
              
              {/* Overlapping Circle Icon - Conch Shell SVG */}
              <div className="absolute top-[164px] w-14 h-14 bg-[#fdf8eb] rounded-full flex items-center justify-center border border-[#ebdcb9] text-[#b58c3d] shadow-md transition-transform duration-300 group-hover:scale-105 z-20">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16.5 4.5 C14.5 2.5, 9.5 3.5, 7.5 6.5 C5.5 9.5, 5 14.5, 8.5 17.5 C11 19.5, 14.5 20.5, 17.5 18 C20.5 15.5, 20.5 10.5, 18.5 7.5 Z" fill="currentColor" fillOpacity="0.1" />
                  <path d="M7.5 6.5 C9.5 8.5, 13.5 8.5, 16.5 6.5" />
                  <path d="M8.5 10.5 C10.5 12.5, 14.5 12.5, 17.5 10.5" />
                  <path d="M9.5 14.5 C11.5 16.5, 15.5 16.5, 18.5 14.5" />
                  <path d="M12 19.5 L14 21.5" />
                  <path d="M7.5 6.5 C7 5, 8.5 4, 9.5 4.5" />
                </svg>
              </div>
              
              <div className="pt-10 px-6 flex flex-col items-center text-center">
                <h3 className="text-xl font-serif text-[#3c1b29] font-bold mb-2">Janmashtami</h3>
                <div className="flex items-center gap-1.5 text-xs text-[#b8964d] mb-4 font-bold tracking-wider uppercase">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#cca75b]"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  <span>August 15, 2025</span>
                </div>
                <p className="text-[#5c5245] text-[14px] leading-relaxed mb-6 font-medium">
                  Commemorate the appearance of Lord Krishna with fasting, midnight aarti, kirtans and joyful celebrations.
                </p>
                
                {/* View Details Link */}
                <div className="flex items-center gap-1 text-[13px] font-bold text-[#4a2133] hover:text-[#5d2a40] transition-colors mt-auto font-serif">
                  <span>View Details</span>
                  <span className="text-[#cca75b] font-sans ml-1 text-base transform transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </div>
              </div>
            </div>

            {/* Card 3: Radhashtami */}
            <div className="bg-white rounded-2xl overflow-hidden flex flex-col items-center pb-8 relative group border border-[#e0cba0]/60 shadow-[0_8px_30px_rgba(235,220,185,0.12)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(235,220,185,0.25)] transition-all duration-300 cursor-pointer">
              <div className="w-full h-48 overflow-hidden relative">
                <img src="/deity-1.jpg" alt="Radhashtami" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
              </div>
              
              {/* Overlapping Circle Icon - Flute SVG */}
              <div className="absolute top-[164px] w-14 h-14 bg-[#fdf8eb] rounded-full flex items-center justify-center border border-[#ebdcb9] text-[#b58c3d] shadow-md transition-transform duration-300 group-hover:scale-105 z-20">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="4" y1="20" x2="20" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="8" cy="16" r="1.2" fill="currentColor" />
                  <circle cx="10" cy="14" r="1.2" fill="currentColor" />
                  <circle cx="12" cy="12" r="1.2" fill="currentColor" />
                  <circle cx="14" cy="10" r="1.2" fill="currentColor" />
                  <circle cx="16" cy="8" r="1.2" fill="currentColor" />
                  <path d="M19 5 C20.5 3.5, 21.5 4.5, 20.5 6 C19.5 7.5, 17 6.5, 19 5 Z" fill="currentColor" fillOpacity="0.2" />
                  <path d="M19.5 5.5 C20 4.5, 20.5 5, 20 5.5 Z" fill="currentColor" />
                  <path d="M5.5 18.5 C4.5 19.5, 5 20.5, 4.5 21.5" />
                  <path d="M6 19 C5.5 20.5, 6 21, 5.5 22" />
                </svg>
              </div>
              
              <div className="pt-10 px-6 flex flex-col items-center text-center">
                <h3 className="text-xl font-serif text-[#3c1b29] font-bold mb-2">Radhashtami</h3>
                <div className="flex items-center gap-1.5 text-xs text-[#b8964d] mb-4 font-bold tracking-wider uppercase">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#cca75b]"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  <span>September 01, 2025</span>
                </div>
                <p className="text-[#5c5245] text-[14px] leading-relaxed mb-6 font-medium">
                  Honoring the appearance of Srimati Radharani with special puja, kirtans and divine pastimes.
                </p>
                
                {/* View Details Link */}
                <div className="flex items-center gap-1 text-[13px] font-bold text-[#4a2133] hover:text-[#5d2a40] transition-colors mt-auto font-serif">
                  <span>View Details</span>
                  <span className="text-[#cca75b] font-sans ml-1 text-base transform transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </div>
              </div>
            </div>

            {/* Card 4: Diwali */}
            <div className="bg-white rounded-2xl overflow-hidden flex flex-col items-center pb-8 relative group border border-[#e0cba0]/60 shadow-[0_8px_30px_rgba(235,220,185,0.12)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(235,220,185,0.25)] transition-all duration-300 cursor-pointer">
              <div className="w-full h-48 overflow-hidden relative">
                <img src="/deity-2.jpg" alt="Diwali" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
              </div>
              
              {/* Overlapping Circle Icon - Diya SVG */}
              <div className="absolute top-[164px] w-14 h-14 bg-[#fdf8eb] rounded-full flex items-center justify-center border border-[#ebdcb9] text-[#b58c3d] shadow-md transition-transform duration-300 group-hover:scale-105 z-20">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 13 C4 18, 20 18, 20 13 C20 12, 17 11.5, 12 11.5 C7 11.5, 4 12, 4 13 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 13 C5 16, 19 16, 19 13 C19 12.5, 16 12, 12 12 C8 12, 5 12.5, 5 13 Z" fill="currentColor" fillOpacity="0.1" />
                  <path d="M12 11 C10.5 9, 10.5 6, 12 3 C13.5 6, 13.5 9, 12 11 Z" fill="#e9a834" fillOpacity="0.3" stroke="#e9a834" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 9 C11.3 8, 11.3 6.5, 12 5.5 C12.7 6.5, 12.7 8, 12 9 Z" fill="#e9a834" />
                </svg>
              </div>
              
              <div className="pt-10 px-6 flex flex-col items-center text-center">
                <h3 className="text-xl font-serif text-[#3c1b29] font-bold mb-2">Diwali</h3>
                <div className="flex items-center gap-1.5 text-xs text-[#b8964d] mb-4 font-bold tracking-wider uppercase">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#cca75b]"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  <span>October 20, 2025</span>
                </div>
                <p className="text-[#5c5245] text-[14px] leading-relaxed mb-6 font-medium">
                  The festival of lights symbolizing the victory of good over evil. Join us for puja, lights and joy.
                </p>
                
                {/* View Details Link */}
                <div className="flex items-center gap-1 text-[13px] font-bold text-[#4a2133] hover:text-[#5d2a40] transition-colors mt-auto font-serif">
                  <span>View Details</span>
                  <span className="text-[#cca75b] font-sans ml-1 text-base transform transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Button - Matching Screenshot */}
          <div className="mt-16 flex justify-center">
            <button className="group flex items-center gap-2 px-8 py-3.5 bg-[#3c1b29] hover:bg-[#4d2335] text-white rounded-md font-bold shadow-md hover:shadow-lg transition-all duration-300 tracking-wide text-sm font-serif">
              View All Festivals
              <span className="text-[#cca75b] font-sans text-lg transform transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </button>
          </div>

        </div>
        
        {/* Bottom decorative pattern overlay */}
        <div className="absolute bottom-0 left-0 w-full h-10 opacity-[0.08]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5z%22 fill=%22%23cca75b%22/%3E%3C/svg%3E')" }} />
      </section>

    </div>
  );
}
