import { useEffect, useRef, useState } from 'react';
import { VIGGY_SYSTEM_PROMPT } from '../data/viggy-prompt';

// === EDIT THIS after deploying the Cloudflare Worker (see worker/README.md) ===
const CHAT_API_URL = 'https://viggy-chat.viggy-vaiish.workers.dev';

const QUICK_PROMPTS = [
  "What's Vaish working on right now?",
  'Walk me through her best project.',
  'Is she available for Summer 2026?',
  'What stack does she use most?',
];

const STORAGE_KEY = 'viggy-chat-history-v1';
const MAX_HISTORY_MESSAGES = 20;

export default function ChatPanel({ open, onClose }) {
  const [messages, setMessages] = useState(() => loadHistory());
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Persist history
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_HISTORY_MESSAGES)));
    } catch {}
  }, [messages]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, thinking]);

  // Focus input when panel opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [open]);

  // ESC closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;

    setError(null);
    setInput('');

    const userMsg = { role: 'user', content: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setThinking(true);

    // Build payload: system prompt + recent history (capped)
    const payload = {
      messages: [
        { role: 'system', content: VIGGY_SYSTEM_PROMPT },
        ...nextMessages.slice(-MAX_HISTORY_MESSAGES),
      ],
    };

    try {
      const res = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Error ${res.status}`);
      }

      const reply = data.reply || "Hmm, I didn't catch that. Could you rephrase?";
      setMessages((m) => [...m, { role: 'assistant', content: reply }]);
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again?');
    } finally {
      setThinking(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleClear() {
    if (confirm('Clear chat history?')) {
      setMessages([]);
      setError(null);
      try { localStorage.removeItem(STORAGE_KEY); } catch {}
    }
  }

  return (
    <>
      <div
        className={`chat-backdrop${open ? ' show' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`chat-panel${open ? ' open' : ''}`}
        role="dialog"
        aria-label="Chat with Viggy"
        aria-hidden={!open}
      >
        <header className="chat-head">
          <div className="chat-head-id">
            <span className="chat-head-dot" />
            <div>
              <div className="chat-head-name">Viggy</div>
              <div className="chat-head-sub">AI assistant · ask about Vaish</div>
            </div>
          </div>
          <div className="chat-head-actions">
            {messages.length > 0 && (
              <button className="chat-clear" onClick={handleClear} title="Clear history">
                clear
              </button>
            )}
            <button className="chat-close" onClick={onClose} aria-label="Close chat">
              ✕
            </button>
          </div>
        </header>

        <div className="chat-scroll" ref={scrollRef}>
          {messages.length === 0 && (
            <div className="chat-welcome">
              <p>
                Hi! I'm <strong>Viggy</strong>. Ask me anything about Vaish — her projects, research, work experience, or what she's looking for.
              </p>
              <div className="chat-quick">
                {QUICK_PROMPTS.map((q) => (
                  <button key={q} className="chat-quick-btn" onClick={() => sendMessage(q)}>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`chat-msg ${m.role}`}>
              <div className="chat-msg-role">{m.role === 'user' ? 'You' : 'Viggy'}</div>
              <div className="chat-msg-body">{m.content}</div>
            </div>
          ))}

          {thinking && (
            <div className="chat-msg assistant">
              <div className="chat-msg-role">Viggy</div>
              <div className="chat-msg-body chat-thinking">
                <span /><span /><span />
              </div>
            </div>
          )}

          {error && (
            <div className="chat-error" role="alert">
              {error}
            </div>
          )}
        </div>

        <form className="chat-input-row" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask about projects, research, anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={thinking}
            maxLength={500}
          />
          <button type="submit" disabled={thinking || !input.trim()} aria-label="Send">
            →
          </button>
        </form>

        <div className="chat-disclaimer">
          AI-generated · may occasionally be inaccurate
        </div>
      </aside>
    </>
  );
}

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(-MAX_HISTORY_MESSAGES) : [];
  } catch {
    return [];
  }
}
