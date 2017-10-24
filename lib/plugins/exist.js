'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gets = exports.get = undefined;

var _object = require('../core/object');

/*
// 字符分隔符
const charSep = ''
// []表达式正则
const quotesReg = /['"[\]]/

const parser = () => {
  const setComplexState = (memory, state) => memory.isComplex = state
  const clearExpression = memory => memory.expression.length = 0

  const memory = {
    isComplex: false,
    expression: [],
  }

  return (pathSet, sep = '.') => pathSet.split(charSep).reduce((paths, char) => {
    if (char === '[') {
      setComplexState(memory, true)
    } else if (char === ']') {
      const newPaths = paths.concat(memory.expression.join(charSep))
      clearExpression(memory)
      setComplexState(memory, false)
      return newPaths
    } else if (!memory.isComplex && char === sep) {
      const newPaths = paths.concat(memory.expression.join(charSep))
      clearExpression(memory)
      return newPaths
    } else if (!memory.isComplex && char !== sep) {
      memory.expression.push(char)
    } else if (memory.isComplex && !quotesReg.test(char)) {
      memory.expression.push(char)
    }
    return paths
  }, [])
}

const transformer = parser()
*/
var reg = /\.(?![^[\]]*\])|\[['"]?|['"]?\]/;

var get = function get(obj) {
  var pathSet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var defaultValue = arguments[2];
  var sep = arguments[3];

  var paths = Array.isArray(pathSet) ? pathSet : pathSet.split(sep || reg);
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