import { BlogPost } from './types';
import { focusMusicGuide } from './focus-music-guide';
import { chilloutPsychology } from './chillout-psychology';
import { cyberpunkSoundscapes } from './cyberpunk-soundscapes';

export const blogPosts: BlogPost[] = [
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

// Helper function to get related posts
export const getRelatedPosts = (currentSlug: string, limit: number = 3): BlogPost[] => {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];
  
  return blogPosts
    .filter(post => 
      post.slug !== currentSlug && 
      (post.category === currentPost.category || 
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .slice(0, limit);
};
