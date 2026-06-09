"use client";

import React from 'react';
import { Target, Heart, BookOpen, Sun, Sparkles } from 'lucide-react';
import Link from 'next/link';
import MissionBook from '@/components/MissionBook';

export default function OurMissionPage() {
  return (
    <div className="w-full bg-[#faf8f5]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='800' height='400' viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23cca75b' stroke-width='2' opacity='0.2'%3E%3Cg transform='translate(100, 50) scale(1.5)'%3E%3Cpath d='M20 5C20 5 10 15 20 35C30 15 20 5 20 5Z'/%3E%3Cpath d='M20 35C10 30 5 20 10 12C15 12 18 25 20 35Z'/%3E%3Cpath d='M20 35C30 30 35 20 30 12C25 12 22 25 20 35Z'/%3E%3C/g%3E%3Cg transform='translate(300, 50) scale(1.5)'%3E%3Ccircle cx='20' cy='10' r='4'/%3E%3Cpath d='M20 15 L20 25 M10 20 L30 20 M10 35 C10 35 15 25 20 25 C25 25 30 35 30 35 M10 35 L30 35'/%3E%3C/g%3E%3Cg transform='translate(500, 50) scale(1.5)'%3E%3Ccircle cx='20' cy='20' r='10' stroke-dasharray='2 2'/%3E%3Cpath d='M20 10 C25 10 30 15 30 20 C30 25 25 30 20 30 C15 30 10 25 10 20 C10 17 12 15 15 15 C17 15 18 17 18 18 C18 19 17 20 16 20'/%3E%3Cpath d='M20 0L20 5 M20 35L20 40 M0 20L5 20 M35 20L40 20 M5 5L10 10 M30 30L35 35 M5 35L10 30 M30 10L35 5'/%3E%3C/g%3E%3Cg transform='translate(700, 50) scale(1.5)'%3E%3Cpath d='M12 25 L12 10 A3 3 0 0 1 18 10 L18 20 M18 15 L18 5 A3 3 0 0 1 24 5 L24 20 M24 15 L24 8 A3 3 0 0 1 30 8 L30 25 C30 35 20 40 12 35 C8 32 5 28 5 25 L5 15 A3 3 0 0 1 11 15 L11 25'/%3E%3Cpath d='M15 25 C18 25 20 27 20 30 C20 32 18 34 16 34 C14 34 12 32 12 30 C12 29 13 28 14 28'/%3E%3C/g%3E%3Cg transform='translate(200, 200) scale(1.5)'%3E%3Ccircle cx='20' cy='6' r='4'/%3E%3Cpath d='M12 16 Q20 13 28 16 L33 28 Q28 25 20 25 Q12 25 7 28 Z'/%3E%3Cpath d='M20 18 L20 24'/%3E%3Cpath d='M5 32 Q20 27 35 32 Q30 38 20 38 Q10 38 5 32 Z'/%3E%3C/g%3E%3Cg transform='translate(400, 200) scale(1.5)'%3E%3Cpath d='M22 5 A 15 15 0 1 0 22 35 A 12 12 0 1 1 22 5 Z'/%3E%3Cpath d='M8 20 L12 20 M10 18 L10 22'/%3E%3C/g%3E%3Cg transform='translate(600, 200) scale(1.5)'%3E%3Cpath d='M20 5 C28 5 30 15 20 18 C18 12 22 10 20 5'/%3E%3Cpath d='M10 25 C5 18 10 10 16 16 C12 18 10 15 10 25'/%3E%3Cpath d='M30 25 C35 18 30 10 24 16 C28 18 30 15 30 25'/%3E%3Cpath d='M10 25 Q20 35 30 25'/%3E%3Ccircle cx='20' cy='22' r='2'/%3E%3C/g%3E%3C/g%3E%3Ctext x='400' y='140' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Krishna Hare Krishna, Krishna Krishna Hare Hare%3C/text%3E%3Ctext x='400' y='165' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Rama Hare Rama, Rama Rama Hare Hare%3C/text%3E%3Ctext x='400' y='340' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Krishna Hare Krishna, Krishna Krishna Hare Hare%3C/text%3E%3Ctext x='400' y='365' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Rama Hare Rama, Rama Rama Hare Hare%3C/text%3E%3C/svg%3E\")", backgroundRepeat: 'repeat', backgroundSize: '600px 300px' }}>
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-28 md:pb-28 overflow-hidden bg-gradient-to-br from-[#faf8f5] via-white to-[#f4efe8] z-10">
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-orange-200/40 rounded-full blur-[100px] opacity-60 mix-blend-multiply" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-blue-200/30 rounded-full blur-[100px] opacity-60 mix-blend-multiply" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            
            {/* Left Side: Video */}
            <div className="relative group perspective-[1000px]">
              {/* Soft glow behind the video */}
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-300 via-orange-100 to-blue-200 rounded-[3rem] blur-xl opacity-40 group-hover:opacity-70 transition duration-700" />
              
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-8 border-white/80 bg-white backdrop-blur-sm transform group-hover:rotate-y-2 group-hover:rotate-x-2 transition-transform duration-700 ease-out">
                <div className="rounded-[2rem] overflow-hidden bg-black/5 relative">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="none"
                    className="w-full h-auto object-contain transform scale-100 group-hover:scale-[1.02] transition-transform duration-1000"
                  >
                    <source src="/263191.mp4" type="video/mp4" />
                  </video>
                  {/* Subtle glass reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </div>
              </div>
            </div>
            
            {/* Right Side: Text */}
            <div className="animate-fade-in-up space-y-8 relative z-10">
              
              <h1 className="text-5xl sm:text-6xl md:text-[5rem] font-serif font-black text-[#072149] tracking-tight leading-[1.05] pb-2">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-[#072149]">Mission</span>
              </h1>
              
              <div className="relative">
                <div className="absolute left-0 top-2 bottom-2 w-1.5 bg-gradient-to-b from-orange-400 to-orange-200 rounded-full" />
                <p className="text-xl md:text-2xl text-gray-600 font-sans leading-relaxed pl-8">
                  We are trying to give human society an opportunity for a life of happiness, good health, peace of mind and all good qualities through God Consciousness.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 md:py-28 relative z-10 overflow-hidden">
        {/* Subtle Background Effects for Main Content */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-[10%] right-[-10%] w-[40rem] h-[40rem] bg-orange-200/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-[20%] left-[-10%] w-[40rem] h-[40rem] bg-blue-200/20 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="prose prose-lg md:prose-xl prose-orange max-w-none text-gray-800">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#072149] mb-8 text-center">
              What is the mission of human life?
            </h2>

            <div className="mb-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://hkmdehradun.org/assets/images/s01-our-mission.jpg" 
                alt="Our Mission" 
                className="w-full h-auto object-cover max-h-[500px] hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            <p className="mb-6 leading-relaxed first-letter:text-7xl first-letter:font-black first-letter:text-orange-600 first-letter:mr-3 first-letter:float-left">
              The mission of human life is to end the miseries of material existence and attain a blissful life. We are constantly searching after happiness, but we often fail in our pursuit. We may get a glimpse of happiness, but it does not last forever. We do not want miseries, but we cannot avoid them.
            </p>
            
            <p className="mb-10 leading-relaxed">
              Scriptures inform us that we are spiritual beings, part and parcel of the Supreme Lord Sri Krishna, and by nature we are full of happiness – <em>ānandamayo ‘bhyāsāt</em> (vedānta-sūtra). Then, why do we suffer? How do we rediscover the lost happiness and lead a blissful life?
            </p>

            <MissionBook />

            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#072149] mb-6">
              How does this work?
            </h2>
            
            <p className="mb-6 leading-relaxed">
              First, let us understand the root cause of our problems that makes our life miserable. We are entrapped in this material world from time immemorial and the happiness we pursue here is temporary and illusory. In the pursuit of such happiness, we engage in various activities, pious and sinful, that bind us more and more in this material world.
            </p>
            
            <p className="mb-8 leading-relaxed">
              Our miseries are due to sinful reactions, and when we follow these three principles, all the material contaminations and sins are washed away; consequently, we are reestablished in our real constitutional position of unlimited bliss and happiness.
            </p>

            <blockquote className="border-l-4 border-orange-500 pl-6 py-2 my-8 bg-orange-50/50 rounded-r-xl italic">
              <p className="mb-4 text-xl font-serif text-gray-800">
                <strong>Sri Chaitanya Mahaprabhu said:</strong> <em>ceto-darpaṇa-mārjanam bhava-mahā-dāvāgni-nirvāpaṇaṁ</em>
              </p>
              <p className="text-lg text-gray-700 m-0">
                "Chanting the holy names of the Lord cleanses the mirror of the heart and stops the miseries of the blazing fire of material existence."
              </p>
            </blockquote>

            <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-8 bg-blue-50/50 rounded-r-xl italic">
              <p className="mb-4 text-xl font-serif text-gray-800">
                <strong>Srimad Bhagavatam says:</strong> <em>naṣṭa-prāyeṣv abhadreṣu nityaṁ bhāgavata-sevayā</em>
              </p>
              <p className="text-lg text-gray-700 m-0">
                "All the inauspicious things in our heart are completely destroyed by reading Srimad Bhagavatam every day. The darkness of ignorance is dissipated and we become situated in the mode of goodness and develop all good qualities equivalent to that of the demigods."
              </p>
            </blockquote>

            <p className="mb-6 leading-relaxed">
              By honoring prasadam (food offered to the Lord) we do not incur further sinful reactions. Krishna says in the Bhagavad-gita (3.13): <em>"The devotees of the Lord are released from all kinds of sins because they eat food which is offered first for sacrifice. Others, who prepare food for personal sense enjoyment, verily eat only sin."</em>
            </p>

            
          </div>
        </div>
      </section>
    </div>
  );
}
