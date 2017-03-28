const babelRegister = require('babel-register');
const writeToFile = require('./write-to-file');
const findConfig = require('./find-config');
const extendBabelConfig = require('./extend-babel-config');
const formatterHelper = require('./formatter-helper');

const babelConfig = findConfig('babel');
const esnextcoverageConfig = findConfig('esnextcoverage') || {};

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
  const cleanConfig = Object.assign({}, config);
  delete cleanConfig.reporters;
  delete cleanConfig.thresholds;
  return cleanConfig;
}

babelRegister(extendBabelConfig(babelConfig, cleanupConfig(esnextcoverageConfig)));

process.once('exit', function () {
  const reporters = esnextcoverageConfig.reporters || [
    {
      formatter: 'json',
      outFile: 'reports/coverage/coverage.json'
    }
  ];

  if (typeof __coverage__ !== 'object') {
    console.error('Failed to generate coverage.');
    return;
  }

  reporters.forEach(function (reporter) {
    const formatter = formatterHelper.determineFormatter(reporter.formatter || 'json');
    const formattedCoverage = formatter(__coverage__, esnextcoverageConfig);

    if (reporter.console) {
      console.log(formattedCoverage);
    }

    if (typeof reporter.outFile === 'string') {
      writeToFile(formattedCoverage, reporter.outFile);
    }
  });
});
