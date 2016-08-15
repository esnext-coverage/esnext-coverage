var _mrnzrc = function (context) {
  var locations = JSON.parse("[]");
  context["__coverage__"] = context["__coverage__"] || {};
  context["__coverage__"]["/Users/olegsklyanchuk/repos/esnext-coverage/test/fixtures/empty.js"] = {
    path: "/Users/olegsklyanchuk/repos/esnext-coverage/test/fixtures/empty.js",
    locations: locations
  };
  return function (index, value) {
    locations[index].count += 1;
    return value;
  };
}(typeof global === 'undefined' ? window : global);