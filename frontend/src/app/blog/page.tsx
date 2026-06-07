"use client";

import React from 'react';
import Link from 'next/link';
import { useState } from 'react';

export default function BlogPage() {
  const [selectedBlog, setSelectedBlog] = useState<any>(null);

  const blogs = [
    {
      titleLines: ["AMALAKI", "EKADASHI"],
      category: "FESTIVAL",
      description: "Amalaki Ekadashi, also known as Amala Ekadashi...",
      fullContent: `# Amalaki Ekadashi\n\nAmalaki Ekadashi, also known as Amala Ekadashi, is observed in the month of Phalguna and is glorified in the Brahmanda Purana. Sage Vasishtha told King Mandhata that observing this Ekadashi destroys sins, grants prosperity, and leads to liberation.\n\nIn the kingdom of Vaidisha, King Chitraratha and his citizens faithfully observed Amalaki Ekadashi by worshipping Lord Vishnu and the sacred Amalaki (Amla) tree. A hunter, who lived by killing animals, unknowingly participated by staying awake all night, hearing the Lord's glories, and fasting.\n\nBy the merit of this observance, the hunter was reborn as the righteous King Vasuratha. Later, when enemies attempted to kill him, Lord Vishnu protected him through a divine manifestation. Realizing the Lord's mercy, he devoted his life to devotional service.\n\nBenefit: Anyone who sincerely observes Amalaki Ekadashi attains Lord Vishnu's blessings, freedom from sins, and ultimately His eternal abode.`,
      image: "/aa.jpg?v=1",
    },
    {
      titleLines: ["CELEBRATING", "DEEPOTSAV"],
      category: "FESTIVAL",
      description: "Deepotsav, the festival of light, celebrates...",
      fullContent: `# Kartik Deepotsav in Braj – The Divine Festival of Lights

## Introduction

Deepotsav, the festival of light, celebrates Kartik Deepotsav, a sacred celebration observed during the holy month of Kartik (October–November). Throughout Braj, devotees offer ghee lamps to Lord Krishna and Srimati Radharani, filling temples and holy places with a radiant glow. The festival represents devotion, gratitude, and remembrance of the Lord's loving pastimes.

## Why Kartik Is Special

Kartik is regarded as the most auspicious month in the Vedic calendar. Scriptures describe it as especially dear to Lord Vishnu, making devotional practices performed during this time exceptionally beneficial.

## The Story of Lord Damodara

The festival commemorates the pastime in which Mother Yashoda lovingly tied young Krishna to a wooden mortar after catching Him stealing butter. Although Krishna is the Supreme Lord, He allowed Himself to be bound by the affection of His devotee. This pastime teaches that sincere devotion and the Lord’s mercy go hand in hand.

## Nalakuvara and Manigriva

During this pastime, Krishna delivered Nalakuvara and Manigriva, the sons of Kuvera, who had been cursed to become twin trees. By Krishna’s touch, they were freed from the curse and attained spiritual liberation.

## Deepdaan During Kartik

Offering ghee lamps and singing the Damodarashtakam prayer are important practices during Kartik. These devotional activities help devotees express their love for the Lord and receive His blessings.

## Celebrations in Braj

Temples throughout Braj shine with thousands of lamps, devotional songs, kirtans, and special worship ceremonies. The entire atmosphere becomes vibrant with spiritual joy and devotion.

## Kartik Deepotsav at HKM Dehradun

HKM Dehradun celebrates the entire month with:

* Daily Deepdaan Seva at 8:00 PM
* Damodarashtakam Kirtan
* Nauka Vihar Festival
* Yamuna Boat Ride Pastimes
* Shobha Yatra
* Special Spiritual Programs

Join us and experience the divine blessings and spiritual joy of Kartik Deepotsav.`,
      image: "/deepostav.png?v=1",
    },
    {
      titleLines: ["CARRY", "THE LORD"],
      category: "DEVOTION",
      description: "In the journey of spiritual life, one of the most profound...",
      fullContent: `# Vaikuntha Ekadashi – Carrying the Lord in Our Hearts

## Introduction

In the journey of spiritual life, one of the most profound realizations is what Vaikuntha Ekadashi reminds us of: the importance of keeping Lord Krishna at the center of our lives. When we sincerely remember the Lord and follow His instructions, our thoughts become pure, our words become meaningful, and our actions bring happiness to ourselves and others.

## Lord in the Heart

In the Srimad Bhagavatam, Lord Brahma tells Narada Muni that his words never become false, his mind never wanders toward undesirable thoughts, and his senses never act improperly because Lord Hari always resides in his heart.

When we remember Krishna through chanting, hearing, worship, and devotional service, we naturally develop auspicious thoughts, truthful speech, and righteous actions.

## The Example of Srila Prabhupada

Great devotees like Srila Prabhupada always carried the Lord in their hearts. Because of their deep devotion, their words inspired others, their actions brought spiritual benefit, and their lives became examples of pure service.

Srila Prabhupada dedicated his life to sharing spiritual knowledge through:

* Bhagavad-gita – the science of God
* Srimad Bhagavatam – the love of God
* Chaitanya Charitamrita – the process of deepening love for God

He encouraged everyone to study these scriptures and apply their teachings in daily life.

## The Power of the Holy Name

Although Srila Prabhupada wrote many spiritual books, he often said that their ultimate purpose was to inspire people to chant the holy names of the Lord.

In this age, the most effective spiritual practice is chanting the Hare Krishna Mahamantra:

**Hare Krishna Hare Krishna Krishna Krishna Hare Hare**
**Hare Rama Hare Rama Rama Rama Hare Hare**

## Conclusion

Vaikuntha Ekadashi teaches us that by keeping Lord Krishna in our hearts with sincerity and enthusiasm, we can transform every situation in life. Through devotion, scripture study, and chanting the holy names, we receive the Lord’s guidance, protection, and blessings.`,
      image: "/carry.jpeg?v=1",
    },
    {
      titleLines: ["BHAIMI", "EKADASHI"],
      category: "FESTIVAL",
      description: "Bhaimi Ekadashi, also known as Bhima Ekadashi...",
      fullContent: `# Bhaimi (Jaya) Ekadashi – The Ekadashi That Grants Liberation

## Introduction

Bhaimi Ekadashi, also known as Bhima Ekadashi or Jaya Ekadashi, falls during the bright fortnight of the month of Magha (January–February). Lord Krishna describes this sacred Ekadashi to Maharaja Yudhishthira as one of the most powerful fasting days, capable of destroying sinful reactions and granting spiritual liberation.

## The Story of Malyavan and Pushpavati

In the heavenly kingdom of Indra, a celestial musician named Malyavan and an apsara named Pushpavati became deeply attracted to each other. While performing before Indra, they became distracted and failed in their duties.

Angered by their behavior, Indra cursed them to take birth as ghostly beings on Earth. Deprived of their heavenly happiness, they suffered greatly in the cold Himalayan regions.

## The Mercy of Jaya Ekadashi

By divine arrangement, the day they suffered without food or water happened to be Jaya Ekadashi. They unknowingly observed a complete fast and remained awake throughout the night.

As Dvadasi arrived, Lord Vishnu's mercy freed them from the curse. They regained their celestial forms and were welcomed back to the heavenly planets.

## Benefits of Observing Bhaimi Ekadashi

Lord Krishna explains that observing Jaya Ekadashi:

* Destroys sinful reactions
* Removes negative influences
* Grants spiritual purification
* Frees one from the cycle of birth and death
* Bestows residence in Lord Vishnu's eternal abode

## Conclusion

Bhaimi (Jaya) Ekadashi is a highly auspicious day dedicated to Lord Vishnu. The story of Malyavan and Pushpavati demonstrates the extraordinary mercy available through observing this sacred fast. By sincerely following Jaya Ekadashi, devotees receive divine blessings, spiritual advancement, and the opportunity to attain the Lord's eternal shelter.`,
      image: "/jaya-ekadashi.jpg?v=1",
    },
    {
      titleLines: ["LORD", "VARAHADEVA"],
      category: "APPEARANCE DAY",
      description: "In the vast pantheon of Hindu deities, Lord Varahadeva...",
      fullContent: `# Lord Varahadeva Appearance Day – Varaha Dwadashi

## Introduction

In the vast pantheon of Hindu deities, Lord Varahadeva holds a unique place. Varaha Dwadashi commemorates the appearance of Lord Varahadeva, the divine boar incarnation of Lord Vishnu. On this sacred day, devotees remember how the Lord rescued Mother Earth from the depths of the cosmic ocean and restored balance to creation.

## The Demon Hiranyaksha

Hiranyaksha and Hiranyakashipu were powerful demon brothers born to Sage Kashyapa. Hiranyaksha became extremely proud and disturbed the universal order. By his actions, Mother Earth was submerged beneath the cosmic waters, creating chaos throughout the universe.

## The Appearance of Lord Varahadeva

As Lord Brahma contemplated how to save the Earth, a tiny boar appeared from his nostril. Within moments, the boar expanded into a gigantic form, filling the sky with His divine presence. Realizing that He was an incarnation of the Supreme Lord, the demigods offered heartfelt prayers.

## Rescuing Mother Earth

Lord Varahadeva entered the cosmic ocean and searched for the Earth. Finding her submerged in the depths, He gently lifted her upon His powerful tusks and raised her back to her proper position.

## The Battle with Hiranyaksha

When the demon Hiranyaksha challenged the Lord, a fierce battle followed. Lord Varahadeva effortlessly defeated the demon, protecting the universe and restoring peace. Having rescued the Earth and fulfilled His mission, the Lord returned to His eternal abode.

## Conclusion

The appearance of Lord Varahadeva reminds us of the Lord’s unlimited compassion and protection. Just as He lifted Mother Earth from the ocean, He can also lift our hearts from ignorance and material suffering. On Varaha Dwadashi, devotees pray for His shelter, guidance, and divine mercy.`,
      image: "/Lord-Varahadeva.jpg?v=1",
    },
    {
      titleLines: ["APARA", "EKADASHI"],
      category: "FESTIVAL",
      description: "Apara Ekadashi, also known as Pausha Putrada Ekadashi...",
      fullContent: `# Apara Ekadashi – The Ekadashi That Destroys Sins

## Introduction

Apara Ekadashi, also known as Pausha Putrada Ekadashi, falls during the Krishna Paksha (waning phase of the moon) in the month of Jyeshtha (May–June). In the Brahmanda Purana, Lord Krishna explains to King Yudhishthira that this sacred Ekadashi has the power to remove sinful reactions and grant immense spiritual merit.

## The Glory of Apara Ekadashi

Lord Krishna describes Apara Ekadashi as a highly auspicious day that purifies the heart and frees one from the burden of past mistakes. By observing this Ekadashi with sincerity and devotion, one can progress steadily on the path of spiritual life.

The Lord explains that even those who have committed serious offenses can receive purification through faithful observance of this sacred fast and by taking shelter of devotional service.

## Benefits of Observing Apara Ekadashi

The scriptures glorify Apara Ekadashi as bestowing benefits equal to many great pious activities, including:

* Visiting holy pilgrimage places
* Performing charitable acts
* Worshipping the Lord with devotion
* Engaging in spiritual austerities

Lord Krishna compares Apara Ekadashi to a blazing fire that burns sinful reactions and a rising sun that removes the darkness of ignorance.

## Worship of Lord Trivikrama

On this day, devotees especially worship Lord Trivikrama (Vamana Deva), the incarnation who covered the entire universe with His divine steps. Remembering His pastimes and offering prayers to Him brings spiritual blessings and purification.

## How to Observe Apara Ekadashi

Devotees observe Apara Ekadashi by:

* Fasting from grains and beans
* Chanting the Hare Krishna Mahamantra
* Reading sacred scriptures such as Bhagavad-gita and Srimad Bhagavatam
* Worshipping Lord Vishnu and Lord Vamana Deva
* Engaging in devotional service and prayer

The true essence of the observance is to increase remembrance of Lord Krishna and cultivate devotion.

## Conclusion

Apara Ekadashi is a powerful opportunity for spiritual purification and growth. By observing this sacred day with faith and devotion, one can overcome sinful reactions, receive the mercy of Lord Vishnu, and move closer to attaining eternal spiritual happiness.`,
      image: "/lord-vishnu.jpg?v=1",
    }
  ];

  return (
    <div className="relative min-h-screen pt-4 overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260419_065931_e3ca7b53-d32e-4ad5-81de-dc9d6fcfda6d.mp4" type="video/mp4" />
      </video>

      {/* Header Info */}
      <div className="flex justify-center max-w-5xl mx-auto mb-4 px-4">
        <img 
          src="/blogs.png" 
          alt="Blogs" 
          className="w-full h-auto object-contain"
          style={{ maxHeight: '450px' }}
        />
      </div>

      {/* Grid mimicking the reference image */}
      <div className="w-full px-2 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-w-[1400px] mx-auto">
          {blogs.map((blog, index) => (
            <div 
              key={index} 
              className="relative flex flex-col justify-between p-8 sm:p-10 min-h-[400px] lg:min-h-[480px] bg-cover bg-center overflow-hidden"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url('${blog.image}')`
              }}
            >
              <div className="mt-2 z-10">
                <h2 
                  className="text-[12vw] sm:text-[9vw] md:text-[5.5vw] lg:text-[3.8vw] xl:text-[4vw] font-black uppercase leading-[0.85] tracking-tighter text-white break-normal drop-shadow-lg"
                  style={{ 
                    fontFamily: 'Impact, Arial Black, sans-serif'
                  }}
                >
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
            </div>
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

      {/* Modal / Popup for Blog Content */}
      {selectedBlog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedBlog(null)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white text-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto z-10 flex flex-col animate-in fade-in zoom-in duration-300">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedBlog(null)}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-sm z-50"
            >
              ✕
            </button>
            
            {/* Text Content */}
            <div className="p-8 sm:p-12 space-y-6 text-base sm:text-lg leading-relaxed text-gray-700 relative pt-12 sm:pt-16">
              <span className="text-[#c74b36] font-bold text-sm uppercase tracking-widest block border-b border-gray-100 pb-4">
                {selectedBlog.category}
              </span>
              {selectedBlog.fullContent ? (
                selectedBlog.fullContent.split('\n\n').map((paragraph: string, i: number) => {
                  if (paragraph.startsWith('# ')) {
                    return <h1 key={i} className="text-3xl sm:text-4xl font-black text-gray-900 mb-2 mt-4 leading-tight text-balance">{paragraph.replace('# ', '')}</h1>;
                  }
                  if (paragraph.startsWith('## ')) {
                    return <h2 key={i} className="text-2xl font-bold text-[#c74b36] mb-2 mt-6 border-b border-gray-100 pb-2">{paragraph.replace('## ', '')}</h2>;
                  }
                  if (paragraph.startsWith('* ')) {
                    const listItems = paragraph.split('\n').filter(item => item.trim() !== '').map(item => item.replace('* ', ''));
                    return (
                      <ul key={i} className="list-disc list-inside space-y-2 ml-4 mt-2 bg-orange-50 p-6 rounded-xl border border-orange-100/50">
                        {listItems.map((item, idx) => <li key={idx} className="font-medium">{item}</li>)}
                      </ul>
                    );
                  }
                  return (
                    <p 
                      key={i} 
                      className={paragraph.startsWith('Benefit:') ? 'font-bold text-[#c74b36] p-4 bg-orange-50 rounded-lg border border-orange-100' : ''}
                      dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />') }}
                    />
                  );
                })
              ) : (
                <p className="italic text-gray-400 text-center py-8">Full content for this topic is coming soon.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
