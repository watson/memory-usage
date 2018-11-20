'use strict'

// This file can be loaded with --require.

var path = require('path')
var pump = require('pump')
var chart = require('chart-stream')
var csvWriter = require('csv-write-stream')
var opn = require('opn')
var memoryUsage = require('./')

pump(
  memoryUsage(2000),
  csvWriter(),
  chart(opn)
)
