"use client";

import React, { useState } from 'react';
import Image from 'next/image';
interface FeatureCardProps {
  title: React.ReactNode;
  imageSrc: string;
  shortDescription: React.ReactNode;
  detailedDescription: React.ReactNode;
  auroraClass: string;
}

export default function FeatureCard({ title, imageSrc, shortDescription, detailedDescription, auroraClass }: FeatureCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="group relative w-full h-full min-h-[560px] flex flex-col [perspective:1000px]">
      <div className={`relative w-full flex-1 flex flex-col transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
        
        {/* FRONT FACE */}
        <div className="relative w-full flex-1 flex flex-col [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
          <div className="sazzad-card flex-1 w-full cursor-pointer group-hover:-translate-y-1 transition-transform duration-500">
            <div className={`sazzad-aurora ${auroraClass}`} />
            <div className="sazzad-bg">
              <div className="w-full h-56 overflow-hidden relative shrink-0">
                <Image
                  src={imageSrc}
                  alt={typeof title === 'string' ? title : 'Feature'}
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
              </div>

              <div className="pt-6 px-5 flex-1 flex flex-col justify-between items-center text-center pb-6 w-full">
                <div className="flex flex-col items-center w-full">
                  <h3 className="text-lg font-serif text-[#0c4a8a] font-bold mb-0.5 uppercase tracking-wider h-12 flex items-center justify-center leading-snug">
                    {title}
                  </h3>

                  {/* Gold Ornament Divider */}
                  <div className="flex items-center justify-center gap-2 my-2 text-[#cca75b] w-full max-w-[80px]">
                    <div className="h-[1px] w-full bg-[#cca75b]/60" />
                    <span className="text-[10px]">◆</span>
                    <div className="h-[1px] w-full bg-[#cca75b]/60" />
                  </div>

                  <p className="text-[#5c5245] text-[14px] leading-relaxed font-medium">
                    {shortDescription}
                  </p>
                </div>

                {/* More Info Button */}
                <button 
                  className="learn-more mt-4" 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setIsFlipped(true); 
                  }}
                >
                  <span className="circle" aria-hidden="true">
                    <span className="icon arrow" />
                  </span>
                  <span className="button-text">More Info</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BACK FACE */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="sazzad-card h-full w-full transition-transform duration-500">
            <div className={`sazzad-aurora ${auroraClass}`} />
            <div className="sazzad-bg !p-8 flex flex-col justify-between items-center text-center">
              
              <div className="flex-1 w-full overflow-y-auto custom-scrollbar pr-2 flex flex-col items-center">
                <h3 className="text-xl font-serif text-[#0c4a8a] font-bold mb-2 uppercase tracking-wider mt-2">
                  {title}
                </h3>
                
                {/* Gold Ornament Divider */}
                <div className="flex items-center justify-center gap-2 mb-6 text-[#cca75b] w-full max-w-[120px]">
                  <div className="h-[1px] w-full bg-[#cca75b]/60" />
                  <span className="text-[12px]">◆</span>
                  <div className="h-[1px] w-full bg-[#cca75b]/60" />
                </div>
                
                <div className="text-[#5c5245] text-[14px] leading-relaxed font-medium text-left w-full space-y-4">
                  {detailedDescription}
                </div>
              </div>

              {/* Go Back Button */}
              <button 
                className="learn-more mt-6 flex-shrink-0" 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setIsFlipped(false); 
                }}
              >
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow" />
                </span>
                <span className="button-text">Go Back</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
