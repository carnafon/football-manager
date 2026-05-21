import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ManagerDashboard from './pages/ManagerDashboard';
import Teams from './pages/Teams';
import TeamDetail from './pages/TeamDetail';
import PlayerDetail from './pages/PlayerDetail';
import Transfers from './pages/Transfers';
import Tactics from './pages/Tactics';
import Fixtures from './pages/Fixtures';
import LeagueTable from './pages/LeagueTable';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <main style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<ManagerDashboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:id" element={<TeamDetail />} />
          <Route path="/player/:id" element={<PlayerDetail />} />
          <Route path="/transfers" element={<Transfers />} />
          <Route path="/tactics" element={<Tactics />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/table" element={<LeagueTable />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
