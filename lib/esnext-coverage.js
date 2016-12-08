'use strict';

var babelRegister = require('babel-register');
var writeToFile = require('./write-to-file');
var findConfig = require('./find-config');
var extendBabelConfig = require('./extend-babel-config');
var formatterHelper = require('./formatter-helper');

var babelConfig = findConfig('babel');
var esnextcoverageConfig = findConfig('esnextcoverage');

babelRegister(extendBabelConfig(babelConfig, {
  only: esnextcoverageConfig.only
}));

process.once('exit', function () {
  var reporters = esnextcoverageConfig.reporters || [{outFile: 'coverage/coverage.json'}];

  if (typeof __coverage__ !== 'object') {
    console.error('Failed to generate coverage.');
    return;
  }

  reporters.forEach(function (reporter) {
    var formatter = formatterHelper.determineFormatter(reporter.formatter);
    var formattedCoverage = formatter(__coverage__, esnextcoverageConfig);

    if (reporter.console) {
      console.log(formattedCoverage);
    }

    if (typeof reporter.outFile === 'string') {
      writeToFile(formattedCoverage, reporter.outFile);
    }
  });
});
