import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { getAllPosts } from '@/data/blog/posts';
import { blogCategories } from '@/data/blog/categories';
import OptimizedImage from './OptimizedImage';
import { calculateReadTime, formatReadTime } from '@/lib/readTime';
import { detectLanguage } from '@/lib/i18n';

export default function BlogTeaser() {
  const lang = detectLanguage();
  // Get the 3 most recent posts
  const recentPosts = getAllPosts().slice(0, 3);

  if (recentPosts.length === 0) return null;

  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {lang === 'de' ? 'Neueste Artikel' : 'Latest Articles'}
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              {lang === 'de' 
                ? 'Entdecke Tipps, Guides und Geschichten über Fokusmusik, Produktivität und Ambient-Soundscapes.'
                : 'Discover tips, guides, and stories about focus music, productivity, and ambient soundscapes.'}
            </p>
          </div>
          <a 
            href="/blog" 
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all whitespace-nowrap"
          >
            {lang === 'de' ? 'Alle Artikel ansehen' : 'View All Articles'}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentPosts.map((post) => {
            const category = blogCategories.find(c => c.id === post.category);
            const dynamicReadTime = calculateReadTime(post.content);
            
            return (
              <a key={post.slug} href={`/blog/${post.slug}`}>
                <article className="group h-full bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 flex flex-col">
                  {/* Hero Image */}
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <OptimizedImage
                      src={post.heroImage}
                      alt={`${post.title} - ${post.description}`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Category Badge */}
                    {category && (
                      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${category.color}`}>
                        {category.name}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {lang === 'de' && post.titleDe ? post.titleDe : post.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                      {lang === 'de' && post.descriptionDe ? post.descriptionDe : post.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto pt-4 border-t border-border/50">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(post.publishDate).toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatReadTime(dynamicReadTime)}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
