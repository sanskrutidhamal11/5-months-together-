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
    memoryTitle: "Chapter I: The Spark",
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
    memoryTitle: "Chapter II: Walking Into Your World",
    memoryText: "That nervous flutter in the chest. Walking into that warm, bustling café, and seeing you for the first time. The train memory, watching the landscape roll by, knowing every mile was bringing us closer. When our eyes met, any trace of distance melted. Your smile was even softer in person, and your aura was so comforting, so magnetic. That quick, sweet nervous laugh when we first sat down—it remains one of my absolute favorite memories.",
    quote: "Aikna... I knew right then, you were my safest place.",
    icon: 'globe',
    glowColor: 'rgba(183, 110, 121, 0.4)',
    interactiveGame: {
      type: 'connect-dots',
      prompt: "Click on Station A (Pune) and Station B (Mumbai) to connect our paths."
    }
  },
  {
    id: 3,
    title: "Long Distance, One Heart",
    hint: "Mend the broken thread between our two distant cities...",
    memoryTitle: "Chapter III: Tying the Thread",
    memoryText: "Miles are just numbers on a screen. Long distance is hard, but it only proved how unbreakable our bond is. Counting down the days, late-night video calls with tired, happy smiles, falling asleep together on the phone, sending you silly voice notes. Realizing that even when we are far apart, our hearts beat in perfect synchronization. You are my favorite notification, and the center of my world.",
    quote: "Accha, distance only makes me love you more every single second.",
    icon: 'cloud',
    glowColor: 'rgba(247, 231, 206, 0.5)',
    interactiveGame: {
      type: 'match-cards',
      prompt: "Tie the red thread together by clicking the glowing ends."
    }
  },
  {
    id: 4,
    title: "Our Dreams",
    hint: "Water our digital rose gold garden to watch our dreams blossom...",
    memoryTitle: "Chapter IV: Building our Empire",
    memoryText: "We aren't just dreamers; we are creators. The passion you hold, your brilliant mind, and how we talk about building businesses together, travelling the world, and coffee shop dates in Paris. From launching projects to growing old together, we complement each other perfectly. Your drive inspires me, and knowing we are constructing our future block by block makes every struggle worth it.",
    quote: "btw, growing old together is my favorite business plan.",
    icon: 'heart',
    glowColor: 'rgba(214, 175, 55, 0.4)',
    interactiveGame: {
      type: 'grow-flower',
      prompt: "Click to water the golden bud and make our dreams bloom."
    }
  },
  {
    id: 5,
    title: "Forever Starts Here",
    hint: "Align the compass to point towards our infinite future...",
    memoryTitle: "Chapter V: To Infinity",
    memoryText: "Five months is just our beautiful prologue. Here we are, standing at the edge of forever. Your aura, your infinite love, and the depth of how you care for me—it's everything I ever prayed for. I love the way you listen, the way you make me feel so valued, and the security of your arms. I choose you today, tomorrow, and for all the lifetimes to come.",
    quote: "Always & Forever. You are my home, Aaho.",
    icon: 'star',
    glowColor: 'rgba(255, 255, 240, 0.6)',
    interactiveGame: {
      type: 'unlock-compass',
      prompt: "Rotate the dials of the compass to align with the North Star."
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
  const [showChapterMemory, setShowChapterMemory] = useState(false);

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
        return flowerWaterLevel >= 3;
      case 'unlock-compass':
        return Math.abs((compassRotation % 360) - 360) < 10 || Math.abs(compassRotation % 360) < 10;
      default:
        return false;
    }
  };

  // Collect Heart action
  const handleCollectHeart = () => {
    if (!collectedHearts.includes(currentQuest.id)) {
      const updated = [...collectedHearts, currentQuest.id];
      setCollectedHearts(updated);
      setShowChapterMemory(true);
      
      // Trigger success sound-like animation or triggers
      if (updated.length === 5) {
        // Complete the quest sequence
        setTimeout(() => {
          onAllCollected();
        }, 1500);
      }
    } else {
      setShowChapterMemory(true);
    }
  };

  const handleNextChapter = () => {
    setShowChapterMemory(false);
    if (activeStep < 4) {
      setActiveStep(activeStep + 1);
      // Reset sub game states
      setStarsClicked([]);
      setStationsConnected([false, false]);
      setThreadTied(false);
      setFlowerWaterLevel(0);
      setCompassRotation(135);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 relative z-30">
      {/* VIAL / GLASS HEART COUNTER */}
      <div className="flex flex-col items-center mb-10">
        <span className="text-xs font-mono text-rose-gold/70 uppercase tracking-widest mb-2">Heart Vial Progress</span>
        <div className="relative w-72 h-14 bg-charcoal/50 backdrop-blur-md border border-rose-gold/30 rounded-full flex items-center justify-between px-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          {/* Glass liquid fill effect */}
          <div 
            className="absolute left-1 top-1 bottom-1 bg-gradient-to-r from-softpink to-rose-gold/25 rounded-full transition-all duration-1000 ease-out z-0 shadow-inner"
            style={{ width: `${Math.max(8, (collectedHearts.length / 5) * 98.5)}%` }}
          />
          
          {[1, 2, 3, 4, 5].map((num) => {
            const isFound = collectedHearts.includes(num);
            const isActive = activeStep + 1 === num;
            return (
              <motion.div
                key={num}
                whileHover={{ scale: 1.15 }}
                className="relative z-10 flex flex-col items-center"
              >
                <div 
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 border ${
                    isFound 
                      ? 'bg-rose-gold border-rose-gold text-white shadow-[0_0_12px_rgba(183,110,121,0.4)]' 
                      : isActive 
                        ? 'bg-[#12100E] border-rose-gold/60 text-rose-gold/80 animate-pulse' 
                        : 'bg-charcoal/40 border-rose-gold/15 text-rose-gold/30'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFound ? 'fill-current' : ''}`} />
                </div>
                <span className="text-[9px] font-mono mt-1 text-ivory/60">M{num}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ACTIVE QUEST PANEL */}
      <AnimatePresence mode="wait">
        {!showChapterMemory ? (
          <motion.div
            key={`game-${activeStep}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="bg-charcoal/60 backdrop-blur-md border border-rose-gold/30 rounded-3xl p-6 md:p-10 shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-rose-gold/20 text-rose-gold text-xs font-mono rounded-full border border-rose-gold/30">
                Month {currentQuest.id} of 5
              </span>
              <span className="text-xs text-ivory/40 font-mono">Heart Quest</span>
            </div>

            <h2 className="text-2xl md:text-3.5xl font-display font-semibold text-ivory tracking-tight mb-2">
              {currentQuest.title}
            </h2>
            <p className="text-sm md:text-base text-ivory/70 mb-8 max-w-xl font-serif italic">
              "{currentQuest.hint}"
            </p>

            {/* INTERACTIVE MINI-GAMES */}
            <div className="bg-[#12100E]/70 border border-rose-gold/15 rounded-2xl p-6 mb-8 min-h-[220px] flex flex-col items-center justify-center relative overflow-hidden">
              <span className="absolute top-3 left-4 text-[10px] font-mono text-rose-gold/60 tracking-wider uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
                Interactive Challenge
              </span>

              {/* Game Prompt */}
              <p className="text-xs font-mono text-ivory/50 mb-6 text-center">
                {currentQuest.interactiveGame.prompt}
              </p>

              {/* GAME 1: CLICK STARS */}
              {currentQuest.interactiveGame.type === 'click-stars' && (
                <div className="relative w-full h-40">
                  {/* Glowing constellation paths if complete */}
                  {starsClicked.length === 3 && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <motion.path 
                        d="M 25,50 Q 50,15 75,50 T 25,50 Z" 
                        fill="none" 
                        stroke="rgba(212,175,55,0.4)" 
                        strokeWidth="1.5" 
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1 }}
                      />
                    </svg>
                  )}
                  {/* Star 1 */}
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => !starsClicked.includes(1) && setStarsClicked([...starsClicked, 1])}
                    className={`absolute top-1/4 left-1/4 p-2 rounded-full transition-all duration-300 cursor-pointer ${
                      starsClicked.includes(1) ? 'text-gold drop-shadow-[0_0_12px_rgba(212,175,55,0.8)]' : 'text-ivory/30 hover:text-ivory/60'
                    }`}
                  >
                    <Sparkles className="w-8 h-8 animate-pulse" />
                  </motion.button>
                  {/* Star 2 */}
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => !starsClicked.includes(2) && setStarsClicked([...starsClicked, 2])}
                    className={`absolute top-2/3 left-1/2 p-2 rounded-full transition-all duration-300 cursor-pointer ${
                      starsClicked.includes(2) ? 'text-gold drop-shadow-[0_0_12px_rgba(212,175,55,0.8)]' : 'text-ivory/30 hover:text-ivory/60'
                    }`}
                  >
                    <Sparkles className="w-7 h-7" />
                  </motion.button>
                  {/* Star 3 */}
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => !starsClicked.includes(3) && setStarsClicked([...starsClicked, 3])}
                    className={`absolute top-1/3 left-3/4 p-2 rounded-full transition-all duration-300 cursor-pointer ${
                      starsClicked.includes(3) ? 'text-gold drop-shadow-[0_0_12px_rgba(212,175,55,0.8)]' : 'text-ivory/30 hover:text-ivory/60'
                    }`}
                  >
                    <Sparkles className="w-9 h-9 animate-pulse" style={{ animationDelay: '1s' }} />
                  </motion.button>
                </div>
              )}

              {/* GAME 2: CONNECT DOTS */}
              {currentQuest.interactiveGame.type === 'connect-dots' && (
                <div className="flex flex-col items-center w-full gap-8 max-w-sm">
                  <div className="flex items-center justify-between w-full relative">
                    {/* Connecting line rail */}
                    <div className="absolute left-6 right-6 top-5 h-0.5 bg-ivory/10 -z-10" />
                    
                    {/* Connecting glowing progress */}
                    <motion.div 
                      className="absolute left-6 top-5 h-0.5 bg-rose-gold -z-10"
                      initial={{ width: 0 }}
                      animate={{ width: stationsConnected[0] && stationsConnected[1] ? '88%' : stationsConnected[0] || stationsConnected[1] ? '44%' : 0 }}
                      transition={{ duration: 0.8 }}
                    />

                    {/* Pune Station */}
                    <button
                      onClick={() => setStationsConnected([true, stationsConnected[1]])}
                      className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                        stationsConnected[0] 
                          ? 'bg-rose-gold text-white border-rose-gold shadow-md' 
                          : 'bg-[#12100E] text-ivory/40 border-rose-gold/15 hover:border-rose-gold/50'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                    </button>

                    <span className="text-[10px] font-mono text-ivory/50 italic">Train Line 🚂</span>

                    {/* Mumbai Station */}
                    <button
                      onClick={() => setStationsConnected([stationsConnected[0], true])}
                      className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                        stationsConnected[1] 
                          ? 'bg-rose-gold text-white border-rose-gold shadow-md' 
                          : 'bg-[#12100E] text-ivory/40 border-rose-gold/15 hover:border-rose-gold/50'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex justify-between w-full text-[10px] font-mono text-ivory/60 px-1">
                    <span>Pune HQ</span>
                    <span>Mumbai HQ</span>
                  </div>
                </div>
              )}

              {/* GAME 3: TIED THREAD */}
              {currentQuest.interactiveGame.type === 'match-cards' && (
                <div className="flex flex-col items-center gap-6">
                  <div className="flex items-center justify-center gap-12 relative w-64 h-24">
                    {/* Left thread */}
                    <motion.div 
                      className="absolute left-0 w-24 h-0.5 bg-rose-gold rounded-full"
                      animate={{ 
                        x: threadTied ? 36 : 0,
                        rotate: threadTied ? 12 : 0
                      }}
                      transition={{ duration: 0.6 }}
                    />
                    {/* Right thread */}
                    <motion.div 
                      className="absolute right-0 w-24 h-0.5 bg-rose-gold rounded-full"
                      animate={{ 
                        x: threadTied ? -36 : 0,
                        rotate: threadTied ? -12 : 0
                      }}
                      transition={{ duration: 0.6 }}
                    />

                    {!threadTied ? (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setThreadTied(true)}
                        className="px-4 py-2 bg-[#12100E] border border-rose-gold text-rose-gold text-xs font-mono rounded-full shadow-sm hover:bg-rose-gold/20 cursor-pointer z-10"
                      >
                        Tie the Bow 🎀
                      </motion.button>
                    ) : (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-3xl z-10 filter drop-shadow-md"
                      >
                        💝
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* GAME 4: GROW FLOWER */}
              {currentQuest.interactiveGame.type === 'grow-flower' && (
                <div className="flex flex-col items-center gap-4">
                  {/* Flower container */}
                  <div className="h-28 flex items-end justify-center w-32 relative">
                    <div className="w-1.5 bg-rose-gold/30 rounded-t-full" style={{ height: `${20 + flowerWaterLevel * 25}%` }} />
                    
                    {flowerWaterLevel >= 3 && (
                      <motion.div 
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="absolute bottom-[80%] text-4xl"
                      >
                        🌸
                      </motion.div>
                    )}

                    {flowerWaterLevel < 3 && (
                      <div className="absolute bottom-[20%] text-xl filter opacity-40">🌱</div>
                    )}
                  </div>

                  <button
                    onClick={() => setFlowerWaterLevel((prev) => Math.min(prev + 1, 3))}
                    disabled={flowerWaterLevel >= 3}
                    className={`px-4 py-1.5 border rounded-full text-xs font-mono transition-all duration-300 cursor-pointer ${
                      flowerWaterLevel >= 3
                        ? 'bg-rose-gold/10 text-rose-gold border-rose-gold/25'
                        : 'bg-[#12100E] hover:bg-rose-gold/20 text-ivory border-rose-gold/25'
                    }`}
                  >
                    {flowerWaterLevel >= 3 ? 'Fully Grown ✨' : `Water Seed (${flowerWaterLevel}/3)`}
                  </button>
                </div>
              )}

              {/* GAME 5: COMPASS DIAL */}
              {currentQuest.interactiveGame.type === 'unlock-compass' && (
                <div className="flex flex-col items-center gap-6">
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    {/* Compass Ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-rose-gold/30 animate-slow-spin" />
                    {/* Compass Dial */}
                    <motion.div 
                      className="w-20 h-20 rounded-full border-2 border-rose-gold bg-[#12100E] flex items-center justify-center relative cursor-pointer shadow-md"
                      style={{ rotate: compassRotation }}
                      onClick={() => setCompassRotation((prev) => (prev + 45) % 360)}
                    >
                      <div className="w-1.5 h-10 bg-gradient-to-b from-rose-gold to-gold rounded-full relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,1)]" />
                      </div>
                    </motion.div>
                    
                    {/* True North Star Indicator */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-gold animate-pulse">
                      <Sparkles className="w-5 h-5" />
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-ivory/50 italic">Tap dial to point North (0°)</span>
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
                {collectedHearts.includes(currentQuest.id) ? (
                  <>
                    <span>View Memory</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <Heart className={`w-4 h-4 ${isCurrentGameComplete() ? 'fill-white text-white' : ''}`} />
                    <span>Unlock Month {currentQuest.id} Heart</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* CINEMATIC CHAPTER MEMORY REVEAL */
          <motion.div
            key={`memory-${activeStep}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6 }}
            className="bg-[#1a1512]/95 border border-rose-gold/30 rounded-3xl p-8 md:p-14 shadow-[0_24px_64px_rgba(0,0,0,0.5)] max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <span className="text-xs font-mono text-rose-gold uppercase tracking-widest block mb-2">Unlocked Memory</span>
              <Heart className="w-12 h-12 text-rose-gold fill-current mx-auto animate-pulse" />
            </div>

            <h3 className="text-3xl md:text-4xl font-serif text-center italic text-ivory mb-8">
              {currentQuest.memoryTitle}
            </h3>

            <div className="text-ivory/80 leading-relaxed font-serif text-base md:text-lg text-justify mb-8 space-y-4 whitespace-pre-line first-letter:text-4xl first-letter:font-bold first-letter:text-rose-gold first-letter:mr-2 first-letter:float-left">
              <p>{currentQuest.memoryText}</p>
            </div>

            {/* Glowing quote box */}
            <div className="border-t border-b border-rose-gold/15 py-4 my-8 text-center bg-rose-gold/10 rounded-lg px-4">
              <p className="text-sm md:text-base font-script text-rose-gold text-2xl tracking-wide">
                "{currentQuest.quote}"
              </p>
            </div>

            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNextChapter}
                className="px-8 py-3 bg-rose-gold hover:bg-rose-gold/90 text-white border border-white/20 rounded-full flex items-center gap-2 text-sm font-display font-medium shadow-sm cursor-pointer"
              >
                {activeStep < 4 ? (
                  <>
                    <span>Next Heart Quest</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Complete Anniversary Quest</span>
                    <Check className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
