/**
 * Generate dynamic blog sitemap
 * Separate sitemap for better blog post indexing
 */

import { blogPosts } from '@/data/blog';

export function generateBlogSitemap(): string {
    const baseUrl = 'https://brandhub.ma';

    const urls = blogPosts.map((post) => {
        const slug = post.title.toLowerCase().replace(/\s+/g, '-');
        return `
  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${baseUrl}${post.image}</image:loc>
      <image:title>${post.title}</image:title>
    </image:image>
  </url>`;
    }).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;
}

/**
 * Save blog sitemap to public directory
 */
export function saveBlogSitemap() {
    const sitemap = generateBlogSitemap();
    const fs = require('fs');
    const path = require('path');

    const sitemapPath = path.join(process.cwd(), 'public', 'blog-sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemap, 'utf-8');

    console.log('✅ Blog sitemap generated:', sitemapPath);
}

// Run if executed directly
if (require.main === module) {
    saveBlogSitemap();
}
