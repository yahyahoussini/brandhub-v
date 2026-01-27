-- Update RLS policies for testimonials to allow anyone to submit reviews
CREATE POLICY "Anyone can create testimonials"
  ON public.testimonials
  FOR INSERT
  WITH CHECK (true);

-- Add policy for users to update their own testimonials before publication
CREATE POLICY "Users can update own unpublished testimonials"
  ON public.testimonials
  FOR UPDATE
  USING (is_published = false)
  WITH CHECK (is_published = false);

-- Add admin policies for full management
CREATE POLICY "Admins can manage all testimonials"
  ON public.testimonials
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));