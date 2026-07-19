import { useEffect, useRef, useState } from 'react'
import { gallery } from '../data'
import './Gallery.css'

function Gallery() {
  const photos = gallery.filter((item) => item.imageUrl)
  const [activeIndex, setActiveIndex] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [scrubbing, setScrubbing] = useState(false)
  const [progress, setProgress] = useState(0)

  const stripRef = useRef(null)
  const trackRef = useRef(null)
  const pointerRef = useRef({ startX: 0, startScroll: 0, moved: false })

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

  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return undefined

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return

      const atStart = strip.scrollLeft <= 0
      const atEnd = strip.scrollLeft >= strip.scrollWidth - strip.clientWidth - 1
      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return

      e.preventDefault()
      strip.scrollLeft += e.deltaY
    }

    strip.addEventListener('wheel', onWheel, { passive: false })
    return () => strip.removeEventListener('wheel', onWheel)
  }, [])

  const updateProgress = () => {
    const strip = stripRef.current
    if (!strip) return
    const max = strip.scrollWidth - strip.clientWidth
    setProgress(max > 0 ? strip.scrollLeft / max : 0)
  }

  const handleStripPointerDown = (e) => {
    const strip = stripRef.current
    strip.setPointerCapture(e.pointerId)
    pointerRef.current = { startX: e.clientX, startScroll: strip.scrollLeft, moved: false }
    setDragging(true)
  }

  const handleStripPointerMove = (e) => {
    if (!dragging) return
    const strip = stripRef.current
    const dx = e.clientX - pointerRef.current.startX
    if (Math.abs(dx) > 4) pointerRef.current.moved = true
    strip.scrollLeft = pointerRef.current.startScroll - dx
    updateProgress()
  }

  const endStripDrag = (e) => {
    setDragging(false)
    if (stripRef.current?.hasPointerCapture(e.pointerId)) {
      stripRef.current.releasePointerCapture(e.pointerId)
    }
  }

  const handleItemClick = (item) => {
    if (pointerRef.current.moved) return
    if (item.imageUrl) setActiveIndex(photos.indexOf(item))
  }

  const scrubToClientX = (clientX) => {
    const strip = stripRef.current
    const track = trackRef.current
    if (!strip || !track) return
    const rect = track.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    strip.scrollLeft = ratio * (strip.scrollWidth - strip.clientWidth)
    setProgress(ratio)
  }

  const handleTrackPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setScrubbing(true)
    scrubToClientX(e.clientX)
  }

  const handleTrackPointerMove = (e) => {
    if (!scrubbing) return
    scrubToClientX(e.clientX)
  }

  const endTrackScrub = (e) => {
    setScrubbing(false)
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

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
          <p className="gallery-hint">Drag, scroll, or wheel to explore &#8594;</p>
        </div>
      </div>

      <div className="gallery-strip-wrapper">
        <div
          className={`gallery-strip ${dragging ? 'is-dragging' : ''}`}
          ref={stripRef}
          onScroll={updateProgress}
          onPointerDown={handleStripPointerDown}
          onPointerMove={handleStripPointerMove}
          onPointerUp={endStripDrag}
          onPointerCancel={endStripDrag}
          onPointerLeave={(e) => dragging && endStripDrag(e)}
        >
          {gallery.map((item) => (
            <button
              type="button"
              className={`gallery-item ${!item.imageUrl ? 'gallery-item-empty' : ''}`}
              key={item.caption}
              onClick={() => handleItemClick(item)}
            >
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.caption} loading="lazy" draggable={false} />
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

      <div className="container">
        <div
          className={`gallery-track ${scrubbing ? 'is-scrubbing' : ''}`}
          ref={trackRef}
          onPointerDown={handleTrackPointerDown}
          onPointerMove={handleTrackPointerMove}
          onPointerUp={endTrackScrub}
          onPointerCancel={endTrackScrub}
        >
          <div className="gallery-track-fill" style={{ width: `${progress * 100}%` }} />
          <div className="gallery-track-thumb" style={{ left: `${progress * 100}%` }} />
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
