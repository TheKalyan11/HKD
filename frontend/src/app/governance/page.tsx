"use client";
import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/* =========================================================
   NOUN-PROJECT-STYLE SVG ICON COMPONENTS
   All icons: 48×48 viewBox, stroke-based, currentColor
   ========================================================= */

const IconTemple = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="24" cy="9" r="2.5" fill="currentColor" stroke="none" />
    <path d="M21.5 11.5 L24 7 L26.5 11.5 Z" fill="currentColor" stroke="none" />
    <path d="M20 12 H28 V14.5 H20 Z" fill="currentColor" stroke="none" />
    <path d="M17 14.5 L20 14.5 L20 17 L28 17 L28 14.5 L31 14.5 L31 17.5 L17 17.5 Z"
      fill="currentColor" stroke="none" />
    <rect x="13" y="17.5" width="22" height="4" rx="0.5" fill="currentColor" stroke="none" />
    <rect x="11" y="21.5" width="26" height="20" rx="1" fill="currentColor" stroke="none" />
    <rect x="20.5" y="29" width="7" height="12.5" rx="3.5" fill="white" stroke="none" />
    <rect x="13" y="25" width="6" height="8" rx="1" fill="white" stroke="none" />
    <rect x="29" y="25" width="6" height="8" rx="1" fill="white" stroke="none" />
    <line x1="8" y1="41.5" x2="40" y2="41.5" strokeWidth="2.2" stroke="currentColor" />
  </svg>
);

const IconLotus = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M24 38 C24 38 12 32 12 22 C12 16 17.5 11 24 11 C30.5 11 36 16 36 22 C36 32 24 38 24 38Z"
      fill="currentColor" fillOpacity="0.12" />
    <path d="M24 38 C24 38 14 27 16 18 C17.5 12 20.5 10 24 10" />
    <path d="M24 38 C24 38 34 27 32 18 C30.5 12 27.5 10 24 10" />
    <path d="M24 10 C24 10 18 14 18 22 C18 29 24 38 24 38" />
    <path d="M24 10 C24 10 30 14 30 22 C30 29 24 38 24 38" />
    <path d="M24 38 L24 44" />
    <path d="M20 42 Q24 44 28 42" />
    <circle cx="24" cy="22" r="3.5" fill="currentColor" />
  </svg>
);

const IconBook = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 38 V10 C6 10 14 8 24 10 C34 8 42 10 42 10 V38 C42 38 34 36 24 38 C14 36 6 38 6 38Z"
      fill="currentColor" fillOpacity="0.1" />
    <line x1="24" y1="10" x2="24" y2="38" />
    <path d="M6 10 V38" />
    <path d="M42 10 V38" />
    <path d="M9 16 C13 17 18 17.5 24 17.5" />
    <path d="M39 16 C35 17 30 17.5 24 17.5" />
    <path d="M9 22 C13 23 18 23.5 24 23.5" />
    <path d="M39 22 C35 23 30 23.5 24 23.5" />
    <path d="M9 28 C13 29 18 29.5 24 29.5" />
    <path d="M39 28 C35 29 30 29.5 24 29.5" />
  </svg>
);

const IconHands = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M24 7 C24 7 18 14 16 22 C14 30 16 40 24 40 C32 40 34 30 32 22 C30 14 24 7 24 7Z"
      fill="currentColor" fillOpacity="0.12" />
    <path d="M24 7 C24 7 18 14 16 22 C14 30 16 40 24 40 C32 40 34 30 32 22 C30 14 24 7 24 7Z" />
    <path d="M18 18 C14 15 8 17 7 23 C6 28 9 33 15 35" />
    <path d="M30 18 C34 15 40 17 41 23 C42 28 39 33 33 35" />
    <line x1="24" y1="7" x2="24" y2="40" strokeWidth="1" strokeOpacity="0.4" />
  </svg>
);

const IconCommunity = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="24" cy="13" r="5.5" />
    <path d="M13 40 C13 33 18 28 24 28 C30 28 35 33 35 40" />
    <circle cx="9" cy="16" r="4" />
    <path d="M2 38 C2 33 5 29 9 29 C11.5 29 13.8 30.2 15.5 32" />
    <circle cx="39" cy="16" r="4" />
    <path d="M46 38 C46 33 43 29 39 29 C36.5 29 34.2 30.2 32.5 32" />
  </svg>
);

const IconFlame = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M24 6 C24 6 14 17 14 28 C14 34.6 18.5 40 24 40 C29.5 40 34 34.6 34 28 C34 17 24 6 24 6Z"
      fill="currentColor" fillOpacity="0.12" />
    <path d="M24 6 C24 6 14 17 14 28 C14 34.6 18.5 40 24 40 C29.5 40 34 34.6 34 28 C34 17 24 6 24 6Z" />
    <path d="M24 16 C24 16 19 22 19 28 C19 30.8 21.2 33 24 33 C26.8 33 29 30.8 29 28 C29 22 24 16 24 16Z"
      fill="currentColor" fillOpacity="0.3" />
    <line x1="24" y1="40" x2="24" y2="44" />
    <path d="M19 43 Q24 45.5 29 43" />
  </svg>
);

const IconStar = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M24 6 L27.5 16.5 H38.5 L30 23.5 L33.5 34 L24 27.5 L14.5 34 L18 23.5 L9.5 16.5 H20.5 Z"
      fill="currentColor" fillOpacity="0.15" />
    <path d="M24 6 L27.5 16.5 H38.5 L30 23.5 L33.5 34 L24 27.5 L14.5 34 L18 23.5 L9.5 16.5 H20.5 Z" />
    <circle cx="24" cy="22" r="3.5" fill="currentColor" />
  </svg>
);

/* Large hero mandala — purely decorative, no image */
const HeroMandala = () => (
  <svg viewBox="0 0 200 200" fill="none" aria-hidden="true"
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] opacity-15 pointer-events-none">
    {/* Outer ring */}
    <circle cx="100" cy="100" r="95" stroke="#cca75b" strokeWidth="0.8" strokeOpacity="0.4" />
    <circle cx="100" cy="100" r="80" stroke="#cca75b" strokeWidth="0.6" strokeOpacity="0.3" />
    {/* Petal ring outer */}
    {[0,45,90,135,180,225,270,315].map((deg, i) => (
      <ellipse key={i} cx="100" cy="100" rx="14" ry="34"
        stroke="#cca75b" strokeWidth="1" strokeOpacity="0.55" fill="#cca75b" fillOpacity="0.06"
        transform={`rotate(${deg} 100 100) translate(0 -48)`} />
    ))}
    {/* Petal ring inner */}
    {[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5].map((deg, i) => (
      <ellipse key={i} cx="100" cy="100" rx="9" ry="22"
        stroke="#cca75b" strokeWidth="1" strokeOpacity="0.35" fill="#cca75b" fillOpacity="0.04"
        transform={`rotate(${deg} 100 100) translate(0 -44)`} />
    ))}
    {/* Mid ring */}
    <circle cx="100" cy="100" r="46" stroke="#cca75b" strokeWidth="0.8" strokeOpacity="0.3" />
    {/* Temple silhouette */}
    <circle cx="100" cy="90" r="4" fill="#cca75b" fillOpacity="0.9" />
    <path d="M96 94 L100 86 L104 94 Z" fill="#cca75b" fillOpacity="0.8" />
    <rect x="94" y="94" width="12" height="3" fill="#cca75b" fillOpacity="0.7" />
    <path d="M90 97 L94 97 L94 100 L106 100 L106 97 L110 97 L110 100.5 L90 100.5 Z"
      fill="#cca75b" fillOpacity="0.65" />
    <rect x="88" y="100.5" width="24" height="14" rx="1" fill="#cca75b" fillOpacity="0.55" />
    <rect x="95.5" y="107" width="9" height="7.5" rx="4.5" fill="#072149" fillOpacity="0.5" />
    <rect x="89" y="103" width="6.5" height="7" rx="1" fill="#072149" fillOpacity="0.4" />
    <rect x="104.5" y="103" width="6.5" height="7" rx="1" fill="#072149" fillOpacity="0.4" />
    <line x1="84" y1="114.5" x2="116" y2="114.5" stroke="#cca75b" strokeWidth="1.5" strokeOpacity="0.7" />
    {/* Inner circle */}
    <circle cx="100" cy="100" r="20" stroke="#cca75b" strokeWidth="0.8" strokeOpacity="0.4" />
    <circle cx="100" cy="100" r="5" fill="#cca75b" fillOpacity="0.6" />
    {/* Tick marks */}
    {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => (
      <line key={i}
        x1={100 + 48 * Math.cos((deg - 90) * Math.PI / 180)}
        y1={100 + 48 * Math.sin((deg - 90) * Math.PI / 180)}
        x2={100 + 52 * Math.cos((deg - 90) * Math.PI / 180)}
        y2={100 + 52 * Math.sin((deg - 90) * Math.PI / 180)}
        stroke="#cca75b" strokeWidth="1" strokeOpacity="0.4" />
    ))}
  </svg>
);

/* =========================================================
   DATA
   ========================================================= */

const leaders = [
  {
    id: 1,
    name: "Madhu Pandit Dasa",
    title: "Chairman",
    image: "/SriMadhuPanditDasa-1-2.jpg",
    bio: [
      "Madhu Pandit Dasa was born in 1956 in Nagercoil, India. A National Science Talent Search scholar, he completed his B.Tech. in Civil Engineering from IIT-Mumbai in 1980, where he first encountered the books of Srila Prabhupada. By 1981, he dedicated himself fully to ISKCON's mission.",
      "Under his inspired leadership, the Government of Karnataka allotted 6.5 acres on Hare Krishna Hill for a grand cultural complex. He led its entire architectural design, construction, and fundraising of Rs. 38 crores, building a team of nearly 100 dedicated missionaries.",
      "In June 2000 he initiated the Akshaya Patra programme — the world's largest NGO-run mid-day meal programme. He now guides the mission of Hare Krishna Dehradun as Chairman."
    ]
  },
  {
    id: 2,
    name: "Chanchalapathi Dasa",
    title: "President",
    image: "/chanchalapathi-dasa.jpg",
    bio: [
      "Chanchalapathi Dasa was born in 1963 in Bangalore. While at PSG College of Technology, Coimbatore, he encountered the message of Srila Prabhupada. He later joined the Indian Institute of Science for a Masters in Electrical Communication Engineering.",
      "In 1984 he became a full-time member of ISKCON Bangalore and rose to Vice President. As Vice Chairman of The Akshaya Patra Foundation, he oversees nationwide activities impacting millions of school children.",
      "He played a key role in the 'Little Krishna' animated series. He now leads Hare Krishna Dehradun as Temple President, spreading Krishna consciousness throughout Uttarakhand."
    ]
  },
  {
    id: 3,
    name: "Yudishtira Krishna Dasa",
    title: "Vice President",
    image: "/images.jpg",
    bio: [
      "A meritorious student, Yudishtira Krishna Dasa joined M.S. Ramaiah Medical College, Bangalore. During his first year, he encountered Krishna Consciousness and dedicated his life to Srila Prabhupada's mission in 1997.",
      "He served as Head of Operations of The Akshaya Patra Foundation in Hubli (2004–2008), overseeing the world's largest kitchen at over 200,000 meals per day. He later built Akshaya Patra infrastructure in Bellary for 150,000 children daily.",
      "He now leads resource mobilisation and community outreach for Hare Krishna Dehradun, bringing his operational expertise to the mission of Krishna consciousness in Uttarakhand."
    ]
  }
];

const values = [
  { Icon: IconLotus,    title: 'Devotion First',       desc: 'Every decision flows from love for Lord Sri Krishna and the direct instructions of Srila Prabhupada.' },
  { Icon: IconBook,     title: 'Scriptural Guidance',  desc: 'Governance follows the Bhagavad Gita and Srimad Bhagavatam — the eternal compass for all action.' },
  { Icon: IconHands,    title: 'Transparent Service',  desc: 'All resources are managed with full accountability and dedicated to the welfare of every living being.' },
  { Icon: IconCommunity,title: 'Community at Heart',   desc: 'The temple exists to serve the congregation, the city of Dehradun, and all of Uttarakhand.' },
  { Icon: IconFlame,    title: 'Missionary Zeal',      desc: 'Our leaders work tirelessly, inspired by Srila Prabhupada\'s example of selfless dedication.' },
  { Icon: IconStar,     title: 'Excellence in All',    desc: 'We hold the highest standards in worship, outreach, education, and community service.' },
];

/* =========================================================
   UTILITY COMPONENTS
   ========================================================= */

function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-72px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* =========================================================
   PAGE
   ========================================================= */

export default function GovernancePage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-gray-900 font-sans overflow-x-hidden" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='800' height='400' viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23cca75b' stroke-width='2' opacity='0.2'%3E%3Cg transform='translate(100, 50) scale(1.5)'%3E%3Cpath d='M20 5C20 5 10 15 20 35C30 15 20 5 20 5Z'/%3E%3Cpath d='M20 35C10 30 5 20 10 12C15 12 18 25 20 35Z'/%3E%3Cpath d='M20 35C30 30 35 20 30 12C25 12 22 25 20 35Z'/%3E%3C/g%3E%3Cg transform='translate(300, 50) scale(1.5)'%3E%3Ccircle cx='20' cy='10' r='4'/%3E%3Cpath d='M20 15 L20 25 M10 20 L30 20 M10 35 C10 35 15 25 20 25 C25 25 30 35 30 35 M10 35 L30 35'/%3E%3C/g%3E%3Cg transform='translate(500, 50) scale(1.5)'%3E%3Ccircle cx='20' cy='20' r='10' stroke-dasharray='2 2'/%3E%3Cpath d='M20 10 C25 10 30 15 30 20 C30 25 25 30 20 30 C15 30 10 25 10 20 C10 17 12 15 15 15 C17 15 18 17 18 18 C18 19 17 20 16 20'/%3E%3Cpath d='M20 0L20 5 M20 35L20 40 M0 20L5 20 M35 20L40 20 M5 5L10 10 M30 30L35 35 M5 35L10 30 M30 10L35 5'/%3E%3C/g%3E%3Cg transform='translate(700, 50) scale(1.5)'%3E%3Cpath d='M12 25 L12 10 A3 3 0 0 1 18 10 L18 20 M18 15 L18 5 A3 3 0 0 1 24 5 L24 20 M24 15 L24 8 A3 3 0 0 1 30 8 L30 25 C30 35 20 40 12 35 C8 32 5 28 5 25 L5 15 A3 3 0 0 1 11 15 L11 25'/%3E%3Cpath d='M15 25 C18 25 20 27 20 30 C20 32 18 34 16 34 C14 34 12 32 12 30 C12 29 13 28 14 28'/%3E%3C/g%3E%3Cg transform='translate(200, 200) scale(1.5)'%3E%3Ccircle cx='20' cy='6' r='4'/%3E%3Cpath d='M12 16 Q20 13 28 16 L33 28 Q28 25 20 25 Q12 25 7 28 Z'/%3E%3Cpath d='M20 18 L20 24'/%3E%3Cpath d='M5 32 Q20 27 35 32 Q30 38 20 38 Q10 38 5 32 Z'/%3E%3C/g%3E%3Cg transform='translate(400, 200) scale(1.5)'%3E%3Cpath d='M22 5 A 15 15 0 1 0 22 35 A 12 12 0 1 1 22 5 Z'/%3E%3Cpath d='M8 20 L12 20 M10 18 L10 22'/%3E%3C/g%3E%3Cg transform='translate(600, 200) scale(1.5)'%3E%3Cpath d='M20 5 C28 5 30 15 20 18 C18 12 22 10 20 5'/%3E%3Cpath d='M10 25 C5 18 10 10 16 16 C12 18 10 15 10 25'/%3E%3Cpath d='M30 25 C35 18 30 10 24 16 C28 18 30 15 30 25'/%3E%3Cpath d='M10 25 Q20 35 30 25'/%3E%3Ccircle cx='20' cy='22' r='2'/%3E%3C/g%3E%3C/g%3E%3Ctext x='400' y='140' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Krishna Hare Krishna, Krishna Krishna Hare Hare%3C/text%3E%3Ctext x='400' y='165' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Rama Hare Rama, Rama Rama Hare Hare%3C/text%3E%3Ctext x='400' y='340' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Krishna Hare Krishna, Krishna Krishna Hare Hare%3C/text%3E%3Ctext x='400' y='365' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Rama Hare Rama, Rama Rama Hare Hare%3C/text%3E%3C/svg%3E\")", backgroundRepeat: 'repeat', backgroundSize: '600px 300px' }}>

      {/* ── PAGE HEADER ───────────────────────────────────────────── */}
      <div className="pt-32 pb-8 px-5 text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#072149] tracking-tighter uppercase">
          GOVERNANCE
        </h1>
        <div className="mt-6 flex justify-center">
          <div className="h-1 w-24 bg-amber-400" />
        </div>
      </div>

      {/* ── MAIN CONTENT ───────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-28">

        {/* Mission statement */}
        <Reveal className="max-w-2xl mx-auto text-center pt-20 pb-4">
          <div className="w-10 h-10 mx-auto mb-6 text-[#072149]">
            <IconTemple />
          </div>
          <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-[#990000] mb-4">
            Our Governing Mandate
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-5">
            Hare Krishna Dehradun is governed in accordance with the instructions of
            Srila Prabhupada, Founder-Acharya of ISKCON. Every member of the Executive
            Council serves with missionary zeal and professional expertise.
          </p>
          <blockquote className="border-l-4 border-amber-400 pl-5 text-left">
            <p className="text-gray-700 leading-relaxed italic">
              &ldquo;To broadcast the glories of Lord Sri Krishna and bring the nectar of
              Krishna consciousness to every home in Dehradun, Uttarakhand, and beyond
              &mdash; as taught by Srila Prabhupada.&rdquo;
            </p>
            <footer className="mt-2 text-xs font-semibold uppercase tracking-widest text-[#990000]">
              Our Vision
            </footer>
          </blockquote>
        </Reveal>

        {/* Thin rule */}
        <Reveal className="pt-16 pb-16">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <div className="flex-1 h-px bg-gray-200" />
          </div>
        </Reveal>

        {/* Governing Values */}
        <div className="pb-4">
          <Reveal className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#990000] mb-2 text-center">
              Principles
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#072149] text-center uppercase tracking-tight">
              How We Are Guided
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map(({ Icon, title, desc }, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="group bg-white border border-gray-100 rounded-2xl p-8
                    shadow-[0_2px_12px_rgba(7,33,73,0.06)] hover:shadow-[0_8px_28px_rgba(7,33,73,0.11)]
                    transition-shadow duration-300">
                  <div className="w-12 h-12 text-[#072149] mb-5 group-hover:text-[#990000] transition-colors duration-300">
                    <Icon />
                  </div>
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#072149] mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Section divider */}
        <Reveal className="py-20">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <div className="flex-1 h-px bg-gray-200" />
          </div>
        </Reveal>

        {/* Executive Council */}
        <div>
          <Reveal className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#990000] mb-2 text-center">
              Leadership
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#072149] text-center uppercase tracking-tight">
              Executive Council
            </h2>
          </Reveal>

          <style dangerouslySetInnerHTML={{ __html: `
            .leader-card {
              position: relative;
              border-radius: 18px;
              width: 340px;
              height: 460px;
              background: #fff;
              box-shadow: 0 2px 16px rgba(7,33,73,0.10);
              transform-style: preserve-3d;
              perspective: 2000px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .leader-cover {
              top: 0; left: 0;
              position: absolute;
              width: 100%; height: 100%;
              border-radius: 18px;
              cursor: pointer;
              transition: transform 0.6s cubic-bezier(0.4,0,0.2,1),
                          box-shadow 0.4s ease;
              transform-origin: left center;
              box-shadow: 0 2px 16px rgba(7,33,73,0.12);
              overflow: hidden;
              z-index: 10;
            }
            .leader-card:hover .leader-cover {
              transform: rotateY(-78deg);
              box-shadow: 12px 12px 24px rgba(7,33,73,0.09);
            }
          `}} />

          <div className="flex flex-wrap justify-center gap-8 py-8">
            {leaders.map((leader, idx) => (
              <motion.div
                layoutId={`leader-${leader.id}`}
                key={leader.id}
                onClick={() => setSelectedId(leader.id)}
                className="leader-card group cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}>

                {/* Inner page (visible on hover) */}
                <div className="p-6 text-center h-full flex flex-col justify-center items-center
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100 gap-3">
                  <div className="w-10 h-10 text-[#072149] mb-1">
                    <IconLotus />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-widest text-[#990000]">
                    {leader.title}
                  </p>
                  <h4 className="font-extrabold text-[#072149] text-2xl leading-tight">{leader.name}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-4">{leader.bio[0]}</p>
                  <div className="mt-2 text-xs font-bold uppercase tracking-widest text-amber-500">
                    Click to read bio
                  </div>
                </div>

                {/* Cover */}
                <div className="leader-cover">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06183a]/90 via-[#06183a]/15 to-transparent" />

                  {/* Nameplate */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="w-8 h-[2px] bg-amber-400 mb-3" />
                    <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-amber-400 mb-1">
                      {leader.title}
                    </p>
                    <h3 className="text-2xl font-extrabold text-white leading-tight">
                      {leader.name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Prabhupada Quote */}
        <Reveal className="py-4">
          <div className="bg-[#072149] rounded-2xl px-8 md:px-14 py-12 relative overflow-hidden">
            <div className="absolute top-6 left-8 text-white/10 text-9xl font-serif leading-none select-none">
              &ldquo;
            </div>
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <div className="w-9 h-9 text-amber-400 mx-auto mb-6">
                <IconLotus />
              </div>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed italic mb-6">
                Our mission is to serve, to spread the glories of Krishna, and to give every
                soul the opportunity to return back to Godhead &mdash; back home.
              </p>
              <div className="w-8 h-px bg-amber-400 mx-auto mb-4" />
              <p className="text-amber-400/80 text-xs uppercase tracking-[0.25em] font-bold">
                Srila Prabhupada &bull; Founder-Acharya, ISKCON
              </p>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal className="pt-20">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#990000] mb-3">
              Join the Mission
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#072149] uppercase tracking-tight mb-4">
              Serve With Us
            </h2>
            <p className="text-gray-500 text-base leading-relaxed max-w-md mx-auto mb-8">
              Whether as a devotee, volunteer, or donor &mdash; your service helps us bring
              Krishna&apos;s grace to every corner of Uttarakhand.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.a
                href="/aspirations"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-[#072149] text-white font-bold uppercase
                  tracking-widest px-8 py-3.5 rounded-full text-xs shadow-md
                  hover:bg-[#0a2d60] transition-colors duration-200">
                Our Aspirations
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>
              <motion.a
                href="/"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 border border-[#072149]/30 text-[#072149] font-bold
                  uppercase tracking-widest px-8 py-3.5 rounded-full text-xs
                  hover:border-[#072149] transition-colors duration-200">
                Visit Temple
              </motion.a>
            </div>
          </div>
        </Reveal>

      </div>

      {/* ── LEADER MODAL ───────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/55 backdrop-blur-[3px] cursor-pointer" />

            {leaders.map(leader => leader.id === selectedId && (
              <motion.div
                layoutId={`leader-${leader.id}`}
                key={leader.id}
                className="relative bg-white w-full max-w-2xl max-h-[88vh] overflow-y-auto
                  rounded-2xl shadow-2xl z-10">

                {/* Header bar */}
                <div className="relative h-48 sm:h-56 overflow-hidden rounded-t-2xl">
                  <Image src={leader.image} alt={leader.name} fill className="object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06183a]/80 to-transparent" />
                  <div className="absolute bottom-5 left-6 right-14">
                    <div className="w-6 h-px bg-amber-400 mb-1.5" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 mb-0.5">
                      {leader.title}
                    </p>
                    <h3 className="text-xl font-extrabold text-white">{leader.name}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="absolute top-4 right-4 bg-white/15 hover:bg-white/30 backdrop-blur-sm
                      rounded-full p-2 transition-colors">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2">
                      <path d="M4 12L12 4M4 4l8 8" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                {/* Bio */}
                <div className="p-7 space-y-4">
                  {leader.bio.map((para, i) => (
                    <p key={i} className="text-gray-600 text-sm leading-relaxed">{para}</p>
                  ))}
                  <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                    <div className="w-5 h-5 text-[#072149]"><IconLotus /></div>
                    <p className="text-xs text-gray-400">
                      Servant of Lord Sri Krishna &bull; Hare Krishna Dehradun
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
