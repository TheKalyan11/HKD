"use client";

import React from 'react';
import './ReelsButton.css';

interface ReelsButtonProps {
  isDarkText?: boolean;
}

const ReelsButton = ({ isDarkText = false }: ReelsButtonProps) => {
  return (
    <div className={`reels-glass-btn ${isDarkText ? 'text-gray-800 hover:text-black' : 'text-white'}`}>
      <img src="https://png.pngtree.com/png-vector/20260118/ourlarge/pngtree-instagram-reels-logo-featuring-a-play-button-within-gradient-square-resembling-png-image_18532941.webp" alt="Reels Logo" className="w-[18px] h-[18px] mr-2 object-cover rounded-[4px]" />
      <span>Reels</span>
    </div>
  );
}

export default ReelsButton;
