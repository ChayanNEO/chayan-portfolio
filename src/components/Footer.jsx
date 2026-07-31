import { profile, contact } from '../data'
import './Footer.css'

const EXPLORE_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#gallery', label: 'Gallery' },
]

const SOCIALS = [
  { label: 'Email', href: `mailto:${contact.email}`, external: false, Icon: MailIcon },
  { label: 'GitHub', href: contact.github, external: true, Icon: GitHubIcon },
  { label: 'LinkedIn', href: contact.linkedin, external: true, Icon: LinkedInIcon },
]

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#top" className="footer-logo">
              <span className="footer-logo-mark">{profile.avatarInitials}</span>
              <span className="footer-logo-text">
                Chayan<span className="footer-logo-dot">.</span>
              </span>
            </a>
            <p className="footer-tagline">{profile.title}</p>
            <div className="footer-socials">
              {SOCIALS.map(({ label, href, external, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  aria-label={label}
                  className="footer-social-link"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <span className="footer-col-title">Explore</span>
            <nav className="footer-col-links">
              {EXPLORE_LINKS.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="footer-col footer-col-cta">
            <span className="footer-col-title">Let's talk</span>
            <p className="footer-cta-text">Got an idea or opportunity? I'd love to hear about it.</p>
            <a href={`mailto:${contact.email}`} className="footer-cta-link">
              {contact.email}
            </a>
          </div>
        </div>

        <div className="footer-inner">
          <p>
            &copy; {year} {profile.name}. Built with React.
          </p>
          <a href="#top" className="footer-top-link">
            Back to top
            <span className="footer-top-icon" aria-hidden="true">
              &uarr;
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <path d="M7.5 10v6.5M7.5 7.5v.01M12 16.5V13a2 2 0 0 1 4 0v3.5M12 13v3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default Footer
