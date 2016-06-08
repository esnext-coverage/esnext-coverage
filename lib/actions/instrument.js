/* eslint max-nested-callbacks: 1 */

/**
 * An `instrument` command to instrument and output instrumented code.
 * @param {String} filesGlob – Files match glob.
 * @param {Object} options – Command options.
 * @param {String} [options.baseDir] – Base directory of files to instrument.
 * @param {String} options.outDir – Destination directory for instrumented files.
 * @return {undefined} Nothing is returned.
 * @example
 *  # Take all .js files from "app" folder, instrument them and move to "instrumented" folder:
 *  instrumentAction('app/*.js', {baseDir: 'app', outDir: 'instrumented');
 */
module.exports = function instrumentAction(filesGlob, options) {
  var fs = require('fs');
  var path = require('path');
  var glob = require('glob');
  var mkdirp = require('mkdirp');
  var chalk = require('chalk');
  var babel = require('babel-core');
  var babelConfig = require('../babel-config');

  if (!options.outDir) {
    console.error(chalk.red(`Please specify ${chalk.underline('-o, --out-dir')} option.`));
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
        console.error(chalk.red(`Failed to glob ${filesGlobFull}`));
        console.error(globErr);
        process.exit(1);
      }
      files.forEach(function (file) {
        babel.transformFile(file, babelConfig.extendBabelConfig({
          code: true,
          ast: false,
          filename: file
        }, filesGlob), function (babelErr, result) {
          var baseDir;
          var filePath;
          var fileDir;
          if (babelErr) {
            console.error(chalk.red(`Failed to transform file ${file}`));
            console.error(babelErr);
            process.exit(1);
          }
          baseDir = file.replace(options.baseDir + path.sep, '');
          filePath = path.resolve(options.outDir, baseDir);
          fileDir = path.dirname(filePath);
          mkdirp(fileDir, function (outputMkdirpErr) {
            if (outputMkdirpErr) {
              console.error(chalk.red(`Failed to create a directory ${fileDir}`));
              console.error(mkdirpErr);
              process.exit(1);
            }
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
  });
};
