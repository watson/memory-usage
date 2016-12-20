# memory-usage

A readable stream that samples and emits memory usage over time.

You can for instance use the output to graph your memory usage.

Can also be used from the command line to chart the memory usage of a
Node.js app directly in a web browser.

[![Build status](https://travis-ci.org/watson/memory-usage.svg?branch=master)](https://travis-ci.org/watson/memory-usage)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Installation

For CLI usage:

```
npm install memory-usage -g
```

For programmatic usage:

```
npm install memory-usage --save
```

## CLI Usage Example

Use the `memory-usage` command instead of the `node` command:

```
memory-usage server.js
```

The memory usage of `server.js` will now be displayed live in your default web browser:

![chart](https://cloud.githubusercontent.com/assets/10602/20244560/99a7e1e4-a9ca-11e6-809f-0370491106ad.png)

## Programmatic Usage Example

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

### `stream = memoryUsage([freq|options])`

Will start sampling memory usage every `freq` milliseconds (defaults to
`5000`) as soon as the stream is flowing.

The optional `options` object expects the following properties:

- `freq` - The sampling frequency in milliseconds (defaults to `5000`)
- `ts` - A boolean specifying if a timestamp should be outputtet along
  with the memory samples (defaults to `false`)
- `gc` - A boolean specifying if garbage collection should be profiled
  and logged along with the memory samples (defaults to `false`)

The stream emits samples in the form of JavaScript objects:

```js
{
  rss: 4935680,       // Resident set size: Memory assigned to the process in bytes
  heapTotal: 1826816, // V8 heap memory allocated in bytes
  heapUsed: 650472,   // V8 heap memory used in bytes
  ts: 1479179912921,  // UNIX epoch timestamp for sample in milliseconds (only present if `optsions.ts` is `true`)
  gc: null            // Indicates if sample was taken after a garbage collection run (only present if `options.gc` is `true`)
}
```

If the `gc` property is `null`, it means that the sample wasn't taken
after a garbage collection run. If the value is a string, it will
indicate the type of garbage collection run. Currently, the values can
be either `Scavenge` or `MarkSweepCompact`.

Note that samples indicating a garbage collection run might be a few
hundred milliseconds delayed. This means that you might see a regular
timed sample appear prior in the stream with reduced memory usage, even
though there's no official indication of a garbage collection run yet.

## License

MIT
