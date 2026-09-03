import type { CaseSummary } from '../../lib/mock';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import styles from './CaseCard.module.css';

interface CaseCardProps {
  item: CaseSummary;
}

export const CaseCard = ({ item }: CaseCardProps) => {
  return (
    <Card className={styles.card}>
      <div className={styles.demo}><Badge variant="demo">Demo data</Badge></div>
      <h3 className={styles.title}>{item.title}</h3>
      <div className={styles.court}>{item.court}</div>
      <p className={styles.summary}>{item.summary}</p>
      <div className={styles.relevance}>{item.relevance}</div>
    </Card>
  );
};
