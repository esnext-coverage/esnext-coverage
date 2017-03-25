/**
 * Collects coverage data from the instrumented source.
 * @param {String} filePath – Relative path of a file to collect from.
 * @param {Object} options – Command options.
 * @param {String} options.outFile – Destination file.
 * @return {undefined}
 * @example
 *  # Run an instrumented foo.js file, collect coverage data,
 *  # and write the result to "coverage.json" file:
 *  collectAction('foo.js', {outFile: 'coverage.json'});
 */
module.exports = function collectAction(filePath, options = {}) {
  const chalk = require('chalk');
  const writeToFile = require('../write-to-file');

  process.once('exit', function () {
    if (typeof __coverage__ !== 'object') {
      console.error(chalk.red('Failed to generate coverage.'));
      process.exit(1);
    }

    if (options.outFile) {
      writeToFile(JSON.stringify(__coverage__), options.outFile);
    } else {
      process.stdout.write(JSON.stringify(__coverage__));
    }
  });

  if (filePath) {
    require(filePath);
  } else {
    const readFromStdin = require('../read-from-stdin');
    readFromStdin(function readFromStdinCallback(code) {
      module._compile(code, ''); // eslint-disable-line no-underscore-dangle
    });
  }
};
