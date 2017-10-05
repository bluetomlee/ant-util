'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringifyQuery = exports.parseQuery = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _object = require('../core/object');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseQuery = function parseQuery() {
  var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return search ? search.replace(/\?/, '').split('&').reduce(function (query, expression) {
    var _expression$split = expression.split('='),
        _expression$split2 = (0, _slicedToArray3.default)(_expression$split, 2),
        key = _expression$split2[0],
        _expression$split2$ = _expression$split2[1],
        value = _expression$split2$ === undefined ? '' : _expression$split2$;

    return (0, _object.exist)(key) ? (0, _extends4.default)({}, query, (0, _defineProperty3.default)({}, key, decodeURIComponent(value))) : query;
  }, {}) : {};
};

var stringifyQuery = function stringifyQuery() {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _object.truthy)(query) ? (0, _object.map2Array)(query, function (value, key) {
    return key + '=' + encodeURIComponent(value);
  }).join('&') : '';
};

exports.parseQuery = parseQuery;
exports.stringifyQuery = stringifyQuery;