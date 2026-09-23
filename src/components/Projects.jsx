import { useState } from 'react'
import { projects } from '../data'
import './Projects.css'

const ACCENTS = ['var(--accent)', 'var(--accent-2)', 'var(--accent-3)']

function Projects() {
  const [expanded, setExpanded] = useState(null)

  const toggleExpanded = (title) => {
    setExpanded((current) => (current === title ? null : title))
  }

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
            const isExpanded = expanded === project.title
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

                {project.caseStudy && (
                  <div className="project-case-study">
                    <button
                      type="button"
                      className="project-case-toggle"
                      onClick={() => toggleExpanded(project.title)}
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? 'Hide Case Study' : 'View Case Study'}
                      <ChevronIcon expanded={isExpanded} />
                    </button>

                    {isExpanded && (
                      <div className="project-case-content">
                        <div className="project-case-block">
                          <h4>Problem</h4>
                          <p>{project.caseStudy.problem}</p>
                        </div>
                        <div className="project-case-block">
                          <h4>Approach</h4>
                          <p>{project.caseStudy.approach}</p>
                        </div>
                        <div className="project-case-block">
                          <h4>Result</h4>
                          <p>{project.caseStudy.result}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

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

function ChevronIcon({ expanded }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}
    >
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default Projects