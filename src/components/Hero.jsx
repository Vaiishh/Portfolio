export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-in">
        <div className="terminal" role="status" aria-live="polite">
          <div className="terminal-bar">
            <div className="dots">
              <span /><span /><span />
            </div>
            <div className="name">vaish@usc-viterbi:~/portfolio</div>
          </div>
          <div className="terminal-body">
            <div className="line"><span className="prompt">$</span><span className="cmd">cat profile.json</span></div>
            <div className="line"><span className="out">{'{ '}<span className="key">role</span>: <span className="ok">"AI/ML Engineer"</span>,</span></div>
            <div className="line"><span className="out">&nbsp;&nbsp;<span className="key">focus</span>: [<span className="ok">"LLMs"</span>, <span className="ok">"RAG"</span>, <span className="ok">"multi-agent"</span>],</span></div>
            <div className="line"><span className="out">&nbsp;&nbsp;<span className="key">program</span>: <span className="ok">"MS CS @ USC Viterbi"</span>,</span></div>
            <div className="line"><span className="out">&nbsp;&nbsp;<span className="key">research</span>: <span className="ok">"ACL 2026 · under review"</span>,</span></div>
            <div className="line"><span className="out">&nbsp;&nbsp;<span className="key">status</span>: <span className="ok">"open · summer 2026"</span> {'}'}</span></div>
            <div className="line"><span className="prompt">$</span><span className="cmd">_<span className="caret" /></span></div>
          </div>
        </div>

        <h1 className="hero-title">
          Building <em>intelligent</em><br />
          agents<span className="slash">,</span> <span className="amp">&amp;</span> <em>shipping</em><br />
          them to <em>production</em><span className="slash">.</span>
        </h1>

        <div className="hero-sub">
          <p className="hero-lead">
            I&apos;m Vaishnavi — an <strong>AI/ML engineer &amp; researcher</strong> at USC Viterbi. I work on{' '}
            <span className="k">LLM agentic systems</span>, <span className="p">RAG architectures</span>, and production ML.
            My portfolio spans an enterprise Oracle RAG system over 50K+ docs, a multi-agent contract-review system (LegalMind),
            a FAISS-backed resume screener (Talent Gauge), a streaming AI finance terminal (FinMind), a reinforcement-learning
            SQL optimizer (RLSQL), hand-written CUDA kernels (CUDAForge), and a safety-critical wellness chatbot (Mindful).
          </p>
          <div className="hero-stats">
            <div className="stat"><div className="v">3</div><div className="l">Pubs · 2 IEEE · 1 ACL</div></div>
            <div className="stat"><div className="v">8<small>+</small></div><div className="l">Production projects</div></div>
            <div className="stat"><div className="v">50K<small>+</small></div><div className="l">Docs · Oracle RAG</div></div>
            <div className="stat"><div className="v">45<small>%</small></div><div className="l">LLM cost cut</div></div>
          </div>
        </div>

        <div className="hero-ctas">
          <a href="#projects" className="btn btn-solid">See the work →</a>
          <a href="#research" className="btn btn-ghost">Read the research</a>
          <a href="mailto:im.vaish1419@gmail.com" className="btn btn-ghost">Get in touch</a>
        </div>
      </div>

      <div className="hero-meta-row">
        <div className="coord">
          <span><em>LOC·</em>LOS ANGELES, CA</span>
          <span><em>STATUS·</em>OPEN · SUMMER 2026</span>
          <span><em>FOCUS·</em>LLMs · RAG · AGENTS</span>
        </div>
        <div>SCROLL TO ENTER →</div>
      </div>
    </header>
  );
}
