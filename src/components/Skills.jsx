import { skills } from '../data'
import './Skills.css'

const ACCENTS = ['var(--accent)', 'var(--accent-2)', 'var(--accent-3)']
const CATEGORY_ICONS = [CodeIcon, LayersIcon, DatabaseIcon, ToolIcon, SparkleIcon]

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
          {skills.map((group, i) => {
            const Icon = CATEGORY_ICONS[i % CATEGORY_ICONS.length]
            return (
              <div
                className="skills-card card"
                style={{ '--card-accent': ACCENTS[i % ACCENTS.length] }}
                key={group.category}
              >
                <span className="skills-card-index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="skills-card-icon">
                  <Icon />
                </span>
                <h3>{group.category}</h3>
                <div className="skills-tags">
                  {group.items.map((item, j) => (
                    <span className="tag" style={{ '--tag-delay': `${j * 0.05}s` }} key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CodeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 8 4 12l5 4M15 8l5 4-5 4M13 5l-2 14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LayersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3 2 8l10 5 10-5-10-5Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 13l10 5 10-5M2 18l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DatabaseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <ellipse cx="12" cy="6" rx="8" ry="3.2" />
      <path d="M4 6v6c0 1.77 3.58 3.2 8 3.2s8-1.43 8-3.2V6" strokeLinecap="round" />
      <path d="M4 12v6c0 1.77 3.58 3.2 8 3.2s8-1.43 8-3.2v-6" strokeLinecap="round" />
    </svg>
  )
}

function ToolIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        d="M14.7 6.3a4 4 0 0 0-5.4 4.6L3 17.2V21h3.8l6.3-6.3a4 4 0 0 0 4.6-5.4l-2.8 2.8-2.1-2.1 2.8-2.8Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SparkleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default Skills
