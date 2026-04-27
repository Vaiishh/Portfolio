import { useEffect, useState } from 'react';

export default function Nav({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'about', label: 'about', idx: '01' },
    { id: 'research', label: 'research', idx: '02' },
    { id: 'work', label: 'work', idx: '03' },
    { id: 'projects', label: 'projects', idx: '04' },
    { id: 'stack', label: 'stack', idx: '05' },
    { id: 'education', label: 'edu', idx: '06' },
  ];

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-in">
        <a href="#top" className="nav-logo">
          <span className="dot" />
          <span>vaish<strong>.srinivas</strong> / portfolio</span>
        </a>
        <ul className={`nav-links${open ? ' open' : ''}`}>
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                data-idx={l.idx}
                className={activeSection === l.id ? 'active' : ''}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>
              connect
            </a>
          </li>
        </ul>
        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          ☰
        </button>
      </div>
    </nav>
  );
}
