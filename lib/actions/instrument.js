/* eslint-disable no-sync */

/**
 * Generates custom options for babel transform.
 * @param  {String} [filename] –
 * @return {[type]}          [description]
 */
function generateBabelOptions(filename) {
  var babelConfig = require('../babel-config');
  return babelConfig.extendBabelConfig({
    code: true,
    ast: false,
    filename: filename || 'unknown'
  });
}

/**
 * Writes instrumented code to a file.
 * Intermediate directories are created as required.
 * @param {String} code – Code to write.
 * @param {String} outputFilePath – Relative path to the file.
 * @return {undefined} Nothing is returned.
 */
function writeToFile(code, outputFilePath) {
  var fs = require('fs');
  var path = require('path');
  var chalk = require('chalk');
  var mkdirp = require('mkdirp');

  var outputFilePathFull = path.resolve(outputFilePath);
  var outputFilePathDir = path.dirname(outputFilePathFull);

  try {
    mkdirp.sync(outputFilePathDir);
  } catch (mkdirpError) {
    console.error('\n' + chalk.red(`Failed to create directory ${outputFilePathDir}`) + '\n');
    throw new Error(mkdirpError);
  }

  try {
    fs.writeFileSync(outputFilePathFull, code, 'utf8');
  } catch (writeFileError) {
    console.error('\n' + chalk.red(`Failed to write transformed file ${outputFilePathFull}`) + '\n');
    throw new Error(writeFileError);
  }
}

/**
 * Read code from given file path, instrument it, and output to stdout or to a file.
 * @param {String} filePath – Path to a file to instrument.
 * @param {String} outputFilePath – Destination file path for the instrumented code.
 * @return {undefined} Nothing is returned.
 */
function instrumentFile(filePath, outputFilePath) {
  var path = require('path');
  var chalk = require('chalk');
  var babel = require('babel-core');

  var inputFilePathFull = path.resolve(filePath);
  var babelOptions = generateBabelOptions(inputFilePathFull);
  var result;

  try {
    result = babel.transformFileSync(inputFilePathFull, babelOptions);
  } catch (babelError) {
    console.error('\n' + chalk.red('Failed to transform file ' + inputFilePathFull) + '\n');
    throw new Error(babelError);
  }

  if (outputFilePath) {
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
  var chalk = require('chalk');
  var babel = require('babel-core');

  var babelOptions = generateBabelOptions();
  var result;

  try {
    result = babel.transform(code, babelOptions);
  } catch (babelError) {
    console.error('\n' + chalk.red('Failed to transform code from stdin') + '\n');
    throw new Error(babelError);
  }

  if (outputFilePath) {
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
module.exports = function instrumentAction(filePath, options) {
  var readFromStdin;

  options = options || {};

  if (filePath) {
    instrumentFile(filePath, options.outFile);
  } else {
    readFromStdin = require('../read-from-stdin');
    readFromStdin(function readFromStdinCallback(code) {
      instrumentCode(code, options.outFile);
    });
  }
};
