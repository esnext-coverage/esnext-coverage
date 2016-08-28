/* eslint no-sync: 0 */

var fs = require('fs');
var path = require('path');

// TODO: use cosmiconfig or similar library, but with synchronous API
module.exports = function findConfig(name) {
  try {
    // Attempt to read configuration from .babelrc file:
    return JSON.parse(fs.readFileSync(path.resolve('.' + name + 'rc'), 'utf8'));
  } catch (rcErr) {
    try {
      // Attempt to read configuration from `babel` property in package.json:
      return JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf8'))[name];
    } catch (pkgErr) {
      return {};
    }
  }
};
