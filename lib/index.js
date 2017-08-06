'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _array = require('./core/array');

var array = _interopRequireWildcard(_array);

var _functions = require('./core/functions');

var functions = _interopRequireWildcard(_functions);

var _object = require('./core/object');

var object = _interopRequireWildcard(_object);

var _string = require('./core/string');

var string = _interopRequireWildcard(_string);

var _async = require('./plugins/async');

var async = _interopRequireWildcard(_async);

var _history = require('./plugins/history');

var history = _interopRequireWildcard(_history);

var _middleware = require('./plugins/middleware');

var middleware = _interopRequireWildcard(_middleware);

var _dom = require('./plugins/dom');

var dom = _interopRequireWildcard(_dom);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _extends3.default)({}, array, functions, object, string, {
  plugins: {
    async: async,
    history: history,
    middleware: middleware,
    dom: dom
  }
});