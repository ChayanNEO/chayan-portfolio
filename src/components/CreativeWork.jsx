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
                <div className="creative-media">
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
                      <a href={item.mediaUrl} target="_blank" rel="noreferrer" className="creative-media-link">
                        Watch video &#8599;
                      </a>
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
