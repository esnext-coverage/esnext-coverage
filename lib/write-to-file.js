/* eslint-disable no-sync */

function tryToCreateDirectorySync(outputFilePathDir) {
  const mkdirp = require('mkdirp');
  const chalk = require('chalk');
  try {
    mkdirp.sync(outputFilePathDir);
  } catch (mkdirpError) {
    const message = chalk.red(`Failed to create directory ${outputFilePathDir}`);
    console.error(`\n${message}\n`);
    throw new Error(mkdirpError);
  }
}

function tryToWriteFileSync(outputFilePathFull, text) {
  const fs = require('fs');
  const chalk = require('chalk');
  try {
    fs.writeFileSync(outputFilePathFull, text, 'utf8');
  } catch (writeFileError) {
    const message = chalk.red(`Failed to write to file ${outputFilePathFull}`);
    console.error(`\n${message}\n`);
    throw new Error(writeFileError);
  }
}

/**
 * Writes arbitrary text to a file.
 * Intermediate directories are created as required.
 * @param {String} text – Arbitrary text to write.
 * @param {String} outputFilePath – Relative path to the file.
 * @return {undefined} Nothing is returned.
 */
module.exports = function writeToFile(text, outputFilePath) {
  const path = require('path');
  const outputFilePathFull = path.resolve(outputFilePath);
  const outputFilePathDir = path.dirname(outputFilePathFull);

  tryToCreateDirectorySync(outputFilePathDir);
  tryToWriteFileSync(outputFilePathFull, text);
};
