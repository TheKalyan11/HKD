"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Brain, Leaf, Users, Star, Compass, ArrowRight, Heart } from 'lucide-react';
import Link from 'next/link';

// Helper component for fade-up animations
const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function YouthFOLKPage() {
  return (
    <div 
      className="w-full bg-[#faf8f5] font-sans relative"
      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='800' height='400' viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23cca75b' stroke-width='2' opacity='0.15'%3E%3Cg transform='translate(100, 50) scale(1.5)'%3E%3Cpath d='M20 5C20 5 10 15 20 35C30 15 20 5 20 5Z'/%3E%3Cpath d='M20 35C10 30 5 20 10 12C15 12 18 25 20 35Z'/%3E%3Cpath d='M20 35C30 30 35 20 30 12C25 12 22 25 20 35Z'/%3E%3C/g%3E%3Cg transform='translate(300, 50) scale(1.5)'%3E%3Ccircle cx='20' cy='10' r='4'/%3E%3Cpath d='M20 15 L20 25 M10 20 L30 20 M10 35 C10 35 15 25 20 25 C25 25 30 35 30 35 M10 35 L30 35'/%3E%3C/g%3E%3Cg transform='translate(500, 50) scale(1.5)'%3E%3Ccircle cx='20' cy='20' r='10' stroke-dasharray='2 2'/%3E%3Cpath d='M20 10 C25 10 30 15 30 20 C30 25 25 30 20 30 C15 30 10 25 10 20 C10 17 12 15 15 15 C17 15 18 17 18 18 C18 19 17 20 16 20'/%3E%3Cpath d='M20 0L20 5 M20 35L20 40 M0 20L5 20 M35 20L40 20 M5 5L10 10 M30 30L35 35 M5 35L10 30 M30 10L35 5'/%3E%3C/g%3E%3Cg transform='translate(700, 50) scale(1.5)'%3E%3Cpath d='M12 25 L12 10 A3 3 0 0 1 18 10 L18 20 M18 15 L18 5 A3 3 0 0 1 24 5 L24 20 M24 15 L24 8 A3 3 0 0 1 30 8 L30 25 C30 35 20 40 12 35 C8 32 5 28 5 25 L5 15 A3 3 0 0 1 11 15 L11 25'/%3E%3Cpath d='M15 25 C18 25 20 27 20 30 C20 32 18 34 16 34 C14 34 12 32 12 30 C12 29 13 28 14 28'/%3E%3C/g%3E%3Cg transform='translate(200, 200) scale(1.5)'%3E%3Ccircle cx='20' cy='6' r='4'/%3E%3Cpath d='M12 16 Q20 13 28 16 L33 28 Q28 25 20 25 Q12 25 7 28 Z'/%3E%3Cpath d='M20 18 L20 24'/%3E%3Cpath d='M5 32 Q20 27 35 32 Q30 38 20 38 Q10 38 5 32 Z'/%3E%3C/g%3E%3Cg transform='translate(400, 200) scale(1.5)'%3E%3Cpath d='M22 5 A 15 15 0 1 0 22 35 A 12 12 0 1 1 22 5 Z'/%3E%3Cpath d='M8 20 L12 20 M10 18 L10 22'/%3E%3C/g%3E%3Cg transform='translate(600, 200) scale(1.5)'%3E%3Cpath d='M20 5 C28 5 30 15 20 18 C18 12 22 10 20 5'/%3E%3Cpath d='M10 25 C5 18 10 10 16 16 C12 18 10 15 10 25'/%3E%3Cpath d='M30 25 C35 18 30 10 24 16 C28 18 30 15 30 25'/%3E%3Cpath d='M10 25 Q20 35 30 25'/%3E%3Ccircle cx='20' cy='22' r='2'/%3E%3C/g%3E%3C/g%3E%3Ctext x='400' y='140' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Krishna Hare Krishna, Krishna Krishna Hare Hare%3C/text%3E%3Ctext x='400' y='165' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Rama Hare Rama, Rama Rama Hare Hare%3C/text%3E%3Ctext x='400' y='340' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Krishna Hare Krishna, Krishna Krishna Hare Hare%3C/text%3E%3Ctext x='400' y='365' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Rama Hare Rama, Rama Rama Hare Hare%3C/text%3E%3C/svg%3E\")", backgroundRepeat: 'repeat', backgroundSize: '600px 300px' }}
    >
      
      {/* ── HERO SECTION ──────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden z-10">
        
        {/* Soft Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-orange-200/40 rounded-full blur-[100px] mix-blend-multiply opacity-70" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-blue-200/40 rounded-full blur-[100px] mix-blend-multiply opacity-70" />
          <div className="absolute top-[20%] left-[20%] w-[20rem] h-[20rem] bg-[#cca75b]/20 rounded-full blur-[80px] mix-blend-multiply opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <Reveal delay={0.1}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#cca75b]/30 text-[#0c4a8a] text-sm font-bold tracking-widest uppercase shadow-sm mb-6">
              <Star className="w-4 h-4 text-[#cca75b]" />
              <span>Youth Empowerment Club</span>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-serif font-black text-[#072149] tracking-tight leading-[1.05] mb-6">
              Friends of <span className="text-[#ea580c]">Lord Krishna</span>
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
              A highly systematic, spiritually enriching youth program dedicated to helping young professionals and students find purpose, balance, and profound happiness through Vedic wisdom.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/volunteer" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ea580c] to-[#c2410c] text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Join FOLK Today
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="#programs" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#072149] border-2 border-[#072149]/10 font-bold rounded-full text-lg shadow-sm hover:border-[#072149]/30 hover:bg-gray-50 transition-all duration-300"
              >
                Explore Programs
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── THE NEED SECTION ─────────────────────────────────────────────────── */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Image / Composition */}
            <Reveal delay={0.2} className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-200 to-blue-200 rounded-[2.5rem] blur-xl opacity-50 transform -rotate-3"></div>
              <div className="relative rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000" 
                  alt="Youth Meditation and Discussion" 
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </Reveal>

            {/* Right Text Content */}
            <div className="space-y-6">
              <Reveal delay={0.1}>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#072149] leading-tight">
                  Why Youth Need <span className="text-[#cca75b]">Spiritual Guidance</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-lg text-gray-600 leading-relaxed">
                  In today's fast-paced world, young people face immense pressure from academics, careers, and social expectations. This constant struggle often leads to stress, anxiety, and a feeling of emptiness despite material success.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-lg text-gray-600 leading-relaxed">
                  The FOLK program is meticulously designed to help youth navigate these modern challenges. By tapping into the timeless wisdom of the Bhagavad Gita, we provide practical tools for mind control, emotional stability, and true personality development.
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <ul className="space-y-4 mt-8">
                  {[
                    "Overcome stress and anxiety through meditation",
                    "Build authentic, meaningful relationships",
                    "Develop powerful leadership and communication skills",
                    "Find a deeper spiritual purpose in life"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            
          </div>
        </div>
      </section>

      {/* ── CORE PROGRAMS GRID ──────────────────────────────────────────────── */}
      <section id="programs" className="py-24 relative z-10 bg-white/40 backdrop-blur-sm border-y border-[#cca75b]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#072149] mb-4">Our Core Activities</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Transformative programs tailored for the modern youth.</p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            <Reveal delay={0.1}>
              <div className="h-full bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <Brain className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#072149] mb-4">Art of Mind Control</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  A highly acclaimed workshop teaching you how to harness the power of your mind. Learn to improve focus, conquer negative habits, and meditate effectively using mantra chanting.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="h-full bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#072149] mb-4">Personality Development</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  True personality goes beyond physical appearance. We explore the profound teachings of Vedic texts to cultivate virtues like patience, tolerance, leadership, and unwavering confidence.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="h-full bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                  <Leaf className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#072149] mb-4">Weekend Retreats</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Step away from the concrete jungle. Our weekend camps offer a revitalizing blend of nature, music, philosophy, and delicious prasadam to recharge your spiritual batteries.
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION ──────────────────────────────────────────────────── */}
      <section className="py-24 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#0c4a8a]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <Reveal>
            <Heart className="w-16 h-16 text-[#cca75b] mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Begin Your Journey Inward
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Experience the joy of self-realization. Join thousands of youth who have transformed their lives through the FOLK program.
            </p>
            <Link 
              href="/volunteer" 
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#cca75b] text-[#072149] font-bold rounded-full text-lg shadow-xl hover:bg-white transition-all duration-300 transform hover:scale-105"
            >
              Register for Next Session
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
