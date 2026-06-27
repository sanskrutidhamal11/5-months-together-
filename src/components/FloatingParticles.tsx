/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: number;
  x: number; // percentage
  size: number;
  duration: number;
  delay: number;
  type: 'petal' | 'heart' | 'sparkle' | 'star';
  color: string;
  rotation: number;
  horizontalSwing: number;
}

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Initial batch of particles
    const initialParticles: Particle[] = Array.from({ length: 25 }, (_, i) => createParticle(i));
    setParticles(initialParticles);

    // Keep adding particles occasionally
    const interval = setInterval(() => {
      setParticles((prev) => {
        // Keep active list under 40 particles for performance
        const filtered = prev.filter((p) => p.delay + p.duration * 1000 > 100);
        const newParticle = createParticle(Date.now());
        return [...filtered.slice(-30), newParticle];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const createParticle = (id: number): Particle => {
    const types: ('petal' | 'heart' | 'sparkle' | 'star')[] = ['petal', 'petal', 'heart', 'sparkle', 'star'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    let color = 'rgba(244, 63, 94, 0.3)'; // soft rose/pink default
    if (type === 'petal') {
      const petalColors = [
        'rgba(255, 192, 203, 0.45)', // soft pink
        'rgba(255, 228, 225, 0.5)',  // misty rose
        'rgba(244, 180, 190, 0.4)',  // cherry blossom
        'rgba(253, 244, 245, 0.6)'   // snow pink
      ];
      color = petalColors[Math.floor(Math.random() * petalColors.length)];
    } else if (type === 'sparkle' || type === 'star') {
      const goldColors = [
        'rgba(212, 175, 55, 0.6)',  // light gold
        'rgba(245, 239, 235, 0.7)', // champagne
        'rgba(255, 255, 240, 0.8)', // ivory sparkles
      ];
      color = goldColors[Math.floor(Math.random() * goldColors.length)];
    }

    return {
      id,
      x: Math.random() * 100,
      size: Math.random() * (type === 'petal' ? 18 : type === 'star' ? 12 : 8) + 6,
      duration: Math.random() * 15 + 15, // 15 to 30 seconds
      delay: Math.random() * -10, // start some in-progress
      type,
      color,
      rotation: Math.random() * 360,
      horizontalSwing: Math.random() * 80 - 40 // swing left/right
    };
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      <AnimatePresence>
        {particles.map((p) => {
          return (
            <motion.div
              key={p.id}
              initial={{ 
                y: '-10%', 
                x: `${p.x}%`, 
                opacity: 0,
                rotate: p.rotation
              }}
              animate={{ 
                y: '110%',
                x: [
                  `${p.x}%`, 
                  `${p.x + p.horizontalSwing / 3}%`, 
                  `${p.x - p.horizontalSwing / 3}%`, 
                  `${p.x + p.horizontalSwing / 2}%`
                ],
                opacity: [0, 0.8, 0.8, 0],
                rotate: p.rotation + 360
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: p.delay < 0 ? 0 : p.delay
              }}
              style={{
                position: 'absolute',
                width: p.size,
                height: p.size,
              }}
            >
              {p.type === 'petal' && (
                <svg viewBox="0 0 24 24" fill={p.color} className="w-full h-full drop-shadow-[0_2px_4px_rgba(183,110,121,0.1)]">
                  {/* Organic petal shape */}
                  <path d="M12 21C12 21 4 16 4 10C4 6 8 3 12 7C16 3 20 6 20 10C20 16 12 21 12 21Z" />
                </svg>
              )}

              {p.type === 'heart' && (
                <svg viewBox="0 0 24 24" fill={p.color} className="w-full h-full drop-shadow-[0_2px_4px_rgba(244,63,94,0.1)]">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              )}

              {p.type === 'sparkle' && (
                <svg viewBox="0 0 24 24" fill={p.color} className="w-full h-full animate-pulse">
                  <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" />
                </svg>
              )}

              {p.type === 'star' && (
                <svg viewBox="0 0 24 24" fill={p.color} className="w-full h-full">
                  <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
                </svg>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
