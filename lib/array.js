'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaults = exports.unique = exports.subtract = exports.indexBy = exports.exchange = exports.findEqual = exports.findWhere = exports.union = exports.compact = exports.insert = exports.average = exports.averageDynmic = exports.last = exports.asname = exports.findColumn = exports.object = exports.pluck = exports.countBy = exports.groupBy = exports.sortBy = exports.chainArray = exports.diffArray = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends5 = require('babel-runtime/helpers/extends');

var _extends6 = _interopRequireDefault(_extends5);

var _object = require('./object');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chainArray = function chainArray(actions) {
  return function (datas) {
    return (0, _object.reduce)(actions, function (last, handle, action) {
      return last[action](handle);
    }, datas);
  };
}; /*
    * 数组操作
    * */


var diffArray = function diffArray(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every(function (value) {
    return arr2.includes(value);
  });
};

var sortBy = function sortBy(datas, fn) {
  return datas.sort(function (d1, d2) {
    return fn(d1) - fn(d2);
  });
};

var groupBy = function groupBy(datas, fn) {
  return datas.reduce(function (last, data) {
    return (0, _extends6.default)({}, last, (0, _defineProperty3.default)({}, '' + fn(data), (last[fn(data)] || []).concat(data)));
  }, {});
};

var countBy = function countBy(datas, fn) {
  return datas.reduce(function (last, data) {
    return (0, _extends6.default)({}, last, (0, _defineProperty3.default)({}, '' + fn(data), last[fn(data)] ? ++last[fn(data)] : 1));
  }, {});
};

var pluck = function pluck(datas, propertyName) {
  return datas.map(function (data) {
    return data[propertyName];
  });
};

var object = function object(datas) {
  return datas.reduce(function (last, _ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return (0, _extends6.default)({}, last, (0, _defineProperty3.default)({}, key, value));
  }, {});
};

var findColumn = function findColumn(datas, columns) {
  return datas.map(function (data) {
    return (0, _object.pick)(data, columns);
  });
};

var asname = function asname(table, newNames) {
  return table.map(function (data) {
    return (0, _object.rename)(data, newNames);
  });
};

var last = function last(datas) {
  return datas[datas.length - 1];
};

var average = function average(array) {
  return array.reduce(function (prev, next) {
    return prev + next;
  }) / array.length;
};

var averageDynmic = function averageDynmic(fun) {
  return function (n) {
    return average([n].concat(fun(n)));
  };
};

var insert = function insert(datas, index, item) {
  return datas.slice(0, index).concat(item).concat(datas.slice(index));
};

var compact = function compact(datas) {
  return datas.filter(function (data) {
    return data;
  });
};

var union = function union(a, b) {
  return a.reduce(function (output, item) {
    return output.includes(item) ? output : output.concat([item]);
  }, b.slice(0));
};

var findWhere = function findWhere(datas, handle) {
  return datas.filter(function (data) {
    return handle(data);
  });
};

var findEqual = function findEqual(datas, where) {
  var wheres = (0, _object.pairs)(where);
  return datas.filter(function (data) {
    return wheres.every(function (_ref3) {
      var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];

      return data[key] === value;
    });
  });
};

var exchange = function exchange(arr, start, end) {
  var next = arr[end];
  arr[end] = arr[start];
  arr[start] = next;
  return arr;
};

var indexBy = function indexBy(arr, indexKey) {
  return arr.reduce(function (output, current) {
    output[current[indexKey]] = current;
    return output;
  }, {});
};

var subtract = function subtract(all, some) {
  return all.reduce(function (output, name) {
    return !some.includes(name) ? output.concat(name) : output;
  }, []);
};

var unique = function unique(arr) {
  arr.sort();
  if (arr.length < 1) {
    return arr;
  }
  var ret = [arr[0]];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] !== ret[ret.length - 1]) {
      ret.push(arr[i]);
    }
  }
  return ret;
};

var defaults = function defaults(datas, misses) {
  return datas.map(function (data) {
    var finalData = (0, _extends6.default)({}, data);
    (0, _object.map)(misses, function (value, key) {
      if (finalData[key] === undefined) {
        finalData[key] = value;
      }
    });
    return finalData;
  });
};

exports.diffArray = diffArray;
exports.chainArray = chainArray;
exports.sortBy = sortBy;
exports.groupBy = groupBy;
exports.countBy = countBy;
exports.pluck = pluck;
exports.object = object;
exports.findColumn = findColumn;
exports.asname = asname;
exports.last = last;
exports.averageDynmic = averageDynmic;
exports.average = average;
exports.insert = insert;
exports.compact = compact;
exports.union = union;
exports.findWhere = findWhere;
exports.findEqual = findEqual;
exports.exchange = exchange;
exports.indexBy = indexBy;
exports.subtract = subtract;
exports.unique = unique;
exports.defaults = defaults;