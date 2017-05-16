"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var capitalize = function capitalize(str) {
  return str === undefined || str.length === 0 ? str : "" + str[0].toUpperCase() + str.slice(1);
};

exports.capitalize = capitalize;