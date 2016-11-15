'use strict'

var from = require('from2')

module.exports = memoryUsage

function memoryUsage (freq) {
  return from.obj(function (size, next) {
    setTimeout(function () {
      var obj = process.memoryUsage()
      obj.ts = Date.now()
      next(null, obj)
    }, freq || 5000).unref()
  })
}
