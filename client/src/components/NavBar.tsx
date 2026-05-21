import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => (
  <nav style={{ padding: 10, background: '#222', color: 'white' }}>
    <Link to="/" style={{ color: 'white', marginRight: 12 }}>Dashboard</Link>
    <Link to="/teams" style={{ color: 'white', marginRight: 12 }}>Equipos</Link>
    <Link to="/transfers" style={{ color: 'white', marginRight: 12 }}>Traspasos</Link>
    <Link to="/tactics" style={{ color: 'white', marginRight: 12 }}>Tácticas</Link>
    <Link to="/fixtures" style={{ color: 'white', marginRight: 12 }}>Jornadas</Link>
    <Link to="/table" style={{ color: 'white' }}>Clasificación</Link>
  </nav>
);

export default NavBar;
