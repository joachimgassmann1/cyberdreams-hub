import { BlogPost } from './types';
import { demoArticleContent } from './demo-article';

export const blogPosts: BlogPost[] = [
  {
    slug: 'ultimate-guide-focus-music-productivity',
    title: 'The Ultimate Guide to Focus Music for Maximum Productivity',
    description: 'Discover how the right music can transform your work sessions, backed by science and curated for peak performance. Learn which soundscapes work best for different tasks.',
    content: demoArticleContent,
    heroImage: '/blog-images/focus-music-productivity-hero.webp',
    category: 'focus',
    tags: ['Focus Music', 'Productivity', 'Deep Work', 'Concentration', 'Study Music'],
    author: 'Sphere Music Hub Team',
    publishDate: '2025-11-26',
    readingTime: 8,
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
