# esnext-coverage

**Modular coverage tools for the modern web.**

:warning: This is a work in progress. The API is not final, some CLI commands are not implemented and relevant repositories have not been migrated to esnext-coverage organization yet.

esnext-coverage has been inspired by [Adana](https://github.com/adana-coverage).

## CLI usage

```sh
Usage: esnext-coverage [options] [command]

Commands:

  instrument [options] [file]  instruments code
  collect [options] [files]
  format [options] [file]      transforms coverage data to specified format

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

## [Usage with test frameworks](docs/testing-tools.md)

:warning: Interoperability with test frameworks (Tape, Mocha, ...) is a work in progress.

## License

[MIT License](http://opensource.org/licenses/MIT)
