#!/usr/bin/env node
'use strict'

var path = require('path')
var pump = require('pump')
var chart = require('chart-stream')
var csvWriter = require('csv-write-stream')
var open = require('open')
var memoryUsage = require('./')

pump(
  memoryUsage(2000),
  csvWriter(),
  chart(open)
)

process.argv.splice(1, 1)

var filename = path.resolve(process.argv[1])

require(filename)
