/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { PolaroidPhoto } from '../types';

const POLAROIDS: PolaroidPhoto[] = [
  {
    id: 1,
    word: "I",
    sketchType: "beginning",
    rotation: -4
  },
  {
    id: 2,
    word: "love",
    sketchType: "train",
    rotation: 3
  },
  {
    id: 3,
    word: "you",
    sketchType: "meeting",
    rotation: -2
  },
  {
    id: 4,
    word: "so",
    sketchType: "dreams",
    rotation: 5
  },
  {
    id: 5,
    word: "much",
    sketchType: "forever",
    rotation: -3
  }
];

export default function PolaroidPhotos() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 pt-16 pb-2 relative z-30 flex flex-col items-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <span className="text-sm font-mono text-rose-gold uppercase tracking-widest block mb-2">Captured Moments</span>
        <h3 className="text-3xl md:text-5xl font-serif italic text-ivory">Our Visual Diary</h3>
      </motion.div>

      {/* Hanging String Container */}
      <div className="relative w-full min-h-[500px] flex justify-center items-start">
        {/* String */}
        <div className="absolute top-8 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-rose-gold/25 to-transparent z-0 shadow-sm" />
        
        {/* Tiny hanging dots/nails on side */}
        <div className="absolute top-7 left-4 w-2 h-2 rounded-full bg-rose-gold/40" />
        <div className="absolute top-7 right-4 w-2 h-2 rounded-full bg-rose-gold/40" />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-4xl relative z-10 pt-10">
          {POLAROIDS.map((photo, index) => {
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: -100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 70, 
                  damping: 15,
                  delay: index * 0.2 
                }}
                className="relative flex flex-col items-center"
                style={{ originY: 0 }}
              >
                {/* Tiny wooden pin/clip */}
                <div className="absolute -top-6 w-3 h-8 bg-amber-700/60 rounded-sm border border-amber-800/25 z-20 shadow-sm flex flex-col justify-between items-center py-1">
                  <div className="w-1.5 h-1.5 bg-rose-gold/40 rounded-full" />
                </div>

                {/* Polaroid card */}
                <motion.div
                  style={{ rotate: photo.rotation }}
                  whileHover={{ 
                    scale: 1.12, 
                    rotate: 0, 
                    zIndex: 40,
                    boxShadow: "0 20px 40px rgba(183, 110, 121, 0.15)"
                  }}
                  className="w-44 bg-white p-3.5 pt-4 pb-6 border border-rose-gold/10 shadow-[0_12px_24px_rgba(183,110,121,0.06)] rounded-sm flex flex-col items-center relative transition-shadow duration-300"
                >
                  {/* Photo area */}
                  <div className="w-full aspect-square bg-cream border border-charcoal/5 rounded-sm overflow-hidden flex items-center justify-center relative select-none">
                    {/* Tiny hearts on frame */}
                    <div className="absolute top-1 left-1.5 text-[8px] text-rose-gold opacity-40">❤️</div>
                    <div className="absolute top-1 right-1.5 text-[8px] text-rose-gold opacity-40">❤️</div>

                    {/* Vector illustration sketch inside Polaroid */}
                    {photo.sketchType === 'beginning' && (
                      <svg className="w-24 h-24 stroke-rose-gold/80 fill-none" viewBox="0 0 100 100">
                        <motion.path d="M20,65 L80,65" strokeWidth="1" strokeDasharray="3 3" />
                        <circle cx="50" cy="45" r="18" className="stroke-rose-gold/40" />
                        {/* Chat bubbles */}
                        <path d="M 32,32 Q 40,22 50,30" strokeWidth="1.5" />
                        <path d="M 68,58 Q 60,68 48,58" strokeWidth="1.5" />
                        {/* Tiny sparkles */}
                        <path d="M 22,25 L25,28 M 25,25 L22,28" strokeWidth="1" />
                        <path d="M 74,28 L77,31 M 77,28 L74,31" strokeWidth="1" />
                        <Heart className="absolute w-4 h-4 text-rose-gold animate-bounce" style={{ bottom: '40%', right: '40%' }} />
                      </svg>
                    )}

                    {photo.sketchType === 'train' && (
                      <svg className="w-24 h-24 stroke-rose-gold/80 fill-none" viewBox="0 0 100 100">
                        {/* Train tracks */}
                        <line x1="10" y1="75" x2="90" y2="75" strokeWidth="2" />
                        <line x1="20" y1="75" x2="20" y2="85" strokeWidth="1" />
                        <line x1="40" y1="75" x2="40" y2="85" strokeWidth="1" />
                        <line x1="60" y1="75" x2="60" y2="85" strokeWidth="1" />
                        <line x1="80" y1="75" x2="80" y2="85" strokeWidth="1" />
                        {/* Locomotive shape */}
                        <rect x="25" y="40" width="45" height="25" rx="3" strokeWidth="1.5" />
                        <rect x="55" y="32" width="12" height="15" strokeWidth="1.5" />
                        <circle cx="35" cy="70" r="5" strokeWidth="1.5" />
                        <circle cx="60" cy="70" r="5" strokeWidth="1.5" />
                        {/* Heart smoke */}
                        <path d="M 61,25 Q 68,10 75,20" strokeWidth="1" strokeDasharray="2 2" />
                        <path d="M 75,20 Q 82,10 88,18" strokeWidth="1" strokeDasharray="2 2" />
                      </svg>
                    )}

                    {photo.sketchType === 'meeting' && (
                      <svg className="w-24 h-24 stroke-rose-gold/80 fill-none" viewBox="0 0 100 100">
                        {/* Table */}
                        <ellipse cx="50" cy="75" rx="35" ry="8" strokeWidth="1.5" />
                        <line x1="50" y1="75" x2="50" y2="92" strokeWidth="1.5" />
                        {/* Coffee cups */}
                        <path d="M38,62 C38,58 48,58 48,62 L48,68 C48,70 38,70 38,68 Z" strokeWidth="1.5" />
                        <path d="M48,63 C51,63 51,67 48,67" strokeWidth="1.5" />
                        
                        <path d="M62,62 C62,58 52,58 52,62 L52,68 C52,70 62,70 62,68 Z" strokeWidth="1.5" />
                        <path d="M52,63 C49,63 49,67 52,67" strokeWidth="1.5" />
                        {/* Heart steam */}
                        <path d="M43,55 Q 46,45 44,40" strokeWidth="1" />
                        <path d="M57,55 Q 54,45 56,40" strokeWidth="1" />
                        <Heart className="absolute w-3.5 h-3.5 text-rose-gold animate-pulse fill-rose-gold/10" style={{ top: '25%', left: '42%' }} />
                      </svg>
                    )}

                    {photo.sketchType === 'dreams' && (
                      <svg className="w-24 h-24 stroke-rose-gold/80 fill-none" viewBox="0 0 100 100">
                        {/* World lines */}
                        <circle cx="50" cy="45" r="28" strokeWidth="1" strokeDasharray="2 2" />
                        <path d="M 22,45 C 35,45 65,45 78,45" strokeWidth="1" />
                        <path d="M 50,17 C 50,30 50,60 50,73" strokeWidth="1" />
                        
                        {/* Connecting signal thread */}
                        <motion.path 
                          d="M 30,30 Q 50,10 70,30" 
                          strokeWidth="1.5"
                          strokeDasharray="4 2"
                          animate={{ strokeDashoffset: [0, -10] }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        />
                        {/* Floating stars */}
                        <path d="M 32,25 L35,28 M 35,25 L32,28" strokeWidth="1" />
                        <path d="M 68,28 L71,31 M 71,28 L68,31" strokeWidth="1" />
                      </svg>
                    )}

                    {photo.sketchType === 'forever' && (
                      <svg className="w-24 h-24 stroke-rose-gold/80 fill-none" viewBox="0 0 100 100">
                        {/* Couple/Holding hands stylized */}
                        <path d="M30,80 C30,60 45,60 45,80" strokeWidth="1.5" />
                        <circle cx="37.5" cy="50" r="6" strokeWidth="1.5" />
                        
                        <path d="M70,80 C70,60 55,60 55,80" strokeWidth="1.5" />
                        <circle cx="62.5" cy="50" r="6" strokeWidth="1.5" />
                        
                        {/* Hands joined */}
                        <path d="M43,65 L57,65" strokeWidth="1.5" />
                        
                        {/* Tiny building/house symbol on top */}
                        <path d="M 50,22 L 38,32 L 62,32 Z" strokeWidth="1" />
                        <rect x="42" y="32" width="16" height="12" strokeWidth="1" />
                        <Heart className="absolute w-4 h-4 text-rose-gold animate-bounce" style={{ top: '10%', left: '42%' }} />
                      </svg>
                    )}
                  </div>

                  {/* Caption */}
                  <div className="w-full pt-4 pb-2 text-center">
                    <span className="font-script text-5.5xl md:text-6xl leading-none text-rose-gold block font-bold select-none">
                      {photo.word}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
