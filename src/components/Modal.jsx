import { useState, useEffect, useContext } from 'react';
import { details, videos, img } from '../api';
import { AppContext } from '../context/AppContext';

export default function Modal({ item, onClose }) {
  const [info, setInfo] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const { playMovie, toggleMyList, activeProfile, myList, likedMovies, toggleLike } = useContext(AppContext);
  const type = item.media_type || (item.first_air_date ? 'tv' : 'movie');

  useEffect(() => {
    const load = async () => {
      try {
        const [d, v] = await Promise.all([details(item.id, type), videos(item.id, type)]);
        setInfo(d);
        const trailer = v.results?.find(x => x.type === 'Trailer' && x.site === 'YouTube')
          || v.results?.find(x => x.site === 'YouTube');
        if (trailer) setTrailerKey(trailer.key);
      } catch {}
    };
    load();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [item.id, type]);

  const title = item.title || item.name || '';
  const year = (item.release_date || item.first_air_date || '').slice(0, 4);
  const rating = info?.vote_average ? Math.round(info.vote_average * 10) : '—';
  const runtime = info?.runtime ? `${info.runtime}m`
    : info?.episode_run_time?.[0] ? `${info.episode_run_time[0]}m/ep`
    : '';
  const genres = (info?.genres || []).map(g => g.name).join(' • ');
  
  const inList = activeProfile && myList[activeProfile.name]?.some(m => m.id === item.id);
  const isLiked = activeProfile && likedMovies[activeProfile.name]?.some(m => m.id === item.id);

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-hero">
          <img
            src={img(item.backdrop_path || item.poster_path, 'original')}
            alt={title}
          />
          <div className="modal-hero-gradient" />
          <div className="modal-hero-info">
            <h2>{title}</h2>
            <div className="modal-hero-btns">
              <button className="btn-play" style={{ padding: '10px 22px' }} onClick={() => playMovie(item)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="black"><path d="M8 5v14l11-7z"/></svg>
                Play
              </button>
              <button className="modal-circle-btn" title={inList ? "Remove from My List" : "Add to My List"} onClick={() => toggleMyList(item)}>
                {inList ? '✓' : '＋'}
              </button>
              <button className={`modal-circle-btn btn-like ${isLiked ? 'liked' : ''}`} title={isLiked ? "Unlike" : "Like"} onClick={() => toggleLike(item)}>👍</button>
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-meta">
            <span className="modal-match">{rating}% Match</span>
            {year && <span className="modal-year">{year}</span>}
            <span className="modal-badge">HD</span>
            {runtime && <span className="modal-badge">{runtime}</span>}
          </div>
          {genres && <p style={{ color: '#aaa', fontSize: '0.82rem', marginBottom: 12 }}>{genres}</p>}
          <p className="modal-overview">{info?.overview || item.overview || ''}</p>

          {trailerKey && (
            <>
              <p style={{ fontWeight: 700, marginBottom: 12, fontSize: '1rem' }}>Trailer</p>
              <div className="modal-trailer">
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=0&rel=0`}
                  title={`${title} Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
