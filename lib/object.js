"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeItem = exports.zip = exports.walk = exports.pick = exports.omit = exports.map2Array = exports.map = exports.filter = exports.reduce = exports.each = exports.isEmptyObject = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require("babel-runtime/helpers/extends");

var _extends5 = _interopRequireDefault(_extends4);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * 对象操作
 * */
var keys = _keys2.default;

var isEmptyObject = function isEmptyObject(obj) {
  return !obj || !(0, _keys2.default)(obj).length;
};

var each = function each(obj, fn) {
  return keys(obj).forEach(function (k) {
    return fn && fn(obj[k], k);
  });
};

var reduce = function reduce(obj, handler) {
  var initial = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return keys(obj).reduce(function (last, key) {
    return handler(last, obj[key], key);
  }, initial);
};

var filter = function filter(obj, handler) {
  return reduce(obj, function (last, value, key) {
    return handler(value, key) ? (0, _extends5.default)({}, last, (0, _defineProperty3.default)({}, key, value)) : last;
  });
};

var map = function map(obj, handler) {
  return reduce(obj, function (last, value, key) {
    return (0, _extends5.default)({}, last, (0, _defineProperty3.default)({}, key, handler(value, key)));
  });
};

var map2Array = function map2Array(obj, handler) {
  return keys(obj).map(function (key, index) {
    return handler(obj[key], key, index);
  });
};

var omit = function omit(obj, names) {
  return filter(obj, function (value, key) {
    return !names.includes(key);
  });
};

var pick = function pick(obj, names) {
  return filter(obj, function (value, key) {
    return names.includes(key);
  });
};

var walk = function walk(obj, childrenName, handler) {
  var i = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var parentPath = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

  var customPath = handler(obj, i, parentPath);
  if (obj[childrenName] !== undefined && Array.isArray(obj[childrenName])) {
    obj[childrenName].forEach(function (child, index) {
      return walk(child, childrenName, handler, index, parentPath.concat(customPath));
    });
  }
};

var zip = function zip(zipKeys, zipValues) {
  return zipKeys.reduce(function (last, key, index) {
    last[key] = zipValues[index];
    return last;
  }, {});
};

var removeItem = function removeItem(obj, item) {
  return (0, _keys2.default)(obj).forEach(function (k) {
    return obj[k] === item && delete obj[k];
  });
};

exports.isEmptyObject = isEmptyObject;
exports.each = each;
exports.reduce = reduce;
exports.filter = filter;
exports.map = map;
exports.map2Array = map2Array;
exports.omit = omit;
exports.pick = pick;
exports.walk = walk;
exports.zip = zip;
exports.removeItem = removeItem;