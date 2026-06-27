/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface BackgroundMusicProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  triggerPlay: boolean; // Triggers from parent action
}

// ==========================================
// MUSIC CONFIGURATION
// To change the background music to "Zehnaseeb" or any other song:
// 1. Place your audio file (e.g., "Zehnaseeb.mp3") in the public folder.
// 2. Change the MUSIC_URL constant below to "/Zehnaseeb.mp3"
// ==========================================
const MUSIC_URL = 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Debussy_-_Clair_de_Lune.mp3';

export default function BackgroundMusic({ isPlaying, setIsPlaying, triggerPlay }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize audio element
    audioRef.current = new Audio(MUSIC_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.45; // Soft background level

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log('Audio playback failed or was prevented:', err);
          setIsPlaying(false);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, setIsPlaying]);

  useEffect(() => {
    // Trigger from outer actions (e.g. clicking the "Begin" button)
    if (triggerPlay && audioRef.current && !isPlaying) {
      setIsPlaying(true);
    }
  }, [triggerPlay, isPlaying, setIsPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div id="audio-controller" className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-cream/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-rose-gold/20 flex items-center gap-2 shadow-sm pointer-events-none"
          >
            {/* Soft equalizing waves */}
            <div className="flex items-end gap-0.5 h-3">
              {[0, 1, 2, 3, 4].map((index) => (
                <motion.div
                  key={index}
                  className="w-0.75 bg-rose-gold rounded-full"
                  animate={{
                    height: ['20%', '100%', '20%'],
                  }}
                  transition={{
                    duration: 0.8 + index * 0.15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
            <span className="text-xs font-mono text-rose-gold tracking-tight">Debussy: Clair de Lune</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className="w-11 h-11 rounded-full bg-cream shadow-[0_4px_12px_rgba(183,110,121,0.15)] border border-rose-gold/30 flex items-center justify-center text-rose-gold cursor-pointer relative group overflow-hidden"
        title={isPlaying ? 'Pause melody' : 'Play melody'}
      >
        <div className="absolute inset-0 bg-softpink opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10">
          {isPlaying ? (
            <Volume2 className="w-5 h-5 animate-pulse" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </div>
      </motion.button>
    </div>
  );
}
