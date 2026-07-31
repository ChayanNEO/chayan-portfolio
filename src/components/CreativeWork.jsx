import { useRef, useState } from 'react'
import { creativeWork } from '../data'
import './CreativeWork.css'

const ROW_ACCENTS = ['var(--accent)', 'var(--accent-2)', 'var(--accent-3)']

function CreativeWork() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoPlayFeatured, setAutoPlayFeatured] = useState(false)
  const featuredRef = useRef(null)

  const featuredPerformance = creativeWork.performances[activeIndex]
  const restPerformances = creativeWork.performances
    .map((item, i) => ({ item, i }))
    .filter(({ i }) => i !== activeIndex)

  const playInFeatured = (index) => {
    setActiveIndex(index)
    setAutoPlayFeatured(true)
    featuredRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section id="creative" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Creative Work</span>
          <h2 className="section-title">Musician &amp; Poster Designer</h2>
          <p className="section-subtitle">{creativeWork.intro}</p>
          <div className="creative-stats">
            <span className="creative-stat" style={{ '--stat-accent': ROW_ACCENTS[0] }}>
              <strong>{creativeWork.posters.length}</strong> Poster Designs
            </span>
            <span className="creative-stat" style={{ '--stat-accent': ROW_ACCENTS[1] }}>
              <strong>{creativeWork.performances.length}</strong> Live Performances
            </span>
            <span className="creative-stat" style={{ '--stat-accent': ROW_ACCENTS[2] }}>
              <strong>{new Set(creativeWork.performances.map((p) => p.band).filter(Boolean)).size}</strong> Bands
            </span>
          </div>
        </div>

        <div className="creative-subsection">
          <h3 className="creative-subheading">
            <PinIcon />
            Poster Design
          </h3>
          <div className="creative-board">
            <div className="creative-grid creative-grid-posters">
              {creativeWork.posters.map((poster) => (
                <div className="creative-card creative-card-poster card" key={poster.title}>
                  <span className="creative-pin" aria-hidden="true" />
                  <div className="creative-media creative-media-poster">
                    <PosterCarousel images={poster.images} title={poster.title} />
                  </div>
                  <div className="creative-card-body">
                    <h4>{poster.title}</h4>
                    <span className="creative-meta">{poster.client}</span>
                    <p>{poster.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="creative-subsection">
          <h3 className="creative-subheading">
            <NoteIcon />
            Music &amp; Performances
          </h3>
          <div className="creative-performances">
            {featuredPerformance && (
              <div
                className="creative-featured creative-card card"
                style={{ '--row-accent': ROW_ACCENTS[activeIndex % ROW_ACCENTS.length] }}
                ref={featuredRef}
              >
                <div className="creative-featured-media">
                  {featuredPerformance.mediaUrl ? (
                    featuredPerformance.mediaType === 'video' ? (
                      <VideoPreview
                        item={featuredPerformance}
                        key={featuredPerformance.title}
                        autoPlay={autoPlayFeatured}
                      />
                    ) : (
                      <img src={featuredPerformance.mediaUrl} alt={featuredPerformance.title} />
                    )
                  ) : (
                    <PlaceholderIcon type={featuredPerformance.mediaType} />
                  )}
                  <span className="creative-featured-tag">
                    <StarIcon />
                    Featured Performance
                  </span>
                </div>
                <div className="creative-featured-body">
                  <span className="creative-track-tag" aria-hidden="true" />
                  <div className="creative-title-row">
                    <h4>{featuredPerformance.title}</h4>
                    <EqualizerBars />
                  </div>
                  {featuredPerformance.band && <span className="creative-band">{featuredPerformance.band}</span>}
                  <span className="creative-meta">
                    <VenueIcon />
                    {featuredPerformance.venue}
                  </span>
                  <p>{featuredPerformance.description}</p>
                </div>
              </div>
            )}

            {restPerformances.length > 0 && (
              <ul className="creative-track-list">
                {restPerformances.map(({ item, i }) => (
                  <li
                    className="creative-track-row"
                    style={{ '--row-accent': ROW_ACCENTS[i % ROW_ACCENTS.length] }}
                    key={item.title}
                    role="button"
                    tabIndex={0}
                    aria-label={`Play ${item.title} in the featured player`}
                    onClick={() => playInFeatured(i)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        playInFeatured(i)
                      }
                    }}
                  >
                    <span className="creative-track-num" aria-hidden="true" />
                    <span className="creative-track-media">
                      {item.mediaUrl ? (
                        item.mediaType === 'video' ? (
                          <VideoPreview item={item} compact />
                        ) : (
                          <img src={item.mediaUrl} alt={item.title} />
                        )
                      ) : (
                        <PlaceholderIcon type={item.mediaType} />
                      )}
                    </span>
                    <span className="creative-track-info">
                      <span className="creative-track-title-row">
                        <h4>{item.title}</h4>
                        {item.band && <span className="creative-band">{item.band}</span>}
                      </span>
                      <span className="creative-meta">
                        <VenueIcon />
                        {item.venue}
                      </span>
                    </span>
                    <EqualizerBars />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function getYouTubeId(url) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/)
  return match ? match[1] : null
}

function VideoPreview({ item, compact = false, autoPlay = false }) {
  const [hovering, setHovering] = useState(autoPlay)
  const youtubeId = getYouTubeId(item.mediaUrl)

  if (!youtubeId) {
    return (
      <a href={item.mediaUrl} target="_blank" rel="noreferrer" className="creative-media-link">
        Watch video &#8599;
      </a>
    )
  }

  // Compact thumbnails live inside an already-clickable track row, so they
  // only get a hover peek — no nested button semantics, no click-to-toggle.
  const interactiveProps = compact
    ? {
        onMouseEnter: () => setHovering(true),
        onMouseLeave: () => setHovering(false),
      }
    : {
        onMouseEnter: () => setHovering(true),
        onMouseLeave: () => setHovering(false),
        onClick: () => setHovering((v) => !v),
        role: 'button',
        tabIndex: 0,
        'aria-label': `Play preview of ${item.title}`,
      }

  return (
    <div
      className={`creative-video ${hovering ? 'is-playing' : ''} ${compact ? 'creative-video-compact' : ''}`}
      {...interactiveProps}
    >
      <img
        src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
        alt={item.title}
        className="creative-video-poster"
      />
      {hovering && (
        <iframe
          className="creative-video-frame"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&controls=0&loop=1&playlist=${youtubeId}&modestbranding=1&rel=0&playsinline=1`}
          title={item.title}
          allow="autoplay; encrypted-media"
        />
      )}
      <span className="creative-video-play" aria-hidden="true">
        <PlayIcon />
      </span>
    </div>
  )
}

function PosterCarousel({ images, title }) {
  const [index, setIndex] = useState(0)

  if (!images || images.length === 0) {
    return <PlaceholderIcon />
  }

  const count = images.length
  const goTo = (target, e) => {
    e.stopPropagation()
    setIndex((target + count) % count)
  }

  return (
    <>
      <img src={images[index]} alt={`${title} — image ${index + 1} of ${count}`} />
      {count > 1 && (
        <>
          <button
            type="button"
            className="creative-carousel-nav creative-carousel-prev"
            onClick={(e) => goTo(index - 1, e)}
            aria-label={`Previous image in ${title}`}
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            type="button"
            className="creative-carousel-nav creative-carousel-next"
            onClick={(e) => goTo(index + 1, e)}
            aria-label={`Next image in ${title}`}
          >
            <ChevronIcon direction="right" />
          </button>
          <span className="creative-carousel-count">
            {index + 1}/{count}
          </span>
          <span className="creative-carousel-dots">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`creative-carousel-dot ${i === index ? 'is-active' : ''}`}
                onClick={(e) => goTo(i, e)}
                aria-label={`Go to image ${i + 1} of ${count} in ${title}`}
              />
            ))}
          </span>
        </>
      )}
    </>
  )
}

function ChevronIcon({ direction }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path
        d={direction === 'left' ? 'M14.5 6.5 9 12l5.5 5.5' : 'M9.5 6.5 15 12l-5.5 5.5'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="creative-subheading-icon">
      <path d="M12 2v6.5" strokeLinecap="round" />
      <path d="M7 9h10l-1.2 5.5a2 2 0 0 1-1.95 1.5H10.15a2 2 0 0 1-1.95-1.5L7 9Z" />
      <path d="M12 16v6" strokeLinecap="round" />
    </svg>
  )
}

function NoteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="creative-subheading-icon">
      <path d="M9 18V5l11-2v13" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="17" cy="16" r="3" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.5 14.9 9.2 22.2 9.9 16.7 14.7 18.4 21.9 12 18.1 5.6 21.9 7.3 14.7 1.8 9.9 9.1 9.2Z" />
    </svg>
  )
}

function VenueIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="creative-venue-icon"
    >
      <path d="M12 22s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  )
}

function EqualizerBars() {
  return (
    <span className="creative-eq" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </span>
  )
}

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5.14v13.72c0 .9.98 1.46 1.76.99l11.15-6.86a1.16 1.16 0 0 0 0-1.98L9.76 4.15A1.16 1.16 0 0 0 8 5.14Z" />
    </svg>
  )
}

function PlaceholderIcon({ type = 'image' }) {
  return (
    <div className="creative-placeholder">
      {type === 'video' ? (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="2.5" y="5" width="14" height="14" rx="2" />
          <path d="m16.5 10 5-3v10l-5-3" />
        </svg>
      ) : (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5-11 11" />
        </svg>
      )}
      <span>Add {type === 'video' ? 'video' : 'image'}</span>
    </div>
  )
}

export default CreativeWork
