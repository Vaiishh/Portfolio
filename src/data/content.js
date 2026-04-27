// All other site content — easy to edit in one place.

export const PUBLICATIONS = [
  {
    year: '2026',
    title: 'Reward-Constrained Multi-Agent Reasoning for Cooperative LLMs',
    venue: 'ACL 2026 · Main Conference',
    status: 'Under Review',
    abstract: `A reward-shaping framework for coordinating multiple LLM agents on reasoning tasks under strict compute and correctness constraints. Introduces a constraint-aware credit-assignment scheme that keeps cooperative policies from collapsing to the strongest single agent. Evaluated across LLaMA and GPT-class backbones on 12+ task suites.`,
    tags: ['LLM Agents', 'RL', 'Cooperation'],
  },
  {
    year: '2024',
    title: 'AI-Driven KCET Preparation Platform',
    venue: '1st International Conference on Emerging Technologies · December 2024',
    abstract: `Adaptive-learning platform combining diagnostic assessment, spaced-repetition scheduling, and performance prediction. Reported ~60% improvement in student-performance-tracking accuracy versus baseline static curricula; validated across a cohort of 500+ learners.`,
    tags: ['EdTech', 'IEEE', 'ML'],
  },
  {
    year: '2024',
    title: 'AI Sentries: ML Models for Phishing Detection',
    venue: '8th International CSITSS · IEEE · November 2024',
    abstract: `Comparative framework for evaluating adversarially-robust phishing-detection models on real-world URL and email corpora. Proposed pipeline improved detection accuracy by 20% over prior published baselines while keeping false-positive rates stable.`,
    tags: ['Security', 'IEEE', 'Adversarial ML'],
  },
];

export const WORK = [
  {
    role: 'Current · Research',
    loc: 'USC · Los Angeles, CA',
    dates: 'Aug 2025 — Present',
    title: 'Research Assistant',
    org: '— USC Viterbi',
    desc: `Working on LLM agentic systems: evaluation pipelines, multi-agent reasoning infrastructure, and the ACL 2026 submission on reward-constrained cooperation between LLM agents.`,
    bullets: [
      `Built an <strong>evaluation framework</strong> for multi-agent LLM pipelines covering correctness, cost, and failure-mode traces across <strong>12+ task suites</strong>.`,
      `Co-designed a <strong>reward-constrained training procedure</strong> for cooperating LLM agents; ran experiments across LLaMA and GPT-class backbones with statistical baselines.`,
      `Shipped internal tooling (Python / FastAPI / Postgres) for experiment tracking, prompt versioning, and reproducible runs with MLflow + W&amp;B.`,
    ],
    stack: ['PyTorch', 'LangGraph', 'Transformers', 'FastAPI', 'Postgres', 'MLflow', 'W&B', 'LaTeX'],
  },
  {
    role: 'AI / ML Consultant',
    loc: 'Bangalore, India',
    dates: 'Feb 2025 — Jul 2025',
    title: 'Oracle',
    org: '— Global Supply Chain',
    desc: `Enterprise AI on Oracle's Agent platform: retrieval at 50K+ supplier-document scale, cost-optimized inference, and integration across 47 global business units.`,
    bullets: [
      `Architected <strong>hybrid dense + BM25 RAG</strong> over 50K+ supplier documents (LangChain + Pinecone) — risk-signal detection ↑ 25% at <strong>sub-500 ms latency</strong>.`,
      `Cut LLM inference cost by <strong>~45%</strong> via semantic caching, prompt compression, and batched calls — scaled to <strong>1K+ daily queries</strong>.`,
      `Built production agents on Oracle's Agent platform with GPT-4; reduced manual supplier review by ~40% and lifted accuracy across 1,000+ enterprise processes.`,
    ],
    stack: ['LangChain', 'Pinecone', 'GPT-4', 'OCI', 'Python', 'RAG'],
  },
  {
    role: 'RPA Developer',
    loc: 'Bangalore, India',
    dates: 'Sep 2024 — Jan 2025',
    title: 'Technodysis',
    org: 'Pvt Ltd',
    desc: `Automation engineering for enterprise HR and finance workflows, including document-understanding pipelines on semi-structured inputs.`,
    bullets: [
      `Deployed end-to-end HR onboarding automation (Power Automate + Azure AI) processing <strong>200+ employee records at 99.5% accuracy</strong>.`,
      `Engineered an AI-powered document verification pipeline on 10K+ transactions — <strong>~95% accuracy on unstructured inputs</strong> via OCR + fine-tuned extraction.`,
    ],
    stack: ['Azure AI', 'Power Automate', 'Python', 'OCR'],
  },
];

export const EDUCATION = [
  {
    degree: 'MS, <em>Computer Science</em> (AI)',
    school: 'University of Southern California · Viterbi School of Engineering',
    sections: [
      {
        title: 'Core Coursework',
        body: 'Deep Learning (CSCI 566) · Applied ML (DSCI 552) · Analysis of Algorithms · Database Systems · Data Science & ML · Software Engineering · NLP · Large Language Models',
      },
      {
        title: 'Roles',
        body: 'Research Assistant · LLM Agentic Systems · Paper submission ACL 2026',
      },
    ],
    dates: 'AUG 2025 — MAY 2027',
    gpa: '3.5',
    gpaSuffix: '/4.0',
    gpaLabel: 'GPA · in progress',
  },
  {
    degree: 'B.E., <em>Computer Science &amp; Engineering</em>',
    school: 'B N M Institute of Technology · VTU · Bengaluru, India',
    sections: [
      {
        title: 'Coursework',
        body: 'Data Structures & Algorithms · OOP · Operating Systems · Computer Networks · DBMS · Web Technologies · Linear Algebra · Machine Learning',
      },
      {
        title: 'Leadership',
        body: 'Teaching Assistant (JEP, 30+ students) · Deputy Director of Finance, AI Society (managed $15K+ budget, 100+ members)',
      },
    ],
    dates: 'OCT 2021 — MAY 2025',
    gpa: '3.7',
    gpaSuffix: '/4.0',
    gpaLabel: 'CGPA',
  },
];

export const CERT_GROUPS = [
  {
    title: 'AI & Machine Learning',
    items: [
      { n: 'OCI 2025 Generative AI Professional', i: 'Oracle' },
      { n: 'AI Infrastructure & Operations Fundamentals', i: 'NVIDIA' },
      { n: 'Building AI Agents & Agentic Workflows', i: 'IBM' },
      { n: 'OCI AI Foundations Associate', i: 'Oracle' },
      { n: 'Artificial Intelligence Fundamentals', i: 'Industry' },
      { n: 'AI & Machine Learning', i: 'Industry' },
    ],
  },
  {
    title: 'Cloud & Infrastructure',
    items: [
      { n: 'Google Cloud AI Infrastructure', i: 'Google' },
      { n: 'OCI Foundations Associate', i: 'Oracle' },
      { n: 'OCI Cloud Success Navigator', i: 'Oracle' },
      { n: 'Oracle Fusion SCM Foundations', i: 'Oracle' },
    ],
  },
  {
    title: 'Engineering & Development',
    items: [
      { n: 'Complete Python Bootcamp', i: 'Industry' },
      { n: 'Web Development Fundamentals', i: 'Industry' },
      { n: 'Basics of Java', i: 'Industry' },
      { n: 'Robotic Process Automation', i: 'Industry' },
    ],
  },
  {
    title: 'Data & Security',
    items: [
      { n: 'Cyber Security', i: 'Industry' },
      { n: 'Big Data & Hadoop', i: 'Industry' },
      { n: 'Cassandra', i: 'Industry' },
      { n: 'Hive Hands-on', i: 'Industry' },
    ],
  },
];

export const SKILL_MATRIX = [
  {
    title: 'LLMs & <em>Agents</em>',
    count: '11 TOOLS',
    rows: [
      ['LangGraph', 5], ['LangChain', 5], ['LlamaIndex', 4], ['CrewAI', 3], ['LiteLLM', 4],
      ['Prompt Engineering', 5], ['RAG (hybrid/rerank)', 5], ['Fine-tuning / LoRA', 4],
      ['RLHF / DPO', 3], ['MCP Servers', 3], ['Evaluation Harnesses', 4],
    ],
  },
  {
    title: 'ML <em>Frameworks</em>',
    count: '7 TOOLS',
    rows: [
      ['PyTorch', 5], ['HuggingFace Transformers', 5], ['TensorFlow', 3], ['JAX / XLA', 2],
      ['scikit-learn', 5], ['XGBoost', 4], ['DeepSpeed / FSDP', 2],
    ],
  },
  {
    title: 'Retrieval & <em>Vectors</em>',
    count: '6 TOOLS',
    rows: [
      ['Pinecone', 5], ['FAISS', 5], ['pgvector', 4], ['ChromaDB', 3], ['Weaviate', 2], ['BM25 / Hybrid', 4],
    ],
  },
  {
    title: 'Languages',
    count: '6 · core',
    rows: [
      ['Python', 5], ['TypeScript', 5], ['JavaScript', 5], ['SQL (Postgres)', 4],
      ['C++ / CUDA', 2], ['C / Java', 3],
    ],
  },
  {
    title: 'Backend & <em>Systems</em>',
    count: '8 TOOLS',
    rows: [
      ['FastAPI', 5], ['Flask', 4], ['Node.js / Express', 4], ['PostgreSQL', 5],
      ['Redis', 4], ['Celery', 3], ['MongoDB', 3], ['gRPC', 2],
    ],
  },
  {
    title: 'Frontend',
    count: '7 TOOLS',
    rows: [
      ['Next.js 14 / 16', 5], ['React 18 / 19', 5], ['Tailwind CSS', 5], ['shadcn/ui', 4],
      ['Framer Motion', 3], ['Vercel AI SDK', 4], ['Recharts / d3', 3],
    ],
  },
  {
    title: 'MLOps & <em>Cloud</em>',
    count: '10 TOOLS',
    rows: [
      ['Docker', 4], ['Kubernetes', 3], ['MLflow', 4], ['W&amp;B', 4], ['DVC', 3],
      ['AWS (S3/EC2/λ)', 4], ['GCP Vertex AI', 3], ['OCI', 4], ['GitHub Actions', 4],
      ['Langfuse / Sentry', 3],
    ],
  },
  {
    title: 'Research & <em>Methods</em>',
    count: '8',
    rows: [
      ['Reinforcement Learning', 4], ['Multi-Agent Systems', 5], ['Transformers', 4],
      ['VAE / GAN', 3], ['Evaluation Design', 4], ['Paper Writing (LaTeX)', 4],
      ['Statistical Testing', 4], ['A/B Testing', 3],
    ],
  },
];

export const LOG_ENTRIES = [
  { ts: 'APR 22 · 09:14', tag: 'research', tagLabel: 'RESEARCH', msg: `Iterating on reward-constrained RL for cooperating LLM agents; <strong>ACL 2026 revision prep</strong>.` },
  { ts: 'APR 18 · 23:42', tag: 'build', tagLabel: 'BUILD', msg: `RLSQL: moved to Phase-2 rewards (<strong>wall-clock execution delta</strong>). Policy converging.` },
  { ts: 'APR 12 · 14:06', tag: 'ship', tagLabel: 'SHIPPED', msg: `FinMind: live deployment with streaming + multi-model debate mode. Real users, real feedback loop.` },
  { ts: 'APR 02 · 17:31', tag: 'read', tagLabel: 'READING', msg: `LangGraph supervisor patterns, reward shaping for cooperation, LLaMA-3.3 function-calling internals.` },
  { ts: 'MAR 28 · 10:58', tag: 'build', tagLabel: 'BUILD', msg: `AI Mastery Platform — capstone with <strong>Supervisor + 5 specialized agents</strong> over pgvector.` },
  { ts: 'MAR 15 · 16:22', tag: 'research', tagLabel: 'RESEARCH', msg: `Evaluation framework for multi-agent pipelines: correctness × cost × failure-mode surface.` },
];

export const TICKER_ITEMS = [
  { strong: 'Currently:', text: 'ACL 2026 · under review' },
  { strong: 'Stack:', text: 'PyTorch · LangGraph · Transformers' },
  { strong: 'Research:', text: 'Multi-agent RL · reward-constrained reasoning' },
  { strong: 'Shipped:', text: 'FinMind · LegalMind · Mindful · Talent Gauge' },
  { strong: 'Building:', text: 'RLSQL · CUDAForge · AI Mastery Platform' },
  { strong: 'Prior:', text: 'Oracle GSC · Technodysis' },
];

export const ID_CARD = [
  ['NAME', 'Vaishnavi Srinivas'],
  ['ROLE', 'Research Assistant <span class="em">·</span> USC Viterbi'],
  ['PROGRAM', 'MS Computer Science (AI)'],
  ['GPA', '3.5 / 4.0'],
  ['GRAD', 'May 2027'],
  ['RESEARCH', 'LLM agents <span class="em">·</span> multi-agent RL'],
  ['PUBS', '2× IEEE <span class="em">·</span> ACL 2026 <span class="pl">[review]</span>'],
  ['PRIOR', 'Oracle GSC <span class="em">·</span> Technodysis'],
  ['LOCATION', 'Los Angeles, CA'],
  ['STATUS', 'Summer 2026 <span class="em">·</span> will relocate'],
  ['WORK AUTH', 'F-1 · CPT eligible'],
];

export const CONTACT_LINKS = [
  { l: 'Email', v: 'im.vaish1419@gmail.com', href: 'mailto:im.vaish1419@gmail.com', a: '→' },
  { l: 'Phone', v: '+1 (213) 357-6437', href: 'tel:+12133576437', a: '→' },
  { l: 'LinkedIn', v: '/in/vaishnavi-srinivas', href: 'https://www.linkedin.com/in/vaishnavi-srinivas-65bb01240/', a: '↗', external: true },
  { l: 'GitHub', v: '/vaiishh', href: 'https://github.com/vaiishh', a: '↗', external: true },
  { l: 'Portfolio', v: 'vaiishh.github.io/Portfolio', href: 'https://vaiishh.github.io/Portfolio/', a: '↗', external: true },
];
