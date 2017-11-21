'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gets = exports.get = undefined;

var _object = require('../core/object');

var CHAR_SEP = '';
var PATH_SEP = '.';
var QUOTE_REG = /['"[\]]/;
var COMPLEX_START = '[';
var COMPLEX_END = ']';

var parser = function parser() {
  var isComplex = false;
  var expr = [];

  var checkers = {
    isNormal: function isNormal(isComplex, char, sep, isEnd) {
      return !isComplex && char !== sep && char !== COMPLEX_START && !isEnd;
    },
    isNormalEnd: function isNormalEnd(isComplex, isEnd) {
      return !isComplex && isEnd;
    },
    isSep: function isSep(isComplex, char, sep) {
      return !isComplex && char === sep;
    },
    isComplex: function isComplex(_isComplex, char) {
      return _isComplex && !QUOTE_REG.test(char);
    }
  };

  var handles = {
    pushExpr: function pushExpr(expr, char) {
      return expr.push(char);
    },
    concatPaths: function concatPaths(paths, expr) {
      var expression = expr.join(CHAR_SEP);
      var newPaths = paths.concat(expression || []);
      expr.length = 0;
      return newPaths;
    }
  };

  return function (pathsString) {
    var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PATH_SEP;

    var pathArray = pathsString.split(CHAR_SEP);

    var finalPaths = pathArray.reduce(function (paths, char, index) {
      var isEnd = index === pathArray.length - 1;
      if (checkers.isNormal(isComplex, char, sep, isEnd)) {
        handles.pushExpr(expr, char);
      } else if (checkers.isSep(isComplex, char, sep)) {
        return handles.concatPaths(paths, expr);
      } else if (checkers.isNormalEnd(isComplex, isEnd)) {
        handles.pushExpr(expr, char);
        return handles.concatPaths(paths, expr);
      } else if (checkers.isComplex(isComplex, char)) {
        handles.pushExpr(expr, char);
      } else if (char === COMPLEX_START) {
        isComplex = true;
        return handles.concatPaths(paths, expr);
      } else if (char === COMPLEX_END) {
        isComplex = false;
        return handles.concatPaths(paths, expr);
      }
      return paths;
    }, []);

    expr.length = 0;
    isComplex = false;
    return finalPaths;
  };
};

var transformer = parser();

// const reg = /\.(?![^[\]]*\])|\[['"]?|['"]?\]/

var get = function get(obj) {
  var pathsString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var defaultValue = arguments[2];
  var sep = arguments[3];

  var paths = Array.isArray(pathsString) ? pathsString : transformer(pathsString, sep);
  var result = paths.reduce(function (last, path) {
    return last && path ? last[path] : last;
  }, (0, _object.setDefault)(obj, {}));
  return (0, _object.isNull)(result) && defaultValue !== undefined ? defaultValue : result;
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