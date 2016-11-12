# memory-usage

Sample memory usage of your Node.js program and write the samples to a
stream.

This is really useful if you want to graph memory usage over time.

[![Build status](https://travis-ci.org/watson/memory-usage.svg?branch=master)](https://travis-ci.org/watson/memory-usage)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Installation

```
npm install memory-usage --save
```

## Usage

```js
var memoryUsage = require('memory-usage')

// sample every 2 seconds and output samples to STDOUT
memoryUsage(process.stdout, {freq: 2000})
```

## API

### `stop = memoryUsage(stream[, options])`

Start sampling memory usage every `options.freq` milliseconds (defaults
to `5000`).

The collected samples are written as CSV to the `stream`.

Returns a function that you can call if you wish to stop the sampling.

## License

MIT
