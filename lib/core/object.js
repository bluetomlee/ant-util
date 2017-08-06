'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeItem = exports.rename = exports.remove = exports.zip = exports.truthy = exports.exist = exports.shallowEqual = exports.different = exports.mergeDefault = exports.walk = exports.pick = exports.omit = exports.invert = exports.pairs = exports.values = exports.map2Array = exports.map = exports.filter = exports.reduce = exports.each = exports.plucker = exports.typeChecker = exports.identity = exports.keys = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends6 = require('babel-runtime/helpers/extends');

var _extends7 = _interopRequireDefault(_extends6);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * 对象操作
 * */
var keys = _keys2.default;
var toString = Object.prototype.toString;
var identity = function identity(value) {
  return value;
};

var typeChecker = function typeChecker(data) {
  return function (type) {
    return !type || toString.call(data) === '[object ' + type + ']';
  };
};

var plucker = function plucker(prop) {
  return function (item) {
    return item[prop];
  };
};

var reduce = function reduce(obj, handler) {
  var initial = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return keys(obj).reduce(function (last, key) {
    return handler(last, obj[key], key);
  }, initial);
};

var filter = function filter(obj, handler) {
  return reduce(obj, function (last, value, key) {
    return handler(value, key) ? (0, _extends7.default)({}, last, (0, _defineProperty3.default)({}, key, value)) : last;
  });
};

var map = function map(obj, handler) {
  return reduce(obj, function (last, value, key) {
    return (0, _extends7.default)({}, last, (0, _defineProperty3.default)({}, key, handler(value, key)));
  });
};

var map2Array = function map2Array(obj, handler) {
  return keys(obj).map(function (key, index) {
    return handler(obj[key], key, index);
  });
};

var values = function values(obj) {
  return map2Array(obj, identity);
};

var pairs = function pairs(obj) {
  return map2Array(obj, function (value, key) {
    return [key, value];
  });
};

var invert = function invert(obj) {
  return reduce(obj, function (last, value, key) {
    return (0, _extends7.default)({}, last, (0, _defineProperty3.default)({}, value, key));
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

var remove = function remove(obj, item) {
  return (0, _keys2.default)(obj).forEach(function (k) {
    return obj[k] === item && delete obj[k];
  });
};

var each = function each(obj, fn) {
  return keys(obj).forEach(function (k) {
    return fn && fn(obj[k], k);
  });
};

var exist = function exist(obj) {
  return !!obj;
};

var truthy = function truthy(obj) {
  return exist(obj) && ((typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'object' ? !!(0, _keys2.default)(obj).length : true);
};

var zip = function zip(zipKeys, zipValues) {
  return zipKeys.reduce(function (last, key, index) {
    return (0, _extends7.default)({}, last, (0, _defineProperty3.default)({}, key, zipValues[index]));
  }, {});
};

var mergeDefault = function mergeDefault(object, defaultValue) {
  return (0, _extends7.default)({}, defaultValue, object);
};

var different = function different(a, b) {
  return reduce(b, function (last, value, key) {
    return value !== a[key] ? last.concat({ key: key, value: value }) : last;
  }, []);
};

var shallowEqual = function shallowEqual(a, b) {
  return different(a, b).length === 0;
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

var rename = function rename(data, newNames) {
  return reduce(newNames, function (last, newName, oldName) {
    if (data[oldName] !== undefined) {
      last[newName] = data[oldName];
      delete last[oldName];
    }
    return last;
  }, (0, _extends7.default)({}, data));
};

var deepEach = function deepEach(obj, fn) {
  return (0, _keys2.default)(obj).forEach(function (k) {
    fn(obj[k], k);
    if ((0, _typeof3.default)(obj[k]) === 'object') {
      deepEach(obj[k], fn);
    }
  });
};

var removeItem = function removeItem(obj, item) {
  if (Array.isArray(obj)) {
    obj.splice(obj.indexOf(item), 1);
  }
  (0, _keys2.default)(obj).forEach(function (k) {
    if (obj[k] === item) {
      delete obj[k];
    }
  });
};

exports.keys = keys;
exports.identity = identity;
exports.typeChecker = typeChecker;
exports.plucker = plucker;
exports.each = each;
exports.reduce = reduce;
exports.filter = filter;
exports.map = map;
exports.map2Array = map2Array;
exports.values = values;
exports.pairs = pairs;
exports.invert = invert;
exports.omit = omit;
exports.pick = pick;
exports.walk = walk;
exports.mergeDefault = mergeDefault;
exports.different = different;
exports.shallowEqual = shallowEqual;
exports.exist = exist;
exports.truthy = truthy;
exports.zip = zip;
exports.remove = remove;
exports.rename = rename;
exports.removeItem = removeItem;