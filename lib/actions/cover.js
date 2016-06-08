/**
 * A `cover` command to instrument, run, and output code coverage.
 * @param {String} filesGlob – Files match glob.
 * @param {Object} options – Command options.
 * @param {String} options.outFile – Destination file for coverage data.
 * @param {String} [options.formatter] – Coverage data formatter.
 * @return {undefined} Nothing is returned.
 * @example
 *  # Take all .js files from "app" folder, instrument them, run them,
 *  # and write coverage data to "coverage.json" file:
 *  coverAction('app/*.js', {outFile: 'coverage.json'});
 */
module.exports = function coverAction(filesGlob, options) {
  var path = require('path');
  var glob = require('glob');
  var chalk = require('chalk');
  var babelRegister = require('babel-register');
  var babelConfig = require('../babel-config');
  var writeAndExit = require('../output-writer');

  babelRegister(babelConfig.extendExistingBabelConfig(filesGlob));

  glob(filesGlob, function (globErr, files) {
    if (globErr) {
      console.error(chalk.red('Failed to find files using glob "' + filesGlob + '".'));
      console.error(chalk.gray(globErr));
      process.exit(1);
    }
    files.forEach(function (file) {
      // TODO: use a different approach to running third-party code
      require(path.resolve(file));
    });
  });

  process.on('beforeExit', function (exitCode) {
    if (typeof __coverage__ !== 'object') {
      console.error(chalk.red('Failed to generate coverage.'));
      process.exit(1);
    }
    writeAndExit(exitCode, __coverage__, options);
  });
};
