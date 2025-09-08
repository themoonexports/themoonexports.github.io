import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  shadow?: 'none' | 'small' | 'medium' | 'large';
  padding?: 'none' | 'small' | 'medium' | 'large';
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  shadow = 'medium',
  padding = 'medium',
  hoverable = false,
}) => {
  const cardClasses = [
    styles.card,
    styles[`shadow-${shadow}`],
    styles[`padding-${padding}`],
    hoverable && styles.hoverable,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={cardClasses}>{children}</div>;
};

export default Card;
