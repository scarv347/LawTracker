import React from 'react';
import { Send } from '../ui/Icons';
import styles from './ChatComposer.module.css';

interface ChatComposerProps {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
}

export const ChatComposer = ({ value, onChange, onSend }: ChatComposerProps) => {
  const disabled = !value.trim();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!disabled) onSend();
    }
  };
  return (
    <div className={styles.container}>
      <textarea
        className={styles.input}
        placeholder="Ask about laws relevant to your life events and jurisdiction"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={2}
      />
      <button type="button" className={styles.send} onClick={onSend} disabled={disabled} aria-label="Send message">
        <Send />
      </button>
    </div>
  );
};
