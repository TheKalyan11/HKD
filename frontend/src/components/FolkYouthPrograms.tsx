"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FolkYouthPrograms() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = 3;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, totalSlides]);

  return (
    <section className="py-16 sm:py-24 bg-[#fbf6f0] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-[#0a3d73] tracking-tight uppercase mb-4">
            Youth Programs
          </h2>
          <div className="w-24 h-1 bg-[#cca75b] mx-auto rounded-full" />
        </div>

        <div className="relative rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-[#DFF0F8] via-[#E2F2FA] to-[#D5EBF6] border border-[#BCE1F1] shadow-2xl overflow-hidden">
          
          {/* Horizontal Sliding Track */}
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {/* ── SLIDE 1: Escape The Ordinary in 21 Days ────────────────────── */}
            <div className="w-full flex-shrink-0 p-6 sm:p-10 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-full md:w-[48%] h-[260px] sm:h-[340px] md:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl relative bg-gradient-to-br from-[#06142e] via-[#091f46] to-[#040e21] flex flex-col items-center justify-between p-4 border border-blue-900/40">
                <div className="w-full flex justify-between px-4 -mt-4">
                  <div className="bg-[#62B824] border-t-2 border-[#81DE3C] shadow-lg px-4 py-2 rounded-b-xl text-white font-black text-xs sm:text-sm tracking-wider">
                    FREE
                  </div>
                  <div className="bg-[#62B824] border-t-2 border-[#81DE3C] shadow-lg px-3 py-2 rounded-b-xl text-white font-black text-[10px] sm:text-xs text-center leading-tight">
                    EVERY<br />SUNDAY
                  </div>
                </div>

                <div className="flex flex-col items-center text-center my-auto">
                  <img
                    src="/channels4_profile-removebg-preview.png"
                    alt="FOLK Emblem"
                    className="h-14 sm:h-20 w-auto object-contain drop-shadow mb-2"
                  />
                  <div className="text-[10px] sm:text-xs font-bold text-gray-300 tracking-widest uppercase mb-1">
                    Youth Empowerment Club PRESENTS
                  </div>
                  <div className="text-lg sm:text-2xl font-black text-[#F5C518] tracking-wider uppercase drop-shadow">
                    ESCAPE THE ORDINARY IN 21 DAYS
                  </div>
                </div>

                <div className="text-[11px] text-gray-300/80 pb-1">
                  Guided by Bhagavad Gita Wisdom
                </div>
              </div>

              <div className="w-full md:w-[52%] flex flex-col justify-center text-left pb-12 md:pb-6">
                <span className="text-xs sm:text-sm font-extrabold tracking-widest text-blue-700 uppercase mb-2">
                  Youth Empowerment Club • Dehradun
                </span>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#111827] tracking-tight leading-tight mb-4">
                  Escape The Ordinary in 21 Days
                </h1>
                <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
                  Unlock your highest potential through practical Vedic wisdom, meditation techniques, and mind control from the Bhagavad Gita. Specially designed for young professionals and students.
                </p>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-gray-800 mb-6">
                  <span className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-full border border-blue-200/60">
                    <span className="text-amber-500">★</span> 4.9 Rated
                  </span>
                  <span className="bg-white/70 px-3 py-1.5 rounded-full border border-blue-200/60">
                    Every Sunday
                  </span>
                  <span className="bg-white/70 px-3 py-1.5 rounded-full border border-blue-200/60">
                    Free Entry & Feast
                  </span>
                </div>
                <div>
                  <Link
                    href="/youth"
                    className="inline-flex items-center gap-2 rounded-full border border-gray-400/80 bg-white hover:bg-gray-50 text-gray-900 font-bold px-6 py-2.5 text-sm shadow-sm transition-all"
                  >
                    See details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* ── SLIDE 2: Sunday Evening Schedule (4 Tracks) ───────────────── */}
            <div className="w-full flex-shrink-0 p-6 sm:p-10 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-full md:w-[48%] h-[260px] sm:h-[340px] md:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl relative bg-gradient-to-b from-[#09152E] to-[#0c1e40] p-4 sm:p-6 flex flex-col justify-between border border-blue-900/40">
                <div className="text-[#F5C518] text-xs font-black tracking-widest uppercase text-center">
                  4 Comprehensive Sunday Sessions
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-3 my-auto">
                  <div className="bg-white/10 rounded-xl p-2.5 text-center border border-white/10">
                    <div className="text-[#F37E3E] font-bold text-xs">FOLK WORKSHOP</div>
                    <div className="text-[10px] text-gray-300">4 - 5 PM • Meditation</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-2.5 text-center border border-white/10">
                    <div className="text-[#E4CD90] font-bold text-xs">FOLK STANDOUT</div>
                    <div className="text-[10px] text-gray-300">5 - 6 PM • Leadership</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-2.5 text-center border border-white/10">
                    <div className="text-[#60BFEA] font-bold text-xs">FOLK HARMONY</div>
                    <div className="text-[10px] text-gray-300">6 - 7 PM • Kirtan</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-2.5 text-center border border-white/10">
                    <div className="text-[#86B94A] font-bold text-xs">FOLK FEAST</div>
                    <div className="text-[10px] text-gray-300">7 PM+ • Dinner Feast</div>
                  </div>
                </div>
                <div className="text-center text-[11px] text-gray-300/80">
                  All sessions conducted under expert guidance
                </div>
              </div>

              <div className="w-full md:w-[52%] flex flex-col justify-center text-left pb-12 md:pb-6">
                <span className="text-xs sm:text-sm font-extrabold tracking-widest text-blue-700 uppercase mb-2">
                  Complete Cultural Experience
                </span>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#111827] tracking-tight leading-tight mb-4">
                  Sunday Evening Schedule
                </h2>
                <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
                  Immerse yourself every Sunday from 4 PM onwards: Vedic Workshop, Standout Leadership Talk, Soulful Musical Harmony, and a Sanctified Dinner Prasadam Feast.
                </p>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-gray-800 mb-6">
                  <span className="bg-white/70 px-3 py-1.5 rounded-full border border-blue-200/60">
                    4:00 PM to 8:00 PM
                  </span>
                  <span className="bg-white/70 px-3 py-1.5 rounded-full border border-blue-200/60">
                    4 Tracks Included
                  </span>
                  <span className="bg-white/70 px-3 py-1.5 rounded-full border border-blue-200/60">
                    Free Dinner
                  </span>
                </div>
                <div>
                  <Link
                    href="/youth"
                    className="inline-flex items-center gap-2 rounded-full border border-gray-400/80 bg-white hover:bg-gray-50 text-gray-900 font-bold px-6 py-2.5 text-sm shadow-sm transition-all"
                  >
                    See details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* ── SLIDE 3: Dynamic Youth Community ──────────────────────────── */}
            <div className="w-full flex-shrink-0 p-6 sm:p-10 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-full md:w-[48%] h-[260px] sm:h-[340px] md:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl relative">
                <img
                  src="/darshan/DSC04179.webp"
                  alt="FOLK Community"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <div className="font-bold text-sm sm:text-base">Friends of Lord Krishna</div>
                    <div className="text-xs text-gray-300">Hare Krishna Movement Dehradun</div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-[52%] flex flex-col justify-center text-left pb-12 md:pb-6">
                <span className="text-xs sm:text-sm font-extrabold tracking-widest text-blue-700 uppercase mb-2">
                  Guided By Bhagavad Gita
                </span>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#111827] tracking-tight leading-tight mb-4">
                  Dynamic Youth Fellowship
                </h2>
                <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
                  Step away from stress and anxiety. Build genuine friendships, join weekend spiritual retreats, and grow in an atmosphere of devotion, joy, and conscious living.
                </p>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-gray-800 mb-6">
                  <span className="bg-white/70 px-3 py-1.5 rounded-full border border-blue-200/60">
                    1000+ Youth Members
                  </span>
                  <span className="bg-white/70 px-3 py-1.5 rounded-full border border-blue-200/60">
                    Weekly Sessions
                  </span>
                  <span className="bg-white/70 px-3 py-1.5 rounded-full border border-blue-200/60">
                    Life Coaching
                  </span>
                </div>
                <div>
                  <Link
                    href="/youth"
                    className="inline-flex items-center gap-2 rounded-full border border-gray-400/80 bg-white hover:bg-gray-50 text-gray-900 font-bold px-6 py-2.5 text-sm shadow-sm transition-all"
                  >
                    See details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── BOTTOM RIGHT SLIDE CONTROLS ── */}
          <div className="absolute bottom-5 right-6 sm:bottom-7 sm:right-10 z-20 flex items-center gap-3 sm:gap-4 text-[#1e293b] font-bold">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)}
              className="p-1.5 hover:bg-black/10 rounded-full transition-colors"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <span className="text-xs sm:text-sm tracking-wider px-1">
              {currentSlide + 1} / {totalSlides}
            </span>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % totalSlides)}
              className="p-1.5 hover:bg-black/10 rounded-full transition-colors"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1.5 hover:bg-black/10 rounded-full transition-colors ml-1"
              aria-label={isPaused ? "Play" : "Pause"}
            >
              {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
