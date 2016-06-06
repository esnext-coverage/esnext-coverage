exports.findBabelConfig = function () {
  var fs = require('fs');
  var path = require('path');
  // TODO: need to check the package.json config as well
  var babelrc = fs.readFileSync(path.resolve('.babelrc'), 'utf8');
  return JSON.parse(babelrc);
};

exports.extendBabelConfig = function (babelConfig, glob) {
  var pluginConfig = ['transform-esnext-coverage', {only: glob}];

  // Prepend esnext-coverage transform plugin:
  if (babelConfig.plugins) {
    babelConfig.plugins.unshift(pluginConfig);
  } else {
    babelConfig.plugins = [pluginConfig];
  }

  // Disable babelrc:
  babelConfig.babelrc = false;

  return babelConfig;
};

exports.extendExistingBabelConfig = function (glob) {
  return exports.extendBabelConfig(exports.findBabelConfig(), glob);
};
