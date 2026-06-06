const fs = require('fs');
let code = fs.readFileSync('a:\\HKD\\frontend\\src\\app\\gita-life-course\\page.tsx', 'utf8');

const sfStart = '{/* ══ SPECIAL FEATURES — dark accordion ═════════════════ */}';
const statsStart = '{/* ══ STATS STRIP ═══════════════════════════════════════ */}';

const sfIndex = code.indexOf(sfStart);
const statsIndex = code.indexOf(statsStart);

if (sfIndex !== -1 && statsIndex !== -1) {
  let sfSection = code.substring(sfIndex, statsIndex);
  
  // Update section class
  // From: <section className="bg-[#072149] px-5 sm:px-10 lg:px-20 py-28 relative overflow-hidden">
  // To: <section className="bg-white/60 backdrop-blur-2xl px-5 sm:px-10 lg:px-20 py-28 relative overflow-hidden border-y border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
  sfSection = sfSection.replace(
    /<section className="bg-\[#072149\] px-5 sm:px-10 lg:px-20 py-28 relative overflow-hidden">/,
    '<section className="bg-white/60 backdrop-blur-3xl px-5 sm:px-10 lg:px-20 py-28 relative overflow-hidden border-y border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">'
  );
  
  // Make the abstract blur stronger to show through the glass
  sfSection = sfSection.replace('bg-amber-400/5 blur-3xl', 'bg-amber-400/30 blur-[80px]');
  
  // Update text colors
  // text-white -> text-[#072149]
  // text-white/50 -> text-[#072149]/70
  sfSection = sfSection.replace(/text-white\/50/g, 'text-[#072149]/70');
  sfSection = sfSection.replace(/text-white/g, 'text-[#072149]');
  
  // The dot pattern background might need to be darker so it's visible on white
  // style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }}
  // change #ffffff to #000000
  sfSection = sfSection.replace(/radial-gradient\(circle, #ffffff 1px/g, 'radial-gradient(circle, #000000 1px');
  // reduce opacity further or keep at 0.04
  
  code = code.substring(0, sfIndex) + sfSection + code.substring(statsIndex);
  fs.writeFileSync('a:\\HKD\\frontend\\src\\app\\gita-life-course\\page.tsx', code);
  console.log("Updated Special Features to liquid glass.");
}
