import React, { useEffect, useRef, useState } from 'react';

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        setVisible(window.scrollY > window.innerHeight);
        rafRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      className="scroll-top-btn btn-icon-crafts"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Back to top"
    >
      <i className="fas fa-chevron-up" aria-hidden="true"></i>
    </button>
  );
};

export default ScrollToTop;
