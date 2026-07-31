import { useState } from 'react'
import { profile, projects, experience, creativeWork } from '../data'
import './About.css'

const ACCENTS = ['var(--accent)', 'var(--accent-2)', 'var(--accent-3)']

const stats = [
  { value: `${projects.length}+`, label: 'Projects Done' },

  { value: `${creativeWork.performances.length}+`, label: 'Live Performances' },
]

const orbitItems = [
  { label: 'Full-Stack Dev', icon: CodeIcon },
  { label: 'Databases', icon: DatabaseIcon },
  { label: 'React', icon: ReactIcon },
  { label: 'Drummer', icon: DrumIcon },
  { label: 'Poster Design', icon: BrushIcon },
]

const highlights = [
  {
    title: 'Full-Stack Development',
    text: 'Building end-to-end web applications with Java, JSP/Servlets, and MySQL on the backend.',
    icon: CodeIcon,
  },
  {
    title: 'Community Building',
    text: 'Organizing tech and gaming communities, leading events and managing engaged member bases.',
    icon: UsersIcon,
  },
  {
    title: 'Continuous Learner',
    text: 'Actively exploring modern web technologies and best practices as a BCA student.',
    icon: SparkIcon,
  },
]

function About() {
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = profile.avatarUrl && !imageFailed

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">About Me</span>
          <h2 className="section-title">A quick introduction</h2>
        </div>

        <div className="about-grid">
          <div className="about-avatar-col">
            <div className="about-avatar-wrap">
              <span className="about-avatar-ring" aria-hidden="true" />
              <div className="about-avatar">
                {showImage ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="about-avatar-img"
                    onError={() => setImageFailed(true)}
                  />
                ) : (
                  <span aria-hidden="true">{profile.avatarInitials}</span>
                )}
              </div>
              <div className="about-orbit" aria-hidden="true">
                {orbitItems.map((item, i) => (
                  <span
                    className="about-orbit-item"
                    style={{
                      '--angle': `${(360 / orbitItems.length) * i}deg`,
                      '--item-accent': ACCENTS[i % ACCENTS.length],
                    }}
                    key={item.label}
                  >
                    <span className="about-orbit-icon">
                      <item.icon />
                    </span>
                  </span>
                ))}
              </div>
            </div>
            {profile.location && (
              <span className="about-location">
                <PinIcon />
                {profile.location}
              </span>
            )}
          </div>

          <div className="about-content">
            <p className="about-bio">
              <span className="about-quote" aria-hidden="true">
                &#8220;
              </span>
              {profile.bio}
            </p>

            <div className="about-stats">
              {stats.map((stat, i) => (
                <div className="about-stat" style={{ '--stat-accent': ACCENTS[i % ACCENTS.length] }} key={stat.label}>
                  <span className="about-stat-value">{stat.value}</span>
                  <span className="about-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="about-highlights">
              {highlights.map(({ title, text, icon: Icon }) => (
                <div className="about-highlight card" key={title}>
                  <span className="about-highlight-icon">
                    <Icon />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CodeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m9 6-6 6 6 6M15 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        d="M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19M20 19v-1.5a3.5 3.5 0 0 0-2.5-3.36M14.5 4.6a3.5 3.5 0 0 1 0 6.8M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  )
}

function DatabaseIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <ellipse cx="12" cy="6" rx="7.5" ry="2.8" />
      <path d="M4.5 6v5.5c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V6" strokeLinecap="round" />
      <path d="M4.5 11.5V17c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-5.5" strokeLinecap="round" />
    </svg>
  )
}

function ReactIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <ellipse cx="12" cy="12" rx="9.5" ry="3.8" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" />
    </svg>
  )
}

function DrumIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 19 17 7" strokeLinecap="round" />
      <path d="M19 19 7 7" strokeLinecap="round" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="6.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function BrushIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path
        d="M14.7 3.8c1.9 0 3.5 1.6 3.5 3.5 0 1-.4 1.9-1.2 2.6L9.7 17.2 6.8 14.3l7.3-7.3c.7-.8 1.6-1.2 2.6-1.2Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6.8 14.3 4.5 20.5l6.2-2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 22s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  )
}

export default About
