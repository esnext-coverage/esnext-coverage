/* eslint-disable no-template-curly-in-string */

'use strict';

/**
 * Outputs help for the collect command.
 * @return {undefined} Nothing is returned.
 */
module.exports = function outputInstrumentHelp() {
  var chalk = require('chalk');
  console.log([
    '  Examples:\n',
    chalk.dim('  Collect coverage from file and write output to stdout:'),
    '  esnext-coverage collect instrumented.js\n',
    chalk.dim('  Take instrumented code from stdin and write output to stdout:'),
    '  cat instrumented.js | esnext-coverage collect\n',
    chalk.dim('  Collect coverage from file and write output to a file in existing directory:'),
    '  esnext-coverage collect instrumented.js > coverage.json\n',
    chalk.dim('  Collect coverage from file and write output to a file in a new directory,'),
    chalk.dim('  intermediate directories will be created as required (same as mkdir -p):'),
    '  esnext-coverage collect instrumented.js -o a/b/c/coverage.json\n',
    chalk.dim('  Collect coverage from multiple files:'),
    '  for file in instrumented/**/*.js; do',
    '    esnext-coverage collect "$file" -o ${file/js/json}',
    '  done'
  ].join('\n  '));
};
