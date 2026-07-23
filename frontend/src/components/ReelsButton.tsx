"use client";

import React from 'react';
import './ReelsButton.css';
import { PlaySquare } from 'lucide-react';

const ReelsButton = () => {
  return (
    <div className="reels-glass-btn">
      <PlaySquare className="w-[18px] h-[18px] mr-2 opacity-90" />
      <span>Reels</span>
    </div>
  );
}

export default ReelsButton;
