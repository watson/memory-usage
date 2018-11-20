#!/usr/bin/env node
'use strict'

require('./register.js')

process.argv.splice(1, 1)

var filename = path.resolve(process.argv[1])

require(filename)
