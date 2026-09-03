import { useState } from 'react';
import type { PageId } from './lib/navigation';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { BottomNav } from './components/layout/BottomNav';
import { DashboardPage } from './pages/DashboardPage';
import { MyLawsPage } from './pages/MyLawsPage';
import { AskLawTrackPage } from './pages/AskLawTrackPage';
import { CourtDatesPage } from './pages/CourtDatesPage';
import { CasesPage } from './pages/CasesPage';
import styles from './App.module.css';

function App() {
  const [page, setPage] = useState<PageId>('dashboard');

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <DashboardPage onNavigate={setPage} />;
      case 'my-laws':
        return <MyLawsPage />;
      case 'ask-lawtrack':
        return <AskLawTrackPage />;
      case 'court-dates':
        return <CourtDatesPage />;
      case 'cases':
        return <CasesPage />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.app}>
      <Sidebar page={page} onNavigate={setPage} />
      <TopBar page={page} />
      <main className={styles.main}>
        {renderPage()}
      </main>
      <BottomNav page={page} onNavigate={setPage} />
    </div>
  );
}

export default App;
