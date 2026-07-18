import { profile, contact } from '../data'
import useTypewriter from '../hooks/useTypewriter'
import './Hero.css'

const codeLines = [
  { indent: 0, tokens: [{ t: 'punc', v: '{' }] },
  {
    indent: 1,
    tokens: [
      { t: 'key', v: '"name"' },
      { t: 'punc', v: ': ' },
      { t: 'str', v: `"${profile.name}"` },
      { t: 'punc', v: ',' },
    ],
  },
  {
    indent: 1,
    tokens: [
      { t: 'key', v: '"role"' },
      { t: 'punc', v: ': ' },
      { t: 'str', v: '"Full-Stack Developer"' },
      { t: 'punc', v: ',' },
    ],
  },
  {
    indent: 1,
    tokens: [
      { t: 'key', v: '"stack"' },
      { t: 'punc', v: ': [' },
      { t: 'str', v: '"Java"' },
      { t: 'punc', v: ', ' },
      { t: 'str', v: '"MySQL"' },
      { t: 'punc', v: ', ' },
      { t: 'str', v: '"React"' },
      { t: 'punc', v: '],' },
    ],
  },
  {
    indent: 1,
    tokens: [
      { t: 'key', v: '"buildingCommunities"' },
      { t: 'punc', v: ': ' },
      { t: 'bool', v: 'true' },
    ],
  },
  { indent: 0, tokens: [{ t: 'punc', v: '}' }] },
]

function Hero() {
  const role = useTypewriter(profile.roles)

  return (
    <section id="top" className="hero">
      <div className="container hero-inner">
        <div className="hero-text">
          <span className="hero-badge">
            <span className="hero-badge-dot" />
            Open to opportunities
          </span>

          <p className="hero-greeting">Hi, I'm</p>
          <h1 className="hero-name gradient-text">{profile.name}</h1>
          <h2 className="hero-role">
            <span>{role}</span>
            <span className="hero-cursor" aria-hidden="true" />
          </h2>
          <p className="hero-bio">{profile.bio}</p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn btn-outline">
              Contact Me
            </a>
          </div>

          <div className="hero-socials">
            <a href={`mailto:${contact.email}`} aria-label="Email" title="Email">
              <EmailIcon />
            </a>
            <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
              <GithubIcon />
            </a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
              <LinkedinIcon />
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card card">
            <div className="hero-card-bar">
              <span className="hero-dot hero-dot-red" />
              <span className="hero-dot hero-dot-yellow" />
              <span className="hero-dot hero-dot-green" />
              <span className="hero-card-filename">profile.json</span>
            </div>
            <pre className="hero-code">
              <code>
                {codeLines.map((line, idx) => (
                  <div
                    className="hero-code-line"
                    key={idx}
                    style={{ paddingLeft: `${line.indent * 18}px` }}
                  >
                    {line.tokens.map((tok, i) => (
                      <span className={`tok-${tok.t}`} key={i}>
                        {tok.v}
                      </span>
                    ))}
                  </div>
                ))}
              </code>
            </pre>
          </div>

          {profile.focusAreas.map((label, i) => (
            <span className={`hero-float hero-float-${i + 1}`} key={label}>
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.17c0 4.47 2.87 8.26 6.84 9.6.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.15-4.56-5.11 0-1.13.39-2.05 1.03-2.77-.1-.26-.45-1.32.1-2.75 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.9-1.33 2.75-1.05 2.75-1.05.55 1.43.2 2.49.1 2.75.64.72 1.03 1.64 1.03 2.77 0 3.97-2.34 4.85-4.57 5.1.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.17C22 6.58 17.52 2 12 2Z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.94 5a2 2 0 1 1-4-.02 2 2 0 0 1 4 .02ZM3.3 8.75h3.6V21H3.3V8.75Zm6.2 0h3.45v1.68h.05c.48-.9 1.66-1.86 3.42-1.86 3.66 0 4.33 2.4 4.33 5.53V21h-3.6v-5.98c0-1.42-.03-3.26-2-3.26-2 0-2.31 1.55-2.31 3.16V21H9.5V8.75Z" />
    </svg>
  )
}

export default Hero
