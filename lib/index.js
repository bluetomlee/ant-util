'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chainArray = exports.a = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _array = require('./array');

Object.defineProperty(exports, 'chainArray', {
  enumerable: true,
  get: function get() {
    return _array.chainArray;
  }
});

var array = _interopRequireWildcard(_array);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var a = (0, _extends3.default)({}, array);

console.log(a);
//delete a.defaults
//console.log(a)
//import * as async from './async'
//// import * as dom from './dom'
//import * as functions from './functions'
//import * as history from './history'
//import * as middleware from './middleware'
//import * as object from './object'
//import * as string from './string'


exports.a = array.default;