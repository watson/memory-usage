'use strict'

var EOL = require('os').EOL

module.exports = memoryUsage

function memoryUsage (out, opts) {
  if (!opts) return memoryUsage(out, {})

  var timer = setInterval(sample, opts.freq || 5000).unref()

  return stop

  function sample () {
    var usage = process.memoryUsage()
    out.write(usage.rss + ',' + usage.heapTotal + ',' + usage.heapUsed + EOL)
  }

  function stop () {
    clearInterval(timer)
  }
}
