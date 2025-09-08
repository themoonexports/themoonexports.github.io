import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'horn-crafts' | 'wooden-crafts' | 'resin';
  featured: boolean;
  inStock: boolean;
}

interface ProductState {
  products: Product[];
  categories: string[];
  selectedCategory: string | null;
  featuredProducts: Product[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setProducts: (products: Product[]) => void;
  setSelectedCategory: (category: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getProductsByCategory: (category: string) => Product[];
  getFeaturedProducts: () => Product[];
}

export const useProductStore = create<ProductState>()(
  devtools(
    (set, get) => ({
      products: [],
      categories: ['horn-crafts', 'wooden-crafts', 'resin'],
      selectedCategory: null,
      featuredProducts: [],
      isLoading: false,
      error: null,

      setProducts: (products) => {
        const featured = products.filter(p => p.featured);
        set({ products, featuredProducts: featured });
      },
      
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      
      getProductsByCategory: (category) => {
        const { products } = get();
        return products.filter(p => p.category === category);
      },
      
      getFeaturedProducts: () => {
        const { products } = get();
        return products.filter(p => p.featured);
      },
    }),
    {
      name: 'product-store',
    }
  )
);
