/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, BookOpen, ChevronDown, Play } from 'lucide-react';
import FloatingParticles from './components/FloatingParticles';
import BackgroundMusic from './components/BackgroundMusic';
import SecretSecrets from './components/SecretSecrets';
import HeartQuest from './components/HeartQuest';
import PolaroidPhotos from './components/PolaroidPhotos';
import StoryBook from './components/StoryBook';
import EnvelopeLetter from './components/EnvelopeLetter';
import FuturePath from './components/FuturePath';
import FinalScene from './components/FinalScene';

type ScreenState = 'intro' | 'journey' | 'anniversary' | 'diary' | 'final';

export default function App() {
  const [screenState, setScreenState] = useState<ScreenState>('intro');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [triggerMusic, setTriggerMusic] = useState(false);
  const [collectedHearts, setCollectedHearts] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  // Intro text segments fade sequence
  const [introStep, setIntroStep] = useState(0);

  useEffect(() => {
    if (screenState === 'intro') {
      const timers = [
        setTimeout(() => setIntroStep(1), 1600), // Aaho...
        setTimeout(() => setIntroStep(2), 3500), // It is five months of love.
        setTimeout(() => setIntroStep(3), 5000), // Show Begin button
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [screenState]);

  const handleStartJourney = () => {
    setTriggerMusic(true);
    setIsMusicPlaying(true);
    setScreenState('journey');
  };

  const handleAllHeartsCollected = () => {
    // Switch to anniversary overlay celebration!
    setScreenState('anniversary');
  };

  const handleUnwrapScrapbook = () => {
    setScreenState('diary');
  };

  return (
    <div id="app-root" className="min-h-screen bg-[#12100E] text-ivory selection:bg-rose-gold/20 selection:text-rose-gold overflow-x-hidden relative">
      
      {/* Night Sky Stars Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,240,0.15)_1.2px,transparent_1.2px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Cosmic background glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(183,110,121,0.15)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.1)_0%,transparent_60%)] pointer-events-none" />

      {/* Floating particles (petals, gold sparkles, stars, hearts) */}
      {screenState !== 'intro' && screenState !== 'final' && <FloatingParticles />}

      {/* Background Music button */}
      {screenState !== 'intro' && screenState !== 'final' && (
        <BackgroundMusic 
          isPlaying={isMusicPlaying} 
          setIsPlaying={setIsMusicPlaying} 
          triggerPlay={triggerMusic} 
        />
      )}

      {/* Hidden confessional clickables */}
      {screenState === 'diary' && <SecretSecrets />}

      <AnimatePresence mode="wait">
        
        {/* CHAPTER 1: INTRO */}
        {screenState === 'intro' && (
          <motion.div
            key="intro-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
            className="fixed inset-0 z-50 bg-[#12100E] flex flex-col items-center justify-center p-6 text-center"
          >
            {/* Subtle floating background stars for intro */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,240,0.15)_1.2px,transparent_1.2px)] bg-[size:16px_16px] pointer-events-none" />

            <div className="max-w-xl space-y-8 select-none relative z-10">
              <AnimatePresence>
                {introStep >= 1 && (
                  <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 0.85, y: 0 }}
                    transition={{ duration: 1.2 }}
                    className="font-script text-5xl md:text-6.5xl text-rose-gold tracking-wide"
                  >
                    Aaho...
                  </motion.h1>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {introStep >= 2 && (
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 0.9, y: 0 }}
                    transition={{ duration: 1.2 }}
                    className="font-serif text-xl md:text-3xl text-rose-gold font-medium tracking-tight"
                  >
                    It is 5 months of our Love!
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Begin Action */}
              <AnimatePresence>
                {introStep >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="pt-8"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(183,110,121,0.2)' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleStartJourney}
                      className="px-8 py-3.5 bg-rose-gold hover:bg-rose-gold/90 text-white rounded-full font-display font-medium text-sm md:text-base tracking-widest shadow-md flex items-center gap-3 mx-auto cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>❤️ 11:11 ❤️</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* CHAPTER 2: HEART QUEST (JOURNEY) */}
        {screenState === 'journey' && (
          <motion.div
            key="journey-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen py-12 flex flex-col justify-between"
          >
            {/* Minimal Header */}
            <header className="w-full max-w-6xl mx-auto px-6 flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-gold fill-current" />
                <span className="font-display font-semibold text-ivory text-sm tracking-widest uppercase">
                  5 Months of Devotion
                </span>
              </div>
              <span className="text-[10px] font-mono text-ivory/40 uppercase tracking-widest">
                Status: IN QUEST
              </span>
            </header>

            <HeartQuest 
              onAllCollected={handleAllHeartsCollected} 
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              collectedHearts={collectedHearts}
              setCollectedHearts={setCollectedHearts}
            />

            {/* Minimal Footer */}
            <footer className="w-full text-center py-4 text-[10px] font-mono text-ivory/30 tracking-widest select-none">
              S & A • Handcrafted with love
            </footer>
          </motion.div>
        )}

        {/* CHAPTER 3: ANNIVERSARY REVEAL CLIMAX POPUP */}
        {screenState === 'anniversary' && (
          <motion.div
            key="anniversary-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#12100E] flex flex-col items-center justify-center p-6 text-center"
          >
            {/* Star Grid Background */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,240,0.15)_1.2px,transparent_1.2px)] bg-[size:16px_16px] pointer-events-none" />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              className="max-w-xl space-y-8 select-none p-8 border border-rose-gold/25 bg-charcoal/80 backdrop-blur-md rounded-3xl shadow-[0_20px_50px_rgba(183,110,121,0.25)] relative z-10"
            >
              <div className="text-rose-gold animate-bounce text-5xl flex justify-center mb-4">
                ❤️
              </div>

              <span className="text-xs font-mono text-rose-gold uppercase tracking-widest block">
                Quest Completed Successfully
              </span>

              <h2 className="text-4xl md:text-5.5xl font-display font-bold text-ivory tracking-tight leading-none">
                HAPPY <br />
                <span className="text-rose-gold font-serif italic font-normal text-5xl md:text-7.5xl block my-4">5 MONTH</span> 
                ANNIVERSARY
              </h2>

              <p className="font-script text-4xl text-rose-gold tracking-wide">
                Aaho ❤️
              </p>

              <div className="pt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUnwrapScrapbook}
                  className="px-8 py-3.5 bg-rose-gold text-white hover:bg-rose-gold/90 rounded-full font-display font-medium text-sm tracking-widest flex items-center gap-2 mx-auto cursor-pointer shadow-md border-2 border-white/20"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>UNWRAP OUR SCRAPBOOK ✨</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* CHAPTER 4: DIARY / SCRAPBOOK EXCURSION */}
        {screenState === 'diary' && (
          <motion.div
            key="diary-screen"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 1.2 } }}
            className="min-h-screen relative"
          >
            {/* Header */}
            <header className="w-full max-w-6xl mx-auto px-6 py-8 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-gold fill-current" />
                <span className="font-display font-semibold text-ivory text-xs tracking-widest uppercase">
                  S & A • Love Story
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold animate-pulse" />
                <span className="text-[10px] font-mono text-ivory/50 uppercase tracking-widest">
                  Anniversary Edition
                </span>
              </div>
            </header>

            {/* Polaroid moments string */}
            <PolaroidPhotos />

            {/* Scrapbook Chapters (10 story cards bento style) */}
            <StoryBook />

            {/* Wax Envelope Sealed Letter */}
            <EnvelopeLetter />

            {/* Future path disappearing into stars */}
            <FuturePath />

            {/* Final transition call to action button */}
            <div className="w-full flex flex-col items-center justify-center py-24 border-t border-rose-gold/10">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center space-y-6"
              >
                <span className="font-script text-3xl text-rose-gold">And finally...</span>
                <p className="font-serif text-ivory/60 text-sm max-w-sm mx-auto">
                  There is one last thing I want to ask you, Aaho.
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setScreenState('final')}
                  className="px-10 py-4 bg-rose-gold text-white rounded-full font-display font-medium text-sm tracking-widest shadow-md flex items-center gap-2 mx-auto cursor-pointer"
                >
                  <span>I HAVE ONE LAST THING... Click Me 💖</span>
                </motion.button>
              </motion.div>
            </div>

            {/* Footer */}
            <footer className="w-full text-center py-8 text-[10px] font-mono text-ivory/30 tracking-widest select-none">
              © 2026 S & A • ALWAYS AND FOREVER
            </footer>
          </motion.div>
        )}

        {/* CHAPTER 5: FINAL PROPOSAL */}
        {screenState === 'final' && (
          <FinalScene isActive={screenState === 'final'} />
        )}

      </AnimatePresence>
    </div>
  );
}
