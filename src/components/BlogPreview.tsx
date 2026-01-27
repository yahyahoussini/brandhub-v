import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SparklesCore } from "./ui/sparkles";
import { blogPosts } from "@/data/blog";

const BlogPreview = () => {
  // Use local data for instant load and consistency with BlogPost page
  const posts = blogPosts.slice(0, 3);

  return (
    <section className="py-20 bg-muted/30" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12 animate-fade-in">
          <div>
            <div className="relative inline-block">
              <div className="w-full h-20 absolute top-0">
                <SparklesCore
                  background="transparent"
                  minSize={0.4}
                  maxSize={1}
                  particleDensity={800}
                  className="w-full h-full"
                  particleColor="#8b5cf6"
                />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-2 relative z-10">
                Derniers <span className="gradient-primary bg-clip-text text-transparent">Articles</span>
              </h2>
            </div>
            <p className="text-xl text-muted-foreground">
              Conseils et insights pour votre succès digital
            </p>
          </div>

          <Button variant="outline" className="hidden md:flex" asChild>
            <Link to="/blog" aria-label="Voir tous les articles du blog">
              Voir tout
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {posts.map((post, index) => (
            <Link key={post.id} to={`/blog/${post.slug}`} aria-label={`Lire l'article: ${post.title}`}>
              <Card className="hover-lift overflow-hidden h-full animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop"}
                    alt={post.title}
                    loading="lazy"
                    width="800"
                    height="600"
                    decoding="async"
                    className="w-full h-full object-cover transition-smooth group-hover:scale-110"
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

                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 flex items-center text-primary font-semibold text-sm">
                    Lire l'article →
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center md:hidden">
          <Button variant="outline" asChild>
            <Link to="/blog" aria-label="Voir tous les articles du blog">
              Voir tous les articles
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
