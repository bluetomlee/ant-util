import util from '../src/index'

// 函数API
const {
  translate,
  always,
  compose,
  concat,
  some,
  invoke,
  all,
  any,
  binds,
  exec,
  exer,
  match,
  curry,
  inject,
  grund,
  partial,
  partialRight,
} = util

// 其他函数
const {
  repeatness,
} = util

const returnCreator = (handle, args) => `${handle} function ${args} return value`
const returnAPICreator = (handle, functions) => functions.reduce((final, fun) => ({ ...final, [`${fun}`]: returnCreator(handle, fun) }), {})

// 函数字符串转函数
test('translate', () => {
  let result = null

  // 最简单的用法
  const functionStringSimple = "function handle() { return 'my name is ant'}"
  result = translate(functionStringSimple)()
  expect(result).toEqual('my name is ant')

  // 带参数与返回值的函数
  const functionStringCommon = "function handle(prop, value) { return 'my ' + prop + ' is ' + value}"
  result = translate(functionStringCommon)('name', 'ant')
  expect(result).toEqual('my name is ant')

  // 动态参数的函数
  const handleDynmicArgs = prop => `function handle(value) { return 'my ' + '${prop}' + ' is ' + value}`
  result = translate(handleDynmicArgs('name'))('ant')
  expect(result).toEqual('my name is ant')
})

// 用来创建指定返回值的函数
test('always', () => {
  expect(repeatness(always('Odelay'), 3)).toEqual(['Odelay', 'Odelay', 'Odelay'])
})

// 组合函数
test('compose', () => {
  const returns = returnAPICreator('compose', ['first', 'second', 'third'])

  const first = (...args) => {
    console.log(...args)
    return returns.first
  }
  const second = (...args) => {
    console.log(...args)
    return returns.second
  }
  const third = (...args) => {
    console.log(...args)
    return returns.third
  }

  // 依次执行first, second, third函数，传入初始化参数到第一个函数，把每个函数的返回值传入下个函数的参数，返回最后一个函数的返回值
  expect(compose(first, second, third)('compose function initiation args')).toEqual(returns.third)
})

// 连接函数
test('concat', () => {
  const returns = returnAPICreator('concat', ['first', 'second', 'third'])

  const first = (...args) => {
    console.log(...args)
    return returns.first
  }
  const second = (...args) => {
    console.log(...args)
    return returns.second
  }
  const third = (...args) => {
    console.log(...args)
    return returns.third
  }

  // 依次执行first, second, third函数，传入初始化参数，返回所有函数的返回值数组
  expect(concat(first, second, third)('concat function initiation args')).toEqual([returns.first, returns.second, returns.third])
})

// 返回第一个有返回值的函数的返回值
test('some', () => {
  const returns = returnAPICreator('some', ['first', 'second', 'third'])
  const first = (...args) => {
    console.log(...args)
  }
  const second = (...args) => {
    console.log(...args)
    return returns.second
  }
  const third = (...args) => {
    console.log(...args)
    return returns.third
  }

  // 返回第一个有返回的函数second的返回值
  expect(some(first, second, third)('some function initiation args')).toEqual(returns.second)
})

// 反射执行
test('invoke', () => {
  const returns = returnAPICreator('invoke', ['first', 'second', 'third'])

  const first = (...args) => {
    console.log(...args)
    return returns.first
  }
  const second = (...args) => {
    console.log(...args)
    return returns.second
  }
  const third = (...args) => {
    console.log(...args)
    return returns.third
  }

  const fns = { first, second, third }
  // 执行second函数
  expect(invoke(fns, 'second', 'invoke function initiation args')).toEqual(returns.second)
})

// 所有函数都返回某个条件，会返回true，否则返回false
test('all', () => {
  const first = (...args) => {
    console.log(...args)
    return true
  }
  const second = (...args) => {
    console.log(...args)
    return true
  }
  const third = (...args) => {
    console.log(...args)
    return true
  }

  // 所有函数都返回true，最终返回true, 示例函数全部执行
  expect(all(first, second, third)(true, 'all function initiation args')).toEqual(true)
  // 所有条件都不会返回false, 最终返回false, 示例函数只会执行一个
  expect(all(first, second, third)(false, 'all function initiation args')).toEqual(false)
})

// 任意函数返回某个条件，会返回true，否则返回false
test('any', () => {
  const first = (...args) => {
    console.log(...args)
    return false
  }
  const second = (...args) => {
    console.log(...args)
    return false
  }
  const third = (...args) => {
    console.log(...args)
    return true
  }

  // 任意函数返回true，最终返回true, 示例函数全部执行
  expect(any(first, second, third)(true, 'any function initiation args')).toEqual(true)
  // 任意函数返回false，最终返回true, 示例函数只会执行一个
  expect(any(first, second, third)(false, 'any function initiation args')).toEqual(true)
})

// 绑定对象的指定函数
test('binds', () => {
  function first() {
    return this.name
  }

  function second() {
    return this.name
  }

  const fns = { first, second }
  // first函数绑定name: ant
  binds(fns, ['first'], { name: 'ant' })
  expect(fns.first()).toEqual('ant')
  expect(fns.second()).toEqual(undefined)
})

// 根据某个条件执行函数
test('exec', () => {
  const array = []

  const conditionCreate = arr => arr.length

  const callback = (...args) => {
    console.log(...args)
    return 'exec function return value'
  }

  // 数组为空，不会执行回调函数
  expect(exec(conditionCreate(array), callback)(...array)).toEqual(undefined)

  // 数组不为空，执行回调函数
  array.push('exec function initiation args')
  expect(exec(conditionCreate(array), callback)(...array)).toEqual('exec function return value')
})

// 获得对象的某个属性，如果是函数执行函数，如果是属性直接返回
test('exer', () => {
  const first = 'first'
  const second = (...args) => {
    console.log(...args)
    return 'second'
  }
  const fns = { first, second }
  expect(exer(fns, 'first')('exer function initiation args')).toEqual('first')
  expect(exer(fns, 'second')('exer function initiation args')).toEqual('second')
})

// 根据传入的条件集判断是否执行函数，可以完全代替if
test('match', () => {
  const returns = returnAPICreator('match', ['first', 'second', 'third'])

  const first = (...args) => {
    console.log(...args)
    return returns.first
  }
  const second = (...args) => {
    console.log(...args)
    return returns.second
  }
  const third = (...args) => {
    console.log(...args)
    return returns.third
  }
  const fns = { first, second, third }

  const mapCreator = code => [
    { condition: code === 1, action: fns.first },
    { condition: code === 2, action: fns.second },
    { condition: code > 1, action: fns.third },
  ]

  // 执行条件 code === 2 与 code > 1的函数second， third
  const code = 2
  expect(match(mapCreator(code))('match function initiation args')).toEqual([undefined, returns.second, returns.third])
})

// 柯里化函数
test('curry', () => {
  const fn = (...args) => {
    console.log(...args)
    return 'curry function return value'
  }

  // 拆分函数与参数
  expect(curry(fn)('curry function initiation args')).toEqual('curry function return value')
})

// 根据传入函数的返回注入函数参数
test('inject', () => {
  const fn = (...args) => {
    console.log('inject function final args is:', ...args)
    return 'inject function return value'
  }

  function resolve(originArgs) {
    console.log('inject function origin args is:', originArgs)
    return 'final args'
  }

  expect(inject(fn, resolve)('origin args')).toEqual('inject function return value')
})

// 检测函数参数
test('grund', () => {
  function setValue(object, path, value) {
    object[path] = value
    return 'setValue success'
  }

  const finalSet = grund((object, path) => !!object && !!path, setValue, () => console.log('grund function args error'))

  const obj = {}
  expect(finalSet(obj, 'name', 'ant')).toEqual('setValue success')
})

// 在原函数参数左侧注入参数
test('partial', () => {
  const fn = (...args) => {
    console.log('partial function args is:', ...args)
    return true
  }

  // 原来参数的左侧注入：argsrest参数
  expect([1, 2, 3].map(partial(fn, 'argsrest'))).toEqual([true, true, true])
})

// 在原函数参数右侧注入参数
test('partialRight', () => {
  const fn = (...args) => {
    console.log('partialRight function args is:', ...args)
    return true
  }

  // 原来参数的右侧注入：argsrest参数
  expect([1, 2, 3].map(partialRight(fn, 'argsrest'))).toEqual([true, true, true])
})
