import { skills } from '../data'
import './Skills.css'

function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Skills</span>
          <h2 className="section-title">What I work with</h2>
          <p className="section-subtitle">
            A snapshot of the languages, frameworks and tools I use to build and ship projects.
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((group) => (
            <div className="skills-card card" key={group.category}>
              <h3>{group.category}</h3>
              <div className="skills-tags">
                {group.items.map((item) => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
