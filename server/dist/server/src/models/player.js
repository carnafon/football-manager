"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(id, name, position, stats) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.stats = stats !== null && stats !== void 0 ? stats : { goals: 0, assists: 0, appearances: 0 };
    }
    calculateStats() {
        // Logic to calculate player statistics
        return {
            goals: Math.floor(Math.random() * 10),
            assists: Math.floor(Math.random() * 5),
            appearances: Math.floor(Math.random() * 20)
        };
    }
    updateStats(newStats) {
        if (newStats.goals !== undefined)
            this.stats.goals = newStats.goals;
        if (newStats.assists !== undefined)
            this.stats.assists = newStats.assists;
        if (newStats.appearances !== undefined)
            this.stats.appearances = newStats.appearances;
    }
}
exports.default = Player;
