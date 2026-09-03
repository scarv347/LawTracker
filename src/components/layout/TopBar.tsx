import { NAV_ITEMS } from '../../lib/navigation';
import type { PageId } from '../../lib/navigation';
import styles from './TopBar.module.css';

interface TopBarProps {
  page: PageId;
}

export const TopBar = ({ page }: TopBarProps) => {
  const label = NAV_ITEMS.find(n => n.id === page)?.label ?? 'LawTrack';
  return (
    <header className={styles.bar}>
      <div className={styles.left}>
        <svg viewBox="0 0 64 64" width="24" height="24" aria-hidden="true">
          <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="32" y1="12" x2="32" y2="28"/>
            <circle cx="20" cy="36" r="8"/>
            <circle cx="44" cy="36" r="8"/>
            <line x1="20" y1="36" x2="44" y2="36"/>
          </g>
        </svg>
        <span className={styles.wordmark}>LawTrack</span>
      </div>
      <div className={styles.title}>{label}</div>
    </header>
  );
};
