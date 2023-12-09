'use strict';

const fs = require('fs/promises');

(async function main() {
    const input = await fs.open('day2.input');
    let sum = 0;

    for await(const line of input.readLines()) {
        const minCubes = {red: 0, green: 0, blue: 0};

        const [game, sets] = line.split(':');
        const gameNumber = parseInt(game.match(/^Game (\d+)/)[1]);

        const games = sets.split(';');
        for (const game of games) {
            const cubes = game.split(',');
            for (const cube of cubes) {
                const colour = cube.match(/\S+$/)[0];
                const count = parseInt(cube.match(/^\s*\d+/)[0]);
                minCubes[colour] = Math.max(minCubes[colour], count);
            }
        }

        // Game could be played - add to sum
        sum += minCubes['blue'] * minCubes['red'] * minCubes['green'];
    }
    console.log(sum);
})();

