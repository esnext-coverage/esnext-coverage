/**
 * Interoperability with ES6 modules.
 * @param {Object} obj - Exports.
 * @return {Object} exports normalized.
 */
function interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj}; // eslint-disable-line no-underscore-dangle
}

/**
 * Default JSON formatter.
 * @param {Object} coverage - Compatible coverage data.
 * @param {Object} options - Formatting options.
 * @return {String} JSON-encoded string.
 */
function jsonFormatter(coverage, options) {
  return JSON.stringify({
    coverage,
    options: ['environment', 'thresholds'].reduce((result, key) => {
      if (options && Object.prototype.hasOwnProperty.call(options, key)) {
        result[key] = options[key];
      }
      return result;
    }, {})
  });
}

/**
 * Determines a formatter function from the given input.
 * @param {Function|String} formatter - Formatter function or its name.
 * @throws {TypeError} When formatter is invalid (undefined, null, ...).
 * @return {Function} Formatter.
 */
exports.determineFormatter = function determineFormatter(formatter) {
  if (typeof formatter !== 'function' && typeof formatter !== 'string') {
    throw new TypeError(`Invalid formatter: ${formatter}`);
  }

  if (typeof formatter === 'function') {
    return formatter;
  }

  return formatter === 'json' ?
    jsonFormatter :
    exports.requireFormatter(exports.generateFormatterName(formatter));
};

/**
 * Generates a full formatter name.
 * @param {String} formatterName - Formatter's short, user-friendly name.
 * @return {String} Full requireable formatter's name.
 */
exports.generateFormatterName = function generateFormatterName(formatterName) {
  return `esnext-coverage-format-${formatterName}`;
};

/**
 * Requires a formatter module, interops with ES6 modules.
 * @param {String} formatterNameFull - Full requirable formatter's name.
 * @return {Function} Formatter.
 */
exports.requireFormatter = function requireFormatter(formatterNameFull) {
  return interopRequireDefault(require(formatterNameFull)).default;
};
