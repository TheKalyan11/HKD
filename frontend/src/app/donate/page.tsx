"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Script from "next/script";
import Link from "next/link";
import RespectedContributors from "@/components/RespectedContributors";
import DonorPrivileges from "@/components/DonorPrivileges";
import DonationVideoSection from "@/components/DonationVideoSection";
import ScripturalImportanceSection from "@/components/ScripturalImportanceSection";
import FaqSection from "@/components/FaqSection";
import AboutDonationSection from "@/components/AboutDonationSection";

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

/* ── Seva categories data ─────────────────────────────── */
const sevaCards = [
  {
    title: "Gau Seva",
    image: "https://hkmdehradun.org/live-site/assets/12/gau-seva-banner.png",
    desc: "Support Hare Krishna Movement Dehradun's Gaushala and be a part of this noble mission. Your contribution helps provide daily cow care, feeding, and shelter.",
    label: "Gau Seva",
    link: "/gau-seva"
  },
  {
    title: "Annadana Seva",
    image: "https://hkmdehradun.org/live-site/assets/12/annadaan-seva-banner1.png",
    desc: "Support Hare Krishna Movement Dehradun's Annadana Seva by providing sanctified meals to devotees and the needy. Over 2.89 crore meals served.",
    label: "Annadana Seva",
    link: "/annadana-seva"
  },
  {
    title: "Khichdi Prasadam",
    image: "https://hkmdehradun.org/live-site/assets/12/khichdi-seva-banner.png",
    desc: "Every week, more than 10,000 visitors receive sacred khichdi prasadam at Hare Krishna Movement Dehradun. This seva ensures that no one goes hungry.",
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
  return (
    <main 
      className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-amber-100 selection:text-[#072149] relative"
    >
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {/* ── HERO SECTION ─────────────────────────────────────── */}
      <section className="relative pt-4 sm:pt-6 lg:pt-8 pb-2 overflow-hidden z-10">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10 flex flex-col items-center text-center animate-fade-in-up">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#111] tracking-tight mb-2 font-bold" style={{ lineHeight: 1.25 }}>
              Join us in the service of Lord.<br />
              <span className="relative inline-block pb-1.5">
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
                  className="absolute left-0 bottom-0 w-full h-[3px] lg:h-[4px] bg-[#072149]"
                />
              </span>
            </h1>
        </div>
      </section>

      {/* ── SEVA CARDS SECTION ────────────────────────────────── */}
      <section className="pt-2 sm:pt-3 pb-4 lg:pt-4 lg:pb-6 relative z-10">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {sevaCards.map((seva, i) => (
              <Reveal key={i} delay={i * 100} direction="up" className="flex">
                <div className="bg-white rounded-[40px] p-3 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-2xl border border-gray-100 transition-shadow duration-300 flex flex-col h-full w-full min-h-[500px] group font-sans">
                  <div className="relative w-full aspect-[16/9] rounded-[32px] overflow-hidden mb-6 shrink-0 bg-[#f8f9fa]">
                    <img
                      src={seva.image}
                      alt={seva.title}
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>

                  <div className="px-4 flex flex-col flex-grow">
                    <h3 className="text-[32px] lg:text-[36px] font-bold text-[#18181b] tracking-tight mb-2 leading-tight">
                      {seva.title}
                    </h3>
                    <p className="text-[#8c8c93] text-[16px] lg:text-[17px] leading-relaxed mb-6 flex-grow line-clamp-3">
                      {seva.desc}
                    </p>
                    
                    <div className="flex items-center gap-3 mt-auto pb-2">
                      {seva.link ? (
                        <Link
                          href={seva.link}
                          className="w-full flex items-center justify-center bg-[#f38312] hover:bg-[#d9710b] text-white font-bold rounded-[24px] py-3.5 text-[16px] transition-colors shadow-md"
                        >
                          Donate
                        </Link>
                      ) : (
                        <button
                          className="w-full flex items-center justify-center bg-[#f38312] hover:bg-[#d9710b] text-white font-bold rounded-[24px] py-3.5 text-[16px] transition-colors shadow-md cursor-pointer"
                        >
                          Donate
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

      {/* ── RESPECTED CONTRIBUTORS SECTION ──────────────────────── */}
      <section className="pb-4 relative z-10">
        <RespectedContributors />
      </section>

      {/* ── DONOR PRIVILEGES SECTION ────────────────────────────── */}
      <section className="relative z-10 bg-gradient-to-b from-transparent to-white py-2">
        <DonorPrivileges />
      </section>

      {/* ── DONATION VIDEO SECTION ───────────────────────────────── */}
      <DonationVideoSection />

      {/* ── SCRIPTURAL IMPORTANCE SECTION ───────────────────────── */}
      <ScripturalImportanceSection />

      {/* ── FAQ SECTION ─────────────────────────────────────────── */}
      <FaqSection />

      {/* ── ABOUT DONATION SECTION ────────────────────────────── */}
      <AboutDonationSection />
    </main>
  );
}
