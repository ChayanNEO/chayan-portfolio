import { education } from '../data'
import './Education.css'

const ACCENTS = ['var(--accent)', 'var(--accent-2)', 'var(--accent-3)']
const EDU_ICONS = [CapIcon, BookIcon]

function isOngoing(period) {
  if (/present/i.test(period)) return true
  const years = period.match(/\d{4}/g)
  const endYear = years && Number(years[years.length - 1])
  return Boolean(endYear && endYear >= new Date().getFullYear())
}

function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Education</span>
          <h2 className="section-title">Academic background</h2>
        </div>

        <div className="edu-track">
          {education.map((item, i) => {
            const Icon = EDU_ICONS[i % EDU_ICONS.length]
            const ongoing = isOngoing(item.period)

            return (
              <div
                className="edu-row"
                style={{ '--item-accent': ACCENTS[i % ACCENTS.length] }}
                key={item.degree}
              >
                <div className="edu-card-wrap">
                  <div className="edu-card card">
                    <div className="education-heading">
                      <h3>{item.degree}</h3>
                      <span className="education-period">
                        {item.period}
                        {ongoing && <span className="edu-live" title="Ongoing" />}
                      </span>
                    </div>
                    <p className="education-institution">{item.institution}</p>
                    <p className="education-details">{item.details}</p>
                  </div>
                </div>
                <span className="edu-node">
                  <Icon />
                </span>
                <div className="edu-card-wrap edu-card-wrap--spacer" aria-hidden="true" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2 9l10-5 10 5-10 5-10-5Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 11v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-5" strokeLinecap="round" />
      <path d="M22 9v6" strokeLinecap="round" />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5v-17Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 19a2.5 2.5 0 0 1 2.5-2.5H20" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default Education
