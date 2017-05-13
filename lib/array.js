"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * 数组操作
 * */
var removeItem = function removeItem(arr, item) {
  return arr.includes(item) && arr.splice(arr.indexOf(item), 1);
};

var diff = function diff(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every(function (value) {
    return arr2.includes(value);
  });
};

exports.removeItem = removeItem;
exports.diff = diff;