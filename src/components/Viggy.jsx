import { useEffect, useRef, useState } from 'react';
import { SECTION_DIALOGUES, RESEARCH_DETAIL } from '../data/viggy';

export default function Viggy({ activeSection, onOpenProject, onOpenChat }) {
  const viggyRef = useRef(null);
  const pupilLeftRef = useRef(null);
  const pupilRightRef = useRef(null);
  const dismissTimer = useRef(null);

  // Bubble state
  const [bubble, setBubble] = useState(null); // { msg, ctas } or null
  const [hasShownIntro, setHasShownIntro] = useState(false);

  // Pupil-tracking: move pupils toward cursor position
  useEffect(() => {
    const onMove = (e) => {
      if (!viggyRef.current || !pupilLeftRef.current) return;
      const rect = viggyRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2 - 30;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxOffset = 2.2;
      const ox = (dx / dist) * Math.min(maxOffset, dist / 80);
      const oy = (dy / dist) * Math.min(maxOffset, dist / 80);
      if (!isNaN(ox) && !isNaN(oy)) {
        pupilLeftRef.current.style.transform = `translate(${ox}px, ${oy}px)`;
        pupilRightRef.current.style.transform = `translate(${ox}px, ${oy}px)`;
      }
    };
    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  // Bubble helpers
  const showBubble = (data, autoHideMs = 9000) => {
    setBubble(data);
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    if (autoHideMs) {
      dismissTimer.current = setTimeout(() => setBubble(null), autoHideMs);
    }
  };
  const hideBubble = () => {
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    setBubble(null);
  };

  // Intro dialogue after page load
  useEffect(() => {
    const t = setTimeout(() => {
      if (!hasShownIntro) {
        showBubble(SECTION_DIALOGUES.top, 10000);
        setHasShownIntro(true);
      }
    }, 1800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-show on certain sections (research, projects)
  const lastAutoSection = useRef(null);
  useEffect(() => {
    if (!hasShownIntro) return;
    if (['projects', 'research'].includes(activeSection) && lastAutoSection.current !== activeSection) {
      const data = SECTION_DIALOGUES[activeSection];
      if (data) showBubble(data, 9000);
      lastAutoSection.current = activeSection;
    }
  }, [activeSection, hasShownIntro]);

  // Resolve a CTA action keyword to an actual handler
  const handleCta = (action, target) => {
    switch (action) {
      case 'dismiss':
        hideBubble();
        break;
      case 'scroll': {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        hideBubble();
        break;
      }
      case 'open-project':
        hideBubble();
        // Slight delay so the bubble fades before modal opens
        setTimeout(() => onOpenProject(target), 350);
        break;
      case 'detail-research':
        showBubble(RESEARCH_DETAIL, 0);
        break;
      case 'open-chat':
        hideBubble();
        setTimeout(() => onOpenChat(), 300);
        break;
      case 'href':
        window.location.href = target;
        break;
      case 'href-blank':
        window.open(target, '_blank', 'noopener');
        break;
      default:
        hideBubble();
    }
  };

  // Click on Viggy = show dialogue for current section
  const handleViggyClick = () => {
    const data = SECTION_DIALOGUES[activeSection] || SECTION_DIALOGUES.top;
    showBubble(data, 9000);
  };

  // Hover: scale + tilt
  const handleEnter = () => {
    if (viggyRef.current) viggyRef.current.style.transform = 'scale(1.08) rotate(-3deg)';
  };
  const handleLeave = () => {
    if (viggyRef.current) viggyRef.current.style.transform = '';
  };

  return (
    <>
      <div id="viggy" ref={viggyRef} role="img" aria-label="Viggy, the AI robot guide">
        <div
          className="clickable-area"
          onClick={handleViggyClick}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <svg viewBox="0 0 160 180" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="botBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ff8a5c" />
                <stop offset="1" stopColor="#d65a2a" />
              </linearGradient>
              <linearGradient id="botHead" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ff9868" />
                <stop offset="1" stopColor="#ff6b3a" />
              </linearGradient>
              <linearGradient id="visor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#0a0a0c" />
                <stop offset="1" stopColor="#1a1a22" />
              </linearGradient>
              <radialGradient id="core" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#6cd4d4" />
                <stop offset="0.6" stopColor="#6cd4d4" stopOpacity="0.4" />
                <stop offset="1" stopColor="#6cd4d4" stopOpacity="0" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Shadow */}
            <ellipse cx="80" cy="172" rx="36" ry="4" fill="#000" opacity="0.3" />

            {/* Antenna signal */}
            <circle
              className="antenna-signal"
              cx="80" cy="14" r="8"
              fill="none" stroke="#6cd4d4" strokeWidth="1.5" opacity="0"
            />

            {/* Antenna */}
            <line x1="80" y1="36" x2="80" y2="18" stroke="#e8dcbf" strokeWidth="2" strokeLinecap="round" />
            <circle cx="80" cy="14" r="4" fill="#6cd4d4" filter="url(#glow)" />

            {/* Body */}
            <rect x="42" y="88" width="76" height="68" rx="16" fill="url(#botBody)" stroke="#e8dcbf" strokeWidth="1.5" opacity="0.95" />

            {/* Chest core */}
            <circle className="chest-core" cx="80" cy="122" r="14" fill="url(#core)" opacity="0.8" />
            <circle cx="80" cy="122" r="6" fill="#6cd4d4" filter="url(#glow)" opacity="0.95" />
            <circle cx="80" cy="122" r="3" fill="#fff" />

            {/* Chest panel */}
            <rect x="58" y="140" width="8" height="4" rx="1" fill="#e8dcbf" opacity="0.6" />
            <rect x="70" y="140" width="8" height="4" rx="1" fill="#e8dcbf" opacity="0.4" />
            <rect x="82" y="140" width="8" height="4" rx="1" fill="#6cd4d4" opacity="0.7" />
            <rect x="94" y="140" width="8" height="4" rx="1" fill="#e8dcbf" opacity="0.5" />

            {/* Arms */}
            <rect x="28" y="98" width="14" height="36" rx="7" fill="url(#botBody)" stroke="#e8dcbf" strokeWidth="1.2" />
            <circle cx="35" cy="136" r="7" fill="#ff9868" stroke="#e8dcbf" strokeWidth="1.2" />
            <rect x="118" y="98" width="14" height="36" rx="7" fill="url(#botBody)" stroke="#e8dcbf" strokeWidth="1.2" />
            <circle cx="125" cy="136" r="7" fill="#ff9868" stroke="#e8dcbf" strokeWidth="1.2" />

            {/* Legs/base */}
            <rect x="58" y="154" width="14" height="14" rx="4" fill="#d65a2a" stroke="#e8dcbf" strokeWidth="1.2" />
            <rect x="88" y="154" width="14" height="14" rx="4" fill="#d65a2a" stroke="#e8dcbf" strokeWidth="1.2" />

            {/* Head */}
            <rect x="36" y="36" width="88" height="62" rx="22" fill="url(#botHead)" stroke="#e8dcbf" strokeWidth="1.5" />

            {/* Ears */}
            <rect x="32" y="62" width="6" height="14" rx="2" fill="#d65a2a" stroke="#e8dcbf" strokeWidth="1" />
            <rect x="122" y="62" width="6" height="14" rx="2" fill="#d65a2a" stroke="#e8dcbf" strokeWidth="1" />

            {/* Visor */}
            <rect x="46" y="52" width="68" height="32" rx="14" fill="url(#visor)" stroke="#e8dcbf" strokeWidth="1" />

            {/* Eyes (trackable + blinking lid) */}
            <g>
              <circle cx="64" cy="68" r="7" fill="#0a0a0c" />
              <circle ref={pupilLeftRef} className="pupil" cx="64" cy="68" r="4" fill="#6cd4d4" filter="url(#glow)" />
              <circle cx="65" cy="67" r="1.2" fill="#fff" />
              <rect className="eye-lid" x="57" y="61" width="14" height="14" rx="7" fill="url(#botHead)" />
            </g>
            <g>
              <circle cx="96" cy="68" r="7" fill="#0a0a0c" />
              <circle ref={pupilRightRef} className="pupil" cx="96" cy="68" r="4" fill="#6cd4d4" filter="url(#glow)" />
              <circle cx="97" cy="67" r="1.2" fill="#fff" />
              <rect className="eye-lid" x="89" y="61" width="14" height="14" rx="7" fill="url(#botHead)" />
            </g>

            {/* Mouth */}
            <path d="M 70 82 Q 80 88 90 82" stroke="#6cd4d4" strokeWidth="1.8" fill="none" strokeLinecap="round" />

            {/* Cheeks */}
            <ellipse cx="52" cy="82" rx="4" ry="2" fill="#ff78c4" opacity="0.6" />
            <ellipse cx="108" cy="82" rx="4" ry="2" fill="#ff78c4" opacity="0.6" />
          </svg>
        </div>
      </div>

      <div
        id="viggy-bubble"
        className={bubble ? 'show' : ''}
        role="dialog"
        aria-live="polite"
      >
        <div className="name">Viggy</div>
        <div className="msg" dangerouslySetInnerHTML={{ __html: bubble?.msg || '' }} />
        {bubble?.ctas?.length > 0 && (
          <div className="cta-row">
            {bubble.ctas.map((c, i) => (
              <button key={i} onClick={() => handleCta(c.action, c.target)}>
                {c.t}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
