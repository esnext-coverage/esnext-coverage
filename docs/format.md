# esnext-coverage format

```sh
Usage: format [options] [file]

formats coverage data

Options:

  -h, --help                   output usage information
  -f, --formatter [formatter]  formatter to use
  -o, --out-file [file]        write the result to a file
```

## Examples

Read coverage data from a file, format it as HTML, and write output to stdout:

```sh
esnext-coverage format coverage.json -f html
```

Read coverage data from stdin, format it as HTML, and write output to stdout:

```sh
cat coverage.json | esnext-coverage format -f html
```

Read coverage data from a file, format it as HTML, and write output to a file in existing directory:

```sh
esnext-coverage format coverage.json -f html > coverage.html
```

Read coverage data from a file, format it as HTML, and write output to a file in a new directory, creating intermediate directories as required:

```sh
esnext-coverage format coverage.json -f html -o a/b/c/coverage.html
```

Format multiple files as HTML:

```sh
for file in reports/coverage/*.json; do
  esnext-coverage format "$file" -f html -o ${file/json/html}
done
```
