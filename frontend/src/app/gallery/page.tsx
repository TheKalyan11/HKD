"use client";

import React, { useState } from 'react';
import { Image as ImageIcon, Play, X, Sparkles } from 'lucide-react';

export default function GalleryPage() {
  const [activeMedia, setActiveMedia] = useState<string | null>(null);

  const mediaItems = [
    { type: 'image', url: 'https://images.unsplash.com/photo-1570126688035-1e6adadbe99b?q=80&w=600', title: 'Protected Cows Feeding' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=600', title: 'Sadhu Annadana Feeds' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=600', title: 'Radha Kund Sandhya Aarti' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600', title: 'Yoga & Meditation Retreat' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600', title: 'Sacred Temple Weddings' },
    { type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'Ashram Sandhya Aarti Preview', thumb: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=600' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-saffron-dark">Visual Memories</span>
        <h1 className="text-4xl font-extrabold text-charcoal-900">Life at Radha Krishna Dham</h1>
        <p className="text-xs sm:text-sm text-charcoal-700">
          A dynamic visual archive of daily temple prayers, rescued cow feedings, and sadhu prasadam distributions.
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mediaItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setActiveMedia(item.url)}
            className="relative cursor-pointer overflow-hidden rounded-3xl shadow-md hover:shadow-xl group border border-saffron/10 bg-white"
          >
            <img
              src={item.type === 'video' ? item.thumb : item.url}
              alt={item.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-transparent flex flex-col justify-end p-6">
              <span className="text-white font-bold text-sm tracking-wide flex items-center gap-1.5">
                {item.type === 'video' ? <Play className="w-4 h-4 fill-white text-saffron" /> : <ImageIcon className="w-4 h-4 text-saffron" />}
                {item.title}
              </span>
            </div>

          </div>
        ))}
      </div>

      {/* Lightbox Popups */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/90 flex items-center justify-center p-4">
          <button
            onClick={() => setActiveMedia(null)}
            className="absolute top-6 right-6 text-white hover:text-saffron p-2 bg-white/10 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full max-h-[85vh] overflow-hidden rounded-2xl bg-black flex items-center justify-center shadow-2xl">
            {activeMedia.endsWith('.mp4') ? (
              <video src={activeMedia} controls autoPlay className="max-w-full max-h-[80vh] rounded-lg" />
            ) : (
              <img src={activeMedia} alt="Preview" className="max-w-full max-h-[80vh] object-contain rounded-lg" />
            )}
          </div>
        </div>
      )}

    </div>
  );
}
