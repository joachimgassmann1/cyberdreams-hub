import { BlogPost } from './types';
import { focusMusicGuide } from './focus-music-guide';
import { chilloutPsychology } from './chillout-psychology';
import { cyberpunkSoundscapes } from './cyberpunk-soundscapes';
import { jazzAtmosphere } from './jazz-atmosphere';
import { pianoSoul } from './piano-soul';
import { quietCureRelaxation } from './quiet-cure-relaxation';
import { joachimCreatorStory } from './joachim-creator-story';
import { insideAtmosphereCreativeProcess } from './inside-atmosphere-creative-process';
import { nightShiftMind } from './night-shift-mind';
import { binauralBeats } from './binaural-beats';

export const blogPosts: BlogPost[] = [
  {
    ...binauralBeats,
    featured: true
  },
  {
    ...nightShiftMind,
    featured: true
  },
  {
    ...insideAtmosphereCreativeProcess,
    featured: true
  },
  {
    ...joachimCreatorStory,
    featured: true
  },
  {
    ...quietCureRelaxation,
    featured: true
  },
  {
    ...pianoSoul,
    featured: true
  },
  {
    ...jazzAtmosphere,
    featured: true
  },
  {
    ...cyberpunkSoundscapes,
    featured: true
  },
  {
    ...chilloutPsychology,
    featured: true
  },
  {
    ...focusMusicGuide,
    featured: true
  }
];

// Helper function to get all posts
export const getAllPosts = (): BlogPost[] => {
  return blogPosts.sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
};

// Helper function to get post by slug
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

// Helper function to get posts by category
export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts
    .filter(post => post.category === category)
    .sort((a, b) => 
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
};

// Helper function to get featured posts
export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts
    .filter(post => post.featured)
    .sort((a, b) => 
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
};

// Helper function to get related posts with relevance scoring
export const getRelatedPosts = (currentSlug: string, limit: number = 3): BlogPost[] => {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];
  
  // Calculate relevance score for each post
  const allPostsWithScore = blogPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      let score = 0;
      
      // Same category: +10 points
      if (post.category === currentPost.category) {
        score += 10;
      }
      
      // Shared tags: +5 points per tag
      const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag));
      score += sharedTags.length * 5;
      
      return { post, score };
    })
    .sort((a, b) => {
      // Sort by score first (descending)
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      // Then by date (newest first)
      return new Date(b.post.publishDate).getTime() - new Date(a.post.publishDate).getTime();
    });
  
  // Get relevant posts (score > 0)
  const relevantPosts = allPostsWithScore.filter(item => item.score > 0);
  
  // If we have enough relevant posts, return them
  if (relevantPosts.length >= limit) {
    return relevantPosts.slice(0, limit).map(item => item.post);
  }
  
  // Otherwise, fill up with latest posts (even if score is 0)
  const fillerPosts = allPostsWithScore
    .filter(item => item.score === 0)
    .slice(0, limit - relevantPosts.length);
  
  return [...relevantPosts, ...fillerPosts].map(item => item.post);
};
