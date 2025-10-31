/*
 Product extractor: parses key HTML pages and images directory to produce public/products.json
 - Heuristics: use <title>, meta keywords, and known filename patterns
 - Canonical product mapping ensures stable IDs and correct images from /images
 - Enhancements:
   - Assigns sequential productId starting at TME-01 (stable order: category + name)
   - Uses images as the source of truth for additional gallery images
   - Adds variants for Buffalo Horn Plate based on multiple plate image files
*/

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const root = __dirname;
const imagesDir = path.join(root, 'images');
const outFile = path.join(root, 'public', 'products.json');

// Utility
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const exists = (p) => {
  try { fs.accessSync(p); return true; } catch { return false; }
};

// Inventory of images (filenames only)
const imageFiles = exists(imagesDir) ? fs.readdirSync(imagesDir).filter(f => !f.endsWith('/')) : [];
const imagePath = (name) => name.startsWith('http') ? name : `images/${name}`;
const hasImage = (name) => imageFiles.includes(name);

// Canonical product dictionary with preferred image basenames
const canonicalProducts = [
  { name: 'Horn Comb', category: 'Horn Crafts', image: hasImage('horn-comb.jpg') ? 'horn-comb.jpg' : 'placeholder.png' },
  { name: 'Wooden Spoon', category: 'Wooden Crafts', image: hasImage('wooden-spoons.jpg') ? 'wooden-spoons.jpg' : 'spoon.jpg' },
  { name: 'Resin Bangle', category: 'Resin Products', image: hasImage('resin-bangle2.jpg') ? 'resin-bangle2.jpg' : 'resin-bangle.jpg' },
  { name: 'Wooden Pizza Cutter', category: 'Wooden Crafts', image: 'pizza-cutter.jpg' },
  { name: 'Buffalo Horn Bowl', category: 'Horn Crafts', image: hasImage('bowl.jpg') ? 'bowl.jpg' : 'Horn-Crafts.JPG' },
  { name: 'Buffalo Horn Plate', category: 'Horn Crafts', image: 'milk-white-buffalo-horn-plates.jpg' },
  { name: 'Horn Button Blank', category: 'Horn Crafts', image: 'button-blank.jpg' },
  { name: 'Horn Bangle', category: 'Horn Crafts', image: hasImage('hornbracelets.jpg') ? 'hornbracelets.jpg' : 'bracelet.jpg' },
  { name: 'Horn Necklace', category: 'Horn Crafts', image: 'necklace.jpg' },
  { name: 'Horn Pendant', category: 'Horn Crafts', image: 'horn-pendant.jpg' },
  { name: 'Horn Scale', category: 'Horn Crafts', image: hasImage('hornmtplates.jpg') ? 'hornmtplates.jpg' : 'light-white-buffalo-horn-plates.jpg' },
  { name: 'Horn Walking Stick', category: 'Horn Crafts', image: 'walking-stick.jpg' },
  { name: 'Horn Shoehorn', category: 'Horn Crafts', image: 'shoeshorn.jpg' },
  { name: 'Horn Mug', category: 'Horn Crafts', image: 'placeholder.png' },
  { name: 'Horn Decor', category: 'Horn Crafts', image: 'decor.jpg' },
  { name: 'Wooden Bowl', category: 'Wooden Crafts', image: 'wooden-bowl.jpg' },
  { name: 'Wooden Button', category: 'Wooden Crafts', image: 'wooden-button.jpg' },
  { name: 'Wooden Board', category: 'Wooden Crafts', image: hasImage('cutting-board-500x500.jpg') ? 'cutting-board-500x500.jpg' : 'baguette-slicing-board-500x500.jpg' },
  { name: 'Wooden Jewelry Box', category: 'Wooden Crafts', image: 'placeholder.png' },
  { name: 'Wooden Decor', category: 'Wooden Crafts', image: 'decor.jpg' },
  { name: 'Resin Button', category: 'Resin Products', image: hasImage('finished-button.jpg') ? 'finished-button.jpg' : 'finished-button2.jpg' },
  { name: 'Resin Toggle', category: 'Resin Products', image: 'resin-toggles.jpg' },
  { name: 'Resin Bead', category: 'Resin Products', image: 'resin-beads.jpg' },
];

// Pages to parse to confirm presence and mine descriptions/images when available
const pages = [
  { file: 'horn-crafts.html', category: 'Horn Crafts' },
  { file: 'wooden-crafts.html', category: 'Wooden Crafts' },
  { file: 'resin.html', category: 'Resin Products' },
  { file: 'buffalo-horn-plates.html', category: 'Horn Crafts' },
  { file: 'buffalo-horn-bowls.html', category: 'Horn Crafts' },
  { file: 'horn-decor.html', category: 'Horn Crafts' },
];

// Extract descriptions per category page (meta description)
const pageDescriptions = {};
for (const p of pages) {
  const pPath = path.join(root, p.file);
  if (!exists(pPath)) continue;
  const html = fs.readFileSync(pPath, 'utf8');
  const $ = cheerio.load(html);
  const desc = $('meta[name="description"]').attr('content') || '';
  pageDescriptions[p.category] = pageDescriptions[p.category] || desc;
  // Also parse JSON-ish blocks with "image" if available
  const text = $.root().text();
  const imageMatch = text.match(/"image"\s*:\s*"(https?:[^"']+)"/i);
  if (imageMatch) pageDescriptions[p.category + ':image'] = imageMatch[1];
}

// Build additional images for a product using the filesystem as source of truth
const findGalleryImages = (primaryImageBase, name) => {
  // If primary is external, just return [primary]
  if (primaryImageBase.startsWith('http')) return [primaryImageBase];

  const base = primaryImageBase.replace(/^images\//, '');
  const ext = path.extname(base);
  const prefix = base.replace(ext, '');
  const candidates = new Set();

  // Always include the canonical primary if present
  if (imageFiles.includes(base)) candidates.add(base);

  // Common alternate naming pattern: suffix "2" or variants like -2
  for (const f of imageFiles) {
    if (f === base) continue;
    if (f.startsWith(prefix) && path.extname(f) === ext) {
      candidates.add(f);
    }
  }

  // If nothing matched and we had a placeholder, return just placeholder
  if (candidates.size === 0 && base === 'placeholder.png') return ['placeholder.png'];

  // Return sorted array for stability
  return Array.from(candidates).sort((a, b) => a.localeCompare(b));
};

// Helper to build product object
const buildProduct = (name, category, imageBase) => {
  const id = slug(name);
  const image = imagePath(imageBase);
  const description = pageDescriptions[category] || `${name} by The Moon Exports.`;
  const images = findGalleryImages(imageBase, name).map(imagePath);

  const product = {
    id,
    name,
    name_de: name,
    name_fr: name,
    image, // primary (first of images)
    images,
    description,
    description_de: description,
    description_fr: description,
    price: 0,
    category,
    tags: name.toLowerCase().split(/\s+/),
    featured: false,
    available: true,
  };

  // Variants for Buffalo Horn Plate from multiple images
  if (name.toLowerCase().includes('buffalo horn plate')) {
    const plateRegex = /(.*?)-buffalo-horn-plates\.[a-z]+$/i;
    const plateImages = imageFiles.filter(f => /buffalo-horn-plates\.[a-z]+$/i.test(f));
    const toTitle = (s) => s
      .replace(/[-_\s]+/g, ' ')
      .replace(/\b([a-z])/g, (m, c) => c.toUpperCase())
      .trim();
    const variants = plateImages.map(f => {
      const m = f.match(plateRegex);
      let raw = m && m[1] ? m[1] : 'Natural';
      raw = raw.replace(/\d+$/, '').trim(); // drop trailing numbers like black1
      raw = raw.replace(/\s+/g, ' ');
      const cleaned = toTitle(raw);
      return {
        id: `${id}-${slug(cleaned)}`,
        name: cleaned,
        image: imagePath(f),
      };
    })
    // Stabilize variant order by semantic weight then alpha
    .sort((a, b) => {
      const weight = (n) => {
        const s = n.name.toLowerCase();
        if (s.includes('milk white')) return 0;
        if (s.includes('light white')) return 1;
        if (s.includes('black with white')) return 2;
        if (s === 'black') return 3;
        if (s === 'dark brown') return 4;
        if (s === 'brown') return 5;
        return 10;
      };
      const wa = weight(a), wb = weight(b);
      if (wa !== wb) return wa - wb;
      return a.name.localeCompare(b.name);
    });

    if (variants.length > 0) {
      product.variants = variants;
      // Ensure images include all plate images as gallery for this product
      const gallerySet = new Set(product.images.map(i => i.replace(/^images\//, '')));
      for (const v of variants) {
        const base = v.image.replace(/^images\//, '');
        if (!gallerySet.has(base)) {
          product.images.push(v.image);
          gallerySet.add(base);
        }
      }
      // Make primary the first variant if it exists (milk white preferred)
      const preferred = product.images.findIndex(u => /milk-white-buffalo-horn-plates\.[a-z]+$/i.test(u));
      if (preferred > 0) {
        const [u] = product.images.splice(preferred, 1);
        product.images.unshift(u);
        product.image = product.images[0];
      }
    }
  }

  return product;
};

// Build final list, dedupe by id
const map = new Map();
for (const item of canonicalProducts) {
  // Use category-level absolute image if present for plates
  let img = item.image;
  if (item.name === 'Buffalo Horn Plate' && pageDescriptions['Horn Crafts:image']) {
    img = pageDescriptions['Horn Crafts:image'];
  }
  const prod = buildProduct(item.name, item.category, img);
  map.set(prod.id, prod);
}

let products = Array.from(map.values());

// Stable order: by category then name
products.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));

// Assign sequential productId starting at TME-01
products = products.map((p, idx) => ({
  ...p,
  productId: `TME-${String(idx + 1).padStart(2, '0')}`,
}));

// Ensure output folder
const outDir = path.dirname(outFile);
if (!exists(outDir)) fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(outFile, JSON.stringify(products, null, 2));
console.log(`Wrote ${products.length} products to public/products.json`);
