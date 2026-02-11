import React, { useEffect, useState } from 'react';

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
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
