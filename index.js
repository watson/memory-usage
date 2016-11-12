'use strict'

var from = require('from2')

module.exports = memoryUsage

function memoryUsage (freq) {
  return from.obj(function (size, next) {
    setTimeout(function () {
      next(null, process.memoryUsage())
    }, freq || 5000).unref()
  })
}
