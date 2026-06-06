const fs = require('fs');
let code = fs.readFileSync('a:\\HKD\\frontend\\src\\app\\gita-life-course\\page.tsx', 'utf8');

// Find the end of the hero section
const heroEnd = `{/* ── end hero ──────────────────────────────────────────── */}`;
const heroEndIndex = code.indexOf(heroEnd);

if (heroEndIndex !== -1) {
  const beforeHeroEnd = code.substring(0, heroEndIndex + heroEnd.length);
  let afterHeroEnd = code.substring(heroEndIndex + heroEnd.length);

  // We will wrap the rest of the sections in a relative container with an absolute watermark background.
  // And we will make the sections slightly transparent so the watermark shows through.
  
  // Update section backgrounds to semi-transparent to show the watermark
  afterHeroEnd = afterHeroEnd.replace(/className="bg-\[#FFFBF2\]/g, 'className="bg-[#FFFBF2]/80 backdrop-blur-sm');
  afterHeroEnd = afterHeroEnd.replace(/className="bg-white/g, 'className="bg-white/80 backdrop-blur-sm');
  // NOTE: Special features is already `bg-white/60 backdrop-blur-3xl`, we can leave it or adjust it.
  
  const watermarkWrapperStart = `
      <div className="relative w-full">
        {/* Mantra and Icon Watermark Background */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none flex flex-col justify-evenly opacity-[0.03] select-none" style={{ minHeight: '100%' }}>
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="flex items-center gap-10 whitespace-nowrap -rotate-3 scale-110 translate-x-[-10%]">
              {Array.from({ length: 10 }).map((_, j) => (
                <div key={j} className="flex items-center gap-6 text-4xl md:text-5xl font-serif text-[#072149] font-bold">
                  <PILotus className="w-10 h-10" />
                  <span>Hare Krishna Hare Krishna Krishna Krishna Hare Hare</span>
                  <span className="w-4 h-4 rounded-full bg-amber-500" />
                  <span>Hare Rama Hare Rama Rama Rama Hare Hare</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="relative z-10 w-full">
`;

  code = beforeHeroEnd + watermarkWrapperStart + afterHeroEnd;
  
  // Close the wrapper divs at the end of the file
  const fileEnd = `    </div>\n  );\n}`;
  const newFileEnd = `        </div>\n      </div>\n    </div>\n  );\n}`;
  code = code.replace(fileEnd, newFileEnd);

  fs.writeFileSync('a:\\HKD\\frontend\\src\\app\\gita-life-course\\page.tsx', code);
  console.log("Added mantra background wrapper to page.");
}
