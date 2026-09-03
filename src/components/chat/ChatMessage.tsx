import styles from './ChatMessage.module.css';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  text: string;
  reserved?: boolean;
}

export const ChatMessage = ({ role, text, reserved }: ChatMessageProps) => {
  const isUser = role === 'user';
  return (
    <div className={`${styles.wrapper} ${isUser ? styles.user : styles.assistant}`}>
      <div className={`${styles.bubble} ${isUser ? styles.userBubble : styles.assistantBubble}`}>
        {text}
      </div>
      {!isUser && reserved && (
        <div className={styles.reserved}>
          <div className={styles.slot}>Citations — coming in a later phase</div>
          <div className={styles.slot}>Legal source snippets — coming in a later phase</div>
          <div className={styles.slot}>Evidence Confidence — coming in a later phase</div>
        </div>
      )}
    </div>
  );
};
