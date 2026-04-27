import { CERT_GROUPS } from '../data/content';

export default function Certs() {
  return (
    <section className="section" id="certs">
      <div className="s-head reveal">
        <span className="num">§ 07</span>
        <h2>Credentials <em>— continued training.</em></h2>
        <span className="meta">22 CERTS</span>
      </div>

      <div className="cert-wrap reveal">
        {CERT_GROUPS.map((g) => (
          <div key={g.title}>
            <h3 className="cert-group-title">{g.title}</h3>
            <div className="cert-list">
              {g.items.map((c, i) => (
                <div className="cert" key={i}>
                  <span className="cert-n">{c.n}</span>
                  <span className="cert-i">{c.i}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
