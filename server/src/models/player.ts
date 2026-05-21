class Player {
    id: number;
    name: string;
    position: string;
    stats: { goals: number; assists: number; appearances: number };

    constructor(id: number, name: string, position: string, stats?: { goals: number; assists: number; appearances: number }) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.stats = stats ?? { goals: 0, assists: 0, appearances: 0 };
    }

    calculateStats(): { goals: number; assists: number; appearances: number } {
        // Logic to calculate player statistics
        return {
            goals: Math.floor(Math.random() * 10),
            assists: Math.floor(Math.random() * 5),
            appearances: Math.floor(Math.random() * 20)
        };
    }

    updateStats(newStats: { goals?: number; assists?: number; appearances?: number }): void {
        if (newStats.goals !== undefined) this.stats.goals = newStats.goals;
        if (newStats.assists !== undefined) this.stats.assists = newStats.assists;
        if (newStats.appearances !== undefined) this.stats.appearances = newStats.appearances;
    }
}

export default Player;