import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = 'primary',
  className = '',
  text,
}) => {
  const { t } = useTranslation('common');

  const spinnerClasses = [
    styles.spinner,
    styles[size],
    styles[color],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.container}>
      <div className={spinnerClasses}></div>
      {text && <p className={styles.text}>{text}</p>}
      {!text && <p className={styles.text}>{t('loading')}</p>}
    </div>
  );
};

export default LoadingSpinner;
