'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _array = require('./array');

var array = _interopRequireWildcard(_array);

var _async = require('./async');

var async = _interopRequireWildcard(_async);

var _functions = require('./functions');

var functions = _interopRequireWildcard(_functions);

var _history = require('./history');

var history = _interopRequireWildcard(_history);

var _middleware = require('./middleware');

var middleware = _interopRequireWildcard(_middleware);

var _object = require('./object');

var object = _interopRequireWildcard(_object);

var _string = require('./string');

var string = _interopRequireWildcard(_string);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _extends3.default)({}, object, array, async, functions, history, middleware, object, string);
// import * as dom from './dom'