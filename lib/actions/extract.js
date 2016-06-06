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
