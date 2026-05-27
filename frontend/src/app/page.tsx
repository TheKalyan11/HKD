"use client";



import React, { useEffect, useState, useRef } from 'react';

import Link from 'next/link';

import { useCms } from '@/components/CmsContext';

import { VisualEditable } from '@/components/VisualEditable';

import { ChevronLeft, ChevronRight, ArrowRight, Play, Calendar, User, BookOpen } from 'lucide-react';



// Stable constant declared outside component to prevent re-creation on render

const heroSlides = [

  '/deity-1.jpg',

  '/deity-2.jpg',

  '/deity-1.jpg',

  '/deity-2.jpg'

];



const defaultBlogs = [

  {

    title: 'The Divine Life of Nanda Baba',

    slug: 'spiritual-significance-of-nanda-baba',

    excerpt: 'Uncover the deep Vedic scripts highlighting the pastimes of Nanda Baba, the beloved foster father of Lord Krishna in the sacred land of Vrindavan.',

    coverImage: '/nanda_baba_blog.png',

    authorName: 'Swami Gopalananda',

    createdAt: '2026-05-26T12:00:00.000Z'

  },

  {

    title: 'Daily Annadana: Feeding Pilgrims in Vrindavan Dham',

    slug: 'daily-annadana-feeding-pilgrims-vrindavan',

    excerpt: 'Learn how offering hot khichdi prasadam to sadhus, children, and travelers brings immense purity to our lives.',

    coverImage: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=800',

    authorName: 'Sri Radha Dasa',

    createdAt: '2026-05-26T12:00:00.000Z'

  }

];



export default function Home() {

  const { fetchPageContent, isLoading, editMode } = useCms();

  const [currentSlide, setCurrentSlide] = useState(0);

  const [isHovered, setIsHovered] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const [latestBlogs, setLatestBlogs] = useState<any[]>([]);



  // Fetch latest ashram blog posts for "Latest Updates"

  useEffect(() => {

    const fetchLatestBlogs = async () => {

      try {

        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

        const response = await fetch(`${backendUrl}/api/cms/blogs`);

        if (response.ok) {

          const data = await response.json();

          setLatestBlogs(data.slice(0, 2));

        }

      } catch (err) {

        console.error('Error fetching latest updates:', err);

      }

    };

    fetchLatestBlogs();

  }, []);



  // 3D Tilt Effect Handler

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {

    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left; // x position within the element.

    const y = e.clientY - rect.top;  // y position within the element.



    const centerX = rect.width / 2;

    const centerY = rect.height / 2;



    const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg

    const rotateY = ((x - centerX) / centerX) * 10;



    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

  };



  const handleMouseLeave = () => {

    if (!cardRef.current) return;

    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

  };



  // 1. Initial CMS Fetch Effect

  useEffect(() => {

    fetchPageContent('home');

    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);



  // 2. Dedicated Auto-scrolling slide interval effect

  useEffect(() => {

    const timer = setInterval(() => {

      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);

    }, 8000); // Slower auto-scrolling (8 seconds)

    return () => clearInterval(timer);

  }, []);



  const prevSlide = () => {

    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  };



  const nextSlide = () => {

    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);

  };



  const getSlidePositionClass = (idx: number) => {

    if (idx === currentSlide) {

      return 'left-0 w-full scale-100 z-10 opacity-100';

    }

    return 'left-0 w-full scale-105 z-0 opacity-0 pointer-events-none';

  };







  return (

    <div className="relative overflow-hidden">



      {/* 1. HERO SLIDER SECTION (Vivanta-inspired 3-slide peeking layout) */}

      <section className="relative w-full h-[75vh] md:h-[80vh] overflow-hidden bg-[#0a0a0a] z-0 flex items-center">



        {/* Slides Container */}

        <div className="relative w-full h-full">

          {heroSlides.map((slide, idx) => (

            <div

              key={idx}

              onClick={() => {

                if (idx !== currentSlide) {

                  setCurrentSlide(idx);

                }

              }}

              className={`absolute top-0 h-full w-full rounded transition-all duration-700 ease-out shadow-2xl overflow-hidden flex items-center justify-center ${getSlidePositionClass(idx)}`}

            >

              {/* Full Width/Height bg-cover Image */}

              <div

                className="absolute inset-0 bg-cover bg-center pointer-events-none"

                style={{ backgroundImage: `url('${slide}')` }}

              />



              {/* Inset White Outline Border (Reference Image Match) */}

              <div className="absolute inset-4 sm:inset-6 border border-white/20 pointer-events-none z-30" />



              {/* Dark overlay gradient for beautiful text readability */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none z-10" />

            </div>

          ))}

        </div>



        {/* Liquid Glass Navigation Left Arrow */}

        <button

          onClick={prevSlide}

          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center rounded-full w-12 h-12 bg-white/75 hover:bg-white text-gray-800 hover:scale-110 shadow-lg active:scale-95 transition-all duration-300"

          title="Previous Slide"

        >

          <ChevronLeft className="w-5 h-5 text-gray-700" />

        </button>



        {/* Liquid Glass Navigation Right Arrow */}

        <button

          onClick={nextSlide}

          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center rounded-full w-12 h-12 bg-white/75 hover:bg-white text-gray-800 hover:scale-110 shadow-lg active:scale-95 transition-all duration-300"

          title="Next Slide"

        >

          <ChevronRight className="w-5 h-5 text-gray-700" />

        </button>



      </section>



      {/* 1.5 DUAL CROSSING INFINITE SCROLLING SASH BANNERS */}

      <div className="relative w-full h-[220px] md:h-[260px] overflow-hidden z-30 pointer-events-none select-none my-[-6vw]">



        {/* Style tags for dual infinite marquee scrolling and star spinning animations */}

        <style dangerouslySetInnerHTML={{

          __html: `

          @keyframes marqueeLeft {

            0%   { transform: translateX(0); }

            100% { transform: translateX(-50%); }

          }

          @keyframes marqueeRight {

            0%   { transform: translateX(-50%); }

            100% { transform: translateX(0); }

          }

          .marquee-track-left {

            display: flex;

            width: max-content;

            animation: marqueeLeft 38s linear infinite;

          }

          .marquee-track-right {

            display: flex;

            width: max-content;

            animation: marqueeRight 38s linear infinite;

          }

          .marquee-item {

            display: flex;

            align-items: center;

            gap: 3rem;

            padding-right: 3rem;

            white-space: nowrap;

          }

          @keyframes starSpin {

            to { transform: rotate(360deg); }

          }

          .star-spin {

            animation: starSpin 15s linear infinite;

            display: inline-block;

            flex-shrink: 0;

          }

        ` }} />



        {/* Banner 1: Cyan/Blue sash, tilted rotate(-3.5deg), scrolling LEFT */}

        <div

          className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-[130%] -left-[15%] py-4 bg-[#00a4ef] flex items-center z-10"

          style={{

            transform: 'translateY(-30px) rotate(-3.5deg)',

            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',

          }}

        >

          <div className="marquee-track-left select-none">

            {[1, 2, 3, 4, 5, 6].map((num) => (

              <div key={num} className="marquee-item">

                <span className="text-white text-lg md:text-[22px] font-black tracking-[0.12em] uppercase font-sans">

                  HARE KRISHNA HARE KRISHNA KRISHNA KRISHNA HARE HARE

                </span>

                <svg className="star-spin" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">

                  <line x1="12" y1="2" x2="12" y2="22" /><line x1="2" y1="12" x2="22" y2="12" />

                  <line x1="5.17" y1="5.17" x2="18.83" y2="18.83" /><line x1="5.17" y1="18.83" x2="18.83" y2="5.17" />

                  <line x1="8.5" y1="3.5" x2="15.5" y2="20.5" /><line x1="3.5" y1="8.5" x2="20.5" y2="15.5" />

                  <line x1="8.5" y1="20.5" x2="15.5" y2="3.5" /><line x1="3.5" y1="15.5" x2="20.5" y2="8.5" />

                </svg>

                <span className="text-white text-lg md:text-[22px] font-black tracking-[0.12em] uppercase font-sans">

                  HARE RAMA HARE RAMA RAMA RAMA HARE HARE

                </span>

                <svg className="star-spin" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">

                  <line x1="12" y1="2" x2="12" y2="22" /><line x1="2" y1="12" y2="22" />

                  <line x1="5.17" y1="5.17" x2="18.83" y2="18.83" /><line x1="5.17" y1="18.83" x2="18.83" y2="5.17" />

                  <line x1="8.5" y1="3.5" x2="15.5" y2="20.5" /><line x1="3.5" y1="8.5" x2="20.5" y2="15.5" />

                  <line x1="8.5" y1="20.5" x2="15.5" y2="3.5" /><line x1="3.5" y1="15.5" x2="20.5" y2="8.5" />

                </svg>

              </div>

            ))}

          </div>

        </div>



        {/* Banner 2: Golden/Saffron sash, tilted rotate(3.5deg), scrolling RIGHT */}

        <div

          className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-[130%] -left-[15%] py-4 bg-[#cca75b] flex items-center z-20"

          style={{

            transform: 'translateY(10px) rotate(3.5deg)',

            boxShadow: '0 12px 36px rgba(0,0,0,0.25)',

          }}

        >

          <div className="marquee-track-right select-none">

            {[1, 2, 3, 4, 5, 6].map((num) => (

              <div key={num} className="marquee-item">

                <span className="text-white text-lg md:text-[22px] font-black tracking-[0.12em] uppercase font-sans">

                  HARE KRISHNA HARE KRISHNA KRISHNA KRISHNA HARE HARE

                </span>

                <svg className="star-spin" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">

                  <line x1="12" y1="2" x2="12" y2="22" /><line x1="2" y1="12" x2="22" y2="12" />

                  <line x1="5.17" y1="5.17" x2="18.83" y2="18.83" /><line x1="5.17" y1="18.83" x2="18.83" y2="5.17" />

                  <line x1="8.5" y1="3.5" x2="15.5" y2="20.5" /><line x1="3.5" y1="8.5" x2="20.5" y2="15.5" />

                  <line x1="8.5" y1="20.5" x2="15.5" y2="3.5" /><line x1="3.5" y1="15.5" x2="20.5" y2="8.5" />

                </svg>

                <span className="text-white text-lg md:text-[22px] font-black tracking-[0.12em] uppercase font-sans">

                  HARE RAMA HARE RAMA RAMA RAMA HARE HARE

                </span>

                <svg className="star-spin" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">

                  <line x1="12" y1="2" x2="12" y2="22" /><line x1="2" y1="12" x2="22" y2="12" />

                  <line x1="5.17" y1="5.17" x2="18.83" y2="18.83" /><line x1="5.17" y1="18.83" x2="18.83" y2="5.17" />

                  <line x1="8.5" y1="3.5" x2="15.5" y2="20.5" /><line x1="3.5" y1="8.5" x2="20.5" y2="15.5" />

                  <line x1="8.5" y1="20.5" x2="15.5" y2="3.5" /><line x1="3.5" y1="15.5" x2="20.5" y2="8.5" />

                </svg>

              </div>

            ))}

          </div>

        </div>



      </div>



      {/* 2. ABOUT US SECTION (HKM Dehradun & PNG Graphics with Animated Music) */}

      <section id="about" className="relative w-full py-4 lg:py-6 bg-[#fbf6f0] overflow-hidden text-gray-800 flex items-center justify-center">

        {/* Subtle decorative background elements */}

        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-[#d4af37]/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2" />

        <div className="absolute bottom-0 left-10 w-96 h-96 bg-white/50 rounded-full blur-[100px] pointer-events-none" />



        <div className="container mx-auto px-8 relative z-10">

          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-8">



            {/* Left Content (Text & Mission) */}

            <div className="flex-1 flex flex-col justify-center space-y-6 lg:pr-12 relative z-20">



              {/* Header area */}

              <div className="space-y-4">

                <div className="flex items-center gap-4 text-[#d4af37]">

                  <div className="h-px w-16 bg-current"></div>

                  <span className="uppercase tracking-[0.25em] font-bold text-sm">About Us</span>

                </div>



                <h2 className="text-4xl md:text-5xl font-serif text-[#3b2b2f] font-bold leading-tight drop-shadow-sm">

                  Hare Krishna Movement <br />

                  <span className="text-[#d4af37]">Dehradun</span>

                </h2>

              </div>



              {/* Body Text (Dehradun Matter) */}

              <div className="space-y-4 text-[#4a4a4a] text-[16px] leading-relaxed max-w-lg">

                <p>

                  We aspire to create a world-class and iconic spiritual centre for Sri Krishna in the picturesque valley of Dehradun in pursuance of Srila Prabhupada&apos;s direction.

                </p>

                <p>

                  Hare Krishna Movement Dehradun will place Krishna proudly on the minds of the people and Dehradun on the global spiritual map.

                </p>

              </div>

            </div>



            {/* Right Graphics (PNG Combo & Music Animation) */}

            <div className="flex-1 w-full flex items-center justify-center lg:justify-end z-10">

              <div className="relative w-[95%] lg:w-[85%] max-w-[500px] animate-float drop-shadow-2xl">

                {/* Uploaded Combined Krishna & Cow PNG */}

                <img

                  src="/krishna-cow-combo.png"

                  alt="Krishna and Cow"

                  className="w-full h-auto object-contain z-20 relative"

                />



                {/* Floating Music Notes Animation (Positioned exactly near the flute's tip) */}

                <div className="absolute top-[34%] left-[53%] w-10 h-10 pointer-events-none z-30">

                  <div className="absolute animate-music-float-1 opacity-0 text-2xl md:text-3xl text-[#d4af37]" style={{ animationDelay: '0s' }}>&#9835;</div>

                  <div className="absolute animate-music-float-2 opacity-0 text-3xl md:text-4xl text-[#d4af37]" style={{ animationDelay: '1.5s', left: '10px', top: '-10px' }}>&#9834;</div>

                  <div className="absolute animate-music-float-3 opacity-0 text-xl md:text-2xl text-[#d4af37]" style={{ animationDelay: '3s', left: '-10px', top: '10px' }}>&#9835;</div>

                  <div className="absolute animate-music-float-2 opacity-0 text-2xl md:text-3xl text-[#d4af37]" style={{ animationDelay: '4.5s', left: '20px', top: '-5px' }}>&#9834;</div>

                </div>

              </div>

            </div>



          </div>

        </div>



        {/* Global CSS for music floating animations */}

        <style dangerouslySetInnerHTML={{

          __html: `

          @keyframes musicFloat1 {

            0% { transform: translate(0, 0) scale(0.5) rotate(-10deg); opacity: 0; }

            20% { opacity: 1; }

            80% { opacity: 1; }

            100% { transform: translate(60px, -100px) scale(1.5) rotate(20deg); opacity: 0; }

          }

          @keyframes musicFloat2 {

            0% { transform: translate(0, 0) scale(0.5) rotate(10deg); opacity: 0; }

            20% { opacity: 1; }

            80% { opacity: 1; }

            100% { transform: translate(90px, -70px) scale(1.2) rotate(-20deg); opacity: 0; }

          }

          @keyframes musicFloat3 {

            0% { transform: translate(0, 0) scale(0.5) rotate(0deg); opacity: 0; }

            20% { opacity: 1; }

            80% { opacity: 1; }

            100% { transform: translate(40px, -120px) scale(1.8) rotate(15deg); opacity: 0; }

          }

          .animate-music-float-1 { animation: musicFloat1 5s linear infinite; }

          .animate-music-float-2 { animation: musicFloat2 5s linear infinite; }

          .animate-music-float-3 { animation: musicFloat3 5s linear infinite; }

          

          @keyframes gentleFloat {

            0%, 100% { transform: translateY(0); }

            50% { transform: translateY(-12px); }

          }

          .animate-float { animation: gentleFloat 6s ease-in-out infinite; }

        `}} />

      </section>



      {/* 2.5 LOGO SCROLLING BANNER */}

      <section className="relative w-full py-3 md:py-4 bg-[#fbf6f0] border-y border-[#eae4d5]/40 overflow-hidden flex items-center z-30">



        {/* Style tags for logo marquee scrolling and hover effects */}

        <style dangerouslySetInnerHTML={{

          __html: `

          @keyframes logoMarquee {

            0%   { transform: translateX(0); }

            100% { transform: translateX(-50%); }

          }

          .logo-marquee-container {

            display: flex;

            width: 100%;

            overflow: hidden;

            position: relative;

          }

          .logo-marquee-track {

            display: flex;

            width: max-content;

            gap: 4rem;

            animation: logoMarquee 28s linear infinite;

            align-items: center;

          }

          @media (min-width: 768px) {

            .logo-marquee-track {

              gap: 8rem;

            }

          }

          .logo-marquee-track:hover {

            animation-play-state: paused;

          }

          .logo-item {

            flex-shrink: 0;

            display: flex;

            align-items: center;

            justify-content: center;

            transition: all 0.3s ease;

            cursor: pointer;

          }

          .logo-item img {

            filter: grayscale(20%) opacity(80%);

            transition: all 0.3s ease;

          }

          .logo-item:hover img {

            filter: grayscale(0%) opacity(100%);

            transform: scale(1.04);

          }

        ` }} />



        <div className="logo-marquee-container relative w-full">

          {/* Subtle gradient fades on the sides for premium blending */}

          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#fbf6f0] via-[#fbf6f0]/80 to-transparent z-20 pointer-events-none" />

          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#fbf6f0] via-[#fbf6f0]/80 to-transparent z-20 pointer-events-none" />



          <div className="logo-marquee-track select-none">

            {/* First Set */}

            <div className="logo-item">

              <img src="/sl.png" alt="Hare Krishna Movement Dehradun" className="h-[55px] md:h-[75px] w-auto object-contain" />

            </div>

            <div className="logo-item">

              <img src="/sl1.png" alt="Vrindavan Chandrodaya Mandir" className="h-[55px] md:h-[75px] w-auto object-contain" />

            </div>

            <div className="logo-item">

              <img src="/sl.png" alt="Hare Krishna Movement Dehradun" className="h-[55px] md:h-[75px] w-auto object-contain" />

            </div>

            <div className="logo-item">

              <img src="/sl1.png" alt="Vrindavan Chandrodaya Mandir" className="h-[55px] md:h-[75px] w-auto object-contain" />

            </div>



            {/* Second Set (identical duplicate for seamless scroll) */}

            <div className="logo-item">

              <img src="/sl.png" alt="Hare Krishna Movement Dehradun" className="h-[55px] md:h-[75px] w-auto object-contain" />

            </div>

            <div className="logo-item">

              <img src="/sl1.png" alt="Vrindavan Chandrodaya Mandir" className="h-[55px] md:h-[75px] w-auto object-contain" />

            </div>

            <div className="logo-item">

              <img src="/sl.png" alt="Hare Krishna Movement Dehradun" className="h-[55px] md:h-[75px] w-auto object-contain" />

            </div>

            <div className="logo-item">

              <img src="/sl1.png" alt="Vrindavan Chandrodaya Mandir" className="h-[55px] md:h-[75px] w-auto object-contain" />

            </div>

          </div>

        </div>



      </section>



      {/* 3. UPCOMING FESTIVALS SECTION */}

      <section className="relative w-full pt-6 pb-2 bg-[#faf8f5] flex flex-col items-center overflow-hidden">



        {/* Style tags for advanced, premium animations (bird gliding and flapping) & Uiverse custom glowing blob cards */}

        <style dangerouslySetInnerHTML={{

          __html: `

          @keyframes birdFlapping {

            0%, 100% { transform: scaleY(1); }

            50% { transform: scaleY(0.4) translateY(2px); }

          }

          @keyframes birdGlide1 {

            0%, 100% { transform: translate(0, 0) scale(1); }

            50% { transform: translate(-25px, -12px) scale(1.02); }

          }

          @keyframes birdGlide2 {

            0%, 100% { transform: translate(0, 0) scale(0.85); }

            50% { transform: translate(-18px, -18px) scale(0.87); }

          }

          @keyframes birdGlide3 {

            0%, 100% { transform: translate(0, 0) scale(0.7); }

            50% { transform: translate(-12px, -8px) scale(0.72); }

          }

          

          .animate-bird-flap {

            animation: birdFlapping 0.75s ease-in-out infinite;

          }

          .animate-bird-glide-1 {

            animation: birdGlide1 8s ease-in-out infinite;

          }

          .animate-bird-glide-2 {

            animation: birdGlide2 10s ease-in-out infinite;

          }

          .animate-bird-glide-3 {

            animation: birdGlide3 7s ease-in-out infinite;

          }



          /* Glowing/bouncing aurora card styles adapted from Uiverse.io by ali-sazzad */

          .sazzad-card {

            position: relative;

            width: 100%;

            border-radius: 20px;

            overflow: hidden;

            display: flex;

            align-items: center;

            justify-content: center;



            background: rgba(255, 255, 255, 0.25);

            backdrop-filter: blur(25px);

            border: 1px solid rgba(255, 255, 255, 0.4);



            box-shadow:

              0 8px 30px rgba(0, 0, 0, 0.08),

              -10px -10px 30px rgba(255, 255, 255, 0.5);



            transition: all 0.4s ease;

          }



          .sazzad-card:hover {

            transform: translateY(-6px);

            box-shadow:

              0 20px 40px rgba(0, 0, 0, 0.15),

              -10px -10px 30px rgba(255, 255, 255, 0.65);

          }



          /* Inner Glow Panel */

          .sazzad-bg {

            position: absolute;

            inset: 6px;

            background: linear-gradient(

              145deg,

              rgba(255, 255, 255, 0.95),

              rgba(248, 246, 242, 0.85)

            );

            border-radius: 16px;

            backdrop-filter: blur(25px);

            border: 1px solid rgba(255, 255, 255, 0.7);

            z-index: 2;

            display: flex;

            flex-direction: column;

            align-items: center;

            overflow: hidden;

          }



          /* Animated Aurora Blob */

          .sazzad-aurora {

            position: absolute;

            top: 50%;

            left: 50%;

            width: 180px;

            height: 180px;

            border-radius: 50%;

            filter: blur(28px);

            z-index: 1;

            animation: sazzad-aurora-move 6.5s infinite ease-in-out;

            opacity: 0.95;

          }



          /* Aurora Animation */

          @keyframes sazzad-aurora-move {

            0% {

              transform: translate(-60%, -60%) scale(1);

            }

            30% {

              transform: translate(10%, -40%) scale(1.15);

            }

            60% {

              transform: translate(20%, 20%) scale(1.05);

            }

            80% {

              transform: translate(-40%, 10%) scale(1.2);

            }

            100% {

              transform: translate(-60%, -60%) scale(1);

            }

          }



          /* Aurora Color Variants */

          .sazzad-aurora-cyan {

            background: radial-gradient(circle, rgba(0, 164, 239, 0.85), rgba(0, 210, 255, 0.4), transparent);

          }

          .sazzad-aurora-gold {

            background: radial-gradient(circle, rgba(212, 175, 55, 0.85), rgba(255, 232, 163, 0.4), transparent);

          }

          .sazzad-aurora-rose {

            background: radial-gradient(circle, rgba(255, 0, 127, 0.85), rgba(255, 182, 193, 0.4), transparent);

          }

          .sazzad-aurora-orange {

            background: radial-gradient(circle, rgba(255, 153, 51, 0.85), rgba(255, 94, 0, 0.4), transparent);

          }

          .sazzad-aurora-green {

            background: radial-gradient(circle, rgba(34, 139, 34, 0.85), rgba(144, 238, 144, 0.4), transparent);

          }

          .sazzad-aurora-indigo {

            background: radial-gradient(circle, rgba(75, 0, 130, 0.85), rgba(138, 43, 226, 0.4), transparent);

          }



          /* Custom Animated Button adapted from Uiverse.io by adamgiebl */

          .cssbuttons-io-button {

            background: #0a3d73;

            color: white;

            font-family: inherit;

            padding: 0.35em;

            padding-left: 1.2em;

            font-size: 18px;

            font-weight: 700;

            border-radius: 0.9em;

            border: 2px solid #cca75b;

            letter-spacing: 0.05em;

            display: flex;

            align-items: center;

            box-shadow: inset 0 0 1.6em -0.6em #0c4a8a;

            overflow: hidden;

            position: relative;

            height: 2.8em;

            padding-right: 3.2em;

            cursor: pointer;

            transition: all 0.3s ease;

          }



          .cssbuttons-io-button:hover {

            box-shadow: 0 4px 15px rgba(81, 12, 42, 0.2);

            border-color: #d4af37;

          }



          .cssbuttons-io-button .icon {

            background: #cca75b;

            margin-left: 1em;

            position: absolute;

            display: flex;

            align-items: center;

            justify-content: center;

            height: 2.2em;

            width: 2.2em;

            border-radius: 0.7em;

            box-shadow: 0.1em 0.1em 0.6em 0.2em rgba(204, 167, 91, 0.3);

            right: 0.3em;

            transition: all 0.3s;

          }



          .cssbuttons-io-button:hover .icon {

            width: calc(100% - 0.6em);

            background: #d4af37;

          }



          .cssbuttons-io-button .icon svg {

            width: 1.1em;

            transition: transform 0.3s;

            color: #0a3d73;

          }



          .cssbuttons-io-button:hover .icon svg {

            transform: translateX(0.15em);

          }



          .cssbuttons-io-button:active .icon {

            transform: scale(0.95);

          }



          /* Creatlydev Premium Button adapted from Uiverse.io */

          .creatly-btn {

            line-height: 1;

            text-decoration: none;

            display: inline-flex;

            border: none;

            cursor: pointer;

            align-items: center;

            gap: 0.75rem;

            background-color: var(--clr);

            color: #fff;

            border-radius: 10rem;

            font-weight: 600;

            padding: 0.55rem 1.25rem;

            padding-left: 18px;

            white-space: nowrap;

            overflow: hidden;

            text-overflow: ellipsis;

            transition: background-color 0.3s;

          }



          .creatly-btn__icon-wrapper {

            flex-shrink: 0;

            width: 24px;

            height: 24px;

            position: relative;

            color: var(--clr);

            background-color: #fff;

            border-radius: 50%;

            display: grid;

            place-items: center;

            overflow: hidden;

          }



          .creatly-btn:hover {

            background-color: #0a3d73; /* Branded deep maroon */

          }



          .creatly-btn:hover .creatly-btn__icon-wrapper {

            color: #0a3d73; /* Branded deep maroon */

          }



          .creatly-btn__icon-svg--copy {

            position: absolute;

            transform: translate(-150%, 150%);

          }



          .creatly-btn:hover .creatly-btn__icon-svg:first-child {

            transition: transform 0.3s ease-in-out;

            transform: translate(150%, -150%);

          }



          .creatly-btn:hover .creatly-btn__icon-svg--copy {

            transition: transform 0.3s ease-in-out 0.1s;

            transform: translate(0);

          }

        `}} />



        {/* Peach/Orange Sky Glow behind Gopuram */}

        <div className="absolute top-0 right-0 w-[320px] md:w-[420px] lg:w-[460px] h-[100%] pointer-events-none z-0 hidden sm:block overflow-hidden">

          <div className="absolute top-24 right-6 w-72 h-72 bg-[#fde9d2]/90 rounded-full blur-3xl opacity-85" />

          <div className="absolute top-48 right-24 w-56 h-56 bg-[#ebd9b3]/60 rounded-full blur-3xl opacity-70" />

          <div className="absolute top-64 right-12 w-64 h-64 bg-[#ebd5c2]/80 rounded-full blur-[100px] opacity-80" />

        </div>



        {/* Right side Temple Illustration & Clouds Background */}

        <div className="absolute top-0 right-0 w-[35%] lg:w-[30%] h-full pointer-events-none z-0 hidden sm:block overflow-hidden">

          <img

            src="/ti.png"

            alt="Temple Gopuram"

            className="absolute top-4 md:top-2 right-[-8px] h-[80%] w-[260px] md:w-[320px] lg:w-[380px] object-contain object-right-top opacity-[0.94] transition-all duration-700 select-none mix-blend-darken"

            style={{

              WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 95%)',

              maskImage: 'linear-gradient(to bottom, black 60%, transparent 95%)'

            }}

          />

        </div>



        {/* Animated Flying Birds in the Sky (left of gopuram) */}

        <div className="absolute top-24 right-[180px] md:right-[230px] lg:right-[260px] w-48 h-32 pointer-events-none z-10 hidden md:block select-none">

          {/* Bird 1 */}

          <div className="absolute top-[10%] left-[20%] animate-bird-glide-1">

            <svg width="28" height="14" viewBox="0 0 30 15" fill="none" className="text-[#0a3d73] animate-bird-flap">

              <path d="M2 11C6 7 11 3 15 7C19 3 24 7 28 11C23 9 17 10 15 11C13 10 7 9 2 11Z" fill="currentColor" />

            </svg>

          </div>



          {/* Bird 2 */}

          <div className="absolute top-[40%] left-[48%] animate-bird-glide-2" style={{ animationDelay: '1.2s' }}>

            <svg width="24" height="12" viewBox="0 0 30 15" fill="none" className="text-[#0a3d73]/85 animate-bird-flap" style={{ animationDelay: '0.15s' }}>

              <path d="M2 11C6 7 11 3 15 7C19 3 24 7 28 11C23 9 17 10 15 11C13 10 7 9 2 11Z" fill="currentColor" />

            </svg>

          </div>



          {/* Bird 3 */}

          <div className="absolute top-[25%] left-[76%] animate-bird-glide-3" style={{ animationDelay: '0.6s' }}>

            <svg width="18" height="9" viewBox="0 0 30 15" fill="none" className="text-[#0a3d73]/75 animate-bird-flap" style={{ animationDelay: '0.3s' }}>

              <path d="M2 11C6 7 11 3 15 7C19 3 24 7 28 11C23 9 17 10 15 11C13 10 7 9 2 11Z" fill="currentColor" />

            </svg>

          </div>

        </div>



        <div className="container mx-auto px-6 relative z-20">



          {/* Section Header with Lotus & Ornament Lines */}

          <div className="flex flex-col items-center text-center space-y-2 mb-8 relative">



            {/* Top Gold Ornament with Lotus (Screenshot Match) */}

            <div className="flex items-center justify-center gap-3 w-full max-w-[340px] md:max-w-[420px] mb-2 text-[#cca75b]">

              <div className="flex-1 flex items-center">

                <div className="h-[1px] w-full bg-[#cca75b]/60" />

                <span className="text-[10px] -ml-1">◆</span>

              </div>



              {/* Golden Lotus Outline Symbol */}

              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="mx-1">

                <path d="M12 3C12 3 9 9 12 21C15 9 12 3 12 3Z" fill="currentColor" fillOpacity="0.1" />

                <path d="M12 21C8 18 5 13 7 9C9 9 11 15 12 21Z" fill="currentColor" fillOpacity="0.1" />

                <path d="M12 21C5 19 3 16 5 12C7 12 10 17 12 21Z" fill="currentColor" fillOpacity="0.05" />

                <path d="M12 21C16 18 19 13 17 9C15 9 13 15 12 21Z" fill="currentColor" fillOpacity="0.1" />

                <path d="M12 21C19 19 21 16 19 12C17 12 14 17 12 21Z" fill="currentColor" fillOpacity="0.05" />

              </svg>



              <div className="flex-1 flex items-center">

                <span className="text-[10px] -mr-1">◆</span>

                <div className="h-[1px] w-full bg-[#cca75b]/60" />

              </div>

            </div>



            <h2 className="text-4xl md:text-[44px] font-serif text-[#0a3d73] tracking-normal mb-1 font-bold">

              Upcoming Festivals

            </h2>



            {/* Bottom Gold Ornament Knot (Screenshot Match) */}

            <div className="flex items-center justify-center gap-3 w-full max-w-[200px] md:max-w-[280px] mt-2 text-[#cca75b]">

              <div className="flex-1 flex items-center justify-end">

                <div className="h-[1px] w-full bg-[#cca75b]/50" />

                <span className="text-[8px] -ml-1">◆</span>

              </div>



              {/* Divine Knot/Scroll Symbol SVG */}

              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-1">

                <path d="M12 6 C10 4, 8 4, 8 6 C8 8, 12 10, 12 12 C12 14, 8 16, 8 18 C8 20, 10 20, 12 18 C14 20, 16 20, 16 18 C16 16, 12 14, 12 12 C12 10, 16 8, 16 6 C16 4, 14 4, 12 6 Z" fill="none" />

              </svg>



              <div className="flex-1 flex items-center justify-start">

                <span className="text-[8px] -mr-1">◆</span>

                <div className="h-[1px] w-full bg-[#cca75b]/50" />

              </div>

            </div>



            <p className="text-[#5c5245] max-w-2xl text-[15px] leading-relaxed pt-3 font-medium">

              Celebrate divine moments and spiritual traditions with us. <br className="hidden md:block" />

              Join our upcoming festivals and be a part of the divine experience.

            </p>

          </div>



          {/* Festivals Grid */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-20">



            {/* Card 1: Jhulan Yatra */}

            <div className="relative group cursor-pointer overflow-hidden duration-500 w-full h-[400px] bg-white text-gray-800 p-4 rounded-3xl border border-[#eae4d5]/40 shadow-md hover:shadow-xl">

              <div className="w-full h-full relative">

                <div className="w-full h-64 overflow-hidden rounded-2xl">

                  <img src="/deity-1.jpg" alt="Jhulan Yatra" className="group-hover:scale-110 w-full h-full object-cover duration-500" />

                </div>

                <div className="absolute w-full left-0 p-4 -bottom-16 duration-500 group-hover:-translate-y-14 z-20">

                  <div className="absolute -z-10 left-0 bottom-[-40px] w-full h-[180px] opacity-0 duration-500 group-hover:opacity-100 group-hover:bg-white rounded-2xl shadow-xl border border-[#eae4d5]/30" />

                  <span className="text-lg font-bold font-serif block text-[#0a3d73]">Jhulan Yatra</span>

                  <span className="text-[10px] text-[#cca75b] font-extrabold tracking-widest uppercase block mb-2">July 06 – July 14, 2025</span>

                  <p className="group-hover:opacity-100 w-full duration-500 opacity-0 text-xs text-[#5c5245] leading-relaxed">

                    Celebrate the divine swing festival of Radha Krishna with kirtans, beautiful decorations and devotion.

                  </p>

                </div>

              </div>

            </div>



            {/* Card 2: Janmashtami */}

            <div className="relative group cursor-pointer overflow-hidden duration-500 w-full h-[400px] bg-white text-gray-800 p-4 rounded-3xl border border-[#eae4d5]/40 shadow-md hover:shadow-xl">

              <div className="w-full h-full relative">

                <div className="w-full h-64 overflow-hidden rounded-2xl">

                  <img src="/deity-2.jpg" alt="Janmashtami" className="group-hover:scale-110 w-full h-full object-cover duration-500" />

                </div>

                <div className="absolute w-full left-0 p-4 -bottom-16 duration-500 group-hover:-translate-y-14 z-20">

                  <div className="absolute -z-10 left-0 bottom-[-40px] w-full h-[180px] opacity-0 duration-500 group-hover:opacity-100 group-hover:bg-white rounded-2xl shadow-xl border border-[#eae4d5]/30" />

                  <span className="text-lg font-bold font-serif block text-[#0a3d73]">Janmashtami</span>

                  <span className="text-[10px] text-[#cca75b] font-extrabold tracking-widest uppercase block mb-2">August 15, 2025</span>

                  <p className="group-hover:opacity-100 w-full duration-500 opacity-0 text-xs text-[#5c5245] leading-relaxed">

                    Commemorate the appearance of Lord Krishna with fasting, midnight aarti, kirtans and joyful celebrations.

                  </p>

                </div>

              </div>

            </div>



            {/* Card 3: Radhashtami */}

            <div className="relative group cursor-pointer overflow-hidden duration-500 w-full h-[400px] bg-white text-gray-800 p-4 rounded-3xl border border-[#eae4d5]/40 shadow-md hover:shadow-xl">

              <div className="w-full h-full relative">

                <div className="w-full h-64 overflow-hidden rounded-2xl">

                  <img src="/deity-1.jpg" alt="Radhashtami" className="group-hover:scale-110 w-full h-full object-cover duration-500" />

                </div>

                <div className="absolute w-full left-0 p-4 -bottom-16 duration-500 group-hover:-translate-y-14 z-20">

                  <div className="absolute -z-10 left-0 bottom-[-40px] w-full h-[180px] opacity-0 duration-500 group-hover:opacity-100 group-hover:bg-white rounded-2xl shadow-xl border border-[#eae4d5]/30" />

                  <span className="text-lg font-bold font-serif block text-[#0a3d73]">Radhashtami</span>

                  <span className="text-[10px] text-[#cca75b] font-extrabold tracking-widest uppercase block mb-2">September 01, 2025</span>

                  <p className="group-hover:opacity-100 w-full duration-500 opacity-0 text-xs text-[#5c5245] leading-relaxed">

                    Honoring the appearance of Srimati Radharani with special puja, kirtans and divine pastimes.

                  </p>

                </div>

              </div>

            </div>



            {/* Card 4: Diwali */}

            <div className="relative group cursor-pointer overflow-hidden duration-500 w-full h-[400px] bg-white text-gray-800 p-4 rounded-3xl border border-[#eae4d5]/40 shadow-md hover:shadow-xl">

              <div className="w-full h-full relative">

                <div className="w-full h-64 overflow-hidden rounded-2xl">

                  <img src="/deity-2.jpg" alt="Diwali" className="group-hover:scale-110 w-full h-full object-cover duration-500" />

                </div>

                <div className="absolute w-full left-0 p-4 -bottom-16 duration-500 group-hover:-translate-y-14 z-20">

                  <div className="absolute -z-10 left-0 bottom-[-40px] w-full h-[180px] opacity-0 duration-500 group-hover:opacity-100 group-hover:bg-white rounded-2xl shadow-xl border border-[#eae4d5]/30" />

                  <span className="text-lg font-bold font-serif block text-[#0a3d73]">Diwali</span>

                  <span className="text-[10px] text-[#cca75b] font-extrabold tracking-widest uppercase block mb-2">October 20, 2025</span>

                  <p className="group-hover:opacity-100 w-full duration-500 opacity-0 text-xs text-[#5c5245] leading-relaxed">

                    The festival of lights symbolizing the victory of good over evil. Join us for puja, lights and joy.

                  </p>

                </div>

              </div>

            </div>



          </div>



          {/* Bottom Button - Matching Screenshot */}

          <div className="mt-8 flex justify-center">



            {/* Custom stylesheet for blooming flower button */}

            <style dangerouslySetInnerHTML={{

              __html: `

              .flower-btn {
                height: 4em;
                width: 14em;
                display: flex;
                align-items: center;
                justify-content: center;
                background: transparent;
                border: 0px solid black;
                cursor: pointer;
                position: relative;
              }

              .flower-wrapper {
                height: 2em;
                width: 12em;
                position: relative;
                background: transparent;
                display: flex;
                justify-content: center;
                align-items: center;
              }

              .flower-text {
                font-size: 14px;
                font-weight: 700;
                z-index: 1;
                color: #0c4a8a;
                padding: 6px 16px;

                border-radius: 6px;

                background: rgba(255, 255, 255, 0.95);

                border: 1.5px solid rgba(204, 167, 91, 0.6);

                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

                transition: all 0.5s ease;

                text-transform: uppercase;

                letter-spacing: 0.5px;

              }



              .flower {

                display: grid;

                grid-template-columns: 1em 1em;

                position: absolute;

                transition: grid-template-columns 0.8s ease;

              }



              .flower1 {

                top: -12px;

                left: -13px;

                transform: rotate(5deg);

              }



              .flower2 {

                bottom: -5px;

                left: 8px;

                transform: rotate(35deg);

              }



              .flower3 {

                bottom: -15px;

                transform: rotate(0deg);

              }



              .flower4 {

                top: -14px;

                transform: rotate(15deg);

              }



              .flower5 {

                right: 11px;

                top: -3px;

                transform: rotate(25deg);

              }



              .flower6 {

                right: -15px;

                bottom: -15px;

                transform: rotate(30deg);

              }



              .petal {

                height: 1em;

                width: 1em;

                border-radius: 40% 70% / 7% 90%;

                background: linear-gradient(#f89b29, #ffc107);

                border: 0.5px solid #ffa000;

                z-index: 0;

                transition: width 0.8s ease, height 0.8s ease;

              }



              .two {

                transform: rotate(90deg);

              }



              .three {

                transform: rotate(270deg);

              }



              .four {

                transform: rotate(180deg);

              }



              .flower-btn:hover .petal {

                background: linear-gradient(#ff0f7b, #f89b29);

                border: 0.5px solid #e07a5f;

              }



              .flower-btn:hover .flower {

                grid-template-columns: 1.5em 1.5em;

              }



              .flower-btn:hover .flower .petal {

                width: 1.5em;

                height: 1.5em;

              }



              .flower-btn:hover .flower-text {

                background: rgba(255, 255, 255, 0.7);

                color: #ff0f7b;

                border-color: #ff0f7b;

              }



              .flower-btn:hover div.flower1 {

                animation: 15s linear 0s normal none infinite running flower1;

              }



              @keyframes flower1 {

                0% {

                  transform: rotate(5deg);

                }

                100% {

                  transform: rotate(365deg);

                }

              }



              .flower-btn:hover div.flower2 {

                animation: 13s linear 1s normal none infinite running flower2;

              }



              @keyframes flower2 {

                0% {

                  transform: rotate(35deg);

                }

                100% {

                  transform: rotate(-325deg);

                }

              }



              .flower-btn:hover div.flower3 {

                animation: 16s linear 1s normal none infinite running flower3;

              }



              @keyframes flower3 {

                0% {

                  transform: rotate(0deg);

                }

                100% {

                  transform: rotate(360deg);

                }

              }



              .flower-btn:hover div.flower4 {

                animation: 17s linear 1s normal none infinite running flower4;

              }



              @keyframes flower4 {

                0% {

                  transform: rotate(15deg);

                }

                100% {

                  transform: rotate(375deg);

                }

              }



              .flower-btn:hover div.flower5 {

                animation: 20s linear 1s normal none infinite running flower5;

              }



              @keyframes flower5 {

                0% {

                  transform: rotate(25deg);

                }

                100% {

                  transform: rotate(-335deg);

                }

              }



              .flower-btn:hover div.flower6 {

                animation: 15s linear 1s normal none infinite running flower6;

              }



              @keyframes flower6 {

                0% {

                  transform: rotate(30deg);

                }

                100% {

                  transform: rotate(390deg);

                }

              }

            ` }} />



            <button className="flower-btn">

              <div className="flower-wrapper">

                <p className="flower-text font-serif">View All Festivals</p>

                <div className="flower flower1">

                  <div className="petal one" />

                  <div className="petal two" />

                  <div className="petal three" />

                  <div className="petal four" />

                </div>

                <div className="flower flower2">

                  <div className="petal one" />

                  <div className="petal two" />

                  <div className="petal three" />

                  <div className="petal four" />

                </div>

                <div className="flower flower3">

                  <div className="petal one" />

                  <div className="petal two" />

                  <div className="petal three" />

                  <div className="petal four" />

                </div>

                <div className="flower flower4">

                  <div className="petal one" />

                  <div className="petal two" />

                  <div className="petal three" />

                  <div className="petal four" />

                </div>

                <div className="flower flower5">

                  <div className="petal one" />

                  <div className="petal two" />

                  <div className="petal three" />

                  <div className="petal four" />

                </div>

                <div className="flower flower6">

                  <div className="petal one" />

                  <div className="petal two" />

                  <div className="petal three" />

                  <div className="petal four" />

                </div>

              </div>

            </button>

          </div>

        </div>



        {/* Bottom decorative pattern overlay */}

        <div className="absolute bottom-0 left-0 w-full h-10 opacity-[0.08]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5z%22 fill=%22%23cca75b%22/%3E%3C/svg%3E')" }} />

      </section>



      {/* 4. FEATURES SECTION */}

      <section id="features" className="relative w-full pt-1 pb-6 bg-white overflow-hidden text-gray-800 flex flex-col items-center">



        {/* Subtle decorative background elements */}

        <div className="absolute top-1/3 left-[10%] w-96 h-96 bg-[#ebd9b3]/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="absolute bottom-1/4 right-[10%] w-80 h-80 bg-[#0c4a8a]/5 rounded-full blur-[100px] pointer-events-none" />



        <div className="container mx-auto px-6 relative z-10">



          {/* Section Header with Lotus & Ornament Lines */}

          <div className="flex flex-col items-center text-center space-y-2 mb-6 relative">



            {/* Top Gold Ornament with Lotus (Screenshot Match) */}

            <div className="flex items-center justify-center gap-3 w-full max-w-[340px] md:max-w-[420px] mb-1.5 text-[#cca75b]">

              <div className="flex-1 flex items-center">

                <div className="h-[1px] w-full bg-[#cca75b]/60" />

                <span className="text-[10px] -ml-1">◆</span>

              </div>



              {/* Golden Lotus Outline Symbol */}

              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="mx-1">

                <path d="M12 3C12 3 9 9 12 21C15 9 12 3 12 3Z" fill="currentColor" fillOpacity="0.1" />

                <path d="M12 21C8 18 5 13 7 9C9 9 11 15 12 21Z" fill="currentColor" fillOpacity="0.1" />

                <path d="M12 21C5 19 3 16 5 12C7 12 10 17 12 21Z" fill="currentColor" fillOpacity="0.05" />

                <path d="M12 21C16 18 19 13 17 9C15 9 13 15 12 21Z" fill="currentColor" fillOpacity="0.1" />

                <path d="M12 21C19 19 21 16 19 12C17 12 14 17 12 21Z" fill="currentColor" fillOpacity="0.05" />

              </svg>



              <div className="flex-1 flex items-center">

                <span className="text-[10px] -mr-1">◆</span>

                <div className="h-[1px] w-full bg-[#cca75b]/60" />

              </div>

            </div>



            <h2 className="text-3xl md:text-[36px] font-serif text-[#0c4a8a] tracking-normal mb-1 font-bold">

              Features

            </h2>



            {/* Bottom Gold Ornament Knot (Screenshot Match) */}

            <div className="flex items-center justify-center gap-3 w-full max-w-[200px] md:max-w-[280px] mt-1 text-[#cca75b]">

              <div className="flex-1 flex items-center justify-end">

                <div className="h-[1px] w-full bg-[#cca75b]/50" />

                <span className="text-[8px] -ml-1">◆</span>

              </div>



              {/* Divine Knot/Scroll Symbol SVG */}

              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-1">

                <path d="M12 6 C10 4, 8 4, 8 6 C8 8, 12 10, 12 12 C12 14, 8 16, 8 18 C8 20, 10 20, 12 18 C14 20, 16 20, 16 18 C16 16, 12 14, 12 12 C12 10, 16 8, 16 6 C16 4, 14 4, 12 6 Z" fill="none" />

              </svg>



              <div className="flex-1 flex items-center justify-start">

                <span className="text-[8px] -mr-1">◆</span>

                <div className="h-[1px] w-full bg-[#cca75b]/50" />

              </div>

            </div>



            <p className="text-[#5c5245] max-w-xl text-[15px] leading-relaxed pt-2 font-medium">

              We have planned for many interesting features in the upcoming <br className="hidden sm:block" />

              Vrindavan Chandrodaya Mandir. Some of them are listed as below:

            </p>

          </div>



          {/* Features Grid */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">



            {/* Card 1: Grand Temple Hall */}

            <div className="sazzad-card h-[560px] cursor-pointer group">

              <div className="sazzad-aurora sazzad-aurora-gold" />

              <div className="sazzad-bg">

                <div className="w-full h-56 overflow-hidden relative">

                  <img

                    src="/ii.png"

                    alt="Grand Temple Hall"

                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"

                  />

                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />

                </div>



                <div className="pt-6 px-5 flex-1 flex flex-col justify-between items-center text-center pb-6 w-full">

                  <div className="flex flex-col items-center w-full">

                    <h3 className="text-lg font-serif text-[#0c4a8a] font-bold mb-0.5 uppercase tracking-wider h-12 flex items-center justify-center">

                      Grand Temple Hall

                    </h3>



                    {/* Gold Ornament Divider */}

                    <div className="flex items-center justify-center gap-2 my-2 text-[#cca75b] w-full max-w-[80px]">

                      <div className="h-[1px] w-full bg-[#cca75b]/60" />

                      <span className="text-[10px]">◆</span>

                      <div className="h-[1px] w-full bg-[#cca75b]/60" />

                    </div>



                    <p className="text-[#5c5245] text-[14px] leading-relaxed font-medium">

                      The Deities of Sri Radha Vrindavan Chandra will be installed in the Main Temple Hall. This spacious hall can accommodate a large number of people.

                    </p>

                  </div>



                  {/* More Info Button */}

                  <button className="creatly-btn font-serif mt-4" style={{ '--clr': '#0c4a8a' } as React.CSSProperties}>

                    <span>More info</span>

                    <div className="creatly-btn__icon-wrapper">

                      <svg className="creatly-btn__icon-svg w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">

                        <line x1="5" y1="12" x2="19" y2="12" />

                        <polyline points="12 5 19 12 12 19" />

                      </svg>

                      <svg className="creatly-btn__icon-svg creatly-btn__icon-svg--copy w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">

                        <line x1="5" y1="12" x2="19" y2="12" />

                        <polyline points="12 5 19 12 12 19" />

                      </svg>

                    </div>

                  </button>

                </div>

              </div>

            </div>



            {/* Card 2: Srila Prabhupada Museum and Expo */}

            <div className="sazzad-card h-[560px] cursor-pointer group">

              <div className="sazzad-aurora sazzad-aurora-orange" />

              <div className="sazzad-bg">

                <div className="w-full h-56 overflow-hidden relative">

                  <img

                    src="/prabhupada.png"

                    alt="Srila Prabhupada Museum and Expo"

                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"

                  />

                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />

                </div>



                <div className="pt-6 px-5 flex-1 flex flex-col justify-between items-center text-center pb-6 w-full">

                  <div className="flex flex-col items-center w-full">

                    <h3 className="text-lg font-serif text-[#0c4a8a] font-bold mb-0.5 uppercase tracking-wider h-12 flex items-center justify-center leading-snug">

                      Srila Prabhupada Museum <br className="hidden sm:block" /> and Expo

                    </h3>



                    {/* Gold Ornament Divider */}

                    <div className="flex items-center justify-center gap-2 my-2 text-[#cca75b] w-full max-w-[80px]">

                      <div className="h-[1px] w-full bg-[#cca75b]/60" />

                      <span className="text-[10px]">◆</span>

                      <div className="h-[1px] w-full bg-[#cca75b]/60" />

                    </div>



                    <p className="text-[#5c5245] text-[14px] leading-relaxed font-medium">

                      His Divine Grace A.C Bhaktivedanta Swami Prabhupada, the Founder-Acharya of ISKCON is regarded as the greatest spiritual ambassador who introduced Indian spiritual wisdom to the world.

                    </p>

                  </div>



                  {/* More Info Button */}

                  <button className="creatly-btn font-serif mt-4" style={{ '--clr': '#0c4a8a' } as React.CSSProperties}>

                    <span>More info</span>

                    <div className="creatly-btn__icon-wrapper">

                      <svg className="creatly-btn__icon-svg w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">

                        <line x1="5" y1="12" x2="19" y2="12" />

                        <polyline points="12 5 19 12 12 19" />

                      </svg>

                      <svg className="creatly-btn__icon-svg creatly-btn__icon-svg--copy w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">

                        <line x1="5" y1="12" x2="19" y2="12" />

                        <polyline points="12 5 19 12 12 19" />

                      </svg>

                    </div>

                  </button>

                </div>

              </div>

            </div>



            {/* Card 3: Gaushala */}

            <div id="initiatives" className="sazzad-card h-[560px] cursor-pointer group">

              <div className="sazzad-aurora sazzad-aurora-green" />

              <div className="sazzad-bg">

                <div className="w-full h-56 overflow-hidden relative">

                  <img

                    src="/cow.png"

                    alt="Gaushala"

                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"

                  />

                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />

                </div>



                <div className="pt-6 px-5 flex-1 flex flex-col justify-between items-center text-center pb-6 w-full">

                  <div className="flex flex-col items-center w-full">

                    <h3 className="text-lg font-serif text-[#0c4a8a] font-bold mb-0.5 uppercase tracking-wider h-12 flex items-center justify-center">

                      Gaushala

                    </h3>



                    {/* Gold Ornament Divider */}

                    <div className="flex items-center justify-center gap-2 my-2 text-[#cca75b] w-full max-w-[80px]">

                      <div className="h-[1px] w-full bg-[#cca75b]/60" />

                      <span className="text-[10px]">◆</span>

                      <div className="h-[1px] w-full bg-[#cca75b]/60" />

                    </div>



                    <p className="text-[#5c5245] text-[14px] leading-relaxed font-medium">

                      We have set up a spacious Gaushala on our campus for cow protection. It is named after the Surabhi cows that are tended by Krishna in Goloka.

                    </p>

                  </div>



                  {/* More Info Button */}

                  <button className="creatly-btn font-serif mt-4" style={{ '--clr': '#0c4a8a' } as React.CSSProperties}>

                    <span>More info</span>

                    <div className="creatly-btn__icon-wrapper">

                      <svg className="creatly-btn__icon-svg w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">

                        <line x1="5" y1="12" x2="19" y2="12" />

                        <polyline points="12 5 19 12 12 19" />

                      </svg>

                      <svg className="creatly-btn__icon-svg creatly-btn__icon-svg--copy w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">

                        <line x1="5" y1="12" x2="19" y2="12" />

                        <polyline points="12 5 19 12 12 19" />

                      </svg>

                    </div>

                  </button>

                </div>

              </div>

            </div>



          </div>



        </div>



        {/* Bottom decorative pattern overlay */}

        <div className="absolute bottom-0 left-0 w-full h-10 opacity-[0.05]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5z%22 fill=%22%23cca75b%22/%3E%3C/svg%3E')" }} />

      </section>



      {/* 5. LATEST UPDATES SECTION */}

      <section className="relative w-full pt-1 pb-2 bg-[#faf8f5] flex flex-col items-center overflow-hidden border-t border-[#eae4d5]/30">



        {/* Subtle decorative background elements */}

        <div className="absolute top-1/2 left-[-10%] w-80 h-80 bg-[#cca75b]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="absolute top-1/3 right-[-5%] w-[350px] h-[350px] bg-[#0c4a8a]/5 rounded-full blur-[120px] pointer-events-none" />



        <div className="container mx-auto px-6 relative z-10">



          {/* Section Header with Lotus & Ornament Lines */}

          <div className="flex flex-col items-center text-center space-y-2 mb-6 relative">



            {/* Top Gold Ornament with Lotus (Screenshot Match) */}

            <div className="flex items-center justify-center gap-3 w-full max-w-[340px] md:max-w-[420px] mb-1.5 text-[#cca75b]">

              <div className="flex-1 flex items-center">

                <div className="h-[1px] w-full bg-[#cca75b]/60" />

                <span className="text-[10px] -ml-1">◆</span>

              </div>



              {/* Golden Lotus Outline Symbol */}

              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="mx-1">

                <path d="M12 3C12 3 9 9 12 21C15 9 12 3 12 3Z" fill="currentColor" fillOpacity="0.1" />

                <path d="M12 21C8 18 5 13 7 9C9 9 11 15 12 21Z" fill="currentColor" fillOpacity="0.1" />

                <path d="M12 21C5 19 3 16 5 12C7 12 10 17 12 21Z" fill="currentColor" fillOpacity="0.05" />

                <path d="M12 21C16 18 19 13 17 9C15 9 13 15 12 21Z" fill="currentColor" fillOpacity="0.1" />

                <path d="M12 21C19 19 21 16 19 12C17 12 14 17 12 21Z" fill="currentColor" fillOpacity="0.05" />

              </svg>



              <div className="flex-1 flex items-center">

                <span className="text-[10px] -mr-1">◆</span>

                <div className="h-[1px] w-full bg-[#cca75b]/60" />

              </div>

            </div>



            <h2 className="text-3xl md:text-[36px] font-serif text-[#0c4a8a] tracking-normal mb-1 font-bold">

              Latest Updates

            </h2>



            {/* Bottom Gold Ornament Knot (Screenshot Match) */}

            <div className="flex items-center justify-center gap-3 w-full max-w-[200px] md:max-w-[280px] mt-1 text-[#cca75b]">

              <div className="flex-1 flex items-center justify-end">

                <div className="h-[1px] w-full bg-[#cca75b]/50" />

                <span className="text-[8px] -ml-1">◆</span>

              </div>



              {/* Divine Knot/Scroll Symbol SVG */}

              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-1">

                <path d="M12 6 C10 4, 8 4, 8 6 C8 8, 12 10, 12 12 C12 14, 8 16, 8 18 C8 20, 10 20, 12 18 C14 20, 16 20, 16 18 C16 16, 12 14, 12 12 C12 10, 16 8, 16 6 C16 4, 14 4, 12 6 Z" fill="none" />

              </svg>



              <div className="flex-1 flex items-center justify-start">

                <span className="text-[8px] -mr-1">◆</span>

                <div className="h-[1px] w-full bg-[#cca75b]/50" />

              </div>

            </div>



            <p className="text-[#5c5245] max-w-xl text-[15px] leading-relaxed pt-2 font-medium">

              Stay informed with the latest insights, cultural articles, and visual reports <br className="hidden sm:block" />

              from our ashram and cow protection sanctuaries.

            </p>

          </div>



          {/* Style tag for custom updates hover cards */}

          <style dangerouslySetInnerHTML={{

            __html: `

            .update-hover-card {
              position: relative;
              display: flex;
              flex-direction: column;
              width: 100%;
              max-width: 350px;
              margin: 0 auto;
              height: 480px;
              background-color: #ffffff;
              border-radius: 12px;
              box-shadow: 15px 15px 30px #d9d9d9, -15px -15px 30px #ffffff;
              transition: border-radius cubic-bezier(0.075, 0.82, 0.165, 1) 1s, transform cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
              overflow: hidden;
              cursor: pointer;
              z-index: 1;
            }

            .update-hover-card:hover {
              border-bottom-right-radius: 50px;
              border-top-left-radius: 50px;
              transform: scale(1.05);
            }

            .update-hover-card .content-area {
              padding: 20px;
              display: flex;
              flex-direction: column;
              flex-grow: 1;
              justify-content: space-between;
              color: #212121;
              transition: border-radius cubic-bezier(0.075, 0.82, 0.165, 1) 1s, transform cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
            }

            .update-hover-card .meta-text {
              color: rgba(0, 0, 0, 0.6) !important;
              border-color: rgba(0, 0, 0, 0.1) !important;
            }
            
            .update-hover-card .meta-icon {
              color: #212121 !important;
            }

            .update-hover-card .heading-title {
              color: #212121 !important;
              font-size: 1.1rem !important;
              line-height: 1.3 !important;
            }

            .update-hover-card .paragraph-text {
              color: rgba(0, 0, 0, 0.7) !important;
              font-size: 0.85rem !important;
              display: -webkit-box !important;
              -webkit-line-clamp: 2 !important;
              -webkit-box-orient: vertical !important;
              overflow: hidden !important;
            }



            .update-hover-card .btn-more {
              position: relative;
              overflow: hidden;
              height: 3rem;
              padding: 0 2rem;
              border-radius: 1.5rem;
              background: #3d3a4e;
              background-size: 400%;
              color: #fff;
              border: none;
              cursor: pointer;
              display: inline-flex;
              align-items: center;
              gap: 8px;
              font-weight: 600;
              font-size: 14px;
              text-decoration: none;
              align-self: flex-start;
            }

            .update-hover-card .btn-more::before {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              transform: scaleX(0);
              transform-origin: 0 50%;
              width: 100%;
              height: 100%;
              border-radius: inherit;
              background: linear-gradient(
                82.3deg,
                rgba(150, 93, 233, 1) 10.8%,
                rgba(99, 88, 238, 1) 94.3%
              );
              transition: all 0.475s;
            }

            .update-hover-card .btn-more:hover::before {
              transform: scaleX(1);
            }

            .update-hover-card .btn-more > span,
            .update-hover-card .btn-more > svg {
              position: relative;
              z-index: 1;
            }

          ` }} />



          {/* Blogs Grid */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">

            {(latestBlogs.length > 0 ? latestBlogs : defaultBlogs).map((blog) => (

              <div key={blog.slug} className="sazzad-card h-[560px] cursor-pointer group">
                <div className="sazzad-aurora sazzad-aurora-orange" />
                <div className="sazzad-bg">
                  <div className="w-full h-56 overflow-hidden relative">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
                  </div>

                  <div className="pt-6 px-5 flex-1 flex flex-col justify-between items-center text-center pb-6 w-full">
                    <div className="flex flex-col items-center w-full">
                      {/* Meta row */}
                      <div className="flex items-center justify-center gap-4 text-xs text-[#5c5245] border-b border-[#eae4d5]/50 pb-2 mb-3 font-medium w-full">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-[#cca75b]" />
                          <span>{blog.authorName}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#cca75b]" />
                          <span>{new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-serif text-[#0c4a8a] font-bold mb-0.5 tracking-wider h-12 flex items-center justify-center line-clamp-2">
                        {blog.title}
                      </h3>

                      {/* Gold Ornament Divider */}
                      <div className="flex items-center justify-center gap-2 my-2 text-[#cca75b] w-full max-w-[80px]">
                        <div className="h-[1px] w-full bg-[#cca75b]/60" />
                        <span className="text-[10px]">◆</span>
                        <div className="h-[1px] w-full bg-[#cca75b]/60" />
                      </div>

                      <p className="text-[#5c5245] text-[14px] leading-relaxed font-medium line-clamp-3">
                        {blog.excerpt}
                      </p>
                    </div>

                    {/* Action Link */}
                    <Link href={`/blog/${blog.slug}`} className="no-underline mt-4 w-full flex justify-center">
                      <button className="creatly-btn font-serif" style={{ '--clr': '#0c4a8a' } as React.CSSProperties}>
                        <span>Read Article</span>
                        <div className="creatly-btn__icon-wrapper">
                          <svg className="creatly-btn__icon-svg w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                          <svg className="creatly-btn__icon-svg creatly-btn__icon-svg--copy w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </div>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

            ))}

          </div>



          {/* Bottom Button */}

          <div className="mt-12 flex justify-center">

            <Link href="/blog" className="no-underline">

              <button className="cssbuttons-io-button font-serif">

                <span>View All Updates</span>

                <div className="icon">

                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">

                    <line x1="5" y1="12" x2="19" y2="12" />

                    <polyline points="12 5 19 12 12 19" />

                  </svg>

                </div>

              </button>

            </Link>

          </div>



        </div>



        {/* Bottom decorative pattern overlay */}

        <div className="absolute bottom-0 left-0 w-full h-10 opacity-[0.05]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5z%22 fill=%22%23cca75b%22/%3E%3C/svg%3E')" }} />

      </section>



      {/* 6. ONLINE DONATIONS SECTION */}

      <section className="relative w-full pt-1 pb-6 bg-[#faf8f5] overflow-hidden flex flex-col items-center">



        {/* Style tag for custom ripple donate buttons */}

        <style dangerouslySetInnerHTML={{

          __html: `

          .ripple-btn {

            position: relative;

            outline: 0;

            display: inline-flex;

            align-items: center;

            justify-content: space-between;

            background: #0c4a8a;

            min-width: 200px;

            border: 0;

            border-radius: 6px;

            box-shadow: 0 4px 12px rgba(0, 0, 0, .1);

            box-sizing: border-box;

            padding: 12px 20px;

            color: #fff;

            font-size: 12px;

            font-weight: 700;

            letter-spacing: 1.2px;

            text-transform: uppercase;

            overflow: hidden;

            cursor: pointer;

            transition: all 0.3s ease;

          }



          .ripple-btn:hover {

            opacity: .95;

            background: #0a3d73;

            box-shadow: 0 6px 16px rgba(0, 0, 0, .15);

          }



          .ripple-btn .ripple-animation {

            border-radius: 100%;

            animation: ripple 0.6s linear infinite;

            display: inline-block;

            flex-shrink: 0;

            width: 0;

            height: 0;

          }



          @keyframes ripple {

            0% {

              box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.2), 0 0 0 10px rgba(255, 255, 255, 0.2), 0 0 0 20px rgba(255, 255, 255, 0.2), 0 0 0 30px rgba(255, 255, 255, 0.2);

            }



            100% {

              box-shadow: 0 0 0 10px rgba(255, 255, 255, 0.2), 0 0 0 20px rgba(255, 255, 255, 0.2), 0 0 0 30px rgba(255, 255, 255, 0.2), 0 0 0 40px rgba(255, 255, 255, 0);

            }

          }

        ` }} />



        {/* Subtle background pattern */}

        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5z%22 fill=%22%23cca75b%22/%3E%3C/svg%3E')" }} />



        <div className="container mx-auto px-6 relative z-10">



          {/* Section Header */}

          <div className="flex flex-col items-center text-center space-y-2 mb-6 relative">



            {/* Top Gold Ornament */}

            <div className="flex items-center justify-center gap-3 w-full max-w-[340px] md:max-w-[420px] mb-1.5 text-[#cca75b]">

              <div className="flex-1 flex items-center">

                <div className="h-[1px] w-full bg-[#cca75b]/60" />

                <span className="text-[10px] -ml-1">◆</span>

              </div>

              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="mx-1">

                <path d="M12 3C12 3 9 9 12 21C15 9 12 3 12 3Z" fill="currentColor" fillOpacity="0.1" />

                <path d="M12 21C8 18 5 13 7 9C9 9 11 15 12 21Z" fill="currentColor" fillOpacity="0.1" />

                <path d="M12 21C5 19 3 16 5 12C7 12 10 17 12 21Z" fill="currentColor" fillOpacity="0.05" />

                <path d="M12 21C16 18 19 13 17 9C15 9 13 15 12 21Z" fill="currentColor" fillOpacity="0.1" />

                <path d="M12 21C19 19 21 16 19 12C17 12 14 17 12 21Z" fill="currentColor" fillOpacity="0.05" />

              </svg>

              <div className="flex-1 flex items-center">

                <span className="text-[10px] -mr-1">◆</span>

                <div className="h-[1px] w-full bg-[#cca75b]/60" />

              </div>

            </div>



            <h2 className="text-4xl md:text-[44px] font-serif text-[#0a3d73] tracking-normal mb-1">

              Online Donations

            </h2>



            {/* Bottom ornament */}

            <div className="flex items-center justify-center gap-3 w-full max-w-[260px] mb-1 text-[#cca75b]">

              <div className="flex-1 flex items-center">

                <div className="h-[1px] w-full bg-[#cca75b]/50" />

                <span className="text-[8px] -ml-1">◆</span>

              </div>

              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-1">

                <path d="M12 6 C10 4, 8 4, 8 6 C8 8, 12 10, 12 12 C12 14, 8 16, 8 18 C8 20, 10 20, 12 18 C14 20, 16 20, 16 18 C16 16, 12 14, 12 12 C12 10, 16 8, 16 6 C16 4, 14 4, 12 6 Z" fill="none" />

              </svg>

              <div className="flex-1 flex items-center justify-start">

                <span className="text-[8px] -mr-1">◆</span>

                <div className="h-[1px] w-full bg-[#cca75b]/50" />

              </div>

            </div>



            <p className="text-[#5c5245] max-w-2xl text-[15px] leading-relaxed pt-2">

              Your generous contribution helps us continue temple activities, prasadam distribution,<br className="hidden md:block" />

              Gau Seva, Annadanam, and spiritual development programs for devotees and the community.

            </p>

          </div>



          {/* Donations Grid — sazzad-card style matching Festivals section */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-20">



            {/* Card 1: Square Feet Campaign */}

            <div className="sazzad-card h-[430px] cursor-pointer group">

              <div className="sazzad-aurora sazzad-aurora-cyan" />

              <div className="sazzad-bg">

                <div className="w-full h-40 overflow-hidden relative">

                  <img src="/square_feet_campaign.png" alt="Square Feet Campaign" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />

                </div>

                <div className="pt-6 px-6 flex flex-col items-center text-center pb-6">

                  <h3 className="text-xl font-serif text-[#0a3d73] mb-2 font-bold">Square Feet Campaign</h3>

                  <div className="flex items-center gap-1.5 text-xs text-[#b8964d] mb-4 tracking-wider uppercase font-bold">

                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#cca75b]"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>

                    <span>Support Temple Construction</span>

                  </div>

                  <p className="text-[#5c5245] text-[14px] leading-relaxed mb-4">

                    Contribute towards temple construction and become part of a divine spiritual legacy for future generations.

                  </p>

                  <Link href="/donate" className="mt-auto no-underline">

                    <button className="ripple-btn font-serif">

                      <i className="ripple-animation" />

                      <span>Donate Now</span>

                      <i className="ripple-animation" />

                    </button>

                  </Link>

                </div>

              </div>

            </div>



            {/* Card 2: Annadan */}

            <div className="sazzad-card h-[430px] cursor-pointer group">

              <div className="sazzad-aurora sazzad-aurora-gold" />

              <div className="sazzad-bg">

                <div className="w-full h-40 overflow-hidden relative">

                  <img src="/annadan.jpg" alt="Annadan" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />

                </div>

                <div className="pt-6 px-6 flex flex-col items-center text-center pb-6">

                  <h3 className="text-xl font-serif text-[#0a3d73] mb-2 font-bold">Annadan</h3>

                  <div className="flex items-center gap-1.5 text-xs text-[#b8964d] mb-4 tracking-wider uppercase font-bold">

                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#cca75b]"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>

                    <span>Feed the Devotees</span>

                  </div>

                  <p className="text-[#5c5245] text-[14px] leading-relaxed mb-4">

                    Help serve sanctified prasadam meals to devotees, pilgrims, and those in need through our daily Annadan Seva.

                  </p>

                  <Link href="/donate" className="mt-auto no-underline">

                    <button className="ripple-btn font-serif">

                      <i className="ripple-animation" />

                      <span>Donate Now</span>

                      <i className="ripple-animation" />

                    </button>

                  </Link>

                </div>

              </div>

            </div>



            {/* Card 3: Gau-Seva */}

            <div className="sazzad-card h-[430px] cursor-pointer group">

              <div className="sazzad-aurora sazzad-aurora-rose" />

              <div className="sazzad-bg">

                <div className="w-full h-40 overflow-hidden relative">

                  <img src="/gau_seva.jpg" alt="Gau-Seva" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />

                </div>

                <div className="pt-6 px-6 flex flex-col items-center text-center pb-6">

                  <h3 className="text-xl font-serif text-[#0a3d73] mb-2 font-bold">Gau-Seva</h3>

                  <div className="flex items-center gap-1.5 text-xs text-[#b8964d] mb-4 tracking-wider uppercase font-bold">

                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#cca75b]"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>

                    <span>Gau Seva & Cow Protection</span>

                  </div>

                  <p className="text-[#5c5245] text-[14px] leading-relaxed mb-4">

                    Support the care, protection, feeding, and shelter of cows in our goshala with your loving contribution.

                  </p>

                  <Link href="/donate" className="mt-auto no-underline">

                    <button className="ripple-btn font-serif">

                      <i className="ripple-animation" />

                      <span>Donate Now</span>

                      <i className="ripple-animation" />

                    </button>

                  </Link>

                </div>

              </div>

            </div>



            {/* Card 4: Mandir Nitya Seva */}

            <div className="sazzad-card h-[430px] cursor-pointer group">

              <div className="sazzad-aurora sazzad-aurora-green" />

              <div className="sazzad-bg">

                <div className="w-full h-40 overflow-hidden relative">

                  <img src="/mandir_nitya_seva.png" alt="Mandir Nitya Seva" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />

                </div>

                <div className="pt-6 px-6 flex flex-col items-center text-center pb-6">

                  <h3 className="text-xl font-serif text-[#0a3d73] mb-2 font-bold">Mandir Nitya Seva</h3>

                  <div className="flex items-center gap-1.5 text-xs text-[#b8964d] mb-4 tracking-wider uppercase font-bold">

                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#cca75b]"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>

                    <span>Daily Worship & Seva</span>

                  </div>

                  <p className="text-[#5c5245] text-[14px] leading-relaxed mb-4">

                    Participate in the daily worship, deity seva, temple maintenance, and spiritual activities through Nitya Seva.

                  </p>

                  <Link href="/donate" className="mt-auto no-underline">

                    <button className="ripple-btn font-serif">

                      <i className="ripple-animation" />

                      <span>Donate Now</span>

                      <i className="ripple-animation" />

                    </button>

                  </Link>

                </div>

              </div>

            </div>



          </div>



        </div>



        {/* Bottom decorative pattern */}

        <div className="absolute bottom-0 left-0 w-full h-10 opacity-[0.06]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5z%22 fill=%22%23cca75b%22/%3E%3C/svg%3E')" }} />

      </section>



    </div>

  );

}
