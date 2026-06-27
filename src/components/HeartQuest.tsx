/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, MapPin, Compass, RotateCw, Check, ArrowRight } from 'lucide-react';
import { QuestStep } from '../types';

interface HeartQuestProps {
  onAllCollected: () => void;
  activeStep: number;
  setActiveStep: (step: number) => void;
  collectedHearts: number[];
  setCollectedHearts: React.Dispatch<React.SetStateAction<number[]>>;
}

const QUEST_STEPS: QuestStep[] = [
  {
    id: 1,
    title: "Our Beginning",
    hint: "Click the 3 wandering stars in the sky to align our connection...",
    memoryTitle: "The Spark",
    memoryText: "It all started with simple words, but there was an instant weight to them. Our initial chats, how easily we started connecting, those early late-night messages where time completely slipped away. We found ourselves sharing stories we'd never told anyone else, laughing at inside jokes, and feeling a strange, wonderful warmth before we even truly met. Five months ago, our universes quietly collided, and nothing has been the same since.",
    quote: "btw, I still smile at my screen whenever I see your name.",
    icon: 'sparkles',
    glowColor: 'rgba(255, 192, 203, 0.4)',
    interactiveGame: {
      type: 'click-stars',
      prompt: "Tap the 3 floating gold stars to align them."
    }
  },
  {
    id: 2,
    title: "Our First Meeting",
    hint: "Click the two coordinate train stations to complete the tracks...",
    memoryTitle: "Walking Into Your World",
    memoryText: "That nervous flutter in the chest. Walking into that warm, bustling café, and seeing you for the first time. The train memory, watching the landscape roll by, knowing every mile was bringing us closer. When our eyes met, any trace of distance melted. Your smile was even softer in person, and your aura was so comforting, so magnetic. That quick, sweet nervous laugh when we first sat down—it remains one of my absolute favorite memories.",
    quote: "Aikna... I knew right then, you were my safest place.",
    icon: 'globe',
    glowColor: 'rgba(183, 110, 121, 0.4)',
    interactiveGame: {
      type: 'connect-dots',
      prompt: ""
    }
  },
  {
    id: 3,
    title: "Long Distance, One Heart",
    hint: "January 5th, the text which changed my world....",
    memoryTitle: "Tying the Thread",
    memoryText: "Miles are just numbers on a screen. Long distance is hard, but it only proved how unbreakable our bond is. Counting down the days, late-night video calls with tired, happy smiles, falling asleep together on the phone, sending you silly voice notes. Realizing that even when we are far apart, our hearts beat in perfect synchronization. You are my favorite notification, and the center of my world.",
    quote: "Accha, distance only makes me love you more every single second.",
    icon: 'cloud',
    glowColor: 'rgba(247, 231, 206, 0.5)',
    interactiveGame: {
      type: 'match-cards',
      prompt: ""
    }
  },
  {
    id: 4,
    title: "Our Dreams",
    hint: "Click the button as many times as I say 'accha' in a day!",
    memoryTitle: "Building our Empire",
    memoryText: "We aren't just dreamers; we are creators. The passion you hold, your brilliant mind, and how we talk about building businesses together, travelling the world, and coffee shop dates in Paris. From launching projects to growing old together, we complement each other perfectly. Your drive inspires me, and knowing we are constructing our future block by block makes every struggle worth it.",
    quote: "btw, growing old together is my favorite business plan.",
    icon: 'heart',
    glowColor: 'rgba(214, 175, 55, 0.4)',
    interactiveGame: {
      type: 'grow-flower',
      prompt: ""
    }
  },
  {
    id: 5,
    title: "Forever Starts Here",
    hint: "Its 5 months of being together!! Do you Love me?",
    memoryTitle: "To Infinity",
    memoryText: "Five months is just our beautiful prologue. Here we are, standing at the edge of forever. Your aura, your infinite love, and the depth of how you care for me—it's everything I ever prayed for. I love the way you listen, the way you make me feel so valued, and the security of your arms. I choose you today, tomorrow, and for all the lifetimes to come.",
    quote: "Always & Forever. You are my home, Aaho.",
    icon: 'star',
    glowColor: 'rgba(255, 255, 240, 0.6)',
    interactiveGame: {
      type: 'unlock-compass',
      prompt: ""
    }
  }
];

export default function HeartQuest({
  onAllCollected,
  activeStep,
  setActiveStep,
  collectedHearts,
  setCollectedHearts
}: HeartQuestProps) {
  // Game state sub-components
  const [starsClicked, setStarsClicked] = useState<number[]>([]);
  const [stationsConnected, setStationsConnected] = useState<boolean[]>([]);
  const [threadTied, setThreadTied] = useState(false);
  const [flowerWaterLevel, setFlowerWaterLevel] = useState(0);
  const [compassRotation, setCompassRotation] = useState(135); // offset starting angle
  
  // Month 2 train challenge states
  const [station1Active, setStation1Active] = useState(false);
  const [trainRunning, setTrainRunning] = useState(false);
  const [station2Active, setStation2Active] = useState(false);

  // Month 3 text challenge states
  const [linesConnecting, setLinesConnecting] = useState(false);

  // Month 5 love confirmation state
  const [loveConfirmed, setLoveConfirmed] = useState(false);

  const currentQuest = QUEST_STEPS[activeStep];

  // Check for completion of active mini-game
  const isCurrentGameComplete = () => {
    if (collectedHearts.includes(currentQuest.id)) return true;
    switch (currentQuest.interactiveGame.type) {
      case 'click-stars':
        return starsClicked.length === 3;
      case 'connect-dots':
        return stationsConnected[0] && stationsConnected[1];
      case 'match-cards':
        return threadTied;
      case 'grow-flower':
        return flowerWaterLevel >= 11;
      case 'unlock-compass':
        return loveConfirmed;
      default:
        return false;
    }
  };

  // Collect Heart action
  const handleCollectHeart = () => {
    if (!collectedHearts.includes(currentQuest.id)) {
      const updated = [...collectedHearts, currentQuest.id];
      setCollectedHearts(updated);
      
      if (currentQuest.id === 5) {
        // Complete the quest sequence
        setTimeout(() => {
          onAllCollected();
        }, 1500);
      } else {
        // Advance to next month immediately after a short delay
        setTimeout(() => {
          setActiveStep(activeStep + 1);
          // Reset sub game states
          setStarsClicked([]);
          setStationsConnected([false, false]);
          setStation1Active(false);
          setTrainRunning(false);
          setStation2Active(false);
          setThreadTied(false);
          setLinesConnecting(false);
          setFlowerWaterLevel(0);
          setCompassRotation(135);
          setLoveConfirmed(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 relative z-30">
      {/* VIAL / GLASS HEART COUNTER */}
      <div className="flex flex-col items-center mb-10 w-full select-none">
        <span className="text-xs font-mono text-rose-gold/70 uppercase tracking-widest mb-3">Heart Vial Progress</span>
        <div className="relative w-80 h-14 bg-[#1E1B18]/45 border border-rose-gold/35 rounded-full flex items-center justify-between px-5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-sm">
          {/* Glass liquid fill effect */}
          <div 
            className="absolute left-1 top-1 bottom-1 bg-gradient-to-r from-[#B76E79] to-[#D4AF37] rounded-full transition-all duration-1000 ease-out z-0 shadow-[0_0_12px_rgba(183,110,121,0.3)]"
            style={{ width: `${Math.max(6, (collectedHearts.length / 5) * 98.5)}%` }}
          />
          
          {[1, 2, 3, 4, 5].map((num) => {
            const isFound = collectedHearts.includes(num);
            const isActive = activeStep + 1 === num;
            return (
              <motion.div
                key={num}
                whileHover={{ scale: 1.15 }}
                className="relative z-10 flex items-center justify-center w-9 h-9"
              >
                <div 
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 border ${
                    isFound 
                      ? 'bg-rose-gold border-rose-gold text-white shadow-[0_0_12px_rgba(183,110,121,0.5)]' 
                      : isActive 
                        ? 'bg-[#12100E] border-rose-gold text-rose-gold animate-pulse shadow-[0_0_8px_rgba(183,110,121,0.3)]' 
                        : 'bg-charcoal/80 border-rose-gold/20 text-rose-gold/25'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFound ? 'fill-current' : ''}`} />
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Labels underneath the Glass Tube */}
        <div className="flex justify-between w-80 px-7 mt-2 text-xs font-mono font-bold text-ivory/60">
          <span>M1</span>
          <span>M2</span>
          <span>M3</span>
          <span>M4</span>
          <span>M5</span>
        </div>
      </div>

      {/* ACTIVE QUEST PANEL */}
      <AnimatePresence mode="wait">
        <motion.div
            key={`game-${activeStep}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="bg-charcoal/60 backdrop-blur-md border border-rose-gold/30 rounded-3xl p-6 md:p-10 shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3.5 py-1.5 bg-rose-gold/20 text-rose-gold text-sm font-mono font-semibold rounded-full border border-rose-gold/30">
                Month {currentQuest.id} of 5
              </span>
              <span className="text-sm text-ivory/60 font-mono">Heart Quest</span>
            </div>

            <h2 className="text-2xl md:text-3.5xl font-display font-semibold text-ivory tracking-tight mb-2">
              {currentQuest.title}
            </h2>
            <p className="text-sm md:text-base text-ivory/70 mb-8 max-w-xl font-serif italic">
              "{currentQuest.hint}"
            </p>

            {/* INTERACTIVE MINI-GAMES */}
            <div className="bg-[#12100E]/70 border border-rose-gold/15 rounded-2xl p-6 mb-8 min-h-[220px] flex flex-col items-center justify-center relative overflow-hidden">
              {/* Game Prompt */}
              {currentQuest.interactiveGame.prompt && (
                <p className="text-sm font-mono text-ivory/70 mb-6 text-center mt-4">
                  {currentQuest.interactiveGame.prompt}
                </p>
              )}

              {/* GAME 1: CLICK STARS */}
              {currentQuest.interactiveGame.type === 'click-stars' && (
                <div className="relative w-full h-64">
                  {/* Glowing constellation paths if complete */}
                  {starsClicked.length === 3 && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <motion.path 
                        d="M 25,25 L 50,65 L 75,35 Z" 
                        fill="none" 
                        stroke="rgba(212,175,55,0.7)" 
                        strokeWidth="2" 
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                      />
                      <motion.path 
                        d="M 25,25 L 50,65 L 75,35 Z" 
                        fill="none" 
                        stroke="rgba(212,175,55,0.25)" 
                        strokeWidth="6" 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                      />
                    </svg>
                  )}
                  {/* Star 1 */}
                  <div className="absolute top-[25%] left-[25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() => !starsClicked.includes(1) && setStarsClicked([...starsClicked, 1])}
                      className={`relative p-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        starsClicked.includes(1) ? 'text-gold drop-shadow-[0_0_12px_rgba(212,175,55,0.8)]' : 'text-ivory/30 hover:text-ivory/60'
                      }`}
                    >
                      <Sparkles className="w-8 h-8 animate-pulse" />
                      <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-[#12100E] border border-gold text-gold text-[10px] flex items-center justify-center font-bold shadow-[0_0_6px_rgba(212,175,55,0.4)] select-none">1</span>
                    </motion.button>
                    <AnimatePresence>
                      {starsClicked.includes(1) && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8, y: -5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute top-12 left-1/2 -translate-x-1/2 bg-[#1a1512]/95 border border-rose-gold/30 px-3 py-1.5 rounded-lg text-xs font-sans text-ivory tracking-wide whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
                        >
                          January 5: The first conversation
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  {/* Star 2 */}
                  <div className="absolute top-[65%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() => !starsClicked.includes(2) && setStarsClicked([...starsClicked, 2])}
                      className={`relative p-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        starsClicked.includes(2) ? 'text-gold drop-shadow-[0_0_12px_rgba(212,175,55,0.8)]' : 'text-ivory/30 hover:text-ivory/60'
                      }`}
                    >
                      <Sparkles className="w-7 h-7" />
                      <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-[#12100E] border border-gold text-gold text-[10px] flex items-center justify-center font-bold shadow-[0_0_6px_rgba(212,175,55,0.4)] select-none">2</span>
                    </motion.button>
                    <AnimatePresence>
                      {starsClicked.includes(2) && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8, y: -5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute top-12 left-1/2 -translate-x-1/2 bg-[#1a1512]/95 border border-rose-gold/30 px-3 py-1.5 rounded-lg text-xs font-sans text-ivory tracking-wide whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
                        >
                          January 19: The proposal happened
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  {/* Star 3 */}
                  <div className="absolute top-[35%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      onClick={() => !starsClicked.includes(3) && setStarsClicked([...starsClicked, 3])}
                      className={`relative p-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        starsClicked.includes(3) ? 'text-gold drop-shadow-[0_0_12px_rgba(212,175,55,0.8)]' : 'text-ivory/30 hover:text-ivory/60'
                      }`}
                    >
                      <Sparkles className="w-9 h-9 animate-pulse" style={{ animationDelay: '1s' }} />
                      <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-[#12100E] border border-gold text-gold text-[10px] flex items-center justify-center font-bold shadow-[0_0_6px_rgba(212,175,55,0.4)] select-none">3</span>
                    </motion.button>
                    <AnimatePresence>
                      {starsClicked.includes(3) && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8, y: -5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute top-12 left-1/2 -translate-x-1/2 bg-[#1a1512]/95 border border-rose-gold/30 px-3 py-1.5 rounded-lg text-xs font-sans text-ivory tracking-wide whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
                        >
                          January 28: The day we became us! ❤️
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* GAME 2: CONNECT DOTS */}
              {currentQuest.interactiveGame.type === 'connect-dots' && (
                <div className="flex flex-col items-center w-full gap-8 max-w-lg select-none">
                  <div className="flex items-center justify-between w-full relative h-28 px-8">
                    
                    {/* Connecting line rail */}
                    <div className="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-1 bg-ivory/10 rounded-full" />
                    
                    {/* Glowing progress line */}
                    <motion.div 
                      className="absolute left-16 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-rose-gold to-gold"
                      initial={{ width: 0 }}
                      animate={{ width: trainRunning || station2Active ? 'calc(100% - 128px)' : 0 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />

                    {/* Animated Train 🚂 */}
                    {trainRunning && (
                      <motion.div
                        initial={{ left: '64px' }}
                        animate={{ left: 'calc(100% - 96px)' }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        onAnimationComplete={() => {
                          setStation2Active(true);
                          setTrainRunning(false);
                          setStationsConnected([true, true]);
                        }}
                        className="absolute top-1/2 -translate-y-1/2 z-20 text-3xl filter drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                      >
                        🚂
                      </motion.div>
                    )}

                    {/* Pune Station Button */}
                    <div className="flex flex-col items-center relative w-20">
                      <motion.button
                        disabled={station1Active}
                        onClick={() => {
                          if (!station1Active) {
                            setStation1Active(true);
                            setTrainRunning(true);
                          }
                        }}
                        className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 z-10 ${
                          station1Active 
                            ? 'bg-rose-gold/20 border-rose-gold text-2xl shadow-[0_0_12px_rgba(244,63,94,0.4)]' 
                            : 'bg-[#12100E] border-rose-gold/30 text-rose-gold hover:border-gold hover:text-gold cursor-pointer shadow-md'
                        }`}
                        whileHover={!station1Active ? { scale: 1.1 } : {}}
                        whileTap={!station1Active ? { scale: 0.95 } : {}}
                      >
                        {station1Active ? (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                          >
                            ❤️
                          </motion.span>
                        ) : (
                          <div className="relative">
                            <MapPin className="w-5 h-5" />
                            <span className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-[#12100E] border border-gold text-gold text-[10px] flex items-center justify-center font-bold shadow-[0_0_6px_rgba(212,175,55,0.4)]">1</span>
                          </div>
                        )}
                      </motion.button>
                      
                      {/* Pune text label */}
                      <AnimatePresence>
                        {station1Active && (
                          <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-sm font-display font-semibold text-ivory mt-3 tracking-wider uppercase"
                          >
                            Pune
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Mumbai Station Button */}
                    <div className="flex flex-col items-center relative w-20">
                      <div
                        className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 z-10 ${
                          station2Active 
                            ? 'bg-rose-gold/20 border-rose-gold text-2xl shadow-[0_0_12px_rgba(244,63,94,0.4)]' 
                            : 'bg-[#12100E] border-rose-gold/15 text-rose-gold/30 shadow-none'
                        }`}
                      >
                        {station2Active ? (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                          >
                            ❤️
                          </motion.span>
                        ) : (
                          <div className="relative">
                            <MapPin className="w-5 h-5" />
                            <span className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-charcoal border border-rose-gold/25 text-rose-gold/55 text-[10px] flex items-center justify-center font-bold">2</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Mumbai text label */}
                      <AnimatePresence>
                        {station2Active && (
                          <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-sm font-display font-semibold text-ivory mt-3 tracking-wider uppercase"
                          >
                            Mumbai
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              )}

              {/* GAME 3: TIED THREAD */}
              {currentQuest.interactiveGame.type === 'match-cards' && (
                <div className="flex flex-col items-center w-full gap-8 max-w-lg select-none">
                  <div className="flex items-center justify-between w-full relative h-36 px-12">
                    
                    {/* Connecting line path */}
                    {(linesConnecting || threadTied) && (
                      <>
                        {/* Left half line (grows left-to-right from Phone 1 to Center) */}
                        <motion.div 
                          initial={linesConnecting ? { scaleX: 0 } : { scaleX: 1 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className="absolute left-[104px] right-1/2 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-[#B76E79] to-[#D4AF37] origin-left z-0 shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                        />
                        {/* Right half line (grows right-to-left from Phone 2 to Center) */}
                        <motion.div 
                          initial={linesConnecting ? { scaleX: 0 } : { scaleX: 1 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className="absolute left-1/2 right-[104px] top-1/2 -translate-y-1/2 h-1 bg-gradient-to-l from-[#B76E79] to-[#D4AF37] origin-right z-0 shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                        />
                      </>
                    )}

                    {/* Left Phone */}
                    <div className="relative flex flex-col items-center">
                      <AnimatePresence>
                        {threadTied && (
                          <>
                            <motion.span
                              initial={{ opacity: 0, y: 10, scale: 0.5 }}
                              animate={{ opacity: [0, 1, 0], y: -45, x: -10, scale: [0.5, 1.2, 0.8] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                              className="absolute -top-10 text-xl z-20"
                            >
                              ❤️
                            </motion.span>
                            <motion.span
                              initial={{ opacity: 0, y: 10, scale: 0.5 }}
                              animate={{ opacity: [0, 1, 0], y: -35, x: 12, scale: [0.5, 1, 0.7] }}
                              transition={{ duration: 2.4, repeat: Infinity, delay: 0.4 }}
                              className="absolute -top-8 text-lg z-20"
                            >
                              💖
                            </motion.span>
                          </>
                        )}
                      </AnimatePresence>

                      <motion.div 
                        animate={(linesConnecting || threadTied) ? { 
                          boxShadow: "0 0 24px rgba(183,110,121,0.6)", 
                          borderColor: "rgba(183,110,121,0.85)" 
                        } : {}}
                        className="w-14 h-24 bg-[#1E1B18]/90 border-2 border-rose-gold/25 rounded-2xl relative shadow-md flex items-center justify-center p-1.5 transition-all duration-500"
                      >
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-rose-gold/30 rounded-full" />
                        <div className="w-full h-full bg-[#12100E] border border-rose-gold/15 rounded-xl flex items-center justify-center overflow-hidden">
                          <span className="text-xl">{threadTied ? "💬❤️" : "📱"}</span>
                        </div>
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-rose-gold/30 rounded-full" />
                      </motion.div>
                    </div>

                    {/* Middle Action / Bow */}
                    <div className="flex items-center justify-center w-36 h-24 relative z-10">
                      {!threadTied ? (
                        <motion.button
                          disabled={linesConnecting}
                          whileHover={!linesConnecting ? { scale: 1.05, boxShadow: '0 4px 15px rgba(183, 110, 121, 0.3)' } : {}}
                          whileTap={!linesConnecting ? { scale: 0.95 } : {}}
                          onClick={() => {
                            setLinesConnecting(true);
                            // Draw connecting lines towards the middle, then convert to bow
                            setTimeout(() => {
                              setThreadTied(true);
                              setLinesConnecting(false);
                            }, 1200);
                          }}
                          className={`px-5 py-2.5 bg-rose-gold text-white text-xs font-mono font-bold tracking-wider rounded-full shadow-md border border-white/20 uppercase whitespace-nowrap transition-all duration-300 ${
                            linesConnecting ? 'opacity-50 scale-95 cursor-not-allowed' : 'hover:bg-rose-gold/90 cursor-pointer'
                          }`}
                        >
                          Send the text
                        </motion.button>
                      ) : (
                        <motion.div
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1.15, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                          className="w-12 h-12 bg-[#12100E] border-2 border-gold rounded-full flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(212,175,55,0.7)] animate-pulse"
                        >
                          🎀
                        </motion.div>
                      )}
                    </div>

                    {/* Right Phone */}
                    <div className="relative flex flex-col items-center">
                      <AnimatePresence>
                        {threadTied && (
                          <>
                            <motion.span
                              initial={{ opacity: 0, y: 10, scale: 0.5 }}
                              animate={{ opacity: [0, 1, 0], y: -45, x: 10, scale: [0.5, 1.2, 0.8] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                              className="absolute -top-10 text-xl z-20"
                            >
                              ❤️
                            </motion.span>
                            <motion.span
                              initial={{ opacity: 0, y: 10, scale: 0.5 }}
                              animate={{ opacity: [0, 1, 0], y: -35, x: -12, scale: [0.5, 1, 0.7] }}
                              transition={{ duration: 2.4, repeat: Infinity, delay: 0.6 }}
                              className="absolute -top-8 text-lg z-20"
                            >
                              💖
                            </motion.span>
                          </>
                        )}
                      </AnimatePresence>

                      <motion.div 
                        animate={(linesConnecting || threadTied) ? { 
                          boxShadow: "0 0 24px rgba(183,110,121,0.6)", 
                          borderColor: "rgba(183,110,121,0.85)" 
                        } : {}}
                        className="w-14 h-24 bg-[#1E1B18]/90 border-2 border-rose-gold/25 rounded-2xl relative shadow-md flex items-center justify-center p-1.5 transition-all duration-500"
                      >
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-rose-gold/30 rounded-full" />
                        <div className="w-full h-full bg-[#12100E] border border-rose-gold/15 rounded-xl flex items-center justify-center overflow-hidden">
                          <span className="text-xl">{threadTied ? "❤️💬" : "📱"}</span>
                        </div>
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-rose-gold/30 rounded-full" />
                      </motion.div>
                    </div>

                  </div>
                </div>
              )}

              {/* GAME 4: GROW FLOWER */}
              {currentQuest.interactiveGame.type === 'grow-flower' && (
                <div className="flex flex-col items-center gap-6">
                  {/* Container for Button and Progress Ring */}
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    {/* SVG Progress Ring */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 160 160">
                      {/* Rail Circle */}
                      <circle 
                        cx="80" 
                        cy="80" 
                        r="74" 
                        stroke="rgba(183, 110, 121, 0.15)" 
                        strokeWidth="3.5" 
                        fill="none" 
                      />
                      {/* Progress Fill Circle */}
                      <motion.circle
                        cx="80"
                        cy="80"
                        r="74"
                        stroke="#B76E79"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray="465"
                        animate={{ strokeDashoffset: 465 - (465 * (Math.min(flowerWaterLevel, 11) / 11)) }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{ rotate: -90, transformOrigin: 'center' }}
                        className="drop-shadow-[0_0_6px_rgba(183,110,121,0.5)]"
                      />
                    </svg>

                    {/* Big Accha Button */}
                    <motion.button
                      whileHover={flowerWaterLevel < 11 ? { scale: 1.05 } : {}}
                      whileTap={flowerWaterLevel < 11 ? { scale: 0.95 } : {}}
                      onClick={() => {
                        if (flowerWaterLevel < 11) {
                          setFlowerWaterLevel(prev => prev + 1);
                        }
                      }}
                      disabled={flowerWaterLevel >= 11}
                      className={`w-32 h-32 rounded-full flex flex-col items-center justify-center border transition-all duration-300 shadow-md relative z-10 ${
                        flowerWaterLevel >= 11 
                          ? 'bg-rose-gold/20 border-rose-gold text-rose-gold cursor-not-allowed shadow-[0_0_20px_rgba(183,110,121,0.4)] animate-pulse'
                          : 'bg-[#12100E] border-rose-gold/25 text-rose-gold hover:border-gold hover:text-gold cursor-pointer'
                      }`}
                    >
                      <span className="text-2.5xl font-serif italic font-bold">Accha</span>
                      {flowerWaterLevel >= 11 && (
                        <span className="text-xs font-mono text-ivory/65 mt-1 select-none">
                          Completed! ❤️
                        </span>
                      )}
                      
                      {/* Inner click ripple */}
                      {flowerWaterLevel > 0 && flowerWaterLevel < 11 && (
                        <motion.span
                          key={flowerWaterLevel}
                          initial={{ opacity: 0.6, scale: 0.8 }}
                          animate={{ opacity: 0, scale: 1.4 }}
                          transition={{ duration: 0.4 }}
                          className="absolute inset-0 rounded-full border border-gold pointer-events-none"
                        />
                      )}
                    </motion.button>
                  </div>

                  {/* 11 Tiny Hearts Progress List */}
                  <div className="flex items-center gap-1.5 mt-2">
                    {Array.from({ length: 11 }).map((_, i) => {
                      const isLit = i < flowerWaterLevel;
                      return (
                        <motion.div
                          key={i}
                          initial={{ scale: 0.8 }}
                          animate={isLit ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className={`text-xs ${isLit ? 'text-rose-600 drop-shadow-[0_0_6px_rgba(225,29,72,0.6)]' : 'text-ivory/20'}`}
                        >
                          ❤️
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* GAME 5: COMPASS DIAL */}
              {currentQuest.interactiveGame.type === 'unlock-compass' && (
                <div className="flex flex-col items-center justify-center min-h-[160px] w-full">
                  <AnimatePresence mode="wait">
                    {!loveConfirmed ? (
                      <motion.div
                        key="ask-love"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col items-center gap-6"
                      >
                        <h3 className="text-xl md:text-2xl font-serif text-ivory/90 font-medium leading-relaxed text-center max-w-md">
                          Its 5 months of being together!! <br />
                          <span className="text-rose-gold font-bold italic block mt-2 text-2.5xl">Do you Love me?</span>
                        </h3>
                        <div className="flex items-center gap-6 mt-2">
                          <motion.button
                            whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(244, 63, 94, 0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setLoveConfirmed(true)}
                            className="px-8 py-3 bg-rose-600 hover:bg-rose-500 text-white font-display font-semibold rounded-full shadow-md cursor-pointer border border-white/10 tracking-wider uppercase text-sm"
                          >
                            Yes ❤️
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(244, 63, 94, 0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setLoveConfirmed(true)}
                            className="px-8 py-3 bg-rose-600 hover:bg-rose-500 text-white font-display font-semibold rounded-full shadow-md cursor-pointer border border-white/10 tracking-wider uppercase text-sm"
                          >
                            Yes! 💖
                          </motion.button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="confirm-love"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: [1, 1.15, 1], opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="flex flex-col items-center justify-center gap-4 text-center relative py-8 px-4 w-full h-full min-h-[180px]"
                      >
                        <h3 className="font-script text-6xl md:text-8.5xl text-rose-gold tracking-wide animate-pulse leading-none filter drop-shadow-[0_0_15px_rgba(183,110,121,0.4)] select-none">
                          i love you too baby 💋
                        </h3>
                        {/* Floating lips/kiss emoji effects */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
                          {/* Lips 1 */}
                          <motion.span
                            initial={{ opacity: 0, y: 50, x: -60, scale: 0.5 }}
                            animate={{ opacity: [0, 1, 1, 0], y: -120, x: -100, scale: [0.5, 1.6, 1.6, 1] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                            className="absolute text-5xl md:text-6xl"
                          >
                            💋
                          </motion.span>
                          {/* Lips 2 */}
                          <motion.span
                            initial={{ opacity: 0, y: 60, x: 60, scale: 0.5 }}
                            animate={{ opacity: [0, 1, 1, 0], y: -100, x: 100, scale: [0.5, 1.4, 1.4, 0.8] }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5, ease: "easeOut" }}
                            className="absolute text-4xl md:text-5xl"
                          >
                            💋
                          </motion.span>
                          {/* Heart 1 */}
                          <motion.span
                            initial={{ opacity: 0, y: 40, x: -20, scale: 0.5 }}
                            animate={{ opacity: [0, 1, 1, 0], y: -130, x: -40, scale: [0.5, 1.3, 1.3, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.2, ease: "easeOut" }}
                            className="absolute text-4xl md:text-5xl"
                          >
                            ❤️
                          </motion.span>
                          {/* Heart 2 */}
                          <motion.span
                            initial={{ opacity: 0, y: 50, x: 20, scale: 0.5 }}
                            animate={{ opacity: [0, 1, 1, 0], y: -120, x: 40, scale: [0.5, 1.5, 1.5, 0.9] }}
                            transition={{ duration: 2.4, repeat: Infinity, delay: 0.7, ease: "easeOut" }}
                            className="absolute text-5xl md:text-6xl"
                          >
                            💖
                          </motion.span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* UNLOCK ACTION BUTTON */}
            <div className="flex justify-end">
              <motion.button
                whileHover={isCurrentGameComplete() ? { scale: 1.03 } : {}}
                whileTap={isCurrentGameComplete() ? { scale: 0.98 } : {}}
                onClick={handleCollectHeart}
                disabled={!isCurrentGameComplete()}
                className={`px-6 py-3 rounded-full flex items-center gap-2 text-sm font-display font-medium transition-all duration-500 shadow-md ${
                  isCurrentGameComplete()
                    ? 'bg-rose-gold hover:bg-rose-gold/90 text-white cursor-pointer shadow-[0_4px_16px_rgba(183,110,121,0.25)]'
                    : 'bg-ivory/5 text-ivory/30 border border-ivory/10 cursor-not-allowed shadow-none'
                }`}
              >
                <Heart className={`w-4 h-4 ${isCurrentGameComplete() ? 'fill-white text-white' : ''}`} />
                <span>{currentQuest.id === 5 ? 'Complete Anniversary Quest' : `Unlock Month ${currentQuest.id} Heart`}</span>
              </motion.button>
            </div>
          </motion.div>
      </AnimatePresence>
    </div>
  );
}
