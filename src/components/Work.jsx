import { WORK } from '../data/content';

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="s-head reveal">
        <span className="num">§ 03</span>
        <h2>Experience <em>— research, enterprise, automation.</em></h2>
        <span className="meta">CURRENT · USC VITERBI</span>
      </div>

      <div className="work reveal">
        {WORK.map((w, i) => (
          <article className="work-row" key={i}>
            <div className="work-meta">
              <span className="work-role">{w.role}</span>
              <span className="work-loc">{w.loc}</span>
              <span className="work-dates">{w.dates}</span>
            </div>
            <div className="work-main">
              <h3>
                {w.title} <span className="org">{w.org}</span>
              </h3>
              <p className="work-desc">{w.desc}</p>
              <ul className="work-bullets">
                {w.bullets.map((b, bi) => (
                  <li key={bi} dangerouslySetInnerHTML={{ __html: b }} />
                ))}
              </ul>
            </div>
            <div className="work-stack">
              {w.stack.map((s) => (
                <span className="chip" key={s} dangerouslySetInnerHTML={{ __html: s }} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
