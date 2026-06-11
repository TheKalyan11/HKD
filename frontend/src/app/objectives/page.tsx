"use client";

import React, { useRef, useState } from 'react';
import { Target } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

/* ── Scroll-triggered reveal ──────────────────────────── */
function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const y = direction === "up" ? 40 : direction === "down" ? -40 : 0;
  const x = direction === "left" ? 40 : direction === "right" ? -40 : 0;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.8, delay: delay / 1000, ease: [0.25, 1, 0.5, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const objectives = [
  {
    title: "Spreading the Holy Name",
    text: "It is our first and foremost objective to inspire people to chant the Hare Krishna Maha-mantra. Chanting the holy name is the Yuga-dharma; and Supreme Lord Sri Krishna descended as Sri Chaitanya Mahaprabhu to inaugurate this dharma and propagate the Sankirtana Movement. He desired that the entire world be inundated with the chanting of the holy name. Srila Prabhupada the founder-acharya of ISKCON accepted this as the mission of his life and established the world-wide Hare Krishna Movement to spread the holy names. Following in his footsteps, we, the disciples of Srila Prabhupada, have initiated various programs like Chanters Club, Harinam Festival, Hare Krishna Flash Mobs, etc., to spread the holy names and inspire as many people as possible to chant the Hare Krishna Maha-mantra.",
    image: "https://hkmdehradun.org/assets/images/spreading-the-holy-name.jpg"
  },
  {
    title: "Gorgeous Deity-Worship and Opulent Festivals",
    text: "The second objective is to maintain opulent and gorgeous Deity worship along with festivals on a grand scale throughout the year. The Supreme Lord Krishna has appeared before us in the form of a Deity to accept our services. Srila Prabhupada established Deity worship as an important part of the Krishna Consciousness movement. He had set-up temples around the world so that his disciples can serve the Deities every day. He also emphasized on decorating the Deities and celebrating festivals in an exuberant manner throughout the year. The Supreme Personality of Godhead Krishna is present in the Deity form. By serving Him, we can purify ourselves from material contamination. By engaging all our senses in directly serving Him, we can get rid of our non-devotional tendencies. It also brings steadiness to our materially agitated mind.",
    image: "https://hkmdehradun.org/assets/images/deity-worship.jpg"
  },
  {
    title: "Create Awareness about Srila Prabhupada",
    text: "The third objective is to increase the awareness and appreciation of Srila Prabhupada – his message, his saintly personality, his character, his mission and his institution. Srila Prabhupada is the spiritual ambassador who visited this mortal world to show us the path back to Godhead. As his disciples, it is our duty to create awareness about him. He is a bona fide spiritual master in the disciplic succession originating from Brahma. A bona fide spiritual master is not an ordinary man. Just as an ambassador is an authorized representative of his country, similarly, a spiritual master, who comes in the disciplic succession, parampara, is an empowered representative of God. Ordered by his spiritual master, he embarked on his life’s mission to spread the message of Krishna to the English-speaking community. He built a house in which the whole world could live.",
    image: "https://hkmdehradun.org/assets/images/srila-prabhupada-awerness.jpg"
  },
  {
    title: "Distribution of Scriptures",
    text: "Our spiritual master’s mission was to spread the transcendental message of Krishna as recorded in Bhagavad-gita and Srimad Bhagavatam through his books. He founded the Bhaktivedanta Book Trust in 1972. He wrote more than 70 books which have been translated into 57 languages. To understand any philosophy, reading books form an important tool of comprehension for a reader. Srila Prabhupada encouraged his devotees to circulate books among different communities. Reading books form the basis of understanding the Hare Krishna movement. You can access the catalog of his books. Some of these books are also available for download. We also encourage devotees to read and distribute these books. Srila Prabhupada said that this service of book distribution makes him happy.",
    image: "https://hkmdehradun.org/assets/images/distribution-of-scriptures.jpg"
  },
  {
    title: "Missionary Development",
    text: "The fifth objective is to maintain and nourish a vibrant, inspired and committed community of missionaries with mature understanding of Srila Prabhupada’s instructions for his Krishna consciousness movement. Aspiring devotees who want to dedicate their lives to serve the mission of Srila Prabhupada are given basic facilities to be part of the community, get trained in a disciplined way of life, and serve the mission for the greater good of the society.",
    image: "/bam.png"
  },
  {
    title: "Resource Mobilization",
    text: "The support for the mission comes from donors and patrons and they are one of our major stakeholders. It is due to their support that we are able to render our services to the society. We provide various opportunities for our donors and patrons to advance in their spiritual life by educating them on the principles of spiritual life through the books written by Srila Prabhupada. The patrons are also invited on special occasions like their birthday or marriage anniversary, to visit the temple and take the blessings of the Lord. We also invite them for major festivals at the temple. You can also be a patron of ISKCON.",
    image: "https://hkmdehradun.org/assets/images/fund-raising.jpg"
  },
  {
    title: "To increase Krishna Consciousness",
    text: "People from all walks of life irrespective of caste, creed and gender are encouraged to participate in our programs to develop their understanding of the spiritual practices that will help them in leading a peaceful life filled with happiness and prosperity. To increase God consciousness in the society, ISKCON Bangalore conducts specific programs for children (Cultural Education), youth (FOLK Programs), professionals (Life Sublime) and other members of the society (Krishnashraya). These programs are conducted free of cost, you need not pay for it. Next time you visit the temple; enquire at the Temple Reception to know more about the programs and how you can be part of this.",
    image: "https://hkmdehradun.org/assets/images/increase-krishna-consciousness.jpg"
  },
  {
    title: "Special Purpose Enterprises",
    text: "Touchstone Foundation, an independent trust associated with ISKCON Bangalore, has been involved in various ventures to generate the funds required for sustaining our charitable initiatives. As you exit the temple hall, there are various counters selling prasadam (food offered to the Lord) and devotional artifacts. There is an exclusive section for handicrafts called Dakshinakriti. The food court offers varieties of delicious sattvik preparations to satisfy your taste buds and for a heavy meal you can stop at the Annakuta Restaurant or the Higher Taste Restaurant – God’s own Cuisine. The profits generated from these initiatives support our charitable programs.",
    image: "https://hkmdehradun.org/assets/images/devotional-item.jpg"
  },
  {
    title: "Upcoming VCM Project",
    text: "The next objective is to present, preserve and promote the cultural heritage of India through new projects and capitalize on such opportunities to further the mission of Srila Prabhupada. Krishna Lila Theme Park is one such project which is magnificent in scale. This project is likely to be completed in the year 2021-2022. It is an initiative to present the culture and heritage of our country, as described in the Vedic Scriptures, to the contemporary society in a compelling manner using a narrative strategy – technology assisted multi-sensory immersive and experimental story telling. Disney World and Universal Studios use this kind of communication strategy. We want to use this technology to impress the younger generation with the glories of our heroes like Krishna, Rama, Hanuman, etc. The cost estimate of this project is Rs.350 crores. This Theme Park will be a landmark destination in cultural and religious tourism in Bengaluru.",
    image: "https://hkmdehradun.org/assets/images/devotional-item.jpg" // Using duplicate image
  },
  {
    title: "Life in Harmony with Nature",
    text: "Another objective is to bring about a way of life that is in harmony with nature and offers a sustainable alternative to the dominant consumerist and materialistic world. Srila Prabhupada always instructed his disciples to accept a simple life style. He always stressed on simple living and high thinking. He initiated the farm project at New Vrindavan, United States. ISKCON Bangalore has its farm in Mahadevapura where there are hundreds of cows and bulls. There is also a goshala in the temple premises at Hare Krishna Hill which maintains around 25 cows.",
    image: "https://hkmdehradun.org/assets/images/harmony-with-nature.jpg"
  },
  {
    title: "Prasadam Distribution",
    text: "Food distribution is considered the supreme of all charities. Śrīla Prabhupāda desired that everyone taste the nectar of devotion. Food offered to Lord Krishna, known as prasādam, is divine and has the power to relieve suffering by freeing one from sinful reactions. Śrīla Prabhupāda strongly emphasized that no one should go hungry in the presence of a temple or a devotee.\n\nIn the spirit of this instruction, Hare Krishna Movement Dehradun regularly distributes prasādam in Haridwar to thousands of pilgrims and sadhus who visit the holy dhāma throughout the year. This sacred food distribution program serves nutritious and sanctified meals with devotion and care, enabling pilgrims to spiritually benefit while undertaking their sacred journey.\n\nAll our food distribution activities are carried out with a commitment to sustainability and socially responsible practices, ensuring purity, dignity, and long-term positive impact.",
    image: "https://hkmdehradun.org/assets/images/prasadam-distribution.jpg"
  }
];

export default function OurObjectivesPage() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      className="w-full bg-[#faf8f5] font-sans relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: -1000, y: -1000 })}
    >
      {/* ── FULL PAGE INTERACTIVE GRID BACKGROUND ─────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-[0]">
        {/* Base Grid */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '4rem 4rem'
          }}
        />
        
        {/* Interactive Highlighted Grid */}
        <div 
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(7,33,73,0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(7,33,73,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '4rem 4rem',
            WebkitMaskImage: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
            maskImage: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-28 md:pb-16 overflow-hidden z-10">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-orange-200/40 rounded-full blur-[100px] opacity-60 mix-blend-multiply" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-blue-200/30 rounded-full blur-[100px] opacity-60 mix-blend-multiply" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex justify-start">
          <div className="max-w-xl text-left">
            <Reveal direction="right" delay={100}>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-orange-200/50 text-orange-600 text-sm font-bold tracking-widest uppercase shadow-sm mb-6">
                <Target className="w-4 h-4" />
                <span>HKM Dehradun</span>
              </div>
            </Reveal>
            
            <Reveal direction="right" delay={200}>
              <h1 className="text-5xl sm:text-6xl md:text-[5rem] font-serif font-black text-[#072149] tracking-tight leading-[1.05] pb-4">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-[#072149]">Objectives</span>
              </h1>
            </Reveal>

            <Reveal direction="right" delay={300}>
              <blockquote className="border-l-4 border-orange-400 pl-6 my-6 italic">
                <p className="text-xl md:text-2xl text-gray-600 font-serif leading-relaxed">
                  "HKM Dehradun is a charitable society dedicated to spreading the teachings of Lord Krishna through devotion, service, and spiritual education."
                </p>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 md:py-16 relative z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="space-y-16 md:space-y-20">

            {objectives.map((obj, index) => {
              const isEven = index % 2 === 0;

              // Full width text block for sections without image
              if (!obj.image) {
                return (
                  <Reveal key={index} direction="up" delay={100}>
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-orange-50/50 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-[#072149] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                          <span className="text-3xl font-serif font-bold text-orange-600">{index + 1}</span>
                        </div>
                        <div>
                          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#072149] mb-4">{obj.title}</h2>
                          <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">{obj.text}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              }

              return (
                <div key={index} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-16 items-center`}>
                  {/* Image Side */}
                  <div className="w-full lg:w-1/2">
                    <Reveal direction={isEven ? "right" : "left"} delay={100}>
                      <div className="relative group perspective-[1000px]">
                        <div className="absolute -inset-4 bg-gradient-to-r from-orange-300 via-orange-100 to-blue-200 rounded-[3rem] blur-xl opacity-30 group-hover:opacity-60 transition duration-700" />
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] border-8 border-white/80 bg-white backdrop-blur-sm transform group-hover:-translate-y-2 transition-transform duration-700">
                          <div className="rounded-[2rem] overflow-hidden bg-black/5">
                            <img
                              src={obj.image}
                              alt={obj.title}
                              className="w-full h-auto transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                            />
                          </div>
                        </div>
                        {/* Elegant Number Badge */}
                        <div className={`absolute ${isEven ? 'left-4 sm:-left-6' : 'right-4 sm:-right-6'} top-4 sm:top-1/2 sm:-translate-y-1/2 w-16 h-16 rounded-full bg-white shadow-2xl flex items-center justify-center border border-gray-100 z-20`}>
                          <span className="text-3xl font-serif font-bold text-orange-600">{index + 1}</span>
                        </div>
                      </div>
                    </Reveal>
                  </div>

                  {/* Text Side */}
                  <div className="w-full lg:w-1/2">
                    <Reveal direction={isEven ? "left" : "right"} delay={200}>
                      <div className="space-y-6">

                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#072149] tracking-tight leading-tight">
                          {obj.title}
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-[#072149] rounded-full" />
                        <div className="prose prose-lg text-gray-600">
                          {obj.text.split('\n\n').map((paragraph, i) => (
                            <p key={i} className="leading-relaxed mb-4">{paragraph}</p>
                          ))}
                        </div>
                      </div>
                    </Reveal>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </section>
    </div>
  );
}
