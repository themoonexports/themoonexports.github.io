import { useState, useEffect, useCallback } from "react";

interface CarouselSlide {
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  loading?: "eager" | "lazy";
  ctas: { label: string; href: string }[];
}

const slides: CarouselSlide[] = [
  {
    image: "images/one.jpg",
    alt: "Premium handcrafted horn, wood and resin products",
    title: "Premium Handcrafted Exports from India",
    subtitle: "Custom horn, wood & resin creations for artists and luxury brands",
    loading: "eager",
    ctas: [
      { label: "Get a Quote", href: "contact.html" },
      { label: "Explore Crafts", href: "products.html" }
    ]
  },
  {
    image: "images/two.jpg",
    alt: "Artisan craftsmanship shipped worldwide",
    title: "Artisan Craftsmanship, Global Delivery",
    subtitle: "Made in Sambhal, shipped worldwide",
    loading: "lazy",
    ctas: [
      { label: "View Products", href: "products.html" }
    ]
  }
];

export function Carousel(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setActiveIndex((current) => (current === 0 ? slides.length - 1 : current - 1));
  }, []);

  const goToNext = useCallback(() => {
    setActiveIndex((current) => (current === slides.length - 1 ? 0 : current + 1));
  }, []);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext]);

  return (
    <div
      className="carousel slide"
      data-ride="carousel"
      role="region"
      aria-label="Featured products"
    >
      {/* Indicators */}
      <ol className="carousel-indicators">
        {slides.map((_, index) => (
          <li
            key={index}
            className={index === activeIndex ? "active" : ""}
            onClick={() => goToSlide(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </ol>

      {/* Slides */}
      <div className="carousel-inner" role="group" aria-live="polite">
        {slides.map((slide, index) => (
          <div key={index} className={`item ${index === activeIndex ? "active" : ""}`}>
            <img
              src={slide.image}
              alt={slide.alt}
              loading={slide.loading}
              width={1200}
              height={600}
            />
            <div className="carousel-caption">
              <h2>
                <strong>{slide.title}</strong>
              </h2>
              <p className="carousel-subtitle">{slide.subtitle}</p>
              {slide.ctas.map((cta, i) => (
                <a key={i} className="slidebtn btn-crafts" href={cta.href}>
                  {cta.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <a
        className="left carousel-control"
        onClick={goToPrevious}
        role="button"
        aria-label="Previous slide"
      >
        <span className="glyphicon glyphicon-chevron-left" aria-hidden="true" />
      </a>
      <a
        className="right carousel-control"
        onClick={goToNext}
        role="button"
        aria-label="Next slide"
      >
        <span className="glyphicon glyphicon-chevron-right" aria-hidden="true" />
      </a>
    </div>
  );
}
