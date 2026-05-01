import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function Navbar({ searchQuery, setSearchQuery }) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef(null);
  const { activeProfile, setActiveProfile } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (!searchOpen) setSearchOpen(true);
  };

  const handleProfileSwitch = () => {
    setActiveProfile(null);
    navigate('/');
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-left">
        <Link to="/browse" className="nav-logo">NETFLIX</Link>
        <ul className="nav-links">
          <li><Link to="/browse" className="active">Home</Link></li>
          <li><Link to="/browse">TV Shows</Link></li>
          <li><Link to="/browse">Movies</Link></li>
          <li><Link to="/browse">New &amp; Popular</Link></li>
          <li><Link to="/my-list">My List</Link></li>
        </ul>
      </div>
      <div className="nav-right">
        <div className={`search-wrap${searchOpen ? ' open' : ''}`} onClick={openSearch}>
          <button className="nav-icon-btn" aria-label="Search" onClick={openSearch}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
          <input
            ref={inputRef}
            type="text"
            placeholder="Titles, people, genres"
            value={searchQuery}
            onChange={handleSearch}
            onBlur={() => { if (!searchQuery) setSearchOpen(false); }}
          />
        </div>
        <button className="nav-icon-btn" aria-label="Notifications">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
        </button>
        <div className="nav-avatar-wrap" onClick={handleProfileSwitch} title="Switch Profile">
          <div className="nav-avatar" style={{ background: activeProfile?.gradient }}>
            <span>{activeProfile?.emoji}</span>
          </div>
          <span className="nav-arrow">▼</span>
        </div>
      </div>
    </nav>
  );
}
