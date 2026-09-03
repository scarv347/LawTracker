import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const SectionHeading = ({ title, subtitle, action }: SectionHeadingProps) => {
  return (
    <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:'1rem', marginBottom:'1rem', flexWrap:'wrap' }}>
      <div>
        <h2 style={{ fontSize:'18px', margin:'0 0 4px' }}>{title}</h2>
        {subtitle && <p style={{ margin:0, color:'var(--color-text-muted)', fontSize:'14px' }}>{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
