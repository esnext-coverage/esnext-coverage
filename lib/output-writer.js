function interopRequire(obj) {
  return obj && obj.__esModule ? obj : {default: obj}; // eslint-disable-line no-underscore-dangle
}

module.exports = function write(coverage, options) {
  const fs = require('fs');
  const path = require('path');
  const mkdirp = require('mkdirp');
  const format = options.format ?
    interopRequire(require(`esnext-coverage-format-${options.format}`)).default :
    JSON.stringify;

  if (options.outFile) {
    const fullPath = path.resolve(options.outFile);
    const dirName = path.dirname(fullPath);
    mkdirp.sync(dirName);
    fs.writeFileSync(fullPath, format(coverage), 'utf8'); // eslint-disable-line no-sync
  } else {
    console.log(format(__coverage__));
  }
};
