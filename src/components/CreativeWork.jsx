import { useState } from 'react'
import { creativeWork } from '../data'
import './CreativeWork.css'

function CreativeWork() {
  return (
    <section id="creative" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Creative Work</span>
          <h2 className="section-title">Musician &amp; Poster Designer</h2>
          <p className="section-subtitle">{creativeWork.intro}</p>
        </div>

        <div className="creative-subsection">
          <h3 className="creative-subheading">Poster Design</h3>
          <div className="creative-grid">
            {creativeWork.posters.map((poster) => (
              <div className="creative-card card" key={poster.title}>
                <div className="creative-media creative-media-poster">
                  {poster.imageUrl ? (
                    <img src={poster.imageUrl} alt={poster.title} />
                  ) : (
                    <PlaceholderIcon />
                  )}
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

        <div className="creative-subsection">
          <h3 className="creative-subheading">Music &amp; Performances</h3>
          <div className="creative-grid">
            {creativeWork.performances.map((item) => (
              <div className="creative-card card" key={item.title}>
                <div className="creative-media">
                  {item.mediaUrl ? (
                    item.mediaType === 'video' ? (
                      <VideoPreview item={item} />
                    ) : (
                      <img src={item.mediaUrl} alt={item.title} />
                    )
                  ) : (
                    <PlaceholderIcon type={item.mediaType} />
                  )}
                </div>
                <div className="creative-card-body">
                  <h4>{item.title}</h4>
                  {item.band && <span className="creative-band">{item.band}</span>}
                  <span className="creative-meta">{item.venue}</span>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
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

function VideoPreview({ item }) {
  const [hovering, setHovering] = useState(false)
  const youtubeId = getYouTubeId(item.mediaUrl)

  if (!youtubeId) {
    return (
      <a href={item.mediaUrl} target="_blank" rel="noreferrer" className="creative-media-link">
        Watch video &#8599;
      </a>
    )
  }

  return (
    <div
      className={`creative-video ${hovering ? 'is-playing' : ''}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => setHovering((v) => !v)}
      role="button"
      tabIndex={0}
      aria-label={`Play preview of ${item.title}`}
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
