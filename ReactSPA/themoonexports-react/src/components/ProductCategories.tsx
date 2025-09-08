import React from 'react';
import { ORIGINAL_CONTENT } from '@/constants/content';
import type { ProductCategory } from '@/types';

interface ProductCategoriesProps {
  categories?: ProductCategory[];
}

const ProductCategories: React.FC<ProductCategoriesProps> = ({ 
  categories = ORIGINAL_CONTENT.categories 
}) => {
  return (
    <section className="container frontthree" aria-label="Product categories">
      <div className="row">
        {categories.map((category) => (
          <div key={category.id} className="col-md-4">
            <article className="productcat">
              <a href={category.href} aria-label={`View ${category.name}`}>
                <div className="cattitle">{category.name}</div>
                <img 
                  src={category.image} 
                  alt={`${category.name} products`} 
                  loading="lazy" 
                  width="300" 
                  height="200"
                />
              </a>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCategories;
