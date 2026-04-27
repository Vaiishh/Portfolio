import { CONTACT_LINKS } from '../data/content';

export default function Contact() {
  return (
    <>
      <section className="contact" id="contact">
        <div className="eyebrow reveal" style={{ marginBottom: '18px' }}>
          § 08 — GET IN TOUCH
        </div>
        <h2 className="c-title reveal">
          Let&apos;s <em>build</em> <span className="a">&amp;</span><br />ship something.
        </h2>

        <div className="c-grid">
          <p className="c-body reveal">
            I&apos;m looking for a <strong>Summer 2026 internship</strong> in{' '}
            <span className="em">applied ML, LLM research, or agent systems</span> —
            ideally somewhere that cares about both rigor and shipping. If you&apos;re working on{' '}
            <strong>foundation models, agents, retrieval, RL, or evals</strong> and want another pair of hands,
            I&apos;d love to talk.
          </p>

          <div className="c-links reveal">
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.l}
                href={link.href}
                className="c-link"
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener' : undefined}
              >
                <span className="l">{link.l}</span>
                <span className="v">{link.v}</span>
                <span className="a">{link.a}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div>
          © 2026 Vaishnavi Srinivas · Designed &amp; built in Los Angeles ·{' '}
          <span style={{ color: 'var(--ember)' }}>Viggy says hi 👋</span>
        </div>
        <div>
          v3.0 ·{' '}
          <a href="#top" style={{ color: 'var(--ember)' }}>back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
