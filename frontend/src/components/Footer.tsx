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
      { label: 'Home',     href: '/' },
      { label: 'About Us', href: '/#about' },
      { label: 'History',  href: '/#history' },
      { label: 'Services', href: '/#services' },
    ],
  },
  {
    title: 'Links',
    links: [
      { label: 'Spiritual Teachings',    href: '/blog' },
      { label: 'Cultural Programs',      href: '/events' },
      { label: 'Community Initiatives',  href: '/donate' },
      { label: 'Resource Repository',    href: '/gallery' },
    ],
  },
  {
    title: 'Events',
    links: [
      { label: 'Main Festivals',   href: '/events' },
      { label: 'Monthly Programs', href: '/events' },
      { label: 'Temple Activities',href: '/events' },
      { label: 'Event Gallery',    href: '/gallery' },
    ],
  },
  {
    title: 'Temple',
    links: [
      { label: 'Pooja Timings',  href: '/#pooja' },
      { label: 'Contact Us',     href: '/#contact' },
      { label: 'Donate Online',  href: '/donate' },
      { label: 'Plan Your Visit',href: '/#visit' },
    ],
  },
];

/* ─────────────────────────────────────────────
   Footer Component
───────────────────────────────────────────── */
export function Footer() {
  return (
    <footer className="relative bg-white pt-24 pb-12 overflow-hidden border-t border-gray-100 font-sans">
      
      {/* ── Realistic Animations ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Wing Flapping */
        @keyframes flap {
          0%, 100% { transform: scaleY(1); }
          50%      { transform: scaleY(-0.6); }
        }
        .bird-flap {
          transform-origin: 30px 15px;
          animation: flap 0.8s infinite ease-in-out;
        }
        
        /* Subtle natural gliding near the spire */
        @keyframes glide1 {
          0%, 100% { transform: translate(0, 0) scale(0.6); }
          50%      { transform: translate(-15px, -10px) scale(0.6); }
        }
        @keyframes glide2 {
          0%, 100% { transform: translate(0, 0) scale(0.5); }
          50%      { transform: translate(12px, -8px) scale(0.5); }
        }

        .bird-1 { animation: glide1 8s ease-in-out infinite; }
        .bird-2 { animation: glide2 10s ease-in-out infinite; }
        
        .bird-1 .bird-flap { animation-duration: 0.7s; }
        .bird-2 .bird-flap { animation-duration: 0.9s; }

        .footer-link {
          color: #4b5563; /* gray-600 */
          font-size: 0.95rem;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
          font-weight: 500;
        }
        .footer-link:hover { 
          color: #0f4c81; /* Blue theme accent */
          transform: translateX(2px);
        }

        .social-icon {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          color: #0f4c81; /* Matching blue theme */
          transition: all 0.2s ease;
          background: transparent;
          border-radius: 50%;
        }
        .social-icon:hover {
          color: #111827;
          background: #f3f4f6;
          transform: translateY(-2px);
        }
      ` }} />

      {/* ── Background Temple (footer.png shifted "up side" to sit right above the divider line) ── */}
      <div className="absolute z-0 pointer-events-none select-none hidden xl:block transition-all duration-500" style={{ width: '480px', right: '0%', bottom: '90px' }}>
        <div className="relative w-full h-full">
          <img 
            src="/footer.png" 
            alt="Temple" 
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
            
            <p className="text-gray-500 text-[14px] leading-relaxed mb-8 max-w-[340px] font-medium">
              Serving the holy land of Vraja, establishing exemplary standards for animal welfare (Gau Seva), hot prasadam distribution, and spiritual development.
            </p>
            
            {/* Social Icons (styled matching reference) */}
            <div className="flex items-center gap-3">
              {/* X (Twitter) */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Columns: Links with Gold Underline (Widened with reduced right padding to spread out nicely) */}
          <div className="w-full lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 xl:pr-[240px]">
            {NAV_COLS.map((col) => (
              <div key={col.title}>
                <h4 className="font-bold text-[#0f4c81] text-[17px] tracking-wide">
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
        <div className="border-t-2 border-[#0f4c81] pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="text-sm text-gray-500 font-semibold">
            © {new Date().getFullYear()} Hare Krishna Dharma Trust. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm font-semibold text-gray-500">
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
            <span className="text-[#eab308] font-bold">|</span>
            <Link href="/terms"   className="hover:text-gray-900 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
