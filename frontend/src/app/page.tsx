"use client";

import React, { useEffect, useState, useRef } from 'react';

import Link from 'next/link';

import { useCms } from '@/components/CmsContext';

import { VisualEditable } from '@/components/VisualEditable';

import { ChevronLeft, ChevronRight, ArrowRight, Play, Calendar, User, BookOpen } from 'lucide-react';
import CoverflowGallery from '@/components/CoverflowGallery';
import FeatureCard from '@/components/FeatureCard';
import UpcomingFestivals from '@/components/UpcomingFestivals';



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

            <div className="flex-1 w-full flex items-center justify-center lg:justify-end z-10 pt-6 lg:pt-8">

              <div className="relative w-[95%] lg:w-[85%] max-w-[500px] animate-float drop-shadow-2xl mt-4 lg:mt-6">

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



      <UpcomingFestivals isHomePage={true} />

      {/* 4. FEATURES SECTION */}

      <section id="features" className="relative w-full pt-1 pb-6 bg-[#f3eedc] overflow-hidden text-gray-800 flex flex-col items-center" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='800' height='400' viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23cca75b' opacity='0.15' text-anchor='middle' font-family='sans-serif' font-size='24' font-style='italic'%3E%3Ctext x='400' y='160'%3E%E0%A4%B9%E0%A4%B0%E0%A5%87 %E0%A4%95%E0%A5%83%E0%A4%B7%E0%A5%8D%E0%A4%A3 %E0%A4%B9%E0%A4%B0%E0%A5%87 %E0%A4%95%E0%A5%83%E0%A4%B7%E0%A5%8D%E0%A4%A3 %E0%A4%95%E0%A5%83%E0%A4%B7%E0%A5%8D%E0%A4%A3 %E0%A4%95%E0%A5%83%E0%A4%B7%E0%A5%8D%E0%A4%A3 %E0%A4%B9%E0%A4%B0%E0%A5%87 %E0%A4%B9%E0%A4%B0%E0%A5%87 %E0%A5%A4%3C/text%3E%3Ctext x='400' y='220'%3E%E0%A4%B9%E0%A4%B0%E0%A5%87 %E0%A4%B0%E0%A4%BE%E0%A4%AE %E0%A4%B9%E0%A4%B0%E0%A5%87 %E0%A4%B0%E0%A4%BE%E0%A4%AE %E0%A4%B0%E0%A4%BE%E0%A4%AE %E0%A4%B0%E0%A4%BE%E0%A4%AE %E0%A4%B9%E0%A4%B0%E0%A5%87 %E0%A4%B9%E0%A4%B0%E0%A5%87 %E0%A5%A5%3C/text%3E%3C/g%3E%3Cg fill='none' stroke='%23cca75b' stroke-width='1.5' opacity='0.2'%3E%3Cg transform='translate(150, 40) scale(2)'%3E%3Cpath d='M12 3C12 3 9 9 12 21C15 9 12 3 12 3Z'/%3E%3Cpath d='M12 21C8 18 5 13 7 9C9 9 11 15 12 21Z'/%3E%3Cpath d='M12 21C5 19 3 16 5 12C7 12 10 17 12 21Z'/%3E%3Cpath d='M12 21C16 18 19 13 17 9C15 9 13 15 12 21Z'/%3E%3Cpath d='M12 21C19 19 21 16 19 12C17 12 14 17 12 21Z'/%3E%3C/g%3E%3Cg transform='translate(600, 260) scale(2)'%3E%3Cpath d='M12 3C12 3 9 9 12 21C15 9 12 3 12 3Z'/%3E%3Cpath d='M12 21C8 18 5 13 7 9C9 9 11 15 12 21Z'/%3E%3Cpath d='M12 21C5 19 3 16 5 12C7 12 10 17 12 21Z'/%3E%3Cpath d='M12 21C16 18 19 13 17 9C15 9 13 15 12 21Z'/%3E%3Cpath d='M12 21C19 19 21 16 19 12C17 12 14 17 12 21Z'/%3E%3C/g%3E%3Cg transform='translate(550, 40) scale(1.5)'%3E%3Ccircle cx='16' cy='16' r='14'/%3E%3Ccircle cx='16' cy='16' r='4'/%3E%3Cpath d='M16 2 L16 12 M16 20 L16 30 M2 16 L12 16 M20 16 L30 16 M6 6 L13 13 M19 19 L26 26 M26 6 L19 13 M6 26 L13 19'/%3E%3C/g%3E%3Cg transform='translate(200, 260) scale(1.5)'%3E%3Cpath d='M16 4 C24 4 28 10 28 16 C28 24 20 28 12 28 C8 28 4 24 4 20 C4 14 10 10 16 10 C20 10 22 14 22 16 C22 20 18 22 16 22 C14 22 14 20 14 20' /%3E%3Cpath d='M12 28 L8 32 L16 32 Z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")", backgroundRepeat: 'repeat', backgroundSize: '600px 300px' }}>



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



            <FeatureCard
              title="Iconic Dehradun Temple"
              imageSrc="/ii.png"
              auroraClass="sazzad-aurora-gold"
              shortDescription="Hare Krishna Movement Dehradun is building a world-class spiritual centre in the picturesque valley to place Krishna proudly on the minds of the people."
              detailedDescription={
                <>
                  <p>Hare Krishna Movement Dehradun is building an iconic spiritual centre in the heart of Uttarakhand. This majestic temple will serve as a spiritually surcharged sanctuary, designed to accommodate thousands of seekers and devotees.</p>
                  <p>In pursuance of Srila Prabhupada&apos;s direction, the temple will offer continuous devotion through daily aartis, kirtans, and bhajans. It will act as a vibrant hub of Vedic culture, featuring enlightening discourses, grand festival celebrations, and extensive prasadam distribution to put Dehradun on the global spiritual map.</p>
                </>
              }
            />

            <FeatureCard
              title={<>Srila Prabhupada Museum <br className="hidden sm:block" /> and Expo</>}
              imageSrc="/prabhupada.png"
              auroraClass="sazzad-aurora-orange"
              shortDescription="His Divine Grace A.C Bhaktivedanta Swami Prabhupada, the Founder-Acharya of ISKCON is regarded as the greatest spiritual ambassador who introduced Indian spiritual wisdom to the world."
              detailedDescription={
                <p>His Divine Grace A.C Bhaktivedanta Swami Prabhupada, the Founder-Acharya of ISKCON is regarded as the greatest spiritual ambassador who introduced Indian spiritual wisdom to the world. Detailed information regarding the museum exhibits, historical artifacts, and immersive experiences will be updated here shortly.</p>
              }
            />



            <div id="initiatives" className="h-full flex flex-col w-full">
              <FeatureCard
                title="Gaushala"
                imageSrc="/cow.png"
                auroraClass="sazzad-aurora-green"
                shortDescription="We have set up a spacious Gaushala on our campus for cow protection. It is named after the Surabhi cows that are tended by Krishna in Goloka."
                detailedDescription={
                  <p>We have set up a spacious Gaushala on our campus for cow protection. It is named after the Surabhi cows that are tended by Krishna in Goloka. Detailed information about our cow protection programs, daily seva activities, and how you can participate will be updated here shortly.</p>
                }
              />
            </div>



          </div>



        </div>



        {/* Bottom decorative pattern overlay */}

        <div className="absolute bottom-0 left-0 w-full h-10 opacity-[0.05]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5z%22 fill=%22%23cca75b%22/%3E%3C/svg%3E')" }} />

      </section>



      {/* 5. LATEST UPDATES SECTION */}
      <section className="relative w-full pt-1 pb-2 bg-[#faf8f5] flex flex-col items-center overflow-hidden border-t border-[#eae4d5]/30" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='800' height='400' viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23cca75b' stroke-width='2' opacity='0.2'%3E%3Cg transform='translate(100, 50) scale(1.5)'%3E%3Cpath d='M20 5C20 5 10 15 20 35C30 15 20 5 20 5Z'/%3E%3Cpath d='M20 35C10 30 5 20 10 12C15 12 18 25 20 35Z'/%3E%3Cpath d='M20 35C30 30 35 20 30 12C25 12 22 25 20 35Z'/%3E%3C/g%3E%3Cg transform='translate(300, 50) scale(1.5)'%3E%3Ccircle cx='20' cy='10' r='4'/%3E%3Cpath d='M20 15 L20 25 M10 20 L30 20 M10 35 C10 35 15 25 20 25 C25 25 30 35 30 35 M10 35 L30 35'/%3E%3C/g%3E%3Cg transform='translate(500, 50) scale(1.5)'%3E%3Ccircle cx='20' cy='20' r='10' stroke-dasharray='2 2'/%3E%3Cpath d='M20 10 C25 10 30 15 30 20 C30 25 25 30 20 30 C15 30 10 25 10 20 C10 17 12 15 15 15 C17 15 18 17 18 18 C18 19 17 20 16 20'/%3E%3Cpath d='M20 0L20 5 M20 35L20 40 M0 20L5 20 M35 20L40 20 M5 5L10 10 M30 30L35 35 M5 35L10 30 M30 10L35 5'/%3E%3C/g%3E%3Cg transform='translate(700, 50) scale(1.5)'%3E%3Cpath d='M12 25 L12 10 A3 3 0 0 1 18 10 L18 20 M18 15 L18 5 A3 3 0 0 1 24 5 L24 20 M24 15 L24 8 A3 3 0 0 1 30 8 L30 25 C30 35 20 40 12 35 C8 32 5 28 5 25 L5 15 A3 3 0 0 1 11 15 L11 25'/%3E%3Cpath d='M15 25 C18 25 20 27 20 30 C20 32 18 34 16 34 C14 34 12 32 12 30 C12 29 13 28 14 28'/%3E%3C/g%3E%3Cg transform='translate(200, 200) scale(1.5)'%3E%3Ccircle cx='20' cy='6' r='4'/%3E%3Cpath d='M12 16 Q20 13 28 16 L33 28 Q28 25 20 25 Q12 25 7 28 Z'/%3E%3Cpath d='M20 18 L20 24'/%3E%3Cpath d='M5 32 Q20 27 35 32 Q30 38 20 38 Q10 38 5 32 Z'/%3E%3C/g%3E%3Cg transform='translate(400, 200) scale(1.5)'%3E%3Cpath d='M22 5 A 15 15 0 1 0 22 35 A 12 12 0 1 1 22 5 Z'/%3E%3Cpath d='M8 20 L12 20 M10 18 L10 22'/%3E%3C/g%3E%3Cg transform='translate(600, 200) scale(1.5)'%3E%3Cpath d='M20 5 C28 5 30 15 20 18 C18 12 22 10 20 5'/%3E%3Cpath d='M10 25 C5 18 10 10 16 16 C12 18 10 15 10 25'/%3E%3Cpath d='M30 25 C35 18 30 10 24 16 C28 18 30 15 30 25'/%3E%3Cpath d='M10 25 Q20 35 30 25'/%3E%3Ccircle cx='20' cy='22' r='2'/%3E%3C/g%3E%3C/g%3E%3Ctext x='400' y='140' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Krishna Hare Krishna, Krishna Krishna Hare Hare%3C/text%3E%3Ctext x='400' y='165' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Rama Hare Rama, Rama Rama Hare Hare%3C/text%3E%3Ctext x='400' y='340' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Krishna Hare Krishna, Krishna Krishna Hare Hare%3C/text%3E%3Ctext x='400' y='365' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Rama Hare Rama, Rama Rama Hare Hare%3C/text%3E%3C/svg%3E\")", backgroundRepeat: 'repeat', backgroundSize: '600px 300px' }}>

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

              <div key={blog.slug} className="sazzad-card h-full min-h-[440px] cursor-pointer group">
                <div className="sazzad-aurora sazzad-aurora-orange" />
                <div className="sazzad-bg">
                  <div className="w-full h-44 overflow-hidden relative">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
                  </div>

                  <div className="pt-4 px-5 flex-1 flex flex-col justify-between items-center text-center pb-4 w-full">
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
                      <button className="learn-more">
                        <span className="circle" aria-hidden="true">
                          <span className="icon arrow" />
                        </span>
                        <span className="button-text">Read Article</span>
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
      <section className="relative w-full pt-10 pb-16 bg-[#faf8f5] overflow-hidden flex flex-col items-center" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='800' height='400' viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23cca75b' stroke-width='2' opacity='0.2'%3E%3Cg transform='translate(100, 50) scale(1.5)'%3E%3Cpath d='M20 5C20 5 10 15 20 35C30 15 20 5 20 5Z'/%3E%3Cpath d='M20 35C10 30 5 20 10 12C15 12 18 25 20 35Z'/%3E%3Cpath d='M20 35C30 30 35 20 30 12C25 12 22 25 20 35Z'/%3E%3C/g%3E%3Cg transform='translate(300, 50) scale(1.5)'%3E%3Ccircle cx='20' cy='10' r='4'/%3E%3Cpath d='M20 15 L20 25 M10 20 L30 20 M10 35 C10 35 15 25 20 25 C25 25 30 35 30 35 M10 35 L30 35'/%3E%3C/g%3E%3Cg transform='translate(500, 50) scale(1.5)'%3E%3Ccircle cx='20' cy='20' r='10' stroke-dasharray='2 2'/%3E%3Cpath d='M20 10 C25 10 30 15 30 20 C30 25 25 30 20 30 C15 30 10 25 10 20 C10 17 12 15 15 15 C17 15 18 17 18 18 C18 19 17 20 16 20'/%3E%3Cpath d='M20 0L20 5 M20 35L20 40 M0 20L5 20 M35 20L40 20 M5 5L10 10 M30 30L35 35 M5 35L10 30 M30 10L35 5'/%3E%3C/g%3E%3Cg transform='translate(700, 50) scale(1.5)'%3E%3Cpath d='M12 25 L12 10 A3 3 0 0 1 18 10 L18 20 M18 15 L18 5 A3 3 0 0 1 24 5 L24 20 M24 15 L24 8 A3 3 0 0 1 30 8 L30 25 C30 35 20 40 12 35 C8 32 5 28 5 25 L5 15 A3 3 0 0 1 11 15 L11 25'/%3E%3Cpath d='M15 25 C18 25 20 27 20 30 C20 32 18 34 16 34 C14 34 12 32 12 30 C12 29 13 28 14 28'/%3E%3C/g%3E%3Cg transform='translate(200, 200) scale(1.5)'%3E%3Ccircle cx='20' cy='6' r='4'/%3E%3Cpath d='M12 16 Q20 13 28 16 L33 28 Q28 25 20 25 Q12 25 7 28 Z'/%3E%3Cpath d='M20 18 L20 24'/%3E%3Cpath d='M5 32 Q20 27 35 32 Q30 38 20 38 Q10 38 5 32 Z'/%3E%3C/g%3E%3Cg transform='translate(400, 200) scale(1.5)'%3E%3Cpath d='M22 5 A 15 15 0 1 0 22 35 A 12 12 0 1 1 22 5 Z'/%3E%3Cpath d='M8 20 L12 20 M10 18 L10 22'/%3E%3C/g%3E%3Cg transform='translate(600, 200) scale(1.5)'%3E%3Cpath d='M20 5 C28 5 30 15 20 18 C18 12 22 10 20 5'/%3E%3Cpath d='M10 25 C5 18 10 10 16 16 C12 18 10 15 10 25'/%3E%3Cpath d='M30 25 C35 18 30 10 24 16 C28 18 30 15 30 25'/%3E%3Cpath d='M10 25 Q20 35 30 25'/%3E%3Ccircle cx='20' cy='22' r='2'/%3E%3C/g%3E%3C/g%3E%3Ctext x='400' y='140' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Krishna Hare Krishna, Krishna Krishna Hare Hare%3C/text%3E%3Ctext x='400' y='165' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Rama Hare Rama, Rama Rama Hare Hare%3C/text%3E%3Ctext x='400' y='340' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Krishna Hare Krishna, Krishna Krishna Hare Hare%3C/text%3E%3Ctext x='400' y='365' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Rama Hare Rama, Rama Rama Hare Hare%3C/text%3E%3C/svg%3E\")", backgroundRepeat: 'repeat', backgroundSize: '600px 300px' }}>

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

            <div className="sazzad-card h-full min-h-[430px] cursor-pointer group">

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

            <div className="sazzad-card h-full min-h-[430px] cursor-pointer group">

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

            <div className="sazzad-card h-full min-h-[430px] cursor-pointer group">

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

            <div className="sazzad-card h-full min-h-[430px] cursor-pointer group">

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

      {/* 7. GALLERY SECTION */}
      <CoverflowGallery />



    </div>

  );

}
