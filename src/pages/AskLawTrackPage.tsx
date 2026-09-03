import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../components/chat/ChatMessage';
import { ChatComposer } from '../components/chat/ChatComposer';
import { EmptyState } from '../components/ui/EmptyState';
import { MessageCircle } from '../components/ui/Icons';
import styles from './AskLawTrackPage.module.css';
import { askLawTrack, AskLawTrackValidationError } from '../lib/askLawTrack';
import type { LegalEvidence, AskLawTrackResponse } from '../lib/askLawTrack';

type UserEntry = { id: string; role: 'user'; text: string };
type AssistantEntry = {
  id: string;
  role: 'assistant';
  status: 'pending' | 'answered' | 'insufficient_evidence' | 'error';
  answer?: string;
  evidence?: LegalEvidence[];
};
type ChatEntry = UserEntry | AssistantEntry;

export const AskLawTrackPage = () => {
  const [messages, setMessages] = useState<ChatEntry[]>([]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(0);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const isPending = messages.some(m => m.role === 'assistant' && 'status' in m && m.status === 'pending');
    if (isPending) return;
    const nextId = () => `${idCounter.current++}`;
    const userMsg: UserEntry = { id: nextId(), role: 'user', text: trimmed };
    const pendingMsg: AssistantEntry = { id: nextId(), role: 'assistant', status: 'pending' };
    setMessages(m => [...m, userMsg, pendingMsg]);
    setInput('');

    try {
      const response: AskLawTrackResponse = await askLawTrack(trimmed);
      setMessages(prev => prev.map(m => {
        if (m.id === pendingMsg.id && m.role === 'assistant') {
          return {
            id: m.id,
            role: 'assistant',
            status: response.status,
            answer: response.answer,
            evidence: response.evidence,
          } as AssistantEntry;
        }
        return m;
      }));
    } catch (err) {
      if (err instanceof AskLawTrackValidationError) {
        setMessages(prev => prev.map(m => {
          if (m.id === pendingMsg.id && m.role === 'assistant') {
            return {
              id: m.id,
              role: 'assistant',
              status: 'error',
              answer: err.message,
            } as AssistantEntry;
          }
          return m;
        }));
      } else {
        setMessages(prev => prev.map(m => {
          if (m.id === pendingMsg.id && m.role === 'assistant') {
            return {
              id: m.id,
              role: 'assistant',
              status: 'error',
              answer: 'Something went wrong while contacting the legal information service. Please try again.',
            } as AssistantEntry;
          }
          return m;
        }));
      }
    }
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
            {messages.map((m) => {
              if (m.role === 'user') {
                return <ChatMessage key={m.id} role="user" text={m.text} />;
              }
              return (
                <ChatMessage
                  key={m.id}
                  role="assistant"
                  text={m.answer ?? ''}
                  status={m.status}
                  evidence={m.evidence}
                />
              );
            })}
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
