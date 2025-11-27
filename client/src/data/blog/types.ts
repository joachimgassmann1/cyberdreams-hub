export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  heroImage: string;
  category: string;
  tags: string[];
  author: string;
  publishDate: string;
  readingTime: number; // in minutes
  featured?: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  color: string;
}
