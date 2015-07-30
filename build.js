const fs = require('fs')
const through = require('through2')
const split = require('split2')
const sortBy = require('lodash').sortBy

var counts = {}
var words = []
var count = 0

// Tally up instances of each word in the corpus
var readStream = fs.createReadStream('./data/full.txt')

var countStream = through(function (line, enc, next) {
  if (++count % 10000 === 0) process.stderr.write(String(count) + '\n')
  line = line.toString().toLowerCase()
  var words = line.match(/[\w']+/g)
  if (!words) return next()
  words.forEach(function (word) {
    counts[word] = counts[word] ? counts[word] + 1 : 1
  })
  next()
})

readStream
  .pipe(split())
  .pipe(countStream)

countStream.on('finish', function () {
  // Create an array of word objects tha can be easily sorted by `count`
  Object.keys(counts).forEach(function (word) {
    words.push({
      word: word,
      count: counts[word]
    })
  })

  words = sortBy(words, 'count').reverse()

  process.stdout.write(JSON.stringify(words, null, 2))
})
