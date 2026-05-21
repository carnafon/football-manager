import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Player = { id: number; name: string; position: string; stats: any };
type Team = { id: number; name: string; players: Player[] };

function simulateMatchLocal(teamA: Team, teamB: Team) {
  const a = Math.floor(Math.random() * 5);
  const b = Math.floor(Math.random() * 5);
  if (a > b) return `${teamA.name} wins ${a} - ${b}`;
  if (a < b) return `${teamB.name} wins ${b} - ${a}`;
  return `Draw ${a} - ${b}`;
}

const TeamDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [team, setTeam] = useState<Team | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!id) return;
    fetch(`/api/teams/${id}`)
      .then(r => r.text())
      .then(t => {
        try {
          const parsed = JSON.parse(t);
          setTeam(parsed);
        } catch {
          // server returns plain text in current implementation
          setTeam({ id: Number(id), name: t, players: [] });
        }
      })
      .catch(() => setTeam(null));
  }, [id]);

  if (!team) return <div>Cargando equipo...</div>;

  return (
    <div>
      <h2>{team.name}</h2>
      <h3>Plantilla</h3>
      <ul>
        {team.players?.map(p => (
          <li key={p.id}>{p.name} — {p.position}</li>
        ))}
      </ul>

      <div style={{ marginTop: 20 }}>
        <button onClick={() => setMessage(simulateMatchLocal(team, { id: 999, name: 'Rival FC', players: [] }))}>
          Simular partido vs Rival FC
        </button>
        {message && <p style={{ marginTop: 12 }}>{message}</p>}
      </div>
    </div>
  );
};

export default TeamDetail;
