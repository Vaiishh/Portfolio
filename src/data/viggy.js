// Contextual dialogue Viggy speaks based on visible section.
// Action keys are resolved in the Viggy component to real callbacks.

export const SECTION_DIALOGUES = {
  top: {
    msg: `Hi! I'm <strong>Viggy</strong> — Vaish's AI guide. She's a CS grad student at USC who builds LLM agents, RAG systems, and multi-agent stuff. Want the tour, or got questions?`,
    ctas: [
      { t: '💬 Chat with me', action: 'open-chat' },
      { t: '→ See projects', action: 'scroll', target: 'projects' },
      { t: 'Dismiss', action: 'dismiss' },
    ],
  },
  about: {
    msg: `This is Vaish's story — <strong>MS CS at USC Viterbi</strong>, AI specialization, Research Assistant on LLM agentic systems. Before USC: Oracle (built RAG at 50K+ doc scale).`,
    ctas: [
      { t: '💬 Ask me more', action: 'open-chat' },
      { t: 'Got it', action: 'dismiss' },
    ],
  },
  research: {
    msg: `Her <strong>ACL 2026 paper</strong> on <em>reward-constrained multi-agent reasoning</em> is under review right now. Plus two IEEE pubs on phishing detection and adaptive learning.`,
    ctas: [
      { t: '💬 Ask about her research', action: 'open-chat' },
      { t: 'Tell me more', action: 'detail-research' },
      { t: 'Dismiss', action: 'dismiss' },
    ],
  },
  work: {
    msg: `At Oracle she architected a <strong>50K+ document RAG system</strong>, cut LLM inference cost <strong>~45%</strong>, and built production AI agents. She ships real things, not demos.`,
    ctas: [
      { t: '💬 Chat about her work', action: 'open-chat' },
      { t: 'Nice', action: 'dismiss' },
    ],
  },
  projects: {
    msg: `<strong>Eight projects</strong> here — click any card for the full deep-dive. The big one is <strong>RLSQL</strong> (RL + LLM for SQL query optimization).`,
    ctas: [
      { t: '💬 Ask about a project', action: 'open-chat' },
      { t: '→ RLSQL', action: 'open-project', target: 'rlsql' },
      { t: '→ LegalMind', action: 'open-project', target: 'legalmind' },
    ],
  },
  stack: {
    msg: `5 bars = production-shipped. 2 bars = actively learning. Her core stack: <strong>PyTorch · LangGraph · Next.js · FastAPI · Postgres + pgvector</strong>.`,
    ctas: [
      { t: '💬 Ask about her stack', action: 'open-chat' },
      { t: 'Ok', action: 'dismiss' },
    ],
  },
  log: {
    msg: `Real lab log — what she's <em>actually</em> been working on this month. Latest: ACL revision prep and RLSQL Phase-2 training.`,
    ctas: [
      { t: '💬 Got questions?', action: 'open-chat' },
      { t: 'Got it', action: 'dismiss' },
    ],
  },
  education: {
    msg: `<strong>USC Viterbi MS CS</strong> (AI track) · GPA 3.5/4.0 · grad May 2027. BE from VTU with 3.7 CGPA.`,
    ctas: [
      { t: '💬 Ask me more', action: 'open-chat' },
      { t: 'Ok', action: 'dismiss' },
    ],
  },
  certs: {
    msg: `<strong>22 certs</strong> — Oracle GenAI Professional, NVIDIA AI Infrastructure, IBM Agents, Google Cloud AI, and more.`,
    ctas: [
      { t: '💬 Chat with me', action: 'open-chat' },
      { t: 'Got it', action: 'dismiss' },
    ],
  },
  contact: {
    msg: `Reach out! She's <strong>open for Summer 2026</strong>, happy to relocate, F-1 + CPT eligible.`,
    ctas: [
      { t: '💬 Ask me anything', action: 'open-chat' },
      { t: '📧 Email', action: 'href', target: 'mailto:im.vaish1419@gmail.com' },
      { t: '💼 LinkedIn', action: 'href-blank', target: 'https://www.linkedin.com/in/vaishnavi-srinivas-65bb01240/' },
    ],
  },
};

export const RESEARCH_DETAIL = {
  msg: `Reward-constrained reasoning trains LLM agents to cooperate without one agent dominating. She ran experiments on LLaMA and GPT backbones across 12+ task suites.`,
  ctas: [
    { t: '💬 Ask follow-up questions', action: 'open-chat' },
    { t: 'Cool', action: 'dismiss' },
  ],
};
