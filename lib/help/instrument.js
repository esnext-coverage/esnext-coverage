/* eslint-disable no-template-curly-in-string */

/**
 * Outputs help for the instrument command.
 * @return {undefined} Nothing is returned.
 */
module.exports = function outputInstrumentHelp() {
  const chalk = require('chalk');
  console.log([
    '  Examples:\n',
    chalk.dim('  Instrument a file and write output to stdout:'),
    '  esnext-coverage instrument foo.js\n',
    chalk.dim('  Take code from stdin, instrument it, and write output to stdout:'),
    '  cat foo.js | esnext-coverage instrument\n',
    chalk.dim('  Instrument a file and write output to a file in existing directory:'),
    '  esnext-coverage instrument foo.js > foo.instrumented.js\n',
    chalk.dim('  Instrument a file and write output to a file in a new directory,'),
    chalk.dim('  intermediate directories will be created as required (same as mkdir -p):'),
    '  esnext-coverage instrument foo.js -o a/b/c/foo.instrumented.js\n',
    chalk.dim('  Instrument multiple files:'),
    '  for file in src/**/*.js; do',
    '    esnext-coverage instrument "$file" -o ${file/src/dest}',
    '  done'
  ].join('\n  '));
};
