'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.complement = exports.partialRight = exports.partial = exports.grund = exports.inject = exports.curryless = exports.curry2 = exports.curry1 = exports.curry = exports.invoker = exports.some = exports.concat = exports.compose = exports.match = exports.exer = exports.exec = exports.binds = exports.any = exports.all = exports.invoke = exports.always = exports.translate = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _object = require('./object');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 加工 */
var translate = function translate(fun) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(Function, [null].concat(args, ['return ' + fun])))()();
};

/* 生成器 */
/*
 * 函数操作
 * */
var always = function always(value) {
  return function () {
    return value;
  };
};

/* 反射 */
var invoke = function invoke(obj, fun) {
  for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  return obj[fun] !== undefined ? obj[fun].apply(obj, args) : undefined;
};

/* 判断 */
var all = function all() {
  for (var _len3 = arguments.length, funs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    funs[_key3] = arguments[_key3];
  }

  return function (condition) {
    for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }

    return funs.reduce(function (truth, fun) {
      return truth && fun.apply(undefined, args) === condition;
    }, true);
  };
};

var any = function any() {
  for (var _len5 = arguments.length, funs = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    funs[_key5] = arguments[_key5];
  }

  return function (condition) {
    for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
      args[_key6 - 1] = arguments[_key6];
    }

    return funs.reduce(function (truth, fun) {
      return truth || fun.apply(undefined, args) === condition;
    }, false);
  };
};

/* 绑定 */
var binds = function binds(origin, methods, target) {
  return methods.forEach(function (methodName) {
    return origin[methodName] = origin[methodName].bind(target || origin);
  });
};

/* 执行 */
var exec = function exec(condition, handle) {
  return function () {
    return (0, _object.exist)(condition) ? handle.apply(undefined, arguments) : undefined;
  };
};

var exer = function exer(origin, name) {
  return function () {
    for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }

    var action = origin[name];
    return exec(action, function () {
      return typeof action === 'function' ? action.apply(undefined, args) : action;
    })();
  };
};

var match = function match(actions) {
  return function () {
    for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      args[_key8] = arguments[_key8];
    }

    return actions.map(function (_ref) {
      var condition = _ref.condition,
          action = _ref.action;
      return exec(condition, action).apply(undefined, args);
    });
  };
};

/* 柯里化 */
var compose = function compose(first) {
  for (var _len9 = arguments.length, last = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
    last[_key9 - 1] = arguments[_key9];
  }

  return function () {
    return last.reduce(function (composed, func) {
      return func(composed);
    }, first.apply(undefined, arguments));
  };
};

var concat = function concat() {
  for (var _len10 = arguments.length, funs = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
    funs[_key10] = arguments[_key10];
  }

  return function () {
    for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
      args[_key11] = arguments[_key11];
    }

    return funs.reduce(function (returns, fun) {
      return [].concat((0, _toConsumableArray3.default)(returns), [fun.apply(undefined, args)]);
    }, []);
  };
};

var some = function some() {
  for (var _len12 = arguments.length, funs = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
    funs[_key12] = arguments[_key12];
  }

  return function () {
    for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
      args[_key13] = arguments[_key13];
    }

    return funs.reduce(function (last, fun) {
      return last === undefined ? fun.apply(undefined, args) : last;
    }, undefined);
  };
};

var invoker = function invoker(name) {
  return function (target) {
    for (var _len14 = arguments.length, args = Array(_len14 > 1 ? _len14 - 1 : 0), _key14 = 1; _key14 < _len14; _key14++) {
      args[_key14 - 1] = arguments[_key14];
    }

    var targetMethod = target[name];
    return exec(targetMethod, targetMethod.bind(target)).apply(undefined, args);
  };
};

var curry = function curry(fun) {
  return function () {
    for (var _len15 = arguments.length, args = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
      args[_key15] = arguments[_key15];
    }

    return fun.call.apply(fun, [undefined].concat(args));
  };
};

var curry1 = function curry1(fun) {
  return function (middle) {
    return fun(middle);
  };
};

var curry2 = function curry2(fun) {
  return function (last) {
    return function (first) {
      return fun(first, last);
    };
  };
};

var curryless = function curryless(fun) {
  var args = [];
  var handle = function handle(arg) {
    args.push(arg);
    handle.done = function () {
      return fun.apply(undefined, (0, _toConsumableArray3.default)(args.reverse()));
    };
    return handle;
  };
  return handle;
};

var inject = function inject(fun, createArgsToInject) {
  var spread = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return function () {
    for (var _len16 = arguments.length, args = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
      args[_key16] = arguments[_key16];
    }

    var injectArgs = createArgsToInject.apply(undefined, args);
    return spread ? fun.apply(undefined, (0, _toConsumableArray3.default)(injectArgs).concat(args)) : fun.apply(undefined, [injectArgs].concat(args));
  };
};

var grund = function grund(checker, handle, errorHandle) {
  return function () {
    return checker.apply(undefined, arguments) ? handle.apply(undefined, arguments) : errorHandle.apply(undefined, arguments);
  };
};

var partial = function partial(fun) {
  for (var _len17 = arguments.length, argv = Array(_len17 > 1 ? _len17 - 1 : 0), _key17 = 1; _key17 < _len17; _key17++) {
    argv[_key17 - 1] = arguments[_key17];
  }

  return function () {
    for (var _len18 = arguments.length, rest = Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
      rest[_key18] = arguments[_key18];
    }

    return fun.call.apply(fun, [undefined].concat(argv, rest));
  };
};

var partialRight = function partialRight(fun) {
  for (var _len19 = arguments.length, argv = Array(_len19 > 1 ? _len19 - 1 : 0), _key19 = 1; _key19 < _len19; _key19++) {
    argv[_key19 - 1] = arguments[_key19];
  }

  return function () {
    for (var _len20 = arguments.length, rest = Array(_len20), _key20 = 0; _key20 < _len20; _key20++) {
      rest[_key20] = arguments[_key20];
    }

    return fun.call.apply(fun, [undefined].concat(rest, argv));
  };
};

var complement = function complement(fun) {
  return function () {
    return !fun.apply(undefined, arguments);
  };
};

exports.translate = translate;
exports.always = always;
exports.invoke = invoke;
exports.all = all;
exports.any = any;
exports.binds = binds;
exports.exec = exec;
exports.exer = exer;
exports.match = match;
exports.compose = compose;
exports.concat = concat;
exports.some = some;
exports.invoker = invoker;
exports.curry = curry;
exports.curry1 = curry1;
exports.curry2 = curry2;
exports.curryless = curryless;
exports.inject = inject;
exports.grund = grund;
exports.partial = partial;
exports.partialRight = partialRight;
exports.complement = complement;