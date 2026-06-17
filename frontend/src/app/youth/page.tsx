"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const FOLK_NAV = [
  { label: 'Home', href: '/youth' },
  { label: 'About Us', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Highlights', href: '#highlights' },
  { label: 'Our Mission', href: '#mission' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '#contact' },
];

const HIGHLIGHTS = [
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M16.36 16.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M16.36 7.64l1.42-1.42" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="5"/>
      </svg>
    ),
    title: 'Talk',
    desc: 'Inspiring discourses on Bhagavad Gita wisdom',
  },
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M12 6v6l4 2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Meditation',
    desc: 'Guided mantra meditation sessions',
  },
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="6" cy="18" r="3"/>
        <circle cx="18" cy="16" r="3"/>
      </svg>
    ),
    title: 'Kirtan',
    desc: 'Soul-stirring devotional music and chanting',
  },
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 1v3M10 1v3M14 1v3" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Prasadam',
    desc: 'Sanctified vegetarian feast for all',
  },
];

const PROGRAMS = [
  {
    title: 'Events That Enlighten',
    desc: 'Discover the joy of spiritual growth through diverse programs including festivals, cultural events, and thought-provoking seminars that open new doors of understanding.',
    img: '/darshan/DSC04178.JPG',
  },
  {
    title: 'Life Coaching That Transforms',
    desc: 'Our experienced mentors provide personalized spiritual guidance, helping you navigate life\'s challenges with clarity, confidence, and a sense of purpose rooted in Vedic wisdom.',
    img: '/darshan/DSC04071.JPG',
  },
  {
    title: 'Retreats That Rejuvenate',
    desc: 'Step away from the daily grind and immerse yourself in weekend retreats filled with meditation, yoga, nature walks, and contemplative activities that recharge your soul.',
    img: '/darshan/DSC04083.JPG',
  },
  {
    title: 'A Community That Cares',
    desc: 'Join a warm, supportive fellowship of like-minded youth. Build genuine friendships, share experiences, and grow together in an atmosphere of love, respect, and devotion.',
    img: '/deity-1.jpg',
  },
];

export default function YouthFOLKPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState('Talk');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setSending(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
      await axios.post(`${backendUrl}/api/cms/leads`, {
        name, email, phone,
        interestType: 'folk_registration',
        targetId: program,
        message: `Interested in: ${program}`,
      });
      setSent(true);
    } catch (err) {
      console.error('FOLK registration failed:', err);
    }
    setSending(false);
  };

  const folkFont = { fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" };

  return (
    <div className="w-full" style={folkFont}>

      {/* ── FOLK NAVBAR ──────────────────────────────────── */}
      <nav className="w-full shadow-lg" style={{ background: 'linear-gradient(180deg, #000000 0%, #02144c 50%, #173978 100%)' }}>
        {/* Logo row */}
        <div className="flex items-center justify-center py-6">
          <div className="text-center">
            <h2 className="text-[33px] font-bold tracking-wide" style={{ color: '#ffffff' }}>
              <span className="text-[#f5c518]">f</span>
              <span className="text-white/60 text-[26px]">o</span>
              <span className="text-white">l</span>
              <span className="text-[#f5c518]">k</span>
            </h2>
            <p className="text-[13px] tracking-[0.3em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.7)' }}>Youth Empowerment Club</p>
          </div>
        </div>

        {/* Nav links row */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center justify-center gap-0 flex-wrap">
              {FOLK_NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-4 md:px-6 py-3 text-[16px] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5c518]"
                  style={{ color: '#f5c518' }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO BANNER ──────────────────────────────────── */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src="/darshan/DSC04179.JPG"
          alt="FOLK Dehradun"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(2,20,76,0.85) 0%, rgba(2,20,76,0.3) 50%, transparent 100%)' }} />
        <div className="relative z-10 h-full flex flex-col items-center justify-end pb-12 md:pb-16 text-center px-6">
          <Reveal>
            <h1 className="font-bold tracking-tight drop-shadow-xl mb-4" style={{ fontSize: '41px', color: '#ffffff', lineHeight: 1.1 }}>
              <span className="block text-[40px] md:text-[56px] lg:text-[64px]">Friends of <span style={{ color: '#f5c518' }}>Lord Krishna</span></span>
            </h1>
            <p className="max-w-2xl mx-auto" style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', lineHeight: '28px' }}>
              A Youth Empowerment Club of Hare Krishna Movement Dehradun, guided by the timeless wisdom of the Bhagavad Gita.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── ABOUT US ─────────────────────────────────────── */}
      <section id="about" className="py-16 md:py-24" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="overflow-hidden shadow-xl" style={{ borderRadius: '6px' }}>
                <img
                  src="/deity-2.jpg"
                  alt="FOLK Community"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div>
                <h2 className="font-bold mb-6" style={{ fontSize: '40px', color: '#04235f', lineHeight: 1.15 }}>
                  About <span style={{ color: '#f5c518' }}>FOLK</span>
                </h2>
                <p className="mb-6" style={{ fontSize: '18px', color: '#6d6d6d', lineHeight: '28px' }}>
                  Welcome to FOLK Dehradun, a Youth Empowerment Club of Hare Krishna Movement Dehradun. We are dedicated to fostering a deeper understanding of life&apos;s purpose and the art of living through the teachings of the Bhagavad Gita.
                </p>
                <p className="mb-8" style={{ fontSize: '18px', color: '#6d6d6d', lineHeight: '28px' }}>
                  Our programs are designed to help young professionals and students navigate modern challenges by tapping into timeless Vedic wisdom, providing practical tools for mind control, emotional stability, and true personality development.
                </p>
                <Link
                  href="#programs"
                  className="inline-flex items-center gap-2 px-8 py-3 text-white font-semibold transition-colors duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5c518]"
                  style={{ backgroundColor: '#02144c', borderRadius: '50px', fontSize: '16px' }}
                >
                  Explore Programs <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROGRAMS (4 Cards) ──────────────────── */}
      <section id="programs" className="py-16 md:py-24" style={{ backgroundColor: '#f5f3ef' }}>
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <h2 className="font-bold mb-4" style={{ fontSize: '40px', color: '#04235f' }}>What We Offer</h2>
              <p style={{ fontSize: '18px', color: '#6d6d6d' }} className="max-w-2xl mx-auto">Transformative programs designed for the modern youth</p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-8">
            {PROGRAMS.map((prog, i) => (
              <Reveal key={prog.title} delay={i * 0.1}>
                <div className="bg-white overflow-hidden group transition-shadow duration-300 hover:shadow-2xl" style={{ borderRadius: '6px', boxShadow: 'rgba(0,0,0,0.14) 0px 0px 3px 2px' }}>
                  <div className="h-56 overflow-hidden">
                    <img
                      src={prog.img}
                      alt={prog.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold mb-3" style={{ fontSize: '22px', color: '#04235f' }}>{prog.title}</h3>
                    <p style={{ fontSize: '16px', color: '#6d6d6d', lineHeight: '24px' }}>{prog.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS OF PROGRAM ────────────────────────── */}
      <section id="highlights" className="py-16 md:py-24" style={{ background: 'linear-gradient(180deg, #02144c 0%, #173978 100%)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <h2 className="font-bold mb-4" style={{ fontSize: '40px', color: '#ffffff' }}>Highlights of Program</h2>
              <div className="inline-block font-bold px-8 py-3 mt-4" style={{ backgroundColor: '#f5c518', color: '#02144c', fontSize: '20px', borderRadius: '50px' }}>
                6:15 PM to 8:40 PM
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {HIGHLIGHTS.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-4 transition-colors duration-200" style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '2px solid rgba(245,197,24,0.5)', color: '#f5c518' }}>
                    {item.icon}
                  </div>
                  <h3 className="font-bold mb-1" style={{ fontSize: '18px', color: '#ffffff' }}>{item.title}</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR MISSION ──────────────────────────────────── */}
      <section id="mission" className="py-16 md:py-24" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div>
                <h2 className="font-bold mb-6" style={{ fontSize: '40px', color: '#04235f' }}>Our Mission</h2>
                <p className="mb-6" style={{ fontSize: '18px', color: '#6d6d6d', lineHeight: '28px' }}>
                  At FOLK Dehradun, our mission is to empower youth with spiritual knowledge and practical wisdom. We believe that every young person deserves access to the transformative teachings that can help them lead a life of purpose, balance, and genuine happiness.
                </p>
                <p className="mb-6" style={{ fontSize: '18px', color: '#6d6d6d', lineHeight: '28px' }}>
                  Through engaging events, expert life coaching, rejuvenating retreats, and a caring community, we provide a holistic environment for personal and spiritual growth rooted in the ancient Vedic tradition.
                </p>
                <ul className="space-y-3">
                  {[
                    'Overcome stress and anxiety through meditation',
                    'Build authentic, meaningful relationships',
                    'Develop leadership and communication skills',
                    'Find a deeper spiritual purpose in life',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#f5c518' }}>
                        <svg className="w-3 h-3" style={{ color: '#02144c' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="font-medium" style={{ fontSize: '16px', color: '#212529' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="overflow-hidden shadow-xl" style={{ borderRadius: '6px' }}>
                <img
                  src="/darshan/DSC04180.JPG"
                  alt="FOLK Mission"
                  className="w-full h-[400px] object-cover object-top"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CONTACT / REGISTER FORM ──────────────────────── */}
      <section id="contact" className="py-16 md:py-24" style={{ backgroundColor: '#f5f3ef' }}>
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <div className="bg-white overflow-hidden" style={{ borderRadius: '6px', boxShadow: 'rgba(0,0,0,0.14) 0px 0px 3px 2px' }}>
              <div className="px-8 py-6 text-center" style={{ background: 'linear-gradient(90deg, #02144c, #173978)' }}>
                <h2 className="font-bold" style={{ fontSize: '30px', color: '#ffffff' }}>Join FOLK Dehradun</h2>
                <p className="mt-1" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Register for our upcoming sessions</p>
              </div>

              <div className="p-8">
                {!sent ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block mb-2 font-semibold uppercase tracking-wider" style={{ fontSize: '12px', color: '#6d6d6d' }}>Full Name</label>
                      <input
                        value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
                        className="w-full px-4 py-3 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173978]"
                        style={{ border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px', color: '#212529' }}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 font-semibold uppercase tracking-wider" style={{ fontSize: '12px', color: '#6d6d6d' }}>Email</label>
                        <input
                          type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address"
                          className="w-full px-4 py-3 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173978]"
                          style={{ border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px', color: '#212529' }}
                        />
                      </div>
                      <div>
                        <label className="block mb-2 font-semibold uppercase tracking-wider" style={{ fontSize: '12px', color: '#6d6d6d' }}>Phone</label>
                        <input
                          type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number"
                          className="w-full px-4 py-3 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173978]"
                          style={{ border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px', color: '#212529' }}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block mb-2 font-semibold uppercase tracking-wider" style={{ fontSize: '12px', color: '#6d6d6d' }}>Select Program</label>
                      <select
                        value={program} onChange={e => setProgram(e.target.value)}
                        className="w-full px-4 py-3 bg-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173978]"
                        style={{ border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px', color: '#212529' }}
                      >
                        <option>Talk</option>
                        <option>Meditation</option>
                        <option>Kirtan</option>
                        <option>Prasadam</option>
                        <option>All Programs</option>
                      </select>
                    </div>
                    <button
                      type="submit" disabled={sending}
                      className="w-full font-bold py-3.5 tracking-wide transition-colors duration-200 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#02144c]"
                      style={{ backgroundColor: '#f5c518', color: '#02144c', fontSize: '18px', borderRadius: '50px', border: 'none' }}
                    >
                      {sending ? 'Submitting...' : 'Register Now'}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center text-green-600 text-3xl mx-auto mb-4">&#10003;</div>
                    <p className="font-bold" style={{ fontSize: '20px', color: '#04235f' }}>You&apos;re Registered!</p>
                    <p className="mt-2" style={{ fontSize: '16px', color: '#6d6d6d' }}>We&apos;ll reach out to you with session details soon.</p>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <section className="py-16" style={{ background: 'linear-gradient(90deg, #02144c, #173978)' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-bold mb-4" style={{ fontSize: '33px', color: '#ffffff' }}>Begin Your Journey Inward</h2>
            <p className="max-w-2xl mx-auto mb-8" style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', lineHeight: '28px' }}>
              Experience the joy of self-realization. Join youth who have transformed their lives through the FOLK program.
            </p>
            <Link
              href="/volunteer"
              className="inline-flex items-center gap-2 px-10 py-4 font-bold transition-colors duration-200 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5c518]"
              style={{ backgroundColor: '#f5c518', color: '#02144c', fontSize: '18px', borderRadius: '50px' }}
            >
              Join FOLK Today <ArrowRight className="w-5 h-5" />
            </Link>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
