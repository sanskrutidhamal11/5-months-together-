/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Moon, Compass, Sparkles, Coffee, Camera } from 'lucide-react';
import { HiddenSecret } from '../types';

const SECRETS: HiddenSecret[] = [
  {
    id: "sec-heart",
    type: "heart",
    title: "A Whispered Truth",
    message: "I still smile like a fool because of you.",
    iconName: "heart"
  },
  {
    id: "sec-moon",
    type: "moon",
    title: "Midnight Confession",
    message: "I miss you every single day, more than stars in the night.",
    iconName: "moon"
  },
  {
    id: "sec-star",
    type: "star",
    title: "Heavenly Timing",
    message: "11:11 always reminds me of us and our perfect timing.",
    iconName: "star"
  },
  {
    id: "sec-flower",
    type: "flower",
    title: "Our Safe Haven",
    message: "You are, and will always be, my safest place.",
    iconName: "flower"
  },
  {
    id: "sec-coffee",
    type: "coffee",
    title: "A Sweet Echo",
    message: "You are, without a doubt, my absolute favorite notification.",
    iconName: "coffee"
  },
  {
    id: "sec-camera",
    type: "camera",
    title: "A Glowing World",
    message: "My entire world became ten thousand times brighter because of you.",
    iconName: "camera"
  }
];

export default function SecretSecrets() {
  const [activeSecret, setActiveSecret] = useState<HiddenSecret | null>(null);
  const [foundIds, setFoundIds] = useState<string[]>([]);

  const handleDiscoverSecret = (secret: HiddenSecret) => {
    setActiveSecret(secret);
    if (!foundIds.includes(secret.id)) {
      setFoundIds([...foundIds, secret.id]);
    }
  };

  return (
    <>
      {/* Tucked away secret clickable elements scattered in margins */}
      {/* Secret 1: Heart (Top-Left area, floaty) */}
      <motion.button
        whileHover={{ scale: 1.2, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleDiscoverSecret(SECRETS[0])}
        className="fixed left-6 top-24 z-40 text-rose-gold/25 hover:text-rose-gold/70 cursor-pointer p-2 transition-colors duration-300"
        title="Discover a whisper..."
      >
        <Heart className="w-4 h-4 fill-current animate-pulse" />
      </motion.button>

      {/* Secret 2: Moon (Right middle, subtle glow) */}
      <motion.button
        whileHover={{ scale: 1.2, rotate: -15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleDiscoverSecret(SECRETS[1])}
        className="fixed right-8 top-[38%] z-40 text-rose-gold/20 hover:text-rose-gold/60 cursor-pointer p-2 transition-colors duration-300 animate-twinkle"
        title="Discover a whisper..."
      >
        <Moon className="w-4 h-4 fill-current" />
      </motion.button>

      {/* Secret 3: Star (Left middle-lower) */}
      <motion.button
        whileHover={{ scale: 1.3, rotate: 20 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleDiscoverSecret(SECRETS[2])}
        className="fixed left-8 top-[60%] z-40 text-gold/20 hover:text-gold/60 cursor-pointer p-2 transition-colors duration-300"
        title="Discover a whisper..."
      >
        <Sparkles className="w-4 h-4" />
      </motion.button>

      {/* Secret 4: Flower (Right lower) */}
      <motion.button
        whileHover={{ scale: 1.2, rotate: -10 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleDiscoverSecret(SECRETS[3])}
        className="fixed right-10 bottom-32 z-40 text-rose-gold/20 hover:text-rose-gold/60 cursor-pointer p-2 transition-colors duration-300"
        title="Discover a whisper..."
      >
        <span className="text-sm select-none opacity-40 hover:opacity-100 transition-opacity">🌸</span>
      </motion.button>

      {/* Secret 5: Coffee Cup (Left lower bottom margin) */}
      <motion.button
        whileHover={{ scale: 1.25, rotate: 8 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleDiscoverSecret(SECRETS[4])}
        className="fixed left-12 bottom-24 z-40 text-rose-gold/20 hover:text-rose-gold/60 cursor-pointer p-2 transition-colors duration-300 animate-pulse"
        title="Discover a whisper..."
      >
        <Coffee className="w-4 h-4" />
      </motion.button>

      {/* Secret 6: Camera (Top-Right Area near header) */}
      <motion.button
        whileHover={{ scale: 1.2, rotate: -12 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleDiscoverSecret(SECRETS[5])}
        className="fixed right-20 top-8 z-40 text-rose-gold/20 hover:text-rose-gold/60 cursor-pointer p-2 transition-colors duration-300"
        title="Discover a whisper..."
      >
        <Camera className="w-4.5 h-4.5" />
      </motion.button>

      {/* Secrets Counter Indicator (Bottom left margin, very subtle minimalist design) */}
      <div className="fixed left-6 bottom-6 z-40 text-[9px] font-mono text-ivory/40 tracking-widest uppercase select-none pointer-events-none">
        Easter Eggs Found: {foundIds.length} / 6
      </div>

      {/* Floating Reveal Modal overlay */}
      <AnimatePresence>
        {activeSecret && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="w-full max-w-sm bg-[#1E1B18]/95 border-2 border-rose-gold/40 rounded-2xl p-6 md:p-8 text-center shadow-[0_16px_48px_rgba(0,0,0,0.6)] relative"
            >
              <div className="text-3xl mb-3 animate-bounce">
                {activeSecret.type === 'heart' && '💖'}
                {activeSecret.type === 'moon' && '🌙'}
                {activeSecret.type === 'star' && '✨'}
                {activeSecret.type === 'flower' && '🌸'}
                {activeSecret.type === 'coffee' && '☕'}
                {activeSecret.type === 'camera' && '📸'}
              </div>

              <span className="text-[10px] font-mono text-rose-gold uppercase tracking-widest block mb-1">
                {activeSecret.title}
              </span>
              
              <h4 className="font-script text-3xl text-rose-gold tracking-wide mt-3 mb-6 leading-tight">
                "{activeSecret.message}"
              </h4>

              <button
                onClick={() => setActiveSecret(null)}
                className="px-5 py-1.5 bg-rose-gold text-white text-xs font-mono rounded-full hover:bg-rose-gold/90 transition-colors cursor-pointer shadow-sm"
              >
                Close Whisper
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
