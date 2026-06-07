const fs = require('fs');
const { execSync } = require('child_process');

try {
  let originalPageContent = execSync('git show HEAD:frontend/src/app/page.tsx').toString();
  let lines = originalPageContent.split('\n');

  const startLineIndex = lines.findIndex(line => line.includes('{/* 3. UPCOMING FESTIVALS SECTION */}'));
  const endLineIndex = lines.findIndex(line => line.includes('{/* 4. FEATURES SECTION */}'));

  let sectionLines = lines.slice(startLineIndex, endLineIndex - 1);

  // Remove the button
  const buttonStartLineIdx = sectionLines.findIndex(line => line.includes('{/* Bottom Button - Matching Screenshot */}'));
  const overlayLineIdx = sectionLines.findIndex(line => line.includes('{/* Bottom decorative pattern overlay */}'));
  
  if (buttonStartLineIdx !== -1 && overlayLineIdx !== -1) {
      let closeDivIdx = -1;
      for(let i = overlayLineIdx - 1; i > buttonStartLineIdx; i--) {
          if (sectionLines[i].includes('</div>')) {
              closeDivIdx = i;
              break;
          }
      }
      if (closeDivIdx !== -1) {
          sectionLines.splice(buttonStartLineIdx, closeDivIdx - buttonStartLineIdx);
      }
  }

  // Insert the 4 cards
  const diwaliIdx = sectionLines.findIndex(line => line.includes('alt="Diwali"'));
  if (diwaliIdx !== -1) {
      // The grid closes just before the bottom button comment
      let gridCloseIdx = -1;
      for(let i = buttonStartLineIdx - 1; i > diwaliIdx; i--) {
          if (sectionLines[i].includes('</div>')) {
              gridCloseIdx = i;
              break;
          }
      }
      
      if (gridCloseIdx !== -1) {
          const newCards = `
            {/* Card 5: Govardhan Puja */}
            <div className="relative group cursor-pointer overflow-hidden duration-500 w-full h-[400px] bg-white/85 backdrop-blur-md text-gray-800 p-4 rounded-3xl border border-[#eae4d5]/40 shadow-md hover:shadow-xl">
              <div className="w-full h-full relative">
                <div className="w-full h-64 overflow-hidden rounded-2xl">
                  <img src="/deity-1.jpg" alt="Govardhan Puja" className="group-hover:scale-110 w-full h-full object-cover duration-500" />
                </div>
                <div className="absolute w-full left-0 p-4 -bottom-16 duration-500 group-hover:-translate-y-14 z-20">
                  <div className="absolute -z-10 left-0 bottom-[-40px] w-full h-[180px] opacity-0 duration-500 group-hover:opacity-100 group-hover:bg-white rounded-2xl shadow-xl border border-[#eae4d5]/30" />
                  <span className="text-lg font-bold font-serif block text-[#0a3d73]">Govardhan Puja</span>
                  <span className="text-[10px] text-[#cca75b] font-extrabold tracking-widest uppercase block mb-2">November 01, 2025</span>
                  <p className="group-hover:opacity-100 w-full duration-500 opacity-0 text-xs text-[#5c5245] leading-relaxed">
                    Celebrating the day Lord Krishna lifted Govardhan Hill. Enjoy the grand Annakut offering and ecstatic kirtans.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 6: Gaura Purnima */}
            <div className="relative group cursor-pointer overflow-hidden duration-500 w-full h-[400px] bg-white/85 backdrop-blur-md text-gray-800 p-4 rounded-3xl border border-[#eae4d5]/40 shadow-md hover:shadow-xl">
              <div className="w-full h-full relative">
                <div className="w-full h-64 overflow-hidden rounded-2xl">
                  <img src="/deity-2.jpg" alt="Gaura Purnima" className="group-hover:scale-110 w-full h-full object-cover duration-500" />
                </div>
                <div className="absolute w-full left-0 p-4 -bottom-16 duration-500 group-hover:-translate-y-14 z-20">
                  <div className="absolute -z-10 left-0 bottom-[-40px] w-full h-[180px] opacity-0 duration-500 group-hover:opacity-100 group-hover:bg-white rounded-2xl shadow-xl border border-[#eae4d5]/30" />
                  <span className="text-lg font-bold font-serif block text-[#0a3d73]">Gaura Purnima</span>
                  <span className="text-[10px] text-[#cca75b] font-extrabold tracking-widest uppercase block mb-2">March 14, 2026</span>
                  <p className="group-hover:opacity-100 w-full duration-500 opacity-0 text-xs text-[#5c5245] leading-relaxed">
                    The auspicious appearance day of Sri Chaitanya Mahaprabhu. Join us for Maha Abhishek and fasting until moonrise.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 7: Rama Navami */}
            <div className="relative group cursor-pointer overflow-hidden duration-500 w-full h-[400px] bg-white/85 backdrop-blur-md text-gray-800 p-4 rounded-3xl border border-[#eae4d5]/40 shadow-md hover:shadow-xl">
              <div className="w-full h-full relative">
                <div className="w-full h-64 overflow-hidden rounded-2xl">
                  <img src="/deity-1.jpg" alt="Rama Navami" className="group-hover:scale-110 w-full h-full object-cover duration-500" />
                </div>
                <div className="absolute w-full left-0 p-4 -bottom-16 duration-500 group-hover:-translate-y-14 z-20">
                  <div className="absolute -z-10 left-0 bottom-[-40px] w-full h-[180px] opacity-0 duration-500 group-hover:opacity-100 group-hover:bg-white rounded-2xl shadow-xl border border-[#eae4d5]/30" />
                  <span className="text-lg font-bold font-serif block text-[#0a3d73]">Rama Navami</span>
                  <span className="text-[10px] text-[#cca75b] font-extrabold tracking-widest uppercase block mb-2">April 06, 2026</span>
                  <p className="group-hover:opacity-100 w-full duration-500 opacity-0 text-xs text-[#5c5245] leading-relaxed">
                    Celebrate the birth of Lord Sri Ramachandra with special arati, readings from the Ramayana, and prasadam.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 8: Nityananda Trayodashi */}
            <div className="relative group cursor-pointer overflow-hidden duration-500 w-full h-[400px] bg-white/85 backdrop-blur-md text-gray-800 p-4 rounded-3xl border border-[#eae4d5]/40 shadow-md hover:shadow-xl">
              <div className="w-full h-full relative">
                <div className="w-full h-64 overflow-hidden rounded-2xl">
                  <img src="/deity-2.jpg" alt="Nityananda Trayodashi" className="group-hover:scale-110 w-full h-full object-cover duration-500" />
                </div>
                <div className="absolute w-full left-0 p-4 -bottom-16 duration-500 group-hover:-translate-y-14 z-20">
                  <div className="absolute -z-10 left-0 bottom-[-40px] w-full h-[180px] opacity-0 duration-500 group-hover:opacity-100 group-hover:bg-white rounded-2xl shadow-xl border border-[#eae4d5]/30" />
                  <span className="text-lg font-bold font-serif block text-[#0a3d73]">Nityananda Trayodashi</span>
                  <span className="text-[10px] text-[#cca75b] font-extrabold tracking-widest uppercase block mb-2">February 11, 2026</span>
                  <p className="group-hover:opacity-100 w-full duration-500 opacity-0 text-xs text-[#5c5245] leading-relaxed">
                    Honor the appearance of Lord Nityananda Prabhu, the most merciful incarnation, with ecstatic chanting and feasting.
                  </p>
                </div>
              </div>
            </div>
`;
          sectionLines.splice(gridCloseIdx, 0, ...newCards.split('\n'));
      }
  }

  let section = sectionLines.join('\n');

  // Insert the View Gallery button right before the overlay comment
  const btnHtml = `
        {/* View Gallery Button */}
        <div className="w-full flex justify-center mt-12 mb-4 relative z-20">
          <style dangerouslySetInnerHTML={{
            __html: \`
              .gallery-btn {
                font-family: inherit;
                font-size: 18px;
                background: #cca75b;
                color: #fff;
                padding: 0.7em 1.2em;
                padding-left: 0.9em;
                display: flex;
                align-items: center;
                border: none;
                border-radius: 16px;
                overflow: hidden;
                transition: all 0.2s;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(204, 167, 91, 0.4);
              }
              .gallery-btn span {
                display: block;
                margin-left: 0.3em;
                transition: all 0.3s ease-in-out;
              }
              .gallery-btn svg {
                display: block;
                transform-origin: center center;
                transition: transform 0.3s ease-in-out;
              }
              .gallery-btn:hover .svg-wrapper {
                animation: fly-1 0.6s ease-in-out infinite alternate;
              }
              .gallery-btn:hover svg {
                transform: translateX(1.2em) rotate(45deg) scale(1.1);
              }
              .gallery-btn:hover span {
                transform: translateX(10em);
              }
              .gallery-btn:active {
                transform: scale(0.95);
              }
              @keyframes fly-1 {
                from { transform: translateY(0.1em); }
                to { transform: translateY(-0.1em); }
              }
            \`
          }} />
          <Link href="/daily-darshan">
            <button className="gallery-btn font-bold font-serif uppercase tracking-wider">
              <div className="svg-wrapper-1">
                <div className="svg-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24}>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" />
                  </svg>
                </div>
              </div>
              <span>View Gallery</span>
            </button>
          </Link>
        </div>
`;
  section = section.replace('{/* Bottom decorative pattern overlay */}', btnHtml + '\n        {/* Bottom decorative pattern overlay */}');

  // Change Upcoming Festivals to Latest Events
  section = section.replace(
    /Upcoming Festivals/g,
    'Latest Events'
  );
  
  // Revert the comment replacement if any
  section = section.replace(
    /\{\/\* 3\. Latest Events SECTION \*\/\}/g,
    '{/* 3. UPCOMING FESTIVALS SECTION */}'
  );

  const finalComponent = `import React from 'react';
import Link from 'next/link';

export default function UpcomingFestivals() {
  return (
    <>
${section}
      </section>
    </>
  );
}
`;

  fs.writeFileSync('a:\\\\HKD\\\\frontend\\\\src\\\\components\\\\UpcomingFestivals.tsx', finalComponent);
  console.log("Successfully rebuilt component");
} catch(e) {
  console.log("Error:", e);
}
