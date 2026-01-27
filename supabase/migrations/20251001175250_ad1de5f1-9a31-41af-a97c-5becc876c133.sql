-- Add RLS policies for admin blog management

-- Allow admins to insert blog posts
CREATE POLICY "Admins can insert blog posts"
ON blog_posts
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Allow admins to update blog posts
CREATE POLICY "Admins can update blog posts"
ON blog_posts
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Allow admins to delete blog posts
CREATE POLICY "Admins can delete blog posts"
ON blog_posts
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Allow admins to view all blog posts (published and drafts)
CREATE POLICY "Admins can view all blog posts"
ON blog_posts
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);