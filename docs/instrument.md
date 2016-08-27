# esnext-coverage instrument

```sh
Usage: instrument [options] [file]

instruments code

Options:

  -h, --help             output usage information
  -o, --out-file [file]  write instrumented code to a file
```

## Examples

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

Instrument multiple files:

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
