"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
        const response = await axios.get(`${backendUrl}/api/cms/blogs`);
        setBlogs(response.data);
      } catch (error) {
        console.error('Failed to load blogs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-32 pb-12">
      
      {/* Header Info */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-saffron-dark">Ashram Publications</span>
        <h1 className="text-4xl font-extrabold text-charcoal-900">Articles & Spiritual Wisdom</h1>
        <p className="text-xs sm:text-sm text-charcoal-700">
          Discover the cultural importance of Gau Seva, Vedic cow sciences, and daily pilgrim nourishment stories.
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <span className="animate-spin w-8 h-8 border-4 border-saffron border-t-transparent rounded-full" />
          <span className="text-xs text-charcoal-700 font-semibold uppercase tracking-wider">Fetching articles...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <article 
              key={blog.slug}
              className="bg-white border border-saffron/10 rounded-3xl overflow-hidden shadow-md flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                <img 
                  src={blog.coverImage} 
                  alt={blog.title} 
                  className="w-full h-56 object-cover group-hover:scale-102 transition-transform duration-300" 
                />
                
                <div className="p-6 sm:p-8 space-y-4">
                  {/* Meta Details */}
                  <div className="flex items-center gap-4 text-xs text-charcoal-700 border-b border-saffron/10 pb-3">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-saffron" />
                      <span>{blog.authorName}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-saffron" />
                      <span>{new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>

                  {/* Title & Excerpt */}
                  <h2 className="text-xl font-bold text-charcoal-900 leading-snug group-hover:text-saffron-dark transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 sm:px-8 sm:pb-8 pt-0">
                <Link
                  href={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-1.5 text-saffron font-bold text-xs hover:text-saffron-dark group-hover:gap-2.5 transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </article>
          ))}
        </div>
      )}

    </div>
  );
}
