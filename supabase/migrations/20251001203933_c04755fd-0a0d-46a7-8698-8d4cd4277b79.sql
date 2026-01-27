-- Create service examples table
CREATE TABLE public.service_examples (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  project_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  display_order INTEGER DEFAULT 0
);

-- Create service landing content table
CREATE TABLE public.service_landing_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create service pricing tiers table
CREATE TABLE public.service_pricing_tiers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  tier_name TEXT NOT NULL CHECK (tier_name IN ('basic', 'standard', 'advanced')),
  description TEXT NOT NULL,
  delivery_time TEXT NOT NULL,
  revisions_count INTEGER NOT NULL,
  price NUMERIC NOT NULL,
  details TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(service_id, tier_name)
);

-- Enable RLS
ALTER TABLE public.service_examples ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_landing_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_pricing_tiers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for service_examples
CREATE POLICY "Anyone can view service examples"
  ON public.service_examples FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage service examples"
  ON public.service_examples FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies for service_landing_content
CREATE POLICY "Anyone can view landing content"
  ON public.service_landing_content FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage landing content"
  ON public.service_landing_content FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies for service_pricing_tiers
CREATE POLICY "Anyone can view pricing tiers"
  ON public.service_pricing_tiers FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage pricing tiers"
  ON public.service_pricing_tiers FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));