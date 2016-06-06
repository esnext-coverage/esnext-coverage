/* eslint max-nested-callbacks: 1 */

module.exports = function instrumentAction(filesGlob, options) {
  var fs = require('fs');
  var path = require('path');
  var glob = require('glob');
  var mkdirp = require('mkdirp');
  var chalk = require('chalk');
  var babel = require('babel-core');
  var babelConfig = require('../babel-config');

  if (!options.outDir) {
    console.error(chalk.red(`\n  error: please specify ${chalk.underline('--out-dir')} option.\n`));
    process.exit(1);
  }

  mkdirp(options.outDir, function (mkdirpErr) {
    if (mkdirpErr) {
      console.error(chalk.red(`Failed to create a directory ${options.outDir}`));
      console.error(mkdirpErr);
      process.exit(1);
    }
    glob(filesGlob, function (globErr, files) {
      if (globErr) {
        console.error(chalk.red(`Failed to glob ${filesGlob}`));
        console.error(globErr);
        process.exit(1);
      }
      files.forEach(function (file) {
        babel.transformFile(file, babelConfig.extendBabelConfig({
          code: true,
          ast: false,
          filename: file
        }, filesGlob), function (babelErr, result) {
          var ignored;
          var filePath;
          if (babelErr) {
            console.error(chalk.red(`Failed to transform file ${file}`));
            console.error(babelErr);
            process.exit(1);
          }
          ignored = file.replace(options.ignore + path.sep, '');
          filePath = path.resolve(options.outDir, ignored);
          fs.writeFile(filePath, result.code, 'utf8', function (fileError) {
            if (fileError) {
              console.error(chalk.red(`Failed to write transformed file ${file}`));
              console.error(fileError);
              process.exit(1);
            }
          });
        });
      });
    });
  });
};
