# memory-usage

A readable stream that samples and emits memory usage over time.

You can for instance use the output to graph your memory usage.

[![Build status](https://travis-ci.org/watson/memory-usage.svg?branch=master)](https://travis-ci.org/watson/memory-usage)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Installation

```
npm install memory-usage --save
```

## Usage Example

Sample memory usage every 2 seconds and write it to a CSV file:

```js
var fs = require('fs')
var csvWriter = require('csv-write-stream')
var memoryUsage = require('memory-usage')

memoryUsage(2000)
  .pipe(csvWriter())
  .pipe(fs.createWriteStream('memory.csv'))
```

Note that you application of course have to do some actual work. If you
just run the example above as is, the node process will simply exit
after creating an empty file.

If you want to chart the memory usage, I recommend combining this module
with [chart-csv](https://github.com/watson/chart-csv).

## API

### `stream = memoryUsage([freq])`

Will start sampling memory usage every `freq` milliseconds (defaults to
`5000`) as soon as the stream is flowing.

The stream emits JavaScript objects of the following type:

```js
{
  rss: 4935680,
  heapTotal: 1826816,
  heapUsed: 650472
}
```

See
[`process.memoryUsage()`](https://nodejs.org/api/process.html#process_process_memoryusage)
for details of the format.

## License

MIT
