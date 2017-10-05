'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.complement = exports.inject = exports.partialLeft = exports.partial = exports.grund = exports.choose = exports.curryless = exports.curry2 = exports.curry1 = exports.curry = exports.some = exports.concat = exports.compose = exports.anyness = exports.allness = exports.any = exports.all = exports.match = exports.invoker = exports.invoke = exports.run = exports.exer = exports.exec = exports.binds = exports.always = exports.translate = undefined;

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

/* 绑定 */
var binds = function binds(origin, methods, target) {
  return methods.forEach(function (methodName) {
    return origin[methodName] = origin[methodName].bind(target || origin);
  });
};

/* 执行 */
var exec = function exec(condition, handle, defaultValue) {
  return function () {
    return (0, _object.exist)(condition) ? handle.apply(undefined, arguments) : defaultValue;
  };
};

var exer = function exer(target, name) {
  return function () {
    var cleat = target[name] || target;
    return typeof cleat === 'function' ? exec(cleat, cleat).apply(undefined, arguments) : cleat;
  };
};

var run = function run(hundle) {
  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return hundle.apply(undefined, args);
};

var invoke = function invoke(obj, fun) {
  for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    args[_key3 - 2] = arguments[_key3];
  }

  return obj[fun] !== undefined ? obj[fun].apply(obj, args) : undefined;
};

var invoker = function invoker(name) {
  return function (target) {
    for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }

    var targetMethod = target[name];
    return exec(targetMethod, targetMethod.bind(target)).apply(undefined, args);
  };
};

var match = function match(actions) {
  return function () {
    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    return actions.map(function (_ref) {
      var condition = _ref.condition,
          action = _ref.action;
      return exec(condition, action).apply(undefined, args);
    });
  };
};

/* 判断 */
var all = function all() {
  for (var _len6 = arguments.length, funs = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    funs[_key6] = arguments[_key6];
  }

  return function (condition) {
    for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
      args[_key7 - 1] = arguments[_key7];
    }

    return funs.reduce(function (truth, fun) {
      return truth && exer(fun).apply(undefined, args) === condition;
    }, true);
  };
};

var any = function any() {
  for (var _len8 = arguments.length, funs = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
    funs[_key8] = arguments[_key8];
  }

  return function (condition) {
    for (var _len9 = arguments.length, args = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
      args[_key9 - 1] = arguments[_key9];
    }

    return funs.reduce(function (truth, fun) {
      return truth || exer(fun).apply(undefined, args) === condition;
    }, false);
  };
};

var allness = function allness() {
  for (var _len10 = arguments.length, conditions = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
    conditions[_key10] = arguments[_key10];
  }

  return conditions.reduce(function (truth, condition) {
    return truth && condition;
  }, true);
};

var anyness = function anyness() {
  for (var _len11 = arguments.length, conditions = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
    conditions[_key11] = arguments[_key11];
  }

  return conditions.reduce(function (truth, condition) {
    return truth || condition;
  }, false);
};

/* 柯里化 */
var compose = function compose(first) {
  for (var _len12 = arguments.length, last = Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
    last[_key12 - 1] = arguments[_key12];
  }

  return function () {
    return last.reduce(function (composed, func) {
      return func(composed);
    }, first.apply(undefined, arguments));
  };
};

var concat = function concat() {
  for (var _len13 = arguments.length, funs = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
    funs[_key13] = arguments[_key13];
  }

  return function () {
    for (var _len14 = arguments.length, args = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
      args[_key14] = arguments[_key14];
    }

    return funs.reduce(function (returns, fun) {
      return [].concat((0, _toConsumableArray3.default)(returns), [fun.apply(undefined, args)]);
    }, []);
  };
};

var some = function some() {
  for (var _len15 = arguments.length, funs = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
    funs[_key15] = arguments[_key15];
  }

  return function () {
    for (var _len16 = arguments.length, args = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
      args[_key16] = arguments[_key16];
    }

    return funs.reduce(function (last, fun) {
      return last === undefined ? fun.apply(undefined, args) : last;
    }, undefined);
  };
};

var curry = function curry(fun) {
  return function () {
    for (var _len17 = arguments.length, args = Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
      args[_key17] = arguments[_key17];
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

var choose = function choose() {
  for (var _len18 = arguments.length, conditions = Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
    conditions[_key18] = arguments[_key18];
  }

  return function () {
    for (var _len19 = arguments.length, values = Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
      values[_key19] = arguments[_key19];
    }

    return values.find(function (val, index) {
      return (0, _object.exist)(conditions[index]);
    });
  };
};

var grund = function grund(checker, handle, errorHandle) {
  return function () {
    return exer(checker).apply(undefined, arguments) ? handle.apply(undefined, arguments) : errorHandle.apply(undefined, arguments);
  };
};

var partial = function partial(fun) {
  for (var _len20 = arguments.length, argv = Array(_len20 > 1 ? _len20 - 1 : 0), _key20 = 1; _key20 < _len20; _key20++) {
    argv[_key20 - 1] = arguments[_key20];
  }

  return function () {
    for (var _len21 = arguments.length, rest = Array(_len21), _key21 = 0; _key21 < _len21; _key21++) {
      rest[_key21] = arguments[_key21];
    }

    return fun.call.apply(fun, [undefined].concat(rest, argv));
  };
};

var partialLeft = function partialLeft(fun) {
  for (var _len22 = arguments.length, argv = Array(_len22 > 1 ? _len22 - 1 : 0), _key22 = 1; _key22 < _len22; _key22++) {
    argv[_key22 - 1] = arguments[_key22];
  }

  return function () {
    for (var _len23 = arguments.length, rest = Array(_len23), _key23 = 0; _key23 < _len23; _key23++) {
      rest[_key23] = arguments[_key23];
    }

    return fun.call.apply(fun, [undefined].concat(argv, rest));
  };
};

var inject = function inject(fun, createArgsToInject) {
  var spread = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return function () {
    for (var _len24 = arguments.length, args = Array(_len24), _key24 = 0; _key24 < _len24; _key24++) {
      args[_key24] = arguments[_key24];
    }

    var injectArgs = createArgsToInject.apply(undefined, args);
    return spread ? fun.apply(undefined, (0, _toConsumableArray3.default)(injectArgs).concat(args)) : fun.apply(undefined, [injectArgs].concat(args));
  };
};

var complement = function complement(fun) {
  return function () {
    return !fun.apply(undefined, arguments);
  };
};

exports.translate = translate;
exports.always = always;
exports.binds = binds;
exports.exec = exec;
exports.exer = exer;
exports.run = run;
exports.invoke = invoke;
exports.invoker = invoker;
exports.match = match;
exports.all = all;
exports.any = any;
exports.allness = allness;
exports.anyness = anyness;
exports.compose = compose;
exports.concat = concat;
exports.some = some;
exports.curry = curry;
exports.curry1 = curry1;
exports.curry2 = curry2;
exports.curryless = curryless;
exports.choose = choose;
exports.grund = grund;
exports.partial = partial;
exports.partialLeft = partialLeft;
exports.inject = inject;
exports.complement = complement;