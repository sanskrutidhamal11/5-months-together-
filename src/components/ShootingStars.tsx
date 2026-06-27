import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Star {
  id: number;
  startX: number; // percentage
  startY: number; // percentage
  length: number; // px
  duration: number; // seconds
  delay: number; // seconds
}

export default function ShootingStars() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate a set of 12 shooting stars starting from the top-right region
    const initialStars: Star[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      startX: Math.random() * 60 + 40, // 40% to 100% (right side of screen)
      startY: Math.random() * 25 - 15, // -15% to 10% (top area)
      length: Math.random() * 120 + 80, // 80px to 200px
      duration: Math.random() * 4 + 6, // 6 to 10 seconds (slow romantic fall)
      delay: Math.random() * 5 // 0 to 5 seconds delay
    }));
    setStars(initialStars);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            opacity: 0,
            scale: 0.8,
            rotate: -45, // Angled down-left trajectory
            width: 0,
          }}
          animate={{
            // Translate down-left along the diagonal axis
            x: [0, -600],
            y: [0, 600],
            width: [0, star.length, star.length, 0],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            repeatDelay: Math.random() * 4 + 2,
            ease: "linear",
            delay: star.delay,
          }}
          className="absolute h-[1.5px] bg-gradient-to-r from-white via-rose-gold/30 to-transparent"
          style={{
            transformOrigin: 'left center', // The head of the star is at the left side of the line
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)',
          }}
        />
      ))}
    </div>
  );
}
