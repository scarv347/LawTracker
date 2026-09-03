import React from 'react';
import styles from './Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
}

export const Card = ({ header, children, className = '', ...props }: CardProps) => {
  return (
    <div className={`${styles.card} ${className}`} {...props}>
      {header && <div className={styles.header}>{header}</div>}
      <div className={styles.body}>{children}</div>
    </div>
  );
};
