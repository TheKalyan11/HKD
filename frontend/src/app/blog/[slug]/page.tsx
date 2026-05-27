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
    <article className="max-w-4xl mx-auto px-4 pt-32 pb-12 space-y-8">
      
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
      <div className="rounded-3xl overflow-hidden shadow-lg border border-saffron/10">
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
      <div className="bg-cream/40 border border-saffron/20 rounded-3xl p-8 text-center space-y-4 shadow-md max-w-xl mx-auto glass-card">
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
  );
}
