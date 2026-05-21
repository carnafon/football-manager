import { Player } from '../server/src/models/player';
import { Team } from '../shared/src/types';
import { writeFileSync } from 'fs';

const players: Player[] = [
    new Player(1, 'Lionel Messi', 'Forward'),
    new Player(2, 'Cristiano Ronaldo', 'Forward'),
    new Player(3, 'Neymar Jr', 'Forward'),
    new Player(4, 'Kevin De Bruyne', 'Midfielder'),
    new Player(5, 'Virgil van Dijk', 'Defender'),
];

const teams: Team[] = [
    {
        id: 1,
        name: 'FC Barcelona',
        players: [players[0], players[3]],
    },
    {
        id: 2,
        name: 'Real Madrid',
        players: [players[1], players[4]],
    },
    {
        id: 3,
        name: 'Paris Saint-Germain',
        players: [players[2]],
    },
];

const seedDatabase = () => {
    writeFileSync('data/players.json', JSON.stringify(players, null, 2));
    writeFileSync('data/teams.json', JSON.stringify(teams, null, 2));
};

seedDatabase();