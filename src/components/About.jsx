import { useState } from 'react'
import { profile } from '../data'
import './About.css'

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
              <span className="about-avatar-note" aria-hidden="true">
                <NoteIcon />
              </span>
            </div>
          </div>

          <div className="about-content">
            <p className="about-bio">
              <span className="about-quote" aria-hidden="true">
                &#8220;
              </span>
              {profile.bio}
            </p>

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

function NoteIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 18V5l11-2v13" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="17" cy="16" r="3" />
    </svg>
  )
}

export default About
