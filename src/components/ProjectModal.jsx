import { useEffect } from 'react';
import { PROJECTS } from '../data/projects';

export default function ProjectModal({ openKey, onClose }) {
  const project = PROJECTS.find((p) => p.key === openKey);

  useEffect(() => {
    if (!openKey) return;
    document.body.style.overflow = 'hidden';
    const onEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onEsc);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onEsc);
    };
  }, [openKey, onClose]);

  return (
    <div
      className={`overlay${openKey ? ' open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal">
        <div className="modal-head">
          <div>
            {project && (
              <>
                <div className="modal-tagline">{project.modal.tag}</div>
                <h3 dangerouslySetInnerHTML={{ __html: project.modal.title }} />
              </>
            )}
          </div>
          <button className="modal-close" onClick={onClose}>CLOSE · ESC</button>
        </div>
        <div className="modal-body">
          {project &&
            project.modal.sections.map((s, i) => (
              <div className="modal-sect" key={i}>
                <h4>{s.h}</h4>
                <div dangerouslySetInnerHTML={{ __html: s.body }} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
