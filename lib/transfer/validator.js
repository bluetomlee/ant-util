'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var grund = function grund(checker, handle) {
  var errorCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (args) {
    return args;
  };
  return function () {
    var result = checker.apply(undefined, arguments);
    if (result.length) {
      errorCallback(result);
    } else {
      return handle.apply(undefined, arguments);
    }
  };
};

var checker = function checker() {
  for (var _len = arguments.length, validators = Array(_len), _key = 0; _key < _len; _key++) {
    validators[_key] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return validators.reduce(function (errors, validator) {
      return validator.apply(undefined, args) ? errors : [].concat((0, _toConsumableArray3.default)(errors), [validator.message]);
    }, []);
  };
};

var validator = function validator(handle, message) {
  var fun = function fun() {
    return handle.apply(undefined, arguments);
  };
  fun.message = message;
  return fun;
};

var hasKeys = function hasKeys() {
  for (var _len3 = arguments.length, keys = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    keys[_key3] = arguments[_key3];
  }

  var fun = function fun(obj) {
    return keys.every(function (key) {
      return obj[key] !== undefined;
    });
  };
  fun.message = 'object must have value of keys: ' + keys;
  return fun;
};

// test
var v1 = function v1(object) {
  return object.a === 1;
};

var v2 = function v2(object) {
  return object.b === 2;
};

var v3 = function v3(object) {
  return object.c === true;
};

// test
var c1 = checker(validator(v1, 'error1'), validator(v2, 'error2'), validator(v3, 'error3'), hasKeys('a', 'b', 'c', 'd'));

var object = {
  a: 1,
  b: 2,
  c: true
};

console.log(c1(object));

var handle = function handle() {
  for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  console.log('继续处理', args);
  return '返回正确';
};

grund(c1, handle, function (errors) {
  return console.log(errors);
})(object);