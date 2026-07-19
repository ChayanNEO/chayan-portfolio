import { useEffect, useState } from 'react'
import { gallery } from '../data'
import './Gallery.css'

function Gallery() {
  const photos = gallery.filter((item) => item.imageUrl)
  const [activeIndex, setActiveIndex] = useState(null)

  useEffect(() => {
    if (activeIndex === null || photos.length === 0) return undefined

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setActiveIndex(null)
      if (e.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % photos.length)
      if (e.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + photos.length) % photos.length)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex, photos.length])

  const active = activeIndex !== null ? photos[activeIndex] : null

  return (
    <section id="gallery" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Gallery</span>
          <h2 className="section-title">Moments from my events</h2>
          <p className="section-subtitle">
            A few snapshots from the events, performances, and communities I've been part of.
          </p>
          <p className="gallery-hint">Drag or scroll to explore &#8594;</p>
        </div>
      </div>

      <div className="gallery-strip-wrapper">
        <div className="gallery-strip">
          {gallery.map((item) => (
            <button
              type="button"
              className="gallery-item"
              key={item.caption}
              onClick={() => item.imageUrl && setActiveIndex(photos.indexOf(item))}
              disabled={!item.imageUrl}
            >
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.caption} loading="lazy" />
              ) : (
                <div className="gallery-placeholder">
                  <PlaceholderIcon />
                  <span>Add image</span>
                </div>
              )}
              <span className="gallery-caption">{item.caption}</span>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div className="gallery-lightbox" onClick={() => setActiveIndex(null)}>
          <button
            type="button"
            className="gallery-lightbox-close"
            aria-label="Close"
            onClick={() => setActiveIndex(null)}
          >
            &#10005;
          </button>

          {photos.length > 1 && (
            <button
              type="button"
              className="gallery-lightbox-nav gallery-lightbox-prev"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation()
                setActiveIndex((i) => (i - 1 + photos.length) % photos.length)
              }}
            >
              &#8249;
            </button>
          )}

          <img
            src={active.imageUrl}
            alt={active.caption}
            className="gallery-lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />

          {photos.length > 1 && (
            <button
              type="button"
              className="gallery-lightbox-nav gallery-lightbox-next"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation()
                setActiveIndex((i) => (i + 1) % photos.length)
              }}
            >
              &#8250;
            </button>
          )}

          <span className="gallery-lightbox-caption">{active.caption}</span>
        </div>
      )}
    </section>
  )
}

function PlaceholderIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5-11 11" />
    </svg>
  )
}

export default Gallery
