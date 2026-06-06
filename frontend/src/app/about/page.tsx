"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';

function ParallaxTiltImage({ src, alt, className = "w-[300px] h-[300px] md:w-[400px] md:h-[400px]", reverse = false }: { src: string; alt: string; className?: string, reverse?: boolean }) {
  const ref = useRef(null);
  
  // Tie parallax to the scroll position
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [reverse ? -80 : 80, reverse ? 80 : -80]);

  // Mouse tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ y: yParallax }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="flex justify-center items-center perspective-1000 cursor-pointer"
      >
        <motion.img 
          src={src} 
          alt={alt} 
          style={{ transform: "translateZ(40px)" }}
          className={`${className} object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300`} 
        />
      </motion.div>
    </motion.div>
  );
}

// Scroll-tied Reveal Section
function ScrollRevealSection({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0.6 1"] // animate from when top enters viewport, finishes when it reaches 60% of viewport
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [20, 0]);

  return (
    <motion.section 
      ref={ref}
      style={{ opacity, y, scale, rotateX }}
      className={`${className} perspective-1000`}
    >
      {children}
    </motion.section>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#6b7c43] text-[#f3eedc] font-sans pb-20 overflow-hidden" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='800' height='400' viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23cca75b' stroke-width='2' opacity='0.2'%3E%3Cg transform='translate(100, 50) scale(1.5)'%3E%3Cpath d='M20 5C20 5 10 15 20 35C30 15 20 5 20 5Z'/%3E%3Cpath d='M20 35C10 30 5 20 10 12C15 12 18 25 20 35Z'/%3E%3Cpath d='M20 35C30 30 35 20 30 12C25 12 22 25 20 35Z'/%3E%3C/g%3E%3Cg transform='translate(300, 50) scale(1.5)'%3E%3Ccircle cx='20' cy='10' r='4'/%3E%3Cpath d='M20 15 L20 25 M10 20 L30 20 M10 35 C10 35 15 25 20 25 C25 25 30 35 30 35 M10 35 L30 35'/%3E%3C/g%3E%3Cg transform='translate(500, 50) scale(1.5)'%3E%3Ccircle cx='20' cy='20' r='10' stroke-dasharray='2 2'/%3E%3Cpath d='M20 10 C25 10 30 15 30 20 C30 25 25 30 20 30 C15 30 10 25 10 20 C10 17 12 15 15 15 C17 15 18 17 18 18 C18 19 17 20 16 20'/%3E%3Cpath d='M20 0L20 5 M20 35L20 40 M0 20L5 20 M35 20L40 20 M5 5L10 10 M30 30L35 35 M5 35L10 30 M30 10L35 5'/%3E%3C/g%3E%3Cg transform='translate(700, 50) scale(1.5)'%3E%3Cpath d='M12 25 L12 10 A3 3 0 0 1 18 10 L18 20 M18 15 L18 5 A3 3 0 0 1 24 5 L24 20 M24 15 L24 8 A3 3 0 0 1 30 8 L30 25 C30 35 20 40 12 35 C8 32 5 28 5 25 L5 15 A3 3 0 0 1 11 15 L11 25'/%3E%3Cpath d='M15 25 C18 25 20 27 20 30 C20 32 18 34 16 34 C14 34 12 32 12 30 C12 29 13 28 14 28'/%3E%3C/g%3E%3Cg transform='translate(200, 200) scale(1.5)'%3E%3Ccircle cx='20' cy='6' r='4'/%3E%3Cpath d='M12 16 Q20 13 28 16 L33 28 Q28 25 20 25 Q12 25 7 28 Z'/%3E%3Cpath d='M20 18 L20 24'/%3E%3Cpath d='M5 32 Q20 27 35 32 Q30 38 20 38 Q10 38 5 32 Z'/%3E%3C/g%3E%3Cg transform='translate(400, 200) scale(1.5)'%3E%3Cpath d='M22 5 A 15 15 0 1 0 22 35 A 12 12 0 1 1 22 5 Z'/%3E%3Cpath d='M8 20 L12 20 M10 18 L10 22'/%3E%3C/g%3E%3Cg transform='translate(600, 200) scale(1.5)'%3E%3Cpath d='M20 5 C28 5 30 15 20 18 C18 12 22 10 20 5'/%3E%3Cpath d='M10 25 C5 18 10 10 16 16 C12 18 10 15 10 25'/%3E%3Cpath d='M30 25 C35 18 30 10 24 16 C28 18 30 15 30 25'/%3E%3Cpath d='M10 25 Q20 35 30 25'/%3E%3Ccircle cx='20' cy='22' r='2'/%3E%3C/g%3E%3C/g%3E%3Ctext x='400' y='140' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Krishna Hare Krishna, Krishna Krishna Hare Hare%3C/text%3E%3Ctext x='400' y='165' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Rama Hare Rama, Rama Rama Hare Hare%3C/text%3E%3Ctext x='400' y='230' font-family='serif' font-size='28' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.3' letter-spacing='2' font-weight='bold'%3ESrila Prabhupada%3C/text%3E%3Ctext x='400' y='340' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Krishna Hare Krishna, Krishna Krishna Hare Hare%3C/text%3E%3Ctext x='400' y='365' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Rama Hare Rama, Rama Rama Hare Hare%3C/text%3E%3C/svg%3E\")", backgroundRepeat: 'repeat', backgroundSize: '600px 300px' }}>
      
      {/* ── CSS for 3D Perspective and Buttons ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .section-title {
          color: #cca75b;
          font-weight: 800;
          letter-spacing: 0.05em;
          font-size: 2.5rem;
        }
        
        @media (min-width: 768px) {
          .section-title {
            font-size: 3.5rem;
          }
        }
      ` }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* 1. SRILA PRABHUPADA */}
        <ScrollRevealSection className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="w-full md:w-1/3 flex justify-center order-1">
            <ParallaxTiltImage src="/about-3.png" alt="Srila Prabhupada" reverse={true} />
          </div>
          <div className="w-full md:w-2/3 flex flex-col items-center md:items-end text-center md:text-right order-2">
            <h2 className="section-title uppercase">Srila Prabhupada</h2>
            <p className="text-white font-bold text-lg md:text-xl leading-relaxed mb-6 drop-shadow-md">
              "Just like we have got a tendency to construct a skyscraper building. As in your country, you do. So you should not be attached to the skyscraper building, but you can utilise the tendency by constructing a big temple like skyscraper for Krishna. In this way, you have to purify your material activities." - Srila Prabhupada in a class in front of the Samadhi of Srila Rupa Gosvami in Vrindavan, Oct 29th, 1972
              <br /><br />
              "This is Krishna conscious vision: 'Oh, there are so many skyscrapers. Why not construct a nice skyscraper temple of Krishna?' This is Krishna consciousness." - Srila Prabhupada lecture in Bombay, Feb 25th, 1974
            </p>
          </div>
        </ScrollRevealSection>

        {/* 2. CHAIRMAN'S MESSAGE */}
        <ScrollRevealSection className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="w-full md:w-2/3 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
            <h2 className="section-title uppercase">Chairman's Message</h2>
            <p className="text-white font-bold text-lg md:text-xl leading-relaxed mb-6 drop-shadow-md">
              Five thousand years ago, when Lord Krishna appeared on this planet, He brought His divine abode Vrindavan to enact transcendental pastimes. This holy dham is non-different from Krishna and is as worshipable as the Lord Himself. Vrindavan, the heart of Braj Bhoomi, is the most important place of pilgrimage for devotees of Lord Krishna. Scriptures state that visiting Vrindavan is equal to having darshan of Lord Hari. Hence, this spiritual town of temples experiences an influx of people from across the globe every year.
            </p>
          </div>
          <div className="w-full md:w-1/3 flex justify-center order-1 md:order-2">
             <ParallaxTiltImage src="/about-4.png" alt="Chairman" />
          </div>
        </ScrollRevealSection>

        {/* 3. PRESIDENT'S MESSAGE */}
        <ScrollRevealSection className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="w-full md:w-1/3 flex justify-center order-1">
            <ParallaxTiltImage src="/about-5.png" alt="President" reverse={true} />
          </div>
          <div className="w-full md:w-2/3 flex flex-col items-center md:items-end text-center md:text-right order-2">
            <h2 className="section-title uppercase">President's Message</h2>
            <p className="text-white font-bold text-lg md:text-xl leading-relaxed mb-6 drop-shadow-md">
              Brajbhoomi is one of India's historical and iconic cultural grounds. The life, customs, practices, languages, festivals in Vrindavan Dham form a unique culture, having developed over millennia based on revelations of the great saints of Vrindavan. This sacred land where Krishna spent His childhood serves as the foundation for His grand temple - Vrindavan Chandrodaya Mandir.
            </p>
          </div>
        </ScrollRevealSection>


      </div>
    </div>
  );
}
