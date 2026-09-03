import type { PageId } from '../lib/navigation';
import { importantForYou, lifeEvents, courtDates, cases } from '../lib/mock';
import { PageHeader } from '../components/ui/PageHeader';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { CourtDateCard } from '../components/court/CourtDateCard';
import { CaseCard } from '../components/cases/CaseCard';
import { Sparkle } from '../components/ui/Icons';
import styles from './DashboardPage.module.css';

interface DashboardPageProps {
  onNavigate: (p: PageId) => void;
}

export const DashboardPage = ({ onNavigate }: DashboardPageProps) => {
  return (
    <div className={styles.page}>
      <PageHeader title="Dashboard" description="General legal information overview — demo shell" />
      
      <SectionHeading title="Important for You" />
      <div className={styles.grid}>
        {importantForYou.map(item => (
          <Card key={item.id} className={styles.compact}>
            <div className={styles.demo}><Badge variant="demo">Demo data</Badge></div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardText}>{item.why}</p>
          </Card>
        ))}
      </div>

      <SectionHeading title="Life Events" />
      <div className={styles.grid}>
        {lifeEvents.map(ev => (
          <Card key={ev.id} className={styles.compact}>
            <div className={styles.eventHeader}>
              <span className={styles.icon}><Sparkle /></span>
              <h3 className={styles.cardTitle}>{ev.name}</h3>
            </div>
            <p className={styles.cardText}>{ev.description}</p>
            <Button variant="secondary" className={styles.comingSoon}>Coming soon</Button>
          </Card>
        ))}
      </div>

      <SectionHeading title="Ask LawTrack" />
      <Card className={styles.promo}>
        <div className={styles.promoInner}>
          <div>
            <h3 className={styles.promoTitle}>Ask a question about legal information</h3>
            <p className={styles.promoText}>General information only, not legal advice.</p>
          </div>
          <Button onClick={() => onNavigate('ask-lawtrack')}>Ask a question</Button>
        </div>
      </Card>

      <SectionHeading title="Upcoming Court Dates" action={<Button variant="secondary" onClick={() => onNavigate('court-dates')}>View all</Button>} />
      <div className={styles.gridSingle}>
        {courtDates[0] && <CourtDateCard item={courtDates[0]} />}
      </div>

      <SectionHeading title="Cases to Watch" action={<Button variant="secondary" onClick={() => onNavigate('cases')}>View all</Button>} />
      <div className={styles.gridSingle}>
        {cases[0] && <CaseCard item={cases[0]} />}
      </div>
    </div>
  );
};
