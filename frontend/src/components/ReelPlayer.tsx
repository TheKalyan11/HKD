"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Heart, Share2, Volume2, VolumeX, Play } from 'lucide-react';

export type Reel = {
  id: string;
  videoUrl: string;
  likes: number;
};

interface ReelPlayerProps {
  reel: Reel;
  isActive: boolean;
}

export default function ReelPlayer({ reel, isActive }: ReelPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(reel.likes);

  // Play/Pause logic based on intersection observer (isActive prop)
  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().catch(console.error);
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(console.error);
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator.share) {
        await navigator.share({
          title: reel.title,
          text: reel.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="relative w-full h-full bg-black snap-start flex justify-center items-center">
      {/* Video Element */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        className="w-full h-full object-cover sm:rounded-3xl"
        loop
        playsInline
        muted={isMuted}
        onClick={togglePlay}
      />

      {/* Play Button Overlay (when paused) */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20"
        >
          <div className="w-16 h-16 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Play className="w-8 h-8 text-white fill-current ml-1" />
          </div>
        </div>
      )}

      {/* Top Header / Audio Control */}
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={toggleMute}
          className="p-2 bg-black/30 backdrop-blur-md rounded-full text-white hover:bg-black/50 transition"
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
      </div>

      {/* Bottom Information Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-4 pb-20 sm:pb-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex justify-between items-end">
        
        {/* Left Side: Title */}
        <div className="text-white max-w-[75%]">
          <h2 className="text-lg font-bold mb-2 flex items-center gap-2 drop-shadow-md">
            Hare Krishna Dehradun
            <svg className="w-4 h-4 text-blue-500 fill-current drop-shadow-md" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </h2>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex flex-col gap-6 items-center">
          <button onClick={handleLike} className="flex flex-col items-center gap-1 group">
            <div className="p-3 bg-black/20 backdrop-blur-sm rounded-full group-hover:bg-black/40 transition hover:scale-110 active:scale-95">
              <Heart className={`w-7 h-7 transition-colors ${isLiked ? 'text-red-500 fill-current' : 'text-white'}`} />
            </div>
            <span className="text-white text-xs font-semibold drop-shadow-md">{likesCount}</span>
          </button>
          
          <button onClick={handleShare} className="flex flex-col items-center gap-1 group">
            <div className="p-3 bg-black/20 backdrop-blur-sm rounded-full group-hover:bg-black/40 transition hover:scale-110 active:scale-95">
              <Share2 className="w-7 h-7 text-white" />
            </div>
            <span className="text-white text-xs font-semibold drop-shadow-md">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
