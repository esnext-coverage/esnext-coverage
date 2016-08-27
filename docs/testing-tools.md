# Usage with testing tools

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

:warning: (not implemented) Then add esnext-coverage options to `package.json` or `.esnext-coverage.json` configuration file:

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
