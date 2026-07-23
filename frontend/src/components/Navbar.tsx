"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, ChevronDown, ChevronLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (
    pathname &&
    (pathname.startsWith('/youth') ||
      pathname.startsWith('/happiness-workshops') ||
      pathname.startsWith('/self-empowerment-workshops') ||
      pathname.startsWith('/life-coach') ||
      pathname.startsWith('/blog') ||
      pathname.startsWith('/blogs_youthprogram') ||
      pathname.startsWith('/blogs-youth-program') ||
      pathname.startsWith('/gallery'))
  ) {
    return null;
  }

  const isHome = pathname === '/';
  const isFestivalPage = pathname && (pathname.startsWith('/festivals') || pathname === '/panihati-chida-dahi-utsav');

  // Menu items config with liquid glass dropdown items for About Us, Gallery, and Patrons Corner
  const navLinks = [
    { 
      name: 'About Us', 
      href: '#', 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Our Mission', href: '/mission' },
        { name: 'Objectives', href: '/objectives' },
        { name: 'Governance', href: '/governance' }
      ]
    },

    { 
      name: 'Activities', 
      href: '/#initiatives', 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Gita Life Courses', href: '/gita-life-course' },
        { name: 'Bhagavad Gita Book Distribution', href: '/book-distribution' },
        { name: 'Volunteer with Us', href: '/volunteer' },
        { name: 'Challenge Yourself', href: '/become-a-monk' }
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
    { name: 'Youth Programs', href: '/youth', hasDropdown: false },
    { name: 'Blogs', href: '/blogs', hasDropdown: false },
    { name: 'Donate', href: '/donate', hasDropdown: false },
  ];

  return (
    <nav className={`${
      isHome 
        ? 'fixed top-0 left-0 w-full z-50 transition-all duration-250 ease-out bg-transparent' 
        : 'sticky top-0 left-0 w-full z-40 transition-all duration-250 ease-out bg-transparent'
    }`}>
      
      {/* Styles moved to globals.css for faster navigation */}

      {/* NAVIGATION BAR LAYER (White Liquid Glass Style with Black Text or Transparent on Home) */}
      <div className={`transition-all duration-250 ease-out w-full ${
        scrolled 
          ? 'max-w-[1300px] w-[95%] mx-auto mt-2 sm:mt-3 rounded-full bg-white/85 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.14)] py-1.5 px-4 sm:px-6' 
          : isHome
            ? 'w-full bg-transparent border-none shadow-none py-3 sm:py-4'
            : 'w-full bg-white/85 backdrop-blur-md border-b border-gray-200/40 py-1.5 sm:py-2 shadow-md'
      }`}>
        <div className={scrolled ? "px-4 sm:px-6 lg:px-8" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>
          <div className="flex items-center justify-between gap-8 w-full">
            
            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
              <Link href="/" className="flex-shrink-0 flex items-center gap-2 sm:gap-3.5">
                <img 
                  src="/logo-dehradun.webp" 
                  alt="Hare Krishna Dehradun Movement Logo" 
                  className="h-12 sm:h-16 w-auto object-contain transition-transform hover:scale-105 drop-shadow-sm"
                />
                <div className={`h-8 sm:h-11 w-[1.5px] rounded-full ${isHome && !scrolled ? 'bg-white/50' : 'bg-gray-300/70'}`} />
                <img 
                  src="/sp%20logo.webp" 
                  alt="Srila Prabhupada Portrait" 
                  className="h-12 sm:h-16 w-auto object-contain transition-transform hover:scale-105 drop-shadow-sm"
                />
              </Link>

            </div>

            {/* Desktop Navigation Links - Centered in One Clean Line */}
            <div className="hidden xl:flex items-center gap-4 lg:gap-5 2xl:gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const hasDropdown = link.dropdownItems && link.dropdownItems.length > 0;

                if (link.name === 'Donate Now' || link.name === 'Donate') {
                  return (
                    <div key={link.name} className="relative py-2 group flex items-center">
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="btn-custom-donate"
                      >
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
                      className={`glass-nav-link ${isActive ? 'glass-nav-link-active' : ''} ${
                        isHome && !scrolled ? '!text-white !font-black tracking-wider hover:!text-[#FF9933] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]' : ''
                      }`}
                    >
                      <span>{link.name}</span>
                      {hasDropdown && (
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 ${
                          isHome && !scrolled ? '!text-white group-hover:!text-[#FF9933] drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]' : 'text-gray-500 group-hover:text-[#0B5DB7]'
                        }`} />
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
                                className={`flex items-start gap-3 px-4 py-3 text-left capitalize tracking-wide text-gray-800 hover:text-[#0B5DB7] hover:bg-[#0B5DB7]/5 rounded-xl transition-all duration-200 whitespace-normal leading-relaxed group/item ${
                                  link.name === 'Youth Programs'
                                    ? 'text-base sm:text-[1.0625rem] font-semibold'
                                    : 'text-[15px] font-medium'
                                }`}
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
                className="btn-custom-donate !h-8 !min-w-[76px] !text-[12.5px] !px-3 !m-0"
              >
                Donate
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${isHome && !scrolled ? 'text-white hover:text-saffron drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]' : 'text-gray-800 hover:text-[#0B5DB7]'} p-1 focus:outline-none`}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="xl:hidden bg-black/95 border-t border-white/10 px-4 pt-2 pb-6 space-y-1.5 shadow-xl max-h-[70vh] overflow-y-auto">
          <div className="flex gap-2 mb-4 mt-2">
             <a href="tel:+919876543210" className="flex-1 flex items-center justify-center gap-2 bg-[#0B5DB7] text-white py-2.5 rounded-lg text-sm font-medium">
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
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[15px] font-medium tracking-wide transition-colors text-white hover:bg-white/5 hover:text-saffron`}
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
                          className="block px-3 py-2 text-[14px] font-medium text-gray-300 hover:text-saffron transition-colors tracking-wide whitespace-normal leading-tight"
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
                className={`block px-3 py-2 rounded-lg text-[15px] font-medium tracking-wide transition-colors ${
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

    </nav>
  );
};
