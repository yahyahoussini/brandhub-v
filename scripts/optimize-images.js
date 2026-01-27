#!/usr/bin/env node

/**
 * Image Optimization Script
 * Converts images to WebP and AVIF formats for better performance
 * 
 * Usage:
 *   node scripts/optimize-images.js [input-dir] [output-dir]
 * 
 * Example:
 *   node scripts/optimize-images.js ./public/images ./public/images/optimized
 */

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default directories
const DEFAULT_INPUT_DIR = path.join(__dirname, '..', 'public', 'images');
const DEFAULT_OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'optimized');

// Supported input formats
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.tiff', '.webp'];

// Quality settings
const QUALITY = {
    webp: 85,
    avif: 80,
    jpeg: 85,
};

/**
 * Ensure directory exists
 */
async function ensureDir(dir) {
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }
}

/**
 * Get all image files from directory
 */
async function getImageFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            // Recursively get files from subdirectories
            const subFiles = await getImageFiles(fullPath);
            files.push(...subFiles);
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (SUPPORTED_FORMATS.includes(ext)) {
                files.push(fullPath);
            }
        }
    }

    return files;
}

/**
 * Optimize a single image
 */
async function optimizeImage(inputPath, outputDir) {
    const filename = path.basename(inputPath, path.extname(inputPath));
    const relativePath = path.relative(DEFAULT_INPUT_DIR, path.dirname(inputPath));
    const targetDir = path.join(outputDir, relativePath);

    await ensureDir(targetDir);

    console.log(`Optimizing: ${path.basename(inputPath)}`);

    try {
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        // Generate WebP
        await image
            .clone()
            .webp({ quality: QUALITY.webp })
            .toFile(path.join(targetDir, `${filename}.webp`));
        console.log(`  ✓ Created ${filename}.webp`);

        // Generate AVIF (better compression, but less supported)
        await image
            .clone()
            .avif({ quality: QUALITY.avif })
            .toFile(path.join(targetDir, `${filename}.avif`));
        console.log(`  ✓ Created ${filename}.avif`);

        // Generate optimized JPEG fallback (if not already JPEG)
        if (!['.jpg', '.jpeg'].includes(path.extname(inputPath).toLowerCase())) {
            await image
                .clone()
                .jpeg({ quality: QUALITY.jpeg, progressive: true })
                .toFile(path.join(targetDir, `${filename}.jpg`));
            console.log(`  ✓ Created ${filename}.jpg (fallback)`);
        }

        // Get file sizes for reporting
        const stats = await fs.stat(inputPath);
        const webpStats = await fs.stat(path.join(targetDir, `${filename}.webp`));
        const reduction = ((1 - webpStats.size / stats.size) * 100).toFixed(1);
        console.log(`  📊 Size reduction: ${reduction}% (${formatBytes(stats.size)} → ${formatBytes(webpStats.size)})`);

    } catch (error) {
        console.error(`  ✗ Error optimizing ${inputPath}:`, error.message);
    }
}

/**
 * Format bytes to human-readable format
 */
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Main function
 */
async function main() {
    const inputDir = process.argv[2] || DEFAULT_INPUT_DIR;
    const outputDir = process.argv[3] || DEFAULT_OUTPUT_DIR;

    console.log('🖼️  Image Optimization Script');
    console.log('================================');
    console.log(`Input directory:  ${inputDir}`);
    console.log(`Output directory: ${outputDir}`);
    console.log('');

    // Ensure output directory exists
    await ensureDir(outputDir);

    // Get all image files
    console.log('Scanning for images...');
    const imageFiles = await getImageFiles(inputDir);
    console.log(`Found ${imageFiles.length} images to optimize\n`);

    if (imageFiles.length === 0) {
        console.log('No images found. Place images in:', inputDir);
        return;
    }

    // Optimize each image
    let processed = 0;
    for (const file of imageFiles) {
        await optimizeImage(file, outputDir);
        processed++;
        console.log(`Progress: ${processed}/${imageFiles.length}\n`);
    }

    console.log('✅ Optimization complete!');
    console.log(`Processed ${processed} images`);
    console.log(`Output directory: ${outputDir}`);
}

// Run the script
main().catch(console.error);
