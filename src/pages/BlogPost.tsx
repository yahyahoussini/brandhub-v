import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { Helmet } from "react-helmet";

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.slug === id);

  if (!post) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Article non trouvé</h1>
          <p className="text-muted-foreground mb-8">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
          <Button asChild>
            <Link to="/blog">Retour au blog</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{post.title} | Blog BrandHub.ma</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <Navbar />

      <article className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Button variant="ghost" className="mb-8" asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Retour au blog
            </Link>
          </Button>

          {/* Category Badge */}
          <div className="mb-4">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium text-sm">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 animate-fade-in">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>{post.author}</span>
            </div>
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </Button>
          </div>

          {/* Featured Image */}
          <div className="aspect-video mb-12 rounded-2xl overflow-hidden shadow-elegant animate-fade-in">
            <img
              src={post.image || 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&h=600&fit=crop'}
              alt={post.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none animate-fade-in prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA Section */}
          <div className="mt-16 p-8 rounded-2xl gradient-primary text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Besoin d'aide pour votre projet?
            </h3>
            <p className="text-white/90 mb-6">
              Discutons de comment nous pouvons vous aider à atteindre vos objectifs digitaux.
            </p>
            <Button
              size="lg"
              className="gradient-accent text-foreground hover:shadow-accent transition-smooth font-semibold"
              asChild
            >
              <Link to="/contact">
                Contactez-nous
              </Link>
            </Button>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
