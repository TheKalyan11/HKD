"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = pathname === '/';

  // Menu items config with liquid glass dropdown items for About Us, Gallery, and Patrons Corner
  const navLinks = [
    { 
      name: 'About Us', 
      href: '/about', 
      hasDropdown: true,
      dropdownItems: [
        { name: 'About Us', href: '/about' },
        { name: 'Aspirations', href: '/aspirations' },
        { name: 'Governance', href: '/governance' }
      ]
    },
    { 
      name: 'Features', 
      href: '/features', 
      hasDropdown: false
    },
    { 
      name: 'Activities', 
      href: '/#initiatives', 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Gita Life Courses', href: '/gita-life-course' },
        { name: 'Bhagavad Gita Book Distribution', href: '/book-distribution' },
        { name: 'Volunteer with Us', href: '/volunteer' },
        { name: 'Become a Monk', href: '/become-a-monk' }
      ]
    },
    { 
      name: 'Gallery', 
      href: '/gallery', 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Daily Darshan', href: '/daily-darshan' },
        { name: 'Mandir Nirman', href: '/mandir-nirman' },
        { name: 'Latest Events', href: '/events' }
      ]
    },
    { name: 'Blogs', href: '/blog', hasDropdown: false },
    { name: 'Youth Programs', href: '/#youth', hasDropdown: false },
    { name: 'Donate', href: '/donate', hasDropdown: false },
  ];

  // Dynamic Class Resolvers
  const getTopbarClass = () => {
    return scrolled 
      ? 'h-0 opacity-0 pointer-events-none border-none py-0' 
      : 'h-14 sm:h-16 py-2 border-b border-saffron/20 bg-[#072149] text-white shadow';
  };

  return (
    <nav className="sticky top-0 left-0 w-full z-40 transition-all duration-250 ease-out bg-transparent">
      
      {/* ── Brutalist Call Button & Glowing Donate Button Styles (Uiverse.io inspired) ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Brutalist Call Button */
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

        /* Uiverse Glowing Blue Donate Button */
        .btn-donate {
          --clr-font-main: hsla(0 0% 20% / 100);
          --btn-bg-1: hsla(194 100% 69% / 1);
          --btn-bg-2: hsla(217 100% 56% / 1);
          --btn-bg-color: hsla(360 100% 100% / 1);
          --radii: 9999px; /* Pill layout to match previous style */
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 1.4rem;
          min-width: 110px;
          height: 42px;
          font-size: 0.875rem; /* 14px text-sm */
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: 0.8s;
          background-size: 280% auto;
          background-image: linear-gradient(
            325deg,
            var(--btn-bg-2) 0%,
            var(--btn-bg-1) 55%,
            var(--btn-bg-2) 90%
          );
          border: none;
          border-radius: var(--radii);
          color: var(--btn-bg-color);
          box-shadow:
            0px 0px 15px rgba(71, 184, 255, 0.4),
            0px 4px 4px -1px rgba(58, 125, 233, 0.2),
            inset 2px 2px 4px rgba(175, 230, 255, 0.4),
            inset -2px -2px 4px rgba(19, 95, 216, 0.3);
        }

        .btn-donate:hover {
          background-position: right top;
          transform: translateY(-1px);
          box-shadow:
            0px 0px 25px rgba(71, 184, 255, 0.6),
            0px 6px 8px -1px rgba(58, 125, 233, 0.25);
        }

        .btn-donate:is(:focus, :focus-visible, :active) {
          outline: none;
          box-shadow:
            0 0 0 3px var(--btn-bg-color),
            0 0 0 6px var(--btn-bg-2);
        }

        @media (prefers-reduced-motion: reduce) {
          .btn-donate {
            transition: linear;
          }
        }

        /* Beating Heart Button for Second Header */
        .btn-heart {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          padding: 6px 12px 6px 10px;
          box-shadow: rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
          background-color: #e8e8e8;
          border-color: #ffe2e2;
          border-style: solid;
          border-width: 4px;
          border-radius: 35px;
          font-size: 13px;
          cursor: pointer;
          font-weight: 900;
          color: rgb(134, 124, 124);
          font-family: monospace;
          transition: transform 400ms cubic-bezier(0.68, -0.55, 0.27, 2.5),
                      border-color 400ms ease-in-out,
                      background-color 400ms ease-in-out;
          word-spacing: -2px;
          text-decoration: none;
        }

        @keyframes movingBorders {
          0% { border-color: #fce4e4; }
          50% { border-color: #ffd8d8; }
          90% { border-color: #fce4e4; }
        }

        .btn-heart:hover {
          background-color: #eee;
          transform: scale(1.05);
          animation: movingBorders 3s infinite;
        }

        .btn-heart svg {
          margin-right: 6px;
          fill: rgb(255, 110, 110);
          transition: opacity 100ms ease-in-out;
        }

        @keyframes beatingHeart {
          0% { transform: scale(1); }
          15% { transform: scale(1.15); }
          30% { transform: scale(1); }
          45% { transform: scale(1.15); }
          60% { transform: scale(1); }
        }

        .btn-heart:hover .empty {
          opacity: 0;
        }

        .btn-heart:hover .filled {
          opacity: 1;
          animation: beatingHeart 1.2s infinite;
        }

        /* White Glass Link Transitions */
        .glass-nav-link {
          font-family: 'Finlandica Headline', sans-serif;
          color: #1f2937; /* gray-800 */
          font-size: 0.875rem;
          font-weight: 900;
          -webkit-text-stroke: 0.5px currentColor;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.375rem;
        }
        .bold-stroke {
          -webkit-text-stroke: 0.5px currentColor;
        }
        .glass-nav-link:hover {
          color: #0B5DB7; /* theme blue */
        }
        .glass-nav-link-active {
          color: #0B5DB7 !important;
          border-bottom: 2px solid #0B5DB7;
          padding-bottom: 2px;
        }
      ` }} />

      {/* 1. TOP HEADER LAYER (Deep Navy Blue #072149) */}
      <div className={`hidden xl:flex px-4 sm:px-8 items-center justify-between relative transition-all duration-250 ease-out overflow-hidden ${getTopbarClass()}`}>
        
        {/* Left Side: Left completely clean / empty */}
        <div className="flex items-center flex-shrink-0 w-[100px] sm:w-[150px]">
          {/* Kept empty to balance centered Srila Prabhupada portrait */}
        </div>

        {/* Center: Srila Prabhupada Portrait Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
          <img 
            src="/sp%20logo.png" 
            alt="Srila Prabhupada Portrait" 
            className="h-14 sm:h-[68px] w-auto object-contain hover:scale-105 transition-transform drop-shadow-md"
          />
        </div>

        {/* Right Side: Uiverse Brutalist Call Now & Donate buttons */}
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

          {/* Uiverse Glowing Blue/Sky-Blue Gradient Donate Button */}
          <Link 
            href="/donate" 
            className="btn-donate"
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

      {/* 2. NAVIGATION BAR LAYER (White Liquid Glass Style with Black Text) */}
      <div className={`transition-all duration-250 ease-out w-full ${
        scrolled 
          ? 'xl:max-w-[1300px] w-full xl:w-[95%] mx-auto xl:mt-3 xl:rounded-full bg-white/90 backdrop-blur-lg border-b xl:border border-gray-200/50 shadow-2xl py-2 px-4 xl:px-6 shadow-gray-200/10' 
          : 'w-full bg-white/80 backdrop-blur-md border-b border-gray-200/40 py-2.5 shadow-md'
      }`}>
        <div className={scrolled ? "px-4 sm:px-6 lg:px-8" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>
          <div className="flex items-center justify-between gap-8 w-full">
            
            {/* Replaced logo with logo-dehradun.jpg back again */}
            <Link href="/" className="flex-shrink-0">
              <img 
                src="/logo-dehradun.jpg" 
                alt="Hare Krishna Dehradun Movement Logo" 
                className="h-12 md:h-16 w-auto object-contain rounded border border-gray-200/30 shadow-sm transition-transform hover:scale-102"
              />
            </Link>

            {/* Desktop Navigation Links - Centered in One Clean Line with black/gray-800 text */}
            <div className="hidden xl:flex items-center gap-5 lg:gap-6.5 2xl:gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const hasDropdown = link.dropdownItems && link.dropdownItems.length > 0;
                const isHovered = hoveredLink === link.name;
                
                if (link.name === 'Donate') {
                  return (
                    <div key={link.name} className="relative py-2 group flex items-center">
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="btn-heart group relative overflow-hidden ml-2"
                      >
                        <div className="relative flex items-center justify-center w-[20px] h-[20px] mr-[4px]">
                          <svg className="empty absolute inset-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20}>
                            <path fill="none" d="M0 0H24V24H0z" />
                            <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2zm-3.566 15.604c.881-.556 1.676-1.109 2.42-1.701C18.335 14.533 20 11.943 20 9c0-2.36-1.537-4-3.5-4-1.076 0-2.24.57-3.086 1.414L12 7.828l-1.414-1.414C9.74 5.57 8.576 5 7.5 5 5.56 5 4 6.656 4 9c0 2.944 1.666 5.533 4.645 7.903.745.592 1.54 1.145 2.421 1.7.299.189.595.37.934.572.339-.202.635-.383.934-.571z" />
                          </svg>
                          <svg className="filled absolute inset-0 opacity-0 transition-opacity" height={20} width={20} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H24V24H0z" fill="none" />
                            <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z" />
                          </svg>
                        </div>
                        Donate
                      </Link>
                    </div>
                  );
                }

                return (
                  <div 
                    key={link.name} 
                    className="relative py-2 group flex items-center"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`glass-nav-link ${isActive ? 'glass-nav-link-active' : ''}`}
                    >
                      <span>{link.name}</span>
                      {hasDropdown && (
                        <ChevronDown className="w-3.5 h-3.5 text-gray-500 transition-transform duration-200 group-hover:rotate-180 group-hover:text-[#0B5DB7]" />
                      )}
                    </Link>
                    
                    {hasDropdown && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[400px] transition-all duration-300 z-50 opacity-0 invisible translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto">
                        {/* Inner card with glass styling and arrow */}
                        <div className="bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-[0_20px_50px_rgba(11,93,183,0.15)] p-2 relative">
                          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-gray-200/50 rotate-45 pointer-events-none" />
                          
                          <div className="relative space-y-1 z-10">
                            {link.dropdownItems?.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => {
                                  setIsOpen(false);
                                }}
                                className="flex items-start gap-3 px-4 py-3 text-left text-[13px] font-black bold-stroke uppercase tracking-wider text-gray-800 hover:text-[#0B5DB7] hover:bg-[#0B5DB7]/5 rounded-xl transition-all duration-200 whitespace-normal leading-relaxed group/item"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0B5DB7]/40 group-hover/item:bg-[#0B5DB7] mt-1.5 transition-colors flex-shrink-0" />
                                <span>{item.name}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Menu Action button spacer */}
            <div className="xl:hidden flex items-center gap-3">
              <Link 
                href="/donate" 
                className="btn-donate !h-8 !min-w-[70px] !text-[11px] !px-3"
              >
                Donate
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-800 hover:text-[#0B5DB7] p-1 focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer menu */}
        {isOpen && (
          <div className="xl:hidden bg-black/95 border-t border-white/10 px-4 pt-2 pb-6 space-y-1.5 shadow-xl max-h-[70vh] overflow-y-auto">
            <div className="flex gap-2 mb-4 mt-2">
               <a href="tel:+919876543210" className="flex-1 flex items-center justify-center gap-2 bg-[#0B5DB7] text-white py-2.5 rounded-lg text-sm font-bold">
                 <Phone className="w-4 h-4" /> Call Now
               </a>
            </div>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const hasDropdown = link.dropdownItems && link.dropdownItems.length > 0;
              const isDropdownOpen = openMobileDropdown === link.name;
              
              if (hasDropdown) {
                return (
                  <div key={link.name} className="space-y-1">
                    <button
                      onClick={() => setOpenMobileDropdown(isDropdownOpen ? null : link.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-base font-black bold-stroke uppercase tracking-wider transition-colors text-white hover:bg-white/5 hover:text-saffron`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-saffron' : ''}`} />
                    </button>
                    
                    {/* Collapsible Accordion content */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isDropdownOpen ? 'max-h-[300px] opacity-100 py-1' : 'max-h-0 opacity-0'}`}>
                      <div className="pl-4 space-y-1 border-l-2 border-white/10 ml-3">
                        {link.dropdownItems?.map((subLink) => (
                          <Link
                            key={subLink.name}
                            href={subLink.href}
                            onClick={() => {
                              setIsOpen(false);
                              setOpenMobileDropdown(null);
                            }}
                            className="block px-3 py-2 text-sm font-black bold-stroke text-gray-300 hover:text-saffron transition-colors tracking-wide whitespace-normal leading-tight"
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setIsOpen(false);
                    setOpenMobileDropdown(null);
                  }}
                  className={`block px-3 py-2 rounded-lg text-base font-black bold-stroke uppercase tracking-wider transition-colors ${
                    isActive 
                      ? 'bg-saffron/20 text-saffron-light' 
                      : 'text-white hover:bg-white/5 hover:text-saffron'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>

    </nav>
  );
};
