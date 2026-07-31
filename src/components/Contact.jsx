import { contact } from '../data'
import './Contact.css'

const ACCENTS = ['var(--accent)', 'var(--accent-2)', 'var(--accent-3)']

const CHANNELS = [
  {
    label: 'Email',
    value: contact.email,
    href: `mailto:${contact.email}`,
    external: false,
    Icon: MailIcon,
  },
  {
    label: 'GitHub',
    value: 'View my repositories',
    href: contact.github,
    external: true,
    Icon: GitHubIcon,
  },
  {
    label: 'LinkedIn',
    value: 'Connect with me',
    href: contact.linkedin,
    external: true,
    Icon: LinkedInIcon,
  },
]

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
          {CHANNELS.map((channel, i) => (
            <a
              className="contact-card card"
              style={{ '--card-accent': ACCENTS[i % ACCENTS.length] }}
              href={channel.href}
              target={channel.external ? '_blank' : undefined}
              rel={channel.external ? 'noreferrer' : undefined}
              key={channel.label}
            >
              <span className="contact-card-icon">
                <channel.Icon />
              </span>
              <ArrowOutIcon className="contact-card-arrow" />
              <span className="contact-label">{channel.label}</span>
              <span className="contact-value">{channel.value}</span>
            </a>
          ))}
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

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        d="M12 2a10 10 0 0 0-3.16 19.5c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <path d="M7.5 10v6.5M7.5 7.5v.01M12 16.5V13a2 2 0 0 1 4 0v3.5M12 13v3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowOutIcon({ className }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default Contact
