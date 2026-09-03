import React from 'react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

export const EmptyState = ({ icon, title, description }: EmptyStateProps) => {
  return (
    <div className={styles.container} role="status" aria-live="polite">
      {icon && <div className={styles.icon}>{icon}</div>}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{description}</p>
    </div>
  );
};
