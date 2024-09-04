"use client";
import React from 'react';

export const SubtleBackgroundAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1]">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-cyan-100 animate-gradient-x"></div>
      <div className="absolute inset-0 opacity-50">
        <div className="absolute h-56 w-56 rounded-full bg-purple-300 blur-xl animate-blob"></div>
        <div className="absolute h-56 w-56 rounded-full bg-yellow-300 blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute h-56 w-56 rounded-full bg-pink-300 blur-xl animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
};