const fs = require('fs');
let code = fs.readFileSync('a:\\HKD\\frontend\\src\\app\\gita-life-course\\page.tsx', 'utf8');

// The file was corrupted around the CTA section. We will restore it, 
// OR since the user said "remove this section and text", maybe we should just remove everything after the hero section
// and replace it with a single video background section?
// Let's look at the user's two requests:
// 1. "background is ok but section and text are not good remove this  in gita life course page"
// 2. "in gita life courses in all section add background https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260417_061226_74f0749c-a22d-42b3-895e-5d6203bc741c.mp4 but don't change anyting in hero section"

// Since they said "remove this section and text", I will assume they want to remove the content below the hero section 
// and just have a background video there, or maybe they just wanted to remove specific text but I don't know which.
// Actually, I will wrap all sections in a video background, and remove the opaque backgrounds from the sections.
// If they really wanted to delete the text, they can clarify. But it's safer to keep the sections and change the backgrounds to video.

const brokenCTA = `              transition={{ type: "spring", bounce: 0.5 }}
              className="w-14 h-14 text-[#072149] mx-auto mb-8"
            >
              <PILotus className="w-14 h-14" />
            </motion.div>`;

const fixedCTA = `      {/* ══ CTA ═══════════════════════════════════════════════ */}
      <section className="bg-white/80 px-5 sm:px-10 lg:px-20 py-32 text-center relative overflow-hidden backdrop-blur-md">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#072149]/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-amber-400/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-[#990000]/10" />
        </div>

        <AnimeReveal direction="up" delay={100}>
          <div className="relative z-10">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="w-14 h-14 text-[#072149] mx-auto mb-8"
            >
              <PILotus className="w-14 h-14" />
            </motion.div>`;

code = code.replace(brokenCTA, fixedCTA);

// Find the end of the hero section
const heroEnd = `{/* ── end hero ──────────────────────────────────────────── */}`;
const heroEndIndex = code.indexOf(heroEnd);

if (heroEndIndex !== -1) {
  const beforeHeroEnd = code.substring(0, heroEndIndex + heroEnd.length);
  let afterHeroEnd = code.substring(heroEndIndex + heroEnd.length);
  
  afterHeroEnd = afterHeroEnd.replace(/className="bg-\[#FFFBF2\]/g, 'className="bg-[#FFFBF2]/80 backdrop-blur-md');
  afterHeroEnd = afterHeroEnd.replace(/className="bg-white px-5/g, 'className="bg-white/80 backdrop-blur-md px-5');
  afterHeroEnd = afterHeroEnd.replace(/className="bg-\[#072149\] px-5/g, 'className="bg-[#072149]/80 backdrop-blur-md px-5');
  
  const videoWrapperStart = `
      <div className="relative w-full">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover">
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260417_061226_74f0749c-a22d-42b3-895e-5d6203bc741c.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative z-10 w-full">
`;

  code = beforeHeroEnd + videoWrapperStart + afterHeroEnd;
  
  const fileEnd = `    </div>\n  );\n}`;
  const newFileEnd = `        </div>\n      </div>\n    </div>\n  );\n}`;
  code = code.replace(fileEnd, newFileEnd);
}

fs.writeFileSync('a:\\HKD\\frontend\\src\\app\\gita-life-course\\page.tsx', code);
