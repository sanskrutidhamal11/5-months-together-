/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, Sparkles } from 'lucide-react';

export default function EnvelopeLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBroken, setIsBroken] = useState(false);
  const [isUnfolded, setIsUnfolded] = useState(false);

  const handleOpenEnvelope = () => {
    if (!isBroken) {
      setIsBroken(true);
      // Let the seal break first, then fold flap open
      setTimeout(() => {
        setIsOpen(true);
        // Let flap open, then pull out and unfold paper
        setTimeout(() => {
          setIsUnfolded(true);
        }, 1200);
      }, 800);
    }
  };

  if (isUnfolded) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-16 relative z-30 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-mono text-rose-gold uppercase tracking-widest block mb-2">The Culmination</span>
          <h3 className="text-3xl md:text-5xl font-serif italic text-ivory">The Sealed Promise</h3>
          <p className="text-sm font-mono text-ivory/65 mt-2">.... and here's what I have to say</p>
        </motion.div>

        {/* Unfolded Love Letter Panel (In flow, relative) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 50, damping: 15 }}
          className="w-full max-w-4xl md:max-w-5xl mx-auto z-40 bg-[#FCF8F2] border-2 border-rose-gold/45 shadow-[0_24px_60px_rgba(0,0,0,0.3)] rounded-2xl p-8 md:p-14 text-[#2D2621] relative"
        >
          <div className="absolute top-4 right-6 text-gold animate-pulse">
            <Sparkles className="w-5 h-5" />
          </div>

          {/* Letter Header */}
          <div className="text-center mb-10 border-b border-rose-gold/15 pb-6">
            <span className="font-script text-6xl md:text-7.5xl text-[#B76E79] tracking-wide block">
              My Dearest Aaho,
            </span>
            <span className="text-xs md:text-sm font-mono text-[#5D5045]/70 tracking-widest block mt-2">
              5 MONTHS OF INFINITE DEVOTION
            </span>
          </div>

          {/* Letter Body Text with writing paper lines */}
          <div 
            className="font-serif text-[#3D322A] text-base md:text-lg text-justify px-2 md:px-6 relative"
            style={{
              backgroundImage: 'linear-gradient(rgba(183, 110, 121, 0.12) 1px, transparent 1px)',
              backgroundSize: '100% 2.2rem',
              lineHeight: '2.2rem',
              paddingTop: '0.4rem'
            }}
          >
            <p className="mb-[2.2rem]">
              If someone had asked me five months ago what love would feel like, I could never have described it<br/>
              Today I can 🥹<br/>
              Love is waiting for 11:11 because I know you'll say 'I love you' <br/>
              Love is smiling at my phone when your name appears<br/>
              Love is feeling safe even when hundreds of kilometers separate us<br/>
              Love is dreaming about a future where distance becomes an old story we smile about<br/>
              Love. is me talking about you non stop in the house<br/>
              Love is missing you in the smallest moments of the day <br/>
              Love is looking into your eyes so lovingly that it feels like home <br/>
              Love is biting you with the intention to eat you (my handsome man 😘)<br/>
              Love is having a lifetime subscription of forehead kisses 🫶<br/>
              Love is absolutely me trying to make a website 😂<br/>
              Love is you ❤️<br/>
              and you are mine 💝
            </p>
            <p className="mb-[2.2rem]">
              Five months ago, we became 'us'<br/>
              Today is simply another page in the beautiful story we're writing together.
            </p>
            <p className="mb-[2.2rem]">
              Whether we're celebrating our 5th month, our 5th year, or our 50th anniversary,<br/>
              I hope I still get to look at you with the same love and admiration I have today
            </p>
            <p className="mb-[2.2rem] pb-[0.2rem]">
              Happy 5-month anniversary, my love <br/>
              Thank you for choosing me every single day<br/>
              I choose you too today, tomorrow, and every day that follows<br/>
              I love you sooooooooooo much my darling 🌏💝<br/>
              I wish to be your wifey in every universe 💍
            </p>
          </div>

          {/* Letter Footer */}
          <div className="mt-12 text-right border-t border-rose-gold/15 pt-6 pr-4">
            <span className="text-xs md:text-sm font-mono text-[#5D5045]/70 uppercase block tracking-wider">
              With all my love,
            </span>
            <span className="font-script text-4xl text-[#B76E79] block mt-2">
              Bayko ❤️
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-20 relative z-30 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <span className="text-sm font-mono text-rose-gold uppercase tracking-widest block mb-2">The Culmination</span>
        <h3 className="text-3xl md:text-5xl font-serif italic text-ivory">The Sealed Promise</h3>
        <p className="text-sm font-mono text-ivory/65 mt-2">.... and here's what I have to say</p>
      </motion.div>

      {/* Envelope Stage */}
      <div className="relative w-full max-w-lg h-[400px] flex items-center justify-center">
        <motion.div
          exit={{ opacity: 0, scale: 0.9, y: 30, transition: { duration: 0.8 } }}
          className="relative w-full max-w-[420px] aspect-[4/3] bg-warm-beige rounded-xl shadow-[0_20px_50px_rgba(183,110,121,0.15)] flex items-center justify-center border border-rose-gold/15 overflow-visible"
        >
          {/* Envelope Back Triangle Fold */}
          <div 
            className="absolute inset-0 bg-cream/90 rounded-xl"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 50% 50%, 0% 0%)',
              borderTop: '1px solid rgba(183, 110, 121, 0.1)'
            }}
          />

          {/* Envelope Bottom Flap */}
          <div 
            className="absolute inset-0 bg-cream border-t border-rose-gold/10 rounded-b-xl"
            style={{
              clipPath: 'polygon(0% 100%, 100% 100%, 50% 45%, 0% 100%)'
            }}
          />

          {/* Envelope Left & Right flaps */}
          <div 
            className="absolute inset-0 bg-[#F2ECE4] rounded-xl"
            style={{
              clipPath: 'polygon(0% 0%, 0% 100%, 48% 50%, 0% 0%)'
            }}
          />
          <div 
            className="absolute inset-0 bg-[#F2ECE4] rounded-xl"
            style={{
              clipPath: 'polygon(100% 0%, 100% 100%, 52% 50%, 100% 0%)'
            }}
          />

          {/* Top Flap (Animated opening up) */}
          <motion.div 
            className="absolute inset-x-0 top-0 h-1/2 bg-[#EAE2D8] origin-top rounded-t-xl"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%, 0 0)'
            }}
            animate={isOpen ? { rotateX: 180, zIndex: 0, opacity: 0.9 } : { rotateX: 0, zIndex: 10 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />

          {/* Partially Peeked Letter inside */}
          <motion.div 
            className="absolute w-[88%] h-36 bg-[#FFFDF9] border border-rose-gold/5 shadow-inner top-8 z-5"
            animate={isOpen ? { y: -50 } : { y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />

          {/* WAX SEAL BUTTON */}
          {!isOpen && (
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleOpenEnvelope}
              disabled={isBroken}
              className="absolute z-20 w-16 h-16 rounded-full bg-gradient-to-br from-gold via-rose-gold to-amber-700 flex items-center justify-center border-2 border-white/60 shadow-[0_6px_20px_rgba(183,110,121,0.4)] cursor-pointer select-none overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {isBroken ? (
                  <motion.div 
                    key="seal-broken"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex w-full h-full items-center justify-center relative"
                  >
                    {/* Crack animation effect */}
                    <motion.div 
                      className="absolute left-0 right-1/2 h-full bg-transparent border-r-2 border-dashed border-white/40"
                      animate={{ x: -10, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.div 
                      className="absolute right-0 left-1/2 h-full bg-transparent border-l-2 border-dashed border-white/40"
                      animate={{ x: 10, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="text-xs font-mono font-bold text-white tracking-widest uppercase">OPEN</span>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="seal-whole"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center"
                  >
                    <span className="text-xs font-serif font-bold text-white tracking-tighter">S & H</span>
                    <Heart className="w-3.5 h-3.5 text-white fill-current mt-0.5 animate-pulse" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
