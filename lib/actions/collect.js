module.exports = function collectAction(filesGlob, options) {
  var path = require('path');
  var glob = require('glob');
  var chalk = require('chalk');
  var writeAndExit = require('../output-writer');

  require('babel-register');

  glob(filesGlob, function (globErr, files) {
    if (globErr) {
      console.error(chalk.red(`Failed to glob ${filesGlob}`));
      console.error(globErr);
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
