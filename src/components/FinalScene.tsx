/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Star, Sparkles } from 'lucide-react';

interface FinalSceneProps {
  isActive: boolean;
}

interface ClimaxParticle {
  id: number;
  emoji: string;
  x: number;
  y: number;
  scale: number;
  duration: number;
}

export default function FinalScene({ isActive }: FinalSceneProps) {
  const [yesPressed, setYesPressed] = useState(false);
  const [climaxParticles, setClimaxParticles] = useState<ClimaxParticle[]>([]);
  const [triggerShootingStar, setTriggerShootingStar] = useState(false);

  useEffect(() => {
    if (isActive) {
      // Trigger a shooting star shortly after entering the final scene
      const timer = setTimeout(() => {
        setTriggerShootingStar(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  const handleYesPressed = () => {
    setYesPressed(true);
    
    // Generate a massive shower of beautiful heart and petal emojis
    const emojis = ['❤️', '💖', '💝', '🌸', '✨', '🌹', '💕', '🧁'];
    const generated: ClimaxParticle[] = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: Math.random() * 100,
      y: 110, // starts below screen
      scale: Math.random() * 1.5 + 0.6,
      duration: Math.random() * 4 + 3 // 3-7 seconds
    }));
    
    setClimaxParticles(generated);
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#12100E] text-ivory flex flex-col items-center justify-center overflow-hidden">
      {/* Night Sky Stars */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,240,0.15)_1.2px,transparent_1.2px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Crescent Moon Visual */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.85, scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute top-16 right-16 w-16 h-16 rounded-full bg-transparent shadow-[10px_10px_0_0_#F7E7CE] filter drop-shadow-[0_0_12px_rgba(247,231,206,0.3)] pointer-events-none"
      />

      {/* Shooting Star Animation */}
      <AnimatePresence>
        {triggerShootingStar && (
          <motion.div
            initial={{ x: '100vw', y: '-20vh', opacity: 1, scaleX: 1 }}
            animate={{ x: '-20vw', y: '60vh', opacity: [1, 1, 0], scaleX: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
            className="absolute w-24 h-0.5 bg-gradient-to-r from-white to-transparent origin-right -rotate-[35deg] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* MAIN SCREEN INTERACTIVE QUESTION */}
      <div className="relative z-10 w-full max-w-xl text-center px-6">
        <AnimatePresence mode="wait">
          {!yesPressed ? (
            <motion.div
              key="climax-ask"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center"
            >
              <Heart className="w-16 h-16 text-rose-600 fill-current mb-8 animate-pulse shadow-glow" />

              <h2 className="text-4xl md:text-6xl font-serif italic text-[#F5EFEB] mb-12 tracking-wide leading-tight">
                Be Mine Forever?
              </h2>

              <motion.button
                whileHover={{ scale: 1.12, boxShadow: '0 0 32px rgba(244, 63, 94, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYesPressed}
                className="px-12 py-5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-display font-semibold text-lg tracking-widest shadow-[0_8px_32px_rgba(244,63,94,0.3)] cursor-pointer border-2 border-white/20"
              >
                ❤️ YES ❤️
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="climax-success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2.5 }}
              className="flex flex-col items-center"
            >
              {/* Confetti Explosion / Rain */}
              {climaxParticles.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ y: '110vh', x: `${p.x}vw`, rotate: 0, opacity: 0 }}
                  animate={{ 
                    y: '-10vh', 
                    x: `${p.x + (Math.random() * 20 - 10)}vw`, 
                    rotate: 360,
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{ duration: p.duration, ease: 'easeOut', repeat: Infinity }}
                  className="absolute pointer-events-none z-0"
                  style={{
                    fontSize: `${p.scale * 1.5}rem`,
                  }}
                >
                  {p.emoji}
                </motion.div>
              ))}

              <div className="z-10 relative mt-8 space-y-6">
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="font-script text-5xl md:text-6.5xl text-[#F7E7CE] tracking-wider"
                >
                  I'll choose you today.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 1.8 }}
                  className="font-script text-5xl md:text-6.5xl text-[#F7E7CE] tracking-wider"
                >
                  Tomorrow.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2.2, delay: 3.2 }}
                  className="font-script text-6xl md:text-7.5xl text-rose-400 fill-current tracking-widest block font-bold"
                >
                  Always.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.9, scale: 1 }}
                  transition={{ duration: 2, delay: 5 }}
                  className="pt-12 text-xs font-mono text-ivory/30 tracking-widest uppercase"
                >
                  HAPPY 5 MONTHS AAHO • S & A FOREVER
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
