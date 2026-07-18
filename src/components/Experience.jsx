import { experience } from '../data'
import './Experience.css'

function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Experience</span>
          <h2 className="section-title">Where I've contributed</h2>
        </div>

        <div className="timeline">
          {experience.map((item) => (
            <div className="timeline-item" key={item.role + item.org}>
              <div className="timeline-marker" />
              <div className="timeline-content card">
                <div className="timeline-heading">
                  <h3>{item.role}</h3>
                  <span className="timeline-period">{item.period}</span>
                </div>
                <p className="timeline-org">
                  {item.orgUrl ? (
                    <a href={item.orgUrl} target="_blank" rel="noreferrer" className="timeline-org-link">
                      {item.org} &#8599;
                    </a>
                  ) : (
                    item.org
                  )}
                </p>
                <ul className="timeline-points">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
