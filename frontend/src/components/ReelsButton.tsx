"use client";

import React from 'react';
import './ReelsButton.css';

const ReelsButton = () => {
  return (
    <div className="reels-styled-wrapper">
      <div className="btn-wrapper">
        <div className="light" />
        <div className="gradient-layer" style={{animationDelay: '0s', animationDuration: '25s'}} />
        <div className="gradient-layer" style={{animationDelay: '0.15s', animationDuration: '15.9s'}} />
        <div className="gradient-layer" style={{animationDelay: '0.53s', animationDuration: '26.4s'}} />
        <div className="gradient-layer" style={{animationDelay: '0.45s', animationDuration: '17.8s'}} />
        <div className="gradient-layer" style={{animationDelay: '1.6s', animationDuration: '19.2s'}} />
        <div className="gradient-layer" style={{animationDelay: '1.6s', animationDuration: '29.2s'}} />
        <div className="gradient-layer" style={{animationDelay: '1.6s', animationDuration: '20.2s'}} />
        <button className="gradient-btn" tabIndex={-1}>Reels</button>
        <div className="text-overlay">Reels</div>
      </div>
    </div>
  );
}

export default ReelsButton;
