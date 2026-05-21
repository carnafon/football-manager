class Player {
    id: number;
    name: string;
    position: string;

    constructor(id: number, name: string, position: string) {
        this.id = id;
        this.name = name;
        this.position = position;
    }

    calculateStats(): object {
        // Logic to calculate player statistics
        return {
            goals: Math.floor(Math.random() * 10),
            assists: Math.floor(Math.random() * 5),
            appearances: Math.floor(Math.random() * 20)
        };
    }

    updateStats(newStats: { goals?: number; assists?: number; appearances?: number }): void {
        // Logic to update player statistics
        if (newStats.goals !== undefined) {
            // Update goals
        }
        if (newStats.assists !== undefined) {
            // Update assists
        }
        if (newStats.appearances !== undefined) {
            // Update appearances
        }
    }
}

export default Player;