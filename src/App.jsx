import { useState, useContext, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import ProfileScreen from './components/ProfileScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Rows from './components/Rows';
import Modal from './components/Modal';
import Footer from './components/Footer';
import SearchOverlay from './components/SearchOverlay';
import VideoPlayer from './components/VideoPlayer';

export default function App() {
  const { activeProfile, playingMovie, setPlayingMovie } = useContext(AppContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Route protection logic
  useEffect(() => {
    if (!activeProfile && location.pathname !== '/') {
      navigate('/');
    }
  }, [activeProfile, location.pathname, navigate]);

  return (
    <>
      {activeProfile && (
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}
      
      {searchQuery && activeProfile ? (
        <SearchOverlay query={searchQuery} onSelect={setSelectedItem} />
      ) : (
        <Routes>
          <Route path="/" element={<ProfileScreen />} />
          <Route path="/browse" element={
            <>
              <Hero onInfo={setSelectedItem} />
              <Rows onSelect={setSelectedItem} />
              <Footer />
            </>
          } />
          <Route path="/my-list" element={
            <div style={{ paddingTop: '100px', minHeight: '80vh' }}>
              <Rows onSelect={setSelectedItem} onlyMyList={true} />
              <Footer />
            </div>
          } />
        </Routes>
      )}

      {selectedItem && (
        <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}

      {playingMovie && (
        <VideoPlayer item={playingMovie} onClose={() => setPlayingMovie(null)} />
      )}
    </>
  );
}
