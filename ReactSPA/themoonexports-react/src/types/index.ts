// Type definitions for The Moon Exports React application

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  images: string[];
  price?: number;
  featured?: boolean;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  href: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  phoneHref: string;
  emailHref: string;
  address?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface Language {
  code: string;
  name: string;
  flag: string;
  href: string;
}

export interface CarouselSlide {
  id: string;
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export interface NewsletterFormData {
  email: string;
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}
