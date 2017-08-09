'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nextTick = exports.getCookie = exports.go = exports.skipWindow = exports.openWindow = exports.safeDecodeURIComponent = exports.debounce = exports.getQuery = exports.getBrowserPrefix = exports.removeEvent = exports.addEvent = exports.offsetLeft = exports.offsetTop = exports.$ = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function $(selector) {
  return document.querySelector(selector);
}

function offsetTop(el) {
  var top = el.offsetTop;
  var parent = el.offsetParent;
  while (parent !== null) {
    top += parent.offsetTop;
    parent = parent.offsetParent;
  }
  return top;
}

function offsetLeft(el) {
  var left = el.offsetLeft;
  var parent = el.offsetParent;
  while (parent !== null) {
    left += parent.offsetLeft;
    parent = parent.offsetParent;
  }
  return left;
}

function addEvent(el, event, handler) {
  if (!el) return;
  if (el.attachEvent) {
    el.attachEvent('on' + event, handler);
  } else if (el.addEventListener) {
    el.addEventListener(event, handler, true);
  } else {
    el['on' + event] = handler;
  }
}

function removeEvent(el, event, handler) {
  if (!el) return;
  if (el.detachEvent) {
    el.detachEvent('on' + event, handler);
  } else if (el.removeEventListener) {
    el.removeEventListener(event, handler, true);
  } else {
    el['on' + event] = null;
  }
}

function getBrowserPrefix() {
  if (typeof window === 'undefined') return '';
  var styles = window.getComputedStyle(document.documentElement, '');
  var pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1];
  if (pre === 'ms') return pre;
  return pre.slice(0, 1).toUpperCase() + pre.slice(1);
}

/**
 * 获取url问号后边的变量相对应的值
 * @param {String} key
 * @return {String}
 */
function getQuery(key) {
  var reg = new RegExp('(^|&)' + key.toLowerCase() + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  return r ? decodeURI(r[2]) : '';
}

function debounce(fn) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;

  var timeout = void 0;
  var timestamp = void 0;
  var lastArgs = [];
  var context = null;

  function later() {
    var last = Date.now() - timestamp;
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      fn.call.apply(fn, [context].concat((0, _toConsumableArray3.default)(lastArgs)));
      timeout = null;
      lastArgs = [];
    }
  }

  return function debounced() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    lastArgs = args;
    context = this;
    timestamp = Date.now();
    if (!timeout) {
      setTimeout(later, wait);
    }
  };
}

function safeDecodeURIComponent(str) {
  try {
    return decodeURIComponent(str);
  } catch (e) {
    return str;
  }
}

var openWindow = function openWindow() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (url.indexOf('#') === 0) {
    location.hash = url;
  } else {
    window.open(url, '_blank');
  }
};

var skipWindow = function skipWindow(url) {
  location.href = url;
};

var go = function go(path) {
  return history.go(path);
};

var getCookie = function getCookie(key) {
  var m = new RegExp('\\b' + key + '\\=([^]+)').exec(document.cookie);
  return m ? m[1] : '';
};

var nextTick = function nextTick(callback) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return window.setTimeout(callback, delay);
};

exports.$ = $;
exports.offsetTop = offsetTop;
exports.offsetLeft = offsetLeft;
exports.addEvent = addEvent;
exports.removeEvent = removeEvent;
exports.getBrowserPrefix = getBrowserPrefix;
exports.getQuery = getQuery;
exports.debounce = debounce;
exports.safeDecodeURIComponent = safeDecodeURIComponent;
exports.openWindow = openWindow;
exports.skipWindow = skipWindow;
exports.go = go;
exports.getCookie = getCookie;
exports.nextTick = nextTick;