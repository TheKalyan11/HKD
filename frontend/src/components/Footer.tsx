'use client';

import React from 'react';
import Link from 'next/link';

/* ─────────────────────────────────────────────
   Animated birds (Subtle gliding near spire)
───────────────────────────────────────────── */
const BirdSVG = ({ className = '', style = {} }: { className?: string, style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 60 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
  >
    <g className="bird-flap">
      <path className="wing" d="M30 15 Q18 2 2 8" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path className="wing" d="M30 15 Q42 2 58 8" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </g>
  </svg>
);

/* ─────────────────────────────────────────────
   Nav data
───────────────────────────────────────────── */
const NAV_COLS = [
  {
    title: 'Explore',
    links: [
      { label: 'Our Mission & Objectives',        href: '/about' },
      { label: 'Gita Life Courses',               href: '/gita-life' },
      { label: 'Book Distribution',               href: '/book-distribution' },
      { label: 'Bhagavad Gita Book Distribution', href: '/book-distribution' },
    ],
  },
  {
    title: 'Links',
    links: [
      { label: 'Daily Darshan',  href: '/daily-darshan' },
      { label: 'Mandir Nirman', href: '/mandir-nirman' },
      { label: 'Latest Events',  href: '/events' },
    ],
  },
  {
    title: 'Latest Events',
    links: [
      { label: 'Janmashtami Mahotsav',  href: '/events' },
      { label: 'Gaura Purnima Festival', href: '/events' },
      { label: 'Rath Yatra',            href: '/events' },
      { label: 'Diwali Celebration',    href: '/events' },
    ],
  },
  {
    title: 'Donate Now',
    links: [
      { label: 'Gau Seva',               href: '/gau-seva' },
      { label: 'Annadana Seva',          href: '/annadana-seva' },
      { label: 'Child Annadana Seva',    href: '/child-annadana-seva' },
      { label: 'Khichdi Prasadam Seva',  href: '/khichdi-prasadam-seva' },
      { label: 'Ekadashi Seva',          href: '/ekadashi-seva' },
    ],
  },
];

/* ─────────────────────────────────────────────
   Footer Component
───────────────────────────────────────────── */
export function Footer() {
  return (
    <footer className="relative bg-white pt-24 pb-12 overflow-hidden border-t border-gray-100 font-sans">
      
      {/* Styles moved to globals.css for faster navigation */}

      {/* ── Background Temple (footer.png shifted "up side" to sit right above the divider line) ── */}
      <div className="absolute z-0 pointer-events-none select-none hidden xl:block transition-all duration-500" style={{ width: '480px', right: '0%', bottom: '150px' }}>
        <div className="relative w-full h-full">
          <img
            src="/footer.png"
            alt="Temple"
            loading="lazy"
            className="w-full h-auto object-contain block opacity-100 transform origin-bottom hover:scale-[1.02] transition-transform duration-700"
          />
          {/* Soft gradient bottom fade so the trees sit elegantly on top of the blue line */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent opacity-40" />
        </div>
      </div>

      {/* ── Realistic Birds flying near temple spire ── */}
      <div className="absolute top-0 right-0 bottom-0 z-0 pointer-events-none select-none" style={{ width: '500px' }}>
        <div className="absolute bird-1" style={{ right: '12%', top: '18%', width: '45px' }}>
          <BirdSVG className="w-full h-auto" />
        </div>
        <div className="absolute bird-2" style={{ right: '18%', top: '24%', width: '45px' }}>
          <BirdSVG className="w-full h-auto" />
        </div>
      </div>

      {/* ── Main content (Wider container max-w-[1520px]) ── */}
      <div className="max-w-[1520px] mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-24">
          
          {/* Left Column: Brand Logo & Info */}
          <div className="w-full lg:w-1/3 lg:pr-12">
            <div className="mb-8">
              {/* Clean, border-less original logo-dehradun.jpg as shown in mockup */}
              <img 
                src="/fh.png" 
                alt="Srila Prabhupada's Hare Krishna Movement Dehradun Logo" 
                className="h-36 w-auto object-contain block"
              />
            </div>
            
            <div className="text-gray-500 text-[16px] leading-relaxed mb-8 max-w-full font-medium space-y-3">
              <p>Hare Krishna Mandir is run by Hare Krishna Movement Dehradun, a registered trust.</p>
              <p>
                <strong>Address:</strong><br />
                Khasra No. 801, Suddhowala,<br />
                Near IIM Kashipur Satellite Campus,<br />
                Dehradun 248015
              </p>
              <p>
                <strong>Phone:</strong> +91 9398710996<br />
                <strong>Email:</strong> contact@hkmdehradun.org
              </p>
            </div>
          </div>

          {/* Right Columns: Links with Gold Underline (Widened with reduced right padding to spread out nicely) */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 xl:pr-[240px]">
            {NAV_COLS.map((col) => (
              <div key={col.title}>
                <h4 className="font-medium text-[#0f4c81] text-[17px] tracking-wide">
                  {col.title}
                </h4>
                {/* Horizontal Gold Line under Header */}
                <div className="w-11 h-[2.5px] bg-[#eab308] mt-2 mb-6" />
                
                <ul className="space-y-4">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="footer-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t-2 border-[#0f4c81] pt-8 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm text-gray-500 font-semibold px-4">
            © HARE KRISHNA MOVEMENT DEHRADUN. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-xs sm:text-sm font-semibold text-gray-500 px-4">
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
            <span className="text-[#eab308] font-bold hidden sm:inline">|</span>
            <Link href="/terms" className="hover:text-gray-900 transition-colors">Terms &amp; Conditions</Link>
            <span className="text-[#eab308] font-bold hidden sm:inline">|</span>
            <Link href="/refund-policy" className="hover:text-gray-900 transition-colors">Refund Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
