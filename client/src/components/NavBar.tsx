import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {
  const [user, setUser] = useState<{ id: number; name?: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('fm_token');
    if (!token) return setUser(null);
    fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(u => {
        if (u && !u.error) setUser(u);
        else setUser(null);
      })
      .catch(() => setUser(null));
  }, []);

  function logout() {
    localStorage.removeItem('fm_token');
    setUser(null);
    navigate('/auth');
  }

  return (
    <nav style={{ padding: 10, background: '#222', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <Link to="/" style={{ color: 'white', marginRight: 12 }}>Dashboard</Link>
        <Link to="/teams" style={{ color: 'white', marginRight: 12 }}>Equipos</Link>
        <Link to="/transfers" style={{ color: 'white', marginRight: 12 }}>Traspasos</Link>
        <Link to="/tactics" style={{ color: 'white', marginRight: 12 }}>Tácticas</Link>
        <Link to="/fixtures" style={{ color: 'white', marginRight: 12 }}>Jornadas</Link>
        <Link to="/table" style={{ color: 'white' }}>Clasificación</Link>
      </div>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: 12 }}>Hola, {user.name || 'Manager'}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/auth" style={{ color: 'white', marginLeft: 12 }}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
