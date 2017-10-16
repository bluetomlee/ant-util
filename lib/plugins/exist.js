'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gets = exports.get = undefined;

var _object = require('../core/object');

var reg = /\.(?![^[\]]*\])|\[['"]?|['"]?\]/;

var get = function get(obj, path, defaultValue, sep) {
  var paths = Array.isArray(path) ? path : path.split(sep || reg);
  var result = paths.reduce(function (last, path) {
    return last && path ? last[path] : last;
  }, (0, _object.setDefault)(obj, {}));
  return (0, _object.isNull)(result) ? defaultValue || result : result;
};

var gets = function gets(obj) {
  var defaultValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var sep = arguments[2];
  return function (modelPaths) {
    return (0, _object.map)(modelPaths, function (modelPath, modelName) {
      return get(obj, modelPath, defaultValues[modelName], sep);
    });
  };
};

exports.get = get;
exports.gets = gets;