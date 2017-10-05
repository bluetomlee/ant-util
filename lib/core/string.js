'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var capitalize = function capitalize(str) {
  return str === undefined || str.length === 0 ? str : '' + str[0].toUpperCase() + str.slice(1);
};

var upper = function upper(str) {
  return str === undefined || str.length === 0 ? str : '' + str[0].toUpperCase() + str.slice(1);
};

var lower = function lower(str) {
  return str === undefined || str.length === 0 ? str : '' + str[0].toLowerCase() + str.slice(1);
};

/* istanbul ignore next */
var uniqueString = function uniqueString(len) {
  return Math.random().toString(36).substr(2, len);
};
// console.log(uniqueString(10))

/* istanbul ignore next */
var uniquePrefix = function uniquePrefix(prefix) {
  return [prefix, new Date().getTime()].join('');
};
// console.log(uniquePrefix('ghosts'))
// console.log(uniquePrefix('turkey'))

var indexGenerator = function indexGenerator(counter, prefix) {
  return function () {
    var pre = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : prefix;
    return [pre, counter++].join('');
  };
};
// const g1 = indexGenerator(0, 'prefix')
// console.log(g1())
// console.log(g1())
// console.log(g1('new'))

var replace = function replace(content) {
  return function (reg, handle) {
    return content.replace(reg, handle);
  };
};

exports.capitalize = capitalize;
exports.upper = upper;
exports.lower = lower;
exports.uniqueString = uniqueString;
exports.uniquePrefix = uniquePrefix;
exports.indexGenerator = indexGenerator;
exports.replace = replace;