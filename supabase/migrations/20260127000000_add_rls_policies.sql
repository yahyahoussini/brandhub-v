-- Migration: Add comprehensive Row Level Security (RLS) policies
-- Created: 2026-01-27
-- Description: Implement security policies for all tables to prevent unauthorized access

-- Enable RLS on all tables
ALTER TABLE IF EXISTS blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS services ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS service_details ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM auth.users
    WHERE auth.uid() = id
    AND raw_user_meta_data->>'role' = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- BLOG POSTS POLICIES
-- =====================================================

-- Public can read published posts
CREATE POLICY "Public read published blog posts"
ON blog_posts FOR SELECT
USING (is_published = true);

-- Authenticated users can read all posts (for admin dashboard)
CREATE POLICY "Authenticated read all blog posts"
ON blog_posts FOR SELECT
USING (auth.role() = 'authenticated');

-- Only admins can insert blog posts
CREATE POLICY "Admins insert blog posts"
ON blog_posts FOR INSERT
WITH CHECK (is_admin());

-- Only admins can update blog posts
CREATE POLICY "Admins update blog posts"
ON blog_posts FOR UPDATE
USING (is_admin())
WITH CHECK (is_admin());

-- Only admins can delete blog posts
CREATE POLICY "Admins delete blog posts"
ON blog_posts FOR DELETE
USING (is_admin());

-- =====================================================
-- TESTIMONIALS POLICIES
-- =====================================================

-- Public can read published testimonials
CREATE POLICY "Public read published testimonials"
ON testimonials FOR SELECT
USING (is_published = true OR is_admin());

-- Only admins can insert testimonials
CREATE POLICY "Admins insert testimonials"
ON testimonials FOR INSERT
WITH CHECK (is_admin());

-- Only admins can update testimonials
CREATE POLICY "Admins update testimonials"
ON testimonials FOR UPDATE
USING (is_admin())
WITH CHECK (is_admin());

-- Only admins can delete testimonials
CREATE POLICY "Admins delete testimonials"
ON testimonials FOR DELETE
USING (is_admin());

-- =====================================================
-- PROJECTS POLICIES
-- =====================================================

-- Public can read all projects (portfolio is public)
CREATE POLICY "Public read all projects"
ON projects FOR SELECT
USING (true);

-- Only admins can insert projects
CREATE POLICY "Admins insert projects"
ON projects FOR INSERT
WITH CHECK (is_admin());

-- Only admins can update projects
CREATE POLICY "Admins update projects"
ON projects FOR UPDATE
USING (is_admin())
WITH CHECK (is_admin());

-- Only admins can delete projects
CREATE POLICY "Admins delete projects"
ON projects FOR DELETE
USING (is_admin());

-- =====================================================
-- SERVICES POLICIES
-- =====================================================

-- Public can read all services
CREATE POLICY "Public read all services"
ON services FOR SELECT
USING (true);

-- Only admins can insert services
CREATE POLICY "Admins insert services"
ON services FOR INSERT
WITH CHECK (is_admin());

-- Only admins can update services
CREATE POLICY "Admins update services"
ON services FOR UPDATE
USING (is_admin())
WITH CHECK (is_admin());

-- Only admins can delete services
CREATE POLICY "Admins delete services"
ON services FOR DELETE
USING (is_admin());

-- =====================================================
-- CONTACT INQUIRIES POLICIES
-- =====================================================

-- Anyone can create contact inquiries (for public contact form)
CREATE POLICY "Anyone can create contact inquiries"
ON contact_inquiries FOR INSERT
WITH CHECK (true);

-- Only admins can read contact inquiries
CREATE POLICY "Admins read contact inquiries"
ON contact_inquiries FOR SELECT
USING (is_admin());

-- Only admins can update contact inquiries (e.g., mark as resolved)
CREATE POLICY "Admins update contact inquiries"
ON contact_inquiries FOR UPDATE
USING (is_admin())
WITH CHECK (is_admin());

-- Only admins can delete contact inquiries
CREATE POLICY "Admins delete contact inquiries"
ON contact_inquiries FOR DELETE
USING (is_admin());

-- =====================================================
-- SERVICE DETAILS POLICIES (if exists)
-- =====================================================

-- Public can read all service details
CREATE POLICY "Public read all service details"
ON service_details FOR SELECT
USING (true);

-- Only admins can insert service details
CREATE POLICY "Admins insert service details"
ON service_details FOR INSERT
WITH CHECK (is_admin());

-- Only admins can update service details
CREATE POLICY "Admins update service details"
ON service_details FOR UPDATE
USING (is_admin())
WITH CHECK (is_admin());

-- Only admins can delete service details
CREATE POLICY "Admins delete service details"
ON service_details FOR DELETE
USING (is_admin());

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================

-- Grant usage on is_admin function
GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION is_admin() TO anon;

-- Grant basic permissions to anon role (public access)
GRANT SELECT ON blog_posts TO anon;
GRANT SELECT ON testimonials TO anon;
GRANT SELECT ON projects TO anon;
GRANT SELECT ON services TO anon;
GRANT SELECT ON service_details TO anon;
GRANT INSERT ON contact_inquiries TO anon;

-- Grant full permissions to authenticated role
GRANT ALL ON blog_posts TO authenticated;
GRANT ALL ON testimonials TO authenticated;
GRANT ALL ON projects TO authenticated;
GRANT ALL ON services TO authenticated;
GRANT ALL ON service_details TO authenticated;
GRANT ALL ON contact_inquiries TO authenticated;

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Add index for published blog posts (frequently queried)
CREATE INDEX IF NOT EXISTS idx_blog_posts_published 
ON blog_posts(is_published, created_at DESC);

-- Add index for published testimonials
CREATE INDEX IF NOT EXISTS idx_testimonials_published 
ON testimonials(is_published, created_at DESC);

-- Add index for contact inquiries by status
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status 
ON contact_inquiries(created_at DESC);

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON POLICY "Public read published blog posts" ON blog_posts 
IS 'Allow anyone to read published blog posts for the public blog';

COMMENT ON POLICY "Admins insert blog posts" ON blog_posts 
IS 'Only administrators can create new blog posts';

COMMENT ON POLICY "Anyone can create contact inquiries" ON contact_inquiries 
IS 'Allow public contact form submissions without authentication';

COMMENT ON FUNCTION is_admin() 
IS 'Helper function to check if current user has admin role';
