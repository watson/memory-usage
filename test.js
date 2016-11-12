'use strict'

var test = require('tape')
var PassThrough = require('stream').PassThrough
var memoryUsage = require('./')

test('return a function', function (t) {
  var stop = memoryUsage(new PassThrough())
  t.equal(typeof stop, 'function')
  stop()
  t.end()
})

test('basic', function (t) {
  var out = new PassThrough()

  // ensure tape doesn't end while we wait for memory usage to be sampled
  var dummy = setInterval(function () {}, 10000)

  out.once('data', function (chunk) {
    t.equal(/^\d+,\d+,\d+\n$/.test(chunk.toString()), true)
    stop()
    out.on('data', function (chunk) {
      t.fail('should not output anyting after stop is called')
    })
    setTimeout(function () {
      clearTimeout(dummy)
      t.end()
    }, 100)
  })

  var stop = memoryUsage(out, {freq: 50})
})
