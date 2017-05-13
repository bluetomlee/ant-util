"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMiddleware = exports.concatMiddlewares = undefined;

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * 函数中间件操作
 * */
var concatMiddlewares = function concatMiddlewares(defaultListeners, middlewares) {
  return middlewares.reduce(function (listeners, middleware) {
    return middleware(listeners);
  }, defaultListeners);
};

var createMiddleware = function createMiddleware(handle, listeners) {
  return function (originListeners) {
    return (0, _keys2.default)(listeners).reduce(function (originListener, key) {
      originListener[key] = handle(listeners[key], key);
      return originListener;
    }, originListeners);
  };
};

exports.concatMiddlewares = concatMiddlewares;
exports.createMiddleware = createMiddleware;