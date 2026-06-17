"use client";

import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BlogPage() {
  const [selectedBlog, setSelectedBlog] = useState<any>(null);

  const blogs = [
    {
      id: 1,
      titleLines: ["AMALAKI", "EKADASHI"],
      category: "FESTIVAL",
      description: "Amalaki Ekadashi, also known as Amala Ekadashi...",
      fullContent: `# Amalaki Ekadashi\n\nAmalaki Ekadashi, also known as Amala Ekadashi, is observed in the month of Phalguna and is glorified in the Brahmanda Purana. Sage Vasishtha told King Mandhata that observing this Ekadashi destroys sins, grants prosperity, and leads to liberation.\n\nIn the kingdom of Vaidisha, King Chitraratha and his citizens faithfully observed Amalaki Ekadashi by worshipping Lord Vishnu and the sacred Amalaki (Amla) tree. A hunter, who lived by killing animals, unknowingly participated by staying awake all night, hearing the Lord's glories, and fasting.\n\nBy the merit of this observance, the hunter was reborn as the righteous King Vasuratha. Later, when enemies attempted to kill him, Lord Vishnu protected him through a divine manifestation. Realizing the Lord's mercy, he devoted his life to devotional service.\n\nBenefit: Anyone who sincerely observes Amalaki Ekadashi attains Lord Vishnu's blessings, freedom from sins, and ultimately His eternal abode.`,
      image: "/aa.jpg?v=1",
    },
    {
      id: 2,
      titleLines: ["CELEBRATING", "DEEPOTSAV"],
      category: "FESTIVAL",
      description: "Deepotsav, the festival of light, celebrates...",
      fullContent: `# Kartik Deepotsav in Braj – The Divine Festival of Lights\n\n## Introduction\n\nDeepotsav, the festival of light, celebrates Kartik Deepotsav, a sacred celebration observed during the holy month of Kartik (October–November). Throughout Braj, devotees offer ghee lamps to Lord Krishna and Srimati Radharani, filling temples and holy places with a radiant glow. The festival represents devotion, gratitude, and remembrance of the Lord's loving pastimes.\n\n## Why Kartik Is Special\n\nKartik is regarded as the most auspicious month in the Vedic calendar. Scriptures describe it as especially dear to Lord Vishnu, making devotional practices performed during this time exceptionally beneficial.\n\n## The Story of Lord Damodara\n\nThe festival commemorates the pastime in which Mother Yashoda lovingly tied young Krishna to a wooden mortar after catching Him stealing butter. Although Krishna is the Supreme Lord, He allowed Himself to be bound by the affection of His devotee. This pastime teaches that sincere devotion and the Lord’s mercy go hand in hand.\n\n## Nalakuvara and Manigriva\n\nDuring this pastime, Krishna delivered Nalakuvara and Manigriva, the sons of Kuvera, who had been cursed to become twin trees. By Krishna’s touch, they were freed from the curse and attained spiritual liberation.\n\n## Deepdaan During Kartik\n\nOffering ghee lamps and singing the Damodarashtakam prayer are important practices during Kartik. These devotional activities help devotees express their love for the Lord and receive His blessings.\n\n## Celebrations in Braj\n\nTemples throughout Braj shine with thousands of lamps, devotional songs, kirtans, and special worship ceremonies. The entire atmosphere becomes vibrant with spiritual joy and devotion.\n\n## Kartik Deepotsav at HKM Dehradun\n\nHKM Dehradun celebrates the entire month with:\n\n* Daily Deepdaan Seva at 8:00 PM\n* Damodarashtakam Kirtan\n* Nauka Vihar Festival\n* Yamuna Boat Ride Pastimes\n* Shobha Yatra\n* Special Spiritual Programs\n\nJoin us and experience the divine blessings and spiritual joy of Kartik Deepotsav.`,
      image: "/deepostav.png?v=1",
    },
    {
      id: 3,
      titleLines: ["CARRY", "THE LORD"],
      category: "DEVOTION",
      description: "In the journey of spiritual life, one of the most profound...",
      fullContent: `# Vaikuntha Ekadashi – Carrying the Lord in Our Hearts\n\n## Introduction\n\nIn the journey of spiritual life, one of the most profound realizations is what Vaikuntha Ekadashi reminds us of: the importance of keeping Lord Krishna at the center of our lives. When we sincerely remember the Lord and follow His instructions, our thoughts become pure, our words become meaningful, and our actions bring happiness to ourselves and others.\n\n## Lord in the Heart\n\nIn the Srimad Bhagavatam, Lord Brahma tells Narada Muni that his words never become false, his mind never wanders toward undesirable thoughts, and his senses never act improperly because Lord Hari always resides in his heart.\n\nWhen we remember Krishna through chanting, hearing, worship, and devotional service, we naturally develop auspicious thoughts, truthful speech, and righteous actions.\n\n## The Example of Srila Prabhupada\n\nGreat devotees like Srila Prabhupada always carried the Lord in their hearts. Because of their deep devotion, their words inspired others, their actions brought spiritual benefit, and their lives became examples of pure service.\n\nSrila Prabhupada dedicated his life to sharing spiritual knowledge through:\n\n* Bhagavad-gita – the science of God\n* Srimad Bhagavatam – the love of God\n* Chaitanya Charitamrita – the process of deepening love for God\n\nHe encouraged everyone to study these scriptures and apply their teachings in daily life.\n\n## The Power of the Holy Name\n\nAlthough Srila Prabhupada wrote many spiritual books, he often said that their ultimate purpose was to inspire people to chant the holy names of the Lord.\n\nIn this age, the most effective spiritual practice is chanting the Hare Krishna Mahamantra:\n\n**Hare Krishna Hare Krishna Krishna Krishna Hare Hare**\n**Hare Rama Hare Rama Rama Rama Hare Hare**\n\n## Conclusion\n\nVaikuntha Ekadashi teaches us that by keeping Lord Krishna in our hearts with sincerity and enthusiasm, we can transform every situation in life. Through devotion, scripture study, and chanting the holy names, we receive the Lord’s guidance, protection, and blessings.`,
      image: "/carry.jpeg?v=1",
    },
    {
      id: 4,
      titleLines: ["BHAIMI", "EKADASHI"],
      category: "FESTIVAL",
      description: "Bhaimi Ekadashi, also known as Bhima Ekadashi...",
      fullContent: `# Bhaimi (Jaya) Ekadashi – The Ekadashi That Grants Liberation\n\n## Introduction\n\nBhaimi Ekadashi, also known as Bhima Ekadashi or Jaya Ekadashi, falls during the bright fortnight of the month of Magha (January–February). Lord Krishna describes this sacred Ekadashi to Maharaja Yudhishthira as one of the most powerful fasting days, capable of destroying sinful reactions and granting spiritual liberation.\n\n## The Story of Malyavan and Pushpavati\n\nIn the heavenly kingdom of Indra, a celestial musician named Malyavan and an apsara named Pushpavati became deeply attracted to each other. While performing before Indra, they became distracted and failed in their duties.\n\nAngered by their behavior, Indra cursed them to take birth as ghostly beings on Earth. Deprived of their heavenly happiness, they suffered greatly in the cold Himalayan regions.\n\n## The Mercy of Jaya Ekadashi\n\nBy divine arrangement, the day they suffered without food or water happened to be Jaya Ekadashi. They unknowingly observed a complete fast and remained awake throughout the night.\n\nAs Dvadasi arrived, Lord Vishnu's mercy freed them from the curse. They regained their celestial forms and were welcomed back to the heavenly planets.\n\n## Benefits of Observing Bhaimi Ekadashi\n\nLord Krishna explains that observing Jaya Ekadashi:\n\n* Destroys sinful reactions\n* Removes negative influences\n* Grants spiritual purification\n* Frees one from the cycle of birth and death\n* Bestows residence in Lord Vishnu's eternal abode\n\n## Conclusion\n\nBhaimi (Jaya) Ekadashi is a highly auspicious day dedicated to Lord Vishnu. The story of Malyavan and Pushpavati demonstrates the extraordinary mercy available through observing this sacred fast. By sincerely following Jaya Ekadashi, devotees receive divine blessings, spiritual advancement, and the opportunity to attain the Lord's eternal shelter.`,
      image: "/jaya-ekadashi.jpg?v=1",
    },
    {
      id: 5,
      titleLines: ["LORD", "VARAHADEVA"],
      category: "APPEARANCE DAY",
      description: "In the vast pantheon of Hindu deities, Lord Varahadeva...",
      fullContent: `# Lord Varahadeva Appearance Day – Varaha Dwadashi\n\n## Introduction\n\nIn the vast pantheon of Hindu deities, Lord Varahadeva holds a unique place. Varaha Dwadashi commemorates the appearance of Lord Varahadeva, the divine boar incarnation of Lord Vishnu. On this sacred day, devotees remember how the Lord rescued Mother Earth from the depths of the cosmic ocean and restored balance to creation.\n\n## The Demon Hiranyaksha\n\nHiranyaksha and Hiranyakashipu were powerful demon brothers born to Sage Kashyapa. Hiranyaksha became extremely proud and disturbed the universal order. By his actions, Mother Earth was submerged beneath the cosmic waters, creating chaos throughout the universe.\n\n## The Appearance of Lord Varahadeva\n\nAs Lord Brahma contemplated how to save the Earth, a tiny boar appeared from his nostril. Within moments, the boar expanded into a gigantic form, filling the sky with His divine presence. Realizing that He was an incarnation of the Supreme Lord, the demigods offered heartfelt prayers.\n\n## Rescuing Mother Earth\n\nLord Varahadeva entered the cosmic ocean and searched for the Earth. Finding her submerged in the depths, He gently lifted her upon His powerful tusks and raised her back to her proper position.\n\n## The Battle with Hiranyaksha\n\nWhen the demon Hiranyaksha challenged the Lord, a fierce battle followed. Lord Varahadeva effortlessly defeated the demon, protecting the universe and restoring peace. Having rescued the Earth and fulfilled His mission, the Lord returned to His eternal abode.\n\n## Conclusion\n\nThe appearance of Lord Varahadeva reminds us of the Lord’s unlimited compassion and protection. Just as He lifted Mother Earth from the ocean, He can also lift our hearts from ignorance and material suffering. On Varaha Dwadashi, devotees pray for His shelter, guidance, and divine mercy.`,
      image: "/Lord-Varahadeva.jpg?v=1",
    },
    {
      id: 6,
      titleLines: ["APARA", "EKADASHI"],
      category: "FESTIVAL",
      description: "Apara Ekadashi, also known as Pausha Putrada Ekadashi...",
      fullContent: `# Apara Ekadashi – The Ekadashi That Destroys Sins\n\n## Introduction\n\nApara Ekadashi, also known as Pausha Putrada Ekadashi, falls during the Krishna Paksha (waning phase of the moon) in the month of Jyeshtha (May–June). In the Brahmanda Purana, Lord Krishna explains to King Yudhishthira that this sacred Ekadashi has the power to remove sinful reactions and grant immense spiritual merit.\n\n## The Glory of Apara Ekadashi\n\nLord Krishna describes Apara Ekadashi as a highly auspicious day that purifies the heart and frees one from the burden of past mistakes. By observing this Ekadashi with sincerity and devotion, one can progress steadily on the path of spiritual life.\n\nThe Lord explains that even those who have committed serious offenses can receive purification through faithful observance of this sacred fast and by taking shelter of devotional service.\n\n## Benefits of Observing Apara Ekadashi\n\nThe scriptures glorify Apara Ekadashi as bestowing benefits equal to many great pious activities, including:\n\n* Visiting holy pilgrimage places\n* Performing charitable acts\n* Worshipping the Lord with devotion\n* Engaging in spiritual austerities\n\nLord Krishna compares Apara Ekadashi to a blazing fire that burns sinful reactions and a rising sun that removes the darkness of ignorance.\n\n## Worship of Lord Trivikrama\n\nOn this day, devotees especially worship Lord Trivikrama (Vamana Deva), the incarnation who covered the entire universe with His divine steps. Remembering His pastimes and offering prayers to Him brings spiritual blessings and purification.\n\n## How to Observe Apara Ekadashi\n\nDevotees observe Apara Ekadashi by:\n\n* Fasting from grains and beans\n* Chanting the Hare Krishna Mahamantra\n* Reading sacred scriptures such as Bhagavad-gita and Srimad Bhagavatam\n* Worshipping Lord Vishnu and Lord Vamana Deva\n* Engaging in devotional service and prayer\n\nThe true essence of the observance is to increase remembrance of Lord Krishna and cultivate devotion.\n\n## Conclusion\n\nApara Ekadashi is a powerful opportunity for spiritual purification and growth. By observing this sacred day with faith and devotion, one can overcome sinful reactions, receive the mercy of Lord Vishnu, and move closer to attaining eternal spiritual happiness.`,
      image: "/lord-vishnu.jpg?v=1",
    }
  ];

  return (
    <div 
      className="relative min-h-screen pt-4 overflow-hidden bg-[#faf8f5]"
      style={{ backgroundImage: "url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nODAwJyBoZWlnaHQ9JzQwMCcgdmlld0JveD0nMCAwIDgwMCA0MDAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+CjxnIGZpbGw9J25vbmUnIHN0cm9rZT0nI2NjYTc1Yicgc3Ryb2tlLXdpZHRoPScxLjUnIG9wYWNpdHk9JzAuMyc+CjxnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDE2MCwgNjApIHNjYWxlKDEuNSknPgo8cGF0aCBkPSdNMjAgNUMyMCA1IDEwIDE1IDIwIDM1QzMwIDE1IDIwIDUgMjAgNVonLz4KPHBhdGggZD0nTTIwIDM1QzEwIDMwIDUgMjAgMTAgMTJDMTUgMTIgMTggMjUgMjAgMzVaJy8+CjxwYXRoIGQ9J00yMCAzNUMzMCAzMCAzNSAyMCAzMCAxMkMyNSAxMiAyMiAyNSAyMCAzNVonLz4KPC9nPgo8ZyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg1NjAsIDI2MCkgc2NhbGUoMS41KSc+CjxsaW5lIHgxPSc1JyB5MT0nMzUnIHgyPSczNScgeTI9JzUnIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcvPgo8Y2lyY2xlIGN4PScxMicgY3k9JzI4JyByPScxJyBmaWxsPScjY2NhNzViJyBzdHJva2U9J25vbmUnLz4KPGNpcmNsZSBjeD0nMTcnIGN5PScyMycgcj0nMScgZmlsbD0nI2NjYTc1Yicgc3Ryb2tlPSdub25lJy8+CjxjaXJjbGUgY3g9JzIyJyBjeT0nMTgnIHI9JzEnIGZpbGw9JyNjY2E3NWInIHN0cm9rZT0nbm9uZScvPgo8cGF0aCBkPSdNMzUgNSBRIDQwIC01IDQ1IDUgUSA0MCAxNSAzNSA1JyBzdHJva2Utd2lkdGg9JzEnLz4KPGNpcmNsZSBjeD0nNDAnIGN5PSc1JyByPScxLjUnIGZpbGw9JyNjY2E3NWInIHN0cm9rZT0nbm9uZScvPgo8cGF0aCBkPSdNMTAgMzAgUSAxNSAzNSAxMCA0MCBNIDE1IDI1IFEgMjAgMzUgMTUgNDAnIHN0cm9rZS13aWR0aD0nMScvPgo8L2c+CjwvZz4KPHRleHQgeD0nNDAwJyB5PScxODAnIGZvbnQtZmFtaWx5PSdHZW9yZ2lhLCBzZXJpZicgZm9udC1zaXplPScyMCcgZmlsbD0nI2NjYTc1Yicgc3Ryb2tlPSdub25lJyB0ZXh0LWFuY2hvcj0nbWlkZGxlJyBvcGFjaXR5PScwLjMnIGxldHRlci1zcGFjaW5nPScyJyBmb250LXN0eWxlPSdpdGFsaWMnPkhhcmUgS3Jpc2huYSBIYXJlIEtyaXNobmEsIEtyaXNobmEgS3Jpc2huYSBIYXJlIEhhcmU8L3RleHQ+Cjx0ZXh0IHg9JzQwMCcgeT0nMjEwJyBmb250LWZhbWlseT0nR2VvcmdpYSwgc2VyaWYnIGZvbnQtc2l6ZT0nMjAnIGZpbGw9JyNjY2E3NWInIHN0cm9rZT0nbm9uZScgdGV4dC1hbmNob3I9J21pZGRsZScgb3BhY2l0eT0nMC4zJyBsZXR0ZXItc3BhY2luZz0nMicgZm9udC1zdHlsZT0naXRhbGljJz5IYXJlIFJhbWEgSGFyZSBSYW1hLCBSYW1hIFJhbWEgSGFyZSBIYXJlPC90ZXh0Pgo8L3N2Zz4=\")", backgroundRepeat: 'repeat', backgroundSize: '800px 400px' }}
    >

      {/* Header Info */}
      <div className="pt-12 pb-8 px-5 max-w-7xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-medium text-black tracking-tight text-center uppercase">
          Blogs
        </h1>
        <div className="mt-4 flex justify-center">
          <div className="h-1 w-24 bg-[#7a9cf6]" />
        </div>
      </div>

      {/* Grid mimicking the reference image */}
      <div className="w-full px-2 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-w-[1400px] mx-auto">
          {blogs.map((blog, index) => (
            <motion.div 
              layoutId={`blog-${blog.id}`}
              key={blog.id} 
              className="relative flex flex-col justify-between p-8 sm:p-10 min-h-[400px] lg:min-h-[480px] bg-cover bg-center overflow-hidden"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url('${blog.image}')`
              }}
            >
              <div className="mt-2 z-10">
                <h2 className="text-4xl sm:text-5xl md:text-4xl lg:text-4xl xl:text-5xl font-extrabold uppercase leading-tight tracking-wide text-white drop-shadow-lg">
                  {blog.titleLines.map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </h2>
              </div>
              
              <div className="mt-16 z-10 flex flex-col items-start">
                <span className="text-[#ff7a59] font-bold text-[0.85rem] uppercase tracking-[0.15em] block mb-2 drop-shadow-md">
                  {blog.category}
                </span>
                <p className="text-white font-medium text-xl sm:text-2xl leading-[1.3] max-w-sm pr-4 drop-shadow-md mb-6">
                  {blog.description}
                </p>
                <button 
                  onClick={() => setSelectedBlog(blog)}
                  className="mt-auto group inline-flex items-center gap-2 text-white font-bold tracking-wider text-sm uppercase hover:text-[#ff7a59] transition-colors bg-black/40 hover:bg-black/60 px-5 py-2.5 rounded-full backdrop-blur-sm border border-white/20 hover:border-[#ff7a59]/50"
                >
                  Read More
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scrolling Banner */}
      <div className="relative w-full bg-black/80 backdrop-blur-md text-white py-2.5 sm:py-3 overflow-hidden border-t border-white/10 z-10">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll-left 40s linear infinite;
            display: inline-block;
            white-space: nowrap;
          }
        `}} />
        <div className="animate-scroll whitespace-nowrap font-semibold uppercase tracking-widest text-xs sm:text-sm text-gray-300">
          <span className="mx-6 sm:mx-12 opacity-50">✦</span>
          <span className="mx-6 sm:mx-12">AMALAKI EKADASHI</span>
          <span className="mx-6 sm:mx-12 opacity-50">✦</span>
          <span className="mx-6 sm:mx-12">CELEBRATING DEEPOTSAV</span>
          <span className="mx-6 sm:mx-12 opacity-50">✦</span>
          <span className="mx-6 sm:mx-12">CARRY THE LORD</span>
          <span className="mx-6 sm:mx-12 opacity-50">✦</span>
          <span className="mx-6 sm:mx-12">BHAIMI EKADASHI</span>
          <span className="mx-6 sm:mx-12 opacity-50">✦</span>
          <span className="mx-6 sm:mx-12">LORD VARAHADEVA</span>
          <span className="mx-6 sm:mx-12 opacity-50">✦</span>
          <span className="mx-6 sm:mx-12">APARA EKADASHI</span>

          <span className="mx-6 sm:mx-12 opacity-50">✦</span>
          <span className="mx-6 sm:mx-12">AMALAKI EKADASHI</span>
          <span className="mx-6 sm:mx-12 opacity-50">✦</span>
          <span className="mx-6 sm:mx-12">CELEBRATING DEEPOTSAV</span>
          <span className="mx-6 sm:mx-12 opacity-50">✦</span>
          <span className="mx-6 sm:mx-12">CARRY THE LORD</span>
          <span className="mx-6 sm:mx-12 opacity-50">✦</span>
          <span className="mx-6 sm:mx-12">BHAIMI EKADASHI</span>
          <span className="mx-6 sm:mx-12 opacity-50">✦</span>
          <span className="mx-6 sm:mx-12">LORD VARAHADEVA</span>
          <span className="mx-6 sm:mx-12 opacity-50">✦</span>
          <span className="mx-6 sm:mx-12">APARA EKADASHI</span>
        </div>
      </div>

      {/* Modal / Popup for Blog Content (Governance Style) */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-[100] flex bg-white overflow-y-auto">
            {blogs.map(blog => blog.id === selectedBlog.id && (
              <motion.div
                layoutId={`blog-${blog.id}`}
                key={`modal-${blog.id}`}
                className="w-full min-h-screen bg-white relative">
                
                <div className="flex flex-col-reverse md:flex-row px-6 lg:max-w-[1200px] mx-auto xl:p-0 gap-6 md:gap-[49px] sm:mt-[120px] mt-[60px] w-full">
                  <div className="flex-1">
                    <div className="flex flex-col">
                      <div className="flex flex-col">
                        <span className="text-[#c74b36] font-bold text-sm uppercase tracking-widest block pb-2">
                          {blog.category}
                        </span>
                        <h1 className="text-2xl font-medium text-left text-[#0A0A0A] sm:text-[40px] leading-tight">
                          {blog.titleLines.join(' ')}
                        </h1>
                      </div>
                      <div className="text-left font-light mt-8 mb-12 whitespace-pre-line text-[#414A5D] sm:text-[20px] sm:mt-12 sm:mb-16">
                        {blog.fullContent ? (
                          blog.fullContent.split('\n\n').map((paragraph: string, i: number) => {
                            if (paragraph.startsWith('# ')) {
                              return <h2 key={i} className="text-3xl font-medium text-gray-900 mb-2 mt-4 leading-tight">{paragraph.replace('# ', '')}</h2>;
                            }
                            if (paragraph.startsWith('## ')) {
                              return <h3 key={i} className="text-xl font-medium text-gray-900 mb-2 mt-6">{paragraph.replace('## ', '')}</h3>;
                            }
                            if (paragraph.startsWith('* ')) {
                              const listItems = paragraph.split('\n').filter((item: string) => item.trim() !== '').map((item: string) => item.replace('* ', ''));
                              return (
                                <ul key={i} className="list-disc list-inside space-y-2 ml-4 mt-2">
                                  {listItems.map((item: string, idx: number) => <li key={idx} className="font-light">{item}</li>)}
                                </ul>
                              );
                            }
                            return (
                              <p 
                                key={i} 
                                className={paragraph.startsWith('Benefit:') ? 'font-medium mt-4 text-[#c74b36]' : 'mt-4'}
                                dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />') }}
                              />
                            );
                          })
                        ) : (
                          <p className="italic text-gray-400">Full content for this topic is coming soon.</p>
                        )}
                      </div>
                      
                      <button 
                        onClick={() => setSelectedBlog(null)}
                        className="bg-[#0A0A0A] text-white py-3 px-6 text-sm md:text-base w-max mb-[60px] sm:mb-[120px] hover:bg-black/80 transition-colors">
                        Back to Blogs
                      </button>
                    </div>
                  </div>
                  
                  <div className="relative w-full aspect-[0.74] md:w-[350px] lg:w-[400px] md:h-[470px] lg:h-[540px] flex-shrink-0">
                    <img 
                      src={blog.image} 
                      alt={blog.titleLines.join(' ')} 
                      className="object-cover block w-full h-full" 
                    />
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
