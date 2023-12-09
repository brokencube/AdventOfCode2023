'use strict';

const fs = require('fs/promises');
const map = {one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9};

(async function main() {
    const input = await fs.open('day1.input');
    let sum = 0;
    for await(const line of input.readLines()) {
        const firstmatch = line
            .replace(/^(.*?)(one|two|three|four|five|six|seven|eight|nine)(.*)$/, (matched, p1, p2, p3) => [p1, map[p2], p3].join('')) // Replace first number word
            .match(/^\D*(\d)/);
        const lastmatch = line
            .replace(/^(.*)(one|two|three|four|five|six|seven|eight|nine)(.*?)$/, (matched, p1, p2, p3) => [p1, map[p2], p3].join('')) // Replace last number word
            .match(/(\d)\D*$/);

        sum += parseInt(firstmatch[1] + lastmatch[1]);
    }
    console.log(sum);
})();

