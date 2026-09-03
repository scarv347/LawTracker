import { laws } from '../lib/mock';
import { PageHeader } from '../components/ui/PageHeader';
import { LawCard } from '../components/law/LawCard';
import styles from './MyLawsPage.module.css';

export const MyLawsPage = () => {
  return (
    <div className={styles.page}>
      <PageHeader title="My Laws" description="Placeholder content — personalized law matching arrives in a later phase." />
      <div className={styles.grid}>
        {laws.map(law => <LawCard key={law.id} law={law} />)}
      </div>
    </div>
  );
};
