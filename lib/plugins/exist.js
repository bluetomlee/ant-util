'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gets = exports.get = undefined;

var _object = require('../core/object');

// 字符分隔符
var charSep = '';
// []表达式正则
var quotesReg = /['"[\]]/;

var parser = function parser() {
  var setComplexState = function setComplexState(complex, state) {
    return complex.isComplex = state;
  };
  var clearComplex = function clearComplex(complex) {
    return complex.expression.length = 0;
  };

  var complexCache = {
    isComplex: false,
    expression: []
  };

  return function (pathSet) {
    var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';
    return pathSet.split(charSep).reduce(function (paths, char) {
      if (char === '[') {
        setComplexState(complexCache, true);
      } else if (char === ']') {
        var newPaths = paths.concat(complexCache.expression.join(charSep));
        clearComplex(complexCache);
        setComplexState(complexCache, false);
        return newPaths;
      } else if (!complexCache.isComplex && char !== sep) {
        return paths.concat(char);
      } else if (complexCache.isComplex && !quotesReg.test(char)) {
        complexCache.expression.push(char);
      }
      return paths;
    }, []);
  };
};

var transformer = parser();

var get = function get(obj) {
  var pathSet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var defaultValue = arguments[2];
  var sep = arguments[3];

  var paths = Array.isArray(pathSet) ? pathSet : transformer(pathSet, sep);
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