import React from 'react';
import Link from 'next/link';

export default function UpcomingFestivals({ isHomePage = false }: { isHomePage?: boolean }) {
  // trigger recompile
  return (
    <>
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
            height: 100%;
            border-radius: 20px;
            overflow: hidden;
            display: flex;
            align-items: stretch;
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
            position: relative;
            margin: 6px;
            flex: 1;
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

        <div className="absolute top-0 right-0 w-[32%] lg:w-[28%] h-full pointer-events-none z-0 hidden sm:block overflow-hidden">

          <img

            src="/ti.webp"

            alt="Temple Gopuram"

            className="absolute top-4 md:top-2 right-0 h-[85%] w-[260px] md:w-[320px] lg:w-[360px] object-contain object-right-top opacity-[0.94] transition-all duration-700 select-none mix-blend-darken"

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



            <h2 className="text-4xl md:text-[44px] font-serif text-[#0a3d73] tracking-normal mb-1 font-medium">
              {isHomePage ? 'Upcoming Festivals' : 'Latest Events'}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto relative z-20">
            {/* Card 1: Panihati */}
            <div className="group cursor-pointer overflow-hidden duration-500 w-full bg-white/85 backdrop-blur-md text-gray-800 p-3 rounded-3xl border border-[#eae4d5]/40 shadow-md hover:shadow-xl font-card flex flex-col h-full sm:min-h-[380px]">
              <div className="w-full h-56 overflow-hidden rounded-2xl shrink-0">
                <img src="/deity-1.webp" alt="Panihati Festival" loading="lazy" className="group-hover:scale-110 w-full h-full object-cover duration-500" />
              </div>
              <div className="flex flex-col pt-4 px-2 pb-2 relative z-20 flex-grow">
                <span className="text-[22px] font-medium font-serif block text-[#0a3d73] leading-tight">Panihati Chida Dahi Utsav</span>
                <span className="text-[11px] text-[#cca75b] font-medium tracking-widest uppercase block mt-1">June 11, 2025</span>
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out mt-0 group-hover:mt-3 opacity-0 group-hover:opacity-100">
                  <p className="overflow-hidden text-[14px] text-[#5c5245] leading-relaxed">
                    The famous Festival of Chipped Rice celebrated in honor of Lord Nityananda Prabhu. Devotees relish chida, dahi and sweets in joyful kirtan.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Janmashtami */}
            <div className="group cursor-pointer overflow-hidden duration-500 w-full bg-white/85 backdrop-blur-md text-gray-800 p-3 rounded-3xl border border-[#eae4d5]/40 shadow-md hover:shadow-xl font-card flex flex-col h-full sm:min-h-[380px]">
              <div className="w-full h-56 rounded-2xl shrink-0 overflow-hidden">
                <img src="https://hkmdehradun.org/live-site/assets/images/sri-gaura-purnima.png" alt="Janmashtami Temple" loading="lazy" className="group-hover:scale-105 w-full h-full object-cover object-center duration-500" />
              </div>
              <div className="flex flex-col pt-4 px-2 pb-2 relative z-20 flex-grow">
                <span className="text-[22px] font-medium font-serif block text-[#0a3d73] leading-tight">Janmashtami</span>
                <span className="text-[11px] text-[#cca75b] font-medium tracking-widest uppercase block mt-1">August 16, 2025</span>
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out mt-0 group-hover:mt-3 opacity-0 group-hover:opacity-100">
                  <p className="overflow-hidden text-[14px] text-[#5c5245] leading-relaxed">
                    Commemorate the appearance of Lord Krishna with fasting, midnight aarti, kirtans and joyful celebrations.
                  </p>
                </div>
              </div>
            </div>
          </div>



        </div>



        {/* View All Festivals Button */}
        {isHomePage && (
        <div className="w-full flex justify-center mt-12 mb-4 relative z-20">
          <Link href="/events" className="no-underline">
            <button className="relative px-10 py-4 rounded-full text-[#0c4a8a] font-medium tracking-widest uppercase text-sm bg-white/40 backdrop-blur-lg border border-white/60 shadow-[0_8px_32px_0_rgba(12,74,138,0.1)] hover:bg-white/60 hover:shadow-[0_8px_32px_0_rgba(12,74,138,0.2)] hover:-translate-y-1 transition-all duration-500 overflow-hidden group flex items-center justify-center font-serif">
              <span className="relative z-10 flex items-center gap-2 drop-shadow-sm">
                View All Festivals
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out skew-x-12" />
            </button>
          </Link>
        </div>
        )}

        {/* Bottom decorative pattern overlay */}

        <div className="absolute bottom-0 left-0 w-full h-10 opacity-[0.08]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5z%22 fill=%22%23cca75b%22/%3E%3C/svg%3E')" }} />

      </section>
    </>
  );
}
