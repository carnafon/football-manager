import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TeamCard from '../components/TeamCard';

type Player = { id: number; name: string; position: string; stats: any };
type Team = { id: number; name: string; players: Player[] };

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    fetch('/api/teams')
      .then(res => res.json())
      .then(setTeams)
      .catch(() => setTeams([]));
  }, []);

  return (
    <div>
      <h2>Equipos</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
        {teams.map(t => (
          <Link key={t.id} to={`/teams/${t.id}`} style={{ textDecoration: 'none' }}>
            <TeamCard team={t} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Teams;
