function interopRequire(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

module.exports = function write(coverage, options) {
  var fs = require('fs');
  var path = require('path');
  var mkdirp = require('mkdirp');
  var format = options.format ?
    interopRequire(require('esnext-coverage-format-' + options.format)).default :
    JSON.stringify;
  var fullPath;
  var dirName;

  if (options.outFile) {
    fullPath = path.resolve(options.outFile);
    dirName = path.dirname(fullPath);
    mkdirp.sync(dirName);
    fs.writeFileSync(fullPath, format(coverage), 'utf8'); // eslint-disable-line no-sync
  } else {
    console.log(format(__coverage__));
  }
};
