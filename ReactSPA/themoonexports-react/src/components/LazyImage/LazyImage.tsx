import React, { useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className }) => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (imgRef.current) {
          imgRef.current.src = src;
        }
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection);
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  return <img ref={imgRef} alt={alt} className={className} loading="lazy" />;
};

export default LazyImage;