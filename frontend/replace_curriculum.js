const fs = require('fs');

let code = fs.readFileSync('a:\\HKD\\frontend\\src\\app\\gita-life-course\\page.tsx', 'utf8');

const targetStr = `          {/* Tab bar */}
          <div className="flex flex-wrap gap-2 mb-10">
            {curriculumTabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={\`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm transition-all duration-300 border \${
                  activeTab === i
                    ? "bg-[#072149] text-white border-[#072149] shadow-lg"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }\`}
                style={{ fontWeight: 500 }}
              >
                <div className={\`w-5 h-5 \${activeTab === i ? "text-amber-400" : "text-gray-400"}\`}>
                  <tab.Icon className="w-5 h-5" />
                </div>
                <span className="hidden sm:inline">{tab.title}</span>
                <span className="sm:hidden">{tab.title.split(" ")[0]}</span>
              </button>
            ))}
          </div>

          {/* Active tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid lg:grid-cols-2 gap-8 items-start"
            >
              {/* Left: description */}
              <div className="bg-gray-50 rounded-2xl p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className={\`w-3 h-3 rounded-full \${curriculumTabs[activeTab].accent}\`} />
                  <p className="text-xs uppercase tracking-[0.25em] text-gray-400" style={{ fontWeight: 500 }}>
                    Module {String(activeTab + 1).padStart(2, "0")}
                  </p>
                </div>
                <div className="w-14 h-14 text-[#072149] mb-5">
                  {React.createElement(curriculumTabs[activeTab].Icon, { className: "w-14 h-14" })}
                </div>
                <h3 className="text-2xl text-[#072149] mb-4" style={{ fontWeight: 600 }}>
                  {curriculumTabs[activeTab].title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {curriculumTabs[activeTab].desc}
                </p>
              </div>

              {/* Right: highlights */}
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-2" style={{ fontWeight: 500 }}>What You&apos;ll Learn</p>
                {curriculumTabs[activeTab].highlights.map((h, i) => (
                  <motion.div
                    key={h}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.35 }}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm
                      hover:shadow-md hover:border-amber-200 transition-all duration-300 group cursor-default"
                  >
                    <div className={\`w-8 h-8 rounded-lg \${curriculumTabs[activeTab].accent} flex items-center justify-center text-white text-sm shrink-0\`}
                      style={{ fontWeight: 700 }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <p className="text-sm text-gray-700 group-hover:text-[#072149] transition-colors" style={{ fontWeight: 500 }}>
                      {h}
                    </p>
                    <svg className="w-4 h-4 text-gray-300 ml-auto group-hover:text-amber-500 group-hover:translate-x-1 transition-all shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>`;

const replacementStr = `          {/* Vertical Timeline */}
          <div className="relative mt-20 max-w-5xl mx-auto">
            {/* The Line */}
            <div className="absolute left-[28px] lg:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-200 via-amber-400 to-amber-200 lg:-translate-x-1/2 rounded-full opacity-50" />

            <div className="space-y-16 lg:space-y-24">
              {curriculumTabs.map((tab, i) => {
                const isEven = i % 2 === 0;
                return (
                  <AnimeReveal key={i} direction={isEven ? "right" : "left"} delay={100}>
                    <div className={\`relative flex flex-col lg:flex-row items-center \${isEven ? 'lg:flex-row-reverse' : ''} gap-8 lg:gap-16\`}>
                      
                      {/* Timeline Node */}
                      <div className="absolute left-[28px] lg:left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full border-4 border-amber-50 shadow-[0_0_20px_rgba(251,191,36,0.3)] flex items-center justify-center z-10 shrink-0">
                        <tab.Icon className="w-6 h-6 text-amber-500" />
                      </div>

                      {/* Spacer for desktop layout balance */}
                      <div className="hidden lg:block w-1/2 shrink-0" />

                      {/* Card Content */}
                      <div className="w-full lg:w-1/2 pl-[80px] lg:pl-0">
                        <motion.div 
                          whileHover={{ y: -5, scale: 1.02 }}
                          className={\`bg-white/60 backdrop-blur-xl border border-white/80 p-6 lg:p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(11,93,183,0.08)] transition-all duration-300 relative overflow-hidden group \${!isEven ? 'lg:mr-8' : 'lg:ml-8'}\`}
                        >
                          {/* Accent Gradient */}
                          <div className={\`absolute top-0 \${isEven ? 'right-0 rounded-bl-full' : 'left-0 rounded-br-full'} w-32 h-32 opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-br from-amber-300 to-transparent pointer-events-none\`} />
                          
                          <div className="flex items-center gap-3 mb-4 relative z-10">
                            <span className="text-sm font-bold text-amber-500 tracking-widest uppercase">Module {String(i + 1).padStart(2, '0')}</span>
                            <div className="h-[1px] w-10 bg-amber-200" />
                          </div>
                          
                          <h3 className="text-2xl text-[#072149] mb-4 relative z-10" style={{ fontWeight: 700 }}>{tab.title}</h3>
                          <p className="text-gray-600 mb-6 relative z-10 leading-relaxed">{tab.desc}</p>
                          
                          <div className="space-y-3 relative z-10">
                            {tab.highlights.map((h, hi) => (
                              <div key={hi} className="flex items-start gap-3">
                                <div className="mt-1 w-5 h-5 rounded-full bg-[#072149]/5 flex items-center justify-center shrink-0">
                                  <div className="w-2 h-2 rounded-full bg-[#072149]" />
                                </div>
                                <span className="text-sm text-gray-700 font-medium">{h}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      </div>

                    </div>
                  </AnimeReveal>
                );
              })}
            </div>
          </div>`;

code = code.replace(targetStr, replacementStr);

fs.writeFileSync('a:\\HKD\\frontend\\src\\app\\gita-life-course\\page.tsx', code);
console.log("Replaced Curriculum tabs with timeline.");
