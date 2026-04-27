import { EDUCATION } from '../data/content';

export default function Education() {
  return (
    <section className="section" id="education">
      <div className="s-head reveal">
        <span className="num">§ 06</span>
        <h2>Education <em>— where I trained.</em></h2>
        <span className="meta">2 DEGREES</span>
      </div>

      <div className="edu-list reveal">
        {EDUCATION.map((e, i) => (
          <article className="edu" key={i}>
            <div>
              <h3 className="edu-degree" dangerouslySetInnerHTML={{ __html: e.degree }} />
              <div className="edu-school">{e.school}</div>
              {e.sections.map((s) => (
                <div className="edu-meta" key={s.title}>
                  <strong>{s.title}</strong>
                  {s.body}
                </div>
              ))}
            </div>
            <div className="edu-side">
              <span className="edu-dates">{e.dates}</span>
              <div>
                <div className="edu-gpa">
                  {e.gpa}<small>{e.gpaSuffix}</small>
                </div>
                <div className="edu-gpa-l">{e.gpaLabel}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
