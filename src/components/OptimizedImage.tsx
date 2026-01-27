import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    priority?: boolean; // For LCP image - loads immediately
    sizes?: string;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

/**
 * Optimized Image Component with:
 * - Lazy loading (unless priority)
 * - Shimmer placeholder  
 * - Aspect ratio preservation
 * - Error handling
 * - contain-intrinsic-size for better CLS
 */
export function OptimizedImage({
    src,
    alt,
    width,
    height,
    className,
    priority = false,
    sizes = '100vw',
    objectFit = 'cover',
}: OptimizedImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Calculate aspect ratio for better CLS
    const aspectRatio = width && height ? `${width}/${height}` : 'auto';

    return (
        <div
            className={cn('relative overflow-hidden', className)}
            style={{
                aspectRatio: width && height ? aspectRatio : undefined,
                minHeight: height || undefined,
                containIntrinsicSize: width && height ? `${width}px ${height}px` : 'auto',
            }}
        >
            {/* Shimmer loader */}
            {!isLoaded && !hasError && (
                <div className="shimmer absolute inset-0" />
            )}

            {/* Image */}
            {!hasError && (
                <img
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    loading={priority ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={priority ? 'high' : 'auto'}
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setHasError(true)}
                    className={cn(
                        'transition-opacity duration-300 w-full h-full',
                        isLoaded ? 'opacity-100' : 'opacity-0',
                        objectFit === 'cover' && 'object-cover',
                        objectFit === 'contain' && 'object-contain',
                        objectFit === 'fill' && 'object-fill',
                        objectFit === 'none' && 'object-none',
                        objectFit === 'scale-down' && 'object-scale-down'
                    )}
                    style={{
                        contentVisibility: 'auto',
                    }}
                />
            )}

            {/* Error state */}
            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <div className="text-center space-y-2 p-4">
                        <svg
                            className="w-12 h-12 mx-auto text-muted-foreground opacity-50"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <span className="text-sm text-muted-foreground">
                            Image non disponible
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
