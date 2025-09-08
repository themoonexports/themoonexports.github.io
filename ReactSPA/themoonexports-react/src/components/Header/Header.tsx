import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import styles from './Header.module.css';

const Header: React.FC = () => {
    const { t } = useTranslation('navigation');

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link to="/" className={styles.logoLink}>
                    <h1>The Moon Exports</h1>
                </Link>
            </div>
            <nav className={styles.nav}>
                <ul>
                    <li><Link to="/">{t('home')}</Link></li>
                    <li><Link to="/about">{t('about')}</Link></li>
                    <li><Link to="/products">{t('products')}</Link></li>
                    <li><Link to="/contact">{t('contact')}</Link></li>
                    <li><Link to="/faq">{t('faq')}</Link></li>
                </ul>
            </nav>
            <div className={styles.headerActions}>
                <LanguageSwitcher />
            </div>
        </header>
    );
};

export default Header;