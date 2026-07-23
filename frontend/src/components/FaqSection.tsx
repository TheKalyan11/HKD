'use client';

import React, { useState } from 'react';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const allFaqs: FaqItem[] = [
  {
    id: 1,
    question: "What is Hare Krishna Movement Dehradun?",
    answer: "Hare Krishna Movement Dehradun is a vibrant spiritual and cultural center dedicated to promoting Vedic wisdom, social service, daily prasadam distribution, and traditional devotional worship under the guidance of Srila Prabhupada."
  },
  {
    id: 2,
    question: "Who is the Founder-Acharya of the Hare Krishna Movement?",
    answer: "His Divine Grace A.C. Bhaktivedanta Swami Prabhupada is the Founder-Acharya of the International Society for Krishna Consciousness (ISKCON) and the guiding inspiration behind the Hare Krishna Movement globally."
  },
  {
    id: 3,
    question: "What are the temple darshan and aarti timings?",
    answer: "The temple opens daily at 4:30 AM for Mangala Aarti and remains open until Shayana Aarti at 8:30 PM. Key aartis include Darshan Aarti at 7:15 AM, Raj Bhoga Aarti at 12:30 PM, and Sandhya Aarti at 7:00 PM."
  },
  {
    id: 4,
    question: "How can I contribute to Gau Seva and Annadana Seva?",
    answer: "You can support our daily cow care (Gau Seva) and free prasadam meal distribution (Annadana Seva) directly online through our Online Donation section or at the temple counters."
  },
  {
    id: 5,
    question: "What spiritual and educational programs are offered for youth?",
    answer: "We offer weekly FOLK (Friends of Lord Krishna) youth programs, Bhagavad Gita Life courses, stress-management workshops, and weekend retreats designed to empower young minds with spiritual wisdom."
  },
  {
    id: 6,
    question: "How can I visit or support the Hare Krishna Movement Dehradun?",
    answer: "Visitors and devotees are welcome to visit the temple daily. You can reach out to us via our Contact Us page for location directions, event schedules, or volunteer opportunities."
  }
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  const visibleFaqs = showAll ? allFaqs : allFaqs.slice(0, 4);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const renderQuestionWithStyledMark = (questionText: string) => {
    if (questionText.endsWith('?')) {
      const mainText = questionText.slice(0, -1);
      return (
        <span>
          {mainText}
          <span className="text-[#d4af37] font-black text-xl sm:text-2xl inline-block ml-[2px] transform hover:scale-110 transition-transform">?</span>
        </span>
      );
    }
    return <span>{questionText}</span>;
  };

  return (
    <section className="relative w-full py-16 md:py-24 bg-[#faf8f5] overflow-hidden font-sans border-t border-[#eae4d5]/40">
      
      {/* Background Ornaments */}
      <div className="absolute top-1/2 left-[-10%] w-80 h-80 bg-[#cca75b]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-[-5%] w-[350px] h-[350px] bg-[#0c4a8a]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Side: Title & Description matching Website Header Hierarchy */}
          <div className="lg:col-span-5 flex flex-col justify-start pr-0 lg:pr-4">
            
            {/* Top Gold Ornament matching website standard */}
            <div className="flex items-center gap-3 text-[#d4af37] mb-3">
              <div className="h-px w-10 bg-current"></div>
              <span className="uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">HELP & INFO</span>
              <div className="h-px w-10 bg-current"></div>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#3b2b2f] tracking-tight leading-[1.15] mb-5">
              Frequently Asked Questions<span className="text-[#d4af37] font-black text-5xl md:text-6xl inline-block ml-[2px]">?</span>
            </h2>
            
            <p className="text-[#5c5245] text-[15px] sm:text-[16px] leading-relaxed max-w-md font-normal">
              Hare Krishna Movement Dehradun is not only a place of worship but a beacon of social service, spiritual wisdom, and cultural preservation.
            </p>
          </div>

          {/* Right Side: Accordion Items */}
          <div className="lg:col-span-7 flex flex-col gap-4 w-full">
            {visibleFaqs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`rounded-[24px] transition-all duration-300 overflow-hidden cursor-pointer border ${
                    isOpen 
                      ? 'bg-white border-[#d4af37]/60 shadow-[0_8px_25px_rgb(212,175,55,0.12)]' 
                      : 'bg-white/80 hover:bg-white border-[#eae4d5] shadow-[0_4px_15px_rgb(0,0,0,0.03)]'
                  }`}
                  onClick={() => toggleFaq(faq.id)}
                >
                  {/* Header Row */}
                  <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
                    <h3 className="text-lg sm:text-xl font-bold text-[#3b2b2f] leading-snug flex items-start gap-2.5">
                      <span className="text-[#d4af37] font-extrabold">{faq.id}.</span>
                      {renderQuestionWithStyledMark(faq.question)}
                    </h3>
                    
                    <button
                      type="button"
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xl transition-colors shrink-0 shadow-sm ${
                        isOpen 
                          ? 'bg-[#d4af37] text-white' 
                          : 'bg-[#f4efe6] text-[#3b2b2f] hover:bg-[#d4af37] hover:text-white'
                      }`}
                      aria-label="Toggle answer"
                    >
                      {isOpen ? '−' : '+'}
                    </button>
                  </div>

                  {/* Expanded Answer Content */}
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-[#5c5245] text-[15px] sm:text-[16px] leading-relaxed border-t border-[#eae4d5]/60 mt-1">
                      <p className="pt-3.5">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Show More / Show Less Toggle Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-8 py-3.5 rounded-full border border-[#cca75b]/60 bg-white hover:bg-[#fcfaf7] text-[#0a3d73] font-bold text-xs uppercase tracking-widest shadow-sm hover:shadow transition-all duration-300 cursor-pointer"
              >
                {showAll ? 'Show Less' : 'Show More'}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
