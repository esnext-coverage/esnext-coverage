/**
 * Extends the given babel config custom options.
 * @param {Object} babelConfig - Babel configuration.
 * @param {Object} options – esnext-coverage plugin options.
 * @return {Object} Extended babel configuration.
 */
module.exports = function extendBabelConfig(babelConfig, options) {
  const pluginConfig = [
    require('babel-plugin-transform-esnext-coverage').default,
    options || {}
  ];

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
