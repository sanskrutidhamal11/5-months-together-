import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface StoryBookProps {
  onComplete: () => void;
}

const CARDS = [
  {
    id: 0,
    emoji: "🧑‍💻",
    title: "Passion",
    backText: "She talks about your ambition with genuine admiration.\n\nEvery time she speaks about your work, she speaks with pride because she sees someone who's building a future with so much dedication ❤️"
  },
  {
    id: 1,
    emoji: "🤍",
    title: "The Little Things",
    backText: "I learned that love, for you, often appears through actions.\n\nShe told me you say \"I love you\" every day at 11:11 AM and 11:11 PM because she treasures that time.\n\nShe told me you answer her calls whenever you can, even during busy days.\n\nShe notices every one of those moments."
  },
  {
    id: 2,
    emoji: "🌍",
    title: "Your Dream",
    backText: "I learned that your dream isn't only about success.\n\nTogether, you both imagine building meaningful businesses, creating a life you love, and travelling the world side by side.\n\nWhenever she talks about the future, you're already in every picture she paints 💞"
  },
  {
    id: 3,
    emoji: "🥹",
    title: "The Way She Sees You",
    backText: "If I had to describe you using only the things Sanskruti has shared...\n\nPassionate. Kind. Hardworking. Calm. Genuine. Loving.\n\nShe admires your personality\nShe admires your aura\nMost of all, she admires the way you love her"
  },
  {
    id: 4,
    emoji: "❤️",
    title: "One Last Thing",
    backText: "After hearing hundreds of stories about you...\n\nyour little \"BTW\",\nyour \"Aikna\",\nyour 11:11 tradition,\nyour first meet memories,\nyour forehead kiss,\nyour dreams,\nyour love...\n\nI've realized something\n\nYou're far more than someone she loves\nYou're the person who makes her smile in the smallest moments of every single day 🥹❤️\n\nAnd I think...\nyou're exactly where her heart feels at home 💝"
  }
];

export default function StoryBook({ onComplete }: StoryBookProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const [flippedTracker, setFlippedTracker] = useState<Record<number, boolean>>({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false
  });

  const handleCardClick = () => {
    if (isSwiping) return;

    if (!isFlipped) {
      // Flip the card and track progress
      setIsFlipped(true);
      setFlippedTracker((prev) => ({
        ...prev,
        [currentIndex]: true
      }));
    } else {
      // Swipe to the back and reveal next card
      setIsSwiping(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % 5);
        setIsFlipped(false);
        setIsSwiping(false);
      }, 350); // duration of swipe animation
    }
  };

  const flippedCount = Object.values(flippedTracker).filter(Boolean).length;

  const cardStyle: React.CSSProperties = {
    perspective: '1000px'
  };

  const faceStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    borderRadius: '1.5rem',
  };

  const backFaceStyle: React.CSSProperties = {
    ...faceStyle,
    transform: 'rotateY(180deg)'
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pt-4 pb-20 relative z-30 flex flex-col items-center select-none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center mb-10 max-w-3xl"
      >
        <span className="text-sm font-mono text-rose-gold uppercase tracking-widest block mb-2">My Conversations</span>
        <h3 className="text-3xl md:text-5xl font-serif italic text-ivory leading-tight">
          The Story I Learned About You - by ChatGPT
        </h3>
        <p className="text-sm font-mono text-ivory/65 mt-3 leading-relaxed max-w-2xl mx-auto">
          Everything below is something Sanskruti shared with me about you over the past few months.
        </p>
      </motion.div>

      {/* Stack of Cards Container */}
      <div className="relative w-full max-w-2xl h-[360px] flex items-center justify-center mb-8">
        {CARDS.map((card, idx) => {
          // Calculate stack differences relative to current index
          const diff = (card.id - currentIndex + 5) % 5;
          const isActive = card.id === currentIndex;
          
          // Animate card styles based on stack order
          let scale = 1 - diff * 0.04;
          let yOffset = diff * 12;
          let rotation = diff % 2 === 0 ? diff * 1.5 : diff * -1.5;
          let opacity = 1 - diff * 0.18;
          let zIndex = 10 - diff;

          // If the card is active and currently swiping, animate out to the side
          const animateX = isActive && isSwiping ? 450 : 0;
          const animateY = isActive && isSwiping ? yOffset + 20 : yOffset;
          const animateRotate = isActive && isSwiping ? rotation + 20 : (isActive && isFlipped ? 0 : rotation);
          const animateScale = isActive && isSwiping ? 0.9 : scale;
          const animateOpacity = isActive && isSwiping ? 0 : opacity;

          return (
            <motion.div
              key={card.id}
              style={{
                ...cardStyle,
                zIndex: zIndex,
                transformOrigin: 'bottom center',
              }}
              animate={{
                x: animateX,
                y: animateY,
                rotate: animateRotate,
                scale: animateScale,
                opacity: animateOpacity,
              }}
              transition={
                isActive && isSwiping
                  ? { duration: 0.35, ease: "easeOut" }
                  : { type: "spring", stiffness: 150, damping: 18 }
              }
              onClick={isActive ? handleCardClick : undefined}
              className={`absolute w-full max-w-xl h-[330px] ${
                isActive ? 'cursor-pointer' : 'pointer-events-none'
              }`}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.15)',
                  transform: isActive && isFlipped ? 'rotateY(180deg)' : 'none'
                }}
              >
                {/* Front Side */}
                <div
                  style={faceStyle}
                  className="bg-charcoal/90 border-2 border-rose-gold/25 hover:border-rose-gold/50 transition-all flex flex-col justify-between items-center p-8 text-center shadow-[0_12px_36px_rgba(0,0,0,0.4)]"
                >
                  <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <span className="text-7xl block filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.2)] animate-pulse">
                      {card.emoji}
                    </span>
                    <h4 className="text-2xl font-display font-bold text-ivory/95 tracking-wide">
                      {card.title}
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-rose-gold/70 uppercase tracking-widest mt-auto">
                    Click to read story
                  </span>
                </div>

                {/* Back Side */}
                <div
                  style={backFaceStyle}
                  className="bg-[#1E1B18]/98 border-2 border-gold/45 p-8 flex flex-col justify-center items-center text-center shadow-[0_12px_36px_rgba(0,0,0,0.5)] overflow-y-auto"
                >
                  <p className="text-sm md:text-base font-serif italic text-ivory/90 leading-relaxed whitespace-pre-line max-w-md">
                    {card.backText}
                  </p>
                  <span className="text-[10px] font-mono text-rose-gold/55 uppercase tracking-widest mt-4">
                    Click again to continue
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Meter */}
      <div className="w-full max-w-lg mt-8 flex flex-col items-center">
        <div className="flex justify-between w-full text-xs font-mono text-ivory/50 mb-2">
          <span>Conversation Discovery</span>
          <span>{flippedCount} of 5 Stories Uncovered</span>
        </div>
        <div className="w-full h-3 bg-charcoal/80 border border-rose-gold/20 rounded-full relative overflow-visible flex items-center">
          {/* Progress fill */}
          <motion.div 
            className="h-full bg-gradient-to-r from-[#B76E79] to-[#D4AF37] rounded-full"
            animate={{ width: `${(flippedCount / 5) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          {/* Heart emoji slider at the end of progress */}
          <motion.div
            className="absolute text-xl pointer-events-none"
            animate={{ left: `calc(${(flippedCount / 5) * 100}% - 10px)` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ top: '-4px' }}
          >
            ❤️
          </motion.div>
        </div>
      </div>

      {/* Action Button to Complete Section */}
      {flippedCount === 5 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(183, 110, 121, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="px-8 py-3.5 bg-rose-gold text-white rounded-full font-display font-medium text-sm tracking-widest flex items-center gap-2 mx-auto cursor-pointer shadow-md border-2 border-white/20 uppercase"
          >
            <span>Reveal The Sealed Promise 💝</span>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
