const fs = require('fs');
console.log('Starting program...');
let fileContents = fs.readFileSync('words.txt', 'utf8');
let numberOfWords = fileContents.split(/[ ,.\n]+/).length;
console.log(`There are ${numberOfWords}  words in this file`);
console.log('Program finished.');