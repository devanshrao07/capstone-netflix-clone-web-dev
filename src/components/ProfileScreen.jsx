import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const profiles = [
  { name: 'Devansh', emoji: '😎', gradient: 'linear-gradient(135deg,#E50914,#B20710)' },
  { name: 'Guest',   emoji: '🎬', gradient: 'linear-gradient(135deg,#0071EB,#0050A5)' },
  { name: 'Kids',    emoji: '🧒', gradient: 'linear-gradient(135deg,#46D369,#2D8F47)' },
];

export default function ProfileScreen() {
  const [exiting, setExiting] = useState(false);
  const { setActiveProfile } = useContext(AppContext);
  const navigate = useNavigate();

  const pick = (p) => {
    setExiting(true);
    setTimeout(() => {
      setActiveProfile(p);
      navigate('/browse');
    }, 600);
  };

  return (
    <div className={`profile-screen${exiting ? ' exit' : ''}`}>
      <div className="profile-logo">NETFLIX</div>
      <h1 className="profile-heading">Who's watching?</h1>
      <div className="profiles-grid">
        {profiles.map((p) => (
          <button key={p.name} className="profile-card" onClick={() => pick(p)}>
            <div className="profile-avatar" style={{ background: p.gradient }}>
              <span>{p.emoji}</span>
            </div>
            <p>{p.name}</p>
          </button>
        ))}
        <button className="profile-card" onClick={() => {}}>
          <div className="profile-avatar add"><span>＋</span></div>
          <p>Add Profile</p>
        </button>
      </div>
    </div>
  );
}
