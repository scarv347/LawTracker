import { NAV_ITEMS, type PageId, pageIcons } from '../../lib/navigation';
import styles from './Sidebar.module.css';

interface SidebarProps {
  page: PageId;
  onNavigate: (id: PageId) => void;
}

export const Sidebar = ({ page, onNavigate }: SidebarProps) => {
  return (
    <aside className={styles.sidebar} aria-label="Primary navigation">
      <div className={styles.brand}>
        <div className={styles.logo} aria-hidden="true">
          <svg viewBox="0 0 64 64" width="28" height="28">
            <g fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="32" y1="12" x2="32" y2="28"/>
              <circle cx="20" cy="36" r="8"/>
              <circle cx="44" cy="36" r="8"/>
              <line x1="20" y1="36" x2="44" y2="36"/>
            </g>
          </svg>
        </div>
        <div>
          <div className={styles.wordmark}>LawTrack</div>
          <div className={styles.tagline}>General legal information, not legal advice</div>
        </div>
      </div>

      <nav className={styles.nav}>
        <ul>
          {NAV_ITEMS.map(item => {
            const active = item.id === page;
            const Icon = pageIcons[item.id];
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`${styles.item} ${active ? styles.active : ''}`}
                  onClick={() => onNavigate(item.id)}
                  aria-current={active ? 'page' : undefined}
                >
                  <span className={styles.icon}><Icon /></span>
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={styles.disclaimer}>
        General legal information, not legal advice
      </div>
    </aside>
  );
};
