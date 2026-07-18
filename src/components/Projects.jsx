import { projects } from '../data'
import './Projects.css'

function Projects() {
  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Projects</span>
          <h2 className="section-title">Things I've built</h2>
          <p className="section-subtitle">
            A selection of projects — replace these with your own work and links.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card card" key={project.title}>
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
                {project.liveUrl && project.liveUrl !== '#' && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    Live Demo &#8599;
                  </a>
                )}
                <a href={project.codeUrl} target="_blank" rel="noreferrer">
                  Source Code &#8599;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
