'use strict'

var from = require('from2')
var profiler = require('gc-profiler')

module.exports = memoryUsage

function memoryUsage (freq) {
  var gcSample = null
  var lastScheduledSample = 0
  freq = freq || 5000

  var stream = from.obj(function (size, next) {
    if (gcSample) {
      var result = gcSample
      gcSample = null // set to null before calling next
      next(null, result)
    } else {
      var ms = freq - (Date.now() - lastScheduledSample)
      setTimeout(function () {
        var obj = process.memoryUsage()
        obj.ts = lastScheduledSample = Date.now()
        obj.gc = null
        next(null, obj)
      }, ms).unref()
    }
  })

  stream.once('resume', function () {
    profiler.on('gc', function (info) {
      gcSample = process.memoryUsage()
      gcSample.ts = Date.now()
      gcSample.gc = info.type
    })
  })

  return stream
}
