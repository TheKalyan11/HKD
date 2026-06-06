const fs = require('fs');

let code = fs.readFileSync('a:\\HKD\\frontend\\src\\app\\book-distribution\\page.tsx', 'utf8');

const targetStr = `      {/* ══ ABOUT SECTION ═══════════════════════════════════════ */}
      <section className="bg-white/80 backdrop-blur-md py-20 lg:py-32 relative border-y border-amber-100 shadow-[0_0_40px_rgba(0,0,0,0.02)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <AnimeReveal direction="right" delay={150}>
              <div className="relative">
                <div className="absolute -inset-4 bg-amber-100/50 rounded-3xl blur-xl" />
                <div className="bg-[#FFFBF2] border border-amber-200/50 p-8 md:p-12 rounded-3xl relative shadow-lg">
                  <BookOpen className="w-12 h-12 text-amber-500 mb-6" />
                  <h3 className="text-2xl text-[#072149] font-bold mb-4">Planting Seeds of Wisdom</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Gita distribution is about planting seeds of wisdom that inspire positive change. Studies show improvements in mental well-being, academic focus, and social behavior among readers.
                  </p>
                  <div className="flex items-center gap-3 text-amber-600 font-bold">
                    <span>A Gift that Can Change a Life</span>
                    <Heart className="w-5 h-5 fill-amber-600" />
                  </div>
                </div>
              </div>
            </AnimeReveal>

            <AnimeReveal direction="left" delay={250}>
              <div>
                <h2 className="text-3xl md:text-4xl text-[#072149] font-bold mb-6">About Gita Distribution</h2>
                <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                  <p>
                    The Bhagavad Gita is a 700-verse poem embedded within the Mahabharata. It presents a divine conversation between Lord Krishna and Arjuna on the battlefield of Kurukshetra.
                  </p>
                  <p>
                    The teachings of the Gita go beyond religion, addressing universal themes such as purpose, duty, self-realization, and liberation.
                  </p>
                </div>
              </div>
            </AnimeReveal>

          </div>
        </div>
      </section>`;

const replacementStr = `      {/* ══ ABOUT SECTION (Brutalist Red) ═══════════════════════════════════════ */}
      <section className="bg-[#EF3325] text-black py-16 md:py-24 relative overflow-hidden flex flex-col justify-between" style={{ minHeight: "80vh" }}>
        
        {/* Left Side Vertical Text */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left hidden lg:block select-none">
          <span className="font-bold tracking-widest text-lg">Bhagavad Gita®</span>
        </div>

        <div className="w-full px-5 md:px-16 lg:px-32 relative z-10 flex-grow flex flex-col">
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24 mb-16">
            
            {/* Column 1 */}
            <AnimeReveal direction="up" delay={100}>
              <h3 className="text-xl md:text-3xl font-extrabold mb-4 tracking-tight">The Origin:</h3>
              <div className="space-y-2 text-lg md:text-xl font-medium leading-tight">
                <p className="border-b border-black pb-1 hover:border-b-2 cursor-default transition-all">700-verse poem</p>
                <p className="border-b border-black pb-1 hover:border-b-2 cursor-default transition-all">Embedded in Mahabharata</p>
                <p className="border-b border-black pb-1 hover:border-b-2 cursor-default transition-all">Divine conversation</p>
              </div>
            </AnimeReveal>

            {/* Column 2 */}
            <AnimeReveal direction="up" delay={200}>
              <h3 className="text-xl md:text-3xl font-extrabold mb-4 tracking-tight">The Vision:</h3>
              <div className="space-y-2 text-lg md:text-xl font-medium leading-tight">
                <p>Addressing universal themes.</p>
                <p>Purpose, duty, & liberation.</p>
                <p>Planting seeds of wisdom that inspire positive change.</p>
              </div>
            </AnimeReveal>

            {/* Column 3 (Icon) */}
            <AnimeReveal direction="left" delay={300} className="hidden lg:flex justify-end items-start">
              <div className="w-40 h-40 bg-black rounded-full flex items-center justify-center text-[#EF3325]">
                <BookOpen className="w-20 h-20" strokeWidth={1.5} />
              </div>
            </AnimeReveal>
            
          </div>

          {/* Thin Divider Line */}
          <div className="w-full h-[1px] bg-black/80 mb-16" />

          {/* Massive Text at Bottom */}
          <div className="mt-auto w-full pt-10">
            <AnimeReveal direction="up" delay={400}>
              <div className="flex items-end justify-between w-full">
                <h2 
                  className="text-[14vw] leading-[0.75] tracking-tighter m-0"
                  style={{ fontStyle: "italic", fontWeight: 900 }}
                >
                  Gita Daan
                </h2>
                <div className="mb-[1.5vw] w-[7vw] h-[7vw] rounded-full border-[0.4vw] border-black flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-1/2 h-1/2 text-black">
                    <path d="M12 2C12 2 12 10 20 12C12 14 12 22 12 22C12 22 12 14 4 12C12 10 12 2 12 2Z" fill="black" />
                  </svg>
                </div>
              </div>
            </AnimeReveal>
          </div>
        </div>
      </section>`;

code = code.replace(targetStr, replacementStr);

fs.writeFileSync('a:\\HKD\\frontend\\src\\app\\book-distribution\\page.tsx', code);
console.log("Replaced about section.");
