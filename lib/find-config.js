/* eslint no-sync: 0 */

'use strict';

var fs = require('fs');
var path = require('path');

// TODO: use cosmiconfig or similar library, but with synchronous API
module.exports = function findConfig(name) {
  try {
    // Attempt to read configuration from .{name}rc file:
    return JSON.parse(fs.readFileSync(path.resolve('.' + name + 'rc'), 'utf8'));
  } catch (rcErr) {
    try {
      // Attempt to require configuration from .{name}.js file:
      return require(path.resolve('.' + name + '.js'));
    } catch (jsErr) {
      try {
        // Attempt to read configuration from `name` property in package.json:
        return JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf8'))[name];
      } catch (pkgErr) {
        return {};
      }
    }
  }
};
