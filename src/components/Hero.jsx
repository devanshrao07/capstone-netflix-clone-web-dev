import { useState, useEffect } from 'react';
import { trending, img } from '../api';

export default function Hero({ onInfo }) {
  const [items, setItems] = useState([]);
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    trending().then(d => setItems(d.results?.filter(i => i.backdrop_path) || []));
  }, []);

  useEffect(() => {
    if (!items.length) return;
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % Math.min(items.length, 8));
        setFade(true);
      }, 400);
    }, 7000);
    return () => clearInterval(t);
  }, [items.length]);

  const item = items[idx];
  if (!item) return <div style={{ height: '90vh', background: '#111' }} />;

  const title = item.title || item.name || '';
  const overview = item.overview || '';
  const type = item.media_type === 'tv' ? 'tv' : 'movie';

  return (
    <header className="hero">
      <img
        key={item.id}
        className="hero-bg"
        src={img(item.backdrop_path, 'original')}
        alt={title}
        style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.4s ease' }}
      />
      <div className="hero-gradient" />
      <div className="hero-content" style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.4s ease' }}>
        <div className="hero-n-badge">
          <div className="hero-n">N</div>
          <span className="hero-n-label">{type === 'tv' ? 'Series' : 'Film'}</span>
        </div>
        <h1 className="hero-title">{title}</h1>
        <p className="hero-overview">{overview}</p>
        <div className="hero-btns">
          <button className="btn-play">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="black"><path d="M8 5v14l11-7z"/></svg>
            Play
          </button>
          <button className="btn-info" onClick={() => onInfo({ ...item, media_type: type })}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            More Info
          </button>
        </div>
      </div>

      {/* dot indicators */}
      <div style={{ position:'absolute', bottom:'32%', left:'4%', display:'flex', gap:6, zIndex:2 }}>
        {items.slice(0, 8).map((_, i) => (
          <button
            key={i}
            onClick={() => { setFade(false); setTimeout(() => { setIdx(i); setFade(true); }, 400); }}
            style={{
              width: i === idx ? 22 : 8, height: 4, border: 'none', borderRadius: 2,
              background: i === idx ? '#fff' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer', padding: 0, transition: 'all 0.3s'
            }}
          />
        ))}
      </div>

      <div className="hero-fade" />
    </header>
  );
}
