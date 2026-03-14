import { mountComponent } from '../utils/mountComponent';
import { ProductGrid } from "@components/ProductGrid";

/**
 * Product Grid Entry Point
 * Hydrates product category cards
 */
mountComponent('product-grid', <ProductGrid />);
