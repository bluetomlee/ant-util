"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var assert = function assert(codication, error) {
  var handle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : console.log;
  return !codication && handle(error);
};

exports.assert = assert;