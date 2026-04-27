import { PUBLICATIONS } from '../data/content';

export default function Research() {
  return (
    <section className="section" id="research">
      <div className="s-head reveal">
        <span className="num">§ 02</span>
        <h2>Research <em>— peer-reviewed &amp; in review.</em></h2>
        <span className="meta">3 PUBS · 1 UNDER REVIEW</span>
      </div>

      <div className="pubs reveal">
        {PUBLICATIONS.map((p, i) => (
          <article className="pub" key={i}>
            <span className="pub-year">{p.year}</span>
            <div>
              <h3 className="pub-title">{p.title}</h3>
              <div className="pub-venue">
                {p.venue}
                {p.status && <span className="status">{p.status}</span>}
              </div>
              <p className="pub-abstract">{p.abstract}</p>
            </div>
            <div className="pub-tags">
              {p.tags.map((t) => (
                <span className="pub-tag" key={t}>{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
