import styles from './ChatMessage.module.css';
import type { LegalEvidence } from '../../lib/askLawTrack';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  text: string;
  reserved?: boolean;
  status?: 'pending' | 'answered' | 'insufficient_evidence' | 'error';
  evidence?: LegalEvidence[];
}

function formatVerified(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `Verified ${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
}

export const ChatMessage = ({ role, text, reserved, status, evidence }: ChatMessageProps) => {
  const isUser = role === 'user';
  const hasStatus = status !== undefined;

  if (isUser) {
    return (
      <div className={`${styles.wrapper} ${styles.user}`}>
        <div className={`${styles.bubble} ${styles.userBubble}`}>{text}</div>
      </div>
    );
  }

  if (!hasStatus) {
    return (
      <div className={`${styles.wrapper} ${styles.assistant}`}>
        <div className={`${styles.bubble} ${styles.assistantBubble}`}>{text}</div>
        {reserved && (
          <div className={styles.reserved}>
            <div className={styles.slot}>Citations — coming in a later phase</div>
            <div className={styles.slot}>Legal source snippets — coming in a later phase</div>
            <div className={styles.slot}>Evidence Confidence — coming in a later phase</div>
          </div>
        )}
      </div>
    );
  }

  let bubbleClass = styles.assistantBubble;
  if (status === 'insufficient_evidence') {
    bubbleClass = `${styles.assistantBubble} ${styles.insufficientBubble}`;
  } else if (status === 'error') {
    bubbleClass = `${styles.assistantBubble} ${styles.errorBubble}`;
  }

  return (
    <div className={`${styles.wrapper} ${styles.assistant}`}>
      <div className={`${styles.bubble} ${bubbleClass}`}>
        {status === 'pending' ? (
          <>
            Thinking
            <span className={styles.dots}>
              <span />
              <span />
              <span />
            </span>
          </>
        ) : (
          text
        )}
      </div>
      {status === 'answered' && evidence && evidence.length > 0 && (
        <div className={styles.evidenceContainer}>
          {evidence.map(ev => (
            <div key={ev.lawId} className={styles.evidenceCard}>
              <div className={styles.evidenceTitle}>{ev.title}</div>
              <div className={styles.evidenceCitation}>{ev.citation}</div>
              <div className={styles.evidenceExcerpt}>“{ev.excerpt}”</div>
              <div className={styles.evidenceMeta}>
                {ev.publisher} • {ev.jurisdictionId} • {formatVerified(ev.lastVerified)}
              </div>
              <a href={ev.sourceUrl} target="_blank" rel="noopener noreferrer" className={styles.evidenceLink}>
                Official source
              </a>
            </div>
          ))}
        </div>
      )}
      {status === 'answered' && (
        <div className={styles.slot}>Evidence Confidence — coming in a later phase</div>
      )}
    </div>
  );
};
