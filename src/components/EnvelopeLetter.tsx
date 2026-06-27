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

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-20 relative z-30 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <span className="text-xs font-mono text-rose-gold uppercase tracking-widest block mb-2">The Culmination</span>
        <h3 className="text-3xl md:text-5xl font-serif italic text-ivory">The Sealed Promise</h3>
        <p className="text-xs font-mono text-ivory/50 mt-2">Tap the wax seal to unfold five months of devotion</p>
      </motion.div>

      {/* Envelope Stage */}
      <div className="relative w-full max-w-lg h-[400px] flex items-center justify-center">
        <AnimatePresence>
          {!isUnfolded && (
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
                        <span className="text-[10px] font-mono font-bold text-white tracking-widest uppercase">OPEN</span>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="seal-whole"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center"
                      >
                        <span className="text-[10px] font-serif font-bold text-white tracking-tighter">S & A</span>
                        <Heart className="w-3.5 h-3.5 text-white fill-current mt-0.5 animate-pulse" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unfolded Love Letter Panel */}
        <AnimatePresence>
          {isUnfolded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 50, damping: 15 }}
              className="absolute inset-x-0 top-[-60px] max-w-2xl mx-auto z-40 bg-[#1E1B18]/95 border border-rose-gold/30 shadow-[0_24px_80px_rgba(0,0,0,0.6)] rounded-2xl p-6 md:p-12 custom-scrollbar max-h-[640px] overflow-y-auto"
            >
              <div className="absolute top-4 right-6 text-gold animate-pulse">
                <Sparkles className="w-5 h-5" />
              </div>

              {/* Letter Header */}
              <div className="text-center mb-10 border-b border-rose-gold/10 pb-6">
                <span className="font-script text-4xl md:text-5xl text-rose-gold tracking-wide">
                  My Dearest Aaho,
                </span>
                <span className="text-xs font-mono text-ivory/50 tracking-widest block mt-2">
                  5 MONTHS OF INFINITE DEVOTION
                </span>
              </div>

              {/* Letter Body Text */}
              <div className="font-serif text-ivory/90 leading-relaxed text-base md:text-lg text-justify space-y-6 whitespace-pre-line px-2 md:px-4">
                <p>
                  Loving you for the past five months has been like watching a beautiful, quiet movie unfold—one where every single frame is filled with soft Ghibli warmth, Ghibli café music, and a profound sense of peace. Before you came into my life, my world was structured and logical, but you introduced a dreamy poetry that I never knew I was missing.
                </p>

                <p>
                  <strong>Aikna...</strong> do you remember those very first chats? We'd talk for hours on end, finding magic in the simplest things. I remember how quickly you became my favorite notification. Every time my screen lit up with your name, my whole day became immediately brighter. Even then, we were building something special, blending our dreams together.
                </p>

                <p>
                  Our first meeting was a dream. Sitting across from you in that cozy café, hearing your nervous laugh, seeing your gorgeous aura in real life. When you looked at me, all the noise of the outside world completely faded away. The train ride home that night is etched into my soul forever; I remember looking out the window, realizing that my heart was no longer mine—it stayed in Mumbai with you.
                </p>

                <p>
                  Long distance has tested us, but it only proved how deeply we are tied. <strong>Accha</strong>, every mile between us is nothing compared to the pull of our souls. We fell into a rhythm of constant video calls, falling asleep on the phone, and supporting each other's passionate pursuits. Watching your drive, your absolute brilliance as you build your career, inspires me daily.
                </p>

                <p>
                  I love how we complement each other. We talk about building empires together, launching businesses, travelling the globe, and growing old in a house filled with warm tea, soft music, and books. You are my partner in tech, my partner in crime, and my ultimate safe haven.
                </p>

                <p>
                  Thank you for five months of unconditional love, of being my ultimate source of comfort, and of showing me what true romance feels like. I will choose you today, tomorrow, and always. <strong>BTW</strong>, you are stuck with me forever.
                </p>
              </div>

              {/* Letter Footer */}
              <div className="mt-12 text-right border-t border-rose-gold/10 pt-6 pr-4">
                <span className="text-xs font-mono text-ivory/50 uppercase block tracking-wider">
                  With all my love & stars,
                </span>
                <span className="font-script text-3.5xl text-rose-gold block mt-2">
                  Sanskruti ❤️
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
