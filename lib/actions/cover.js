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
      console.error(chalk.red('Failed to find files.'));
      console.error(chalk.gray(globErr));
      process.exit(1);
    }
    files.forEach(function (file) {
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
