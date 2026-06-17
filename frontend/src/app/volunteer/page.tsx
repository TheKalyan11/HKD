"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import axios from "axios";

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
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const axis = direction === "up" || direction === "down" ? "y" : "x";
  const sign = direction === "up" || direction === "left" ? 1 : -1;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, [axis]: 32 * sign }}
      animate={inView ? { opacity: 1, [axis]: 0 } : {}}
      transition={{ duration: 0.7, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Inline SVG icons ─────────────────────────────────── */
const SvgHeart = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const SvgUsers = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87" />
    <path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const SvgLeaf = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 019.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const SvgSun = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const SvgCalendar = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const SvgGlobe = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

const SvgShield = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const SvgCheck = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SvgX = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SvgArrowRight = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */
export default function VolunteerPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [areaOfInterest, setAreaOfInterest] = useState("Temple Services & Maintenance");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setErrorMsg("Please fill out name, email, and phone.");
      return;
    }
    setErrorMsg("");
    setIsLoading(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";
      await axios.post(`${backendUrl}/api/cms/leads`, {
        name, email, phone,
        interestType: "volunteer_registration",
        targetId: areaOfInterest,
        message: msg,
      });
      setIsLoading(false);
      setSuccess(true);
      setShowPopup(true);
      setName(""); setEmail(""); setPhone(""); setMsg("");
    } catch (err) {
      console.error("Volunteer inquiry submission failed:", err);
      setErrorMsg("Failed to submit application. Try again.");
      setIsLoading(false);
    }
  };

  const serviceCategories = [
    {
      icon: <SvgSun className="w-6 h-6" />,
      title: "Daily",
      subtitle: "Services",
      color: "#072149",
      items: ["Administration", "Book distribution", "Maintenance", "Gardening", "Temple cleaning", "Goshala cleaning", "General services"],
    },
    {
      icon: <SvgCalendar className="w-6 h-6" />,
      title: "Occasional",
      subtitle: "Services",
      color: "#072149",
      items: ["Festival sevas like decoration", "Japa counter sevas", "Crowd management", "Abhishekam arrangements", "Painting"],
    },
    {
      icon: <SvgGlobe className="w-6 h-6" />,
      title: "Online",
      subtitle: "Services",
      color: "#072149",
      items: ["Video content development", "Social media", "Graphic design", "Blog writing", "Marketing"],
    },
  ];

  return (
    <div className="bg-[#FFFBF2] min-h-screen font-sans overflow-x-hidden relative">

      {/* ── HERO SECTION ──────────────────── */}
      <section className="flex items-center justify-center px-6 pt-10 pb-4">
        <h1 className="text-[#072149] font-bold text-4xl sm:text-5xl md:text-6xl tracking-wide uppercase">
          Volunteer With Us
        </h1>
      </section>

      {/* ── MAIN CONTENT (Split Layout) ───────────────── */}
      <section className="bg-[#faf9f6]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-20">
            
            {/* ── LEFT COLUMN (Info) ────────────────────── */}
            <div className="lg:col-span-7 space-y-24">
              
              {/* Intro Section */}
              <Reveal>
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[4rem] text-gray-900 leading-[1.15] mb-6 sm:mb-8 tracking-tight" style={{ fontWeight: 800 }}>
                  Offer your time,<br/>
                  <span className="font-instrument italic font-light text-orange-500">energy and love</span>
                </h2>
                <div className="space-y-6 text-gray-600 text-lg md:text-xl leading-relaxed">
                  <p>
                    <strong className="text-gray-900">To be a servant is our true identity and to serve is our true essence.</strong> What better way to serve the Lordships of Narasimha Giridhari and the devotee community, than to Volunteer with us!
                  </p>
                  <p>
                    The temple is a wonderful spiritual oasis in an otherwise materially surcharged city of Dehradun, dedicated to the spiritual upliftment of society. Get on our Volunteer team and discover the pure joy of serving selflessly.
                  </p>
                </div>
                
                <div className="mt-12 bg-white p-8 md:p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-orange-100/50 relative overflow-hidden">
                  <div className="absolute -top-10 -left-6 text-[120px] text-orange-50 font-serif leading-none opacity-80 pointer-events-none">"</div>
                  <div className="relative z-10">
                    <p className="text-2xl md:text-3xl font-instrument italic text-gray-800 leading-relaxed">
                      Devotional Service is not a job, it is a privilege.
                    </p>
                    <div className="mt-6 flex items-center gap-4">
                      <div className="w-10 h-[1px] bg-orange-300"></div>
                      <p className="text-sm font-bold tracking-widest uppercase text-orange-500">
                        Srila Prabhupada
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

            </div>

            {/* ── RIGHT COLUMN (Sticky Form) ────────────── */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-28">
                <Reveal delay={200}>
                  {/* Decorative background glow */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-orange-100 via-orange-50 to-blue-50 rounded-[48px] blur-2xl opacity-70"></div>
                  
                  <div className="relative bg-white/90 backdrop-blur-2xl rounded-[40px] p-8 sm:p-12 border border-white shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
                    <div className="text-center mb-10">
                      <h2 className="text-3xl md:text-4xl text-gray-900 mb-3" style={{ fontWeight: 800 }}>
                        Join Our Team
                      </h2>
                      <p className="text-gray-500 text-[15px]">
                        Fill out the form below and we will get in touch.
                      </p>
                    </div>

                    <form ref={formRef} onSubmit={handleRegister} className="space-y-5">
                      {errorMsg && (
                        <div className="bg-red-50 text-red-600 rounded-2xl p-4 text-sm border border-red-100 flex items-center gap-2 font-medium">
                          <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                          {errorMsg}
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-2 pl-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full bg-gray-50/50 border border-gray-200/60 rounded-2xl px-5 py-4 text-[15px] text-gray-900 focus:bg-white focus:outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-50 placeholder:text-gray-400 transition-all font-medium"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-2 pl-1">
                            Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@email.com"
                            className="w-full bg-gray-50/50 border border-gray-200/60 rounded-2xl px-5 py-4 text-[15px] text-gray-900 focus:bg-white focus:outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-50 placeholder:text-gray-400 transition-all font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-2 pl-1">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full bg-gray-50/50 border border-gray-200/60 rounded-2xl px-5 py-4 text-[15px] text-gray-900 focus:bg-white focus:outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-50 placeholder:text-gray-400 transition-all font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-2 pl-1">
                          Area of Interest
                        </label>
                        <select
                          value={areaOfInterest}
                          onChange={(e) => setAreaOfInterest(e.target.value)}
                          className="w-full bg-gray-50/50 border border-gray-200/60 rounded-2xl px-5 py-4 text-[15px] text-gray-900 focus:bg-white focus:outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-50 appearance-none cursor-pointer transition-all font-medium"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundPosition: "right 1.25rem center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "1.25em 1.25em",
                          }}
                        >
                          <option value="Temple Services & Maintenance">Temple Services &amp; Maintenance</option>
                          <option value="Food Distribution (Annadaan)">Food Distribution (Annadaan)</option>
                          <option value="Cow Protection (Gau Seva)">Cow Protection (Gau Seva)</option>
                          <option value="Events & Festivals">Events &amp; Festivals Coordination</option>
                          <option value="IT & Media">IT, Social Media &amp; Design</option>
                          <option value="Other">Other Skills</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold tracking-widest uppercase text-gray-400 mb-2 pl-1">
                          Message (Optional)
                        </label>
                        <textarea
                          value={msg}
                          onChange={(e) => setMsg(e.target.value)}
                          placeholder="Tell us about your background, skills, and availability..."
                          rows={3}
                          className="w-full bg-gray-50/50 border border-gray-200/60 rounded-2xl px-5 py-4 text-[15px] text-gray-900 focus:bg-white focus:outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-50 placeholder:text-gray-400 resize-none transition-all font-medium"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gray-900 text-white py-4 rounded-2xl text-sm font-bold tracking-wider uppercase hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
                      >
                        {isLoading ? "Submitting..." : "Submit Application"}
                        {!isLoading && <SvgArrowRight className="w-5 h-5" />}
                      </button>

                      <div className="flex items-center justify-center gap-2 pt-3 text-gray-400">
                        <SvgShield className="w-4 h-4" />
                        <span className="text-[11px] font-bold uppercase tracking-widest">Your information is secure</span>
                      </div>
                    </form>
                  </div>
                </Reveal>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── WHY VOLUNTEER (Editorial Text Style) ──────────── */}
      <section className="bg-[#faf9f6]">
          <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
            
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-gray-200 pb-10">
                <div>
                  <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-gray-900 tracking-tight leading-tight mb-3">Why<br />Volunteer?</h3>
                  <div className="w-12 h-1 rounded-full bg-orange-400"></div>
                </div>
                <p className="text-gray-400 text-lg md:text-xl font-medium max-w-sm leading-relaxed md:text-right">
                  Four reasons that will change how you see the world.
                </p>
              </div>
            </Reveal>

            <div className="space-y-0">
              {[
                {
                  num: "01",
                  title: "Spiritual Growth",
                  desc: "Engage in Seva, the highest form of spiritual practice in Vedic culture. By offering your time and energy, you transform your inner consciousness and connect deeply with the divine.",
                  accent: "text-orange-500",
                },
                {
                  num: "02",
                  title: "Community",
                  desc: "Become part of a loving, supportive community of devotees. Build lifelong friendships rooted in shared values, purpose, and a genuine desire to uplift one another.",
                  accent: "text-blue-500",
                },
                {
                  num: "03",
                  title: "Make an Impact",
                  desc: "Directly contribute to food distribution, cow protection, and powerful outreach programs. See the tangible difference your service makes in people's lives every single day.",
                  accent: "text-green-500",
                },
                {
                  num: "04",
                  title: "Find Purpose",
                  desc: "Step away from the material rush and discover true inner peace. In selfless dedication, you will find the kind of lasting fulfillment that no career or possession can ever provide.",
                  accent: "text-purple-500",
                },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="group grid md:grid-cols-12 gap-6 md:gap-12 items-start py-12 border-b border-gray-200 hover:border-gray-400 transition-colors duration-300 cursor-default">
                    {/* Number */}
                    <div className="md:col-span-1">
                      <span className={`text-sm font-black tracking-widest uppercase ${item.accent}`}>{item.num}</span>
                    </div>
                    {/* Title */}
                    <div className="md:col-span-4">
                      <h4 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-none group-hover:text-gray-600 transition-colors duration-300">{item.title}</h4>
                    </div>
                    {/* Description */}
                    <div className="md:col-span-6">
                      <p className="text-gray-500 text-lg leading-relaxed">{item.desc}</p>
                    </div>
                    {/* Arrow */}
                    <div className="md:col-span-1 flex items-start justify-end">
                      <div className={`w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-300 group-hover:border-current group-hover:${item.accent.replace('text-', 'border-')} group-hover:${item.accent} transition-all duration-300`}>
                        <SvgArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
      </section>

      {/* ── AREAS OF SEVA (Editorial Text Style) ──────────── */}
      <section className="bg-white">
          <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24">

            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-gray-200 pb-10">
                <div>
                  <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-gray-900 tracking-tight leading-tight mb-3">Areas of Seva</h3>
                  <div className="w-12 h-1 rounded-full bg-orange-400"></div>
                </div>
                <p className="text-gray-400 text-lg md:text-xl font-medium max-w-sm leading-relaxed md:text-right">
                  Explore our wide range of services and find where your passion lies.
                </p>
              </div>
            </Reveal>

            <div className="space-y-0">
              {serviceCategories.map((cat, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="group grid md:grid-cols-12 gap-6 md:gap-12 items-start py-12 border-b border-gray-200 hover:border-gray-400 transition-colors duration-300 cursor-default">
                    {/* Number */}
                    <div className="md:col-span-1">
                      <span className="text-sm font-black tracking-widest uppercase text-orange-500">0{i + 1}</span>
                    </div>
                    {/* Title */}
                    <div className="md:col-span-3">
                      <h4 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-none group-hover:text-gray-500 transition-colors duration-300">
                        {cat.title}
                        <span className="block text-base font-normal text-gray-400 mt-2 tracking-widest uppercase">{cat.subtitle}</span>
                      </h4>
                    </div>
                    {/* Items */}
                    <div className="md:col-span-7 flex flex-wrap gap-2.5">
                      {cat.items.map((item) => (
                        <span
                          key={item}
                          className="px-4 py-2 bg-gray-50 border border-gray-100 text-gray-600 text-sm rounded-xl font-medium hover:bg-orange-50 hover:text-orange-600 hover:border-orange-100 transition-all cursor-default"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    {/* Arrow */}
                    <div className="md:col-span-1 flex items-start justify-end">
                      <div className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-300 group-hover:border-orange-400 group-hover:text-orange-400 transition-all duration-300">
                        <SvgArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </section>


      {/* ── SUCCESS POPUP ────────────────────────────── */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-md p-10 shadow-2xl text-center relative"
            >
              <button
                onClick={() => { setShowPopup(false); setSuccess(false); }}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <SvgX className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                <SvgCheck className="w-8 h-8" />
              </div>

              <h3 className="text-2xl text-gray-900 mb-3 font-bold">
                Thank You!
              </h3>
              <p className="text-gray-500 leading-relaxed mb-8">
                Your application has been received. We appreciate your desire to serve and will be in touch soon!
              </p>
              <button
                onClick={() => { setShowPopup(false); setSuccess(false); }}
                className="w-full bg-orange-500 text-white py-3.5 rounded-xl text-sm font-bold tracking-wider uppercase hover:bg-orange-600 transition-all"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
