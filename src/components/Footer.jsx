import { profile } from '../data'
import './Footer.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          &copy; {year} {profile.name}. Built with React &amp; Vite.
        </p>
        <a href="#top">Back to top &uarr;</a>
      </div>
    </footer>
  )
}

export default Footer
