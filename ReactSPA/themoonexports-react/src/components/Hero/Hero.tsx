import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '../UI';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
    const { t } = useTranslation(['common', 'navigation']);

    return (
        <section className={styles.hero}>
            <div className={styles.heroContent}>
                <div className={styles.textContent}>
                    <h1 className={styles.title}>
                        Welcome to The Moon Exports
                    </h1>
                    <p className={styles.subtitle}>
                        Discover beautiful handcrafted buffalo horn bowls, wooden cutting boards, 
                        resin jewelry and more. Quality artisan products made with passion and precision.
                    </p>
                    <div className={styles.buttonGroup}>
                        <Link to="/products">
                            <Button variant="primary" size="large">
                                Shop {t('navigation:products')}
                            </Button>
                        </Link>
                        <Link to="/about">
                            <Button variant="outline" size="large">
                                Learn More
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className={styles.imageContent}>
                    <img 
                        src="/src/assets/images/Horn-Crafts.JPG" 
                        alt="Buffalo Horn Crafts" 
                        className={styles.heroImage}
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;