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

/* ── constants ─────────────────────────────────────────────── */
const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260602_150901_c45b90ec-18d7-42ff-90e2-b95d7109e330.mp4";

const MODULES = [
  "Gita Study",
  "Vedic Ideology",
  "Practical Spirituality",
  "Educational Tours",
  "Mantra Meditation",
  "Personal Mentoring",
  "All Topics",
];

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
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [openFeature, setOpenFeature] = useState(0);

  const toggle = (s: string) =>
    setSelected((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSending(false);
    setSent(true);
  };

  const inputClass =
    "flex-1 min-w-0 text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-transparent placeholder-gray-400 transition focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent";

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

  return (
    <div className="bg-white font-inter">

      {/* ── HERO (untouched) ──────────────────────────────────── */}
      <div className="min-h-screen p-3 sm:p-4 md:p-6">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] md:min-h-[calc(100vh-48px)] lg:h-[calc(100vh-48px)]">
          <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 to-black/75" />
          <div className="relative z-10 flex flex-col min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] md:min-h-[calc(100vh-48px)] lg:h-full p-4 sm:p-6 md:p-8 gap-6">
            <nav className="flex items-start sm:items-center justify-between w-full">
              <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-sm pl-3 sm:pl-4 pr-2 py-2 flex items-center gap-3 sm:gap-6 w-full sm:w-auto">
                <div className="shrink-0 w-8 h-8 text-gray-900"><PILotus className="w-8 h-8" /></div>
                <div className="hidden sm:flex items-center gap-5">
                  {["About", "Modules", "Mentors", "Enroll"].map((l) => (
                    <a key={l} href={`#${l.toLowerCase()}`} className="text-gray-800 text-sm hover:opacity-60 transition-opacity whitespace-nowrap">{l}</a>
                  ))}
                </div>
                <button className="ml-auto sm:ml-0 bg-black text-white text-sm px-4 sm:px-5 py-2 rounded-xl hover:bg-gray-800 transition-colors" style={{ fontWeight: 500 }}>
                  Enroll Now
                </button>
              </div>
            </nav>
            <div className="flex-1 min-h-[2rem]" />
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="lg:max-w-lg xl:max-w-2xl shrink-0">
                <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontWeight: 500 }}>
                  Hare Krishna Dehradun &bull; ISKCON
                </p>
                <p className="text-white text-3xl sm:text-4xl xl:text-5xl leading-tight drop-shadow-lg" style={{ fontWeight: 500 }}>
                  Discover life&apos;s purpose<br />
                  through the{" "}
                  <span className="font-instrument" style={{ fontStyle: "italic", fontWeight: 400 }}>Bhagavad Gita</span>
                </p>
                <p className="text-white/65 text-base mt-4 max-w-md leading-relaxed">
                  A transformative journey into Vedic wisdom — with mentors who live what they teach.
                </p>
              </div>
              <div id="enroll" className="w-full lg:w-[min(480px,45%)] shrink-0">
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
                  <div className="p-4 sm:p-6 flex flex-col gap-4">
                    {!sent ? (
                      <>
                        <h2 className="text-xl sm:text-2xl text-black tracking-tight" style={{ fontWeight: 600 }}>Enroll Today! 🙏</h2>
                        <div className="flex flex-row items-center justify-between gap-3 bg-gray-50 rounded-2xl px-4 py-2.5">
                          <div className="min-w-0">
                            <p className="text-gray-400 text-xs mb-0.5">Drop us a line</p>
                            <a href="mailto:dehradun@harekrishna.com" className="text-blue-600 text-sm truncate hover:underline block" style={{ fontWeight: 600 }}>dehradun@harekrishna.com</a>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <SocialBtn className="bg-gray-100 text-gray-800"><SvgX /></SocialBtn>
                            <SocialBtn className="bg-pink-100 text-pink-500"><SvgStar /></SocialBtn>
                            <SocialBtn className="bg-orange-100 text-orange-400"><SvgInstagram /></SocialBtn>
                            <SocialBtn className="bg-blue-100 text-blue-600"><SvgLinkedin /></SocialBtn>
                          </div>
                        </div>
                        <div className="flex items-center gap-3"><div className="flex-1 h-px bg-gray-200" /><span className="text-gray-400 text-sm" style={{ fontWeight: 500 }}>OR</span><div className="flex-1 h-px bg-gray-200" /></div>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                          <div>
                            <label className="text-sm text-black block mb-2" style={{ fontWeight: 500 }}>Tell us about yourself</label>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className={inputClass} />
                              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className={inputClass} />
                            </div>
                          </div>
                          <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What brings you to this course? Any questions for your mentor..." className={`${inputClass} resize-none`} />
                          <div>
                            <p className="text-sm text-black mb-2" style={{ fontWeight: 500 }}>I&apos;m interested in&hellip;</p>
                            <div className="flex flex-wrap gap-1.5">
                              {MODULES.map((mod) => (
                                <button key={mod} type="button" onClick={() => toggle(mod)} className={`text-xs px-3 py-2 rounded-lg border transition-all ${selected.includes(mod) ? "bg-gray-100 text-black border-black" : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"}`}>{mod}</button>
                              ))}
                            </div>
                          </div>
                          <button type="submit" disabled={sending} className="w-full bg-black text-white text-sm py-3 rounded-2xl hover:bg-gray-800 transition-colors disabled:opacity-60" style={{ fontWeight: 600 }}>{sending ? "Sending…" : "Send Enrollment Request"}</button>
                        </form>
                      </>
                    ) : (
                      <div className="flex flex-col items-center py-6 gap-3">
                        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-xl">&#10003;</div>
                        <p className="text-base text-gray-900" style={{ fontWeight: 600 }}>You&apos;re all set!</p>
                        <p className="text-sm text-gray-500">Expect a reply within 24 hours.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ── end hero ──────────────────────────────────────────── */}
      <div className="relative w-full">
        {/* Mantra and Icon Watermark Background */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none flex flex-col justify-evenly opacity-[0.03] select-none" style={{ minHeight: '100%' }}>
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="flex items-center gap-10 whitespace-nowrap -rotate-3 scale-110 translate-x-[-10%]">
              {Array.from({ length: 10 }).map((_, j) => (
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




      {/* ══ ABOUT — narrative + sticky panel ═══════════════════ */}
      <section id="about" className="bg-[#FFFBF2]/80 backdrop-blur-sm px-5 sm:px-10 lg:px-20 py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <AnimeReveal direction="up" delay={80}>
            <p className="text-xs uppercase tracking-[0.3em] text-[#990000] mb-3" style={{ fontWeight: 500 }}>About the Course</p>
          </AnimeReveal>

          <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-start">

            <AnimeReveal direction="left" delay={140}>
              <h2 className="text-3xl md:text-4xl text-[#072149] mb-10 leading-tight" style={{ fontWeight: 600 }}>
                From the Battlefield{" "}
                <span className="font-instrument" style={{ fontStyle: "italic", fontWeight: 400 }}>of Kurukshetra</span>
              </h2>

              <div className="space-y-6 text-gray-600 text-base leading-[1.9]">
                <p>
                  One of India&apos;s greatest spiritual gifts to the world is the{" "}
                  <strong className="text-[#072149]">Shrimad Bhagavad Gita</strong>. Spoken by{" "}
                  <strong className="text-[#072149]">Lord Sri Krishna</strong>, it is a profound guide to leadership,
                  self-discovery, and purposeful living — revealed on the battlefield of Kurukshetra during a moment of
                  intense crisis faced by Arjuna.
                </p>
                <p>
                  More than 5,000 years ago, just before the great war began, Arjuna became overwhelmed with fear,
                  confusion, and sorrow. His body trembled, his mouth dried up, and he set aside his bow and arrows.
                </p>

                {/* Interactive quote widget */}
                <div className="relative bg-gradient-to-br from-[#072149] to-[#0a2d60] rounded-2xl p-8 my-8 overflow-hidden">
                  <div className="absolute top-4 right-6 text-white/8 text-8xl font-serif select-none leading-none">&ldquo;</div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-amber-400/10 blur-2xl translate-x-1/3 translate-y-1/3" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-8 rounded-full bg-amber-400" />
                      <p className="text-amber-400 text-xs uppercase tracking-widest" style={{ fontWeight: 600 }}>From the Gita</p>
                    </div>
                    <p className="text-white/90 text-lg leading-relaxed italic">
                      In this moment of uncertainty, Arjuna raised profound questions about duty, life, morality,
                      and the purpose of existence. Lord Krishna spoke the eternal wisdom — illuminating the path
                      of knowledge, devotion, and righteous action.
                    </p>
                  </div>
                </div>

                <p>
                  The Bhagavad Gita teaches not only the true purpose of human life but how to perform one&apos;s
                  responsibilities with sincerity, dedication, and spiritual consciousness. Lasting happiness does not
                  require changing one&apos;s circumstances — transformation begins by applying divine wisdom in daily life.
                </p>
                <p>
                  Whether you are a student, professional, entrepreneur, or homemaker, the principles of the Bhagavad
                  Gita can help you face life&apos;s challenges with wisdom and confidence.
                </p>

                <div className="border-l-4 border-amber-400 pl-5 py-1">
                  <p className="text-[#072149] text-base leading-relaxed" style={{ fontWeight: 500 }}>
                    As a service to humanity, we present a systematic and practical{" "}
                    <strong>6-session foundation course on Bhagavad Gita</strong>, designed to share the essence
                    of eternal Vedic wisdom.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {["Leadership", "Self-Discovery", "Dharma", "Decision Making", "Inner Peace", "Goal Clarity", "Purposeful Living"].map((tag) => (
                  <span key={tag} className="text-xs px-3.5 py-2 rounded-full border border-[#072149]/15 bg-[#072149]/5 text-[#072149] hover:bg-[#072149]/10 transition-colors cursor-default" style={{ fontWeight: 500 }}>{tag}</span>
                ))}
              </div>
            </AnimeReveal>

            {/* Sticky panel */}
            <AnimeReveal direction="right" delay={220}>
              <div className="lg:sticky lg:top-28 space-y-5">

                {/* GLC card with progress-like visual */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-[0_4px_24px_rgba(7,33,73,0.08)] overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400" />
                  <div className="p-7">
                    <div className="w-12 h-12 text-[#072149] mb-4"><PIBookOpen className="w-12 h-12" /></div>
                    <h3 className="text-[#072149] text-lg mb-3" style={{ fontWeight: 600 }}>Gita Life Course (GLC)</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      A comprehensive training program aimed at learning the basics of the Gita and its application in life.
                      The course equips candidates with powerful life tools to set the right goals and make clear decisions.
                    </p>
                    <div className="mt-5 pt-5 border-t border-gray-100">
                      <p className="text-amber-600 text-sm italic" style={{ fontWeight: 500 }}>
                        &ldquo;Enter the gateway to an elated and enlightened life.&rdquo;
                      </p>
                    </div>
                  </div>
                </div>

                {/* Live stats widget */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-[0_4px_24px_rgba(7,33,73,0.08)] p-7">
                  <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-5" style={{ fontWeight: 500 }}>Course at a Glance</p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: 6, suffix: "", label: "Sessions", icon: <PISpark className="w-5 h-5" /> },
                      { value: 500, suffix: "+", label: "Graduates", icon: <PIMentor className="w-5 h-5" /> },
                      { value: 100, suffix: "%", label: "Mentor-Led", icon: <PILotus className="w-5 h-5" /> },
                      { value: 5000, suffix: "+", label: "Yrs of Wisdom", icon: <PIBookOpen className="w-5 h-5" /> },
                    ].map(({ value, suffix, label, icon }, i) => (
                      <div key={i} className="bg-gray-50 rounded-xl p-4 text-center group hover:bg-[#072149] transition-colors duration-300">
                        <div className="w-6 h-6 text-[#072149] mx-auto mb-2 group-hover:text-amber-400 transition-colors duration-300">{icon}</div>
                        <p className="text-xl text-[#072149] group-hover:text-white transition-colors duration-300" style={{ fontWeight: 700 }}>
                          <AnimatedCounter target={value} suffix={suffix} />
                        </p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider group-hover:text-white/50 transition-colors duration-300">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prabhupada quote */}
                <div className="bg-[#072149] rounded-2xl p-7 relative overflow-hidden">
                  <div className="absolute top-3 right-4 text-white/8 text-7xl font-serif leading-none select-none">&ldquo;</div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-amber-400/10 blur-2xl -translate-x-1/2 translate-y-1/2" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 text-amber-400 mb-4"><PILotus className="w-10 h-10" /></div>
                    <p className="text-white/90 text-sm leading-relaxed italic mb-5">
                      We are trying to give human society the opportunity for a life of happiness, good health,
                      peace of mind, and all good qualities through God consciousness.
                    </p>
                    <div className="h-px w-10 bg-amber-400/40 mb-3" />
                    <p className="text-amber-400 text-xs uppercase tracking-widest" style={{ fontWeight: 600 }}>Srila Prabhupada</p>
                    <p className="text-white/35 text-xs mt-0.5">Founder-Acharya, ISKCON</p>
                  </div>
                </div>

              </div>
            </AnimeReveal>

          </div>
        </div>
      </section>


      {/* ══ CURRICULUM — tabbed interactive ════════════════════ */}
      <section id="modules" className="bg-white/80 backdrop-blur-sm px-5 sm:px-10 lg:px-20 py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">

          <AnimeReveal direction="up" delay={80} className="mb-16 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-[#990000] mb-3" style={{ fontWeight: 500 }}>Curriculum</p>
            <h2 className="text-3xl md:text-4xl text-[#072149] leading-tight mb-5" style={{ fontWeight: 600 }}>
              The crown jewel of Vedic wisdom,{" "}
              <span className="font-instrument" style={{ fontStyle: "italic", fontWeight: 400 }}>unfolded</span>{" "}
              practically and sublimely.
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              The vast knowledge of Vedic literature is condensed in the Bhagavad-gita. Our 6-module curriculum
              takes you from foundational study to personal transformation.
            </p>
          </AnimeReveal>

          {/* Vertical Timeline */}
          <div className="relative mt-20 max-w-5xl mx-auto">
            {/* The Line */}
            <div className="absolute left-[28px] lg:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-200 via-amber-400 to-amber-200 lg:-translate-x-1/2 rounded-full opacity-50" />

            <div className="space-y-16 lg:space-y-24">
              {curriculumTabs.map((tab, i) => {
                const isEven = i % 2 === 0;
                return (
                  <AnimeReveal key={i} direction={isEven ? "right" : "left"} delay={100}>
                    <div className={`relative flex flex-col lg:flex-row items-center ${isEven ? 'lg:flex-row-reverse' : ''} gap-8 lg:gap-16`}>
                      
                      {/* Timeline Node */}
                      <div className="absolute left-[28px] lg:left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full border-4 border-amber-50 shadow-[0_0_20px_rgba(251,191,36,0.3)] flex items-center justify-center z-10 shrink-0">
                        <tab.Icon className="w-6 h-6 text-amber-500" />
                      </div>

                      {/* Spacer for desktop layout balance */}
                      <div className="hidden lg:block w-1/2 shrink-0" />

                      {/* Card Content */}
                      <div className="w-full lg:w-1/2 pl-[80px] lg:pl-0">
                        <motion.div 
                          whileHover={{ y: -5, scale: 1.02 }}
                          className={`bg-white/60 backdrop-blur-xl border border-white/80 p-6 lg:p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(11,93,183,0.08)] transition-all duration-300 relative overflow-hidden group ${!isEven ? 'lg:mr-8' : 'lg:ml-8'}`}
                        >
                          {/* Accent Gradient */}
                          <div className={`absolute top-0 ${isEven ? 'right-0 rounded-bl-full' : 'left-0 rounded-br-full'} w-32 h-32 opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-br from-amber-300 to-transparent pointer-events-none`} />
                          
                          <div className="flex items-center gap-3 mb-4 relative z-10">
                            <span className="text-sm font-bold text-amber-500 tracking-widest uppercase">Module {String(i + 1).padStart(2, '0')}</span>
                            <div className="h-[1px] w-10 bg-amber-200" />
                          </div>
                          
                          <h3 className="text-2xl text-[#072149] mb-4 relative z-10" style={{ fontWeight: 700 }}>{tab.title}</h3>
                          <p className="text-gray-600 mb-6 relative z-10 leading-relaxed">{tab.desc}</p>
                          
                          <div className="space-y-3 relative z-10">
                            {tab.highlights.map((h, hi) => (
                              <div key={hi} className="flex items-start gap-3">
                                <div className="mt-1 w-5 h-5 rounded-full bg-[#072149]/5 flex items-center justify-center shrink-0">
                                  <div className="w-2 h-2 rounded-full bg-[#072149]" />
                                </div>
                                <span className="text-sm text-gray-700 font-medium">{h}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      </div>

                    </div>
                  </AnimeReveal>
                );
              })}
            </div>
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

      {/* ══ SPECIAL FEATURES — dark accordion ═════════════════ */}
      <section className="bg-white/80 backdrop-blur-sm/60 backdrop-blur-3xl px-5 sm:px-10 lg:px-20 py-12 lg:py-16 relative overflow-hidden border-y border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, #000000 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-amber-400/30 blur-[80px] -translate-y-1/2 translate-x-1/4" />

        <div className="max-w-5xl mx-auto relative z-10">
          <AnimeReveal direction="up" delay={80} className="mb-14">
            <div className="grid lg:grid-cols-2 gap-8 items-end">
              <div>
                <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-3" style={{ fontWeight: 500 }}>What You Get</p>
                <h2 className="text-3xl md:text-4xl text-[#072149] leading-tight" style={{ fontWeight: 600 }}>
                  Special{" "}
                  <span className="font-instrument" style={{ fontStyle: "italic", fontWeight: 400 }}>Features</span>
                </h2>
              </div>
              <p className="text-[#072149]/70 text-sm leading-relaxed">
                Every detail of the Gita Life Course is designed to make your learning immersive,
                practical, and deeply personal. Here&apos;s what comes with your enrollment.
              </p>
            </div>
          </AnimeReveal>

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {specialFeatures.map(({ Icon, label, desc }, i) => (
              <AnimeReveal key={i} direction="up" delay={100 + i * 60}>
                <motion.div 
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", bounce: 0.4 }}
                  className="bg-white/40 backdrop-blur-xl border border-white/60 p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(11,93,183,0.08)] hover:border-white group relative overflow-hidden h-full flex flex-col"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-300/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#0B5DB7] mb-6 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-md transition-all duration-300 relative z-10 shrink-0">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl text-[#072149] mb-3 relative z-10" style={{ fontWeight: 700 }}>{label}</h3>
                  <p className="text-gray-600 leading-relaxed relative z-10">{desc}</p>
                </motion.div>
              </AnimeReveal>
            ))}
          </div>
        </div>
      </section>




      {/* ══ CTA ═══════════════════════════════════════════════ */}
      <section className="bg-white/80 backdrop-blur-sm px-5 sm:px-10 lg:px-20 py-16 lg:py-10 lg:py-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#072149]/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-amber-400/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-[#990000]/10" />
        </div>

        <AnimeReveal direction="up" delay={100}>
          <div className="relative z-10">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="w-14 h-14 text-[#072149] mx-auto mb-8"
            >
              <PILotus className="w-14 h-14" />
            </motion.div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#990000] mb-4" style={{ fontWeight: 500 }}>Begin Your Journey</p>
            <h2 className="text-4xl md:text-6xl text-[#072149] mb-6 leading-tight" style={{ fontWeight: 600 }}>
              Ready to{" "}
              <span className="font-instrument" style={{ fontStyle: "italic", fontWeight: 400 }}>Transform?</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed max-w-lg mx-auto mb-12">
              Join the Gita Life Course at Hare Krishna Dehradun and discover the eternal wisdom
              that has guided millions toward a life of purpose, clarity, and joy.
            </p>
            <div className="flex items-center justify-center gap-5 flex-wrap">
              <motion.a
                href="#enroll"
                whileHover={{ y: -3, boxShadow: "0 16px 40px rgba(7,33,73,0.2)" }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#072149] text-white text-sm px-10 py-4 rounded-full hover:bg-[#0a2d60] transition-colors duration-200 inline-flex items-center gap-3 shadow-lg"
                style={{ fontWeight: 600 }}
              >
                Enroll Now
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
              <motion.a
                href="/about"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="border-2 border-[#072149]/20 text-[#072149] text-sm px-10 py-4 rounded-full hover:border-[#072149] transition-colors duration-200"
                style={{ fontWeight: 500 }}
              >
                Learn About ISKCON
              </motion.a>
            </div>
          </div>
        </AnimeReveal>
      </section>

        </div>
      </div>
    </div>
  );
}
