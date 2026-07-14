"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import AnimeReveal from "../../components/AnimeReveal";

/* ── social SVGs ─────────────────────────────────────────── */
const SvgX = () => (
  <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);
const SvgInstagram = () => (
  <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);
const SvgLinkedin = () => (
  <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const SvgStar = () => (
  <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
function SocialBtn({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <button className={`w-8 h-8 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity ${className}`}>
      {children}
    </button>
  );
}

/* ── PREMIUM SVG ICON SYSTEM (24x24, dual-tone, rich detail) ── */

const PIcon = ({ children, className = "w-12 h-12" }: { children: React.ReactNode; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {children}
  </svg>
);

const PIBookOpen = ({ className }: { className?: string }) => (
  <PIcon className={className}>
    <path d="M2 4c2-1 4.5-1.5 6.5-.8C10.5 4 11.5 5 12 5.5c.5-.5 1.5-1.5 3.5-2.3C17.5 2.5 20 3 22 4v14c-2-.5-4.5-.3-6 .5-1.5.8-3 2-4 2.5-1-.5-2.5-1.7-4-2.5-1.5-.8-4-1-6-.5V4z" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    <path d="M12 5.5V21" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4"/>
    <path d="M5 8.5c1.5.3 4.2.8 7 1.5" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5"/>
    <path d="M5 12c1.5.3 4.2.8 7 1.5" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5"/>
    <path d="M19 8.5c-1.5.3-4.2.8-7 1.5" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5"/>
    <path d="M19 12c-1.5.3-4.2.8-7 1.5" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5"/>
  </PIcon>
);

const PICompass = ({ className }: { className?: string }) => (
  <PIcon className={className}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.06"/>
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 2" strokeOpacity="0.3"/>
    <polygon points="12,4 14,10 12,9 10,10" fill="currentColor" fillOpacity="0.7"/>
    <polygon points="12,20 10,14 12,15 14,14" fill="currentColor" fillOpacity="0.35"/>
    <polygon points="4,12 10,10 9,12 10,14" fill="currentColor" fillOpacity="0.35"/>
    <polygon points="20,12 14,14 15,12 14,10" fill="currentColor" fillOpacity="0.35"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
  </PIcon>
);

const PIBrain = ({ className }: { className?: string }) => (
  <PIcon className={className}>
    <path d="M12 2C9 2 6.5 3.5 6 6c-1.5.5-3 2.5-3 5s1.5 4.5 3.5 5c.5 1.5 2.5 3 5.5 3s5-1.5 5.5-3c2-.5 3.5-2.5 3.5-5s-1.5-4.5-3-5C17.5 3.5 15 2 12 2z" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    <path d="M12 6v12" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.4"/>
    <path d="M8 8c1.5 1 2.5 2.5 4 4" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.4"/>
    <path d="M16 8c-1.5 1-2.5 2.5-4 4" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.4"/>
    <path d="M7 13c2-.5 3.5 0 5 1" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.4"/>
    <path d="M17 13c-2-.5-3.5 0-5 1" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.4"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor" fillOpacity="0.5"/>
  </PIcon>
);

const PIMap = ({ className }: { className?: string }) => (
  <PIcon className={className}>
    <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6z" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    <line x1="9" y1="4" x2="9" y2="18" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.4"/>
    <line x1="15" y1="6" x2="15" y2="20" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.4"/>
    <circle cx="7" cy="10" r="1.2" fill="currentColor" fillOpacity="0.5"/>
    <circle cx="12" cy="13" r="1.2" fill="currentColor" fillOpacity="0.5"/>
    <circle cx="17" cy="11" r="1.2" fill="currentColor" fillOpacity="0.5"/>
  </PIcon>
);

const PILotus = ({ className }: { className?: string }) => (
  <PIcon className={className}>
    <path d="M12 20c0 0-5-3-5-8c0-3 2.5-5.5 5-6c2.5.5 5 3 5 6c0 5-5 8-5 8z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M12 6c0 0-3 2-3 6c0 4 3 8 3 8" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.5"/>
    <path d="M12 6c0 0 3 2 3 6c0 4-3 8-3 8" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.5"/>
    <path d="M7 11c-3-2-5 0-5 3c0 2.5 2 4 5 5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.7" fill="none"/>
    <path d="M17 11c3-2 5 0 5 3c0 2.5-2 4-5 5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.7" fill="none"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
    <line x1="12" y1="20" x2="12" y2="23" stroke="currentColor" strokeWidth="1"/>
  </PIcon>
);

const PIMentor = ({ className }: { className?: string }) => (
  <PIcon className={className}>
    <circle cx="12" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.1"/>
    <path d="M4 21c0-4.5 3.5-8 8-8s8 3.5 8 8" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.06"/>
    <path d="M12 10.5v3" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5"/>
    <circle cx="12" cy="16" r="1.5" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.2"/>
    <path d="M8.5 5.5l-.5-2" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.4"/>
    <path d="M15.5 5.5l.5-2" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.4"/>
  </PIcon>
);

const PISpark = ({ className }: { className?: string }) => (
  <PIcon className={className}>
    <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    <path d="M12 8l1 3h3l-2.5 2 1 3-2.5-2-2.5 2 1-3-2.5-2h3z" fill="currentColor" fillOpacity="0.35"/>
    <circle cx="12" cy="12" r="1" fill="currentColor"/>
  </PIcon>
);

const PIPresentation = ({ className }: { className?: string }) => (
  <PIcon className={className}>
    <rect x="2" y="3" width="20" height="14" rx="2" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="8" y1="17" x2="8" y2="21" stroke="currentColor" strokeWidth="1"/>
    <line x1="16" y1="17" x2="16" y2="21" stroke="currentColor" strokeWidth="1"/>
    <line x1="6" y1="21" x2="18" y2="21" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="5" y="6" width="6" height="4" rx="0.5" fill="currentColor" fillOpacity="0.2"/>
    <line x1="13" y1="7" x2="19" y2="7" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5"/>
    <line x1="13" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5"/>
    <line x1="5" y1="13" x2="19" y2="13" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.3"/>
  </PIcon>
);

const PINotebook = ({ className }: { className?: string }) => (
  <PIcon className={className}>
    <rect x="4" y="2" width="16" height="20" rx="2" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="4" y1="6" x2="7" y2="6" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="4" y1="10" x2="7" y2="10" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="4" y1="14" x2="7" y2="14" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="4" y1="18" x2="7" y2="18" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="9" y1="7" x2="17" y2="7" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5"/>
    <line x1="9" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5"/>
    <line x1="9" y1="13" x2="17" y2="13" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5"/>
    <line x1="9" y1="16" x2="14" y2="16" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5"/>
  </PIcon>
);

const PIYoga = ({ className }: { className?: string }) => (
  <PIcon className={className}>
    <circle cx="12" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.1"/>
    <path d="M12 8v6" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M12 14l-5 6" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M12 14l5 6" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M6 10c2 1.5 4 2 6 2s4-.5 6-2" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    <circle cx="12" cy="11" r="0.8" fill="currentColor" fillOpacity="0.4"/>
  </PIcon>
);

const PIChat = ({ className }: { className?: string }) => (
  <PIcon className={className}>
    <path d="M21 12c0 4.4-4 8-9 8-1.6 0-3-.3-4.3-.9L3 21l1.5-4C3.5 15.5 3 13.8 3 12c0-4.4 4-8 9-8s9 3.6 9 8z" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    <circle cx="8" cy="12" r="1" fill="currentColor"/>
    <circle cx="12" cy="12" r="1" fill="currentColor"/>
    <circle cx="16" cy="12" r="1" fill="currentColor"/>
  </PIcon>
);

const PIScroll = ({ className }: { className?: string }) => (
  <PIcon className={className}>
    <path d="M8 3c-1.5 0-3 1-3 2.5S5 8 8 8h10c1 0 2 .8 2 2v7c0 1.5-1.5 2.5-3 2.5H7c-1.5 0-3-1-3-2.5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    <path d="M8 3c1.5 0 3 1 3 2.5S10 8 8 8" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08"/>
    <path d="M17 19.5c1.5 0 3-1 3-2.5" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="17" cy="19.5" r="2.5" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08"/>
    <line x1="9" y1="12" x2="17" y2="12" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5"/>
    <line x1="9" y1="15" x2="15" y2="15" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5"/>
  </PIcon>
);

/* ── Animated counter widget ────────────────────────────────── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1600;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Interactive Accordion ─────────────────────────────────── */
function AccordionItem({ icon, label, desc, isOpen, onClick }: {
  icon: React.ReactNode; label: string; desc: string; isOpen: boolean; onClick: () => void;
}) {
  return (
    <motion.div
      layout
      onClick={onClick}
      className={`rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden ${
        isOpen
          ? "border-amber-300 bg-gradient-to-br from-amber-50/90 to-orange-50/90 backdrop-blur-lg shadow-[0_8px_30px_rgba(251,191,36,0.15)]"
          : "border-white/60 bg-white/40 backdrop-blur-md hover:bg-white/60 hover:border-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)]"
      }`}
    >
      <div className="flex items-center gap-4 p-5">
        <div className={`w-10 h-10 shrink-0 transition-colors duration-300 ${
          isOpen ? "text-amber-600" : "text-[#072149]/70"
        }`}>
          {icon}
        </div>
        <p className={`flex-1 text-sm transition-colors duration-300 ${
          isOpen ? "text-[#072149]" : "text-[#072149]/90"
        }`} style={{ fontWeight: 600 }}>
          {label}
        </p>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`text-lg transition-colors duration-300 ${isOpen ? "text-amber-500" : "text-[#072149]/30"}`}
        >
          &#9662;
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-5 pb-5 pl-[4.25rem]">
              <p className="text-sm text-gray-700 leading-relaxed">{desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── page ───────────────────────────────────────────────────── */
export default function GitaLifeCoursePage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const curriculumTabs = [
    {
      Icon: PIBookOpen,
      title: "Gita Study",
      accent: "bg-amber-500",
      desc: "A deep, structured study of the Bhagavad-gita — exploring its verses, context, meaning, and philosophical depth. Each session builds progressively on the last, guiding you through the 18 chapters of divine wisdom.",
      highlights: ["Verse-by-verse analysis", "Historical context of Kurukshetra", "Sanskrit pronunciation", "Chapter summaries"],
    },
    {
      Icon: PICompass,
      title: "Vedic Ideology",
      accent: "bg-blue-500",
      desc: "Understanding the complete worldview of Vedic civilisation — from cosmology and the nature of the self to the purpose of human existence. Explore the philosophical foundations that underpin all Vedic texts.",
      highlights: ["Soul and Supersoul", "Karma and reincarnation", "Three modes of nature", "Vedic cosmology"],
    },
    {
      Icon: PIBrain,
      title: "Practical Spirituality",
      accent: "bg-emerald-500",
      desc: "Applying spiritual principles in daily life — at work, in relationships, and in personal growth. Learn to navigate modern challenges using the ancient frameworks of the Gita.",
      highlights: ["Stress management", "Ethical decision-making", "Work-life balance", "Emotional intelligence"],
    },
    {
      Icon: PIMap,
      title: "Educational Tours",
      accent: "bg-violet-500",
      desc: "Immersive visits to sacred sites, temples, and places of Vedic significance in Uttarakhand. Experience the living tradition of devotion and see how ancient wisdom manifests in the real world.",
      highlights: ["Temple visits", "Himalayan retreats", "Sacred river ceremonies", "Pilgrimage routes"],
    },
    {
      Icon: PILotus,
      title: "Mantra Meditation",
      accent: "bg-rose-500",
      desc: "Learn and practise the Hare Krishna Maha Mantra and other Vedic meditations for inner peace, mental clarity, and spiritual elevation. Develop a daily practice that stays with you for life.",
      highlights: ["Japa meditation technique", "Kirtan sessions", "Breath awareness", "Mantra science"],
    },
    {
      Icon: PIMentor,
      title: "Personal Mentoring",
      accent: "bg-orange-500",
      desc: "One-on-one guidance from full-time dedicated missionaries who live the teachings every day. Your mentor walks alongside you, answering questions and helping you integrate wisdom into your life.",
      highlights: ["Weekly check-ins", "Personalised guidance", "Doubt resolution", "Life coaching"],
    },
  ];

  const specialFeatures = [
    { Icon: PIPresentation, label: "PowerPoint Presentations", desc: "Visually rich, professionally designed slides that make complex Vedic concepts easy to understand, remember, and share with others." },
    { Icon: PINotebook, label: "Well-Organised Workbook", desc: "A comprehensive companion workbook designed for note-taking, personal reflection, journaling insights, and ongoing reference throughout the course." },
    { Icon: PIYoga, label: "Practical Training", desc: "Hands-on exercises, role-plays, and real-life activities that connect theory directly to your everyday situations, relationships, and decisions." },
    { Icon: PIMentor, label: "Personal Mentoring", desc: "Dedicated one-on-one guidance from full-time missionaries who are committed to your spiritual growth and personal transformation." },
    { Icon: PIChat, label: "Interactive Sessions", desc: "Open discussions, live Q&A forums, group debates, and peer-to-peer learning that deepen understanding and build a supportive community." },
    { Icon: PIScroll, label: "Sublime Course Material", desc: "Carefully curated content drawn from authentic Vedic scriptures and the writings of Srila Prabhupada, presented in a modern and accessible format." },
  ];

  if (!isMounted) return null;

  return (
    <div className="bg-white font-inter">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <div className="min-h-screen p-3 sm:p-4 md:p-6">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] md:min-h-[calc(100vh-48px)]">
          <img 
            src="/gita hero.webp" 
            alt="Gita Life Course" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
        </div>
      </div>
      {/* ── end hero ──────────────────────────────────────────── */ }
      <div className="relative w-full">
        {/* Mantra and Icon Watermark Background */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none flex flex-col justify-evenly opacity-[0.03] select-none" style={{ minHeight: '100%' }}>
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="flex items-center gap-10 whitespace-nowrap -rotate-3 scale-110 translate-x-[-10%]">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="flex items-center gap-6 text-4xl md:text-5xl font-serif text-[#072149] font-bold">
                  <PILotus className="w-10 h-10" />
                  <span>Hare Krishna Hare Krishna Krishna Krishna Hare Hare</span>
                  <span className="w-4 h-4 rounded-full bg-amber-500" />
                  <span>Hare Rama Hare Rama Rama Rama Hare Hare</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="relative z-10 w-full">




      {/* ══ ABOUT — redesigned narrative ═══════════════════ */}
      <section id="about" className="bg-[#FFFBF2]/80 backdrop-blur-sm px-5 sm:px-10 lg:px-20 py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 100% 0%, #fef3c7 0%, transparent 40%)" }} />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center mb-16">
          <AnimeReveal direction="up" delay={80}>
            <p className="text-amber-600 text-xs uppercase tracking-[0.4em] mb-4" style={{ fontWeight: 600 }}>About the Course</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#072149] leading-tight mb-8" style={{ fontWeight: 600 }}>
              From the Battlefield{" "}
              <span className="font-instrument" style={{ fontStyle: "italic", fontWeight: 400 }}>of Kurukshetra</span>
            </h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full" />
          </AnimeReveal>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimeReveal direction="up" delay={120}>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  One of India&apos;s greatest spiritual gifts to the world is the{" "}
                  <strong className="text-[#072149] font-semibold">Shrimad Bhagavad Gita</strong>. Spoken by{" "}
                  <strong className="text-[#072149] font-semibold">Lord Sri Krishna</strong>, it is a profound guide to leadership,
                  self-discovery, and purposeful living — revealed on the battlefield of Kurukshetra during a moment of
                  intense crisis faced by Arjuna.
                </p>
                <p>
                  More than 5,000 years ago, just before the great war began, Arjuna became overwhelmed with fear,
                  confusion, and sorrow. His body trembled, his mouth dried up, and he set aside his bow and arrows.
                </p>
                <p className="p-6 bg-white/60 rounded-2xl border border-amber-100 italic text-[#072149] shadow-sm">
                  In this moment of uncertainty, Arjuna raised profound questions about duty, life, morality,
                  and the purpose of existence. Lord Krishna spoke the eternal wisdom — illuminating the path
                  of knowledge, devotion, and righteous action.
                </p>
              </div>
            </AnimeReveal>

            <AnimeReveal direction="up" delay={160}>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  The Bhagavad Gita teaches not only the true purpose of human life but how to perform one&apos;s
                  responsibilities with sincerity, dedication, and spiritual consciousness. Lasting happiness does not
                  require changing one&apos;s circumstances — transformation begins by applying divine wisdom in daily life.
                </p>
                <p>
                  Whether you are a student, professional, entrepreneur, or homemaker, the principles of the Bhagavad
                  Gita can help you face life&apos;s challenges with wisdom and confidence.
                </p>
                
                <div className="bg-gradient-to-br from-[#072149] to-[#0a2d60] rounded-3xl p-8 relative overflow-hidden shadow-xl mt-8">
                  <div className="absolute top-4 right-6 text-white/10 text-8xl font-serif select-none leading-none">&ldquo;</div>
                  <div className="relative z-10">
                    <p className="text-white/95 text-lg leading-relaxed italic mb-6">
                      We are trying to give human society the opportunity for a life of happiness, good health,
                      peace of mind, and all good qualities through God consciousness.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 shrink-0">
                        <img src="/sp%20logo.webp" alt="Srila Prabhupada" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <p className="text-amber-400 text-sm uppercase tracking-widest" style={{ fontWeight: 600 }}>Srila Prabhupada</p>
                        <p className="text-white/60 text-xs mt-1">Founder-Acharya, ISKCON</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </AnimeReveal>
          </div>

          <AnimeReveal direction="up" delay={200}>
            <div className="mt-16 text-center max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl text-[#072149] leading-relaxed mb-8" style={{ fontWeight: 500 }}>
                As a service to humanity, we present a systematic and practical{" "}
                <span className="text-amber-600 font-semibold">6-session foundation course on Bhagavad Gita</span>, 
                designed to share the essence of eternal Vedic wisdom.
              </p>
              
              <div className="flex flex-wrap justify-center gap-3">
                {["Leadership", "Self-Discovery", "Dharma", "Decision Making", "Inner Peace", "Goal Clarity", "Purposeful Living"].map((tag) => (
                  <span key={tag} className="text-sm px-5 py-2.5 rounded-full border border-amber-200 bg-amber-50 text-[#072149] hover:bg-amber-100 transition-colors shadow-sm cursor-default" style={{ fontWeight: 500 }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </AnimeReveal>

        </div>
      </section>


      {/* ══ CURRICULUM — redesigned with image & text ════════════════════ */}
      <section id="modules" className="bg-white/80 backdrop-blur-sm px-5 sm:px-10 lg:px-20 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">

          <AnimeReveal direction="up" delay={80} className="mb-12 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-[#990000] mb-3" style={{ fontWeight: 500 }}>Curriculum</p>
            <h2 className="text-3xl md:text-5xl text-[#072149] leading-tight mb-5" style={{ fontWeight: 600 }}>
              What You Will{" "}
              <span className="font-instrument" style={{ fontStyle: "italic", fontWeight: 400 }}>Learn</span>
            </h2>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed">
              The vast knowledge of Vedic literature is condensed in Bhagavad-gita, known as the crown jewel of Vedic wisdom. The course unfolds the mystery of Gita practically and sublimely. It includes,
            </p>
          </AnimeReveal>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-4">
              {curriculumTabs.map((tab, i) => (
                <AnimeReveal key={i} direction="up" delay={100 + i * 50}>
                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="flex gap-5 items-start p-4 rounded-2xl hover:bg-white/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#072149]/5 flex items-center justify-center shrink-0 text-[#072149]">
                      <tab.Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl text-[#072149] mb-2" style={{ fontWeight: 700 }}>{tab.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{tab.desc}</p>
                    </div>
                  </motion.div>
                </AnimeReveal>
              ))}
            </div>

            <AnimeReveal direction="left" delay={120}>
              <div className="relative w-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_80px_rgba(7,33,73,0.12)] border border-white/50 group bg-white/40 backdrop-blur-xl p-4 md:p-6 lg:sticky lg:top-24">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-100/20 to-blue-50/20 pointer-events-none" />
                <img 
                  src="https://hkmdehradun.org/live-site/assets/12/curriculum.png" 
                  alt="Gita Life Course Curriculum Modules" 
                  className="w-full h-auto object-contain rounded-2xl shadow-sm transform group-hover:scale-[1.01] transition-transform duration-700 ease-out relative z-10" 
                />
              </div>
            </AnimeReveal>
          </div>

        </div>
      </section>

      {/* ══ SCROLLING BANNER ═══════════════════════════════════ */}
      <div className="bg-[#072149] text-white overflow-hidden py-4 border-y border-amber-500/30 relative z-10 flex items-center shadow-lg">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          className="flex whitespace-nowrap gap-12 w-max"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12 shrink-0">
              <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold">Hare Krishna Hare Rama</span>
              <PILotus className="w-5 h-5 text-amber-400" />
              <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold">Gita Life Course</span>
              <PISpark className="w-5 h-5 text-amber-400" />
              <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold">Transform Your Life</span>
              <PIBookOpen className="w-5 h-5 text-amber-400" />
              <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold">Spiritual Journey</span>
              <PILotus className="w-5 h-5 text-amber-400" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ══ SPECIAL FEATURES — redesigned with image & text ═════════════════ */}
      <section className="bg-white/80 backdrop-blur-3xl px-5 sm:px-10 lg:px-20 py-12 lg:py-20 relative overflow-hidden border-y border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, #000000 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-amber-400/30 blur-[80px] -translate-y-1/2 translate-x-1/4" />

        <div className="max-w-7xl mx-auto relative z-10">
          <AnimeReveal direction="up" delay={80} className="mb-14">
            <div className="max-w-3xl">
              <p className="text-amber-500 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontWeight: 500 }}>What You Get</p>
              <h2 className="text-3xl md:text-5xl text-[#072149] leading-tight mb-5" style={{ fontWeight: 600 }}>
                Special{" "}
                <span className="font-instrument" style={{ fontStyle: "italic", fontWeight: 400 }}>Features</span>
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Every detail of the Gita Life Course is designed to make your learning immersive,
                practical, and deeply personal. Here&apos;s what comes with your enrollment.
              </p>
            </div>
          </AnimeReveal>

          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16 items-center">
            
            <AnimeReveal direction="right" delay={120}>
              <div className="relative w-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_80px_rgba(7,33,73,0.12)] border border-white/50 group bg-white/40 backdrop-blur-xl p-4 md:p-6 lg:order-1 order-2 lg:sticky lg:top-24">
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-50/20 to-amber-50/20 pointer-events-none" />
                <img 
                  src="https://hkmdehradun.org/live-site/assets/12/features.png" 
                  alt="Gita Life Course Special Features" 
                  className="w-full h-auto object-contain rounded-2xl shadow-sm transform group-hover:scale-[1.01] transition-transform duration-700 ease-out relative z-10" 
                />
              </div>
            </AnimeReveal>

            <div className="grid sm:grid-cols-2 gap-6 lg:order-2 order-1">
              {specialFeatures.map(({ Icon, label, desc }, i) => (
                <AnimeReveal key={i} direction="up" delay={100 + i * 50}>
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white/40 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(11,93,183,0.08)] hover:border-white h-full transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#0B5DB7] mb-5 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg text-[#072149] mb-3" style={{ fontWeight: 700 }}>{label}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                  </motion.div>
                </AnimeReveal>
              ))}
            </div>

          </div>

        </div>
      </section>






        </div>
      </div>
    </div>
  );
}
