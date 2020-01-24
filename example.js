const words = require('.')

console.log(words.length)
// 200182

words.slice(0, 3)
/*
[ { word: 'you', count: 1848036 },
  { word: 'i', count: 1480046 },
  { word: 'the', count: 1472467 } ]
*/

words
  .filter(function (word) { return word.word.match(/chick/) })
  .slice(0, 5)
  /*
  [ { word: 'chicken', count: 3148 },
    { word: 'chick', count: 1282 },
    { word: 'chicks', count: 724 },
    { word: 'chickens', count: 516 },
    { word: 'chickenshit', count: 81 } ]
  */
