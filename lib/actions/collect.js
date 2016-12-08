'use strict';

/**
 * A `collect` command to run instrumented code and output code coverage.
 * @param {String} filesGlob – Files match glob.
 * @param {Object} options – Command options.
 * @param {String} options.outFile – Destination file for coverage data.
 * @param {String} [options.formatter] – Coverage data formatter.
 * @return {undefined} Nothing is returned.
 * @example
 *  # Take all .js files from "instrumented" folder, run them,
 *  # and write coverage data to "coverage.json" file:
 *  collectAction('instrumented/*.js', {outFile: 'coverage.json'});
 */
module.exports = function collectAction(filesGlob, options) {
  var path = require('path');
  var glob = require('glob');
  var chalk = require('chalk');
  var write = require('../output-writer');

  require('babel-register');

  glob(filesGlob, function (globErr, files) {
    if (globErr) {
      console.error(chalk.red('Failed to glob ' + filesGlob));
      console.error(globErr);
      process.exit(1);
    }
    files.forEach(function (file) {
      require(path.resolve(file));
    });
  });

  process.on('beforeExit', function () {
    if (typeof __coverage__ !== 'object') {
      console.error(chalk.red('Failed to generate coverage.'));
      process.exit(1);
    }
    write(__coverage__, options);
  });
};
