/* eslint-disable no-sync */

'use strict';

/**
 * Attempts to parse JSON-stringified coverage data.
 * @param {String} coverage - Text to parse.
 * @throws {Error} jsonParseError if failed to parse coverage.
 * @return {Object} Coverage data.
 */
function tryToParseJSON(coverage) {
  var chalk = require('chalk');

  try {
    return JSON.parse(coverage);
  } catch (jsonParseError) {
    console.error('\n' + chalk.red('Failed to parse coverage data') + '\n');
    throw new Error(jsonParseError);
  }
}

/**
 * Attempts to find a formatter by name.
 * @param {String} formatterName - Name of formatter.
 * @throws {Error} findFormatterError if unable to find a formatter.
 * @return {Function} Formatter.
 */
function tryToFindFormatter(formatterName) {
  var chalk = require('chalk');
  var formatterNameFull;
  var formatterHelper;

  if (!formatterName) {
    return JSON.stringify;
  }

  try {
    formatterHelper = require('../formatter-helper');
    formatterNameFull = formatterHelper.generateFormatterName(formatterName);
    return formatterHelper.requireFormatter(formatterNameFull);
  } catch (findFormatterError) {
    console.error('\n' + chalk.red('Unable to find ' + formatterName + ' formatter'));
    console.error('Try: npm install ' + formatterNameFull + '\n');
    throw new Error(findFormatterError);
  }
}

/**
 * Attempts to format text.
 * @param {String} text – Text to format.
 * @param {Object} options – Command options.
 * @throws {Error} formatterError if specified formatter threw.
 * @return {undefined} Nothing is returned.
 */
function tryToFormatText(text, options) {
  var chalk = require('chalk');
  var writeToFile = require('../write-to-file');

  var coverage = tryToParseJSON(text);
  var formatter = tryToFindFormatter(options.formatter);

  try {
    coverage = formatter(coverage);
  } catch (formatterError) {
    console.error('\n' + chalk.red('Failed to format') + '\n');
    throw new Error(formatterError);
  }

  if (options.outFile) {
    writeToFile(coverage, options.outFile);
  } else {
    process.stdout.write(coverage);
  }
}

/**
 * Attempts to format a file.
 * @param {String} inputFilePath – Relative path of a file to format.
 * @param {Object} options – Command options.
 * @throws {Error} inputFileReadError if failed to read the specified file.
 * @return {undefined} Nothing is returned.
 */
function tryToFormatFile(inputFilePath, options) {
  var fs = require('fs');
  var path = require('path');
  var chalk = require('chalk');

  var inputFilePathFull = path.resolve(inputFilePath);
  var inputFileContents;

  try {
    inputFileContents = fs.readFileSync(inputFilePathFull, 'utf8');
  } catch (inputFileReadError) {
    console.error('\n' + chalk.red('Failed to read file ' + inputFilePathFull) + '\n');
    throw new Error(inputFileReadError);
  }

  tryToFormatText(inputFileContents, options);
}

/**
 * Formats coverage data with the given formatter.
 * @param {String} filePath – Relative path of a file to format.
 * @param {Object} options – Command options.
 * @param {String} options.formatter – Coverage data formatter.
 * @param {String} options.outFile – Destination directory for instrumented files.
 * @return {undefined}
 * @example
 *  # Take a coverage.json file, format it as HTML,
 *  # and write report to "report.html" file:
 *  formatAction('coverage.json', {formatter: 'html', outFile: 'report.html'});
 */
module.exports = function formatAction(filePath, options) {
  var readFromStdin;

  options = options || {};

  if (filePath) {
    tryToFormatFile(filePath, options);
  } else {
    readFromStdin = require('../read-from-stdin');
    readFromStdin(function readFromStdinCallback(coverage) {
      tryToFormatText(coverage, options);
    });
  }
};
