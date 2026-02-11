import React, { useState, useEffect, useCallback } from 'react';

interface Testimonial {
  name: string;
  company: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah M.',
    company: 'Artisan Interiors, UK',
    quote: 'The horn bowls and plates from The Moon Exports are exquisite. The craftsmanship is outstanding and delivery was prompt.',
  },
  {
    name: 'Thomas W.',
    company: 'Nordic Design Studio, Germany',
    quote: 'We have been sourcing wooden crafts from The Moon Exports for two years. Consistent quality and excellent communication.',
  },
  {
    name: 'Claire D.',
    company: 'Maison Décor, France',
    quote: 'Beautiful resin products with attention to detail. Our customers love the unique handcrafted pieces.',
  },
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [paused, next]);

  return (
    <section
      className="testimonials"
      aria-label="Customer testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h2>What Our Customers Say</h2>
      <div className="testimonial-carousel" aria-live="polite">
        <blockquote className="testimonial-card card-crafts">
          <p className="testimonial-quote">&ldquo;{testimonials[activeIndex].quote}&rdquo;</p>
          <footer className="testimonial-author">
            <strong>{testimonials[activeIndex].name}</strong>
            <span>{testimonials[activeIndex].company}</span>
          </footer>
        </blockquote>
      </div>
      <div className="testimonial-dots" role="tablist" aria-label="Testimonial navigation">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            className={idx === activeIndex ? 'testimonial-dot active' : 'testimonial-dot'}
            onClick={() => setActiveIndex(idx)}
            role="tab"
            aria-selected={idx === activeIndex}
            aria-label={`Testimonial ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
