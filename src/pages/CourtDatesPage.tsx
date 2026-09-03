import { useState } from 'react';
import { courtDates } from '../lib/mock';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { CourtDateCard } from '../components/court/CourtDateCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Calendar } from '../components/ui/Icons';
import styles from './CourtDatesPage.module.css';

export const CourtDatesPage = () => {
  const [showNotice, setShowNotice] = useState(false);
  const items = courtDates;

  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <PageHeader title="Court Dates" description="Track personal court dates and deadlines — demo shell" />
        <Button onClick={() => setShowNotice(v => !v)}>+ Add Court Date</Button>
      </div>

      {showNotice && (
        <div className={styles.notice}>
          Court date tracking arrives in a later phase. This is a UI preview.
        </div>
      )}

      <h2 className={styles.sectionTitle}>Upcoming</h2>
      {items.length === 0 ? (
        <EmptyState
          icon={<Calendar />}
          title="No court dates"
          description="Add a court date to see it here."
        />
      ) : (
        <div className={styles.grid}>
          {items.map(item => <CourtDateCard key={item.id} item={item} />)}
        </div>
      )}
    </div>
  );
};
