"use client";

import React from 'react';
import './ReelsButton.css';

interface ReelsButtonProps {
  isDarkText?: boolean;
}

const ReelsButton = ({ isDarkText = false }: ReelsButtonProps) => {
  return (
    <div className={`reels-glass-btn ${isDarkText ? 'text-gray-800 hover:text-black' : 'text-white'}`}>
      <img src="/08b1b2257696356af258a73cb2776de9-removebg-preview.png" alt="Reels Logo" className="w-[18px] h-[18px] mr-2 object-contain rounded-[4px]" />
      <span>Reels</span>
    </div>
  );
}

export default ReelsButton;
