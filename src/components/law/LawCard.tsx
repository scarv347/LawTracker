import type { Law } from '../../lib/mock';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import styles from './LawCard.module.css';

interface LawCardProps {
  law: Law;
}

export const LawCard = ({ law }: LawCardProps) => {
  return (
    <Card className={styles.card}>
      <div className={styles.demoBadge}><Badge variant="demo">Demo data</Badge></div>
      <h3 className={styles.title}>{law.title}</h3>
      <div className={styles.meta}>
        <Badge variant="neutral">{law.category}</Badge>
        <span className={styles.jurisdiction}>Jurisdiction: {law.jurisdiction}</span>
      </div>
      <div className={styles.section}>
        <strong>Why this applies to you:</strong>
        <p>{law.whyApplies}</p>
      </div>
      <div className={styles.section}>
        <strong>Source:</strong>
        <p>{law.source}</p>
      </div>
      <div className={styles.verification}>
        <Badge variant="neutral">{law.verification}</Badge>
      </div>
    </Card>
  );
};
