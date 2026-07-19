import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { profile } from '../data'
import './Navbar.css'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#creative', label: 'Creative' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeId, setActiveId] = useState('')

  const navLinksRef = useRef(null)
  const linkRefs = useRef([])
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 })

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter(Boolean)

    if (sections.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    const recalc = () => {
      const index = links.findIndex((link) => link.href.slice(1) === activeId)
      const el = linkRefs.current[index]
      const container = navLinksRef.current

      if (!el || !container || open) {
        setIndicator((prev) => ({ ...prev, opacity: 0 }))
        return
      }

      setIndicator({
        left: el.offsetLeft,
        width: el.offsetWidth,
        opacity: 1,
      })
    }

    recalc()
    window.addEventListener('resize', recalc)
    return () => window.removeEventListener('resize', recalc)
  }, [activeId, scrolled, open])

  return (
    <>
      <div className="scroll-progress">
        <span style={{ width: `${progress}%` }} />
      </div>

      <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-shell">
            <a href="#top" className="navbar-brand">
              <span className="navbar-logo">{profile.avatarInitials}</span>
              <span className="navbar-brand-text">
                Chayan<span className="navbar-dot">.</span>
              </span>
            </a>

            <nav className="navbar-links" ref={navLinksRef}>
              <span
                className="navbar-indicator"
                style={{
                  transform: `translateX(${indicator.left}px)`,
                  width: `${indicator.width}px`,
                  opacity: indicator.opacity,
                }}
                aria-hidden="true"
              />
              {links.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  ref={(el) => (linkRefs.current[i] = el)}
                  className={activeId === link.href.slice(1) ? 'active' : ''}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a href="#contact" className="btn btn-primary navbar-cta">
              Let's Talk
            </a>

            <button
              className={`navbar-toggle ${open ? 'navbar-toggle-open' : ''}`}
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`navbar-overlay ${open ? 'navbar-overlay-open' : ''}`}>
        <nav>
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              style={{ transitionDelay: `${i * 45}ms` }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn btn-primary" onClick={() => setOpen(false)}>
          Let's Talk
        </a>
      </div>
    </>
  )
}

export default Navbar
