var chalk = require('chalk');
var write = require('./output-writer');

process.once('exit', function () {
  if (typeof __coverage__ !== 'object') {
    console.error(chalk.red('Failed to generate coverage.'));
    process.exit(1);
  }
  write(__coverage__, {
    outFile: 'coverage/coverage.json'
  });
});
