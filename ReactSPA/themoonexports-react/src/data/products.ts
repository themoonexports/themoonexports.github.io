import { Product } from '../store/productStore';

// Using public URLs for images
const getImageUrl = (imageName: string) => `/src/assets/images/${imageName}`;

export const sampleProducts: Product[] = [
  // Horn Crafts
  {
    id: 'horn-craft-1',
    name: 'Buffalo Horn Bowl',
    description: 'Handcrafted buffalo horn bowl, perfect for serving or decoration. Each piece is unique with natural variations.',
    price: 25.99,
    image: getImageUrl('bowl.jpg'),
    category: 'horn-crafts',
    featured: true,
    inStock: true,
  },
  {
    id: 'horn-craft-2',
    name: 'Buffalo Horn Plates Set',
    description: 'Set of elegant buffalo horn plates. Lightweight, durable, and naturally beautiful.',
    price: 45.99,
    image: getImageUrl('black1-buffalo-horn-plates.jpg'),
    category: 'horn-crafts',
    featured: true,
    inStock: true,
  },
  {
    id: 'horn-craft-3',
    name: 'Horn Bracelet',
    description: 'Beautiful handcrafted horn bracelet with natural patterns and smooth finish.',
    price: 15.99,
    image: getImageUrl('bracelet.jpg'),
    category: 'horn-crafts',
    featured: false,
    inStock: true,
  },
  {
    id: 'horn-craft-4',
    name: 'Horn Pendant',
    description: 'Elegant horn pendant jewelry piece, perfect for necklaces or decorative purposes.',
    price: 12.99,
    image: getImageUrl('horn-pendant.jpg'),
    category: 'horn-crafts',
    featured: false,
    inStock: true,
  },
  {
    id: 'horn-craft-5',
    name: 'Horn Toggles',
    description: 'Traditional horn toggles for clothing, bags, or craft projects.',
    price: 8.99,
    image: getImageUrl('horntoggles.jpg'),
    category: 'horn-crafts',
    featured: false,
    inStock: false,
  },
  {
    id: 'horn-craft-6',
    name: 'Horn Shoehorn',
    description: 'Classic horn shoehorn with smooth curved design for easy shoe wearing.',
    price: 18.99,
    image: getImageUrl('shoeshorn.jpg'),
    category: 'horn-crafts',
    featured: false,
    inStock: true,
  },

  // Wooden Crafts
  {
    id: 'wooden-craft-1',
    name: 'Wooden Salad Bowl',
    description: 'Large handcrafted wooden bowl perfect for salads and serving. Made from sustainable wood.',
    price: 35.99,
    image: getImageUrl('wooden-bowl.jpg'),
    category: 'wooden-crafts',
    featured: true,
    inStock: true,
  },
  {
    id: 'wooden-craft-2',
    name: 'Wooden Spoons Set',
    description: 'Set of 6 handcrafted wooden spoons. Perfect for cooking and serving.',
    price: 22.99,
    image: getImageUrl('wooden-spoons.jpg'),
    category: 'wooden-crafts',
    featured: false,
    inStock: true,
  },
  {
    id: 'wooden-craft-3',
    name: 'Cutting Board',
    description: 'Professional-grade wooden cutting board with natural antibacterial properties.',
    price: 42.99,
    image: getImageUrl('cutting-board-500x500.jpg'),
    category: 'wooden-crafts',
    featured: true,
    inStock: true,
  },
  {
    id: 'wooden-craft-4',
    name: 'Baguette Slicing Board',
    description: 'Specialized wooden board for slicing baguettes and long breads with guide slots.',
    price: 28.99,
    image: getImageUrl('baguette-slicing-board-500x500.jpg'),
    category: 'wooden-crafts',
    featured: false,
    inStock: true,
  },
  {
    id: 'wooden-craft-5',
    name: 'Wooden Buttons',
    description: 'Natural wooden buttons for clothing, crafts, and decorative purposes.',
    price: 6.99,
    image: getImageUrl('wooden-button.jpg'),
    category: 'wooden-crafts',
    featured: false,
    inStock: true,
  },
  {
    id: 'wooden-craft-6',
    name: 'Wooden Photo Frame',
    description: 'Elegant wooden picture frame with natural wood grain finish.',
    price: 19.99,
    image: getImageUrl('wooden-frames.jpg'),
    category: 'wooden-crafts',
    featured: false,
    inStock: false,
  },

  // Resin Products
  {
    id: 'resin-1',
    name: 'Resin Bangle',
    description: 'Beautiful translucent resin bangle with embedded natural elements.',
    price: 16.99,
    image: getImageUrl('resin-bangle.jpg'),
    category: 'resin',
    featured: false,
    inStock: true,
  },
  {
    id: 'resin-2',
    name: 'Resin Beads',
    description: 'Set of colorful resin beads perfect for jewelry making and crafts.',
    price: 12.99,
    image: getImageUrl('resin-beads.jpg'),
    category: 'resin',
    featured: false,
    inStock: true,
  },
  {
    id: 'resin-3',
    name: 'Resin Toggles',
    description: 'Durable resin toggles with unique patterns and colors.',
    price: 9.99,
    image: getImageUrl('resin-toggles.jpg'),
    category: 'resin',
    featured: false,
    inStock: true,
  },
  {
    id: 'resin-4',
    name: 'Resin Picture Frame',
    description: 'Modern resin picture frame with clear finish and contemporary design.',
    price: 24.99,
    image: getImageUrl('resinframes.jpg'),
    category: 'resin',
    featured: true,
    inStock: true,
  },
  {
    id: 'resin-5',
    name: 'Resin Ivory Alternative',
    description: 'Ethical ivory-alternative resin pieces for crafting and decoration.',
    price: 18.99,
    image: getImageUrl('resinivory.jpg'),
    category: 'resin',
    featured: false,
    inStock: true,
  },
];

export const getProductsByCategory = (category: string): Product[] => {
  return sampleProducts.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return sampleProducts.filter(product => product.featured);
};

export const getProductById = (id: string): Product | undefined => {
  return sampleProducts.find(product => product.id === id);
};
