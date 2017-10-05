import util from '../src/index'

const {
  keys,
  identity,
  typeChecker,
  typeGetter,
  plucker,
  each,
  reduce,
  filter,
  mapKey,
  map,
  map2Array,
  values,
  pairs,
  unpairs,
  zip,
  unzip,
  invert,
  omit,
  pick,
  exist,
  truthy,
  setDefault,
  mergeDefault,
  different,
  shallowEqual,
  against,
  removeItem,
  deepEach,
  walk,
} = util

// 其他函数
const {
  partialLeft,
} = util

const constValue = 'constValue'
const testInitial = {
  initial: 'initialValue',
}
const testObject = {
  a: 'a1',
  b: 'b1',
  c: 'c1',
}

const testDeepObject = {
  children: [{
    children: [{
      children: [{
        test: 1,
      }],
    }],
  }],
}

// 获取对象的键列表
test('keys', () => {
  expect(keys({
    constValue,
  })).toEqual(['constValue'])
})

// 返回输入参数的函数
test('identity', () => {
  expect(identity(constValue)).toEqual(constValue)
})

// 判断对象类型
test('typeChecker', () => {
  expect(typeChecker(constValue)('string')).toEqual(true)
  expect(typeChecker({})('object')).toEqual(true)
  expect(typeChecker(() => {
  })('function')).toEqual(true)
  expect(typeChecker(null)('null')).toEqual(true)
  expect(typeChecker(undefined)('undefined')).toEqual(true)
  expect(typeChecker(0)('number')).toEqual(true)
})

// 获取对象类型
test('typeGetter', () => {
  expect(typeGetter(constValue)).toEqual('String')
  expect(typeGetter({})).toEqual('Object')
  expect(typeGetter(() => {
  })).toEqual('Function')
  expect(typeGetter(null)).toEqual('Null')
  expect(typeGetter(undefined)).toEqual('Undefined')
  expect(typeGetter(0)).toEqual('Number')
})

// 萃取对象属性
test('plucker', () => {
  const datas = [{ name: 'test' }]
  expect(datas.map(plucker('name'))).toEqual(['test'])
})

// 遍历对象
test('each', () => {
  each(testObject, partialLeft(console.log, 'each函数输出:'))
})

// reduce对象,与数组reduce相同
test('reduce', () => {
  expect(reduce(testObject, (last, item, key, index) =>
    ({ ...last, [key]: `${item}${key}${index}` }), testInitial)).toEqual({
    a: 'a1a0',
    b: 'b1b1',
    c: 'c1c2',
    ...testInitial,
  })
})

// 对象过滤
test('filter', () => {
  expect(filter(testObject, (item, key, index) =>
    (key === 'a' || index === 2), testInitial)).toEqual({
    a: 'a1',
    c: 'c1',
  })
})

// map键
test('mapKey', () => {
  expect(mapKey(testObject, {
    a: 'x',
    b: 'y',
  })).toEqual({
    x: 'a1',
    y: 'b1',
    c: 'c1',
  })
})

// map对象
test('map', () => {
  expect(map(testObject, (value, key, index) => {
    return `${key}${index}`
  })).toEqual({
    a: 'a0',
    b: 'b1',
    c: 'c2',
  })
})

// map成数组
test('map2Array', () => {
  expect(map2Array(testObject, (item, key, index) => ({ item, key, index })))
  .toEqual([
    { item: 'a1', key: 'a', index: 0 },
    { item: 'b1', key: 'b', index: 1 },
    { item: 'c1', key: 'c', index: 2 },
  ])
})

// 获取对象值数组
test('values', () => {
  expect(values(testObject)).toEqual(['a1', 'b1', 'c1'])
})

// 压缩键值对数组成对象
test('pairs', () => {
  expect(pairs([['a', 'a1'], ['b', 'b1'], ['c', 'c1']])).toEqual(testObject)
})

// 解压对象成键值对数组
test('unpairs', () => {
  expect(unpairs(testObject)).toEqual([['a', 'a1'], ['b', 'b1'], ['c', 'c1']])
})

// 压缩双键值配对数组成对象
test('zip', () => {
  expect(zip([['a', 'b', 'c'], ['a1', 'b1', 'c1']])).toEqual({
    a: 'a1',
    b: 'b1',
    c: 'c1',
  })
})

// 解压对象成双键值配对数组
test('unzip', () => {
  expect(unzip(testObject)).toEqual([['a', 'b', 'c'], ['a1', 'b1', 'c1']])
})

// 获取对象值数组
test('invert', () => {
  expect(invert(testObject)).toEqual({ a1: 'a', b1: 'b', c1: 'c' })
})

// 抽离对象指定键，保留除指定键以外的键与值
test('omit', () => {
  expect(omit(testObject, ['a'])).toEqual({
    b: 'b1',
    c: 'c1',
  })
})

// 萃取对象指定键，保留指定键与值
test('pick', () => {
  expect(pick(testObject, ['a'])).toEqual({
    a: 'a1',
  })
})

// 检测对象是否存在，能检测任何类型。包括三种模式：1.全模式，使用!!检查 2.空模式：检查对象是否为undefined或null 3.对象模式，检查对象是否为空
test('exist', () => {
  expect(exist(testObject)).toEqual(true)
  expect(exist(undefined)).toEqual(false)
  expect(exist(null)).toEqual(false)
  expect(exist('')).toEqual(false)
  expect(exist(0)).toEqual(false)

  expect(exist(testObject, null)).toEqual(true)
  expect(exist(undefined, null)).toEqual(false)
  expect(exist(null, null)).toEqual(false)
  expect(exist('', null)).toEqual(true)
  expect(exist(0, null)).toEqual(true)

  expect(exist(null, 'object')).toEqual(false)
  expect(exist(undefined, 'object')).toEqual(false)
  expect(exist({}, 'object')).toEqual(false)
  expect(exist([], 'array')).toEqual(false)
  expect(exist([], 'object')).toEqual(false)
})

// 检查对象是否为空
test('truthy', () => {
  expect(truthy(testObject)).toEqual(true)
  expect(truthy(undefined)).toEqual(false)
  expect(truthy(null)).toEqual(false)
  expect(truthy('')).toEqual(false)
  expect(truthy(0)).toEqual(false)

  expect(truthy({})).toEqual(false)
  expect(truthy([])).toEqual(false)
})

// 设置对象默认值
test('setDefault', () => {
  expect(setDefault(undefined, testObject)).toEqual(testObject)
})

// 合并对象
test('mergeDefault', () => {
  expect(mergeDefault(testObject, testInitial)).toEqual({ ...testObject, ...testInitial })
})

// 比较两个对象，列出不同的键值列表
test('different', () => {
  expect(different(testObject, { ...testObject, ...testInitial, ...{ z: 'z1' } })).toEqual([{
    key: 'initial',
    value: 'initialValue',
  }, {
    key: 'z',
    value: 'z1',
  }])
})

// 比较两个对象返回是否相等
test('shallowEqual', () => {
  expect(shallowEqual(testObject, testObject)).toEqual(true)
})

// 对象取反
test('against', () => {
  expect(against(testObject)).toEqual(false)
})

// 比较两个对象返回是否相等
test('shallowEqual', () => {
  expect(shallowEqual(testObject, testObject)).toEqual(true)
})

// 删除对象某一项
test('removeItem', () => {
  const obj = { ...map(testObject, identity), ...{ d: 'a1' } }
  removeItem(obj, 'a1')
  expect(obj).toEqual({
    b: 'b1',
    c: 'c1',
  })

  const arr = [1, 2, 3, 4, 5, 4, 4, 2, 4, 1, 4]
  removeItem(arr, 4)
  expect(arr).toEqual([1, 2, 3, 5, 2, 1])
})

// 比较两个对象返回是否相等
test('shallowEqual', () => {
  expect(shallowEqual(testObject, testObject)).toEqual(true)
})

// 删除对象某一项
test('removeItem', () => {
  const obj = { ...map(testObject, identity), ...{ d: 'a1' } }
  removeItem(obj, 'a1')
  expect(obj).toEqual({
    b: 'b1',
    c: 'c1',
  })

  const arr = [1, 2, 3, 4, 5, 4, 4, 2, 4, 1, 4]
  removeItem(arr, 4)
  expect(arr).toEqual([1, 2, 3, 5, 2, 1])
})

// 深入遍历每一项
test('deepEach', () => {
  deepEach(testDeepObject, (value, key) => {
    console.log(key, value)
  })
})

// 深入遍历每一项
test('walk', () => {
  walk(testDeepObject, 'children', (item, i, parentPath) => {
    console.log(parentPath)
    return i
  })
})
