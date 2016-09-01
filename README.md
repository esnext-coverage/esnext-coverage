# esnext-coverage

**Modular coverage tools for the modern web.**

:warning: This is a work in progress. The API is not final, some CLI commands are not implemented and relevant repositories have not been migrated to esnext-coverage organization yet.

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

## CLI usage

```sh
Usage: esnext-coverage [options] [command]

Commands:

  instrument [options] [file]  instruments code
  collect [options] [files]
  format [options] [file]      formats coverage data

Options:

  -h, --help     output usage information
  -V, --version  output the version number
```

### [`instrument`](docs/instrument.md)

Reads code from stdin or from a file, instruments it, and writes the instrumented code to stdout or to a file.

### [`collect`](docs/collect.md)

Runs instrumented files, collects and outputs code coverage data.  
:warning: `collect` API is a work in progress.

### [`format`](docs/format.md)

Transforms coverage data to the specified format.

## Prior art

esnext-coverage has been inspired by [Adana](https://github.com/adana-coverage).

## License

[MIT License](http://opensource.org/licenses/MIT)


[tape]: https://github.com/substack/tape
[mocha]: https://github.com/mochajs/mocha
[jasmine]: https://github.com/jasmine/jasmine
