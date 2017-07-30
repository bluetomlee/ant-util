import util from '../src/index'

// 数组API
const {
  first,
  last,
  max,
  find,
  finder,
  pluck,
  asname,
  findColumn,
  findWhere,
  findEqual,
  range,
  repeat,
  repeatness,
  iterate,
  sortBy,
  countBy,
  indexBy,
  groupBy,
  /* TODO */
  toObject,
  cat,
  diff,
  unique,
  union,
  insert,
  compact,
  connect,
  average,
  averageDynmic,
  fillnull,
  defaults,
  chain,
  subtract,
  exchange,
} = util

// 其他函数
const {
  plucker,
  identity,
} = util

// 首尾取值
test('fisrt last', () => {
  const array = ['first', 'middle', 'last']
  expect(first(array)).toEqual('first')
  expect(last(array)).toEqual('last')
})

// 求最大值
test('max', () => {
  const array = [5, 1, 3, 4, 2]
  const arrayObject = [{ age: 64 }, { age: 32 }, { age: 50 }]

  // 求数组最大值
  expect(max(array)).toEqual(5)

  // 求数组中某个指定项最大值
  expect(max(arrayObject, plucker('age'))).toEqual({ age: 64 })
})

// 查找
test('find', () => {
  const array = [5, 1, 3, 4, 2]
  const arrayObject = [{ name: 'A', age: 64 }, { name: 'B', age: 32 }, { name: 'C', age: 50 }]

  // 求数组最大值
  expect(find(array, Math.max, identity)).toEqual(5)

  // 求数组中某个指定项最大值
  expect(find(arrayObject, Math.max, plucker('age'))).toEqual({ name: 'A', age: 64 })

  // 求数组中以B开头的人名
  expect(find(arrayObject, (current, next) => current.charAt(0) === 'B' ? current : next, plucker('name'))).toEqual({
    name: 'B',
    age: 32,
  })
})

// 高级查找
test('finder', () => {
  const arrayObject = [{ name: 'A', age: 64 }, { name: 'B', age: 32 }, { name: 'C', age: 50 }]

  // 求数组中以B开头的人名
  expect(finder(arrayObject, (x, y) => x.age > y.age)).toEqual({ name: 'A', age: 64 })
})

// 数据库测试数据
const table = [{ title: 't1', name: 'n1', age: 30 }, { title: 't2', name: 'n2', age: 40 }, { title: 't3', age: 50 }]

// 数组萃取
test('pluck', () => {
  expect(pluck(table, 'title')).toEqual(['t1', 't2', 't3'])
})

// 重命名列
test('asname', () => {
  expect(asname(table, { title: 'tit' })).toEqual([
    { name: 'n1', age: 30, tit: 't1' },
    { name: 'n2', age: 40, tit: 't2' },
    { age: 50, tit: 't3' },
  ])
})

// 查找指定列
test('findColumn', () => {
  expect(findColumn(table, ['title', 'name'])).toEqual([
    { title: 't1', name: 'n1' },
    { title: 't2', name: 'n2' },
    { title: 't3' },
  ])
})

// 根据条件查找
test('findWhere', () => {
  expect(findWhere(table, item => item.age > 40)).toEqual([
    { age: 50, title: 't3' },
  ])

  expect(findWhere(findColumn(asname(table, { title: 'tit' }), ['tit', 'age']), item => item.age > 40)).toEqual([
    { age: 50, tit: 't3' },
  ])
})

// 根据条件相等查找
test('findEqual', () => {
  expect(findEqual(table, { title: 't3' })).toEqual([
    { age: 50, title: 't3' },
  ])
})

// 创建从0开始到n-1的数组
test('range', () => {
  expect(range(10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
})

// 根据传入的次数与值创建数组
test('repeat', () => {
  expect(repeat(10, 'value')).toEqual(['value', 'value', 'value', 'value', 'value', 'value', 'value', 'value', 'value', 'value'])
})

// 根据函数的返回值创建固定长度的数组
test('repeatness', () => {
  console.log('repeatness function return value is:', repeatness(() => Math.floor(Math.random() * 10) + 1, 10))
})

// 根据校验器判断何时退出，创建从初始值到退出点的数组
test('iterate', () => {
  // console.log(iterate(n => n + n, n => n < 1024, 1))
  expect(iterate(n => n + n, n => n < 1024, 1)).toEqual([2, 4, 8, 16, 32, 64, 128, 256, 512])
})

// 数组高级查找测试数据
const people = [
  { name: 'Rick', age: 30, sex: 'man' },
  { name: 'Lucy', age: 24, sex: 'woman' },
  { name: 'Lily', age: 40, sex: 'woman' },
]

// 数组排序
test('sortBy', () => {
  expect(sortBy(people, p => p.age)).toEqual([
    { age: 24, name: 'Lucy', sex: 'woman' },
    { age: 30, name: 'Rick', sex: 'man' },
    { age: 40, name: 'Lily', sex: 'woman' },
  ])
})

// 数组分组统计个数
test('countBy', () => {
  expect(countBy(people, p => p.sex)).toEqual({ man: 1, woman: 2 })
})

// 数组分组
test('indexBy', () => {
  expect(indexBy(people, 'sex')).toEqual({
    man: [{ age: 30, name: 'Rick', sex: 'man' }],
    woman: [{ age: 24, name: 'Lucy', sex: 'woman' }, { age: 40, name: 'Lily', sex: 'woman' }],
  })
})

// 数组分组
test('groupBy', () => {
  expect(groupBy(people, plucker('sex'))).toEqual({
    man: [{ age: 30, name: 'Rick', sex: 'man' }],
    woman: [{ age: 24, name: 'Lucy', sex: 'woman' }, { age: 40, name: 'Lily', sex: 'woman' }],
  })
})

