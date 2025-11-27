export interface BlogPost {
 slug: string;
 title: string;
 titleDe?: string; // German translation of title
 description: string;
 descriptionDe?: string; // German translation of description
 content: string;
 contentDe?: string; // German translation of content
 heroImage: string;
 category: string;
 tags: string[];
 tagsDe?: string[]; // German translations of tags
 author: string;
 publishDate: string;
 readingTime: number; // in minutes
 readingTimeDe?: number; // German reading time (may differ)
 featured?: boolean;
}

export interface BlogCategory {
 id: string;
 name: string;
 nameDe?: string; // German translation of name
 description: string;
 descriptionDe?: string; // German translation of description
 color: string;
}
