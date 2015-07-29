const read = require('fs').readFileSync
const sortBy = require('lodash').sortBy

var counts = {}
var words = []

// Tally up instances of each word in the corpus
read('./data/sample.txt', 'utf8')
  .toLowerCase()
  .match(/[\w']+/g)
  .forEach(function (word) {
    counts[word] = counts[word] ? counts[word] + 1 : 1
  })

// Create an array of word objects tha can be easily sorted by `count`
Object.keys(counts).forEach(function (word) {
  words.push({
    word: word,
    count: counts[word]
  })
})

words = sortBy(words, 'count').reverse()

process.stdout.write(JSON.stringify(words, null, 2))
