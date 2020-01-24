'use strict'

var test = require('tape')
var subtlex = require('.')

test('subtlex', function(t) {
  t.plan(2)

  t.ok(Array.isArray(subtlex), 'should be an `array`')

  subtlex.forEach(function(d) {
    if (d.word === 'right') {
      t.deepEqual(d, {word: 'right', count: 204428}, 'should work')
    }
  })
})
