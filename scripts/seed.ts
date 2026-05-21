import { Player } from '../shared/src/types';
import { Team } from '../shared/src/types';
import { writeFileSync, mkdirSync } from 'fs';

const players: Player[] = [
    { id: 1, name: 'Lionel Messi', position: 'Forward', stats: { goals: 0, assists: 0, appearances: 0 } },
    { id: 2, name: 'Cristiano Ronaldo', position: 'Forward', stats: { goals: 0, assists: 0, appearances: 0 } },
    { id: 3, name: 'Neymar Jr', position: 'Forward', stats: { goals: 0, assists: 0, appearances: 0 } },
    { id: 4, name: 'Kevin De Bruyne', position: 'Midfielder', stats: { goals: 0, assists: 0, appearances: 0 } },
    { id: 5, name: 'Virgil van Dijk', position: 'Defender', stats: { goals: 0, assists: 0, appearances: 0 } },
];

const teams: Team[] = [
    {
        id: 1,
        name: 'FC Barcelona',
        players: [players[0], players[3]],
        coach: 'Xavi Hernandez',
        formation: '4-3-3'
    },
    {
        id: 2,
        name: 'Real Madrid',
        players: [players[1], players[4]],
        coach: 'Carlo Ancelotti',
        formation: '4-3-3'
    },
    {
        id: 3,
        name: 'Paris Saint-Germain',
        players: [players[2]],
        coach: 'Luis Enrique',
        formation: '4-2-3-1'
    },
];

const seedDatabase = () => {
    mkdirSync('data', { recursive: true });
    writeFileSync('data/players.json', JSON.stringify(players, null, 2));
    writeFileSync('data/teams.json', JSON.stringify(teams, null, 2));
};

seedDatabase();