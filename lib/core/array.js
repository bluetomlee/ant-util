'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chain = exports.defaults = exports.fillnull = exports.averageDynmic = exports.average = exports.exchange = exports.insert = exports.compact = exports.union = exports.unique = exports.connect = exports.connectmap = exports.cat = exports.subtract = exports.diff = exports.toObject = exports.iterate = exports.repeatness = exports.repeat = exports.range = exports.indexBy = exports.countBy = exports.groupBy = exports.sortBy = exports.findEqual = exports.findWhere = exports.findColumn = exports.asname = exports.pluck = exports.finder = exports.find = exports.max = exports.last = exports.first = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends6 = require('babel-runtime/helpers/extends');

var _extends7 = _interopRequireDefault(_extends6);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _object = require('./object');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 查找元素
var first = function first(datas) {
  return datas[0];
}; /*
    * 数组操作
    * */


var last = function last(datas) {
  return datas[datas.length - 1];
};

var max = function max(data) {
  var compare = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (item) {
    return item;
  };
  return data.reduce(function (maxer, next) {
    return compare(maxer) > compare(next) ? maxer : next;
  });
};

var find = function find(data, need, compare) {
  return data.reduce(function (last, next) {
    return compare(last) === need(compare(last), compare(next)) ? last : next;
  });
};

var finder = function finder(data, need) {
  return data.reduce(function (last, next) {
    return need(last, next) ? last : next;
  });
};

// 萃取
var pluck = function pluck(datas, propertyName) {
  return datas.map(function (data) {
    return data[propertyName];
  });
};

// 重命名
var asname = function asname(table, newNames) {
  return table.map(function (data) {
    return (0, _object.rename)(data, newNames);
  });
};

// 查找表格
var findColumn = function findColumn(datas, columns) {
  return datas.map(function (data) {
    return (0, _object.pick)(data, columns);
  });
};

var findWhere = function findWhere(datas, handle) {
  return datas.filter(function (data) {
    return handle(data);
  });
};

var findEqual = function findEqual(datas, where) {
  var wheres = (0, _object.pairs)(where);
  return datas.filter(function (data) {
    return wheres.every(function (_ref) {
      var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      return data[key] === value;
    });
  });
};

// 高级查找
var sortBy = function sortBy(datas, fn) {
  return datas.slice(0).sort(function (d1, d2) {
    return fn(d1) - fn(d2);
  });
};

var countBy = function countBy(datas, fn) {
  return datas.reduce(function (last, data) {
    return (0, _extends7.default)({}, last, (0, _defineProperty3.default)({}, '' + fn(data), last[fn(data)] ? ++last[fn(data)] : 1));
  }, {});
};

var indexBy = function indexBy(datas, key) {
  return datas.reduce(function (last, data) {
    return (0, _extends7.default)({}, last, (0, _defineProperty3.default)({}, '' + data[key], [].concat((0, _toConsumableArray3.default)(last[data[key]] || []), [data])));
  }, {});
};

var groupBy = function groupBy(datas, fn) {
  return datas.reduce(function (last, data) {
    return (0, _extends7.default)({}, last, (0, _defineProperty3.default)({}, '' + fn(data), (last[fn(data)] || []).concat(data)));
  }, {});
};

// 创建
var range = function range(times) {
  var ranges = [];
  for (var idx = 0; idx < times; idx++) {
    ranges.push(idx);
  }
  return ranges;
};

var repeat = function repeat(times, value) {
  return range(times).map(function () {
    return value;
  });
};

var repeatness = function repeatness(createValue, time) {
  return range(time).map(function (value, index) {
    return createValue(index);
  });
};

var iterate = function iterate(valueCreator, checker, init) {
  var results = [];
  var result = valueCreator(init);
  while (checker(result)) {
    results.push(result);
    result = valueCreator(result);
  }
  return results;
};

// 转换
var toObject = function toObject(datas) {
  var pluck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (value) {
    return value;
  };
  return datas.reduce(function (last, next) {
    return (0, _extends7.default)({}, last, (0, _defineProperty3.default)({}, pluck(next), next));
  }, {});
};

// 对比
var diff = function diff(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every(function (value) {
    return arr2.includes(value);
  }) && arr2.every(function (value) {
    return arr1.includes(value);
  });
};

var subtract = function subtract(all, some) {
  return all.reduce(function (output, name) {
    return !some.includes(name) ? output.concat(name) : output;
  }, []);
};

// 合并
var cat = function cat() {
  var _head$slice;

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var head = args[0],
      rest = args.slice(1);

  return (_head$slice = head.slice(0)).concat.apply(_head$slice, (0, _toConsumableArray3.default)(rest));
};

var connect = function connect(head) {
  for (var _len2 = arguments.length, rest = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    rest[_key2 - 1] = arguments[_key2];
  }

  return cat.apply(undefined, [[head]].concat(rest));
};

var connectmap = function connectmap(coll, fun) {
  return connect.apply(undefined, (0, _toConsumableArray3.default)(coll.map(fun)));
};

// 去重
var unique = function unique(array) {
  return array.reduce(function (last, arr) {
    return last.includes(arr) ? last : [].concat((0, _toConsumableArray3.default)(last), [arr]);
  }, []);
};

// const unique = array => [...new Set(array)]
// const unique = array => array.filter((item, i) => i === array.indexOf(item))

// 合并去重
var union = function union(a, b) {
  return unique(cat(a, b));
};

// 去空
var compact = function compact(datas) {
  return datas.filter(function (data) {
    return data;
  });
};

// 操作
var insert = function insert(datas, index, item) {
  return datas.slice(0, index).concat(item).concat(datas.slice(index));
};

var exchange = function exchange(arr, start, end) {
  var next = arr[end];
  arr[end] = arr[start];
  arr[start] = next;
  return arr;
};

// 求值
var average = function average(array) {
  return array.reduce(function (prev, next) {
    return prev + next;
  }) / array.length;
};

var averageDynmic = function averageDynmic(fun) {
  return function (n) {
    return average(connect.apply(undefined, (0, _toConsumableArray3.default)(fun(n))));
  };
};

// 赋值
var fillnull = function fillnull(handle) {
  for (var _len3 = arguments.length, defaults = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    defaults[_key3 - 1] = arguments[_key3];
  }

  return function () {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return handle.apply(undefined, (0, _toConsumableArray3.default)(args.map(function (arg, i) {
      return arg || defaults[i];
    })));
  };
};

var defaults = function defaults(defaultValue) {
  return function (item, key) {
    return fillnull(_object.identity, defaultValue[key])((item || defaultValue)[key]);
  };
};

// 链式操作
var chain = function chain(actions) {
  return function (datas) {
    return (0, _object.reduce)(actions, function (last, handle, action) {
      return last[action](handle);
    }, datas);
  };
};

exports.first = first;
exports.last = last;
exports.max = max;
exports.find = find;
exports.finder = finder;
exports.pluck = pluck;
exports.asname = asname;
exports.findColumn = findColumn;
exports.findWhere = findWhere;
exports.findEqual = findEqual;
exports.sortBy = sortBy;
exports.groupBy = groupBy;
exports.countBy = countBy;
exports.indexBy = indexBy;
exports.range = range;
exports.repeat = repeat;
exports.repeatness = repeatness;
exports.iterate = iterate;
exports.toObject = toObject;
exports.diff = diff;
exports.subtract = subtract;
exports.cat = cat;
exports.connectmap = connectmap;
exports.connect = connect;
exports.unique = unique;
exports.union = union;
exports.compact = compact;
exports.insert = insert;
exports.exchange = exchange;
exports.average = average;
exports.averageDynmic = averageDynmic;
exports.fillnull = fillnull;
exports.defaults = defaults;
exports.chain = chain;