import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blog";
import { useEffect, useState } from "react";

const Blog = () => {
  // Use local data directly for instant load and perfect SEO content
  const posts = blogPosts;

  const formatDate = (dateString: string) => {
    // Basic date parsing since our local data is already formatted or consistent
    return dateString;
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Notre <span className="gradient-primary bg-clip-text text-transparent">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Conseils, tendances et insights pour votre succès digital
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length === 0 ? (
              <p className="text-center text-muted-foreground col-span-full">
                Aucun article disponible pour le moment.
              </p>
            ) : (
              posts.map((post, index) => (
                <Link key={post.id} to={`/blog/${post.slug}`}>
                  <Card className="hover-lift overflow-hidden h-full animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image || 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=600&fit=crop'}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-smooth hover:scale-110"
                      />
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                          {post.category}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{post.date}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold mb-2 hover:text-primary transition-base">
                        {post.title}
                      </h3>

                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="mt-4 flex items-center text-primary font-semibold text-sm">
                        Lire l'article →
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
