export interface ProductVariant {
  id: string; // e.g., "buffalo-horn-plate-milk-white"
  name: string; // Human-readable variant name
  image: string; // Variant-specific image path/URL
}

export interface Product {
  id: string; // slug, stable across builds
  productId: string; // sequential business ID, e.g., TME-01
  name: string;
  name_de?: string;
  name_fr?: string;
  image: string; // primary image (also first of images[])
  images?: string[]; // gallery; images are source-of-truth for count
  variants?: ProductVariant[]; // optional variant set (e.g., Buffalo Horn Plates)
  description: string;
  description_de?: string;
  description_fr?: string;
  price: number;
  category: string;
  tags: string[];
  featured: boolean;
  available: boolean;
}
