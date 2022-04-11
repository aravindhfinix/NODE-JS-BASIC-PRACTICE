var fs = require('fs');
console.log('Starting program...');
// Read a small file synchronously
var fileContents = fs.readFileSync('words.txt', 'utf8');
// Count number of words
var numberOfWords = fileContents.split(/[ ,.\n]+/).length;
// Print to console
console.log('There are ' + numberOfWords + ' words in this file.');
console.log('Program finished.');