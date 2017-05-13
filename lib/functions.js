"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.some = exports.switcher = exports.concat = exports.compose = exports.translate = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * 函数操作
 * */
var translate = function translate(string) {
  return new Function("return " + string)();
};

var compose = function compose(first) {
  for (var _len = arguments.length, last = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    last[_key - 1] = arguments[_key];
  }

  return function () {
    return last.reduce(function (composed, func) {
      return func(composed);
    }, first.apply(undefined, arguments));
  };
};

var concat = function concat() {
  for (var _len2 = arguments.length, funcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    funcs[_key2] = arguments[_key2];
  }

  return function () {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return funcs.reduce(function (returns, func) {
      return [].concat((0, _toConsumableArray3.default)(returns), [func.apply(undefined, args)]);
    }, []);
  };
};

var switcher = function switcher(map) {
  return function (type) {
    for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }

    return map[type] !== undefined ? map[type].apply(map, args) : undefined;
  };
};

var some = function some() {
  for (var _len5 = arguments.length, funs = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    funs[_key5] = arguments[_key5];
  }

  return function () {
    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    return funs.reduce(function (last, fun) {
      return last === undefined ? fun.apply(undefined, args) : last;
    }, undefined);
  };
};

exports.translate = translate;
exports.compose = compose;
exports.concat = concat;
exports.switcher = switcher;
exports.some = some;