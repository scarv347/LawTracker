import React from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: React.ReactNode;
}

export const Button = ({ variant = 'primary', className = '', children, type = 'button', ...props }: ButtonProps) => {
  return (
    <button type={type} className={`${styles.btn} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
