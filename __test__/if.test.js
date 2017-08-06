import util from '../src/index'

// 函数API
const {
  invoke,
  exec,
  match,
  concat,
  some,
  grund,
} = util

const {
  complement,
} = util

const returnCreator = (handle, args) => `${handle} function ${args} return value`
const returnAPICreator = (handle, functions) => functions.reduce((final, fun) => ({
  ...final,
  [`${fun}`]: returnCreator(handle, fun),
}), {})

// 反射执行
test('invoke', () => {
  const wait = data => console.log(`invoke function return value:${data.success}`)
  const success = data => console.log(`invoke function return value:${data.success}`)
  const fail = data => console.log(`invoke function return value:${data.success}`)

  // 重构前
  let callback = (wait, success, fail) => (code, data) => {
    if (code === 100) {
      return wait(data)
    } else if (code === 200) {
      return success(data)
    } else {
      return fail(data)
    }
  }

  let result = callback(wait, success, fail)
  result(100, {})
  result(200, { success: true })
  result(500, { success: false })

  // 重构后
  callback = list => (code, data) => invoke(list, code, data)
  result = callback({ 100: wait, 200: success, 500: fail })
  result(100, {})
  result(200, { success: true })
  result(500, { success: false })
})

// 根据某个条件执行函数
test('exec', () => {
  const array = []

  const isNull = arr => !arr.length

  // 重构前
  let callback = (array) => {
    if (isNull(array)) {
      return
    } else {
      console.log(array)
      return 'exec function return value'
    }
  }

  expect(callback(array)).toEqual(undefined)

  // 重构后
  callback = (array) => {
    console.log(array)
    return 'exec function return value'
  }

  // 数组为空，不会执行回调函数
  expect(exec(complement(isNull)(array), callback)(array)).toEqual(undefined)

  // 数组不为空，执行回调函数
  array.push('exec function initiation args')
  expect(exec(complement(isNull)(array), callback)(array)).toEqual('exec function return value')
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

// 连接函数
test('concat', () => {
  const returns = returnAPICreator('concat', ['first', 'second', 'third'])
  const isa = (type, action) => (obj, ...args) => type === obj.type ? action(obj, ...args) : undefined

  const command = concat(isa('first', (obj, ...args) => {
    console.log(args)
    return returns.first
  }), isa('second', (obj, ...args) => {
    console.log(args)
    return returns.second
  }))

  expect(command({ type: 'first' }, 'concat function initiation args')).toEqual([returns.first, undefined])
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
