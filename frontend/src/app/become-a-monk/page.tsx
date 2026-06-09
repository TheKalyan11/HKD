"use client";

import React from 'react';
import { ArrowRight, BookOpen, Heart, Shield, Quote, GraduationCap, TrendingDown, Home } from 'lucide-react';

export default function BecomeAMonkPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative w-full flex">
        <img 
          src="/bam.png" 
          alt="Become a Monk" 
          className="w-full h-auto max-h-[90vh] object-cover block"
        />
        {/* Subtle gradient overlay at the bottom for text readability */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
        
        {/* Overlay Text */}
        <div className="absolute bottom-6 md:bottom-12 w-full text-center px-4">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-black text-white uppercase tracking-wider drop-shadow-xl">
            BECOME A MONK
          </h1>
        </div>
      </section>

      {/* Scrolling Banner */}
      <div className="relative w-full bg-white overflow-hidden py-4 shadow-sm z-20 border-y border-gray-100">
        <div className="flex whitespace-nowrap marquee-container">
          {Array(4).fill(0).map((_, i) => (
            <span key={i} className="text-gray-700 font-sans font-medium text-sm px-2 uppercase tracking-[0.2em] flex items-center">
              <span className="mx-8 text-gray-300 text-lg">○</span> DEDICATE TO KRISHNA
              <span className="mx-8 text-gray-300 text-lg">○</span> FIND INNER PEACE
              <span className="mx-8 text-gray-300 text-lg">○</span> SPREAD KNOWLEDGE
              <span className="mx-8 text-gray-300 text-lg">○</span> DAILY SADHANA
              <span className="mx-8 text-gray-300 text-lg">○</span> SIMPLE LIVING
            </span>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html:`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-container {
          animation: marquee 40s linear infinite;
          width: max-content;
        }
      `}} />
      
      {/* Three Pillars Section */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-serif font-black text-[#072149] mb-4">
              How to become a Full-time Monk (Brahmacari) ?
            </h2>
            <div className="w-24 h-1.5 bg-orange-500 mx-auto rounded-full" />
          </div>

          <div className="max-w-6xl mx-auto space-y-24 pb-12 text-gray-700 text-lg leading-relaxed font-serif animate-fade-in-up">
            
            {/* The Story */}
            <div className="space-y-16">
              {/* Row 1 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="first-letter:text-7xl first-letter:font-black first-letter:text-orange-600 first-letter:mr-3 first-letter:float-left mb-6">
                    While distributing spiritual literature on the streets of Dehradun, I once met a group of software professionals. Their manager became quite surprised when he learned that we live in an ashram and follow the principles of Brahmacarya (celibacy).
                  </p>
                  <p>
                    As he asked about our daily routine, I explained that we usually rise between 3:30 and 4:00 in the morning and spend our day engaged in various forms of devotional service. Before I could continue, he interrupted and exclaimed, <span className="font-bold text-gray-900">“You must be crazy!”</span> He could not imagine how anyone could be happy waking up so early, especially when he and his colleagues often stayed awake until those hours on weekends enjoying parties and nightlife.
                  </p>
                </div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)] h-[400px] border-8 border-white group">
                  <img src="/kik.png" alt="Monk meditating on Krishna" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 relative rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)] h-[400px] border-8 border-white group">
                  <img src="https://hkmdehradun.org/live-site/assets/images/monk2.jpg" alt="Morning prayer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <div className="order-1 md:order-2">
                  <p>
                    What shocked him even more was our commitment to celibacy. I gently explained that we find genuine happiness in this way of life and that our spiritual practices bring us a sense of fulfillment far greater than temporary material pleasures. However, my explanation did little to convince him. He and his colleagues looked at me with disbelief, politely ended the conversation, and hurried off to work, leaving me wondering whether society considers people like us unusual.
                  </p>
                </div>
              </div>
            </div>

            {/* Highlighted Middle Section */}
            <div className="bg-orange-50 p-8 md:p-12 lg:p-16 rounded-[3rem] border border-orange-200/50 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl -z-10" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl -z-10" />
               
               <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
                 <div className="lg:col-span-3 space-y-6">
                   <p>
                     Although celibate monks may be rare in today’s world, they are certainly not abnormal. Throughout history, countless spiritual seekers have embraced celibacy and lived meaningful, contented lives. In the Vaishnava tradition, great personalities such as Haridas Thakur and Bhaktisiddhanta Sarasvati Thakura demonstrated extraordinary character, devotion, and purpose while living as celibates.
                   </p>
                   <p>
                     Even in our own monastery, there are many monks who have dedicated decades of their lives to spiritual service. They continue to live happily and peacefully by following devotional principles and maintaining a strong connection with God.
                   </p>
                   <p>
                     <span className="font-bold text-orange-900">The true source of happiness is not merely celibacy itself.</span> Rather, it is the deep and meaningful relationship with Sri Krishna that brings genuine satisfaction. Early morning prayers, meditation, and devotional practices help strengthen this connection. As one experiences higher spiritual happiness, the attraction to temporary material pleasures gradually diminishes.
                   </p>
                 </div>
                 <div className="lg:col-span-2 relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[450px] w-full border-8 border-white group rotate-2 hover:rotate-0 transition-transform duration-500">
                   <img src="https://hkmdehradun.org/live-site/assets/images/monk3.jpg" alt="Reading scripture" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                 </div>
               </div>
            </div>

            {/* Row 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)] h-[400px] border-8 border-white group">
                <img src="https://hkmdehradun.org/live-site/assets/images/monk5.jpg" alt="Selfless service" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
              <div className="space-y-6">
                <p className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                  Profound Fulfillment
                </p>
                <p>
                  For sincere practitioners, spiritual life offers profound fulfillment. While material desires may occasionally arise, they no longer dominate the mind. Instead, they are viewed as distractions that can be overcome through sincere devotional practice. When one's spiritual practices are strong and focused, material attractions lose much of their appeal. Conversely, when spiritual discipline weakens, worldly pleasures can appear more attractive.
                </p>
              </div>
            </div>

            {/* The Quote block with Animated Book */}
            <div className="py-12 md:py-16 my-16 bg-gradient-to-br from-orange-50/80 to-orange-100/40 rounded-[3rem] border border-orange-200/60 relative overflow-hidden shadow-sm">
              <div className="max-w-5xl mx-auto px-8 md:px-12 grid md:grid-cols-3 gap-12 items-center">
                
                {/* The Animated Book */}
                <div className="md:col-span-1 flex justify-center gita-book-wrapper">
                  <div className="book shadow-2xl">
                    <div className="bg-orange-50 w-full h-full p-6 flex flex-col items-center justify-center text-center border-l-8 border-gray-300">
                      <p className="font-serif text-lg font-bold text-orange-900 mb-2">BG 2.69</p>
                      <Quote className="w-8 h-8 text-orange-300 mx-auto" />
                    </div>
                    <div className="cover bg-cover bg-center border-l-8 border-[#2e1507]" style={{ backgroundImage: "url('/gita-cover.jpg')" }}>
                      <div className="absolute inset-0 bg-black/10 rounded-r-[10px] shadow-[inset_8px_0_15px_rgba(0,0,0,0.4)] pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                {/* The Quote Text */}
                <div className="md:col-span-2 space-y-6">
                  <p className="text-sm font-sans font-bold text-orange-600 tracking-[0.2em] uppercase">Lord Krishna explains:</p>
                  <blockquote className="text-2xl md:text-3xl font-serif font-black text-[#072149] italic leading-snug relative z-10">
                    <Quote className="absolute -left-8 -top-6 w-12 h-12 text-orange-300/40 rotate-180 -z-10" />
                    "What is night for all beings is the time of awakening for the self-controlled, and what is the time of awakening for all beings is night for the introspective sage."
                  </blockquote>
                  <p className="text-gray-600 font-sans leading-relaxed">
                    This teaches that what the world often considers normal may appear misguided from a spiritual perspective, while the lifestyle of a sincere spiritual seeker may seem unusual to those absorbed in material pursuits.
                  </p>
                </div>
              </div>

              <style dangerouslySetInnerHTML={{__html: `
                .gita-book-wrapper .book {
                  position: relative;
                  border-radius: 4px 12px 12px 4px;
                  width: 220px;
                  height: 320px;
                  background-color: whitesmoke;
                  transform-style: preserve-3d;
                  perspective: 2000px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: #000;
                  transition: transform 0.5s ease;
                }

                .gita-book-wrapper .book:hover {
                  transform: scale(1.05);
                }

                .gita-book-wrapper .cover {
                  top: 0;
                  left: 0;
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  border-radius: 4px 12px 12px 4px;
                  cursor: pointer;
                  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                  transform-origin: left center;
                  box-shadow: inset 4px 0 10px rgba(0,0,0,0.1), 2px 0 12px rgba(0,0,0,0.3);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  backface-visibility: hidden;
                }

                .gita-book-wrapper .book:hover .cover {
                  transform: rotateY(-80deg);
                  box-shadow: inset 4px 0 10px rgba(0,0,0,0.1), 15px 0 25px rgba(0,0,0,0.2);
                }
              `}} />
            </div>

            {/* Daily Activities & Application Form Split Section */}
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start mt-24">
              
              {/* Left Column: Activities List */}
              <div className="lg:col-span-3 space-y-8">
                <div className="relative inline-block mb-10">
                  <h3 className="text-3xl md:text-4xl font-serif font-black text-orange-500 relative z-10 pr-4">
                    What are the Daily Activities of a Monk?
                  </h3>
                  <svg className="absolute -bottom-2 left-0 w-full h-4 text-orange-400/50 -z-10" viewBox="0 0 400 30" preserveAspectRatio="none">
                    <path
                      d="M0,15 L400,15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                      strokeLinecap="round"
                      className="draw-line-animation"
                    />
                  </svg>
                  <style dangerouslySetInnerHTML={{__html: `
                    .draw-line-animation {
                      stroke-dasharray: 400;
                      stroke-dashoffset: 400;
                      animation: drawLine 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                    }
                    @keyframes drawLine {
                      0% { stroke-dashoffset: 400; }
                      80%, 100% { stroke-dashoffset: 0; }
                    }
                  `}} />
                </div>
                
                <div className="space-y-8 font-sans">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">1. Spreading Krishna Consciousness</h4>
                    <p className="text-gray-600 leading-relaxed text-[15px]">Participate in the distribution of spiritual literature such as <em>Bhagavad Gita As It Is</em>, <em>Srimad Bhagavatam</em>, <em>Ramayana</em>, <em>Sri Caitanya Caritamrita</em>, <em>Isopanishad</em>, <em>Upadesamrita</em>, <em>Science of Self-Realization</em>, <em>Mahabharata</em>, <em>Krishna Book</em>, and other devotional publications to help share spiritual knowledge with society.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">2. Study and Practice the Scriptures</h4>
                    <p className="text-gray-600 leading-relaxed text-[15px]">Regularly study the sacred scriptures and imbibe their teachings in your daily life. Over time, develop a thorough understanding and mastery of these spiritual texts.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">3. Maintain a Disciplined Daily Routine</h4>
                    <p className="text-gray-600 leading-relaxed text-[15px]">Retire early at around 8:30 PM and rise early at approximately 3:45 AM to begin the day with spiritual practices and devotional activities.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">4. Cultivate Personal Cleanliness</h4>
                    <p className="text-gray-600 leading-relaxed text-[15px]">Maintain high standards of cleanliness by washing your clothes and utensils, keeping your room tidy, and regularly cleaning common areas such as bathrooms and living spaces.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">5. Honor Only Krishna Prasadam</h4>
                    <p className="text-gray-600 leading-relaxed text-[15px]">Consume only food that has been offered to Lord Krishna. Eating at hotels, restaurants, or roadside stalls is not permitted. The use of tea, coffee, alcohol, cigarettes, and other intoxicants is strictly prohibited.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">6. Develop a Strong Sense of Responsibility</h4>
                    <p className="text-gray-600 leading-relaxed text-[15px]">Understand and faithfully perform your assigned duties. Take ownership of your service and remain accountable for the results of your efforts.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">7. Utilize Time Wisely</h4>
                    <p className="text-gray-600 leading-relaxed text-[15px]">Make the best use of every moment by engaging in chanting the Hare Krishna Maha Mantra, studying spiritual literature, and performing devotional service.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">8. Learn and Develop New Skills</h4>
                    <p className="text-gray-600 leading-relaxed text-[15px]">Acquire practical and devotional skills such as playing the Mridanga, Kartals, and Harmonium, cooking, devotional singing, vehicle driving, and caring for cows.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">9. Follow the Daily Schedule Strictly</h4>
                    <p className="text-gray-600 leading-relaxed text-[15px]">Adhere to the prescribed daily timetable with discipline, sincerity, and consistency.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">10. Listen, Understand, and Execute Instructions</h4>
                    <p className="text-gray-600 leading-relaxed text-[15px]">Develop the ability to carefully hear instructions, understand them properly, and carry them out with dedication and attention to detail.</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Application Form */}
              <div className="lg:col-span-2 sticky top-32">
                <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-200 shadow-xl font-sans">
                  <h3 className="text-2xl font-bold text-[#072149] mb-2">Are you looking to become a Monk?</h3>
                  <p className="text-gray-500 mb-8 text-sm">Submit your details below...</p>
                  
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Enter Full Name *</label>
                      <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-gray-50 hover:bg-white" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number *</label>
                      <p className="text-[11px] text-gray-400 mb-2 uppercase tracking-wide">Preferably Whatsapp</p>
                      <input type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-gray-50 hover:bg-white" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label>
                      <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-gray-50 hover:bg-white text-gray-600" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Educational Qualification *</label>
                      <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-gray-50 hover:bg-white" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                      <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-gray-50 hover:bg-white" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Current Occupation *</label>
                      <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-gray-50 hover:bg-white" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Your Photo *</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 hover:bg-white transition-colors cursor-pointer group">
                        <div className="space-y-1 text-center">
                          <svg className="mx-auto h-12 w-12 text-gray-400 group-hover:text-orange-500 transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <div className="flex text-sm text-gray-600 justify-center mt-4">
                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-transparent font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none">
                              <span>Upload a file</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" required />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 submit-button-wrapper">
                      <button type="submit">
                        <div className="svg-wrapper-1">
                          <div className="svg-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={30} height={30} className="icon">
                              <path d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z" />
                            </svg>
                          </div>
                        </div>
                        <span>Submit Details</span>
                      </button>
                      
                      <style dangerouslySetInnerHTML={{__html: `
                        .submit-button-wrapper button {
                          font-family: inherit;
                          font-size: 20px;
                          background: #212121;
                          color: white;
                          fill: rgb(155, 153, 153);
                          padding: 0.7em 1em;
                          padding-left: 0.9em;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          cursor: pointer;
                          border: none;
                          border-radius: 15px;
                          font-weight: 1000;
                          width: 100%;
                          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                        }

                        .submit-button-wrapper button span {
                          display: block;
                          margin-left: 0.5em;
                          transition: all 0.3s ease-in-out;
                        }

                        .submit-button-wrapper button svg {
                          display: block;
                          transform-origin: center center;
                          transition: transform 0.3s ease-in-out;
                        }

                        .submit-button-wrapper button:hover {
                          background: #000;
                        }

                        .submit-button-wrapper button:hover .svg-wrapper {
                          transform: scale(1.25);
                          transition: 0.5s linear;
                        }

                        .submit-button-wrapper button:hover svg {
                          transform: translateX(3em) scale(1.1);
                          fill: #fff;
                        }

                        .submit-button-wrapper button:hover span {
                          opacity: 0;
                          transform: translateX(1em);
                          transition: 0.5s linear;
                        }

                        .submit-button-wrapper button:active {
                          transform: scale(0.98);
                        }
                      `}} />
                    </div>
                  </form>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
