'use client';

import React, { useState } from 'react';

interface ContentImageProps {
  src?: string;
  alt: string;
  className?: string;
}

// Image added from the admin for an aarti, katha, temple, etc. Renders nothing when there is none or it fails to load.
export default function ContentImage({ src, alt, className = '' }: ContentImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  if (!src || src === failedSrc) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading="lazy" onError={() => setFailedSrc(src)} className={className} />
  );
}
