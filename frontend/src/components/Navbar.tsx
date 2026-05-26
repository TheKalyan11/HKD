"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Heart, ChevronDown } from 'lucide-react';
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

  // Menu items config (Home is mapped directly to the logo click)
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
    return 'bg-[#072149] border-b border-saffron/20 text-white shadow';
  };

  const getBottombarClass = () => {
    return 'bg-[#050f20] border-b border-saffron/10 py-2.5';
  };

  return (
    <nav className="relative w-full z-40 bg-[#050f20] shadow-xl">
      
      {/* 1. TOP HEADER LAYER */}
      <div className={`px-4 sm:px-8 flex items-center justify-between relative transition-all duration-250 ease-out overflow-hidden ${
        scrolled 
          ? 'h-0 opacity-0 pointer-events-none border-none py-0' 
          : 'h-14 sm:h-16 py-2 border-b border-saffron/20 bg-[#072149] text-white shadow'
      }`}>
        
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

        {/* Right Side: Call & Donate pill buttons */}
        <div className="flex items-center gap-3 py-2">
          {/* Custom Phone Pill Call Button (Metallic White) */}
          <a 
            href="tel:+919876543210" 
            className="flex items-center justify-center bg-gradient-to-b from-white to-slate-100 hover:from-slate-50 hover:to-slate-200 text-charcoal-900 border border-slate-200 rounded-full w-10 h-10 sm:w-11 sm:h-11 shadow-md transition-all active:scale-95 group"
            title="Call Us"
          >
            <Phone className="w-4.5 h-4.5 text-[#072149] fill-[#072149]/15 transition-transform group-hover:rotate-12" />
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
                src="/logo-dehradun.jpg" 
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
