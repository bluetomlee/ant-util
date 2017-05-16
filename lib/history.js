'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dynmicLookup = exports.stackUnBinder = exports.stackBinder = undefined;

var _array = require('./array');

// 动态作用域，任何JS核心引擎中，有个全局查找表
var globals = {};

var makeBind = function makeBind(resolver) {
  return function (name, val) {
    var stack = globals[name] || [];
    globals[name] = resolver(stack, val);
    return globals;
  };
};

var stackBinder = makeBind(function (stack, val) {
  stack.push(val);
  return stack;
});

var stackUnBinder = makeBind(function (stack) {
  stack.pop();
  return stack;
});

var dynmicLookup = function dynmicLookup(name) {
  var slot = globals[name] || [];
  return (0, _array.last)(slot);
};

exports.stackBinder = stackBinder;
exports.stackUnBinder = stackUnBinder;
exports.dynmicLookup = dynmicLookup;