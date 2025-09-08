import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
    const { t } = useTranslation(['navigation', 'common']);
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerContent}>
                    <div className={styles.companyInfo}>
                        <h4 className={styles.footerTitle}>The Moon Exports</h4>
                        <p className={styles.footerDescription}>
                            Quality handcrafted buffalo horn, wooden, and resin products made with passion and precision.
                        </p>
                    </div>
                    
                    <nav className={styles.footerNav}>
                        <h4 className={styles.footerTitle}>Quick Links</h4>
                        <ul className={styles.footerLinks}>
                            <li><Link to="/">{t('navigation:home')}</Link></li>
                            <li><Link to="/about">{t('navigation:about')}</Link></li>
                            <li><Link to="/products">{t('navigation:products')}</Link></li>
                            <li><Link to="/contact">{t('navigation:contact')}</Link></li>
                            <li><Link to="/faq">{t('navigation:faq')}</Link></li>
                        </ul>
                    </nav>
                </div>
                
                <div className={styles.copyright}>
                    <p>&copy; {currentYear} The Moon Exports. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;