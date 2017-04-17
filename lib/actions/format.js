/* eslint-disable no-sync */

/**
 * Attempts to parse JSON-stringified coverage data.
 * @param {String} coverage - Text to parse.
 * @throws {Error} jsonParseError if failed to parse coverage.
 * @return {Object} Coverage data.
 */
function tryToParseJSON(coverage) {
  try {
    return JSON.parse(coverage);
  } catch (jsonParseError) {
    const chalk = require('chalk');
    const message = chalk.red('Failed to parse coverage data');
    console.error(`\n${message}\n`);
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
  const formatterHelper = require('../formatter-helper');
  try {
    return formatterHelper.determineFormatter(formatterName || 'json');
  } catch (findFormatterError) {
    const chalk = require('chalk');
    const message = chalk.red(`Unable to find ${formatterName} formatter`);
    const formatterNameFull = formatterHelper.generateFormatterName(formatterName);
    const suggestion = `Try: npm install ${formatterNameFull}`;
    console.error(`\n${message}\n${suggestion}\n`);
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
function tryToFormatText(text, {formatter, outFile}) {
  const writeToFile = require('../write-to-file');

  const {coverage, options} = tryToParseJSON(text);
  const format = tryToFindFormatter(formatter);

  let formatResult;
  try {
    formatResult = format(coverage, options);
  } catch (formatterError) {
    const chalk = require('chalk');
    const message = chalk.red('Failed to format');
    console.error(`\n${message}\n`);
    throw new Error(formatterError);
  }

  if (outFile) {
    writeToFile(formatResult, outFile);
  } else {
    process.stdout.write(formatResult);
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
  const fs = require('fs');
  const path = require('path');

  const inputFilePathFull = path.resolve(inputFilePath);
  let inputFileContents;

  try {
    inputFileContents = fs.readFileSync(inputFilePathFull, 'utf8');
  } catch (inputFileReadError) {
    const chalk = require('chalk');
    const message = chalk.red(`Failed to read file ${inputFilePathFull}`);
    console.error(`\n${message}\n`);
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
  options = options || {};
  if (filePath) {
    tryToFormatFile(filePath, options);
  } else {
    const readFromStdin = require('../read-from-stdin');
    readFromStdin(function readFromStdinCallback(coverage) {
      tryToFormatText(coverage, options);
    });
  }
};
