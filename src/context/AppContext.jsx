import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Try to load initial state from LocalStorage
  const loadState = (key, defaultVal) => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultVal;
    } catch {
      return defaultVal;
    }
  };

  const [activeProfile, setActiveProfile] = useState(() => loadState('netflix_profile', null));
  const [myList, setMyList] = useState(() => loadState('netflix_mylist', {}));
  const [continueWatching, setContinueWatching] = useState(() => loadState('netflix_continue', {}));
  const [likedMovies, setLikedMovies] = useState(() => loadState('netflix_liked', {}));
  const [playingMovie, setPlayingMovie] = useState(null);

  // Sync to LocalStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('netflix_profile', JSON.stringify(activeProfile));
  }, [activeProfile]);

  useEffect(() => {
    localStorage.setItem('netflix_mylist', JSON.stringify(myList));
  }, [myList]);

  useEffect(() => {
    localStorage.setItem('netflix_continue', JSON.stringify(continueWatching));
  }, [continueWatching]);

  useEffect(() => {
    localStorage.setItem('netflix_liked', JSON.stringify(likedMovies));
  }, [likedMovies]);

  // Actions
  const toggleMyList = (movie) => {
    if (!activeProfile) return;
    setMyList(prev => {
      const profileList = prev[activeProfile.name] || [];
      const exists = profileList.find(m => m.id === movie.id);
      
      const updatedProfileList = exists 
        ? profileList.filter(m => m.id !== movie.id)
        : [movie, ...profileList];
        
      return { ...prev, [activeProfile.name]: updatedProfileList };
    });
  };

  const playMovie = (movie) => {
    if (!activeProfile) return;
    setContinueWatching(prev => {
      const profileHistory = prev[activeProfile.name] || [];
      // Remove if it already exists so we can move it to the front
      const filtered = profileHistory.filter(m => m.id !== movie.id);
      return { ...prev, [activeProfile.name]: [movie, ...filtered] };
    });
    setPlayingMovie(movie);
  };

  const toggleLike = (movie) => {
    if (!activeProfile) return;
    setLikedMovies(prev => {
      const profileList = prev[activeProfile.name] || [];
      const exists = profileList.find(m => m.id === movie.id);
      
      const updatedProfileList = exists 
        ? profileList.filter(m => m.id !== movie.id)
        : [movie, ...profileList];
        
      return { ...prev, [activeProfile.name]: updatedProfileList };
    });
  };

  return (
    <AppContext.Provider value={{
      activeProfile, setActiveProfile,
      myList, toggleMyList,
      continueWatching, playMovie,
      playingMovie, setPlayingMovie,
      likedMovies, toggleLike
    }}>
      {children}
    </AppContext.Provider>
  );
};
