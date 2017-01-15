'use strict';

var babelRegister = require('babel-register');
var writeToFile = require('./write-to-file');
var findConfig = require('./find-config');
var extendBabelConfig = require('./extend-babel-config');
var formatterHelper = require('./formatter-helper');

var babelConfig = findConfig('babel');
var esnextcoverageConfig = findConfig('esnextcoverage') || {};

if (!esnextcoverageConfig.only && !esnextcoverageConfig.ignore) {
  // Before: ['/path/to/test-framework', '-r', 'esnext-coverage', 'test/foo.js', 'test/bar.js']
  // After: ['test/foo.js', 'test/bar.js']
  esnextcoverageConfig.ignore = process.argv.slice(
    process.argv.indexOf('esnext-coverage') + 1
  );
  // If using a default glob, like so: ['/path/to/test-framework', '-r', 'esnext-coverage']
  if (esnextcoverageConfig.ignore.length === 0) {
    // Then we use mocha's defaults: ['test/*.js']
    esnextcoverageConfig.ignore.push('test/*.js');
  }
}

function cleanupConfig(config) {
  var cleanConfig = Object.assign({}, config);
  delete cleanConfig.reporters;
  delete cleanConfig.thresholds;
  return cleanConfig;
}

babelRegister(extendBabelConfig(babelConfig, cleanupConfig(esnextcoverageConfig)));

process.once('exit', function () {
  var reporters = esnextcoverageConfig.reporters || [
    {
      formatter: JSON.stringify,
      outFile: 'reports/coverage/coverage.json'
    }
  ];

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
