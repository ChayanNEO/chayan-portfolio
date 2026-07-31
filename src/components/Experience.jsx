import { experience } from '../data'
import './Experience.css'

const ACCENTS = ['var(--accent)', 'var(--accent-2)', 'var(--accent-3)']
const ROLE_ICONS = [GamepadIcon, FlagIcon, MegaphoneIcon]

function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Experience</span>
          <h2 className="section-title">Where I've contributed</h2>
        </div>

        <div className="timeline">
          <span className="timeline-line" aria-hidden="true" />
          {experience.map((item, i) => {
            const Icon = ROLE_ICONS[i % ROLE_ICONS.length]
            const isCurrent = /present/i.test(item.period)

            return (
              <div
                className="timeline-item"
                style={{ '--item-accent': ACCENTS[i % ACCENTS.length] }}
                key={item.role + item.org}
              >
                <span className="timeline-marker" aria-hidden="true">
                  <Icon />
                </span>
                <div className="timeline-content card">
                  <div className="timeline-heading">
                    <h3>{item.role}</h3>
                    <span className="timeline-period">
                      {item.period}
                      {isCurrent && <span className="timeline-live" title="Current role" />}
                    </span>
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
            )
          })}
        </div>
      </div>
    </section>
  )
}

function GamepadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        d="M7 8h10a5 5 0 0 1 5 5v2.5a2.5 2.5 0 0 1-4.6 1.4L16 15H8l-1.4 1.9A2.5 2.5 0 0 1 2 15.5V13a5 5 0 0 1 5-5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 10.5v3M6.5 12h3" strokeLinecap="round" />
      <circle cx="15.5" cy="11" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="13" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FlagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 21V4" strokeLinecap="round" />
      <path d="M5 4h13l-3 4.5L18 13H5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MegaphoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        d="M3 11v2a2 2 0 0 0 2 2h1l1 5h2l-1-5h1l10 4V6l-10 4H5a2 2 0 0 0-2 2Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M19 9.5a3.5 3.5 0 0 1 0 5" strokeLinecap="round" />
    </svg>
  )
}

export default Experience
