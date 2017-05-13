'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaults = exports.findEqual = exports.findWhere = exports.asname = exports.findColumn = exports.object = exports.pluck = exports.countBy = exports.groupBy = exports.sortBy = exports.chainArray = exports.diffArray = exports.removeItem = undefined;

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


var removeItem = function removeItem(datas, item) {
  return datas.includes(item) && datas.splice(datas.indexOf(item), 1);
};

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

exports.removeItem = removeItem;
exports.diffArray = diffArray;
exports.chainArray = chainArray;
exports.sortBy = sortBy;
exports.groupBy = groupBy;
exports.countBy = countBy;
exports.pluck = pluck;
exports.object = object;
exports.findColumn = findColumn;
exports.asname = asname;
exports.findWhere = findWhere;
exports.findEqual = findEqual;
exports.defaults = defaults;