/* eslint-disable no-sync */

/**
 * Writes arbitrary text to a file.
 * Intermediate directories are created as required.
 * @param {String} text – Arbitrary text to write.
 * @param {String} outputFilePath – Relative path to the file.
 * @return {undefined} Nothing is returned.
 */
module.exports = function writeToFile(text, outputFilePath) {
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
    fs.writeFileSync(outputFilePathFull, text, 'utf8');
  } catch (writeFileError) {
    console.error('\n' + chalk.red(`Failed to write to file ${outputFilePathFull}`) + '\n');
    throw new Error(writeFileError);
  }
};
