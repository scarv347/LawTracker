import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../components/chat/ChatMessage';
import { ChatComposer } from '../components/chat/ChatComposer';
import { EmptyState } from '../components/ui/EmptyState';
import { MessageCircle } from '../components/ui/Icons';
import styles from './AskLawTrackPage.module.css';

interface ChatEntry {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  reserved?: boolean;
}

export const AskLawTrackPage = () => {
  const [messages, setMessages] = useState<ChatEntry[]>([]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(0);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const nextId = () => `${idCounter.current++}`;
    const userMsg: ChatEntry = { id: nextId(), role: 'user', text: trimmed };
    const assistantMsg: ChatEntry = {
      id: nextId(),
      role: 'assistant',
      text: 'UI preview: AI responses arrive in a later phase. No AI is connected yet — nothing here is a legal answer.',
      reserved: true,
    };
    setMessages(m => [...m, userMsg, assistantMsg]);
    setInput('');
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Ask LawTrack</h1>
      </header>

      <div className={styles.chatArea}>
        {messages.length === 0 ? (
          <EmptyState
            icon={<MessageCircle />}
            title="Start a conversation"
            description="Ask about laws relevant to your life events and jurisdiction."
          />
        ) : (
          <div className={styles.messages}>
            {messages.map((m) => (
              <ChatMessage key={m.id} role={m.role} text={m.text} reserved={m.reserved} />
            ))}
            <div ref={endRef} />
          </div>
        )}
      </div>

      <ChatComposer value={input} onChange={setInput} onSend={handleSend} />

      <div className={styles.disclaimer}>
        This is general legal information, not legal advice.
      </div>
    </div>
  );
};
