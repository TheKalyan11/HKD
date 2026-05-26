"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = pathname === '/';

  // Menu items config
  const navLinks = [
    { name: 'About Us', href: '/#about', hasDropdown: true },
    { name: 'Features', href: '/#features', hasDropdown: false },
    { name: 'Social Initiatives', href: '/#initiatives', hasDropdown: false },
    { name: 'Gallery', href: '/gallery', hasDropdown: true },
    { name: 'Patrons Corner', href: '/#patrons', hasDropdown: true },
    { name: 'Blogs', href: '/blog', hasDropdown: false },
    { name: 'Yatras', href: '/events', hasDropdown: false },
    { name: 'Youth Programs', href: '/#youth', hasDropdown: false },
    { name: 'Donate', href: '/donate', hasDropdown: false },
  ];

  // Dynamic Class Resolvers
  const getTopbarClass = () => {
    return scrolled 
      ? 'h-0 opacity-0 pointer-events-none border-none py-0' 
      : 'h-14 sm:h-16 py-2 border-b border-white/20 bg-[#00a4ef] text-white shadow';
  };

  return (
    <nav className="relative w-full z-40 bg-[#050f20] shadow-xl">
      
      {/* ── Brutalist Call Button Styles (Uiverse.io inspired) ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .brutalist-button {
          display: flex;
          align-items: center;
          cursor: pointer;
          width: 145px;
          height: 42px;
          background-color: #000;
          color: #fff;
          text-decoration: none;
          font-family: Arial, sans-serif;
          font-weight: bold;
          border: 2px solid #fff;
          outline: 2px solid #000;
          box-shadow: 4px 4px 0 #eab308; /* Saffron gold shadow */
          transition: all 0.1s ease-out;
          padding: 0 10px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }

        .brutalist-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.8),
            transparent
          );
          z-index: 1;
          transition: none;
          opacity: 0;
        }

        @keyframes slide {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .brutalist-button:hover::before {
          opacity: 1;
          animation: slide 2s infinite;
        }

        .brutalist-button:hover {
          transform: translate(-3px, -3px);
          box-shadow: 6px 6px 0 #000;
          background-color: #000;
          color: #fff;
        }

        .brutalist-button:active {
          transform: translate(3px, 3px);
          box-shadow: 0px 0px 0 #eab308;
          background-color: #fff;
          color: #000;
          border-color: #000;
        }

        .ms-logo {
          width: 20px;
          height: 20px;
          margin-right: 8px;
          flex-shrink: 0;
          transition: transform 0.2s ease-out;
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brutalist-button:hover .ms-logo {
          transform: rotate(-15deg) scale(1.1);
        }

        .brutalist-button:active .ms-logo {
          transform: rotate(15deg) scale(0.9);
        }

        .button-text {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
          transition: transform 0.2s ease-out;
          position: relative;
          z-index: 1;
        }

        .brutalist-button:hover .button-text {
          transform: skew(-5deg);
        }

        .brutalist-button:active .button-text {
          transform: skew(5deg);
        }

        .button-text span:first-child {
          font-size: 8px;
          text-transform: uppercase;
          opacity: 0.85;
          letter-spacing: 0.5px;
        }

        .button-text span:last-child {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      ` }} />

      {/* 1. TOP HEADER LAYER (Sky Blue Background) */}
      <div className={`px-4 sm:px-8 flex items-center justify-between relative transition-all duration-250 ease-out overflow-hidden ${getTopbarClass()}`}>
        
        {/* Left Side: Left completely clean / empty */}
        <div className="flex items-center flex-shrink-0 w-[100px] sm:w-[150px]">
          {/* Kept empty to balance centered Srila Prabhupada portrait */}
        </div>

        {/* Center: Srila Prabhupada Portrait Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
          <img 
            src="/prabhupada.png" 
            alt="Srila Prabhupada Portrait" 
            className="h-14 sm:h-16 w-auto object-contain hover:scale-105 transition-transform"
          />
        </div>

        {/* Right Side: Uiverse Brutalist Call Now & Donate pill buttons */}
        <div className="flex items-center gap-4 py-2">
          
          {/* Brutalist Call Button from Uiverse with Call Symbol */}
          <a 
            href="tel:+919876543210" 
            className="brutalist-button hidden sm:flex"
            title="Call Us"
          >
            <div className="ms-logo text-white">
              <Phone className="w-[18px] h-[18px] fill-white text-white" />
            </div>
            <div className="button-text">
              <span>Contact Us</span>
              <span>Call Now</span>
            </div>
          </a>

          {/* Fallback simple call button for tiny mobile viewports */}
          <a 
            href="tel:+919876543210" 
            className="sm:hidden flex items-center justify-center bg-black border border-white rounded-md w-10 h-10 shadow active:scale-95"
            title="Call Us"
          >
            <Phone className="w-4 h-4 text-white fill-white" />
          </a>

          {/* Deep Red Donate Rounded Button */}
          <Link 
            href="/donate" 
            className="bg-[#9c0404] hover:bg-[#c00606] text-white font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-lg transition-all active:scale-95"
          >
            Donate
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden text-white hover:text-saffron p-1 focus:outline-none ml-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* 2. NAVIGATION BAR LAYER */}
      <div className={`transition-all duration-250 ease-out xl:block ${isOpen ? 'block' : 'hidden'} ${
        scrolled 
          ? 'max-w-[1300px] w-[95%] mx-auto mt-3 rounded-full bg-[#050f20]/90 backdrop-blur-md border border-white/10 shadow-2xl py-2 px-6 shadow-blue-900/10' 
          : 'w-full bg-[#050f20] border-b border-saffron/10 py-2.5'
      }`}>
        <div className={scrolled ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>
          <div className="flex items-center justify-between xl:justify-center gap-8">
            
            {/* Bigger Dehradun Logo - Acts directly as the Home button */}
            <Link href="/" className="flex-shrink-0">
              <img 
                src="/fh.png" 
                alt="Hare Krishna Dehradun Movement Logo" 
                className="h-12 md:h-16 w-auto object-contain rounded border border-white/10 shadow-sm transition-transform hover:scale-102"
              />
            </Link>

            {/* Desktop Navigation Links - Centered in One Clean Line with white text */}
            <div className="hidden xl:flex items-center gap-5 lg:gap-6.5 2xl:gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-white text-xs font-black uppercase tracking-wider transition-all hover:text-saffron-light flex items-center gap-1.5 ${
                      isActive ? 'text-saffron-light border-b-2 border-saffron-light pb-0.5' : ''
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.hasDropdown && (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Action button spacer */}
            <div className="xl:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-saffron p-1 focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer menu */}
        {isOpen && (
          <div className="xl:hidden bg-black/90 border-t border-white/10 px-4 pt-2 pb-6 space-y-1.5 shadow-xl max-h-[70vh] overflow-y-auto">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-colors ${
                    isActive 
                      ? 'bg-saffron/20 text-saffron-light' 
                      : 'text-white hover:bg-white/5 hover:text-saffron'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{link.name}</span>
                    {link.hasDropdown && <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

    </nav>
  );
};
