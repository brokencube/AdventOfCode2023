'use strict';

const fs = require('fs/promises');
const dimensions = 140;
const numericPoints = ['1','2','3','4','5','6','7','8','9','0'];

const checkConnectivity = (plot, x, y) => {
    // Check square around this point
    for (let checkX = x-1; checkX <= x+1; checkX++) {
        for (let checkY = y-1; checkY <= y+1; checkY++) {
            // OOB check
            if (checkX < 0 || checkX >= dimensions || checkY < 0 || checkY >= dimensions ) continue;

            if (plot[checkY][checkX] !== '.' && !numericPoints.includes(plot[checkY][checkX])) {
                return true;
            }
        }
    }
    return false;
}

(async function main() {
    const input = await fs.open('day3.input');
    let sum = 0;

    const plot = [];
    // Tokenise
    for await(const line of input.readLines()) {
        plot.push(line.split(''));
    }

    let currentToken = null;
    // Walk the array
    for (const [y, row] of plot.entries()) {
        for (const [x, point] of row.entries()) {
            if (!currentToken) {
                // If we didn't find a number, continue.
                if (!numericPoints.includes(point)) continue;

                // First digit in a number, start tracking
                currentToken = {value: point, connected: checkConnectivity(plot, x, y)};
                continue;
            }
            if (!numericPoints.includes(point)) {
                // End of number, add to sum if it was connected
                if (currentToken.connected) {
                    sum += parseInt(currentToken.value);
                }
                currentToken = null;
                continue;
            }

            // We have another number, concat it to the currentToken
            currentToken.value += point;
            if (!currentToken.connected) {
                currentToken.connected = checkConnectivity(plot, x, y);
            }
        }

        // End of row, close token now
        if (currentToken) {
            if (currentToken.connected) {
                sum += parseInt(currentToken.value);
            }
            currentToken = null;
        }
    }

    console.log(sum);
})();

