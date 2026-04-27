import { LOG_ENTRIES } from '../data/content';

export default function Log() {
  return (
    <section className="section" id="log" style={{ paddingTop: '50px' }}>
      <div className="s-head reveal">
        <span className="num">§ 05.1</span>
        <h2>Now <em>— lab log.</em></h2>
        <span className="meta">UPDATED · APR 2026</span>
      </div>

      <div className="log reveal">
        {LOG_ENTRIES.map((entry, i) => (
          <div className="log-line" key={i}>
            <span className="ts">{entry.ts}</span>
            <span className="msg">
              <span className={`tag ${entry.tag}`}>{entry.tagLabel}</span>
              <span dangerouslySetInnerHTML={{ __html: entry.msg }} />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
