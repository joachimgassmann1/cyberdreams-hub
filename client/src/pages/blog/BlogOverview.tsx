import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { getAllPosts, getPostsByCategory } from '@/data/blog/posts';
import { blogCategories } from '@/data/blog/categories';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import OptimizedImage from '@/components/OptimizedImage';
import { calculateReadTime, formatReadTime } from '@/lib/readTime';
import { Helmet } from 'react-helmet-async';
import { detectLanguage } from '@/lib/i18n';

const POSTS_PER_PAGE = 12;

export default function BlogOverview() {
  const lang = detectLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Use current domain for canonical URL
  const currentDomain = typeof window !== 'undefined' ? window.location.hostname : 'sphere-music-hub.com';
  const baseDomain = currentDomain.includes('sphere-music-hub.de') ? 'sphere-music-hub.de' : 'sphere-music-hub.com';

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const allPosts = selectedCategory 
    ? getPostsByCategory(selectedCategory)
    : getAllPosts();

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handleCategoryFilter = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <Helmet>
        <title>Blog - Sphere Music Hub | Focus Music, Productivity & Ambient Soundscapes</title>
        <meta name="description" content="Discover tips, guides, and stories about focus music, productivity, ambient soundscapes, chillout music, jazz, piano, and cyberpunk atmospheres. Expert insights for work and relaxation." />
        <meta property="og:title" content="Blog - Sphere Music Hub | Focus Music, Productivity & Ambient Soundscapes" />
        <meta property="og:description" content="Discover tips, guides, and stories about focus music, productivity, ambient soundscapes, chillout music, jazz, piano, and cyberpunk atmospheres. Expert insights for work and relaxation." />
        <meta property="og:url" content="https://sphere-music-hub.com/blog" />
        <meta name="twitter:title" content="Blog - Sphere Music Hub | Focus Music, Productivity & Ambient Soundscapes" />
        <meta name="twitter:description" content="Discover tips, guides, and stories about focus music, productivity, ambient soundscapes, chillout music, jazz, piano, and cyberpunk atmospheres. Expert insights for work and relaxation." />
        <link rel="canonical" href={`https://${baseDomain}/blog`} />
        <link rel="alternate" hrefLang="en" href="https://sphere-music-hub.com/blog" />
        <link rel="alternate" hrefLang="de" href="https://sphere-music-hub.de/blog" />
        <link rel="alternate" hrefLang="x-default" href="https://sphere-music-hub.com/blog" />
      </Helmet>
      <Navigation />
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10" />
        <div className="container relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 pb-2 leading-tight bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {lang === 'de' ? 'Blog & Musik-Einblicke' : 'Blog & Music Insights'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            {lang === 'de'
              ? 'Entdecke Tipps, Guides und Geschichten über Fokusmusik, Produktivität, Ambient-Soundscapes und die Kunst, die perfekte Atmosphäre für Arbeit und Entspannung zu schaffen.'
              : 'Discover tips, guides, and stories about focus music, productivity, ambient soundscapes, and the art of creating the perfect atmosphere for work and relaxation.'}
          </p>
          <p className="text-lg text-muted-foreground/80 max-w-3xl mx-auto">
            {lang === 'de'
              ? 'Erkunde Kategorien inspiriert vom Sphere Music Universe — von Fokus und Chillout bis Jazz, Piano, Cyberpunk und mehr.'
              : 'Explore categories inspired by the Sphere Music Universe — from Focus and Chillout to Jazz, Piano, Cyberpunk and more.'}
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="container px-4 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => handleCategoryFilter(null)}
            className="rounded-full whitespace-nowrap"
          >
            All
          </Button>
          {blogCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => handleCategoryFilter(category.id)}
              className="rounded-full whitespace-nowrap"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="container px-4 py-12">
        {currentPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              No articles yet. Check back soon for fresh content!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => {
              const category = blogCategories.find(c => c.id === post.category);
              const dynamicReadTime = calculateReadTime(post.content);
              
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <article className="group h-full bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                    {/* Hero Image */}
                    <div className="relative h-56 overflow-hidden bg-muted">
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
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {lang === 'de' && post.titleDe ? post.titleDe : post.title}
                      </h2>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {lang === 'de' && post.descriptionDe ? post.descriptionDe : post.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatReadTime(dynamicReadTime)}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {(lang === 'de' && post.tagsDe ? post.tagsDe : post.tags).slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Read More */}
                      <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                        Read Article
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                  className="w-10"
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </section>
      
      <Footer />
    </div>
  );
}