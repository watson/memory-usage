'use strict'

var test = require('tape')
var memoryUsage = require('./')

test('return a readable stream', function (t) {
  var stream = memoryUsage()
  t.equal(typeof stream.on, 'function')
  t.equal(stream.readable, true)
  t.end()
})

test('basic', function (t) {
  // ensure tape doesn't end while we wait for memory usage to be sampled
  var dummy = setTimeout(function () {}, 10000)

  var stream = memoryUsage({freq: 50})

  stream.once('data', function (obj) {
    t.ok(obj.rss)
    t.ok(obj.heapTotal)
    t.ok(obj.heapUsed)
    clearTimeout(dummy)
    t.end()
  })
})
