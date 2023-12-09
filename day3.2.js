'use strict';

const fs = require('fs/promises');
const dimensions = 140;
const numericPoints = ['1','2','3','4','5','6','7','8','9','0'];


const checkConnectivity = (plot, token, gears) => {
    // Check all points around this number
    for (let checkX = token.x-1; checkX <= token.x+token.value.length; checkX++) {
        for (let checkY = token.y-1; checkY <= token.y+1; checkY++) {
            // OOB check
            if (checkX < 0 || checkX >= dimensions || checkY < 0 || checkY >= dimensions ) continue;

            // If we find a connected gear, add this number to it's list of connected values
            if (plot[checkY][checkX] === '*') {
                gears[`${checkY}:${checkX}`].push(parseInt(token.value));
            }
        }
    }
    return false;
}

(async function main() {
    const input = await fs.open('day3.input');
    let sum = 0;

    const plot = [];
    const gears = {};

    // Tokenise
    for await(const line of input.readLines()) {
        plot.push(line.split(''));
    }

    // Setup all the gears
    for (const [y, row] of plot.entries()) {
        for (const [x, point] of row.entries()) {
            if (point === '*') {
                gears[`${y}:${x}`] = [];
            }
        }
    }

    // Walk the array
    let currentToken = null;
    for (const [y, row] of plot.entries()) {
        for (const [x, point] of row.entries()) {
            if (!currentToken) {
                // If we didn't find a number, continue.
                if (!numericPoints.includes(point)) continue;

                // First digit in a number, start tracking
                currentToken = {value: point, x, y};
                continue;
            }
            if (!numericPoints.includes(point)) {
                // End of number, check connectivity to gears
                checkConnectivity(plot, currentToken, gears);
                currentToken = null;
                continue;
            }

            // We have another number, concat it to the currentToken
            currentToken.value += point;
        }

        // End of row, close token now
        if (currentToken) {
            checkConnectivity(plot, currentToken, gears);
            currentToken = null;
        }
    }

    // Sum all gears that have exactly two connected values
    for (const gear of Object.values(gears)) {
        if (gear.length === 2) {
            sum += gear[0] * gear[1];
        }
    }

    console.log(sum);
})();

