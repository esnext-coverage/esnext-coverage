# esnext-coverage

[![NPM version](http://img.shields.io/npm/v/esnext-coverage.svg)](https://www.npmjs.org/package/esnext-coverage)

**Modular coverage tools for the modern web.**

## Installation

```sh
npm install --save-dev esnext-coverage
```

## Usage with test frameworks

See [esnext-coverage-examples](https://github.com/esnext-coverage/esnext-coverage-examples) repository for more details.

### [Tape]

Require esnext-coverage when running Tape:

```sh
tape -r esnext-coverage test/*.js
```

### [Mocha]

Require esnext-coverage when running Mocha:

```sh
mocha -r esnext-coverage test/*.js
```

### [Jasmine]

Replace babel-register with esnext-coverage in the list of Jasmine helpers:

```json
"helpers": [
  "../node_modules/esnext-coverage/lib/esnext-coverage.js"
]
```

## Options

The esnext-coverage configuration is an object that extends [Babel API options](https://babeljs.io/docs/usage/api/#options) with two additional properties:

### reporters

A reporter signature is an object containing `formatter` (`String` or `Function`, defaults to `JSON.stringify`), `console` (`Boolean`, defaults to `false`) and `outFile` (`String`, optional) properties.

When `formatter` is a `String`, esnext-coverage will attempt to ``require(`esnext-coverage-format-${formatter}`)`` similar to Babel requiring plugins.

```js
reporters: [
  // Format using esnext-coverage-format-text,
  // and write the formatted output to stdout:
  {formatter: 'text', console: true},
  // Format using esnext-coverage-format-html,
  // and write the formatted output to a file:
  {formatter: 'html', outFile: 'reports/coverage/coverage.html'},
  // Format using a custom formatter function,
  // and write the formatted output to a file:
  {formatter: myFormatter, outFile: 'reports/coverage/coverage.my'}
]
```

If reporters are not specified, a default reporter is used with `'json'` as formatter and `'reports/coverage/coverage.json'` file as output:

```js
reporters: [
  {formatter: 'json', outFile: 'reports/coverage/coverage.json'}
]
```

### thresholds

Both `global` and `local` properties are optional. No threshold is enforced by default.

```js
thresholds: {
  global: {
    statement: 100,
    branch: 100,
    function: 100,
    line: 100
  },
  local: {
    statement: 100,
    branch: 100,
    function: 100,
    line: 100
  }
}
```

## Configuration

Add an `"esnext-coverage": {...options}` entry in your `package.json` file or create either `.esnextcoverage.js` or `.esnextcoveragerc` file in the root of your project.

### package.json

```json
{
  "name": "my project",
  "version": "1.2.3",
  "esnext-coverage": {
    "only": "test/*.js",
    "reporters": [
      {"formatter": "text", "console": true}
    ]
  }
}
```

### .esnextcoverage.js

```js
module.exports = {
  only: 'test/*.js',
  reporters: [
    {formatter: 'text', console: true}
  ]
};
```

### .esnextcoveragerc

```json
{
  "only": "test/*.js",
  "reporters": [
    {"formatter": "text", "console": true}
  ]
}
```

## CLI usage

```sh
Usage: esnext-coverage [options] [command]

Commands:

  instrument [options] [file]  instruments code
  collect [options] [file]     collects coverage data
  format [options] [file]      formats coverage data

Options:

  -h, --help     output usage information
  -V, --version  output the version number
```

### [`instrument`](docs/instrument.md)

Reads code from stdin or from a file, instruments it, and writes the instrumented code to stdout or to a file.

### [`collect`](docs/collect.md)

Reads code from stdin or from a file, collects coverage data, and writes the result to stdout or to a file.

### [`format`](docs/format.md)

Transforms coverage data to the specified format.

## Prior art

esnext-coverage has been inspired by [Adana](https://github.com/adana-coverage).

## License

[MIT License](http://opensource.org/licenses/MIT)


[tape]: https://github.com/substack/tape
[mocha]: https://github.com/mochajs/mocha
[jasmine]: https://github.com/jasmine/jasmine
