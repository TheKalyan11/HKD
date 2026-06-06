"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, X, Heart, Users, Leaf, ChevronRight, ShieldCheck, HandHeart, Sparkles } from 'lucide-react';

const LotusIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s-3-3.5-3-7c0-2 1.5-3.5 3-3.5s3 1.5 3 3.5c0 3.5-3 7-3 7z" />
    <path d="M12 22s-6-2-6-6c0-2.5 2-4.5 4.5-4.5.5 0 1 0 1.5.5" />
    <path d="M12 22s6-2 6-6c0-2.5-2-4.5-4.5-4.5-.5 0-1 0-1.5.5" />
    <path d="M12 22s-7.5 1-7.5-3c0-3 3-5 5-5 .5 0 1 0 1.5.5" />
    <path d="M12 22s7.5 1 7.5-3c0-3-3-5-5-5-.5 0-1 0-1.5.5" />
  </svg>
);

const AnnadaanIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4M12 2c1-1 3.5.5 3.5 1.5S13 6 12 6M12 2c-1-1-3.5.5-3.5 1.5S11 6 12 6M3 12h18M3 12c0 4.4 3.6 8 8 8s8-3.6 8-8H3z" />
  </svg>
);

const CowIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 8c-2 1-3 3-2 5s2 1 3 0c1-2 0-4-1-5z" />
    <path d="M19 8c2 1 3 3 2 5s-2 1-3 0c-1-2 0-4 1-5z" />
    <path d="M7 6c-1-2-1-4 1-4s2 2 2 4" />
    <path d="M17 6c1-2 1-4-1-4s-2 2-2 4" />
    <path d="M7 6h10v6c0 5-2 10-5 10s-5-5-5-10V6z" />
    <path d="M8 15h8c1 0 2 1 2 2v1c0 2-2 4-6 4s-6-2-6-4v-1c0-1 1-2 2-2z" />
    <circle cx="9" cy="11" r="1" fill="currentColor" />
    <circle cx="15" cy="11" r="1" fill="currentColor" />
    <path d="M10 18h.01" strokeWidth="2" />
    <path d="M14 18h.01" strokeWidth="2" />
  </svg>
);

const TempleIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3L2 10h20L12 3z" />
    <path d="M4 10v10h16V10M12 10v10" />
    <path d="M9 20v-5a3 3 0 016 0v5" />
  </svg>
);

const OutreachIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87" />
    <path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
);

export default function VolunteerPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [areaOfInterest, setAreaOfInterest] = useState('Temple Services & Maintenance');
  const [msg, setMsg] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setErrorMsg('Please fill out name, email, and phone.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
      await axios.post(`${backendUrl}/api/cms/leads`, {
        name,
        email,
        phone,
        interestType: 'volunteer_registration',
        targetId: areaOfInterest,
        message: msg,
      });

      setIsLoading(false);
      setSuccess(true);
      setShowPopup(true);
      
      setName('');
      setEmail('');
      setPhone('');
      setMsg('');
    } catch (err) {
      console.error('Volunteer inquiry submission failed:', err);
      setErrorMsg('Failed to submit application. Try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#fcfaf8] min-h-screen font-sans pb-24 overflow-hidden relative">
      
      {/* Dynamic Ambient Background Orbs */}
      <div className="absolute top-0 left-[-10%] w-[50%] h-[500px] bg-orange-300/20 blur-[120px] rounded-full pointer-events-none animate-pulse-slow mix-blend-multiply" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[600px] bg-yellow-300/20 blur-[120px] rounded-full pointer-events-none animate-pulse-slow mix-blend-multiply delay-1000" />
      <div className="absolute top-[40%] left-[20%] w-[30%] h-[400px] bg-blue-200/20 blur-[100px] rounded-full pointer-events-none mix-blend-multiply" />

      {/* Global Animation Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        
        .glass-card-premium {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 8px 32px 0 rgba(234, 88, 12, 0.05);
        }

        .continue-application {
          --color: #fff;
          --background: #404660;
          --background-hover: #3A4059;
          --background-left: #2B3044;
          --folder: #F3E9CB;
          --folder-inner: #BEB393;
          --paper: #FFFFFF;
          --paper-lines: #BBC1E1;
          --paper-behind: #E1E6F9;
          --pencil-cap: #fff;
          --pencil-top: #275EFE;
          --pencil-middle: #fff;
          --pencil-bottom: #5C86FF;
          --shadow: rgba(13, 15, 25, .2);
          border: none;
          outline: none;
          cursor: pointer;
          position: relative;
          border-radius: 5px;
          font-size: 14px;
          font-weight: 500;
          line-height: 19px;
          -webkit-appearance: none;
          -webkit-tap-highlight-color: transparent;
          padding: 17px 29px 17px 69px;
          transition: background 0.3s;
          color: var(--color);
          background: var(--bg, var(--background));
          width: 100%;
        }

        .continue-application > div {
          top: 0;
          left: 0;
          bottom: 0;
          width: 53px;
          position: absolute;
          overflow: hidden;
          border-radius: 5px 0 0 5px;
          background: var(--background-left);
        }

        .continue-application > div .folder {
          width: 23px;
          height: 27px;
          position: absolute;
          left: 15px;
          top: 13px;
        }

        .continue-application > div .folder .top {
          left: 0;
          top: 0;
          z-index: 2;
          position: absolute;
          transform: translateX(var(--fx, 0));
          transition: transform 0.4s ease var(--fd, 0.3s);
        }

        .continue-application > div .folder .top svg {
          width: 24px;
          height: 27px;
          display: block;
          fill: var(--folder);
          transform-origin: 0 50%;
          transition: transform 0.3s ease var(--fds, 0.45s);
          transform: perspective(120px) rotateY(var(--fr, 0deg));
        }

        .continue-application > div .folder:before, .continue-application > div .folder:after,
        .continue-application > div .folder .paper {
          content: "";
          position: absolute;
          left: var(--l, 0);
          top: var(--t, 0);
          width: var(--w, 100%);
          height: var(--h, 100%);
          border-radius: 1px;
          background: var(--b, var(--folder-inner));
        }

        .continue-application > div .folder:before {
          box-shadow: 0 1.5px 3px var(--shadow), 0 2.5px 5px var(--shadow), 0 3.5px 7px var(--shadow);
          transform: translateX(var(--fx, 0));
          transition: transform 0.4s ease var(--fd, 0.3s);
        }

        .continue-application > div .folder:after,
        .continue-application > div .folder .paper {
          --l: 1px;
          --t: 1px;
          --w: 21px;
          --h: 25px;
          --b: var(--paper-behind);
        }

        .continue-application > div .folder:after {
          transform: translate(var(--pbx, 0), var(--pby, 0));
          transition: transform 0.4s ease var(--pbd, 0s);
        }

        .continue-application > div .folder .paper {
          z-index: 1;
          --b: var(--paper);
        }

        .continue-application > div .folder .paper:before, .continue-application > div .folder .paper:after {
          content: "";
          width: var(--wp, 14px);
          height: 2px;
          border-radius: 1px;
          transform: scaleY(0.5);
          left: 3px;
          top: var(--tp, 3px);
          position: absolute;
          background: var(--paper-lines);
          box-shadow: 0 12px 0 0 var(--paper-lines), 0 24px 0 0 var(--paper-lines);
        }

        .continue-application > div .folder .paper:after {
          --tp: 6px;
          --wp: 10px;
        }

        .continue-application > div .pencil {
          height: 2px;
          width: 3px;
          border-radius: 1px 1px 0 0;
          top: 8px;
          left: 105%;
          position: absolute;
          z-index: 3;
          transform-origin: 50% 19px;
          background: var(--pencil-cap);
          transform: translateX(var(--pex, 0)) rotate(35deg);
          transition: transform 0.4s ease var(--pbd, 0s);
        }

        .continue-application > div .pencil:before, .continue-application > div .pencil:after {
          content: "";
          position: absolute;
          display: block;
          background: var(--b, linear-gradient(var(--pencil-top) 55%, var(--pencil-middle) 55.1%, var(--pencil-middle) 60%, var(--pencil-bottom) 60.1%));
          width: var(--w, 5px);
          height: var(--h, 20px);
          border-radius: var(--br, 2px 2px 0 0);
          top: var(--t, 2px);
          left: var(--l, -1px);
        }

        .continue-application > div .pencil:before {
          -webkit-clip-path: polygon(0 5%, 5px 5%, 5px 17px, 50% 20px, 0 17px);
          clip-path: polygon(0 5%, 5px 5%, 5px 17px, 50% 20px, 0 17px);
        }

        .continue-application > div .pencil:after {
          --b: none;
          --w: 3px;
          --h: 6px;
          --br: 0 2px 1px 0;
          --t: 3px;
          --l: 3px;
          border-top: 1px solid var(--pencil-top);
          border-right: 1px solid var(--pencil-top);
        }

        .continue-application:before, .continue-application:after {
          content: "";
          position: absolute;
          width: 10px;
          height: 2px;
          border-radius: 1px;
          background: var(--color);
          transform-origin: 9px 1px;
          transform: translateX(var(--cx, 0)) scale(0.5) rotate(var(--r, -45deg));
          top: 26px;
          right: 16px;
          transition: transform 0.3s;
        }

        .continue-application:after {
          --r: 45deg;
        }

        .continue-application:hover {
          --cx: 2px;
          --bg: var(--background-hover);
          --fx: -40px;
          --fr: -60deg;
          --fd: .15s;
          --fds: 0s;
          --pbx: 3px;
          --pby: -3px;
          --pbd: .15s;
          --pex: -24px;
        }

        .volunteer-card {
          position: relative;
          width: 100%;
          height: 18em;
          box-shadow: 0px 1px 13px rgba(0,0,0,0.1);
          cursor: pointer;
          transition: all 120ms;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          padding: 0.5em;
          padding-bottom: 3.4em;
          border-radius: 8px;
          overflow: hidden;
        }

        .volunteer-card::after {
          content: "Join Now";
          padding-top: 1.25em;
          padding-left: 1.25em;
          position: absolute;
          left: 0;
          bottom: -60px;
          background: #ea580c;
          color: #fff;
          height: 2.5em;
          width: 100%;
          transition: all 80ms;
          font-weight: 600;
          text-transform: uppercase;
          opacity: 0;
        }

        .volunteer-card .title {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 1.1em;
          position: absolute;
          left: 0.625em;
          bottom: 1.875em;
          font-weight: 700;
          color: #000;
        }

        .volunteer-card .price {
          font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
          font-size: 0.9em;
          position: absolute;
          left: 0.625em;
          bottom: 0.625em;
          color: #ea580c;
        }

        .volunteer-card:hover::after {
          bottom: 0;
          opacity: 1;
        }

        .volunteer-card:active {
          transform: scale(0.98);
        }

        .volunteer-card:active::after {
          content: "Selected !";
          height: 3.125em;
        }

        .volunteer-card .text {
          font-size: 0.85em;
          color: #4b5563;
          text-align: center;
          padding: 0 1em;
          margin-top: 1em;
          font-weight: 500;
        }

        .volunteer-card .image {
          background: rgb(250, 250, 250);
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
        }
      `}} />

      {/* Hero Section */}
      <section className={`relative pt-6 pb-16 overflow-hidden flex items-center justify-center transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        {/* Video Background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover scale-105" 
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_101827_abebfeec-f243-466b-b494-7f6814c0fbbf.mp4" type="video/mp4" />
        </video>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 w-full">
          <div className="flex flex-col items-center">
            
            {/* The provided image */}
            <div className={`relative w-full max-w-5xl rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-[4px] border-white/20 bg-black/40 backdrop-blur-sm group transition-transform duration-1000 ${mounted ? 'translate-y-0' : 'translate-y-10'}`}>
              {/* Image */}
              <img 
                src="/vwu.png" 
                alt="Volunteer With Us" 
                className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700 ease-in-out" 
              />
              
              {/* Subtle inner shadow overlay */}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2.2rem] pointer-events-none" />
            </div>

          </div>
        </div>
      </section>

      {/* Scrolling Banner */}
      <div className="relative w-full bg-white overflow-hidden py-4 shadow-sm z-20 border-y border-gray-100">
        <div className="flex whitespace-nowrap marquee-container">
          {Array(4).fill(0).map((_, i) => (
            <span key={i} className="text-gray-700 font-sans font-medium text-sm px-2 uppercase tracking-[0.2em] flex items-center">
              <span className="mx-8 text-gray-300 text-lg">○</span> VOLUNTEER WITH US
              <span className="mx-8 text-gray-300 text-lg">○</span> MAKE A DIFFERENCE
              <span className="mx-8 text-gray-300 text-lg">○</span> SERVE THE COMMUNITY
              <span className="mx-8 text-gray-300 text-lg">○</span> SPREAD HAPPINESS
              <span className="mx-8 text-gray-300 text-lg">○</span> FIND INNER PEACE
            </span>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html:`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-container {
          animation: marquee 40s linear infinite;
          width: max-content;
        }
      `}} />

      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative z-10">
        
        {/* Left Side: Information */}
        <div className="lg:col-span-7 relative">
          
          {/* Background Watermark Lotus */}
          <div className="absolute top-10 right-0 opacity-[0.03] pointer-events-none text-orange-600 scale-[4] translate-x-10 translate-y-20 animate-pulse-slow">
            <LotusIcon className="w-48 h-48" />
          </div>

          <div className="relative z-10 space-y-10">
            
            {/* Header */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-white rounded-full border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                <Sparkles className="w-4 h-4 text-[#ea580c] animate-pulse" />
                <span className="text-[#ea580c] text-[10px] font-black tracking-[0.2em] uppercase">Seva Opportunities</span>
              </div>
              
              <div className="mt-8 space-y-2">
                <h2 className="text-4xl sm:text-5xl md:text-[4rem] font-serif font-black text-gray-900 leading-[1.1] tracking-tight">
                  Why Volunteer
                </h2>
                <div className="inline-block relative">
                  <h2 className="text-4xl sm:text-5xl md:text-[4rem] font-serif font-black bg-clip-text text-transparent bg-gradient-to-r from-[#ea580c] to-[#f59e0b] italic leading-[1.1] pr-6 pb-2">
                    With Us?
                  </h2>
                  <div className="absolute bottom-0 left-0 h-1.5 w-[70%] bg-gradient-to-r from-[#ea580c] to-transparent rounded-full"></div>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <p className="text-gray-600 leading-relaxed text-[15px] sm:text-base font-medium max-w-xl">
                  Volunteering at <strong className="text-gray-900">Hare Krishna Movement Dehradun</strong> is a wonderful way to connect with spiritually minded individuals, develop new skills, and contribute to meaningful projects that uplift society.
                </p>
                <p className="text-gray-600 leading-relaxed text-[15px] sm:text-base font-medium max-w-xl">
                  Whether you have a few hours a week or want to dedicate yourself full-time, there is a place for you here.
                </p>
              </div>
            </div>

            {/* 3 Premium Glass Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              
              {/* Card 1 */}
              <div className="volunteer-card animate-fade-in-up delay-100" onClick={() => { document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' }); setAreaOfInterest('Other'); }}>
                <div className="image">
                  <Heart className="w-12 h-12 text-[#ea580c]" />
                  <span className="text">Engage in Seva (selfless service) which is considered the highest form of spiritual practice in Vedic culture.</span>
                </div>
                <span className="title">Spiritual Growth</span>
                <span className="price">01</span>
              </div>

              {/* Card 2 */}
              <div className="volunteer-card animate-fade-in-up delay-200" onClick={() => { document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' }); setAreaOfInterest('Other'); }}>
                <div className="image">
                  <Users className="w-12 h-12 text-[#3b82f6]" />
                  <span className="text">Become part of a loving, supportive community of devotees and make lifelong friendships.</span>
                </div>
                <span className="title">Community</span>
                <span className="price">02</span>
              </div>

              {/* Card 3 */}
              <div className="volunteer-card animate-fade-in-up delay-300" onClick={() => { document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' }); setAreaOfInterest('Other'); }}>
                <div className="image">
                  <Leaf className="w-12 h-12 text-[#22c55e]" />
                  <span className="text">Help with food distribution (Annadaan), cow protection, temple maintenance, and outreach programs.</span>
                </div>
                <span className="title">Make an Impact</span>
                <span className="price">03</span>
              </div>
            </div>



          </div>
        </div>

        {/* Right Side: Ultra Premium Form */}
        <div className="lg:col-span-5 relative animate-fade-in-up delay-200">
          <div className="bg-white/80 backdrop-blur-3xl rounded-[2.5rem] p-8 sm:p-10 shadow-[0_30px_60px_rgba(234,88,12,0.08)] border border-white sticky top-28 animate-float">
            
            {/* Form Glow Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full blur-[80px] opacity-50 pointer-events-none" />

            <div className="text-center space-y-2 mb-10 relative z-10">
              <div className="inline-flex flex-col items-center">
                <span className="text-[#ea580c] text-[11px] font-black tracking-[0.25em] uppercase">Ready To Serve?</span>
                <div className="w-6 h-[3px] bg-gradient-to-r from-[#ea580c] to-amber-400 rounded-full mt-2"></div>
              </div>
              <h3 className="text-4xl font-serif font-black text-gray-900 mt-3 tracking-tight">Join Our Team</h3>
            </div>
            
            <form onSubmit={handleRegister} className="space-y-5 relative z-10">
              {errorMsg && (
                <div className="bg-red-50 text-red-600 rounded-2xl p-4 text-sm font-bold border border-red-100 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  {errorMsg}
                </div>
              )}

              <div className="group relative">
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50/50 hover:bg-white border-2 border-transparent focus:border-orange-500 rounded-2xl px-5 py-4 text-[15px] text-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-500/10 placeholder:text-gray-400 font-medium transition-all shadow-sm focus:shadow-md"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="email"
                  required
                  placeholder="Email *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50/50 hover:bg-white border-2 border-transparent focus:border-orange-500 rounded-2xl px-5 py-4 text-[15px] text-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-500/10 placeholder:text-gray-400 font-medium transition-all shadow-sm focus:shadow-md"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-gray-50/50 hover:bg-white border-2 border-transparent focus:border-orange-500 rounded-2xl px-5 py-4 text-[15px] text-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-500/10 placeholder:text-gray-400 font-medium transition-all shadow-sm focus:shadow-md"
                />
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Area of Interest</label>
                <div className="relative group">
                  <select
                    value={areaOfInterest}
                    onChange={(e) => setAreaOfInterest(e.target.value)}
                    className="w-full bg-gray-50/50 hover:bg-white border-2 border-transparent focus:border-orange-500 rounded-2xl px-5 py-4 text-[15px] text-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-500/10 font-medium appearance-none cursor-pointer transition-all shadow-sm focus:shadow-md"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ea580c' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 1.25rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                  >
                    <option value="Temple Services & Maintenance">Temple Services & Maintenance</option>
                    <option value="Food Distribution (Annadaan)">Food Distribution (Annadaan)</option>
                    <option value="Cow Protection (Gau Seva)">Cow Protection (Gau Seva)</option>
                    <option value="Events & Festivals">Events & Festivals Coordination</option>
                    <option value="IT & Media">IT, Social Media & Design</option>
                    <option value="Other">Other Skills</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <textarea
                  placeholder="Tell us about your background, skills, and availability..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className="w-full bg-gray-50/50 hover:bg-white border-2 border-transparent focus:border-orange-500 rounded-2xl px-5 py-4 text-[15px] text-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-500/10 placeholder:text-gray-400 font-medium resize-none mt-1 transition-all shadow-sm focus:shadow-md"
                  rows={4}
                />
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="continue-application mt-6"
              >
                <div>
                  <div className="pencil" />
                  <div className="folder">
                    <div className="top">
                      <svg viewBox="0 0 24 27">
                        <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z" />
                      </svg>
                    </div>
                    <div className="paper" />
                  </div>
                </div>
                {isLoading ? 'Submitting...' : 'Submit Application'}
              </button>

              <div className="flex items-center justify-center gap-2 pt-5 text-gray-400 opacity-80">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-widest">Your information is secure</span>
              </div>
            </form>
          </div>
        </div>

      </div>

      {/* Premium Full-Screen Bottom Wide Banner */}
      <div className="w-full mt-24 bg-white/60 backdrop-blur-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.02)] border-t border-white relative z-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12 relative overflow-hidden flex flex-col xl:flex-row justify-center items-center gap-12 xl:gap-24 animate-fade-in-up">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-orange-50/50 to-transparent pointer-events-none" />
          
          <div className="flex items-start gap-5 xl:border-r border-gray-200/60 pb-6 xl:pb-0 xl:pr-12 shrink-0 w-full xl:w-auto relative z-10">
            <div className="w-20 h-20 rounded-[1.25rem] bg-gradient-to-br from-orange-400 to-orange-600 text-white flex items-center justify-center shrink-0 shadow-xl shadow-orange-500/30">
              <HandHeart className="w-10 h-10" />
            </div>
            <div>
              <h4 className="font-black text-gray-900 text-2xl mb-2 tracking-wide whitespace-nowrap">Serve. Grow. Inspire.</h4>
              <p className="text-sm text-gray-500 max-w-[320px] leading-relaxed font-medium">Your time and effort can bring smiles, hope, and spiritual upliftment to countless lives.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-16 w-full relative z-10">
            <div className="flex flex-col items-center text-center gap-3 group cursor-default">
              <div className="p-5 rounded-full bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300 shadow-sm border border-orange-100/50">
                <AnnadaanIcon className="w-10 h-10" />
              </div>
              <div>
                <h5 className="font-bold text-sm uppercase tracking-wider text-gray-900">Annadaan</h5>
                <p className="text-xs text-gray-400 mt-1 whitespace-nowrap">Feed the needy</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-3 group cursor-default">
              <div className="p-5 rounded-full bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300 shadow-sm border border-green-100/50">
                <CowIcon className="w-10 h-10" />
              </div>
              <div>
                <h5 className="font-bold text-sm uppercase tracking-wider text-gray-900">Gau Seva</h5>
                <p className="text-xs text-gray-400 mt-1 whitespace-nowrap">Serve & protect</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-3 group cursor-default">
              <div className="p-5 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm border border-blue-100/50">
                <TempleIcon className="w-10 h-10" />
              </div>
              <div>
                <h5 className="font-bold text-sm uppercase tracking-wider text-gray-900">Temple</h5>
                <p className="text-xs text-gray-400 mt-1 whitespace-nowrap">Maintain & beautify</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-3 group cursor-default">
              <div className="p-5 rounded-full bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300 shadow-sm border border-orange-100/50">
                <OutreachIcon className="w-10 h-10" />
              </div>
              <div>
                <h5 className="font-bold text-sm uppercase tracking-wider text-gray-900">Outreach</h5>
                <p className="text-xs text-gray-400 mt-1 whitespace-nowrap">Inspire & uplift</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Success Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-10 shadow-[0_30px_60px_rgba(0,0,0,0.2)] border border-white/50 relative text-center space-y-6 overflow-hidden animate-fade-in-up">
            
            <div className="absolute top-0 right-0 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-50" />

            <button
              onClick={() => { setShowPopup(false); setSuccess(false); }}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center text-white mx-auto shadow-[0_10px_25px_rgba(34,197,94,0.4)]">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>

              <div className="mt-6 space-y-2">
                <h3 className="text-3xl font-serif font-black text-gray-900">Thank You!</h3>
                <p className="text-[15px] text-gray-500 font-medium max-w-[300px] mx-auto leading-relaxed">
                  Your application has been received. We appreciate your desire to serve and will be in touch soon!
                </p>
              </div>

              <button
                onClick={() => { setShowPopup(false); setSuccess(false); }}
                className="mt-8 bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-2xl font-bold text-[15px] transition-all w-full shadow-lg active:scale-95"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
