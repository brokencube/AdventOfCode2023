'use strict';

const fs = require('fs/promises');

(async function main() {
    const input = await fs.open('day1.input');
    let sum = 0;
    for await(const line of input.readLines()) {
        const match = line.match(/^\D*(?:(\d).*(\d)|(\d))\D*$/);
        sum += parseInt(match[1] ? match[1] + match[2] : match[3] + match[3]);
    }
    console.log(sum);
})();

