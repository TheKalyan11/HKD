"use client";
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import FeatureCard from '@/components/FeatureCard';

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`h-full flex flex-col ${className}`}
    >
      {children}
    </motion.div>
  );
}


function AetheraHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number;

    const checkTime = () => {
      const duration = video.duration;
      const currentTime = video.currentTime;

      if (duration) {
        if (currentTime < 0.5) {
          video.style.opacity = (currentTime / 0.5).toString();
        } else if (duration - currentTime < 0.5) {
          video.style.opacity = ((duration - currentTime) / 0.5).toString();
        } else {
          video.style.opacity = "1";
        }
      }

      animationFrameId = requestAnimationFrame(checkTime);
    };

    const onEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(e => console.error("Video play failed:", e));
      }, 100);
    };

    video.addEventListener('ended', onEnded);
    video.play().catch(e => console.error("Initial play failed:", e));
    animationFrameId = requestAnimationFrame(checkTime);

    return () => {
      video.removeEventListener('ended', onEnded);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-white font-inter">
      {/* Background Video Layer */}
      <div className="absolute inset-x-0 bottom-0 top-[300px] z-0 overflow-hidden">
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
          muted
          playsInline
          className="h-full w-full object-cover opacity-0 transition-opacity duration-75"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-40">
        <h1 className="text-5xl sm:text-7xl md:text-8xl max-w-7xl font-normal font-instrument text-[#000000] animate-fade-rise" style={{ lineHeight: 0.95, letterSpacing: '-2.46px' }}>
          Temple <span className="italic text-[#6F6F6F]">Features</span> & <span className="italic text-[#6F6F6F]">Amenities.</span>
        </h1>
        <p className="text-base sm:text-lg max-w-2xl mt-8 leading-relaxed text-[#6F6F6F] animate-fade-rise-delay">
          Discover a sanctuary of devotion. From our serene Prasadam halls and cultural education centers to our dedicated food distribution outlets, every facility is designed to enrich your spiritual journey.
        </p>
        <button className="rounded-full px-14 py-5 text-base mt-12 bg-[#000000] text-[#FFFFFF] hover:scale-[1.03] transition-transform duration-300 animate-fade-rise-delay-2">
          Explore All
        </button>
      </div>
    </div>
  );
}

export default function FeaturesPage() {
  const heroRef = useRef(null);
  const scrollData = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollData.scrollYProgress, [0, 1], ['0%', '40%']);
  const heroOpacity = useTransform(scrollData.scrollYProgress, [0, 0.8], [1, 0]);



  return (
    <div className="min-h-screen bg-[#FFFBF2] text-gray-800 font-sans overflow-hidden">
      {/* HERO SECTION */}
      <AetheraHero />

      <section className="relative z-20 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12 max-w-6xl mx-auto">
          <Reveal delay={0.15} className="h-full flex flex-col">
            <FeatureCard
              title="Grand Temple Hall"
              imageSrc="/ii.png"
              auroraClass="sazzad-aurora-gold"
              shortDescription="The Deities of Sri Radha Vrindavan Chandra will be installed in the Main Temple Hall. This spacious hall can accommodate a large number of people."
              detailedDescription={
                <>
                  <p>The Main Temple Hall will house the Deities of Sri Radha Vrindavan Chandra in a spacious, spiritually surcharged environment designed to accommodate thousands of devotees.</p>
                  <p>Experience continuous devotion with daily aartis, alongside constant kirtans and bhajans. During special festivals, the hall will host elaborate abhisheks and spectacular lamp illuminations, transporting everyone to a world of absolute bliss.</p>
                </>
              }
            />
          </Reveal>

          <Reveal delay={0.3} className="h-full flex flex-col">
            <FeatureCard
              title={<>Srila Prabhupada <br className="hidden sm:block" /> Museum and Expo</>}
              imageSrc="/prabhupada.png"
              auroraClass="sazzad-aurora-cyan"
              shortDescription="A state-of-the-art museum dedicated to the life and teachings of Srila Prabhupada. It will feature interactive exhibits and rare artifacts."
              detailedDescription={
                <p>A state-of-the-art museum dedicated to the life and teachings of Srila Prabhupada. It will feature interactive exhibits and rare artifacts. Detailed information regarding the museum exhibits, historical artifacts, and immersive experiences will be updated here shortly.</p>
              }
            />
          </Reveal>

          <Reveal delay={0.45} className="h-full flex flex-col">
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
          </Reveal>

          <Reveal delay={0.6} className="h-full flex flex-col">
            <FeatureCard
              title={<>Food Distribution <br className="hidden sm:block" /> Outlets</>}
              imageSrc="/annadan.jpg"
              auroraClass="sazzad-aurora-gold"
              shortDescription="We believe in the philosophy of providing abundant food for all. We are planning to construct feeding infrastructure with the objective of serving food to local residents, sadhus, pilgrims and tourists."
              detailedDescription={
                <p>We believe in the philosophy of providing abundant food for all. We are planning to construct feeding infrastructure with the objective of serving food to local residents, sadhus, pilgrims and tourists. Detailed information about the feeding capacities, daily schedules, and Annadan programs will be updated here shortly.</p>
              }
            />
          </Reveal>

          <Reveal delay={0.75} className="h-full flex flex-col">
            <FeatureCard
              title="Prasadam and Dining"
              imageSrc="/images.jpg"
              auroraClass="sazzad-aurora-orange"
              shortDescription="We will offer a wide range of sattvic food options to the visitors in a well-furnished and well-ventilated environment. The menu will consist traditional Braj cuisine and other popular cuisines of India."
              detailedDescription={
                <p>We will offer a wide range of sattvic food options to the visitors in a well-furnished and well-ventilated environment. The menu will consist traditional Braj cuisine and other popular cuisines of India. Detailed information about the dining hall amenities, specialized menus, and operating hours will be updated here shortly.</p>
              }
            />
          </Reveal>

          <Reveal delay={0.9} className="h-full flex flex-col">
            <FeatureCard
              title={<>Gifts and Devotional <br className="hidden sm:block" /> Paraphernalia</>}
              imageSrc="/about-3.png"
              auroraClass="sazzad-aurora-green"
              shortDescription="It is human tendency to take home souvenirs from tourist destinations, temples and such popular places. Vrindavan Chandrodaya Mandir will have a section where one can find varieties of gifts for people of all age groups and genders."
              detailedDescription={
                <p>It is human tendency to take home souvenirs from tourist destinations, temples and such popular places. Vrindavan Chandrodaya Mandir will have a section where one can find varieties of gifts for people of all age groups and genders. Detailed information about the available sacred items, literature, and memorabilia will be updated here shortly.</p>
              }
            />
          </Reveal>
        </div>
      </section>

      <section className="py-24 bg-white relative overflow-hidden border-t border-amber-100/50">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFBF2] to-white pointer-events-none" />
        <div className="absolute -left-40 top-0 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-40 bottom-0 w-96 h-96 bg-[#072149]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#072149] uppercase tracking-wide mb-6">
              Experience the Divine Grace
            </h2>
            <p className="text-gray-600 text-[17px] mb-10 max-w-2xl mx-auto leading-relaxed">
              We invite you to visit our temple and utilize these facilities designed to enrich your spiritual journey and provide a peaceful sanctuary in the heart of Dehradun.
            </p>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-[#990000] hover:bg-[#7a0000] text-white font-bold uppercase tracking-widest px-10 py-4 rounded-full shadow-lg transition-colors duration-300"
            >
              Back to Home
            </motion.a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
