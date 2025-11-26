import { BlogCategory } from './types';

export const blogCategories: BlogCategory[] = [
  {
    id: 'focus',
    name: 'Focus & Productivity',
    description: 'Tips and insights for better concentration and productive work',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'ambient',
    name: 'Ambient Music',
    description: 'Exploring atmospheric soundscapes and ambient music',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'relaxation',
    name: 'Relaxation',
    description: 'Techniques and music for stress relief and unwinding',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'music-theory',
    name: 'Music Insights',
    description: 'Behind the scenes and music production insights',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    description: 'Music and lifestyle tips for daily life',
    color: 'from-indigo-500 to-violet-500'
  }
];
