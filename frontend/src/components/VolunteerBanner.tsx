import React from 'react';
import Link from 'next/link';

export default function VolunteerBanner() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto relative z-10">
      <div 
        className="relative overflow-hidden rounded-[16px] bg-[#0c4a8a] text-white shadow-xl group cursor-pointer"
      >
        {/* Static Background Image with Correct Ratio */}
        <div 
          className="absolute inset-0 bg-contain bg-right bg-no-repeat mix-blend-luminosity opacity-60"
          style={{ 
            backgroundImage: "url('/volunteer_cartoon_bg.png')",
            backgroundPosition: "100% 50%" 
          }}
        />
        {/* Gradient overlay to ensure text readability and fade smoothly into the image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c4a8a] via-[#0c4a8a]/90 to-[#0c4a8a]/10" />

        {/* Text Content */}
        <div className="relative z-10 p-8 sm:p-12 lg:p-14 md:w-3/4 lg:w-[65%]">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 tracking-tight text-white">
            Volunteer to <span className="text-[#d4af37]">Serve</span>
          </h2>
          <p className="text-[15px] sm:text-base lg:text-[17px] mb-8 leading-relaxed text-white/95 font-medium max-w-2xl">
            Offer your talents, and heart in the loving service of Sri Sri
            Krishna Balaram. Support the temple's spiritual and outreach
            activities by volunteering and become an instrument in Srila
            Prabhupada's mission. Come serve — and be spiritually
            transformed.
          </p>
          <Link href="/volunteer">
            <button className="bg-[#d4af37] text-white px-8 py-3.5 rounded-full font-extrabold text-[15px] tracking-wide uppercase hover:bg-white hover:text-[#0c4a8a] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300">
              Become a Volunteer
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
