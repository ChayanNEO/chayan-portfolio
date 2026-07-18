import { contact } from '../data'
import './Contact.css'

function Contact() {
  return (
    <section id="contact" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Contact</span>
          <h2 className="section-title">Let's build something together</h2>
          <p className="section-subtitle">
            Have an opportunity, project idea, or just want to say hi? My inbox is open.
          </p>
        </div>

        <div className="contact-grid">
          <a className="contact-card card" href={`mailto:${contact.email}`}>
            <span className="contact-label">Email</span>
            <span className="contact-value">{contact.email}</span>
          </a>
          <a className="contact-card card" href={contact.github} target="_blank" rel="noreferrer">
            <span className="contact-label">GitHub</span>
            <span className="contact-value">View my repositories</span>
          </a>
          <a className="contact-card card" href={contact.linkedin} target="_blank" rel="noreferrer">
            <span className="contact-label">LinkedIn</span>
            <span className="contact-value">Connect with me</span>
          </a>
        </div>

        <div className="contact-cta">
          <a href={`mailto:${contact.email}`} className="btn btn-primary">
            Say Hello
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
