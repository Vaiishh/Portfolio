import { SKILL_MATRIX } from '../data/content';

function LevelBars({ level }) {
  return (
    <span className="lvl">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= level ? 'on' : ''} />
      ))}
    </span>
  );
}

export default function Stack() {
  return (
    <section className="section" id="stack">
      <div className="s-head reveal">
        <span className="num">§ 05</span>
        <h2>Stack <em>— what I reach for.</em></h2>
        <span className="meta">◆ 5/5 = CORE ◆ 2/5 = LEARNING</span>
      </div>

      <div className="matrix reveal">
        {SKILL_MATRIX.map((cat) => (
          <div className="matrix-cell" key={cat.title}>
            <div className="matrix-cell-head">
              <span
                className="matrix-cell-title"
                dangerouslySetInnerHTML={{ __html: cat.title }}
              />
              <span className="matrix-cell-count">{cat.count}</span>
            </div>
            {cat.rows.map(([name, level]) => (
              <div className="matrix-row" key={name}>
                <span className="name" dangerouslySetInnerHTML={{ __html: name }} />
                <LevelBars level={level} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
