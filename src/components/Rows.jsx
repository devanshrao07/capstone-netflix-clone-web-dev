import { useContext } from 'react';
import Row from './Row';
import { AppContext } from '../context/AppContext';
import {
  netflixOriginals, trending, popularMovies,
  topRated, actionMovies, comedyMovies,
  horrorMovies, romanceMovies, sciFiMovies
} from '../api';

const ROWS = [
  { title: 'Netflix Originals', fn: netflixOriginals, large: true },
  { title: 'Trending Now', fn: trending },
  { title: 'Popular on Netflix', fn: popularMovies },
  { title: 'Top Rated', fn: topRated },
  { title: 'Action & Adventure', fn: actionMovies },
  { title: 'Comedies', fn: comedyMovies },
  { title: 'Horror Movies', fn: horrorMovies },
  { title: 'Romantic Movies', fn: romanceMovies },
  { title: 'Sci-Fi & Fantasy', fn: sciFiMovies },
];

export default function Rows({ onSelect, onlyMyList = false }) {
  const { activeProfile, myList, continueWatching } = useContext(AppContext);
  
  const userList = myList[activeProfile?.name] || [];
  const userHistory = continueWatching[activeProfile?.name] || [];

  if (onlyMyList) {
    return (
      <section className="rows-section" style={{ marginTop: 0 }}>
        {userList.length > 0 ? (
          <Row title="My List" items={userList} onSelect={onSelect} />
        ) : (
          <div style={{ padding: '0 4%', color: '#666', minHeight: '50vh' }}>
            <h2>My List is empty</h2>
            <p style={{ marginTop: '10px' }}>Add shows and movies that you want to watch later.</p>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="rows-section">
      {userHistory.length > 0 && (
        <Row title={`Continue Watching for ${activeProfile?.name}`} items={userHistory} onSelect={onSelect} />
      )}
      {userList.length > 0 && (
        <Row title="My List" items={userList} onSelect={onSelect} />
      )}
      {ROWS.map(r => (
        <Row
          key={r.title}
          title={r.title}
          fetchFn={r.fn}
          onSelect={onSelect}
          large={r.large}
        />
      ))}
    </section>
  );
}
