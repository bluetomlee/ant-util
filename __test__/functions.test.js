import util from '../src/index'

const {
  translate,
  compose,
  concat,
  some,
  invoke,
  all,
  any,
  binds,
  exec,
  match,
  exer,
  sep,
  inject,
  grund,
  partial,
  partialRight,
} = util

// 函数字符串转函数
test('translate', () => {
  const test = "function a() { return 'test'}"
  expect(translate(test)()).toEqual('test')
})

// 合并
test('compose', () => {
  const fn1 = (...args) => {
    console.log(...args)
    return 'fn1'
  }
  const fn2 = (...args) => {
    console.log(...args)
    return 'fn2'
  }
  const fn3 = (...args) => {
    console.log(...args)
    return 'fn3'
  }

  expect(compose(fn1, fn2, fn3)('init')).toEqual('fn3')
})

// 连接
test('concat', () => {
  const fn1 = (...args) => {
    console.log(...args)
    return 'fn1'
  }
  const fn2 = (...args) => {
    console.log(...args)
    return 'fn2'
  }
  const fn3 = (...args) => {
    console.log(...args)
    return 'fn3'
  }

  expect(concat(fn1, fn2, fn3)('init')).toEqual(['fn1', 'fn2', 'fn3'])
})

// 检测有返回的函数返回
test('some', () => {
  const fn1 = (...args) => {
    console.log(...args)
    return 'fn1'
  }
  const fn2 = (...args) => {
    console.log(...args)
    return 'fn2'
  }
  const fn3 = (...args) => {
    console.log(...args)
    return 'fn3'
  }

  expect(some(fn1, fn2, fn3)('init')).toEqual('fn1')
})

// 反射执行
test('invoke', () => {
  const fn1 = (...args) => {
    console.log(...args)
    return 'fn1'
  }
  const fn2 = (...args) => {
    console.log(...args)
    return 'fn2'
  }
  const fn3 = (...args) => {
    console.log(...args)
    return 'fn3'
  }
  const fns = { fn1, fn2, fn3 }
  expect(invoke(fns, 'fn2', 'init')).toEqual('fn2')
})

// 所有条件都返回true才会返回true
test('all', () => {
  const fn1 = (...args) => {
    console.log(...args)
    return true
  }
  const fn2 = (...args) => {
    console.log(...args)
    return true
  }
  const fn3 = (...args) => {
    console.log(...args)
    return true
  }

  expect(all(fn1, fn2, fn3)(true)).toEqual(true)
})

// 任意一个返回false就返回true
test('any', () => {
  const fn1 = (...args) => {
    console.log(...args)
    return false
  }
  const fn2 = (...args) => {
    console.log(...args)
    return true
  }
  const fn3 = (...args) => {
    console.log(...args)
    return true
  }

  expect(any(fn1, fn2, fn3)(true)).toEqual(true)
})

// 绑定对象的指定函数
test('binds', () => {
  function fn1() {
    return this.name
  }
  const fns = { fn1 }
  binds(fns, ['fn1'], { name: 'test' })
  expect(fns.fn1()).toEqual('test')
})

// 根据某个条件执行函数
test('exec', () => {
  const fn = (...args) => {
    console.log(...args)
    return true
  }

  expect(exec(true, fn)(1, 2, 3)).toEqual(true)
})

// 根据传入的条件集判断是否执行函数，可以完全代替if
test('match', () => {
  const fn1 = (...args) => {
    console.log(...args)
    return 'fn1'
  }
  const fn2 = (...args) => {
    console.log(...args)
    return 'fn2'
  }
  const fn3 = (...args) => {
    console.log(...args)
    return 'fn3'
  }
  const fns = { fn1, fn2, fn3 }

  const mapperCreator = code => [
    { condition: code === 1, action: fns.fn1 },
    { condition: code === 2, action: fns.fn2 },
    { condition: code > 1, action: fns.fn3 },
  ]

  expect(match(mapperCreator(2))('init')).toEqual([undefined, 'fn2', 'fn3'])
})

// 获得对象的某个属性，如果是函数执行函数，如果是属性直接返回
test('exer', () => {
  const fn1 = 'fn1'
  const fn2 = (...args) => {
    console.log(...args)
    return 'fn2'
  }
  const fns = { fn1, fn2 }
  expect(exer(fns, 'fn1')('init')).toEqual('fn1')
  expect(exer(fns, 'fn2')('init')).toEqual('fn2')
})

// 柯里化函数
test('sep', () => {
  const fn = (...args) => {
    console.log(...args)
    return true
  }

  expect(sep(fn)('init')).toEqual(true)
})

// 根据传入函数的返回注入函数参数
test('inject', () => {
  function test(...args) {
    console.log(...args)
    return 2
  }

  function resolve(originArgs) {
    console.log('原始参数', originArgs)
    return 2
  }

  expect(inject(test, resolve)(1)).toEqual(2)
})

// 检测函数参数
test('grund', () => {
  function set(path, value) {
    console.log(path, value)
    return 'final'
  }

  const finalSet = grund(set, (path) => {
    if (!path) {
      return false
    }
    return true
  })

  expect(finalSet('a', 'a')).toEqual('final')
})

// 在原函数参数右侧注入参数
test('partial', () => {
  const fn = (...args) => {
    console.log(...args)
    return true
  }

  expect([1, 2, 3].map(partial(fn, 'argsrest'))).toEqual([true, true, true])
})

// 在原函数参数左侧注入参数
test('partialRight', () => {
  const fn = (...args) => {
    console.log(...args)
    return true
  }

  expect([1, 2, 3].map(partialRight(fn, 'argsrest'))).toEqual([true, true, true])
})
