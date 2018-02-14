'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = exports.getsMap = exports.gets = exports.get = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _object = require('../core/object');

var _array = require('../core/array');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var set = function set(obj) {
  var pathsString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var value = arguments[2];
  var sep = arguments[3];

  var paths = Array.isArray(pathsString) ? pathsString : transformer(pathsString, sep);
  paths.reduce(function (last, path, index) {
    var partical = last && last[path];
    // 如果当前遍历不是最后节点，且当前节点为空
    if (index < paths.length - 1 && ((typeof partical === 'undefined' ? 'undefined' : (0, _typeof3.default)(partical)) !== 'object' || partical === null)) {
      last[path] = isNaN(paths[index + 1]) ? {} : [];
      partical = last[path];
    } else if (index === paths.length - 1) {
      last[path] = value;
    }
    return partical;
  }, obj || {});
};

var walkFunction = function walkFunction(obj, handler) {
  var parentPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var i = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  handler(obj, parentPath, i);
  (0, _keys2.default)(obj).forEach(function (key, index) {
    return ((0, _typeof3.default)(obj[key]) === 'object' || typeof obj[key] === 'function') && walkFunction(obj[key], handler, parentPath.concat(key), index);
  });
};

var getsMap = function getsMap(obj, json) {
  var isPlain = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var result = {};
  walkFunction(json, function (strategy, path) {
    if (typeof strategy === 'function') {
      var _strategy = strategy(get(obj, path)),
          as = _strategy.as,
          dv = _strategy.dv,
          rn = _strategy.rn,
          val = _strategy.val;

      if (isPlain) {
        result[as || (0, _array.last)(path)] = val !== undefined ? val : (0, _object.rename)(get(obj, path, dv), rn);
      } else {
        set(result, as ? path.slice(0, path.length - 1).concat(as) : path, val !== undefined ? val : (0, _object.rename)(get(obj, path, dv), rn));
      }
    }
  });
  return result;
};

exports.get = get;
exports.gets = gets;
exports.getsMap = getsMap;
exports.set = set;