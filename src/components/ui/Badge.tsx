import React from 'react';
import styles from './Badge.module.css';

type Variant = 'neutral' | 'accent' | 'demo';

interface BadgeProps {
  variant?: Variant;
  children: React.ReactNode;
}

export const Badge = ({ variant = 'neutral', children }: BadgeProps) => {
  return <span className={`${styles.badge} ${styles[variant]}`}>{children}</span>;
};
