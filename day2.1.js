'use strict';

const fs = require('fs/promises');
const limits = {red: 12, green: 13, blue: 14};

(async function main() {
    const input = await fs.open('day2.input');
    let sum = 0;

    gameLoop: for await(const line of input.readLines()) {
        const [game, sets] = line.split(':');
        const gameNumber = parseInt(game.match(/^Game (\d+)/)[1]);

        const games = sets.split(';');
        for (const game of games) {
            const cubes = game.split(',');
            for (const cube of cubes) {
                const colour = cube.match(/\S+$/)[0];
                const count = parseInt(cube.match(/^\s*\d+/)[0]);
                if (limits[colour] < count) {
                    continue gameLoop; // Impossible game - skip
                }
            }
        }

        // Game could be played - add to sum
        sum += gameNumber;
    }
    console.log(sum);
})();

