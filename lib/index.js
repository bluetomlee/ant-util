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

var _dom = require('./plugins/dom');

var dom = _interopRequireWildcard(_dom);

var _url = require('./plugins/url');

var url = _interopRequireWildcard(_url);

var _exist = require('./plugins/exist');

var exist = _interopRequireWildcard(_exist);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _extends3.default)({}, array, functions, object, string, {
  plugins: {
    dom: dom,
    url: url,
    exist: exist
  }
});