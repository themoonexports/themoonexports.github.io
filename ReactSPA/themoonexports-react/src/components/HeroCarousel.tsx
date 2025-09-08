import React from 'react';
import { ORIGINAL_CONTENT } from '@/constants/content';
import type { CarouselSlide } from '@/types';

interface HeroCarouselProps {
  slides?: CarouselSlide[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ 
  slides = ORIGINAL_CONTENT.hero.slides 
}) => {
  return (
    <div 
      id="carousel-example-generic" 
      className="carousel slide" 
      data-ride="carousel" 
      role="region" 
      aria-label="Featured content carousel"
    >
      {/* Indicators */}
      <ol className="carousel-indicators">
        {slides.map((_, index) => (
          <li
            key={index}
            data-target="#carousel-example-generic"
            data-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </ol>

      {/* Wrapper for slides */}
      <div className="carousel-inner" role="listbox">
        {slides.map((slide, index) => (
          <div key={slide.id} className={`item ${index === 0 ? 'active' : ''}`}>
            <img 
              src={slide.image} 
              alt={slide.alt} 
              loading={index === 0 ? "eager" : "lazy"}
              width="1200" 
              height="600"
            />
            <div className="carousel-caption">
              <h3><strong>{slide.title}</strong></h3>
              <h2>{slide.subtitle}</h2><br />
              <a 
                className="slidebtn" 
                href={slide.ctaLink} 
                role="button" 
                aria-label="Make an enquiry"
              >
                {slide.ctaText}
              </a><br />
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <a 
        className="left carousel-control" 
        href="#carousel-example-generic" 
        role="button" 
        data-slide="prev" 
        aria-label="Previous slide"
      >
        <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a 
        className="right carousel-control" 
        href="#carousel-example-generic" 
        role="button" 
        data-slide="next" 
        aria-label="Next slide"
      >
        <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default HeroCarousel;
