import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto'
}: OptimizedImageProps) {
  // In Astro SSR, we want images to be visible immediately if they are eager loaded
  // or if JS is disabled. We'll default to true for eager loading.
  const [isLoaded, setIsLoaded] = useState(loading === 'eager');

  return (
    <div className="relative w-full h-full">
      {/* Blur placeholder background */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted/80 to-muted/60 animate-pulse" />
      )}
      
      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        onLoad={() => setIsLoaded(true)}
        className={`${className} ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-500`}
      />
    </div>
  );
}
