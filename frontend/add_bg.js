const fs = require('fs');

let code = fs.readFileSync('a:\\HKD\\frontend\\src\\app\\book-distribution\\page.tsx', 'utf8');

const targetInitiativesSectionStart = `{/* ══ INITIATIVES SECTION ════════════════════════════════════ */}
      <section className="pt-10 pb-10 lg:pt-16 lg:pb-16 relative overflow-hidden bg-white">`;

const targetGetInvolvedSectionStart = `{/* ══ GET INVOLVED SECTION ════════════════════════════════ */}
      <section className="pt-0 pb-16 lg:pb-24 bg-white relative">`;

const targetGallerySectionStart = `{/* ══ GALLERY SECTION ════════════════════════════════════ */}`;

// We want to wrap from Initiatives to the end of Get Involved.
// So we insert a div before Initiatives and close it before Gallery.

code = code.replace(targetInitiativesSectionStart, 
`      {/* ══ COMBINED BACKGROUND FOR INITIATIVES & GET INVOLVED ════════════ */}
      <div className="relative bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/forest-bg.png')" }}>
        <div className="absolute inset-0 bg-[#FFFBF2]/70 backdrop-blur-sm pointer-events-none z-0" />
        
      {/* ══ INITIATIVES SECTION ════════════════════════════════════ */}
      <section className="pt-10 pb-10 lg:pt-16 lg:pb-16 relative overflow-hidden bg-transparent">`
);

code = code.replace(targetGetInvolvedSectionStart,
`      {/* ══ GET INVOLVED SECTION ════════════════════════════════ */}
      <section className="pt-0 pb-16 lg:pb-24 bg-transparent relative">`
);

code = code.replace(targetGallerySectionStart,
`      </div>

      {/* ══ GALLERY SECTION ════════════════════════════════════ */}`
);

fs.writeFileSync('a:\\HKD\\frontend\\src\\app\\book-distribution\\page.tsx', code);
console.log("Wrapped sections with forest background.");
