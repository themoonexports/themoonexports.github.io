import { useEffect, useMemo, useState } from 'react';
import type { Product } from '../types/Product';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/products.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load products.json');
        return res.json();
      })
      .then((data) => {
        // Normalize data:
        // - Ensure images[] exists and includes primary image first
        // - Sort by productId (TME-XX) for deterministic display
        const norm: Product[] = (data as Product[]).map((p) => {
          const images = Array.isArray(p.images) ? p.images.slice() : [];
          if (p.image && (!images.length || images[0] !== p.image)) {
            // Put primary at the front if absent or not first
            const withoutPrimary = images.filter((i) => i !== p.image);
            images.splice(0, images.length, p.image, ...withoutPrimary);
          }
          return { ...p, images };
        }).sort((a, b) => {
          const parseNum = (s?: string) => {
            const m = (s || '').match(/TME-(\d+)/i);
            return m ? parseInt(m[1], 10) : Number.MAX_SAFE_INTEGER;
          };
          return parseNum(a.productId) - parseNum(b.productId);
        });
        setProducts(norm);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const byId = useMemo(() => new Map(products.map((p) => [p.id, p])), [products]);
  const byProductId = useMemo(() => new Map(products.map((p) => [p.productId, p])), [products]);
  const byCategory = useMemo(() => {
    return products.reduce<Record<string, Product[]>>((acc, p) => {
      (acc[p.category] ||= []).push(p);
      return acc;
    }, {});
  }, [products]);

  return { products, byId, byProductId, byCategory, loading, error };
}
