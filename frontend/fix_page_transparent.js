const fs = require('fs');
let code = fs.readFileSync('a:\\HKD\\frontend\\src\\app\\gita-life-course\\page.tsx', 'utf8');

// Find the end of the hero section
const heroEnd = `{/* ── end hero ──────────────────────────────────────────── */}`;
const heroEndIndex = code.indexOf(heroEnd);

if (heroEndIndex !== -1) {
  const beforeHeroEnd = code.substring(0, heroEndIndex + heroEnd.length);
  let afterHeroEnd = code.substring(heroEndIndex + heroEnd.length);
  
  // We want to remove the backdrop-blur and make everything completely transparent so the video is totally clear.
  // We added: className="relative z-10 w-full backdrop-blur-md"
  afterHeroEnd = afterHeroEnd.replace(/className="relative z-10 w-full backdrop-blur-md"/, 'className="relative z-10 w-full"');
  
  // We also changed section backgrounds to bg-.../80 backdrop-blur-md
  // bg-[#FFFBF2]/80 backdrop-blur-md -> bg-transparent
  // bg-white/80 backdrop-blur-md -> bg-transparent
  // bg-[#072149]/80 backdrop-blur-md -> bg-transparent
  
  afterHeroEnd = afterHeroEnd.replace(/bg-\[#FFFBF2\]\/80 backdrop-blur-md/g, 'bg-transparent');
  afterHeroEnd = afterHeroEnd.replace(/bg-white\/80 backdrop-blur-md/g, 'bg-transparent');
  afterHeroEnd = afterHeroEnd.replace(/bg-\[#072149\]\/80 backdrop-blur-md/g, 'bg-transparent');
  
  // If there are any other places with bg-white or bg-[#072149] we can keep them transparent too if they are sections.
  // Actually, some inner cards might have `bg-white`, so let's be careful.
  
  // Special Features section has white text originally because it was bg-[#072149].
  // If the video is a white background, white text will be invisible. 
  // Let's change the text-white in the Special Features section to text-[#072149] or dark gray.
  // The Special Features section starts at: {/* ══ SPECIAL FEATURES — dark accordion ═════════════════ */}
  // We can just change `text-white` to `text-[#072149]` in the Special Features section.
  const sfIndex = afterHeroEnd.indexOf('{/* ══ SPECIAL FEATURES');
  const statsIndex = afterHeroEnd.indexOf('{/* ══ STATS STRIP');
  
  if (sfIndex !== -1 && statsIndex !== -1) {
    let sfSection = afterHeroEnd.substring(sfIndex, statsIndex);
    // change text-white to text-[#072149]
    sfSection = sfSection.replace(/text-white/g, 'text-[#072149]');
    // change text-white/50 to text-gray-500
    sfSection = sfSection.replace(/text-\[#072149\]\/50/g, 'text-gray-500'); 
    afterHeroEnd = afterHeroEnd.substring(0, sfIndex) + sfSection + afterHeroEnd.substring(statsIndex);
  }
  
  // In the CTA section, we had bg-white/80 backdrop-blur-md
  
  code = beforeHeroEnd + afterHeroEnd;
}

fs.writeFileSync('a:\\HKD\\frontend\\src\\app\\gita-life-course\\page.tsx', code);
console.log("Updated to transparent backgrounds.");
