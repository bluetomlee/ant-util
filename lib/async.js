"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promiseChain = undefined;

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * 异步函数操作
 * */
var promiseChain = function promiseChain(currentPromise) {
  for (var _len = arguments.length, nextPromise = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    nextPromise[_key - 1] = arguments[_key];
  }

  return _promise2.default.resolve(currentPromise && currentPromise().then(function () {
    return nextPromise.length > 0 && promiseChain.apply(undefined, nextPromise);
  }));
};

exports.promiseChain = promiseChain;