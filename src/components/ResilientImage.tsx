import { useState } from 'react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  loading?: 'lazy' | 'eager';
}

// Import the image assets through Vite so URLs include the configured base path
// in production and point to the source assets during development.
const bundledImages = import.meta.glob<string>('/src/assets/images/*', {
  eager: true,
  import: 'default',
  query: '?url',
});

function resolveImageSrc(src: string): string {
  const bundledImage = bundledImages[src];
  if (bundledImage) return bundledImage;

  // Keep support for dynamic/public root-relative paths, such as /images/foo.jpg.
  // BASE_URL ends in a slash, so stripping leading slashes avoids a double slash.
  return `${import.meta.env.BASE_URL}${src.replace(/^\/+/, '')}`;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackLabel,
  loading = 'eager',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F3F1EC] via-[#EAE5DC] to-[#DFD8CC] text-[#57534E] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          className="text-[#8C6D46] mb-3"
          aria-hidden="true"
        >
          <rect x="9" y="2" width="6" height="3" rx="0.5" />
          <path d="M10 5v2h4V5" />
          <rect x="6" y="7" width="12" height="14" rx="2" />
          <path d="M9 12h6" />
        </svg>
        <span className="font-serif text-lg font-medium text-[#1C1917]">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={resolveImageSrc(src)}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
