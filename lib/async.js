'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decorate = exports.promiseChain = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _functions = require('./functions');

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

var decorate = function decorate(decorator, fn) {
  if ((0, _functions.isAsyncFn)(fn)) {
    return function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(context, payload) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // CAUTION 临时解决 babel 处理 async 参数时的 bug
                if (typeof decorator === 'function') decorator(context, payload);
                _context.next = 3;
                return fn(context, payload);

              case 3:
                return _context.abrupt('return', _context.sent);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function asyncDecoratedFn(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return asyncDecoratedFn;
    }();
  }

  return function () {
    if (typeof decorator === 'function') decorator.apply(undefined, arguments);
    return fn.apply(undefined, arguments);
  };
};

exports.promiseChain = promiseChain;
exports.decorate = decorate;