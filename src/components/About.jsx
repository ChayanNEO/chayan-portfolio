import { profile } from '../data'
import './About.css'

const highlights = [
  {
    title: 'Full-Stack Development',
    text: 'Building end-to-end web applications with Java, JSP/Servlets, and MySQL on the backend.',
  },
  {
    title: 'Community Building',
    text: 'Organizing tech and gaming communities, leading events and managing engaged member bases.',
  },
  {
    title: 'Continuous Learner',
    text: 'Actively exploring modern web technologies and best practices as a BCA student.',
  },
]

function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">About Me</span>
          <h2 className="section-title">A quick introduction</h2>
        </div>

        <div className="about-grid">
          <div className="about-avatar" aria-hidden="true">
            <span>{profile.avatarInitials}</span>
          </div>

          <div className="about-content">
            <p className="about-bio">{profile.bio}</p>

            <div className="about-highlights">
              {highlights.map((item) => (
                <div className="about-highlight card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
