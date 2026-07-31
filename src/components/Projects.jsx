import { projects } from '../data'
import './Projects.css'

const ACCENTS = ['var(--accent)', 'var(--accent-2)', 'var(--accent-3)']

function Projects() {
  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Projects</span>
          <h2 className="section-title">Things I've built</h2>
          <p className="section-subtitle">
            Some of My Recent Projects that I have Made.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => {
            const isLive = project.liveUrl && project.liveUrl !== '#'
            return (
              <div
                className="project-card card"
                style={{ '--card-accent': ACCENTS[i % ACCENTS.length] }}
                key={project.title}
              >
                <div className="project-card-top">
                  <span className="project-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="project-status">
                    {isLive ? (
                      <>
                        <span className="project-status-dot" /> live
                      </>
                    ) : (
                      'in dev'
                    )}
                  </span>
                  <span className="project-index">{String(i + 1).padStart(2, '0')}</span>
                </div>

                <div className="project-card-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tech.map((tech) => (
                      <span className="tag" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="project-links">
                  {isLive && (
                    <a className="project-link-btn" href={project.liveUrl} target="_blank" rel="noreferrer">
                      Live Demo
                      <ArrowIcon />
                    </a>
                  )}
                  <a className="project-link-btn project-link-btn--ghost" href={project.codeUrl} target="_blank" rel="noreferrer">
                    Source Code
                    <ArrowIcon />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default Projects
