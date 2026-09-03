import { cases } from '../lib/mock';
import { PageHeader } from '../components/ui/PageHeader';
import { CaseCard } from '../components/cases/CaseCard';
import styles from './CasesPage.module.css';

export const CasesPage = () => {
  return (
    <div className={styles.page}>
      <PageHeader title="Cases" description="Placeholder content — court case integration arrives in a later phase." />
      <div className={styles.grid}>
        {cases.map(item => <CaseCard key={item.id} item={item} />)}
      </div>
    </div>
  );
};
