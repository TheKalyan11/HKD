"use client";

import React from 'react';
import Link from 'next/link';
import { HeartHandshake, CreditCard, CalendarHeart, Gift } from 'lucide-react';

export default function SupportMission() {
  return (
    <section className="relative w-full pt-0 pb-24 bg-[#fcfcfc] flex justify-center items-center px-4 overflow-hidden min-h-[500px]">
      
      {/* Massive Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.03]">
        <h1 className="text-[12rem] sm:text-[18rem] md:text-[24rem] font-black tracking-tighter text-black uppercase leading-none select-none whitespace-nowrap">
          DONATE
        </h1>
      </div>

      <div className="relative z-10 max-w-5xl w-full bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 border border-white/60">
        
        {/* Left Content */}
        <div className="flex-1 flex flex-col items-start text-left">
          <div className="mb-4">
            <HeartHandshake className="w-10 h-10 text-gray-700" strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4 font-sans">
            Support Our Mission
          </h2>
          <p className="text-gray-600 text-sm md:text-base mb-8 max-w-md leading-relaxed">
            Contribute to the Hare Krishna Movement to support our charitable activities, temple construction, and distribution of spiritual knowledge to the world.
          </p>
          
          <div className="flex items-center gap-4 mt-auto">
            <div className="flex -space-x-3">
              <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://randomuser.me/api/portraits/men/43.jpg" alt="Supporter" />
              <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://randomuser.me/api/portraits/women/68.jpg" alt="Supporter" />
              <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://randomuser.me/api/portraits/men/22.jpg" alt="Supporter" />
            </div>
            <span className="text-sm font-semibold text-gray-800">
              Join our 1,000+ Supporters
            </span>
          </div>
        </div>

        {/* Right Buttons */}
        <div className="w-full md:w-[400px] flex flex-col gap-4">
          <Link 
            href="/donate"
            className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-full bg-white/60 hover:bg-white/90 shadow-sm border border-white/50 backdrop-blur-md transition-colors group"
          >
            <CreditCard className="w-5 h-5 text-[#0B5DB7]" />
            <span className="font-bold text-gray-900 text-lg">One-Time Donation</span>
          </Link>

          <Link 
            href="/donate"
            className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-full bg-white/60 hover:bg-white/90 shadow-sm border border-white/50 backdrop-blur-md transition-colors group"
          >
            <CalendarHeart className="w-5 h-5 text-[#b7790b]" />
            <span className="font-bold text-gray-900 text-lg">Monthly Patron</span>
          </Link>

          <Link 
            href="/donate"
            className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-full bg-white/60 hover:bg-white/90 shadow-sm border border-white/50 backdrop-blur-md transition-colors group"
          >
            <Gift className="w-5 h-5 text-[#0096b7]" />
            <span className="font-bold text-gray-900 text-lg">Sponsor a Festival</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
