import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Calendar, Clock, ArrowRight, Tag, Search, X } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');
  
  // Use current domain for canonical URL
  const currentDomain = typeof window !== 'undefined' ? window.location.hostname : 'sphere-music-hub.com';
  const baseDomain = currentDomain.includes('sphere-music-hub.de') ? 'sphere-music-hub.de' : 'sphere-music-hub.com';

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Scroll to top when pagination changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Filter posts by category first
  const categoryFilteredPosts = selectedCategory 
    ? getPostsByCategory(selectedCategory)
    : getAllPosts();

  // Then filter by search query
  const allPosts = searchQuery.trim() === ''
    ? categoryFilteredPosts
    : categoryFilteredPosts.filter(post => {
        const query = searchQuery.toLowerCase();
        const title = (lang === 'de' && post.titleDe ? post.titleDe : post.title).toLowerCase();
        const description = (lang === 'de' && post.descriptionDe ? post.descriptionDe : post.description).toLowerCase();
        const tags = (lang === 'de' && post.tagsDe ? post.tagsDe : post.tags).map(t => t.toLowerCase());
        
        return title.includes(query) || 
               description.includes(query) || 
               tags.some(tag => tag.includes(query));
      });

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handleCategoryFilter = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const clearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <Helmet>
        <html lang={lang} />
        <title>{lang === 'de' ? 'Blog - Sphere Music Hub | Fokusmusik, Produktivität & Ambient-Soundscapes' : 'Blog - Sphere Music Hub | Focus Music, Productivity & Ambient Soundscapes'}</title>
        <meta name="description" content={lang === 'de' ? 'Entdecke Tipps, Guides und Geschichten über Fokusmusik, Produktivität, Ambient-Soundscapes, Chillout-Musik, Jazz, Piano und Cyberpunk-Atmosphären. Experteneinblicke für Arbeit und Entspannung.' : 'Discover tips, guides, and stories about focus music, productivity, ambient soundscapes, chillout music, jazz, piano, and cyberpunk atmospheres. Expert insights for work and relaxation.'} />
        <meta httpEquiv="content-language" content={lang} />
        <meta property="og:title" content={lang === 'de' ? 'Blog - Sphere Music Hub | Fokusmusik, Produktivität & Ambient-Soundscapes' : 'Blog - Sphere Music Hub | Focus Music, Productivity & Ambient Soundscapes'} />
        <meta property="og:description" content={lang === 'de' ? 'Entdecke Tipps, Guides und Geschichten über Fokusmusik, Produktivität, Ambient-Soundscapes, Chillout-Musik, Jazz, Piano und Cyberpunk-Atmosphären.' : 'Discover tips, guides, and stories about focus music, productivity, ambient soundscapes, chillout music, jazz, piano, and cyberpunk atmospheres.'} />
        <meta property="og:url" content={`https://${baseDomain}/blog`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`https://${baseDomain}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`https://${baseDomain}/og-image.jpg`} />
        <meta name="twitter:title" content={lang === 'de' ? 'Blog - Sphere Music Hub | Fokusmusik, Produktivität & Ambient-Soundscapes' : 'Blog - Sphere Music Hub | Focus Music, Productivity & Ambient Soundscapes'} />
        <meta name="twitter:description" content={lang === 'de' ? 'Entdecke Tipps, Guides und Geschichten über Fokusmusik, Produktivität, Ambient-Soundscapes, Chillout-Musik, Jazz, Piano und Cyberpunk-Atmosphären.' : 'Discover tips, guides, and stories about focus music, productivity, ambient soundscapes, chillout music, jazz, piano, and cyberpunk atmospheres.'} />
        <link rel="canonical" href={`https://${baseDomain}/blog`} />
        <link rel="alternate" hrefLang="en" href="https://sphere-music-hub.com/blog" />
        <link rel="alternate" hrefLang="de" href="https://sphere-music-hub.de/blog" />
        <link rel="alternate" hrefLang="x-default" href="https://sphere-music-hub.com/blog" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": lang === 'de' ? 'Blog - Sphere Music Hub' : 'Blog - Sphere Music Hub',
            "description": lang === 'de' ? 'Entdecke Tipps, Guides und Geschichten über Fokusmusik, Produktivität und Ambient-Soundscapes.' : 'Discover tips, guides, and stories about focus music, productivity, and ambient soundscapes.',
            "url": `https://${baseDomain}/blog`,
            "inLanguage": lang,
            "isPartOf": {
              "@type": "WebSite",
              "name": "Sphere Music Hub",
              "url": `https://${baseDomain}/`
            }
          })}
        </script>
      </Helmet>
      <Navigation />
      {/* Hero Section */}
      <section className="relative py-20 md:py-24 px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/blog-hero-bg.webp"
            alt=""
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/40 to-background/90" />
        </div>
        <div className="container relative z-10 flex flex-col items-center justify-center min-h-[320px] md:min-h-[380px]">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-xl" />
              {/* Icon container */}
              <div className="relative p-4 rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10 backdrop-blur-sm border border-primary/30">
                {/* Soundwave bars */}
                <div className="flex items-center gap-1 w-12 h-12 md:w-14 md:h-14">
                  <div className="w-1 bg-gradient-to-t from-cyan-400 to-cyan-300 rounded-full h-6 animate-pulse" style={{animationDelay: '0s'}} />
                  <div className="w-1 bg-gradient-to-t from-purple-400 to-purple-300 rounded-full h-10 animate-pulse" style={{animationDelay: '0.1s'}} />
                  <div className="w-1 bg-gradient-to-t from-pink-400 to-pink-300 rounded-full h-8 animate-pulse" style={{animationDelay: '0.2s'}} />
                  <div className="w-1 bg-gradient-to-t from-cyan-400 to-cyan-300 rounded-full h-12 animate-pulse" style={{animationDelay: '0.3s'}} />
                  <div className="w-1 bg-gradient-to-t from-purple-400 to-purple-300 rounded-full h-7 animate-pulse" style={{animationDelay: '0.4s'}} />
                  <div className="w-1 bg-gradient-to-t from-pink-400 to-pink-300 rounded-full h-10 animate-pulse" style={{animationDelay: '0.5s'}} />
                  <div className="w-1 bg-gradient-to-t from-cyan-400 to-cyan-300 rounded-full h-6 animate-pulse" style={{animationDelay: '0.6s'}} />
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-cyan-300 via-white to-cyan-300 bg-clip-text text-transparent whitespace-nowrap text-center">
            {lang === 'de' ? 'Blog & Musik-Insights' : 'Blog & Music Insights'}
          </h1>
          <p className="text-lg text-foreground/80 max-w-3xl text-center">
            {lang === 'de'
              ? 'Tipps, Guides und Geschichten über Fokusmusik, Produktivität, Ambient-Soundscapes und die Kunst der perfekten Atmosphäre.'
              : 'Tips, guides, and stories about focus music, productivity, ambient soundscapes, and the art of the perfect atmosphere.'}
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="container px-4 py-8">
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder={lang === 'de' ? 'Artikel durchsuchen...' : 'Search articles...'}
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-12 py-4 bg-card border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="mt-3 text-sm text-muted-foreground text-center">
              {lang === 'de' 
                ? `${allPosts.length} ${allPosts.length === 1 ? 'Ergebnis' : 'Ergebnisse'} für "${searchQuery}"`
                : `${allPosts.length} ${allPosts.length === 1 ? 'result' : 'results'} for "${searchQuery}"`}
            </p>
          )}
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
                  <article className="group h-full bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 flex flex-col">
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
                    <div className="p-6 flex flex-col flex-grow">
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
                      <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all mt-auto">
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