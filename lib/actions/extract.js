/**
 * An `extract` command which formats coverage data with a given formatter.
 * @param {String} coverageFile – Coverage file path.
 * @param {Object} options – Command options.
 * @param {String} options.outFile – Destination file for coverage data.
 * @param {String} options.formatter – Coverage data formatter.
 * @return {undefined} Nothing is returned.
 * @example
 *  # Take a coverage.json file, format it as HTML,
 *  # and write report to "report.html" file:
 *  extractAction('coverage.json', {formatter: 'html', outFile: 'report.html'});
 */
module.exports = function extractAction(coverageFile, options) {
  var fs = require('fs');
  var path = require('path');
  var chalk = require('chalk');
  var writeAndExit = require('../output-writer');

  var coverageFilePath = path.resolve(coverageFile);
  fs.readFile(coverageFilePath, 'utf8', function (fileReadErr, coverageJSON) {
    var coverage;
    if (fileReadErr) {
      throw new Error('Failed to read coverage file.');
    }

    try {
      coverage = JSON.parse(coverageJSON);
    } catch (jsonParseError) {
      console.error(chalk.red('Syntax error in coverage file.'));
      console.error(chalk.gray(jsonParseError));
      process.exit(1);
    }

    writeAndExit(0, coverage, options);
  });
};
