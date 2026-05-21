import { Team } from '../../shared/src/types';

export function simulateMatch(teamA: Team, teamB: Team): string {
    const teamAScore = Math.floor(Math.random() * 5); // Simulate score for team A
    const teamBScore = Math.floor(Math.random() * 5); // Simulate score for team B

    if (teamAScore > teamBScore) {
        return `${teamA.name} wins ${teamAScore} to ${teamBScore}`;
    } else if (teamAScore < teamBScore) {
        return `${teamB.name} wins ${teamBScore} to ${teamAScore}`;
    } else {
        return `The match ends in a draw ${teamAScore} to ${teamBScore}`;
    }
}