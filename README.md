# esnext-coverage

**Modular coverage tools for the modern web.**

:warning: This is a work in progress. The API is not final, some CLI commands are not implemented and relevant repositories have not been migrated to esnext-coverage organization yet.

esnext-coverage has been inspired by [Adana](https://github.com/adana-coverage).

## CLI usage

```sh
Usage: esnext-coverage [options] [command]

Commands:

  cover [options] <files>
  instrument [options] <file>
  collect [options] [files]
  extract [options] [coverage]

Options:

  -h, --help     output usage information
  -V, --version  output the version number
```

### cover

Instrument and run files, collect and output code coverage:

```sh
find *.js | esnext-coverage cover > coverage.json
```

```sh
esnext-coverage cover *.js -o coverage.json
```

Instrument and run files, collect code coverage data, and generate an HTML report:

```sh
find *.js | esnext-coverage cover -f html > coverage.html
```

```sh
esnext-coverage cover *.js -f html -o coverage.html
```

### `instrument`

```sh
Usage: instrument [options] [file]

Takes file contents from stdin or a file path as argument,
instruments the file, and writes the instrumented code to stdout
or to a file if "-o, --out-file" option is provided.

Options:

  -h, --help             output usage information
  -o, --out-file [file]  write instrumented code to a file
```
#### `instrument` CLI usage

Instrument a file and write output to stdout:  
```sh
esnext-coverage instrument foo.js
```

Take code from stdin, instrument it, and write output to stdout:
```sh
cat foo.js | esnext-coverage instrument
```

Instrument a file and write output to a file in existing directory:
```sh
esnext-coverage instrument foo.js > foo.instrumented.js
```

Instrument a file and write output to a file in a new directory. Intermediate directories will be created as required (same as mkdir -p):

```sh
esnext-coverage instrument foo.js -o a/b/c/foo.instrumented.js
```

To instrument multiple files use:

```sh
find src -name '*.js' -type f | \
  while IFS= read -r file; do
    esnext-coverage instrument "$file" -o ${file/src/dest}
  done
```

A simpler way to instrument multiple files (requires globstar option and bash 4):
```sh
for file in src/{,**/}*.js; do
  esnext-coverage instrument "$file" -o ${file/src/dest}
done
```

### collect

Run instrumented files, collect and output code coverage data:

```sh
find *.js | esnext-coverage collect > coverage.json
```

```sh
esnext-coverage collect *.js -o coverage.json
```

### extract

Extract data from the existing code coverage file, generate and output an HTML report:

```sh
cat coverage.json | esnext-coverage extract \
  -f html > coverage.html
```

```sh
esnext-coverage extract coverage.json \
  -f html -o coverage.html
```

## Usage with Mocha

:warning: Interoperability with Mocha and other testing tools is a work in progress.

First, configure your `.babelrc` to use environment variables:

```json
{
  "env": {
    "test": {
      "plugins": [
        "esnext-coverage"
      ]
    }
  }
}
```

Then add esnext-coverage options to `package.json` or `.esnext-coverage.json` configuration file:

```json
{
  "reportDir": "reports/coverage",
  "reporters": [
    {"formatter": "html", "outFile": "coverage.html"}
  ]
}
```

Finally, require esnext-coverage when running mocha:

```sh
NODE_ENV="test" mocha \
  --require esnext-coverage \
  --compilers js:babel-register \
  *.spec.js
```

## License

[MIT License](http://opensource.org/licenses/MIT)
