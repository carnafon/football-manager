import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PlayerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    // No player API yet; read from seeded data if available
    fetch('/data/players.json')
      .then(r => r.json())
      .then((players: any[]) => setPlayer(players.find(p => String(p.id) === id)))
      .catch(() => setPlayer(null));
  }, [id]);

  if (!player) return <div>Jugador no encontrado</div>;

  return (
    <div>
      <h2>{player.name}</h2>
      <p>Posición: {player.position}</p>
      <h4>Estadísticas</h4>
      <ul>
        <li>Goles: {player.stats?.goals ?? 0}</li>
        <li>Asistencias: {player.stats?.assists ?? 0}</li>
        <li>Apariciones: {player.stats?.appearances ?? 0}</li>
      </ul>
    </div>
  );
};

export default PlayerDetail;
