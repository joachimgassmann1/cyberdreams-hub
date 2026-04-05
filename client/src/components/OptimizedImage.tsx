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
  // Simple, stateless image component — no hydration mismatch, no flicker.
  // The browser handles lazy loading natively; no JS state needed.
  return (
    <div className="relative w-full h-full bg-muted">
      <img
        src={src}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        className={`${className} w-full h-full object-cover`}
      />
    </div>
  );
}
