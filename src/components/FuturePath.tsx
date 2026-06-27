/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Plane, Briefcase, Coffee, Sparkles } from 'lucide-react';
import { FutureMilestone } from '../types';

const MILESTONES: FutureMilestone[] = [
  {
    id: "home",
    title: "Cozy Sanctuary",
    year: "Future Milestone 1",
    emoji: "🏡",
    description: "A beautiful, warm house filled with big windows, soft paper lanterns, bookshelves, and Ghibli-esque coffee setups where we start our mornings together.",
    x: 20,
    y: 80
  },
  {
    id: "travel",
    title: "Global Wanderlust",
    year: "Future Milestone 2",
    emoji: "✈️",
    description: "Travelling to cozy cafés in Paris, walking down ancient lanes in Tokyo, train rides across scenic mountains, and mapping out the world hand-in-hand.",
    x: 45,
    y: 55
  },
  {
    id: "business",
    title: "Empire of Creators",
    year: "Future Milestone 3",
    emoji: "💼",
    description: "Co-founding software businesses, designing interfaces, writing code together, and running creative startups where tech meets human emotion.",
    x: 70,
    y: 35
  },
  {
    id: "grow-old",
    title: "Growing Old Together",
    year: "Our Ultimate Destination",
    emoji: "☕",
    description: "Sipping coffee on the porch at sunset, sharing inside jokes, laughing about our 5-month anniversary page, and loving each other more with every gray hair.",
    x: 90,
    y: 15
  }
];

export default function FuturePath() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [clickedId, setClickedId] = useState<string | null>(MILESTONES[0].id);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-20 relative z-30 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <span className="text-xs font-mono text-rose-gold uppercase tracking-widest block mb-2">The Horizon</span>
        <h3 className="text-3xl md:text-5xl font-serif italic text-ivory">Our Future Path</h3>
        <p className="text-xs font-mono text-ivory/50 mt-2">Click each glowing node to gaze into our tomorrow</p>
      </motion.div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-10 items-center relative min-h-[450px]">
        
        {/* Left Interactive SVG Map */}
        <div className="md:col-span-7 bg-charcoal/60 backdrop-blur-md border border-rose-gold/25 rounded-3xl p-6 relative aspect-[4/3] w-full flex items-center justify-center overflow-hidden">
          {/* Constellation overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(212,175,55,0.06)_1.5px,transparent_1.5px)] bg-[size:24px_24px] pointer-events-none" />

          {/* SVG Winding Road Path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-rose-gold/30 stroke-2 fill-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Winding glowing road */}
            <motion.path 
              d="M 10,90 Q 25,75 25,60 T 55,40 T 75,25 T 95,10" 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'easeOut' }}
              strokeWidth="2.5"
              strokeDasharray="5 5"
            />
            <motion.path 
              d="M 10,90 Q 25,75 25,60 T 55,40 T 75,25 T 95,10" 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: 'easeOut' }}
              strokeWidth="1"
              stroke="url(#roadGlow)"
            />
            
            <defs>
              <linearGradient id="roadGlow" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFF0F2" />
                <stop offset="50%" stopColor="#B76E79" />
                <stop offset="100%" stopColor="#D4AF37" />
              </linearGradient>
            </defs>
          </svg>

          {/* Glowing Milestones Elements */}
          {MILESTONES.map((m) => {
            const isSelected = clickedId === m.id;
            const isHovered = hoveredId === m.id;

            return (
              <motion.button
                key={m.id}
                style={{
                  position: 'absolute',
                  left: `${m.x}%`,
                  top: `${m.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setClickedId(m.id)}
                onMouseEnter={() => setHoveredId(m.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer border transition-all duration-500 z-10 ${
                  isSelected 
                    ? 'bg-gradient-to-br from-gold to-rose-gold border-white text-white shadow-[0_0_20px_rgba(212,175,55,0.7)]' 
                    : isHovered
                      ? 'bg-[#2a1e1b] border-rose-gold text-rose-gold shadow-[0_0_12px_rgba(183,110,121,0.4)]'
                      : 'bg-charcoal border-rose-gold/35 text-ivory/70'
                }`}
              >
                <span className="text-xl relative z-10">{m.emoji}</span>
                {/* Node pulses */}
                {isSelected && (
                  <span className="absolute -inset-1 rounded-full bg-gold/30 animate-ping" />
                )}
              </motion.button>
            );
          })}

          {/* Star at the top end */}
          <div className="absolute right-[5%] top-[8%] text-gold animate-bounce">
            <Sparkles className="w-5 h-5 filter drop-shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
          </div>
        </div>

        {/* Right Info Card Panel */}
        <div className="md:col-span-5 h-full flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {MILESTONES.map((m) => {
              if (m.id !== clickedId) return null;
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.4 }}
                  className="bg-charcoal/60 backdrop-blur-md border border-rose-gold/30 rounded-3xl p-8 shadow-[0_12px_36px_rgba(0,0,0,0.4)]"
                >
                  <span className="text-xs font-mono text-rose-gold uppercase tracking-wider block mb-1">
                    {m.year}
                  </span>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{m.emoji}</span>
                    <h4 className="text-xl md:text-2.5xl font-display font-semibold text-ivory tracking-tight">
                      {m.title}
                    </h4>
                  </div>
                  <p className="text-ivory/80 font-serif leading-relaxed text-sm md:text-base italic">
                    "{m.description}"
                  </p>
                  
                  {/* Small custom decorative software tag since he is an engineer */}
                  <div className="mt-6 pt-4 border-t border-rose-gold/15 flex items-center justify-between text-[10px] font-mono text-ivory/40">
                    <span>Path segment: APPROVED</span>
                    <span>status: INFINITE</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
