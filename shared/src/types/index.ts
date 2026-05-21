export interface Player {
    id: number;
    name: string;
    position: string;
    stats: {
        goals: number;
        assists: number;
        appearances: number;
    };
}

export interface Team {
    id: number;
    name: string;
    players: Player[];
    coach: string;
    formation: string;
}