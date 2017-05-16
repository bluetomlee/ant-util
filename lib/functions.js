'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propExecer = exports.separate = exports.isAsyncFn = exports.complement = exports.bindAll = exports.binds = exports.any = exports.all = exports.divider = exports.execer = exports.some = exports.switcher = exports.concat = exports.compose = exports.translate = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _object = require('./object');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var translate = function translate(string) {
  return new Function('return ' + string)();
}; /*
    * 函数操作
    * */


var compose = function compose(first) {
  for (var _len = arguments.length, last = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    last[_key - 1] = arguments[_key];
  }

  return function () {
    return last.reduce(function (composed, func) {
      return func(composed);
    }, first.apply(undefined, arguments));
  };
};

var concat = function concat() {
  for (var _len2 = arguments.length, funcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    funcs[_key2] = arguments[_key2];
  }

  return function () {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return funcs.reduce(function (returns, func) {
      return [].concat((0, _toConsumableArray3.default)(returns), [func.apply(undefined, args)]);
    }, []);
  };
};

var switcher = function switcher(map) {
  return function (type) {
    for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }

    return map[type] !== undefined ? map[type].apply(map, args) : undefined;
  };
};

var some = function some() {
  for (var _len5 = arguments.length, funs = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    funs[_key5] = arguments[_key5];
  }

  return function () {
    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    return funs.reduce(function (last, fun) {
      return last === undefined ? fun.apply(undefined, args) : last;
    }, undefined);
  };
};

var execer = function execer(condition, action) {
  return function () {
    return (0, _object.existy)(condition) ? action.apply(undefined, arguments) : undefined;
  };
};

var divider = function divider(actions) {
  return function () {
    for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }

    return actions.map(function (_ref) {
      var condition = _ref.condition,
          action = _ref.action,
          name = _ref.name;
      return { name: name, value: execer(condition, action).apply(undefined, args) };
    });
  };
};

var all = function all() {
  for (var _len8 = arguments.length, funs = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
    funs[_key8] = arguments[_key8];
  }

  return function (condition) {
    return funs.reduce(function (truth, fun) {
      return truth && fun() === condition;
    }, true);
  };
};

var any = function any() {
  for (var _len9 = arguments.length, funs = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
    funs[_key9] = arguments[_key9];
  }

  return function (condition) {
    return funs.reduce(function (truth, fun) {
      return truth || fun() === condition;
    }, false);
  };
};

var binds = function binds(target, methods) {
  return methods.forEach(function (methodName) {
    return target[methodName] = target[methodName].bind(target);
  });
};

var bindAll = function bindAll(obj) {
  for (var _len10 = arguments.length, funs = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
    funs[_key10 - 1] = arguments[_key10];
  }

  return funs.map(function (fun) {
    return obj[fun] = obj[fun].bind(obj);
  });
};

var complement = function complement(fun) {
  return function () {
    return !fun.apply(undefined, arguments);
  };
};

var isAsyncFn = function isAsyncFn() {
  var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
  return (/^async/.test(fn.name || '')
  );
};

var separate = function separate(fn) {
  return function () {
    for (var _len11 = arguments.length, argv = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
      argv[_key11] = arguments[_key11];
    }

    return fn.call.apply(fn, [undefined].concat(argv));
  };
};

var propExecer = function propExecer(target, name) {
  return function () {
    for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
      args[_key12] = arguments[_key12];
    }

    var action = target[name];
    return execer(action, function () {
      return typeof action === 'function' ? action.apply(target, args) : action;
    })();
  };
};

exports.translate = translate;
exports.compose = compose;
exports.concat = concat;
exports.switcher = switcher;
exports.some = some;
exports.execer = execer;
exports.divider = divider;
exports.all = all;
exports.any = any;
exports.binds = binds;
exports.bindAll = bindAll;
exports.complement = complement;
exports.isAsyncFn = isAsyncFn;
exports.separate = separate;
exports.propExecer = propExecer;