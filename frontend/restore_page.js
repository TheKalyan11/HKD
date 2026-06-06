const fs = require('fs');
let code = fs.readFileSync('a:\\HKD\\frontend\\src\\app\\gita-life-course\\page.tsx', 'utf8');

// 1. Remove the video wrapper
const videoStart = `      <div className="relative w-full">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover">
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260417_061226_74f0749c-a22d-42b3-895e-5d6203bc741c.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative z-10 w-full">
`;
code = code.replace(videoStart, '');

const videoEnd = `        </div>
      </div>
    </div>
  );
}`;
const origEnd = `    </div>
  );
}`;
code = code.replace(videoEnd, origEnd);

// 2. Restore section backgrounds
// Note: We changed:
// bg-[#FFFBF2] -> bg-transparent
// bg-white -> bg-transparent
// bg-[#072149] -> bg-transparent
// Let's replace the specific lines

// ABOUT section
code = code.replace(/<section id="about" className="bg-transparent px-5 sm:px-10 lg:px-20 py-28">/, 
                    '<section id="about" className="bg-[#FFFBF2] px-5 sm:px-10 lg:px-20 py-28">');

// CURRICULUM section
code = code.replace(/<section id="modules" className="bg-transparent px-5 sm:px-10 lg:px-20 py-28">/, 
                    '<section id="modules" className="bg-white px-5 sm:px-10 lg:px-20 py-28">');

// SPECIAL FEATURES section
code = code.replace(/<section className="bg-transparent px-5 sm:px-10 lg:px-20 py-28 relative overflow-hidden">/, 
                    '<section className="bg-[#072149] px-5 sm:px-10 lg:px-20 py-28 relative overflow-hidden">');

// We also modified colors inside Special Features:
// From: text-[#072149] back to text-white
// From: text-gray-500 back to text-white/50
// Let's isolate the special features section to replace
const sfIndex = code.indexOf('{/* ══ SPECIAL FEATURES');
const statsIndex = code.indexOf('{/* ══ STATS STRIP');
if (sfIndex !== -1 && statsIndex !== -1) {
  let sfSection = code.substring(sfIndex, statsIndex);
  sfSection = sfSection.replace(/text-\[#072149\]/g, 'text-white');
  sfSection = sfSection.replace(/text-gray-500/g, 'text-white/50');
  code = code.substring(0, sfIndex) + sfSection + code.substring(statsIndex);
}

// STATS STRIP
code = code.replace(/<section className="bg-transparent border-y border-amber-100 px-5 sm:px-10 lg:px-20 py-20">/, 
                    '<section className="bg-[#FFFBF2] border-y border-amber-100 px-5 sm:px-10 lg:px-20 py-20">');

// CTA section
code = code.replace(/<section className="bg-transparent px-5 sm:px-10 lg:px-20 py-32 text-center relative overflow-hidden">/, 
                    '<section className="bg-white px-5 sm:px-10 lg:px-20 py-32 text-center relative overflow-hidden">');

fs.writeFileSync('a:\\HKD\\frontend\\src\\app\\gita-life-course\\page.tsx', code);
console.log("Restored original backgrounds.");
