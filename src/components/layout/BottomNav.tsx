import { NAV_ITEMS, type PageId, pageIcons } from '../../lib/navigation';
import styles from './BottomNav.module.css';

interface BottomNavProps {
  page: PageId;
  onNavigate: (id: PageId) => void;
}

export const BottomNav = ({ page, onNavigate }: BottomNavProps) => {
  return (
    <nav className={styles.nav} aria-label="Bottom navigation">
      {NAV_ITEMS.map(item => {
        const active = item.id === page;
        const Icon = pageIcons[item.id];
        return (
          <button
            type="button"
            key={item.id}
            className={`${styles.item} ${active ? styles.active : ''}`}
            onClick={() => onNavigate(item.id)}
            aria-current={active ? 'page' : undefined}
          >
            <span className={styles.icon}><Icon /></span>
            <span className={styles.label}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
