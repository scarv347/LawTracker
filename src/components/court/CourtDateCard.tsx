import type { CourtDate } from '../../lib/mock';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import styles from './CourtDateCard.module.css';

interface CourtDateCardProps {
  item: CourtDate;
}

export const CourtDateCard = ({ item }: CourtDateCardProps) => {
  return (
    <Card className={styles.card}>
      <div className={styles.demo}><Badge variant="demo">Demo data</Badge></div>
      <h3 className={styles.title}>{item.title}</h3>
      <div className={styles.meta}>
        <div><strong>Date:</strong> {item.date}</div>
        <div><strong>Court:</strong> {item.court}</div>
      </div>
      <p className={styles.desc}>{item.description}</p>
    </Card>
  );
};
