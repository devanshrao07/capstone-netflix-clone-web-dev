import { useState, useEffect } from 'react';
import { videos } from '../api';

export default function VideoPlayer({ item, onClose }) {
  const [trailerKey, setTrailerKey] = useState(null);
  const [error, setError] = useState(false);
  
  const type = item.media_type || (item.first_air_date ? 'tv' : 'movie');

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const v = await videos(item.id, type);
        const trailer = v.results?.find(x => x.type === 'Trailer' && x.site === 'YouTube')
          || v.results?.find(x => x.site === 'YouTube');
          
        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      }
    };
    fetchTrailer();
    
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [item.id, type]);

  return (
    <div className="video-player-overlay" onClick={onClose} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      backgroundColor: '#000', zIndex: 9999, display: 'flex', 
      justifyContent: 'center', alignItems: 'center'
    }}>
      <button onClick={onClose} style={{
        position: 'absolute', top: '20px', right: '30px', 
        background: 'transparent', border: 'none', color: 'white', 
        fontSize: '2rem', cursor: 'pointer', zIndex: 10000
      }} aria-label="Close">✕</button>
      
      {trailerKey ? (
        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`}
          title={`${item.title || item.name} Trailer`}
          style={{ width: '100%', height: '100%', border: 'none' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : error ? (
        <div style={{ color: 'white', fontSize: '1.5rem' }}>No trailer available for this title.</div>
      ) : (
        <div style={{ color: 'white' }}>Loading trailer...</div>
      )}
    </div>
  );
}
