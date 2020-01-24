# `subtlex-word-frequencies`

[![Build][build-badge]][build]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

List of 74,286 words sorted by frequency of use in spoken English.

The word counts are derived from [SUBTLEXus][], a corpus of American English
subtitles of movies.

## Install

[npm][]:

```sh
npm install subtlex-word-frequencies
```

## Use

```js
var subtlex = require('subtlex-word-frequencies')

console.log(words.length)

console.log(words.slice(0, 3))

console.log(words.filter(d => d.word.match(/chick/)).slice(0, 5))
```

Yields:

```js
74286
[
  {word: 'you', count: 2134713},
  {word: 'I', count: 2038529},
  {word: 'the', count: 1501908}
]
[
  {word: 'chicken', count: 3148},
  {word: 'chick', count: 1334},
  {word: 'chicks', count: 742},
  {word: 'chickens', count: 520},
  {word: 'chickenshit', count: 85}
]
```

## API

### `subtlexWordFrequencies`

`Array.<Entry>` — List of all entries in SUBTLEXus.
Each entry has the following properties:

*   `word` (`string`) — Unique word
    (example: `git`)
*   `value` (`number`) — Number of times the word appears in the corpus
    (example: `101`)

`word` starts with a capital when the word more often starts with an uppercase
letter than with a lowercase letter (example: `I`).

The entire original corpus consists of 51 million words.

## License

[ISC][license] © [Zeke Sikelianos][author]

<!-- Definition -->

[build-badge]: https://img.shields.io/travis/words/subtlex-word-frequencies.svg

[build]: https://travis-ci.org/words/subtlex-word-frequencies

[downloads-badge]: https://img.shields.io/npm/dm/subtlex-word-frequencies.svg

[downloads]: https://www.npmjs.com/package/subtlex-word-frequencies

[size-badge]: https://img.shields.io/bundlephobia/minzip/subtlex-word-frequencies.svg

[size]: https://bundlephobia.com/result?p=subtlex-word-frequencies

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: http://zeke.sikelianos.com

[subtlexus]: https://www.ugent.be/pp/experimentele-psychologie/en/research/documents/subtlexus
