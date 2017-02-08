'use strict'

var from = require('from2')

module.exports = memoryUsage

function memoryUsage (opts) {
  if (!opts) return memoryUsage({})
  else if (Number.isFinite(opts)) return memoryUsage({freq: opts})
  else if (!opts.freq) opts.freq = 5000

  var gcSample = null
  var lastScheduledSample = 0

  var stream = from.obj(function (size, next) {
    if (gcSample) {
      var result = gcSample
      gcSample = null // set to null before calling next
      next(null, result)
    } else {
      var ms = opts.freq - (Date.now() - lastScheduledSample)
      setTimeout(measure, ms, next).unref()
    }
  })

  if (opts.gc) {
    var profiler = require('gc-profiler')

    stream.once('resume', function () {
      profiler.on('gc', function (info) {
        gcSample = process.memoryUsage()
        if (opts.ts) gcSample.ts = Date.now()
        gcSample.gc = info.type
      })
    })
  }

  return stream

  function measure (cb) {
    var obj = process.memoryUsage()
    lastScheduledSample = Date.now()
    if (opts.ts) obj.ts = lastScheduledSample
    if (opts.gc) obj.gc = null
    cb(null, obj)
  }
}
