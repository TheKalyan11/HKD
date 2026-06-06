const fs = require('fs');
let code = fs.readFileSync('a:\\HKD\\frontend\\src\\app\\gita-life-course\\page.tsx', 'utf8');

const targetStr = `          </AnimatePresence>
        </div>
      </section>

      {/* ══ SPECIAL FEATURES`;

const bannerStr = `          </AnimatePresence>
        </div>
      </section>

      {/* ══ SCROLLING BANNER ═══════════════════════════════════ */}
      <div className="bg-[#072149] text-white overflow-hidden py-4 border-y border-amber-500/30 relative z-10 flex items-center shadow-lg">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          className="flex whitespace-nowrap gap-12 w-max"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12 shrink-0">
              <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold">Hare Krishna Hare Rama</span>
              <PILotus className="w-5 h-5 text-amber-400" />
              <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold">Gita Life Course</span>
              <PISpark className="w-5 h-5 text-amber-400" />
              <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold">Transform Your Life</span>
              <PIBookOpen className="w-5 h-5 text-amber-400" />
              <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold">Timeless Wisdom</span>
              <PILotus className="w-5 h-5 text-amber-400" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ══ SPECIAL FEATURES`;

code = code.replace(targetStr, bannerStr);

fs.writeFileSync('a:\\HKD\\frontend\\src\\app\\gita-life-course\\page.tsx', code);
console.log("Added scrolling banner.");
