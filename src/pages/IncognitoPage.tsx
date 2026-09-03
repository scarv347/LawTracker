import { useEffect, useRef, useState } from 'react';
import { ChatMessage } from '../components/chat/ChatMessage';
import { ChatComposer } from '../components/chat/ChatComposer';
import { MessageCircle, Scale, Sparkle } from '../components/ui/Icons';
import styles from './IncognitoPage.module.css';

interface ChatEntry {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  reserved?: boolean;
}

interface IncognitoPageProps {
  onExit: () => void;
}

export const IncognitoPage = ({ onExit }: IncognitoPageProps) => {
  const [messages, setMessages] = useState<ChatEntry[]>([]);
  const [input, setInput] = useState('');
  const nextId = useRef(0);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    const userMessage: ChatEntry = { id: nextId.current++, role: 'user', text };
    const assistantMessage: ChatEntry = {
      id: nextId.current++,
      role: 'assistant',
      text: 'UI preview: grounded legal answers will arrive in a later phase. No AI is connected yet — nothing here is a legal answer.',
      reserved: true,
    };
    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInput('');
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.brand} type="button" onClick={onExit} aria-label="Return to LawTrack home"><span className={styles.logo}><Scale /></span><span>LawTrack</span></button>
        <div className={styles.headerRight}><span className={styles.mode}><Sparkle /> Incognito mode</span><button className={styles.exit} type="button" onClick={onExit}>Exit session</button></div>
      </header>

      <main className={styles.main}>
        <section className={styles.intro}>
          <span className={styles.introIcon}><MessageCircle /></span>
          <p className={styles.eyebrow}>A private place to start</p>
          <h1>Ask a legal<br /><em>question.</em></h1>
          <p className={styles.lede}>Use LawTrack's AI assistant without creating a profile. This session is temporary and designed for general legal information only.</p>
        </section>

        <section className={styles.chatPanel} aria-label="Incognito legal information assistant">
          <div className={styles.chatHeader}><div><strong>Ask LawTrack</strong><span>Temporary session</span></div><button type="button" onClick={() => setMessages([])} disabled={!messages.length}>Clear chat</button></div>
          <div className={styles.chatArea}>
            {messages.length === 0 ? <div className={styles.empty}><MessageCircle /><strong>What would you like to understand?</strong><span>Ask in plain language. Do not include names, case numbers, or other private details.</span></div> : <div className={styles.messages}>{messages.map((message) => <ChatMessage key={message.id} role={message.role} text={message.text} reserved={message.reserved} />)}<div ref={endRef} /></div>}
          </div>
          <ChatComposer className={styles.composer} value={input} onChange={setInput} onSend={handleSend} />
          <p className={styles.disclaimer}>No profile. No saved history. Nothing persists after you leave or refresh. General legal information, not legal advice.</p>
        </section>
      </main>
    </div>
  );
};