import { education } from '../data'
import './Education.css'

function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Education</span>
          <h2 className="section-title">Academic background</h2>
        </div>

        <div className="education-list">
          {education.map((item) => (
            <div className="education-item card" key={item.degree}>
              <div className="education-heading">
                <h3>{item.degree}</h3>
                <span className="education-period">{item.period}</span>
              </div>
              <p className="education-institution">{item.institution}</p>
              <p className="education-details">{item.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
