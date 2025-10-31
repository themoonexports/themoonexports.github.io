import React, { useEffect, useMemo, useState } from 'react';
import type { Product } from '../types/Product';
import { useProducts } from '../hooks/useProducts';

function getLocale(): 'en' | 'de' | 'fr' {
  const lang = (document.documentElement.getAttribute('lang') || 'en').toLowerCase();
  if (lang.startsWith('de')) return 'de';
  if (lang.startsWith('fr')) return 'fr';
  return 'en';
}

function localizedName(p: Product, locale: 'en' | 'de' | 'fr') {
  if (locale === 'de' && p.name_de) return p.name_de;
  if (locale === 'fr' && p.name_fr) return p.name_fr;
  return p.name;
}

function localizedDescription(p: Product, locale: 'en' | 'de' | 'fr') {
  if (locale === 'de' && p.description_de) return p.description_de;
  if (locale === 'fr' && p.description_fr) return p.description_fr;
  return p.description;
}

const ProductModal: React.FC = () => {
  const { products, loading, error } = useProducts();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeVariantImage, setActiveVariantImage] = useState<string | null>(null);

  const locale = getLocale();

  // Choose a small, stable featured subset: first 6 by productId
  const featured = useMemo(() => products.slice(0, 6), [products]);

  useEffect(() => {
    if (openIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIdx(null);
      if (e.key === 'ArrowRight') setActiveImageIdx((i) => i + 1);
      if (e.key === 'ArrowLeft') setActiveImageIdx((i) => Math.max(0, i - 1));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [openIdx]);

  const currentProduct: Product | null = openIdx !== null ? featured[openIdx] : null;
  const gallery = useMemo(() => {
    if (!currentProduct) return [] as string[];
    const imgs = currentProduct.images && currentProduct.images.length > 0
      ? currentProduct.images
      : [currentProduct.image];
    // If a variant is selected, ensure it's shown as the current image
    if (activeVariantImage) {
      const idx = imgs.indexOf(activeVariantImage);
      if (idx > 0) {
        const copy = imgs.slice();
        const [sel] = copy.splice(idx, 1);
        copy.unshift(sel);
        return copy;
      }
    }
    return imgs;
  }, [currentProduct, activeVariantImage]);

  useEffect(() => {
    // Reset indices on open/close
    setActiveImageIdx(0);
    setActiveVariantImage(null);
  }, [openIdx]);

  const nextImage = () => setActiveImageIdx((i) => Math.min(i + 1, Math.max(0, gallery.length - 1)));
  const prevImage = () => setActiveImageIdx((i) => Math.max(0, i - 1));

  const loadingLabel = locale === 'de' ? 'Wird geladen…' : locale === 'fr' ? 'Chargement…' : 'Loading…';

  return (
    <div className="product-modal" data-react="product-modal">
      <h2>{locale === 'de' ? 'Ausgewählte Produkte' : locale === 'fr' ? 'Produits en vedette' : 'Featured Products'}</h2>

      {loading && <p aria-live="polite">{loadingLabel}</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && (
        <ul className="product-list">
          {featured.map((p, idx) => (
            <li key={p.productId}>
              <button className="product-btn" onClick={() => setOpenIdx(idx)}>
                {localizedName(p, locale)}
              </button>
            </li>
          ))}
        </ul>
      )}

      {currentProduct && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setOpenIdx(null)} aria-label={locale === 'de' ? 'Schließen' : locale === 'fr' ? 'Fermer' : 'Close'}>×</button>

            <h3>{localizedName(currentProduct, locale)}</h3>
            <p>{localizedDescription(currentProduct, locale)}</p>

            <div className="lightbox">
              <div className="lightbox-main">
                <img
                  src={gallery[Math.min(activeImageIdx, gallery.length - 1)]}
                  alt={localizedName(currentProduct, locale)}
                  width={400}
                  height={300}
                />
                <div className="lightbox-controls">
                  <button onClick={prevImage} aria-label={locale === 'de' ? 'Vorheriges Bild' : locale === 'fr' ? 'Image précédent' : 'Previous image'}>&lsaquo;</button>
                  <span className="lightbox-index">{Math.min(activeImageIdx, gallery.length - 1) + 1}/{gallery.length}</span>
                  <button onClick={nextImage} aria-label={locale === 'de' ? 'Nächstes Bild' : locale === 'fr' ? 'Image suivant' : 'Next image'}>&rsaquo;</button>
                </div>
              </div>
              {gallery.length > 1 && (
                <ul className="lightbox-thumbs" aria-label={locale === 'de' ? 'Bildergalerie' : locale === 'fr' ? 'Galerie d’images' : 'Image gallery'}>
                  {gallery.map((src, i) => (
                    <li key={src}>
                      <button
                        className={i === activeImageIdx ? 'thumb active' : 'thumb'}
                        onClick={() => setActiveImageIdx(i)}
                        aria-current={i === activeImageIdx}
                      >
                        <img src={src} alt="" width={72} height={54} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {currentProduct.variants && currentProduct.variants.length > 0 && (
              <div className="variants">
                <h4>{locale === 'de' ? 'Varianten' : locale === 'fr' ? 'Variantes' : 'Variants'}</h4>
                <ul className="variant-list">
                  {currentProduct.variants.map((v) => (
                    <li key={v.id}>
                      <button
                        className={activeVariantImage === v.image ? 'variant active' : 'variant'}
                        onClick={() => setActiveVariantImage(v.image)}
                      >
                        {v.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductModal;
