"use client";
import React, { useRef, useState, useEffect } from 'react';

export default function AetheraHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOpacity, setVideoOpacity] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    let animationFrameId: number;
    let isTransitioning = false;
    
    const checkTime = () => {
      if (!video || isTransitioning) return;
      
      const { currentTime, duration } = video;
      
      if (currentTime < 0.5) {
        setVideoOpacity(currentTime / 0.5);
      } else if (duration > 0 && duration - currentTime <= 0.5) {
        setVideoOpacity((duration - currentTime) / 0.5);
      } else {
        setVideoOpacity(1);
      }
      
      if (duration > 0 && currentTime >= duration - 0.1) {
        isTransitioning = true;
        setVideoOpacity(0);
        
        setTimeout(() => {
          video.currentTime = 0;
          video.play().then(() => {
            isTransitioning = false;
          }).catch(e => console.log(e));
        }, 100);
      }
      
      animationFrameId = requestAnimationFrame(checkTime);
    };
    
    video.play().catch(e => console.log(e));
    animationFrameId = requestAnimationFrame(checkTime);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Background Video Layer */}
      <div 
        className="absolute z-0" 
        style={{ inset: 'auto 0 0 0', top: '300px' }}
      >
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
          className="w-full h-full object-cover transition-opacity duration-[100ms]"
          style={{ opacity: videoOpacity }}
          muted
          playsInline
          autoPlay
          loop={false}
        />
        {/* Gradient overlay on video */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="font-instrument text-3xl tracking-tight text-[#000000]">
          Aethera<sup className="text-sm">&reg;</sup>
        </div>
        <div className="hidden md:flex items-center gap-8 font-inter text-sm transition-colors">
          <a href="#" className="text-[#000000]">Home</a>
          <a href="#" className="text-[#6F6F6F] hover:text-[#000000] transition-colors">Studio</a>
          <a href="#" className="text-[#6F6F6F] hover:text-[#000000] transition-colors">About</a>
          <a href="#" className="text-[#6F6F6F] hover:text-[#000000] transition-colors">Journal</a>
          <a href="#" className="text-[#6F6F6F] hover:text-[#000000] transition-colors">Reach Us</a>
        </div>
        <button className="hidden md:block rounded-full px-6 py-2.5 bg-[#000000] text-white text-sm hover:scale-[1.03] transition-all duration-300 font-inter">
          Begin Journey
        </button>
      </nav>

      {/* Hero Section */}
      <section 
        className="relative z-10 flex flex-col items-center justify-center text-center px-6"
        style={{ paddingTop: 'calc(8rem - 75px)', paddingBottom: '10rem' }}
      >
        <h1 className="font-instrument text-5xl sm:text-7xl md:text-8xl max-w-7xl font-normal leading-[0.95] tracking-[-2.46px] text-[#000000] animate-fade-rise">
          Beyond <span className="italic text-[#6F6F6F]">silence,</span> we build <span className="italic text-[#6F6F6F]">the eternal.</span>
        </h1>
        
        <p className="font-inter text-base sm:text-lg max-w-2xl mt-8 leading-relaxed text-[#6F6F6F] animate-fade-rise-delay">
          Building platforms for brilliant minds, fearless makers, and thoughtful souls. Through the noise, we craft digital havens for deep work and pure flows.
        </p>
        
        <button className="font-inter mt-12 px-14 py-5 rounded-full bg-[#000000] text-[#FFFFFF] text-base hover:scale-[1.03] transition-all duration-300 animate-fade-rise-delay-2 shadow-lg">
          Begin Journey
        </button>
      </section>
    </div>
  );
}
