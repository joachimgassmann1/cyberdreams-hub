import { useState } from 'react';
import { Link } from 'wouter';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { getAllPosts, getPostsByCategory } from '@/data/blog/posts';
import { blogCategories } from '@/data/blog/categories';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const POSTS_PER_PAGE = 12;

export default function BlogOverview() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
      <Navigation />
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10" />
        <div className="container relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 pb-2 leading-tight bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Blog & Music Insights
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Discover tips, guides, and stories about focus music, productivity, ambient soundscapes, and the art of creating the perfect atmosphere for work and relaxation.
          </p>
          <p className="text-lg text-muted-foreground/80 max-w-3xl mx-auto">
            Explore categories inspired by the Sphere Music Universe — from Focus and Chillout to Jazz, Piano, Cyberpunk and more.
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
              
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <article className="group h-full bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                    {/* Hero Image */}
                    <div className="relative h-56 overflow-hidden bg-muted">
                      <img
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
                        {post.title}
                      </h2>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readingTime} min read</span>
                        </div>
                      </div>

                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
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