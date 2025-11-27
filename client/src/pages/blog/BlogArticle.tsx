import { useEffect } from "react";
import { Link, useParams, useLocation } from "wouter";
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import SocialShare from "@/components/SocialShare";
import { Streamdown } from 'streamdown';
import { getPostBySlug, getRelatedPosts } from '@/data/blog/posts';
import { blogCategories } from '@/data/blog/categories';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NotFound from '@/pages/NotFound';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import ScrollToTop from '@/components/ScrollToTop';
import { calculateReadTime, formatReadTime } from '@/lib/readTime';
import { Helmet } from 'react-helmet-async';
import { detectLanguage } from '@/lib/i18n';

export default function BlogArticle() {
  const lang = detectLanguage();
  const params = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const post = getPostBySlug(params.slug || '');

  if (!post) {
    return <NotFound />;
  }

  const category = blogCategories.find(c => c.id === post.category);
  const relatedPosts = getRelatedPosts(post.slug);
  const dynamicReadTime = calculateReadTime(post.content);

  useEffect(() => {
    // Scroll to top when article loads
    window.scrollTo(0, 0);
  }, []);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description,
          url: url,
        });
      } catch (err) {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(url);
      }
    } else {
      navigator.clipboard.writeText(url);
    }
  };

  const displayTitle = lang === 'de' && post.titleDe ? post.titleDe : post.title;
  const displayDescription = lang === 'de' && post.descriptionDe ? post.descriptionDe : post.description;
  const displayTags = lang === 'de' && post.tagsDe ? post.tagsDe : post.tags;
  const displayContent = lang === 'de' && post.contentDe ? post.contentDe : post.content;

  const articleUrl = `https://sphere-music-hub.com/blog/${post.slug}`;
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": displayTitle,
    "description": displayDescription,
    "image": post.heroImage,
    "datePublished": post.publishDate,
    "dateModified": post.publishDate,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://sphere-music-hub.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sphere Music Hub",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sphere-music-hub.com/logo.png"
      }
    },
    "keywords": displayTags.join(', '),
    "articleSection": category?.name || 'Music',
    "wordCount": post.content.split(/\s+/).length,
    "timeRequired": `PT${post.readingTime}M`
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <Helmet>
        <title>{displayTitle} | Sphere Music Hub Blog</title>
        <meta name="description" content={displayDescription} />
        <meta property="og:title" content={displayTitle} />
        <meta property="og:description" content={displayDescription} />
        <meta property="og:image" content={post.heroImage} />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publishDate} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={category?.name || 'Music'} />
        {displayTags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={displayTitle} />
        <meta name="twitter:description" content={displayDescription} />
        <meta name="twitter:image" content={post.heroImage} />
        <link rel="canonical" href={articleUrl} />
        <link rel="alternate" hrefLang="en" href={`https://sphere-music-hub.com/blog/${post.slug}`} />
        <link rel="alternate" hrefLang="de" href={`https://sphere-music-hub.de/blog/${post.slug}`} />
        <link rel="alternate" hrefLang="x-default" href={`https://sphere-music-hub.com/blog/${post.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      <Navigation />
      <ReadingProgressBar />
      <ScrollToTop />
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <OptimizedImage
          src={post.heroImage}
          alt={`${post.title} - ${post.description}`}
          fetchPriority="high"
          loading="eager"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-8 left-4 md:left-8">
          <Link href="/blog">
            <Button variant="outline" className="bg-background/80 backdrop-blur-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container max-w-4xl">
            {/* Category Badge */}
            {category && (
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${category.color} mb-4`}>
                {category.name}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              {displayTitle}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{formatReadTime(dynamicReadTime)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>By {post.author}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="text-white hover:text-white hover:bg-white/20"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="container max-w-4xl px-4 py-12 md:py-16">
        {/* Description */}
        <div className="text-xl text-muted-foreground mb-8 pb-8 border-b border-border">
          {displayDescription}
        </div>

        {/* Main Content */}
        <div className="prose prose-lg prose-invert max-w-none
          prose-headings:font-bold prose-headings:text-foreground
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-strong:text-foreground prose-strong:font-semibold
          prose-ul:my-6 prose-li:text-muted-foreground
          prose-img:rounded-xl prose-img:my-8
          prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic
        ">
          <Streamdown>{displayContent}</Streamdown>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">TAGS</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm hover:bg-muted/80 transition-colors cursor-pointer"
                >
                  <Tag className="w-4 h-4" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Social Share */}
        <SocialShare
          title={displayTitle}
          url={`https://sphere-music-hub.com/blog/${post.slug}`}
          description={displayDescription}
        />
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="container max-w-6xl px-4 py-16 border-t border-border">
          <h2 className="text-3xl font-bold mb-8 text-center">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => {
              const relatedCategory = blogCategories.find(c => c.id === relatedPost.category);
              
              return (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                  <article className="group h-full bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <OptimizedImage
                        src={relatedPost.heroImage}
                        alt={`${relatedPost.title} - ${relatedPost.description}`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {relatedCategory && (
                        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${relatedCategory.color}`}>
                          {relatedCategory.name}
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {relatedPost.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{relatedPost.readingTime} min read</span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="container max-w-4xl px-4 py-16">
        <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-8 md:p-12 text-center border border-primary/20">
          <h2 className="text-3xl font-bold mb-4">Enjoy Our Music Channels</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Discover our curated collection of focus music, ambient soundscapes, and relaxing beats designed to enhance your productivity and well-being.
          </p>
          <Link href="/">
            <Button size="lg" className="rounded-full">
              Explore Channels
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
