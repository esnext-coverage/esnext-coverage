/**
 * Interoperability with ES6 modules.
 * @param {Object} obj - Exports.
 * @return {Object} exports normalized.
 */
function interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Generates a full formatter name.
 * @param {String} formatterName - Formatter's short, user-friendly name.
 * @return {String} Full requireable formatter's name.
 */
exports.generateFormatterName = function generateFormatterName(formatterName) {
  return 'esnext-coverage-format-' + formatterName;
};

/**
 * Requires a formatter module, interops with ES6 modules.
 * @param {String} formatterNameFull - Full requirable formatter's name.
 * @return {Function} Formatter.
 */
exports.requireFormatter = function requireFormatter(formatterNameFull) {
  return interopRequireDefault(require(formatterNameFull)).default;
};
