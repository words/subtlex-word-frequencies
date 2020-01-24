var fs = require('fs')
var path = require('path')
var https = require('https')
var concat = require('concat-stream')
var yauzl = require('yauzl')
var dsv = require('d3-dsv')
var bail = require('bail')

// See: http://crr.ugent.be/programs-data/subtitle-frequencies
var endpoint = 'https://www.ugent.be/pp/experimentele-psychologie/en/research/documents/subtlexus/subtlexus2.zip/at_download/file'

// Name in archive.
var name = 'SUBTLEXus74286wordstextversion.txt'

https
  .request(endpoint, onrequest)
  .end()

function onrequest(res) {
  res
    .pipe(fs.createWriteStream('archive.zip'))
    .on('close', onclose)
    .on('error', bail)
}

function onclose() {
  yauzl.open('archive.zip', {lazyEntries: true}, onopen)
}

function onopen(err, archive) {
  bail(err)

  read()

  archive.on('entry', onentry)
  archive.on('end', onend)

  function onentry(entry) {
    if (path.basename(entry.fileName) !== name) {
      return read()
    }

    found = true
    archive.openReadStream(entry, onreadstream)
  }

  function onreadstream(err, rs) {
    bail(err)
    rs.pipe(concat(onconcat)).on('error', bail)
    rs.on('end', read)
  }

  function read() {
    archive.readEntry()
  }
}

function onend() {
  if (!found) {
    throw new Error('File not found')
  }
}

function onconcat(buf) {
  var data = dsv.tsvParse(String(buf)).map(map).sort(sort)

  fs.writeFile('index.json', JSON.stringify(data, null, 2) + '\n', bail)
}

function map(d) {
  return {word: d.Word, count: d.FREQcount}
}

function sort(a, b) {
  return pick(b) - pick(a)
}

function pick(d) {
  return d.count
}
