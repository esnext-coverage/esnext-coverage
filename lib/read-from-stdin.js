/**
 * Reads text from stdin.
 * @param {Function} callback – Called when finished reading from stdin.
 * @return {undefined} Nothing is returned.
 */
module.exports = function readFromStdin(callback) {
  var input = '';

  process.stdin.on('readable', function onStdinReadable() {
    var chunk = process.stdin.read();
    if (chunk !== null) {
      input += chunk.toString();
    }
  });

  process.stdin.on('end', function onStdinEnd() {
    callback(input);
  });
};
