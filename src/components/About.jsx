import { ID_CARD } from '../data/content';

export default function About() {
  return (
    <section className="section" id="about">
      <div className="s-head reveal">
        <span className="num">§ 01</span>
        <h2>About <em>— research-first, production-honest.</em></h2>
        <span className="meta">FILE · about.md</span>
      </div>

      <div className="about-wrap">
        <div className="about-body reveal">
          <p>
            I&apos;m finishing my <strong>MS in Computer Science at USC Viterbi</strong> on the AI specialization,
            where I work as a <em>Research Assistant on LLM agentic systems</em> — building evaluation pipelines,
            designing multi-agent training procedures, and writing the thing that gets submitted to ACL.
          </p>
          <p>
            My current paper <em>(under review at ACL 2026)</em> is about{' '}
            <span className="ember">reward-constrained multi-agent reasoning</span> — training cooperating LLM agents
            to respect tight compute and correctness budgets without collapsing to the strongest single agent. Alongside it
            I&apos;m building <strong>RLSQL</strong>, a deep-learning capstone that trains a DQN agent to rewrite SQL
            queries against PostgreSQL&apos;s real cost model, with an LLM generating rewrites across a 7-strategy action space.
          </p>
          <p>
            Before USC I was an <strong>AI/ML Consultant at Oracle</strong>, architecting a production RAG system over
            50K+ supplier documents and cutting LLM inference cost by ~45% through semantic caching and batch inference.
            I care about systems that are <em>actually deployed</em> — not demos.
          </p>
          <p>
            I&apos;ve shipped a streaming AI analyst terminal (<strong>FinMind</strong>), a multi-agent legal-review system
            (<strong>LegalMind</strong>), a safety-first wellness chatbot (<strong>Mindful</strong>), a FAISS-backed resume
            ranker (<strong>Talent Gauge</strong>), a CUDA-kernel benchmarking lab (<strong>CUDAForge</strong>), and more.
            I read papers at 2am, debug production inference at 2am, and believe the interesting work lives in the{' '}
            <span className="ember">ugly middle</span> — where research ideas have to survive latency budgets, API
            flakiness, and users who don&apos;t read docs.
          </p>
        </div>

        <aside className="id-card reveal" aria-label="Profile card">
          <div className="id-head">
            <span>IDENTITY.CARD</span>
            <span className="live">LIVE</span>
          </div>
          {ID_CARD.map(([label, value]) => (
            <div className="id-row" key={label}>
              <span className="l">{label}</span>
              <span className="v" dangerouslySetInnerHTML={{ __html: value }} />
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
