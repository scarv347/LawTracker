interface PageHeaderProps {
  title: string;
  description?: string;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <header style={{ marginBottom:'var(--space-6)' }}>
      <h1 style={{ fontSize:'28px', margin:'0 0 4px' }}>{title}</h1>
      {description && <p style={{ margin:0, color:'var(--color-text-muted)' }}>{description}</p>}
    </header>
  );
};
