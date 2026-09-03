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
import { LandingPage } from './pages/LandingPage';
import { IncognitoPage } from './pages/IncognitoPage';
import styles from './App.module.css';

function App() {
  const [view, setView] = useState<'landing' | 'incognito' | 'workspace'>('landing');
  const [transitioning, setTransitioning] = useState(false);
  const [page, setPage] = useState<PageId>('dashboard');

  const switchView = (nextView: 'landing' | 'incognito' | 'workspace') => {
    setTransitioning(true);
    window.setTimeout(() => {
      setView(nextView);
      setTransitioning(false);
    }, 180);
  };

  if (view === 'landing') {
    return <div className={transitioning ? styles.pageLeaving : styles.pageEntering}><LandingPage onGetStarted={() => switchView('workspace')} onIncognito={() => switchView('incognito')} /></div>;
  }

  if (view === 'incognito') {
    return <div className={transitioning ? styles.pageLeaving : styles.pageEntering}><IncognitoPage onExit={() => switchView('landing')} /></div>;
  }

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
