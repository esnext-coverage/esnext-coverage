/* eslint-disable no-sync */

/**
 * Generates custom options for babel transform.
 * @param  {String} [filename] – Name of instrumented file.
 * @return {Object} Babel configuration.
 */
function generateBabelOptions(filename) {
  const extendBabelConfig = require('../extend-babel-config');
  return extendBabelConfig({
    code: true,
    ast: false,
    filename: filename || 'unknown'
  });
}

/**
 * Read code from given file path, instrument it, and output to stdout or to a file.
 * @param {String} filePath – Path to a file to instrument.
 * @param {String} outputFilePath – Destination file path for the instrumented code.
 * @return {undefined} Nothing is returned.
 */
function instrumentFile(filePath, outputFilePath) {
  const path = require('path');
  const babel = require('babel-core');

  const inputFilePathFull = path.resolve(filePath);
  const babelOptions = generateBabelOptions(inputFilePathFull);
  let result;

  try {
    result = babel.transformFileSync(inputFilePathFull, babelOptions);
  } catch (babelError) {
    const chalk = require('chalk');
    const message = chalk.red(`Failed to transform file ${inputFilePathFull}`);
    console.error(`\n${message}\n`);
    throw new Error(babelError);
  }

  if (outputFilePath) {
    const writeToFile = require('../write-to-file');
    writeToFile(result.code, outputFilePath);
  } else {
    process.stdout.write(result.code);
  }
}

/**
 * Instrument and output given code to stdout or to a file.
 * @param {String} code – Code to instrument.
 * @param {String} outputFilePath – Destination file path for the instrumented code.
 * @return {undefined} Nothing is returned.
 */
function instrumentCode(code, outputFilePath) {
  const babel = require('babel-core');

  const babelOptions = generateBabelOptions();
  let result;

  try {
    result = babel.transform(code, babelOptions);
  } catch (babelError) {
    const chalk = require('chalk');
    const message = chalk.red('Failed to transform code from stdin');
    console.error(`\n${message}\n`);
    throw new Error(babelError);
  }

  if (outputFilePath) {
    const writeToFile = require('../write-to-file');
    writeToFile(result.code, outputFilePath);
  } else {
    process.stdout.write(result.code);
  }
}

/**
 * An `instrument` command to instrument and output instrumented code.
 * @param {String} filePath – Relative path of a file to instrument.
 * @param {Object} options – Command options.
 * @param {String} options.outFile – Destination directory for instrumented files.
 * @return {undefined} Nothing is returned.
 * @example
 *  // Take "src/app.js" file, instrument it, and write to "instrumented/app.js" file:
 *  instrumentAction('src/app.js', {outFile: 'instrumented/app.js');
 */
module.exports = function instrumentAction(filePath, options = {}) {
  if (filePath) {
    instrumentFile(filePath, options.outFile);
  } else {
    const readFromStdin = require('../read-from-stdin');
    readFromStdin(function readFromStdinCallback(code) {
      instrumentCode(code, options.outFile);
    });
  }
};
