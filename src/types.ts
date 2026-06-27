/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface QuestStep {
  id: number;
  title: string;
  hint: string;
  memoryTitle: string;
  memoryText: string;
  quote: string;
  icon: 'heart' | 'sparkles' | 'globe' | 'cloud' | 'star';
  glowColor: string;
  interactiveGame: {
    type: 'click-stars' | 'connect-dots' | 'match-cards' | 'grow-flower' | 'unlock-compass';
    prompt: string;
  };
}

export interface HiddenSecret {
  id: string;
  type: 'heart' | 'moon' | 'flower' | 'star' | 'coffee' | 'camera';
  message: string;
  title: string;
  iconName: string;
}

export interface StoryChapter {
  id: string;
  title: string;
  subtitle: string;
  text: string;
  insideJoke?: string;
  category: 'Beginning' | 'LDR' | 'Business' | 'Travel' | 'Deep Love';
  icon: string;
}

export interface FutureMilestone {
  id: string;
  title: string;
  year: string;
  emoji: string;
  description: string;
  x: number; // Percent on path
  y: number; // Percent on path
}

export interface PolaroidPhoto {
  id: number;
  title: string;
  date: string;
  caption: string;
  sketchType: 'beginning' | 'train' | 'meeting' | 'dreams' | 'forever';
  rotation: number; // degrees
}
