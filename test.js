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

  var stream = memoryUsage(50)

  stream.once('data', function (obj) {
    t.ok(obj.rss)
    t.ok(obj.heapTotal)
    t.ok(obj.heapUsed)
    t.notOk('ts' in obj)
    t.notOk('gc' in obj)
    clearTimeout(dummy)
    t.end()
  })
})

test('options.ts', function (t) {
  // ensure tape doesn't end while we wait for memory usage to be sampled
  var dummy = setTimeout(function () {}, 10000)

  var stream = memoryUsage({freq: 50, ts: true})

  stream.once('data', function (obj) {
    t.ok(obj.rss)
    t.ok(obj.heapTotal)
    t.ok(obj.heapUsed)
    t.ok(obj.ts)
    t.notOk('gc' in obj)
    clearTimeout(dummy)
    t.end()
  })
})

test('options.gc', function (t) {
  // ensure tape doesn't end while we wait for memory usage to be sampled
  var dummy = setTimeout(function () {}, 10000)

  var stream = memoryUsage({freq: 50, gc: true})

  stream.once('data', function (obj) {
    t.ok(obj.rss)
    t.ok(obj.heapTotal)
    t.ok(obj.heapUsed)
    t.notOk('ts' in obj)
    t.equal(obj.gc, null)
    clearTimeout(dummy)
    t.end()
  })
})
