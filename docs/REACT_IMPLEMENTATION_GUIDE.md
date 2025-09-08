# React Migration Implementation Guide

## 🚀 Phase 1: Foundation Modernization

### Step 1: Update Dependencies to Modern Versions

```json
{
  "name": "themoonexports-react",
  "version": "2.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host 0.0.0.0 --port 3000",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.15.0",
    "@tanstack/react-query": "^4.32.0",
    "react-i18next": "^13.2.0",
    "i18next": "^23.4.0",
    "i18next-browser-languagedetector": "^7.1.0",
    "react-hook-form": "^7.45.0",
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.22.0",
    "clsx": "^2.0.0",
    "framer-motion": "^10.16.0",
    "react-helmet-async": "^1.3.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.3",
    "typescript": "^5.0.2",
    "vite": "^4.4.5",
    "vitest": "^0.34.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.4.3",
    "eslint": "^8.45.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "prettier": "^3.0.0",
    "sass": "^1.66.0",
    "@storybook/react": "^7.3.0"
  }
}
```

### Step 2: Modern App.tsx with React Router v6

```tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';

import { AppProviders } from './store/providers/AppProviders';
import { Layout } from './components/layout/Layout/Layout';
import { Home } from './pages/Home/Home';
import { About } from './pages/About/About';
import { Products } from './pages/Products/Products';
import { HornCrafts } from './pages/Products/HornCrafts/HornCrafts';
import { WoodenCrafts } from './pages/Products/WoodenCrafts/WoodenCrafts';
import { ResinProducts } from './pages/Products/ResinProducts/ResinProducts';
import { Contact } from './pages/Contact/Contact';
import { FAQ } from './pages/FAQ/FAQ';
import { NotFound } from './pages/NotFound/NotFound';
import { LoadingSpinner } from './components/ui/Spinner/LoadingSpinner';

import i18n from './i18n';
import './styles/globals.scss';

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <AppProviders>
            <BrowserRouter>
              <Layout>
                <React.Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    {/* Main Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/faq" element={<FAQ />} />
                    
                    {/* Product Routes */}
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/horn-crafts" element={<HornCrafts />} />
                    <Route path="/products/wooden-crafts" element={<WoodenCrafts />} />
                    <Route path="/products/resin" element={<ResinProducts />} />
                    
                    {/* Multi-language Routes */}
                    <Route path="/de/*" element={<App />} />
                    <Route path="/fr/*" element={<App />} />
                    
                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </React.Suspense>
              </Layout>
            </BrowserRouter>
          </AppProviders>
        </QueryClientProvider>
      </I18nextProvider>
    </HelmetProvider>
  );
};

export default App;
```

### Step 3: TypeScript Configuration (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    
    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    
    /* Path mapping */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/pages/*": ["src/pages/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/services/*": ["src/services/*"],
      "@/types/*": ["src/types/*"],
      "@/utils/*": ["src/utils/*"],
      "@/styles/*": ["src/styles/*"],
      "@/assets/*": ["src/assets/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## 🎨 Phase 2: Component Architecture

### Core Types Definition

```typescript
// src/types/product.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  images: ProductImage[];
  price?: number;
  dimensions?: string;
  material: string;
  slug: string;
  featured: boolean;
  availability: 'in-stock' | 'out-of-stock' | 'custom-order';
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export type ProductCategory = 'horn-crafts' | 'wooden-crafts' | 'resin' | 'bone-crafts';

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  placeholder?: string;
}

// src/types/i18n.ts
export interface TranslationResource {
  common: {
    loading: string;
    error: string;
    readMore: string;
    contactUs: string;
    // ... more common translations
  };
  navigation: {
    home: string;
    about: string;
    products: string;
    contact: string;
    faq: string;
  };
  products: {
    categories: {
      hornCrafts: string;
      woodenCrafts: string;
      resin: string;
    };
    // ... more product translations
  };
}
```

### Modern Header Component

```tsx
// src/components/layout/Header/Header.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

import { Navigation } from './Navigation/Navigation';
import { LanguageSwitcher } from './LanguageSwitcher/LanguageSwitcher';
import { MobileMenu } from './MobileMenu/MobileMenu';
import { useScrollPosition } from '@/hooks/useScrollPosition';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const { t } = useTranslation('navigation');
  const location = useLocation();
  const scrollPosition = useScrollPosition();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isScrolled = scrollPosition > 50;

  return (
    <motion.header
      className={clsx(styles.header, {
        [styles.scrolled]: isScrolled,
      })}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <img
            src="/assets/images/logo.svg"
            alt="The Moon Exports"
            width={150}
            height={50}
          />
        </Link>

        {/* Desktop Navigation */}
        <Navigation className={styles.desktopNav} />

        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={t('toggleMenu')}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};
```

### Lazy Image Component with Modern Features

```tsx
// src/components/product/LazyImage/LazyImage.tsx
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import { useLazyLoad } from '@/hooks/useLazyLoad';
import { ProductImage } from '@/types/product';

import styles from './LazyImage.module.scss';

interface LazyImageProps {
  image: ProductImage;
  className?: string;
  priority?: boolean;
  onClick?: () => void;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  image,
  className,
  priority = false,
  onClick,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const isInView = useLazyLoad(imgRef, {
    threshold: 0.1,
    triggerOnce: true,
  });

  const shouldLoad = priority || isInView;

  useEffect(() => {
    if (shouldLoad && imgRef.current) {
      const img = imgRef.current;
      
      const handleLoad = () => setIsLoaded(true);
      const handleError = () => setHasError(true);
      
      if (img.complete) {
        setIsLoaded(true);
      } else {
        img.addEventListener('load', handleLoad);
        img.addEventListener('error', handleError);
        
        return () => {
          img.removeEventListener('load', handleLoad);
          img.removeEventListener('error', handleError);
        };
      }
    }
  }, [shouldLoad]);

  if (hasError) {
    return (
      <div className={clsx(styles.error, className)}>
        <span>Failed to load image</span>
      </div>
    );
  }

  return (
    <div className={clsx(styles.container, className)}>
      {/* Placeholder */}
      {!isLoaded && image.placeholder && (
        <img
          src={image.placeholder}
          alt=""
          className={styles.placeholder}
          aria-hidden="true"
        />
      )}
      
      {/* Main Image */}
      <motion.img
        ref={imgRef}
        src={shouldLoad ? image.url : undefined}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className={clsx(styles.image, {
          [styles.loaded]: isLoaded,
        })}
        onClick={onClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
};
```

## 🔧 Phase 3: State Management & Services

### React Query Setup for Data Fetching

```typescript
// src/services/api/products.ts
import { Product, ProductCategory } from '@/types/product';

const API_BASE_URL = process.env.VITE_API_BASE_URL || '/api';

export const productService = {
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  // Get products by category
  getProductsByCategory: async (category: ProductCategory): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products?category=${category}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  // Get featured products
  getFeaturedProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products?featured=true`);
    if (!response.ok) throw new Error('Failed to fetch featured products');
    return response.json();
  },

  // Get single product
  getProduct: async (slug: string): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${slug}`);
    if (!response.ok) throw new Error('Product not found');
    return response.json();
  },
};

// Custom hooks for React Query
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });
};

export const useProductsByCategory = (category: ProductCategory) => {
  return useQuery({
    queryKey: ['products', category],
    queryFn: () => productService.getProductsByCategory(category),
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: productService.getFeaturedProducts,
  });
};
```

### i18n Configuration

```typescript
// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './resources/en/common.json';
import enNavigation from './resources/en/navigation.json';
import enProducts from './resources/en/products.json';

import deCommon from './resources/de/common.json';
import deNavigation from './resources/de/navigation.json';
import deProducts from './resources/de/products.json';

import frCommon from './resources/fr/common.json';
import frNavigation from './resources/fr/navigation.json';
import frProducts from './resources/fr/products.json';

const resources = {
  en: {
    common: enCommon,
    navigation: enNavigation,
    products: enProducts,
  },
  de: {
    common: deCommon,
    navigation: deNavigation,
    products: deProducts,
  },
  fr: {
    common: frCommon,
    navigation: frNavigation,
    products: frProducts,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['path', 'localStorage', 'navigator', 'htmlTag'],
      lookupFromPathIndex: 0,
      checkWhitelist: true,
    },
  });

export default i18n;
```

This implementation guide provides the foundation for migrating to a modern React + TypeScript architecture while maintaining all existing functionality and improving performance, maintainability, and user experience.
