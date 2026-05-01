import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

export default function Row({ title, fetchFn, items: initialItems, onSelect, large = false }) {
  const [items, setItems] = useState(initialItems || []);
  const [loading, setLoading] = useState(!initialItems);
  const ref = { current: null };

  useEffect(() => {
    if (initialItems) {
      setItems(initialItems);
      setLoading(false);
      return;
    }
    if (fetchFn) {
      fetchFn().then(d => {
        setItems(d.results || []);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [initialItems, fetchFn]);

  const scroll = (dir) => {
    const el = document.getElementById(`row-${title}`);
    if (el) el.scrollBy({ left: dir * 600, behavior: 'smooth' });
  };

  return (
    <div className="row">
      <h2 className="row-title">{title}</h2>
      <div className="row-slider">
        <button className="slider-arrow left" onClick={() => scroll(-1)} aria-label="Scroll left">&#8249;</button>
        <div className="row-scroll" id={`row-${title}`}>
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={{
                  flex: '0 0 auto', width: large ? 180 : 180,
                  height: large ? 270 : 101,
                  borderRadius: 6, background: '#222',
                  animation: 'pulse 1.5s infinite'
                }} />
              ))
            : items.map(item => (
                <MovieCard key={item.id} item={item} onSelect={onSelect} large={large} />
              ))
          }
        </div>
        <button className="slider-arrow right" onClick={() => scroll(1)} aria-label="Scroll right">&#8250;</button>
      </div>
    </div>
  );
}
