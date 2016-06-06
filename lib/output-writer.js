function interopRequire(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

module.exports = function writeAndExit(exitCode, coverage, options) {
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
    mkdirp(dirName, function (mkdirErr) {
      if (mkdirErr) {
        process.exit(mkdirErr ? 1 : exitCode);
      }
      fs.writeFile(fullPath, format(coverage), 'utf8', function (fileWriteErr) {
        process.exit(fileWriteErr ? 1 : exitCode);
      });
    });
  } else {
    console.log(format(__coverage__));
    process.exit(exitCode);
  }

};
