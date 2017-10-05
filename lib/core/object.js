'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.walk = exports.deepEach = exports.removeItem = exports.against = exports.shallowEqual = exports.different = exports.mergeDefault = exports.setDefault = exports.truthy = exports.exist = exports.pick = exports.omit = exports.invert = exports.unzip = exports.zip = exports.unpairs = exports.pairs = exports.values = exports.map2Array = exports.map = exports.mapKey = exports.filter = exports.reduce = exports.each = exports.plucker = exports.typeGetter = exports.typeChecker = exports.identity = exports.keys = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends8 = require('babel-runtime/helpers/extends');

var _extends9 = _interopRequireDefault(_extends8);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _string = require('./string');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keys = _keys2.default; /*
                            * 对象操作
                            * */

var toString = Object.prototype.toString;

var identity = function identity(value) {
  return value;
};

var typeChecker = function typeChecker(data) {
  return function (type) {
    return !type || toString.call(data) === '[object ' + (0, _string.upper)(type) + ']';
  };
};

var typeGetter = function typeGetter(data) {
  return toString.call(data).match(/\s(.[^\]]*)/)[1];
};

var plucker = function plucker(prop) {
  return function (item) {
    return item[prop];
  };
};

// 遍历
var each = function each(obj, fn) {
  return keys(obj).forEach(function (key, index) {
    return fn && fn(obj[key], key, index);
  });
};

var reduce = function reduce(obj, handler) {
  var initial = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return keys(obj).reduce(function (last, key, index) {
    return handler(last, obj[key], key, index);
  }, initial);
};

var filter = function filter(obj, handler) {
  return reduce(obj, function (last, value, key, index) {
    return handler(value, key, index) ? (0, _extends9.default)({}, last, (0, _defineProperty3.default)({}, key, value)) : last;
  });
};

var mapKey = function mapKey(obj, keymap) {
  return reduce(obj, function (last, value, key) {
    return (0, _extends9.default)({}, last, (0, _defineProperty3.default)({}, keymap[key] ? keymap[key] : key, value));
  });
};

var map = function map(obj, handler) {
  return reduce(obj, function (last, value, key, index) {
    return (0, _extends9.default)({}, last, (0, _defineProperty3.default)({}, key, handler(value, key, index)));
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

var pairs = function pairs(arr) {
  return arr.reduce(function (last, _ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return (0, _extends9.default)({}, last, (0, _defineProperty3.default)({}, key, value));
  }, {});
};

var unpairs = function unpairs(obj) {
  return map2Array(obj, function (value, key) {
    return [key, value];
  });
};

var zip = function zip(_ref3) {
  var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
      zipKeys = _ref4[0],
      zipValues = _ref4[1];

  return zipKeys.reduce(function (last, key, index) {
    return (0, _extends9.default)({}, last, (0, _defineProperty3.default)({}, key, zipValues[index]));
  }, {});
};

var unzip = function unzip(obj) {
  return [keys(obj), values(obj)];
};

var invert = function invert(obj) {
  return reduce(obj, function (last, value, key) {
    return (0, _extends9.default)({}, last, (0, _defineProperty3.default)({}, value, key));
  });
};

// 萃取
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

// 校验
var exist = function exist(obj) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (type === 0) return !!obj;
  if (type === null) return obj !== undefined && obj !== null;
  if (type) return !!obj && ((typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'object' ? !!keys(obj).length : true);
};

var truthy = function truthy(obj) {
  return exist(obj) && ((typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'object' ? !!(0, _keys2.default)(obj).length : true);
};

// 默认值
var setDefault = function setDefault(current, defaultValue) {
  return current || defaultValue;
};

var mergeDefault = function mergeDefault(object, defaultValue) {
  return (0, _extends9.default)({}, defaultValue, object);
};

// 比较
var different = function different(a, b) {
  return reduce(b, function (last, value, key) {
    return value !== a[key] ? last.concat({ key: key, value: value }) : last;
  }, []);
};

var shallowEqual = function shallowEqual(a, b) {
  return different(a, b).length === 0;
};

// 取返
var against = function against(obj) {
  return !obj;
};

// 操作
var removeItem = function removeItem(obj, item) {
  if (Array.isArray(obj)) {
    var flag = obj.indexOf(item) > -1;
    while (flag) {
      obj.splice(obj.indexOf(item), 1);
      flag = obj.indexOf(item) > -1;
    }
  } else {
    (0, _keys2.default)(obj).forEach(function (k) {
      if (obj[k] === item) {
        delete obj[k];
      }
    });
  }
};

// 递归
var deepEach = function deepEach(obj, fn) {
  return (0, _keys2.default)(obj).forEach(function (k) {
    fn(obj[k], k);
    if ((0, _typeof3.default)(obj[k]) === 'object') {
      deepEach(obj[k], fn);
    }
  });
};

var walk = function walk(obj, childrenName, handler) {
  var i = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var parentPath = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

  var customPath = handler(obj, i, parentPath);
  if (obj[childrenName] !== undefined && Array.isArray(obj[childrenName])) {
    obj[childrenName].forEach(function (child, index) {
      return walk(child, childrenName, handler, index, parentPath.concat(childrenName, customPath));
    });
  }
};

exports.keys = keys;
exports.identity = identity;
exports.typeChecker = typeChecker;
exports.typeGetter = typeGetter;
exports.plucker = plucker;
exports.each = each;
exports.reduce = reduce;
exports.filter = filter;
exports.mapKey = mapKey;
exports.map = map;
exports.map2Array = map2Array;
exports.values = values;
exports.pairs = pairs;
exports.unpairs = unpairs;
exports.zip = zip;
exports.unzip = unzip;
exports.invert = invert;
exports.omit = omit;
exports.pick = pick;
exports.exist = exist;
exports.truthy = truthy;
exports.setDefault = setDefault;
exports.mergeDefault = mergeDefault;
exports.different = different;
exports.shallowEqual = shallowEqual;
exports.against = against;
exports.removeItem = removeItem;
exports.deepEach = deepEach;
exports.walk = walk;