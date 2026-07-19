import { useEffect, useRef, useState } from 'react'
import { gallery } from '../data'
import './Gallery.css'

const AUTO_ADVANCE_MS = 2600
const AUTO_ADVANCE_RESUME_DELAY_MS = 3200
const VISIBLE_DEPTH = 3
const SWIPE_THRESHOLD_PX = 50
const WHEEL_COOLDOWN_MS = 450
const MAX_DOTS = 7

function getCircularOffset(index, center, total) {
  let diff = (index - center) % total
  if (diff > total / 2) diff -= total
  if (diff < -total / 2) diff += total
  return diff
}

function nearestIndex(candidates, center, total) {
  return candidates.reduce((best, idx) =>
    Math.abs(getCircularOffset(idx, center, total)) < Math.abs(getCircularOffset(best, center, total)) ? idx : best,
  )
}

function Gallery() {
  const photos = gallery.filter((item) => item.imageUrl)
  const total = gallery.length

  const [centerIndex, setCenterIndex] = useState(0)
  const [activeIndex, setActiveIndex] = useState(null)

  const containerRef = useRef(null)
  const pointerRef = useRef({ startX: 0, active: false, moved: false })
  const interactionPausedRef = useRef(false)
  const outOfViewRef = useRef(true)
  const resumeTimerRef = useRef(null)
  const lastWheelRef = useRef(0)

  const step = (delta) => {
    setCenterIndex((i) => ((i + delta) % total + total) % total)
  }

  const goTo = (index) => setCenterIndex(index)

  const pauseAutoAdvance = () => {
    interactionPausedRef.current = true
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current)
      resumeTimerRef.current = null
    }
  }

  const scheduleAutoAdvanceResume = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(() => {
      interactionPausedRef.current = false
    }, AUTO_ADVANCE_RESUME_DELAY_MS)
  }

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
    const container = containerRef.current
    if (!container || total <= 1) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        outOfViewRef.current = !entry.isIntersecting
      },
      { threshold: 0.2 },
    )
    observer.observe(container)

    const id = setInterval(() => {
      if (interactionPausedRef.current || outOfViewRef.current || document.hidden) return
      step(1)
    }, AUTO_ADVANCE_MS)

    return () => {
      clearInterval(id)
      observer.disconnect()
    }
  }, [total])

  useEffect(() => {
    if (activeIndex !== null) {
      pauseAutoAdvance()
    } else {
      scheduleAutoAdvanceResume()
    }
  }, [activeIndex])

  useEffect(() => () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      e.preventDefault()

      const now = performance.now()
      if (now - lastWheelRef.current < WHEEL_COOLDOWN_MS) return
      lastWheelRef.current = now

      pauseAutoAdvance()
      step(e.deltaY > 0 ? 1 : -1)
      scheduleAutoAdvanceResume()
    }

    container.addEventListener('wheel', onWheel, { passive: false })
    return () => container.removeEventListener('wheel', onWheel)
  }, [])

  const handlePointerDown = (e) => {
    containerRef.current?.setPointerCapture(e.pointerId)
    pointerRef.current = { startX: e.clientX, active: true, moved: false }
    pauseAutoAdvance()
  }

  const handlePointerMove = (e) => {
    if (!pointerRef.current.active) return
    if (Math.abs(e.clientX - pointerRef.current.startX) > 4) pointerRef.current.moved = true
  }

  const endDrag = (e) => {
    if (!pointerRef.current.active) return
    const dx = e.clientX - pointerRef.current.startX
    pointerRef.current.active = false
    if (containerRef.current?.hasPointerCapture(e.pointerId)) {
      containerRef.current.releasePointerCapture(e.pointerId)
    }
    if (Math.abs(dx) > SWIPE_THRESHOLD_PX) step(dx < 0 ? 1 : -1)
    scheduleAutoAdvanceResume()
  }

  const handleContainerKeyDown = (e) => {
    if (activeIndex !== null) return
    if (e.key === 'ArrowRight') {
      pauseAutoAdvance()
      step(1)
      scheduleAutoAdvanceResume()
    }
    if (e.key === 'ArrowLeft') {
      pauseAutoAdvance()
      step(-1)
      scheduleAutoAdvanceResume()
    }
  }

  const handleItemClick = (item, idx) => {
    if (pointerRef.current.moved) return
    if (idx === centerIndex) {
      if (item.imageUrl) setActiveIndex(photos.indexOf(item))
      return
    }
    pauseAutoAdvance()
    goTo(idx)
    scheduleAutoAdvanceResume()
  }

  const active = activeIndex !== null ? photos[activeIndex] : null

  const photoIndices = gallery.reduce((acc, item, idx) => {
    if (item.imageUrl) acc.push(idx)
    return acc
  }, [])
  const dotStep = Math.max(1, Math.ceil(photoIndices.length / MAX_DOTS))
  const dotIndices = photoIndices.filter((_, i) => i % dotStep === 0)
  const activeDotIndex = dotIndices.length > 0 ? nearestIndex(dotIndices, centerIndex, total) : null

  return (
    <section id="gallery" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Gallery</span>
          <h2 className="section-title">Moments from my events</h2>
          <p className="section-subtitle">
            A few snapshots from the events, performances, and communities I've been part of.
          </p>
          <p className="gallery-hint">
            Rotates automatically — click a photo to bring it forward, hover to read its caption &#8594;
          </p>
        </div>
      </div>

      <div className="gallery-coverflow-wrapper">
        <div className="gallery-glow" aria-hidden="true" />
        <div
          className="gallery-coverflow"
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          onMouseEnter={pauseAutoAdvance}
          onMouseLeave={() => !pointerRef.current.active && scheduleAutoAdvanceResume()}
          onKeyDown={handleContainerKeyDown}
        >
          {gallery.map((item, idx) => {
            const offset = getCircularOffset(idx, centerIndex, total)
            const dist = Math.abs(offset)
            const visible = dist <= VISIBLE_DEPTH
            const isCenter = offset === 0

            return (
              <button
                type="button"
                className={`gallery-item ${!item.imageUrl ? 'gallery-item-empty' : ''} ${isCenter ? 'is-center' : ''}`}
                key={item.caption + idx}
                tabIndex={visible ? 0 : -1}
                aria-hidden={!visible}
                style={{
                  transform: `translate(-50%, -50%) translateX(calc(${offset} * var(--coverflow-step))) translateZ(${dist * -110}px) rotateY(${offset === 0 ? 0 : offset > 0 ? -36 : 36}deg) scale(${Math.max(1 - dist * 0.16, 0.4)})`,
                  opacity: visible ? [1, 0.85, 0.6, 0.35][dist] : 0,
                  zIndex: total - dist,
                  filter: dist >= 1 ? `blur(${dist * 0.6}px)` : 'none',
                  pointerEvents: visible ? 'auto' : 'none',
                }}
                onClick={() => handleItemClick(item, idx)}
              >
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.caption} loading="lazy" draggable={false} />
                ) : (
                  <div className="gallery-placeholder">
                    <PlaceholderIcon />
                    <span>Add image</span>
                  </div>
                )}
                <span className="gallery-caption">
                  <span className="gallery-caption-dot" />
                  {item.caption}
                </span>
              </button>
            )
          })}
        </div>

        {dotIndices.length > 1 && (
          <div className="gallery-dots">
            {dotIndices.map((idx) => (
              <button
                type="button"
                key={gallery[idx].caption + idx}
                className={`gallery-dot ${idx === activeDotIndex ? 'is-active' : ''}`}
                aria-label={`Show ${gallery[idx].caption}`}
                onClick={() => {
                  pauseAutoAdvance()
                  goTo(idx)
                  scheduleAutoAdvanceResume()
                }}
              />
            ))}
          </div>
        )}
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
