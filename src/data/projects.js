// All project data — cards + deep-dive modal content.
// Edit here to update project info; components consume from this single source.

export const PROJECTS = [
  {
    key: 'rlsql',
    layout: 'featured',
    idx: '/ 01 — DEEP LEARNING CAPSTONE · CSCI 566',
    status: { label: 'In Progress', cls: 's-research' },
    title: 'RLSQL',
    subtitle: 'learning to rewrite queries.',
    tag: 'RL + LLM · Database Optimization',
    desc: `A reinforcement-learning agent that rewrites SQL queries for lower execution cost. A <strong>DQN policy</strong> picks which of 7 rewrite strategies to apply, an <strong>LLM generates the rewrite</strong>, and the reward is the real speedup against PostgreSQL's cost model. Two training phases: EXPLAIN-cost proxy for fast exploration, then wall-clock execution for fine-tuning.`,
    metrics: [
      { v: '7', u: 'strat', l: 'Action space' },
      { v: 'DQN', l: 'Policy net' },
      { v: 'PG', l: 'Real cost model' },
      { v: '2-phase', l: 'Reward schedule' },
      { v: 'MLflow', l: 'Tracking' },
    ],
    stack: ['PyTorch', 'DQN', 'LLM Agents', 'PostgreSQL', 'Python', 'MLflow'],
    modal: {
      tag: 'Deep Learning · RL + LLM · CSCI 566',
      title: 'RLSQL <em>— learning to rewrite queries.</em>',
      sections: [
        {
          h: 'PROBLEM',
          body: `<p>SQL query optimization is traditionally done by DBAs manually rewriting queries to run faster. This doesn't scale — and automated approaches are either rule-based (rigid, miss nuances) or purely ML-based (don't understand SQL semantics well enough). I combined <strong>RL</strong> (learns optimal strategies from experience) with <strong>LLMs</strong> (understand SQL semantics) to get the best of both.</p>`,
        },
        {
          h: 'SYSTEM ARCHITECTURE',
          body: `<p>Three components wired together as a Gym-style environment:</p><ul><li><strong>Environment.</strong> PostgreSQL instance running the Brazilian E-Commerce dataset. Queries execute against the real DB and I measure <em>wall-clock execution time</em>, not estimated cost.</li><li><strong>DQN policy</strong> (PyTorch). A deep-Q-network takes the encoded query + schema state and outputs a distribution over 7 rewrite strategies. Epsilon-greedy exploration, replay buffer, target network refresh every 50 episodes.</li><li><strong>LLM rewriter.</strong> Given the selected strategy, the LLM generates the actual rewrite. The rewrite is validated for equivalence before execution.</li></ul>`,
        },
        {
          h: 'ACTION SPACE (7 STRATEGIES)',
          body: `<ul><li><code>predicate_pushdown</code> — push filters below joins</li><li><code>join_reorder</code> — change join order to minimize intermediate size</li><li><code>subquery_unnest</code> — flatten correlated subqueries</li><li><code>redundant_distinct_removal</code></li><li><code>index_hint</code> — suggest specific index usage</li><li><code>aggregation_pushdown</code></li><li><code>no_op</code> — keep original (safe default)</li></ul>`,
        },
        {
          h: 'REWARD FUNCTION',
          body: `<ul><li><strong>Equivalence failure</strong> → −1.0 (hard penalty, safety first)</li><li><strong>Syntax error / timeout</strong> → −1.0</li><li><strong>Speedup</strong> → (T_orig − T_new) / T_orig — proportional to gain</li><li><strong>no_op</strong> → 0.0 (neutral, safe)</li><li><strong>Regression</strong> → negative (automatic from formula)</li></ul><p><strong>Two-phase training:</strong> Phase 1 uses PostgreSQL's EXPLAIN cost as a fast proxy for latency, enabling rapid exploration. Phase 2 switches to real wall-clock execution for final policy fine-tuning.</p>`,
        },
        {
          h: 'TRAINING DETAILS',
          body: `<ul><li>DQN: 3-layer MLP, 256 hidden units, LayerNorm, orthogonal init</li><li>Replay buffer 50K, batch 32, γ=0.99, ε-decay from 1.0 → 0.05</li><li>MLflow tracking, W&amp;B dashboards, reproducible seeds</li><li>Equivalence validation via <code>EXCEPT</code> diff on sampled result sets</li></ul>`,
        },
        {
          h: 'STACK',
          body: `<div class="modal-grid"><div><div class="m-v">PyTorch</div><div class="m-l">DQN + policy</div></div><div><div class="m-v">LLM</div><div class="m-l">Rewrite gen</div></div><div><div class="m-v">Postgres</div><div class="m-l">Cost model</div></div><div><div class="m-v">MLflow</div><div class="m-l">Tracking</div></div></div>`,
        },
      ],
    },
  },
  {
    key: 'legalmind',
    layout: 'half',
    idx: '/ 02',
    status: { label: 'Shipped', cls: 's-shipped' },
    title: 'LegalMind',
    subtitle: 'multi-agent contract review.',
    tag: 'LangGraph · Multi-Agent · RAG',
    desc: `Four specialized agents — <strong>Parser · Clause Extractor · Compliance Checker · Orchestrator</strong> — coordinated via LangGraph state graph with Zod-validated outputs. RAG over jurisdiction-tagged legal precedents.`,
    metrics: [
      { v: '4', u: 'agents', l: 'Specialized roles' },
      { v: '70B', l: 'LLaMA-3.3' },
      { v: '-34', u: '%', l: 'Error rate' },
    ],
    stack: ['LangGraph', 'Next.js', 'Groq', 'LLaMA-3.3-70B', 'Zod', 'pgvector'],
    modal: {
      tag: 'Multi-Agent · LangGraph · RAG',
      title: 'LegalMind <em>— contract review agents.</em>',
      sections: [
        {
          h: 'PROBLEM',
          body: `<p>Legal professionals spend hours manually reviewing contracts — reading every clause, checking compliance across jurisdictions, extracting key terms. Existing AI tools are single-purpose: one extracts clauses, another checks compliance. No tool handles the full pipeline, so I built one.</p>`,
        },
        {
          h: 'MULTI-AGENT ARCHITECTURE',
          body: `<p>Four specialized agents coordinated via LangGraph state graph:</p><ul><li><strong>Document Parser.</strong> Raw contracts (PDFs) → structured text, sections, parties, definitions.</li><li><strong>Clause Extractor.</strong> Identifies and categorizes clauses — termination, liability, indemnification, confidentiality. NLP semantics, not keyword matching.</li><li><strong>Compliance Checker.</strong> RAG over jurisdiction-tagged precedent corpus. Flags non-compliant or risky clauses.</li><li><strong>Orchestrator.</strong> Coordinates pipeline, handles retries, aggregates results into final memo with risk dashboard.</li></ul>`,
        },
        {
          h: 'WHY LANGGRAPH',
          body: `<p>LangChain is great for single chains but doesn't handle multi-agent state. AutoGen is conversational, not pipeline-oriented. <strong>LangGraph</strong> gives stateful graph-based orchestration — each agent is a node, edges define data flow, conditional edges handle errors (retry with different parser, mark section for human review, continue). The graph maintains a shared state object each agent reads from and writes to its portion of.</p>`,
        },
        {
          h: 'GUARANTEES & STRUCTURED OUTPUTS',
          body: `<ul><li><strong>Zod schemas</strong> validate every agent output before it enters shared state — no malformed handoffs.</li><li><strong>Graceful degradation.</strong> If Clause Extractor fails on a section, it logs the error, marks that section <code>needs_review</code>, and processing continues.</li><li><strong>Evaluation harness</strong> measures agent output correctness against manually-reviewed corpus — error rate reduced 34% through iterative prompt engineering and architecture refinement.</li></ul>`,
        },
        {
          h: 'STACK',
          body: `<div class="modal-grid"><div><div class="m-v">LangGraph</div><div class="m-l">Orchestration</div></div><div><div class="m-v">LLaMA-3.3-70B</div><div class="m-l">Via Groq</div></div><div><div class="m-v">Next.js</div><div class="m-l">Frontend</div></div><div><div class="m-v">pgvector</div><div class="m-l">Precedent RAG</div></div><div><div class="m-v">Zod</div><div class="m-l">Validation</div></div><div><div class="m-v">FastAPI</div><div class="m-l">Backend</div></div></div>`,
        },
      ],
    },
  },
  {
    key: 'finmind',
    layout: 'half',
    idx: '/ 03',
    status: { label: 'Live', cls: 's-live' },
    title: 'FinMind',
    subtitle: 'AI analyst terminal.',
    tag: 'Full-Stack · Streaming LLM · 6 Routes',
    desc: `Bloomberg-style AI platform: streaming <strong>LLaMA-3.3-70B</strong> responses with structured reasoning (Classification · Thinking · Sources · Risks · Confidence), live watchlist, portfolio tracker, price alerts, multi-model debate layer.`,
    metrics: [
      { v: '6', l: 'Routes' },
      { v: '70B', l: 'LLaMA-3.3' },
      { v: 'Live', l: 'Real users' },
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Vercel AI SDK', 'Groq', 'Recharts'],
    modal: {
      tag: 'Full-Stack · Streaming LLM · Live',
      title: 'FinMind <em>— AI analyst terminal.</em>',
      sections: [
        {
          h: 'WHAT IT IS',
          body: `<p>Bloomberg-terminal-style AI financial-analysis platform. Users type natural-language queries, the LLM streams back <strong>structured reasoning chains</strong> — Classification · Thinking · Sources · Analysis · Risks · Confidence — with live watchlist data, portfolio P&amp;L, and a multi-model debate layer for research takes.</p>`,
        },
        {
          h: 'SIX ROUTES',
          body: `<ul><li><code>/chat</code> — main streaming interface with ticker, watchlist sidebar, voice input</li><li><code>/history</code> — searchable past conversations with parsed responses</li><li><code>/portfolio</code> — holdings tracker with sparklines, P&amp;L, "Analyze with AI" per position</li><li><code>/alerts</code> — price-alert system</li><li><code>/learn</code> — embedded educational content</li><li><code>/settings</code> — theme, preferences</li></ul>`,
        },
        {
          h: 'ARCHITECTURE',
          body: `<ul><li><strong>Frontend:</strong> Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4, custom glassmorphism design</li><li><strong>LLM layer:</strong> Groq LLaMA-3.3-70B via Vercel AI SDK v6 with streaming + structured output parsing</li><li><strong>Voice input:</strong> Web Speech API</li><li><strong>State:</strong> localStorage for conversation persistence, hydration-safe rendering</li><li><strong>Exports:</strong> Markdown, plain text, clipboard</li></ul>`,
        },
        {
          h: 'DESIGN DECISIONS',
          body: `<p>The most important choice was making reasoning <strong>visible</strong>. Every AI response has Classification → Thinking → Sources → Risks → Confidence blocks. Users see <em>why</em> the model said what it said. This earns trust in a domain (finance) where hallucinated sources are catastrophic.</p>`,
        },
      ],
    },
  },
  {
    key: 'talentgauge',
    layout: 'half',
    idx: '/ 04',
    status: { label: 'Shipped', cls: 's-shipped' },
    title: 'Talent Gauge',
    subtitle: 'FAISS resume screener.',
    tag: 'FAISS · Fine-tuned BERT · End-to-End',
    desc: `FAISS-indexed pipeline ranking <strong>10K+ resumes</strong> at <strong>sub-100 ms latency</strong>. Fine-tuned BERT ranker, batched inference via Python multiprocessing, 91% structured-extraction accuracy, auto-scheduling via SMTP.`,
    metrics: [
      { v: '10K', u: '+', l: 'Resumes' },
      { v: '<100', u: 'ms', l: 'Latency' },
      { v: '20×', l: 'Speedup' },
      { v: '91', u: '%', l: 'Accuracy' },
    ],
    stack: ['FAISS', 'BERT', 'Python', 'Multiprocessing', 'NLP'],
    modal: {
      tag: 'NLP · FAISS · Fine-tuned BERT',
      title: 'Talent Gauge <em>— resume screening at speed.</em>',
      sections: [
        {
          h: 'PROBLEM',
          body: `<p>Recruiters screen thousands of resumes manually and miss semantic matches — "Python developer" vs "software engineer with Python experience" are the same thing, but keyword matching misses it. Vector embeddings capture meaning, not surface form.</p>`,
        },
        {
          h: 'PIPELINE',
          body: `<ul><li><strong>Ingest.</strong> PDF/DOCX resumes → structured extraction (skills, experience, education) at 91% accuracy.</li><li><strong>Embed.</strong> Fine-tuned BERT encodes resumes and JDs into a shared embedding space.</li><li><strong>Index.</strong> FAISS with IVF-PQ for 10K+ resumes, sub-100ms retrieval.</li><li><strong>Rank.</strong> Fine-tuned BERT ranker scores JD ↔ resume pairs; top-K returned with semantic similarity.</li><li><strong>Act.</strong> Automated analytics reports + SMTP interview scheduling for top candidates.</li></ul>`,
        },
        {
          h: 'PERFORMANCE',
          body: `<div class="modal-grid"><div><div class="m-v">10K<span class="u">+</span></div><div class="m-l">Resumes</div></div><div><div class="m-v">&lt;100<span class="u">ms</span></div><div class="m-l">Latency</div></div><div><div class="m-v">20×</div><div class="m-l">Speedup</div></div><div><div class="m-v">91<span class="u">%</span></div><div class="m-l">Accuracy</div></div><div><div class="m-v">4h → 12m</div><div class="m-l">Time cut</div></div></div>`,
        },
        {
          h: 'SPEEDUP MECHANICS',
          body: `<ul><li><strong>Batched inference</strong> via Python multiprocessing — embeddings computed in parallel across CPU cores.</li><li><strong>FAISS IVF-PQ index</strong> for approximate nearest-neighbor at scale, tuned for recall ≥ 0.95 at the top-K.</li><li><strong>Warm cache</strong> on JD embeddings — same JD screened repeatedly doesn't re-embed.</li></ul>`,
        },
      ],
    },
  },
  {
    key: 'mindful',
    layout: 'half',
    idx: '/ 05',
    status: { label: 'Shipped', cls: 's-shipped' },
    title: 'Mindful',
    subtitle: 'safety-first wellness chat.',
    tag: 'Safety-Critical ML · DistilBERT · Redis',
    desc: `Containerized microservices for a mental-wellness chatbot with <strong>safety escalation</strong> — keywords + sentiment thresholds bypass AI generation and surface crisis resources directly. Redis semantic caching, async Celery pipelines.`,
    metrics: [
      { v: '450', u: 'ms', l: 'P50 latency' },
      { v: '-60', u: '%', l: 'Cost cut' },
      { v: '5×', l: 'Throughput' },
    ],
    stack: ['FastAPI', 'React', 'Redis', 'DistilBERT', 'Celery'],
    modal: {
      tag: 'Safety-Critical ML · Async Pipelines',
      title: 'Mindful <em>— wellness chat.</em>',
      sections: [
        {
          h: 'THE PROBLEM',
          body: `<p>Mental-health chatbots have serious ethical stakes. Unlike a regular chatbot, getting it wrong can hurt the user. The engineering challenge was less about the model and more about the <strong>safety envelope</strong> around it.</p>`,
        },
        {
          h: 'SAFETY SYSTEM',
          body: `<ul><li><strong>Keyword + sentiment detection.</strong> High-risk keywords and low sentiment scores bypass AI generation entirely and surface crisis resources directly.</li><li><strong>No model generation in high-risk paths.</strong> A generative LLM in a mental-health crisis is unbounded risk; the system fails closed to human-vetted resources.</li><li><strong>Pattern tracking.</strong> Sentiment logs identify deteriorating trends across sessions without surfacing trigger content.</li></ul>`,
        },
        {
          h: 'ENGINEERING',
          body: `<ul><li><strong>Containerized microservices</strong> with high availability.</li><li><strong>Redis semantic caching</strong> — cut latency 2.3s → 450ms, API cost 60%.</li><li><strong>DistilBERT fine-tuned</strong> for mental-health domain sentiment + intent.</li><li><strong>Celery async pipelines</strong> for journaling processing — 5× throughput on 1,000+ entries.</li></ul>`,
        },
      ],
    },
  },
  {
    key: 'cudaforge',
    layout: 'third',
    idx: '/ 06',
    status: { label: 'Shipped', cls: 's-shipped' },
    title: 'CUDAForge',
    subtitle: 'kernel lab.',
    tag: 'CUDA C++ · Nsight',
    desc: `Hand-written CUDA kernels for DL ops. Tiled GEMM + fused softmax/layernorm, profiled against cuBLAS with Nsight roofline analysis.`,
    metrics: [
      { v: 'GEMM', l: 'Tiled + fused' },
      { v: 'A100', l: 'Target HW' },
    ],
    stack: ['CUDA', 'C++', 'Nsight'],
    modal: {
      tag: 'GPU · CUDA C++ · Kernel Optimization',
      title: 'CUDAForge <em>— kernel lab.</em>',
      sections: [
        {
          h: 'WHY',
          body: `<p>Deep learning inference hits hardware limits before mathematical ones. Standard implementations often don't utilize GPU resources efficiently — memory access patterns, occupancy, register pressure all matter. I wanted to understand the stack from math down to SM.</p>`,
        },
        {
          h: 'WHAT I BUILT',
          body: `<ul><li><strong>Tiled GEMM kernels.</strong> Shared-memory tiling, coalesced loads, prefetching. Benchmarked against cuBLAS.</li><li><strong>Fused softmax + layernorm.</strong> Kernel fusion to reduce memory transfers — compute A and B in one pass instead of write-read round-trips.</li><li><strong>Profiling pipeline.</strong> Nsight Compute roofline analysis to identify memory-bound vs compute-bound kernels.</li></ul>`,
        },
        {
          h: 'LESSONS',
          body: `<p>Most "slow" kernels are memory-bound, not compute-bound. Fixing bank conflicts and improving coalescing gets more speedup than micro-optimizing ALU work. The A100 has so much compute that feeding it is the actual problem.</p>`,
        },
      ],
    },
  },
  {
    key: 'aimastery',
    layout: 'third',
    idx: '/ 07',
    status: { label: 'In Progress', cls: 's-wip' },
    title: 'AI Mastery',
    subtitle: 'learning agents.',
    tag: 'LangGraph · Supervisor · 5 Agents',
    desc: `Learning platform with a Supervisor orchestrating 5 specialists (<strong>Tutor · Quiz · Architect · News · Flashcards</strong>) over pgvector + LiteLLM.`,
    metrics: [
      { v: '5', u: '+1', l: 'Agents' },
      { v: 'pgvector', l: 'RAG' },
    ],
    stack: ['LangGraph', 'Next.js 14', 'FastAPI', 'pgvector', 'LiteLLM'],
    modal: {
      tag: 'LangGraph · Supervisor Pattern · 5 Agents',
      title: 'AI Mastery Platform <em>— learning agents.</em>',
      sections: [
        {
          h: 'CONCEPT',
          body: `<p>A platform for learning AI engineering — with AI engineering. A Supervisor agent routes user requests to five specialist agents, each using a different agentic pattern.</p>`,
        },
        {
          h: 'THE AGENTS',
          body: `<ul><li><strong>Tutor</strong> — ReAct loop for adaptive teaching</li><li><strong>Quiz Master</strong> — evaluator pattern with rubric-based LLM-as-judge grading</li><li><strong>Project Architect</strong> — Plan-and-Execute for structured mentorship</li><li><strong>News Curator</strong> — retrieval + summarization, refreshed every 6h via Celery Beat</li><li><strong>Flashcard Engine</strong> — generative pattern with spaced repetition</li></ul>`,
        },
        {
          h: 'STACK',
          body: `<div class="modal-grid"><div><div class="m-v">Next.js 14</div><div class="m-l">Frontend</div></div><div><div class="m-v">FastAPI</div><div class="m-l">Backend</div></div><div><div class="m-v">LangGraph</div><div class="m-l">Orchestration</div></div><div><div class="m-v">Claude</div><div class="m-l">Sonnet 4.6 / Haiku 4.5</div></div><div><div class="m-v">pgvector</div><div class="m-l">RAG</div></div><div><div class="m-v">LiteLLM</div><div class="m-l">Model routing</div></div><div><div class="m-v">Celery</div><div class="m-l">Background</div></div><div><div class="m-v">Langfuse</div><div class="m-l">Tracing</div></div></div>`,
        },
      ],
    },
  },
  {
    key: 'inferno',
    layout: 'third',
    idx: '/ 08',
    status: { label: 'Shipped', cls: 's-shipped' },
    title: 'Inferno',
    subtitle: 'burn mechanics.',
    tag: 'React 18 · Custom Hooks · Real-Time',
    desc: `React word strategy game. Custom <code style="font-family:var(--f-mono);font-size:10px;color:var(--plasma);">useGameLogic</code> hook: 6×6 grid, burn propagation, 4-state heat, 2K+ dictionary.`,
    metrics: [
      { v: '6×6', l: 'Grid' },
      { v: '2K', u: '+', l: 'Dictionary' },
    ],
    stack: ['React 18', 'TypeScript', 'Tailwind'],
    modal: {
      tag: 'React 18 · Custom Hooks · Real-Time',
      title: 'Inferno <em>— burn mechanics.</em>',
      sections: [
        {
          h: 'CONCEPT',
          body: `<p>Fire-themed word strategy game. 6×6 adjacency grid, real-time burn propagation, four escalating heat states, time-pressure gameplay.</p>`,
        },
        {
          h: 'ENGINEERING',
          body: `<ul><li>Custom <code>useGameLogic</code> hook handling timers, burn propagation, dictionary validation (2K+ words), scoring, and game-over conditions</li><li>React 18 + TypeScript + Tailwind + shadcn/ui</li><li>Performant burn-state animations without dropping frames on the 6×6 grid</li></ul>`,
        },
      ],
    },
  },
];
