import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Button } from '../UI';
import { Product } from '../../store/productStore';
import LazyImage from '../LazyImage/LazyImage';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: Product;
    onAddToCart?: (product: Product) => void;
    onViewDetails?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
    product, 
    onAddToCart, 
    onViewDetails 
}) => {
    const { t } = useTranslation('common');

    return (
        <Card className={styles.productCard} hoverable>
            <div className={styles.imageContainer}>
                <LazyImage 
                    src={product.image} 
                    alt={product.name} 
                    className={styles.productImage} 
                />
                {product.featured && (
                    <div className={styles.featuredBadge}>
                        {t('featured')}
                    </div>
                )}
                {!product.inStock && (
                    <div className={styles.outOfStockBadge}>
                        Out of Stock
                    </div>
                )}
            </div>
            <div className={styles.content}>
                <h3 className={styles.productTitle}>{product.name}</h3>
                <p className={styles.productDescription}>{product.description}</p>
                <div className={styles.price}>
                    ${product.price.toFixed(2)}
                </div>
                <div className={styles.actions}>
                    <Button 
                        variant="outline" 
                        size="small"
                        onClick={() => onViewDetails?.(product)}
                    >
                        {t('readMore')}
                    </Button>
                    <Button 
                        variant="primary" 
                        size="small"
                        disabled={!product.inStock}
                        onClick={() => onAddToCart?.(product)}
                    >
                        Add to Cart
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default ProductCard;