import { useContext } from 'react';
import { img } from '../api';
import { AppContext } from '../context/AppContext';

export default function MovieCard({ item, onSelect, large = false }) {
  const { playMovie, toggleMyList, activeProfile, myList, likedMovies, toggleLike } = useContext(AppContext);
  const title = item.title || item.name || '';
  const type = item.media_type || (item.first_air_date ? 'tv' : 'movie');
  const rating = item.vote_average ? Math.round(item.vote_average * 10) : '';
  const year = (item.release_date || item.first_air_date || '').slice(0, 4);

  const imgPath = img(item.poster_path, large ? 'w500' : 'w342');
  
  const inList = activeProfile && myList[activeProfile.name]?.some(m => m.id === item.id);
  const isLiked = activeProfile && likedMovies[activeProfile.name]?.some(m => m.id === item.id);

  const handlePlay = (e) => {
    e.stopPropagation();
    playMovie(item);
    // Usually would navigate to video player here
  };

  const handleToggleList = (e) => {
    e.stopPropagation();
    toggleMyList(item);
  };

  const handleToggleLike = (e) => {
    e.stopPropagation();
    toggleLike(item);
  };

  return (
    <div className={`movie-card${large ? ' large' : ''}`} onClick={() => onSelect({ ...item, media_type: type })}>
      <div className="card-img-wrap">
        {imgPath && (
          <img
            src={imgPath}
            alt={title}
            loading="lazy"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        )}
      </div>

      <div className="card-hover-panel">
        <div className="card-actions">
          <button className="card-btn play" title="Play" onClick={handlePlay}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="black"><path d="M8 5v14l11-7z"/></svg>
          </button>
          <button className="card-btn" title={inList ? "Remove from My List" : "Add to My List"} onClick={handleToggleList}>
            {inList ? '✓' : '＋'}
          </button>
          <button className={`card-btn btn-like ${isLiked ? 'liked' : ''}`} title={isLiked ? "Unlike" : "I like this"} onClick={handleToggleLike}>👍</button>
          <button className="card-btn add-list" title="More info" onClick={(e) => { e.stopPropagation(); onSelect({ ...item, media_type: type }); }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
          </button>
        </div>
        <div className="card-meta">
          {rating && <span className="card-match">{rating}% Match</span>}
          {year && <span style={{ fontSize: '0.72rem', color: '#aaa' }}>{year}</span>}
          <span className="card-rating">HD</span>
        </div>
        <div className="card-title">{title}</div>
        <div className="card-genres" style={{ textTransform: 'capitalize' }}>{type}</div>
      </div>
    </div>
  );
}
