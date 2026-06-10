"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Heart } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
        const response = await axios.get(`${backendUrl}/api/cms/blogs`);
        
        // Find by slug
        const articles = response.data;
        const matched = articles.find((b: any) => b.slug === slug);
        setBlog(matched || articles[0]); // fallback to first blog if not matched
      } catch (error) {
        console.error('Failed to load article detail:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogDetail();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-3">
        <span className="animate-spin w-8 h-8 border-4 border-saffron border-t-transparent rounded-full" />
        <span className="text-xs text-charcoal-700 font-semibold tracking-wider uppercase">Loading article...</span>
      </div>
    );
  }

  if (!blog) return null;

  // JSON-LD Structured Schema Data for SEO crawlers
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": [blog.coverImage],
    "datePublished": blog.createdAt,
    "author": [{
      "@type": "Person",
      "name": blog.authorName,
      "url": "https://hkdtrust.org"
    }]
  };

  return (
    <div 
      className="relative min-h-screen pt-4 overflow-hidden bg-[#faf8f5]"
      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='800' height='400' viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23cca75b' stroke-width='2' opacity='0.2'%3E%3Cg transform='translate(100, 50) scale(1.5)'%3E%3Cpath d='M20 5C20 5 10 15 20 35C30 15 20 5 20 5Z'/%3E%3Cpath d='M20 35C10 30 5 20 10 12C15 12 18 25 20 35Z'/%3E%3Cpath d='M20 35C30 30 35 20 30 12C25 12 22 25 20 35Z'/%3E%3C/g%3E%3Cg transform='translate(300, 50) scale(1.5)'%3E%3Ccircle cx='20' cy='10' r='4'/%3E%3Cpath d='M20 15 L20 25 M10 20 L30 20 M10 35 C10 35 15 25 20 25 C25 25 30 35 30 35 M10 35 L30 35'/%3E%3C/g%3E%3Cg transform='translate(500, 50) scale(1.5)'%3E%3Ccircle cx='20' cy='20' r='10' stroke-dasharray='2 2'/%3E%3Cpath d='M20 10 C25 10 30 15 30 20 C30 25 25 30 20 30 C15 30 10 25 10 20 C10 17 12 15 15 15 C17 15 18 17 18 18 C18 19 17 20 16 20'/%3E%3Cpath d='M20 0L20 5 M20 35L20 40 M0 20L5 20 M35 20L40 20 M5 5L10 10 M30 30L35 35 M5 35L10 30 M30 10L35 5'/%3E%3C/g%3E%3Cg transform='translate(700, 50) scale(1.5)'%3E%3Cpath d='M12 25 L12 10 A3 3 0 0 1 18 10 L18 20 M18 15 L18 5 A3 3 0 0 1 24 5 L24 20 M24 15 L24 8 A3 3 0 0 1 30 8 L30 25 C30 35 20 40 12 35 C8 32 5 28 5 25 L5 15 A3 3 0 0 1 11 15 L11 25'/%3E%3Cpath d='M15 25 C18 25 20 27 20 30 C20 32 18 34 16 34 C14 34 12 32 12 30 C12 29 13 28 14 28'/%3E%3C/g%3E%3Cg transform='translate(200, 200) scale(1.5)'%3E%3Ccircle cx='20' cy='6' r='4'/%3E%3Cpath d='M12 16 Q20 13 28 16 L33 28 Q28 25 20 25 Q12 25 7 28 Z'/%3E%3Cpath d='M20 18 L20 24'/%3E%3Cpath d='M5 32 Q20 27 35 32 Q30 38 20 38 Q10 38 5 32 Z'/%3E%3C/g%3E%3Cg transform='translate(400, 200) scale(1.5)'%3E%3Cpath d='M22 5 A 15 15 0 1 0 22 35 A 12 12 0 1 1 22 5 Z'/%3E%3Cpath d='M8 20 L12 20 M10 18 L10 22'/%3E%3C/g%3E%3Cg transform='translate(600, 200) scale(1.5)'%3E%3Cpath d='M20 5 C28 5 30 15 20 18 C18 12 22 10 20 5'/%3E%3Cpath d='M10 25 C5 18 10 10 16 16 C12 18 10 15 10 25'/%3E%3Cpath d='M30 25 C35 18 30 10 24 16 C28 18 30 15 30 25'/%3E%3Cpath d='M10 25 Q20 35 30 25'/%3E%3Ccircle cx='20' cy='22' r='2'/%3E%3C/g%3E%3C/g%3E%3Ctext x='400' y='140' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Krishna Hare Krishna, Krishna Krishna Hare Hare%3C/text%3E%3Ctext x='400' y='165' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Rama Hare Rama, Rama Rama Hare Hare%3C/text%3E%3Ctext x='400' y='340' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Krishna Hare Krishna, Krishna Krishna Hare Hare%3C/text%3E%3Ctext x='400' y='365' font-family='serif' font-size='18' fill='%23cca75b' stroke='none' text-anchor='middle' opacity='0.25' letter-spacing='1.5' font-style='italic'%3EHare Rama Hare Rama, Rama Rama Hare Hare%3C/text%3E%3C/svg%3E\")", backgroundRepeat: 'repeat', backgroundSize: '600px 300px' }}
    >
      <article className="max-w-4xl mx-auto px-4 pt-32 pb-12 space-y-8 relative z-10 bg-white/80 backdrop-blur-sm rounded-xl my-4">
        
        {/* Inject JSON-LD Schema markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Back button */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-saffron font-bold hover:text-saffron-dark transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Articles</span>
          </Link>
        </div>

        {/* Title & Metadata */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex items-center gap-4 text-xs text-charcoal-700 border-y border-saffron/10 py-3">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-saffron" />
              <span>Published by: **{blog.authorName}**</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-saffron" />
              <span>{new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </div>

        {/* Banner Cover Image */}
        <div className="rounded-3xl overflow-hidden shadow-lg border border-saffron/10 bg-white">
          <img src={blog.coverImage} alt={blog.title} className="w-full h-80 sm:h-[450px] object-cover" />
        </div>

        {/* Article Contents */}
        <div className="prose prose-saffron max-w-none text-xs sm:text-sm text-charcoal-700 leading-relaxed space-y-6">
          <p className="font-semibold text-charcoal-900 border-l-4 border-saffron pl-4 italic">
            {blog.excerpt}
          </p>
          
          {/* Core content body (supports markup from Rich text) */}
          <div className="space-y-4 whitespace-pre-line">
            {blog.content || `Cows have held an extremely exalted position in Vedic culture since time immemorial. Described as the mother of the universe ("Gavo Vishwasya Matarah"), cow protection is not merely an agricultural necessity, but a direct spiritual seva. 
            
            In the pasturing grounds of Vrindavan Dham, Lord Sri Krishna personally tended to the cows, earning Himself the names "Gopala" (protector of cows) and "Govinda" (one who brings pleasure to the cows). By feeding a cow, bathing her, or sponsoring her shelter, we purify our karmic layers and invoke peace in our lives.
            
            At Hare Krishna Dharma Trust, we shelter rescued, elderly, and medical-care cows, feeding them fresh green pasture grass, mineral inputs, and providing medical treatments. Your sponsorships enable these programs to thrive.`}
          </div>
        </div>

        {/* CTA Box */}
        <div className="bg-cream/80 border border-saffron/20 rounded-3xl p-8 text-center space-y-4 shadow-md max-w-xl mx-auto glass-card">
          <Heart className="w-10 h-10 text-saffron mx-auto fill-saffron/20 animate-pulse" />
          <h3 className="text-lg font-bold text-charcoal-900">Inspired by this Wisdom?</h3>
          <p className="text-xs text-charcoal-700 leading-relaxed max-w-sm mx-auto">
            You can participate online by offering Gau Seva cow feed or Sadhu Annadana prasadam. Receive immediate digital certificates.
          </p>
          <div className="pt-2">
            <Link
              href="/donate"
              className="bg-saffron hover:bg-saffron-dark text-white px-7 py-3 rounded-full font-bold text-xs shadow-md transition-all active:scale-95 inline-block"
            >
              Offer Seva Online
            </Link>
          </div>
        </div>

      </article>
    </div>
  );
}
