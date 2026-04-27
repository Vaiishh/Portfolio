import { PROJECTS } from '../data/projects';

function ProjectCard({ project, onOpen }) {
  // Cursor-following glow: writes CSS vars on mousemove
  const handleMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
    el.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen(project.key);
    }
  };

  return (
    <article
      className={`proj ${project.layout}`}
      tabIndex={0}
      onClick={() => onOpen(project.key)}
      onKeyDown={handleKey}
      onMouseMove={handleMove}
      role="button"
      aria-label={`Open ${project.title} details`}
    >
      <div className="proj-head">
        <span className="proj-idx">{project.idx}</span>
        <span className={`proj-status ${project.status.cls}`}>{project.status.label}</span>
      </div>
      <h3 className="proj-title">
        {project.title}
        <span className="serif"> <em>— {project.subtitle}</em></span>
      </h3>
      <div className="proj-tag">{project.tag}</div>
      <p className="proj-desc" dangerouslySetInnerHTML={{ __html: project.desc }} />
      <div className="proj-metrics">
        {project.metrics.map((m, i) => (
          <div key={i}>
            <div className="m-v">
              {m.v}
              {m.u && <span className="u">{m.u}</span>}
            </div>
            <div className="m-l">{m.l}</div>
          </div>
        ))}
      </div>
      <div className="proj-stack">
        {project.stack.map((s) => (
          <span className="chip" key={s}>{s}</span>
        ))}
      </div>
      <div className="proj-more">open deep-dive →</div>
    </article>
  );
}

export default function Projects({ onOpenProject }) {
  return (
    <section className="section" id="projects">
      <div className="s-head reveal">
        <span className="num">§ 04</span>
        <h2>Projects <em>— click any card for full details.</em></h2>
        <span className="meta">8 PROJECTS · 2026</span>
      </div>

      <div className="proj-grid reveal">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.key} project={p} onOpen={onOpenProject} />
        ))}
      </div>
    </section>
  );
}
