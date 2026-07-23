"use client";

import React from 'react';
import './ReelsButton.css';
import { PlaySquare } from 'lucide-react';

interface ReelsButtonProps {
  isDarkText?: boolean;
}

const ReelsButton = ({ isDarkText = false }: ReelsButtonProps) => {
  return (
    <div className={`reels-glass-btn ${isDarkText ? 'text-gray-800 hover:text-black' : 'text-white'}`}>
      <PlaySquare className="w-[18px] h-[18px] mr-2 opacity-90" />
      <span>Reels</span>
    </div>
  );
}

export default ReelsButton;
