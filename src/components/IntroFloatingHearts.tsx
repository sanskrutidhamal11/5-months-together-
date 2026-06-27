import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface HeartParticle {
  id: number;
  x: number; // percentage
  size: number;
  duration: number;
  delay: number;
  color: string;
  horizontalSwing: number;
}

export default function IntroFloatingHearts() {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  useEffect(() => {
    // Initial batch of falling hearts
    const initialHearts: HeartParticle[] = Array.from({ length: 20 }, (_, i) => createHeart(i));
    setHearts(initialHearts);

    // Add new hearts continuously
    const interval = setInterval(() => {
      setHearts((prev) => {
        // Keep active list under 35 particles for performance
        const filtered = prev.filter((h) => h.delay + h.duration * 1000 > 100);
        const newHeart = createHeart(Date.now());
        return [...filtered.slice(-25), newHeart];
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const createHeart = (id: number): HeartParticle => {
    const heartColors = [
      'rgba(244, 63, 94, 0.4)',  // Rose red
      'rgba(225, 29, 72, 0.45)',  // Deep rose
      'rgba(251, 113, 133, 0.35)', // Light rose
      'rgba(190, 24, 74, 0.4)'    // Deep crimson
    ];
    return {
      id,
      x: Math.random() * 100,
      size: Math.random() * 16 + 12, // 12px to 28px size
      duration: Math.random() * 10 + 10, // 10 to 20 seconds
      delay: Math.random() * -10, // start some mid-way
      color: heartColors[Math.floor(Math.random() * heartColors.length)],
      horizontalSwing: Math.random() * 60 - 30 // left-to-right drift
    };
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ 
              y: '-10%', 
              x: `${h.x}%`, 
              opacity: 0,
              scale: 0.8
            }}
            animate={{ 
              y: '110%',
              x: [
                `${h.x}%`, 
                `${h.x + h.horizontalSwing / 2}%`, 
                `${h.x - h.horizontalSwing / 2}%`, 
                `${h.x + h.horizontalSwing}%`
              ],
              opacity: [0, 0.75, 0.75, 0],
              scale: [0.8, 1.1, 1, 0.8]
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: h.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: h.delay < 0 ? 0 : h.delay
            }}
            style={{
              position: 'absolute',
              width: h.size,
              height: h.size,
            }}
          >
            <svg viewBox="0 0 24 24" fill={h.color} className="w-full h-full filter drop-shadow-[0_2px_6px_rgba(244,63,94,0.15)]">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
