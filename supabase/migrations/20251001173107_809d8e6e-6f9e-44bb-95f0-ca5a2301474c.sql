-- Create profiles table for additional user information
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  company TEXT,
  website TEXT,
  avatar_url TEXT,
  bio TEXT,
  role TEXT DEFAULT 'client',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  price_starting DECIMAL(10, 2),
  features TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on services
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Services policies (public read)
CREATE POLICY "Anyone can view active services"
  ON public.services FOR SELECT
  USING (is_active = true);

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  service_category TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  budget DECIMAL(10, 2),
  deadline DATE,
  requirements JSONB,
  attachments TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Projects policies
CREATE POLICY "Users can view own projects"
  ON public.projects FOR SELECT
  USING (auth.uid() = client_id);

CREATE POLICY "Users can create own projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Users can update own projects"
  ON public.projects FOR UPDATE
  USING (auth.uid() = client_id);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  tags TEXT[],
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on blog_posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Blog posts policies
CREATE POLICY "Anyone can view published blog posts"
  ON public.blog_posts FOR SELECT
  USING (is_published = true);

-- Create contact_inquiries table
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT NOT NULL,
  service_interest TEXT,
  status TEXT DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on contact_inquiries
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Contact inquiries policies
CREATE POLICY "Anyone can create inquiries"
  ON public.contact_inquiries FOR INSERT
  WITH CHECK (true);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  company TEXT,
  position TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on testimonials
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Testimonials policies
CREATE POLICY "Anyone can view published testimonials"
  ON public.testimonials FOR SELECT
  USING (is_published = true);

-- Create project_updates table
CREATE TABLE IF NOT EXISTS public.project_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  attachments TEXT[],
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on project_updates
ALTER TABLE public.project_updates ENABLE ROW LEVEL SECURITY;

-- Project updates policies
CREATE POLICY "Users can view updates for their projects"
  ON public.project_updates FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_updates.project_id
      AND projects.client_id = auth.uid()
    )
  );

-- Create custom_quotes table
CREATE TABLE IF NOT EXISTS public.custom_quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  services JSONB NOT NULL,
  total_estimate DECIMAL(10, 2),
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on custom_quotes
ALTER TABLE public.custom_quotes ENABLE ROW LEVEL SECURITY;

-- Custom quotes policies
CREATE POLICY "Users can view own quotes"
  ON public.custom_quotes FOR SELECT
  USING (auth.uid() = client_id);

CREATE POLICY "Anyone can create quotes"
  ON public.custom_quotes FOR INSERT
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_inquiries_updated_at
  BEFORE UPDATE ON public.contact_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_custom_quotes_updated_at
  BEFORE UPDATE ON public.custom_quotes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert some initial services data
INSERT INTO public.services (category, title, description, icon, features, is_active) VALUES
('programming', 'Développement WordPress', 'Sites web WordPress professionnels et personnalisés', 'Code', ARRAY['Design sur mesure', 'SEO optimisé', 'Responsive'], true),
('programming', 'Applications Mobile', 'Applications iOS et Android natives', 'Smartphone', ARRAY['iOS', 'Android', 'Cross-platform'], true),
('programming', 'E-commerce', 'Boutiques en ligne WooCommerce et Shopify', 'ShoppingCart', ARRAY['WooCommerce', 'Shopify', 'Paiement sécurisé'], true),
('graphics', 'Logo & Identité', 'Création de logo et identité visuelle complète', 'Palette', ARRAY['Logo unique', 'Charte graphique', 'Brand guidelines'], true),
('graphics', 'UI/UX Design', 'Design d''interface utilisateur moderne', 'Layers', ARRAY['Wireframes', 'Prototypes', 'Design system'], true),
('content', 'Rédaction Web', 'Contenu optimisé pour le web et SEO', 'PenTool', ARRAY['Articles de blog', 'Pages web', 'SEO'], true),
('content', 'Marketing Digital', 'Stratégies marketing complètes', 'TrendingUp', ARRAY['Social media', 'Email marketing', 'Publicité'], true),
('business', 'Analyse de Données', 'Business intelligence et analytics', 'BarChart3', ARRAY['Dashboards', 'Reports', 'Insights'], true),
('business', 'Consultation', 'Conseil stratégique et business plans', 'Users', ARRAY['Stratégie', 'Business plan', 'Études de marché'], true)
ON CONFLICT DO NOTHING;

-- Insert some sample blog posts
INSERT INTO public.blog_posts (title, slug, excerpt, content, category, is_published, published_at) VALUES
('Les Tendances du Design Web en 2025', 'tendances-design-web-2025', 'Découvrez les dernières tendances qui révolutionnent le design web.', 'Le design web évolue constamment...', 'Design', true, NOW()),
('Comment l''IA Transforme le Marketing Digital', 'ia-marketing-digital', 'L''intelligence artificielle redéfinit les stratégies marketing.', 'L''IA permet maintenant...', 'Marketing', true, NOW()),
('Créer une Identité de Marque Impactante', 'identite-marque-impactante', 'Guide complet pour développer une identité de marque qui se démarque.', 'Une identité de marque forte...', 'Branding', true, NOW())
ON CONFLICT DO NOTHING;