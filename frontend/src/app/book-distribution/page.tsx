"use client";

import React from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { BookOpen, Heart, Users, MapPin, Share2, HandHeart, GraduationCap, HeartHandshake, Sprout } from "lucide-react";
import Link from "next/link";

function AnimeReveal({
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
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const getVariants = () => {
    switch (direction) {
      case "up":
        return { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
      case "down":
        return { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } };
      case "left":
        return { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } };
      case "right":
        return { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } };
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={getVariants()}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.8, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


const galleryImages = [
  "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=800",
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600",
  "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=700",
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800",
  "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=600",
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=700",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800",
  "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=600",
  "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=700",
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800",
  "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=600",
  "https://images.unsplash.com/photo-1528319725582-ddc096101511?q=80&w=700",
];

export default function BookDistributionPage() {
  return (
    <main className="min-h-screen bg-[#FFFBF2] selection:bg-amber-200 selection:text-[#072149] font-sans">
      
      {/* ══ HERO SECTION ════════════════════════════════════════ */}
      <section className="relative pt-20 pb-12 lg:pt-24 lg:pb-16 overflow-hidden min-h-[50vh] flex flex-col justify-center">
        
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260424_064411_9e9d7f84-9277-41f4-ab10-59172d89e6be.mp4" type="video/mp4" />
          </video>
          {/* Subtle dark overlay to ensure text readability without obscuring the video */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-400/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#072149]/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-20 relative z-10 w-full">
          {/* Banner Image */}
          <AnimeReveal direction="down" delay={100} className="mb-8 w-full flex justify-center">
            <div className="relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-amber-200/50">
              <img 
                src="/hbk.png" 
                alt="Gita Daan - Bhagavad Gita Distribution" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#072149]/40 to-transparent pointer-events-none" />
            </div>
          </AnimeReveal>

          <div className="text-center max-w-4xl mx-auto drop-shadow-lg">
            <AnimeReveal direction="up" delay={200}>
              <p className="text-white text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4 drop-shadow-md">
                Share the Gyan, Spread the Light
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#072149] mb-6 leading-[1.15] drop-shadow-[0_4px_4px_rgba(255,255,255,0.8)]" style={{ fontWeight: 800 }}>
                Bhagavad Gita <br className="hidden md:block" />
                <span className="font-instrument italic font-medium text-amber-400 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">Book Distribution</span>
              </h1>
              <p className="text-gray-100 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto drop-shadow-md font-medium">
                Help us bring the eternal teachings of the Gita to schools, elderly homes, villages, and more.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/donate" className="donate-animated-btn">
                  Donate Now
                </Link>
              </div>
            </AnimeReveal>
          </div>
        </div>
      </section>

      {/* Scrolling Banner */}
      <div className="relative w-full bg-white overflow-hidden py-4 shadow-sm z-20 border-y border-gray-100">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array(4).fill(0).map((_, i) => (
            <span key={i} className="text-gray-700 font-sans font-medium text-sm px-2 uppercase tracking-[0.2em] flex items-center">
              <span className="mx-8 text-gray-300 text-lg">○</span> GITA DAAN FOR ALL
              <span className="mx-8 text-gray-300 text-lg">○</span> PLANTING SEEDS OF KNOWLEDGE
              <span className="mx-8 text-gray-300 text-lg">○</span> TRANSFORMING LIVES
              <span className="mx-8 text-gray-300 text-lg">○</span> AWAKENING THE SOUL
            </span>
          ))}
        </div>
      </div>

      {/* ══ ABOUT SECTION (Brutalist Red) ═══════════════════════════════════════ */}
      <section className="bg-[#EF3325] text-black pt-16 md:pt-24 pb-12 relative overflow-hidden flex flex-col justify-between" style={{ minHeight: "80vh" }}>
        
        {/* Left Side Vertical Text */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left hidden lg:block select-none">
          <span className="font-bold tracking-widest text-lg">Bhagavad Gita®</span>
        </div>

        <div className="w-full px-5 md:px-16 lg:px-32 relative z-10 flex-grow flex flex-col">
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24 mb-16">
            
            {/* Column 1 */}
            <AnimeReveal direction="up" delay={100}>
              <h3 className="text-xl md:text-3xl font-extrabold mb-4 tracking-tight">The Origin:</h3>
              <div className="space-y-4 text-base md:text-lg font-medium leading-relaxed">
                <p>The Bhagavad Gita is a 700-verse poem embedded within the Mahabharata. It presents a divine conversation between Lord Krishna and Arjuna on the battlefield of Kurukshetra.</p>
              </div>
            </AnimeReveal>

            {/* Column 2 */}
            <AnimeReveal direction="up" delay={200}>
              <h3 className="text-xl md:text-3xl font-extrabold mb-4 tracking-tight">The Vision:</h3>
              <div className="space-y-4 text-base md:text-lg font-medium leading-relaxed">
                <p>The teachings of the Gita go beyond religion, addressing universal themes such as purpose, duty, self-realization, and liberation.</p>
                <p>Gita distribution is about planting seeds of wisdom that inspire positive change. Studies show improvements in mental well-being, academic focus, and social behavior.</p>
              </div>
            </AnimeReveal>

            {/* Column 3 (Icon) */}
            <AnimeReveal direction="left" delay={300} className="hidden lg:flex justify-end items-start">
              <div className="w-40 h-40 bg-black rounded-full flex items-center justify-center text-[#EF3325]">
                <BookOpen className="w-20 h-20" strokeWidth={1.5} />
              </div>
            </AnimeReveal>
            
          </div>

          {/* Thin Divider Line */}
          <div className="w-full h-[1px] bg-black/80 mb-8" />

          {/* Massive Text at Bottom */}
          <div className="mt-auto w-full pt-10">
            <AnimeReveal direction="up" delay={400}>
              <div className="flex items-end justify-between w-full">
                <h2 
                  className="text-[14vw] leading-[0.75] tracking-tighter m-0"
                  style={{ fontStyle: "italic", fontWeight: 900 }}
                >
                  Gita Daan
                </h2>
                <div className="mb-[1.5vw] w-[7vw] h-[7vw] rounded-full border-[0.4vw] border-black flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-1/2 h-1/2 text-black">
                    <path d="M12 2C12 2 12 10 20 12C12 14 12 22 12 22C12 22 12 14 4 12C12 10 12 2 12 2Z" fill="black" />
                  </svg>
                </div>
              </div>
            </AnimeReveal>
          </div>
        </div>
      </section>

      {/* ══ COMBINED BACKGROUND FOR INITIATIVES & GET INVOLVED ════════════ */}
      <div className="relative bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/beige_paint_texture.png')" }}>
        <div className="absolute inset-0 bg-white/40 pointer-events-none z-0" />
        
      {/* ══ TICKER BAND ══════════════════════════════════════════ */}
      <div className="relative z-20 w-full overflow-hidden bg-[#1A1A1A] border-y-[3px] border-[#E05D2D] py-3 flex items-center shadow-lg">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center space-x-8 px-4">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-5 h-5 text-[#E05D2D]" />
                <span className="text-white font-bold tracking-widest text-sm sm:text-base">GITA DAAN FOR ALL</span>
              </div>
              <span className="text-[#E05D2D] text-lg">✦</span>
              
              <div className="flex items-center space-x-3">
                <Sprout className="w-5 h-5 text-[#E05D2D]" />
                <span className="text-white font-bold tracking-widest text-sm sm:text-base">PLANTING SEEDS OF WISDOM</span>
              </div>
              <span className="text-[#E05D2D] text-lg">✦</span>
              
              <div className="flex items-center space-x-3">
                <HeartHandshake className="w-5 h-5 text-[#E05D2D]" />
                <span className="text-white font-bold tracking-widest text-sm sm:text-base">TRANSFORMING LIVES</span>
              </div>
              <span className="text-[#E05D2D] text-lg">✦</span>
              
              <div className="flex items-center space-x-3">
                <HandHeart className="w-5 h-5 text-[#E05D2D]" />
                <span className="text-white font-bold tracking-widest text-sm sm:text-base">AWAKENING THE SOUL</span>
              </div>
              <span className="text-[#E05D2D] text-lg">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══ INITIATIVES SECTION ════════════════════════════════════ */}
      <section className="pt-10 pb-10 lg:pt-16 lg:pb-16 relative overflow-hidden bg-transparent">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200 via-transparent to-transparent" />
        
        <div className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-20 relative z-10">
          <AnimeReveal direction="up" delay={100} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl text-[#072149] font-bold mb-6">Our Initiatives</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Reaching out to different segments of society to share the profound message of the Gita.
            </p>
          </AnimeReveal>

          <div className="grid md:grid-cols-3 gap-10 md:gap-8 pt-6">
            {[
              {
                icon: <GraduationCap className="w-8 h-8" />,
                title: "Schools",
                desc: "Interactive sessions, storytelling, and discussions help students apply Gita teachings in daily life to build strong character.",
              },
              {
                icon: <HeartHandshake className="w-8 h-8" />,
                title: "Old Age Homes",
                desc: "Spiritual guidance offering comfort, purpose, and inner peace to the elderly during their wisdom years.",
              },
              {
                icon: <Sprout className="w-8 h-8" />,
                title: "Villages",
                desc: "Gita satsangs and book distribution to rural families in need, fostering community harmony and spiritual upliftment.",
              }
            ].map((item, i) => (
              <AnimeReveal key={i} direction="up" delay={200 + i * 100}>
                
                {/* Magic Card Wrapper */}
                <div className="relative z-10 p-[5px] rounded-2xl group/magic transition-all duration-500 h-full">
                  
                  {/* Default Background Gradient */}
                  <div className="absolute inset-0 rounded-2xl -z-20 bg-gradient-to-r from-[#74ebd5] to-[#acb6e5]" />
                  
                  {/* Layer 1 (rotate 2deg) */}
                  <div className="absolute inset-0 rounded-2xl -z-10 bg-gradient-to-br from-[#f6d365] to-[#fda085] rotate-2 group-hover/magic:opacity-0 transition-opacity duration-300" />
                  
                  {/* Layer 2 (rotate -2deg) */}
                  <div className="absolute inset-0 rounded-2xl -z-10 bg-gradient-to-tr from-[#84fab0] to-[#8fd3f4] -rotate-2 group-hover/magic:opacity-0 transition-opacity duration-300" />

                  {/* Card Content */}
                  <div className="relative z-20 bg-white rounded-[0.7rem] p-8 h-full flex flex-col group-hover/magic:bg-transparent transition-colors duration-500">
                    <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover/magic:bg-white/20 group-hover/magic:text-[#072149] transition-all duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl text-[#072149] font-bold mb-4">{item.title}</h3>
                    <p className="text-gray-700 leading-relaxed group-hover/magic:text-[#072149] transition-colors duration-500">
                      {item.desc}
                    </p>
                  </div>

                </div>

              </AnimeReveal>
            ))}
          </div>
        </div>
      </section>

            {/* ══ GET INVOLVED SECTION ════════════════════════════════ */}
      <section className="pt-0 pb-16 lg:pb-24 bg-transparent relative">
        <div className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-20">
          <AnimeReveal direction="up" delay={100} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl text-[#072149] font-bold mb-6">Get Involved</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Every small effort makes a huge difference. Join us in this noble cause.
            </p>
          </AnimeReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <HandHeart className="w-8 h-8" />,
                title: "Donate",
                desc: "Support book printing, logistics, and outreach programs. Your contribution funds the distribution of wisdom.",
                action: "Donate Now",
                link: "/donate"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Volunteer",
                desc: "Help distribute books, organize events, or share knowledge by giving your time and energy.",
                action: "Join Us",
                link: "/#initiatives"
              },
              {
                icon: <Share2 className="w-8 h-8" />,
                title: "Spread the Word",
                desc: "Share our mission on social media and inspire your friends and family to participate in Gita Daan.",
                action: "Follow Us",
                link: "/#social"
              }
            ].map((item, i) => (
              <AnimeReveal key={i} direction="up" delay={200 + i * 100} className="h-full">
                <div className="bg-white p-8 rounded-[10px] h-full flex flex-col items-center text-center hover:rounded-3xl hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0_0_0_2px_rgb(190,190,190),0.3em_0.3em_1em_rgba(0,0,0,0.3)]">
                  <div className="w-16 h-16 bg-white shadow-[inset_0_-1em_1em_rgba(0,0,0,0.05),0_0_0_1px_rgb(190,190,190)] text-[#072149] rounded-full flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl text-[#072149] font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-8 flex-grow">
                    {item.desc}
                  </p>
                  <Link href={item.link} className="fancy mt-auto">
                    <span className="top-key" />
                    <span className="text">{item.action}</span>
                    <span className="bottom-key-1" />
                    <span className="bottom-key-2" />
                  </Link>
                </div>
              </AnimeReveal>
            ))}
          </div>
        </div>
      </section>


            </div>

      {/* ══ TICKER BAND 2 ══════════════════════════════════════════ */}
      <div className="relative w-full overflow-hidden bg-[#1A1A1A] border-y-[3px] border-[#E05D2D] py-3 flex items-center shadow-lg z-20">
        <div className="flex animate-marquee-reverse whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center space-x-8 px-4">
              <div className="flex items-center space-x-3">
                <HandHeart className="w-5 h-5 text-[#E05D2D]" />
                <span className="text-white font-bold tracking-widest text-sm sm:text-base">DONATE TODAY</span>
              </div>
              <span className="text-[#E05D2D] text-lg">✦</span>
              
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-[#E05D2D]" />
                <span className="text-white font-bold tracking-widest text-sm sm:text-base">VOLUNTEER WITH US</span>
              </div>
              <span className="text-[#E05D2D] text-lg">✦</span>
              
              <div className="flex items-center space-x-3">
                <Heart className="w-5 h-5 text-[#E05D2D]" />
                <span className="text-white font-bold tracking-widest text-sm sm:text-base">BE THE CHANGE</span>
              </div>
              <span className="text-[#E05D2D] text-lg">✦</span>
              
              <div className="flex items-center space-x-3">
                <Share2 className="w-5 h-5 text-[#E05D2D]" />
                <span className="text-white font-bold tracking-widest text-sm sm:text-base">SPREAD THE MESSAGE</span>
              </div>
              <span className="text-[#E05D2D] text-lg">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══ GALLERY SECTION ════════════════════════════════════ */}
      <section className="py-20 lg:py-32 bg-[#FFFBF2] relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-20">
          <AnimeReveal direction="up" delay={100} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl text-[#072149] font-bold mb-6">Moments of Light</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Glimpses of the impact and joy brought by the distribution of the Bhagavad Gita.
            </p>
          </AnimeReveal>

          {/* Masonry Grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {galleryImages.map((src, i) => (
              <AnimeReveal key={i} direction="up" delay={100 + (i % 4) * 100}>
                <div className="break-inside-avoid relative overflow-hidden rounded-lg group cursor-pointer mb-4">
                  <img 
                    src={src} 
                    alt={`Gita Daan Gallery Image ${i + 1}`} 
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-[#072149]/0 group-hover:bg-[#072149]/20 transition-colors duration-300 pointer-events-none" />
                </div>
              </AnimeReveal>
            ))}
          </div>
        </div>
      </section>
    <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: max-content;
        }

        .animate-marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
          width: max-content;
        }

        .fancy {
         background-color: transparent;
         border: 2px solid #000;
         border-radius: 0;
         box-sizing: border-box;
         color: #fff;
         cursor: pointer;
         display: inline-block;
         font-weight: 700;
         letter-spacing: 0.05em;
         margin: 0;
         outline: none;
         overflow: visible;
         padding: 1em 1.5em;
         position: relative;
         text-align: center;
         text-decoration: none;
         text-transform: none;
         transition: all 0.3s ease-in-out;
         user-select: none;
         font-size: 13px;
         width: 100%;
        }

        .fancy::before {
         content: " ";
         width: 1.5625rem;
         height: 2px;
         background: black;
         top: 50%;
         left: 1.5em;
         position: absolute;
         transform: translateY(-50%);
         transform-origin: center;
         transition: background 0.3s linear, width 0.3s linear;
        }

        .fancy .text {
         font-size: 1.125em;
         line-height: 1.33333em;
         padding-left: 2em;
         display: block;
         text-align: left;
         transition: all 0.3s ease-in-out;
         text-transform: uppercase;
         text-decoration: none;
         color: black;
        }

        .fancy .top-key {
         height: 2px;
         width: 1.5625rem;
         top: -2px;
         left: 0.625rem;
         position: absolute;
         background: #FFFBF2;
         transition: width 0.5s ease-out, left 0.3s ease-out;
        }

        .fancy .bottom-key-1 {
         height: 2px;
         width: 1.5625rem;
         right: 1.875rem;
         bottom: -2px;
         position: absolute;
         background: #FFFBF2;
         transition: width 0.5s ease-out, right 0.3s ease-out;
        }

        .fancy .bottom-key-2 {
         height: 2px;
         width: 0.625rem;
         right: 0.625rem;
         bottom: -2px;
         position: absolute;
         background: #FFFBF2;
         transition: width 0.5s ease-out, right 0.3s ease-out;
        }

        .fancy:hover {
         color: white;
         background: black;
        }

        .fancy:hover::before {
         width: 0.9375rem;
         background: white;
        }

        .fancy:hover .text {
         color: white;
         padding-left: 1.5em;
        }

        .fancy:hover .top-key {
         left: -2px;
         width: 0px;
        }

        .fancy:hover .bottom-key-1,
         .fancy:hover .bottom-key-2 {
         right: 0;
         width: 0;
        }

        .donate-animated-btn {
          position: relative;
          font-size: 17px;
          text-transform: uppercase;
          text-decoration: none;
          padding: 1em 2.5em;
          display: inline-block;
          cursor: pointer;
          border-radius: 6em;
          transition: all 0.2s;
          border: none;
          font-family: inherit;
          font-weight: 700;
          color: black;
          background-color: white;
        }

        .donate-animated-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .donate-animated-btn:active {
          transform: translateY(-1px);
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        }

        .donate-animated-btn::after {
          content: "";
          display: inline-block;
          height: 100%;
          width: 100%;
          border-radius: 100px;
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
          transition: all 0.4s;
          background-color: #fff;
        }

        .donate-animated-btn:hover::after {
          transform: scaleX(1.4) scaleY(1.6);
          opacity: 0;
        }
      `}} />
      </main>
  );
}
