'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gets = exports.get = undefined;

var _object = require('../core/object');

var get = function get(obj, path, defaultValue) {
  var sep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '.';

  var paths = Array.isArray(path) ? path : path.split(sep);
  var result = paths.reduce(function (last, path) {
    return last && path ? last[path] : last;
  }, (0, _object.setDefault)(obj, {}));
  return (0, _object.exist)(result, null) ? result : defaultValue || result;
};

var gets = function gets(obj, defaultValue) {
  var sep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';
  return function (varPaths) {
    return (0, _object.map)(varPaths, function (varPath) {
      return get(obj, varPath, defaultValue, sep);
    });
  };
};

exports.get = get;
exports.gets = gets;