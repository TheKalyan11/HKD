"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Script from "next/script";
import Link from "next/link";

/* ── Scroll-triggered reveal ──────────────────────────── */
function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const y = direction === "up" ? 40 : direction === "down" ? -40 : 0;
  const x = direction === "left" ? 40 : direction === "right" ? -40 : 0;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.8, delay: delay / 1000, ease: [0.25, 1, 0.5, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Inline SVG icons ─────────────────────────────────── */
const SvgArrowRight = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ── Seva categories data ─────────────────────────────── */
const sevaCards = [
  {
    title: "Gau Seva",
    image: "https://hkmdehradun.org/live-site/assets/12/gau-seva-banner.png",
    desc: "Support ISKCON's Gaushala and be a part of this noble mission. Your contribution helps provide daily cow care, feeding, and shelter.",
    label: "Gau Seva",
    link: "/gau-seva"
  },
  {
    title: "Annadana Seva",
    image: "https://hkmdehradun.org/live-site/assets/12/annadaan-seva-banner1.png",
    desc: "Support ISKCON Temple's Annadana Seva by providing sanctified meals to devotees and the needy. Over 2.89 crore meals served.",
    label: "Annadana Seva",
    link: "/annadana-seva"
  },
  {
    title: "Child Annadana Seva",
    image: "https://hkmdehradun.org/live-site/assets/12/children-annadana-seva-banner.png",
    desc: "Support the nourishment of children through ISKCON's Child Annadana Seva. Wholesome, nutritious meals for children in need.",
    label: "Child Annadana Seva",
    link: "/child-annadana-seva"
  },
  {
    title: "Khichdi Prasadam",
    image: "https://hkmdehradun.org/live-site/assets/12/khichdi-seva-banner.png",
    desc: "Every week, more than 10,000 visitors receive sacred khichdi prasadam at ISKCON temples. This seva ensures that no one goes hungry.",
    label: "Khichdi Prasadam Seva",
    link: "/khichdi-prasadam-seva"
  },
  {
    title: "Ekadashi Seva",
    image: "https://hkmdehradun.org/live-site/assets/12/ekadashi-banner.png",
    desc: "Celebrate the holy day of Ekadashi by supporting divine sevas at Hare Krishna Mandir. Donations on this day carry special spiritual merit.",
    label: "Ekadashi Seva",
    link: "/ekadashi-seva"
  },
];

export default function DonatePage() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <main 
      className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-amber-100 selection:text-[#072149] relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: -1000, y: -1000 })}
    >
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {/* ── FULL PAGE INTERACTIVE GRID BACKGROUND ─────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-[0]">
        {/* Base Grid */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '4rem 4rem'
          }}
        />
        
        {/* Interactive Highlighted Grid */}
        <div 
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(7,33,73,0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(7,33,73,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '4rem 4rem',
            WebkitMaskImage: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
            maskImage: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`
          }}
        />
      </div>

      {/* ── HERO SECTION ─────────────────────────────────────── */}
      <section className="relative pt-24 lg:pt-32 pb-4 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10 flex flex-col">
          <Reveal delay={100}>
            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] text-[#111] tracking-tight mb-2" style={{ fontWeight: 400, lineHeight: 1.15 }}>
              Join us in the service of Lord.<br />
              <span className="relative inline-block pb-2">
                Charitable Sevas.
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ 
                    duration: 1.5, 
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 5
                  }}
                  style={{ originX: 0 }}
                  className="absolute left-0 bottom-0 w-full h-[4px] lg:h-[6px] bg-[#072149]"
                />
              </span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ── SEVA CARDS SECTION ────────────────────────────────── */}
      <section className="pt-8 pb-24 lg:pt-12 lg:pb-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {sevaCards.map((seva, i) => (
              <Reveal key={i} delay={i * 100} direction="up">
                <div className="group relative bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(7,33,73,0.08)] border border-gray-100 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#072149]/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    <img
                      src={seva.image}
                      alt={seva.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-[0.25,1,0.5,1]"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow relative bg-white z-20">
                    <h3 className="text-2xl text-[#072149] mb-4" style={{ fontWeight: 800 }}>
                      {seva.title}
                    </h3>
                    <p className="text-[#072149]/60 text-sm leading-relaxed mb-8 flex-grow">
                      {seva.desc}
                    </p>
                    
                    <div className="pt-6 border-t border-gray-100 flex items-center justify-between mt-auto">
                      <span className="text-sm text-[#072149]/40 font-medium tracking-wide uppercase">Donate Now</span>
                      {seva.link ? (
                        <Link
                          href={seva.link}
                          className="w-12 h-12 rounded-full bg-[#FAFAFA] text-[#072149] flex items-center justify-center group-hover:bg-[#072149] group-hover:text-white transition-colors duration-300 shadow-sm"
                        >
                          <SvgArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                      ) : (
                        <button
                          className="w-12 h-12 rounded-full bg-[#FAFAFA] text-[#072149] flex items-center justify-center group-hover:bg-[#072149] group-hover:text-white transition-colors duration-300 shadow-sm"
                        >
                          <SvgArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
