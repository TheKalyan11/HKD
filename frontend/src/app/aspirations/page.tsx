"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

function FloatingParticles() {
  const items = [
    { id: 0, size: 5, x: 10, y: 20, dur: 7, delay: 0 },
    { id: 1, size: 8, x: 25, y: 60, dur: 9, delay: 1 },
    { id: 2, size: 4, x: 45, y: 15, dur: 6, delay: 2 },
    { id: 3, size: 7, x: 70, y: 40, dur: 11, delay: 0.5 },
    { id: 4, size: 5, x: 85, y: 75, dur: 8, delay: 1.5 },
    { id: 5, size: 9, x: 55, y: 85, dur: 10, delay: 3 },
    { id: 6, size: 4, x: 90, y: 10, dur: 7, delay: 2.5 },
    { id: 7, size: 6, x: 30, y: 90, dur: 9, delay: 0.8 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-amber-400/20"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <div className="text-7xl mb-4 leading-none">{icon}</div>
      <h2 className="text-2xl md:text-3xl font-extrabold text-[#072149] uppercase tracking-wide leading-tight">
        {children}
      </h2>
      <div className="flex items-center gap-3 mt-4">
        <div className="h-1 w-16 bg-[#990000] rounded-full" />
        <div className="h-1 w-6 bg-amber-400 rounded-full" />
        <div className="h-1 w-3 bg-[#072149]/30 rounded-full" />
      </div>
    </div>
  );
}

function ExpandCard({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      onClick={() => setOpen(!open)}
      className="cursor-pointer rounded-2xl border border-amber-200/60 bg-white/70 backdrop-blur-sm shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-center gap-5 p-6">
        <span className="text-5xl leading-none shrink-0">{icon}</span>
        <h3 className="text-xl font-semibold text-[#072149] flex-1">{title}</h3>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[#990000] text-2xl font-bold select-none"
        >
          &#9662;
        </motion.span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-gray-700 leading-relaxed border-t border-amber-100 pt-4 text-base">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function InitiativeCard({ icon, title, text, delay }: { icon: string; title: string; text: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: 8 }}
      className="flex items-start gap-6 p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-amber-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-default"
    >
      <div className="text-6xl leading-none shrink-0 mt-1">{icon}</div>
      <div>
        <h4 className="font-bold text-[#072149] text-lg mb-1">{title}</h4>
        <p className="text-gray-700 leading-relaxed">{text}</p>
      </div>
    </motion.div>
  );
}

function StatCounter({ icon, value, label }: { icon: string; value: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
      className="text-center"
    >
      <div className="text-5xl mb-2 leading-none">{icon}</div>
      <div className="text-3xl md:text-4xl font-extrabold text-amber-400 mb-1">{value}</div>
      <div className="text-xs text-white/60 uppercase tracking-widest">{label}</div>
    </motion.div>
  );
}

export default function AspirationsPage() {
  const heroRef = useRef(null);
  const scrollData = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollData.scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollData.scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-[#FFFBF2] text-gray-800 font-sans overflow-hidden">

      {/* HERO */}
      <section ref={heroRef} className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image
            src="/deity-1.jpg"
            alt="Hare Krishna Dehradun Temple"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#072149]/85 via-[#072149]/55 to-[#FFFBF2]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#990000]/20 via-transparent to-amber-900/20" />
        </motion.div>

        <FloatingParticles />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-4 max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-8xl mb-6 leading-none"
          >
            🪷
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="text-amber-400 text-xs md:text-sm uppercase tracking-[0.3em] mb-4 font-semibold"
          >
            Hare Krishna Dehradun
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-extrabold text-white uppercase tracking-tight leading-none mb-6"
          >
            Aspir<span className="text-amber-400">ations</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white/80 text-lg md:text-xl max-w-xl mx-auto leading-relaxed"
          >
            Spreading the divine message of Lord Sri Krishna in the sacred foothills of the Himalayas &mdash; Dehradun.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-32 h-1 bg-gradient-to-r from-amber-400 to-[#990000] mx-auto mt-8 rounded-full"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-white/50 text-xs uppercase tracking-widest">Scroll</span>
            <motion.div
               animate={{ y: [0, 8, 0] }}
               transition={{ duration: 1.5, repeat: Infinity }}
               className="w-5 h-8 border-2 border-white/30 rounded-full flex items-start justify-center pt-1"
             >
               <div className="w-1 h-2 bg-amber-400 rounded-full" />
             </motion.div>
           </motion.div>
         </motion.div>
       </section>

      {/* MAIN CONTENT */}
      <div className="relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 space-y-28">

          {/* Section 1: Core Mission */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <SectionHeading icon="🕉️">Aspirations of Hare Krishna Dehradun</SectionHeading>
              <div className="space-y-5 text-gray-700 leading-relaxed text-[17px]">
                <p>
                  Hare Krishna Dehradun is a centre of the International Society for Krishna Consciousness (ISKCON),
                  rooted in the sacred foothills of the Himalayas. Our mission is to share the timeless teachings
                  of Lord Sri Krishna &mdash; as revealed in the Bhagavad Gita and Srimad Bhagavatam &mdash; with
                  every soul in Dehradun and beyond.
                </p>
                <p>
                  Inspired by the vision of Srila Prabhupada, we aspire to build a beacon of spiritual culture in
                  Uttarakhand &mdash; a world-class temple and cultural complex where devotees, seekers, and
                  visitors can experience the transforming grace of Krishna consciousness.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-amber-400/20 via-[#990000]/10 to-[#072149]/20 rounded-3xl blur-2xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-amber-200/40">
                  <Image
                    src="/logo-dehradun.jpg"
                    alt="Hare Krishna Dehradun"
                    width={600}
                    height={500}
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#072149]/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white/90 text-sm font-semibold uppercase tracking-wider">
                      Hare Krishna Dehradun
                    </p>
                    <p className="text-amber-300 text-xs mt-1">Dehradun, Uttarakhand</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Stats */}
          <Reveal>
            <div className="bg-gradient-to-r from-[#072149] via-[#0a2d5c] to-[#072149] rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#990000] rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
              </div>
              <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8">
                <StatCounter icon="🛕" value="1966" label="ISKCON Founded" />
                <StatCounter icon="🌏" value="800+" label="Centres Worldwide" />
                <StatCounter icon="📖" value="50+ Yrs" label="In India" />
                <StatCounter icon="🙏" value="Millions" label="Lives Touched" />
              </div>
            </div>
          </Reveal>

          {/* Section 2: Temple Vision */}
          <Reveal>
            <div className="relative bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-3xl p-8 md:p-12 shadow-lg border border-amber-100 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
              <SectionHeading icon="🏛️">Our Temple Vision</SectionHeading>
              <p className="text-gray-700 leading-relaxed text-[17px] max-w-3xl">
                Dehradun, nestled at the foot of the majestic Himalayas, is a city of immense spiritual significance.
                We envision a grand Krishna temple that stands as a monument to devotion and culture &mdash; a place
                where the air resonates with the holy names and the hearts of visitors are uplifted.
              </p>
              <p className="text-gray-700 leading-relaxed text-[17px] max-w-3xl mt-4">
                This sacred complex will blend traditional Vedic architecture with the natural beauty of Uttarakhand,
                serving as a cultural hub for the entire Himalayan region &mdash; attracting pilgrims, seekers, and
                leaders from across the world.
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: '🕌', title: 'Grand Temple', desc: 'A majestic Krishna temple rooted in Vedic architecture' },
                  { icon: '🌄', title: 'Himalayan Beacon', desc: 'A spiritual landmark for all of Uttarakhand' },
                  { icon: '📿', title: 'Cultural Centre', desc: 'Spreading Bhagavad Gita wisdom in modern context' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(7,33,73,0.12)' }}
                    className="bg-white rounded-xl p-6 border border-amber-100 shadow-sm transition-all duration-300 text-center"
                  >
                    <div className="text-6xl mb-4 leading-none">{item.icon}</div>
                    <h4 className="font-bold text-[#072149] mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Section 3: Transformative Aspirations */}
          <div>
            <Reveal>
              <SectionHeading icon="🌱">Transformative Aspirations</SectionHeading>
              <p className="text-gray-700 leading-relaxed text-[17px] mb-10 max-w-3xl">
                In a rapidly changing world, the timeless wisdom of the Bhagavad Gita offers the most relevant
                answers for modern challenges. Hare Krishna Dehradun aspires to be a transformative force &mdash;
                shaping lives, character, and communities through Krishna consciousness.
              </p>
            </Reveal>

            <div className="space-y-4">
              {[
                {
                  icon: '📖',
                  title: 'Spreading Vedic Knowledge',
                  content: 'We aspire to make the teachings of the Bhagavad Gita and Srimad Bhagavatam accessible to every household in Dehradun and Uttarakhand — through classes, seminars, festivals, and outreach programs that speak to the modern generation in a relevant and engaging way.',
                },
                {
                  icon: '🪔',
                  title: 'Cultivating Devotion',
                  content: 'Our aspiration is to establish a vibrant devotional community in Dehradun — where daily worship, kirtan, and festivals become a living tradition. The practice of bhakti yoga transforms individuals from within, fostering peace, compassion, and purposeful living.',
                },
                {
                  icon: '🎓',
                  title: 'Inspiring the Youth',
                  content: "We wish to channel the energy and enthusiasm of Dehradun's youth toward a life of meaning and service. Through gurukul programs, youth camps, and mentorship, we aim to raise a generation grounded in Vedic values and inspired by the example of great devotees.",
                },
                {
                  icon: '🤝',
                  title: 'Building a Spiritual Community',
                  content: "Hare Krishna Dehradun aspires to be more than a temple — it will be a community of like-minded souls dedicated to Krishna's service. Together, we will serve the city, uplift the needy, and create an atmosphere of love and cooperation guided by spiritual principles.",
                },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <ExpandCard icon={item.icon} title={item.title}>
                    {item.content}
                  </ExpandCard>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Hare Krishna Mahamantra */}
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/30 via-[#990000]/20 to-amber-400/30 rounded-3xl blur-xl" />
              <div className="relative bg-gradient-to-br from-[#072149] to-[#0d3578] rounded-3xl p-8 md:p-14 text-center overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-amber-400 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-amber-300 rounded-full" />
                </div>

                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
                  className="text-8xl mb-6 leading-none"
                >
                  🎶
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="text-amber-300 text-2xl md:text-3xl font-semibold leading-relaxed mb-6"
                >
                  Hare Krishna Hare Krishna
                  <br />
                  Krishna Krishna Hare Hare
                  <br />
                  Hare Rama Hare Rama
                  <br />
                  Rama Rama Hare Hare
                </motion.p>

                <div className="w-16 h-0.5 bg-amber-400/50 mx-auto mb-6" />

                <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                  The Maha Mantra &mdash; the great chant for deliverance. Simply by chanting these holy
                  names, one can purify the heart and awaken love of God in this age of Kali.
                </p>

                <p className="text-amber-400/70 text-sm mt-6 uppercase tracking-widest">
                  &mdash; Srila Prabhupada, Founder-Acharya of ISKCON
                </p>
              </div>
            </div>
          </Reveal>

          {/* Section 4: Community Service */}
          <div>
            <Reveal>
              <SectionHeading icon="🍱">Community Service</SectionHeading>
              <p className="text-gray-700 leading-relaxed text-[17px] mb-8 max-w-3xl">
                True spirituality expresses itself in compassionate action. Hare Krishna Dehradun is committed to
                serving the community of Uttarakhand through a range of social and welfare programs:
              </p>
            </Reveal>

            <div className="space-y-4">
              <InitiativeCard
                icon="🍽️"
                title="Food for Life"
                text="Free prasadam distribution to the underprivileged, students, and labourers of Dehradun — honouring the principle that no one within 10 miles of a Hare Krishna temple should go hungry."
                delay={0}
              />
              <InitiativeCard
                icon="📚"
                title="Bhagavad Gita Outreach"
                text="Distribution of Bhagavad Gita As It Is to schools, colleges, hospitals, and homes across Uttarakhand — planting the seeds of wisdom in every household."
                delay={0.1}
              />
              <InitiativeCard
                icon="🌿"
                title="Cow Protection (Goshala)"
                text="A dedicated goshala to protect and care for cows — honouring the Vedic tradition of cow protection and demonstrating the spirit of ahimsa (non-violence) to the world."
                delay={0.2}
              />
              <InitiativeCard
                icon="🧘"
                title="Yoga & Wellness Programs"
                text="Regular bhakti-yoga workshops, meditation sessions, and wellness retreats in Dehradun — offering the residents of this Himalayan city a path to inner peace and holistic well-being."
                delay={0.3}
              />
              <InitiativeCard
                icon="👨‍👩‍👧"
                title="Family & Youth Programs"
                text="Gurukul Sunday school, youth leadership programs, and family retreats that ground Dehradun's next generation in Vedic values, strong character, and devotional service."
                delay={0.4}
              />
            </div>
          </div>

          {/* Call to Action */}
          <Reveal>
            <div className="relative text-center rounded-3xl overflow-hidden">
              <div className="absolute inset-0 z-0">
                <Image src="/krishna-cow-music.jpg" alt="Krishna" fill className="object-cover object-center" />
                <div className="absolute inset-0 bg-[#072149]/85" />
              </div>
              <div className="relative z-10 py-16 px-6">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                  className="text-8xl mb-6 leading-none"
                >
                  🙌
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-amber-400 text-sm uppercase tracking-[0.3em] mb-4"
                >
                  Join the Movement
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl md:text-4xl font-extrabold text-white mb-4 uppercase"
                >
                  Be Part of Hare Krishna Dehradun
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-white/70 text-lg mb-8 max-w-lg mx-auto"
                >
                  Support our mission to build a temple, serve the community, and spread Krishna consciousness
                  throughout Uttarakhand &mdash; one heart at a time.
                </motion.p>
                <motion.a
                  href="/governance"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,153,51,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-block bg-gradient-to-r from-amber-500 to-[#990000] text-white font-bold uppercase tracking-widest px-10 py-4 rounded-full text-sm shadow-lg transition-all duration-300"
                >
                  Contribute Now
                </motion.a>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </div>
  );
}
