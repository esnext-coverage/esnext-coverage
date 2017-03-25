/* eslint-disable no-template-curly-in-string */

/**
 * Outputs help for the `format` command.
 * @return {undefined} Nothing is returned.
 */
module.exports = function outputInstrumentHelp() {
  const chalk = require('chalk');
  console.log([
    '  Examples:\n',
    chalk.dim('  Read coverage data from a file, format it as HTML,'),
    chalk.dim('  and write output to stdout:'),
    '  esnext-coverage format coverage.json -f html\n',
    chalk.dim('  Read coverage data from stdin, format it as HTML,'),
    chalk.dim('  and write output to stdout:'),
    '  cat coverage.json | esnext-coverage format -f html\n',
    chalk.dim('  Read coverage data from a file, format it as HTML,'),
    chalk.dim('  and write output to a file in existing directory:'),
    '  esnext-coverage format coverage.json -f html > coverage.html\n',
    chalk.dim('  Read coverage data from a file, format it as HTML,'),
    chalk.dim('  and write output to a file in a new directory,'),
    chalk.dim('  creating intermediate directories as required:'),
    '  esnext-coverage format coverage.json -f html -o a/b/c/coverage.html\n',
    chalk.dim('  Format multiple files as HTML:'),
    '  for file in reports/coverage/*.json; do',
    '    esnext-coverage format "$file" -f html -o ${file/json/html}',
    '  done'
  ].join('\n  '));
};
