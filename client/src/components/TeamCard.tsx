import React from 'react';

const TeamCard: React.FC<{ team: any }> = ({ team }) => (
  <div style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8, background: '#fff' }}>
    <h3>{team.name}</h3>
    <p>{team.players?.length ?? 0} jugadores</p>
  </div>
);

export default TeamCard;
