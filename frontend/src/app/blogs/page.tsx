"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const BLOG_CATEGORIES = [
  "All Articles",
  "Festivals",
  "Prasadam & Seva",
  "Vedic Wisdom",
  "Youth & Life Skills"
];

const ALL_BLOGS = [
  {
    id: 1,
    title: "Kartik Deepotsav in Braj – The Divine Festival of Lights",
    category: "Festivals",
    readTime: "5 min read",
    date: "October 18, 2026",
    description: "Deepotsav celebrates the sacred month of Kartik. Throughout Braj, devotees offer ghee lamps to Lord Krishna and Srimati Radharani, filling temples with radiant spiritual devotion.",
    image: "https://hkmdehradun.org/live-site/assets/12/ekadashi-banner.png",
    fullContent: `# Kartik Deepotsav in Braj – The Divine Festival of Lights

## Introduction
Deepotsav, the festival of lights, celebrates Kartik Deepotsav, a sacred celebration observed during the holy month of Kartik (October–November). Throughout Braj and temples worldwide, devotees offer ghee lamps to Lord Krishna and Srimati Radharani, filling holy places with a radiant glow. The festival represents devotion, gratitude, and remembrance of the Lord's loving pastimes.

## Why Kartik Is Special
Kartik is regarded as the most auspicious month in the Vedic calendar. Scriptures describe it as especially dear to Lord Vishnu, making devotional practices performed during this time exceptionally beneficial.

## The Story of Lord Damodara
The festival commemorates the pastime in which Mother Yashoda lovingly tied young Krishna to a wooden mortar after catching Him stealing butter. Although Krishna is the Supreme Lord, He allowed Himself to be bound by the affection of His devotee. This pastime teaches that sincere devotion and the Lord’s mercy go hand in hand.

## Deepdaan During Kartik
Offering ghee lamps and singing the Damodarashtakam prayer are important practices during Kartik. These devotional activities help devotees express their love for the Lord and receive His divine blessings.

## Celebrations at HKM Dehradun
HKM Dehradun celebrates the entire month with:
* Daily Deepdaan Seva at 8:00 PM
* Damodarashtakam Kirtan
* Nauka Vihar Festival
* Special Spiritual Programs

Join us and experience the divine blessings and spiritual joy of Kartik Deepotsav.`
  },
  {
    id: 2,
    title: "Sri Gaura Purnima – Appearance Day of Sri Chaitanya Mahaprabhu",
    category: "Festivals",
    readTime: "6 min read",
    date: "March 25, 2026",
    description: "Commemorating the golden avatara, Sri Chaitanya Mahaprabhu, who inaugurated the Hare Krishna Sankirtana movement for the spiritual elevation of all souls.",
    image: "https://hkmdehradun.org/live-site/assets/images/sri-gaura-purnima.png",
    fullContent: `# Sri Gaura Purnima – The Appearance Day of Sri Chaitanya Mahaprabhu

## The Golden Avatara
Sri Chaitanya Mahaprabhu appeared in Navadvipa, Bengal, over 500 years ago. He is revered as Lord Krishna Himself appearing in the mood and golden complexion of Srimati Radharani to distribute divine love through the chanting of the Holy Names.

## The Yuga Dharma: Sankirtana
In this age of Kali, Sri Chaitanya Mahaprabhu inaugurated the congregational chanting of the Hare Krishna Maha-Mantra:
*Hare Krishna, Hare Krishna, Krishna Krishna, Hare Hare*
*Hare Rama, Hare Rama, Rama Rama, Hare Hare*

## Festivities at HKM Dehradun
Grand Mahabhishekam of Sri Sri Nitai Gauranga, continuous ecstatic Harinama Sankirtana, spiritual discourses, and distribution of grand feast prasadam to all attendees.`
  },
  {
    id: 3,
    title: "Daily Annadana Seva – Feeding Sanctified Meals to Thousands",
    category: "Prasadam & Seva",
    readTime: "4 min read",
    date: "June 10, 2026",
    description: "Discover how Hare Krishna Movement Dehradun prepares and serves hot, nutritious, Krishna-prasadam daily to pilgrims, sadhus, and the underprivileged.",
    image: "https://hkmdehradun.org/live-site/assets/12/annadaan-seva-banner1.png",
    fullContent: `# Daily Annadana Seva – Feeding Sanctified Meals

## The Merit of Food Distribution
In Vedic culture, Annadana (offering sanctified food) is considered one of the highest forms of charity. When food is first prepared with purity and offered to Lord Krishna, it becomes Prasadam—sanctified mercy that nourishes both body and soul.

## Over 2.89 Crore Meals Served
Through our dedicated community kitchens, HKM Dehradun ensures that no visitor or needy individual goes hungry. Daily Khichdi Prasadam is served with warmth, hygiene, and love.

## How You Can Help
You can sponsor daily meals for pilgrims, school children, or devotees on special occasions like birthdays, anniversaries, or in memory of loved ones.`
  },
  {
    id: 4,
    title: "Gau Seva – Protecting and Caring for Sacred Cows",
    category: "Prasadam & Seva",
    readTime: "5 min read",
    date: "May 14, 2026",
    description: "Cows hold a sacred place in Vedic tradition and are dear to Lord Krishna. Explore our Gaushala initiatives providing lifelong shelter and medical care.",
    image: "https://hkmdehradun.org/live-site/assets/12/gau-seva-banner.png",
    fullContent: `# Gau Seva – Sacred Cow Protection Initiative

## Lord Krishna: The Protector of Cows
Lord Krishna is known as Gopala (the protector of cows) and Govinda (one who brings pleasure to the cows). Protecting cows brings harmony, spiritual prosperity, and peace to society.

## Our Gaushala Seva
HKM Dehradun maintains a healthy, loving Gaushala providing:
* Daily nutritious fodder and green grass
* Clean shelter and fresh water
* Professional veterinary care and protection for old cows

Support Gau Seva today and be blessed by Mother Cow.`
  },
  {
    id: 5,
    title: "Overcoming Anxiety & Burnout: Lessons from Bhagavad-Gita for Youth",
    category: "Youth & Life Skills",
    readTime: "7 min read",
    date: "July 12, 2026",
    description: "How ancient Vedic psychology provides actionable, scientific tools to detach from exam and career anxiety and master emotional equilibrium.",
    image: "https://hkmdehradun.org/live-site/assets/12/khichdi-seva-banner.png",
    fullContent: `# Overcoming Anxiety & Burnout: Lessons from Bhagavad-Gita

## Emotional Equilibrium in Competitive Times
When Arjuna stood on the battlefield overwhelmed by anxiety, Lord Krishna delivered the Bhagavad-Gita—a timeless manual for mental poise and inner strength.

## Key Takeaways for Youth:
1. **Focus on Duty, Not Result:** Detach from placement or appraisal panic and focus 100% on present execution.
2. **Mastering the Mind:** Through regular meditation and self-discipline, train the mind into your best friend.
3. **Daily Mantra Meditation:** Start your day with 15 minutes of japa meditation to anchor emotional clarity.`
  },
  {
    id: 6,
    title: "Sri Krishna Janmashtami – Celebrating the Supreme Appearance",
    category: "Festivals",
    readTime: "8 min read",
    date: "August 20, 2026",
    description: "Immerse in the grandest celebration of the year with midnight Aarti, continuous Kirtans, 108 bhoga offerings, and joyful cultural performances.",
    image: "https://hkmdehradun.org/live-site/assets/images/sri-gaura-purnima.png",
    fullContent: `# Sri Krishna Janmashtami – The Grand Appearance of Lord Krishna

## The Divine Advent
Sri Krishna Janmashtami marks the auspicious appearance of Lord Krishna in Mathura to protect the virtuous and re-establish righteousness.

## Grand Festivities at HKM Dehradun
* Continuous ecstatic Kirtans from dawn till midnight
* Grand 108 Chappan Bhoga offerings
* Midnight Mahabhishekam and Aarti
* Distribution of special Prasadam feast to all visitors.`
  }
];

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);

  const filteredBlogs = selectedCategory === "All Articles"
    ? ALL_BLOGS
    : ALL_BLOGS.filter(blog => blog.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col font-sans">
      {/* Main Container */}
      <main className="flex-grow pt-24 sm:pt-32 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

          {/* Page Header */}
          <div className="flex flex-col items-center text-center mb-12 relative">
            <div className="flex items-center gap-3 text-[#d4af37] mb-3">
              <div className="h-px w-10 bg-current"></div>
              <span className="uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">ARTICLES & INSIGHTS</span>
              <div className="h-px w-10 bg-current"></div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#3b2b2f] tracking-tight mb-4">
              Latest <span className="text-[#d4af37]">Blogs</span>
            </h1>
            <p className="text-[#5c5245] max-w-2xl text-[16px] leading-relaxed">
              Explore timeless Vedic wisdom, festival highlights, community updates, and spiritual insights from Hare Krishna Movement Dehradun.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2.5 mb-12">
            {BLOG_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-[#0a3d73] text-white shadow-md'
                    : 'bg-white text-[#5c5245] hover:bg-[#f4efe6] border border-[#eae4d5]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Cards Grid — Index Page Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <motion.div
                key={blog.id}
                layoutId={`blog-card-${blog.id}`}
                onClick={() => setSelectedBlog(blog)}
                className="relative flex flex-col justify-between rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border-[6px] border-white group font-card cursor-pointer bg-white min-h-[400px] lg:min-h-[480px]"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80 pointer-events-none z-0"></div>

                <div className="relative z-10 flex flex-col justify-between h-full p-8 sm:p-10">
                  <div className="mt-2">
                    <h2 className="text-3xl sm:text-4xl font-extrabold uppercase leading-tight tracking-wide text-white drop-shadow-lg transform transition-transform duration-500 translate-y-1 group-hover:translate-y-0 line-clamp-3">
                      {blog.title}
                    </h2>
                  </div>

                  <div className="mt-16 flex flex-col items-start transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                    <span className="text-[#ff7a59] font-bold text-[0.85rem] uppercase tracking-[0.15em] block mb-2 drop-shadow-md">
                      {blog.category}
                    </span>
                    <p className="text-white font-medium text-lg sm:text-xl leading-[1.4] max-w-sm pr-4 drop-shadow-md mb-6 line-clamp-3">
                      {blog.description}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBlog(blog);
                      }}
                      className="group/btn inline-flex items-center gap-2 text-white font-bold tracking-wider text-sm uppercase hover:text-[#ff7a59] transition-colors bg-black/40 hover:bg-black/60 px-5 py-2.5 rounded-full backdrop-blur-sm border border-white/20 hover:border-[#ff7a59]/50"
                    >
                      Read More
                      <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </main>

      {/* Full Article Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[32px] max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 relative shadow-2xl my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="mb-6">
                <span className="inline-block bg-[#0a3d73]/10 text-[#0a3d73] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-3">
                  {selectedBlog.category}
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#18181b] leading-tight mb-2">
                  {selectedBlog.title}
                </h2>
                <div className="text-sm text-[#71717a] font-medium flex items-center gap-3">
                  <span>{selectedBlog.date}</span>
                  <span>•</span>
                  <span>{selectedBlog.readTime}</span>
                </div>
              </div>

              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8">
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose prose-lg max-w-none text-[#3f3f46] leading-relaxed whitespace-pre-line">
                {selectedBlog.fullContent}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="px-6 py-3 bg-[#18181b] hover:bg-black text-white font-semibold rounded-full text-sm transition-colors cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
