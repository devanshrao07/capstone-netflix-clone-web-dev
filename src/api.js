const API_KEY = 'e3c06f48f8f16bc4c9af2a224444bc8a';
const BASE = 'https://api.themoviedb.org/3';

const get = async (url, params = {}) => {
  const u = new URL(`${BASE}${url}`);
  u.searchParams.set('api_key', API_KEY);
  u.searchParams.set('language', 'en-US');
  u.searchParams.set('include_adult', 'false');
  Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, v));
  const r = await fetch(u);
  if (!r.ok) throw new Error(`TMDB ${r.status}: ${await r.text()}`);
  return r.json();
};

export const img = (path, size = 'w500') =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : '';

export const trending = () => get('/trending/all/week');
export const netflixOriginals = () => get('/discover/tv', { with_networks: '213' });
export const popularMovies = () => get('/movie/popular');
export const topRated = () => get('/movie/top_rated');
export const actionMovies = () => get('/discover/movie', { with_genres: '28' });
export const comedyMovies = () => get('/discover/movie', { with_genres: '35' });
export const horrorMovies = () => get('/discover/movie', { with_genres: '27' });
export const romanceMovies = () => get('/discover/movie', { with_genres: '10749' });
export const documentaries = () => get('/discover/movie', { with_genres: '99' });
export const sciFiMovies = () => get('/discover/movie', { with_genres: '878' });
export const videos = (id, type = 'movie') => get(`/${type}/${id}/videos`);
export const details = (id, type = 'movie') => get(`/${type}/${id}`);
export const search = (q) => get('/search/multi', { query: q });
