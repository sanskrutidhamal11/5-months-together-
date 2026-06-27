/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Heart, MessageSquare, Train, Sparkles, Map, Laptop, Globe, Eye, Flame, Award } from 'lucide-react';
import { StoryChapter } from '../types';

const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: "first-meeting",
    title: "First Meeting",
    subtitle: "A café, a smile, a nervous giggle",
    text: "Walking into that café was the moment my timeline split. There you were, sitting with your cozy aura, and when you smiled, all my nervousness turned into absolute peace. That little nervous laugh we shared is still the sweetest sound I carry.",
    category: "Beginning",
    icon: "message"
  },
  {
    id: "train-memory",
    title: "The Train Journey",
    subtitle: "Scenery rolling by, hearts beating fast",
    text: "The sound of tracks, the wind, and watching the scenery change. Every station passed felt like a countdown to seeing you. The memory of sitting together, watching the night fall, remains one of the warmest places in my heart.",
    category: "Beginning",
    icon: "train"
  },
  {
    id: "first-ily",
    title: "First 'I Love You'",
    subtitle: "Whispers in the quiet night",
    text: "It wasn't just a phrase; it was a surrender. In the quietest hour of the night, when the world was asleep, we whispered those three words. They felt as natural as breathing, and infinitely more sacred.",
    category: "Deep Love",
    icon: "heart"
  },
  {
    id: "long-distance",
    title: "Long Distance, One Heart",
    subtitle: "A bridge of stardust across cities",
    text: "Distance is just physical trivia. Even with miles separating us, we found a way to share lunches, study sessions, and late-night talks. Every pixel of you on my screen is a reminder of how lucky I am.",
    category: "LDR",
    icon: "ldr"
  },
  {
    id: "dreams-together",
    title: "Dreams Together",
    subtitle: "Mapping our shared horizons",
    text: "We spend hours sketching out the future. Designing cozy apartments, choosing coffee makers, finding travel paths, and planning sunset picnics. With you, dreaming feels less like a wish and more like a plan.",
    category: "Travel",
    icon: "map"
  },
  {
    id: "building-businesses",
    title: "Building Businesses",
    subtitle: "Co-founders in tech & romance",
    text: "You have this incredible, analytical software engineer brain, and I love how we talk about launching products together. Our laptops glowing side by side as we collaborate on codes and concepts is our favorite version of a date.",
    category: "Business",
    icon: "laptop"
  },
  {
    id: "travel-world",
    title: "Travelling The World",
    subtitle: "Wanderlust in our hearts",
    text: "From chasing rains to boarding flights, we want to see it all. Exploring ancient alleys, capturing pictures with wooden clips, and leaving tiny traces of 'S & A' across every continent.",
    category: "Travel",
    icon: "globe"
  },
  {
    id: "his-passion",
    title: "His Passion",
    subtitle: "The fire in your thoughts",
    text: "I love the way your eyes light up when you describe complex algorithms or business goals. Your determination and sharp intelligence are absolutely magnetic. You never just dream—you build.",
    category: "Business",
    icon: "fire"
  },
  {
    id: "his-aura",
    title: "His Aura",
    subtitle: "Peace that stills the storm",
    text: "Your presence is an anchor. No matter how chaotic my world gets, talking to you restores my calm. You hold a soft, protective, incredibly reassuring light that makes me feel entirely safe.",
    category: "Deep Love",
    icon: "eye"
  },
  {
    id: "infinite-love",
    title: "His Infinite Love",
    subtitle: "More than stars in the night",
    text: "The way you hold me (even across screens), the way you listen with absolute patience, and how you love me without reservations. I am wrapped in a devotion so pure, it makes me tear up with gratitude.",
    category: "Deep Love",
    icon: "award"
  }
];

export default function StoryBook() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageSquare className="w-5 h-5 text-rose-gold" />;
      case 'train': return <Train className="w-5 h-5 text-rose-gold" />;
      case 'map': return <Map className="w-5 h-5 text-rose-gold" />;
      case 'laptop': return <Laptop className="w-5 h-5 text-rose-gold" />;
      case 'globe': return <Globe className="w-5 h-5 text-rose-gold" />;
      case 'fire': return <Flame className="w-5 h-5 text-rose-gold animate-pulse" />;
      case 'eye': return <Eye className="w-5 h-5 text-rose-gold" />;
      case 'award': return <Award className="w-5 h-5 text-rose-gold" />;
      default: return <Heart className="w-5 h-5 text-rose-gold fill-current" />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-20 relative z-30">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <span className="text-xs font-mono text-rose-gold uppercase tracking-widest block mb-2">Our Chapters</span>
        <h3 className="text-3xl md:text-5xl font-serif italic text-ivory">The Scrapbook of Us</h3>
        <p className="text-xs font-mono text-ivory/50 mt-2">A hand-crafted retrospective of our five months</p>
      </motion.div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {STORY_CHAPTERS.map((chap, idx) => {
          return (
            <motion.div
              key={chap.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ 
                y: -6, 
                boxShadow: "0 16px 36px rgba(0,0,0,0.5)",
                borderColor: "rgba(183,110,121,0.5)"
              }}
              className="bg-charcoal/60 backdrop-blur-md border border-rose-gold/25 rounded-2xl p-6 flex flex-col justify-between shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300 relative group overflow-hidden"
            >
              {/* Corner decor sparkle */}
              <div className="absolute top-3 right-3 text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>

              <div>
                <div className="w-10 h-10 rounded-full bg-rose-gold/20 border border-rose-gold/30 flex items-center justify-center mb-4">
                  {getIcon(chap.icon)}
                </div>

                <span className="text-[10px] font-mono text-rose-gold uppercase tracking-wider block mb-1">
                  {chap.subtitle}
                </span>

                <h4 className="text-xl font-display font-semibold text-ivory tracking-tight mb-3">
                  {chap.title}
                </h4>

                <p className="text-sm text-ivory/80 leading-relaxed font-serif italic mb-6">
                  "{chap.text}"
                </p>
              </div>

              {/* Small Category Footnote */}
              <div className="flex items-center justify-between pt-4 border-t border-rose-gold/10 text-[9px] font-mono text-ivory/40">
                <span>chapter index: 0{idx + 1}</span>
                <span>{chap.category.toUpperCase()}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
