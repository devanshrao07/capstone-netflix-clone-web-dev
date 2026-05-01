import { useState, useEffect, useCallback } from 'react';
import { search, img } from '../api';

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function SearchOverlay({ query, onSelect }) {
  const [results, setResults] = useState([]);
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (!debouncedQuery.trim()) { setResults([]); return; }
    search(debouncedQuery).then(d => setResults(d.results || []));
  }, [debouncedQuery]);

  const filtered = results.filter(r => r.backdrop_path || r.poster_path);

  return (
    <div className="search-overlay">
      <p className="search-overlay-title">
        {filtered.length > 0 ? `Results for "${query}"` : query.length > 1 ? 'No results found' : 'Start typing to search…'}
      </p>
      <div className="search-grid">
        {filtered.map(item => {
          const title = item.title || item.name || '';
          const type = item.media_type || 'movie';
          return (
            <div key={item.id} className="search-card" onClick={() => onSelect({ ...item, media_type: type })}>
              <img
                src={img(item.backdrop_path || item.poster_path, 'w300')}
                alt={title}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="search-card-title">{title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
