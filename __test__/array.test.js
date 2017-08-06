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

  sortBy,
  countBy,
  indexBy,
  groupBy,

  range,
  repeat,
  repeatness,
  iterate,

  toObject,
  diff,
  subtract,

  cat,
  connectmap,
  connect,
  unique,
  union,
  compact,

  insert,
  exchange,

  average,
  averageDynmic,

  fillnull,
  defaults,

  chain,
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

// 数组高级查找测试数据
const people = [
  { name: 'Rick', age: 30, sex: 'man' },
  { name: 'Lucy', age: 24, sex: 'woman' },
  { name: 'Lily', age: 40, sex: 'woman' },
]

// 数组排序
test('sortBy', () => {
  // 按年龄排序
  expect(sortBy(people, p => p.age)).toEqual([
    { age: 24, name: 'Lucy', sex: 'woman' },
    { age: 30, name: 'Rick', sex: 'man' },
    { age: 40, name: 'Lily', sex: 'woman' },
  ])
})

// 数组分组统计个数
test('countBy', () => {
  // 按照性别统计人数
  expect(countBy(people, p => p.sex)).toEqual({ man: 1, woman: 2 })
})

// 数组分组
test('indexBy', () => {
  // 按照性别分组
  expect(indexBy(people, 'sex')).toEqual({
    man: [{ age: 30, name: 'Rick', sex: 'man' }],
    woman: [{ age: 24, name: 'Lucy', sex: 'woman' }, { age: 40, name: 'Lily', sex: 'woman' }],
  })
})

// 数组分组
test('groupBy', () => {
  // 根据函数返回分组数据
  expect(groupBy(people, plucker('sex'))).toEqual({
    man: [{ age: 30, name: 'Rick', sex: 'man' }],
    woman: [{ age: 24, name: 'Lucy', sex: 'woman' }, { age: 40, name: 'Lily', sex: 'woman' }],
  })
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

// 数组转对象
test('toObject', () => {
  // 名字作为key，数组转成对象
  expect(toObject(people, plucker('name'))).toEqual({
    Lucy: { name: 'Lucy', age: 24, sex: 'woman' },
    Rick: { name: 'Rick', age: 30, sex: 'man' },
    Lily: { name: 'Lily', age: 40, sex: 'woman' },
  })
})

// 比较两个数组，包含元素是否相同
test('diff', () => {
  // 包含元素不相同
  expect(diff([1, 2], [2, 3])).toEqual(false)
  // 包含元素相同
  expect(diff([1, 2], [2, 1])).toEqual(true)
})

// 取数组的差异项
test('subtract', () => {
  // 求出两个数组中的不同项，组成一个新数组
  expect(subtract([1, 2, 3, 4, 5], [1, 2, 3])).toEqual([4, 5])
})

// 连接多个数组，组成一个数组
test('cat', () => {
  // 把[1], [2], [3]连接成[1, 2, 3]
  expect(cat([1], [2], [3])).toEqual([1, 2, 3])
})

// 通过函数处理数组中改的每一项，相当于map
test('connectmap', () => {
  const first = () => 'first'
  const second = () => 'second'
  const third = () => 'third'

  const fns = [first, second, third]
  // 每个函数包一层中间件，打印日志
  const mapped = connectmap(fns, fn => (...args) => {
    console.log(`${fn.name}开始执行，参数为：`, ...args)
    return fn(...args)
  })
  expect(mapped.map(item => item('connectmap function initiation args'))).toEqual(['first', 'second', 'third'])
})

// 把多项值连接成一个数组
test('connect', () => {
  // 过滤掉空值
  expect(connect(1, 2, 3, 4, 5)).toEqual([1, 2, 3, 4, 5])
})

// 单个数组去重
test('unique', () => {
  // 去掉数组中重复项目，返回新数组
  expect(unique([1, 2, 2, 4, 5, 6, 2, 4])).toEqual([1, 2, 4, 5, 6])
})

// 数组合并，去掉重复项
test('union', () => {
  // 合并两个数组，去掉重复项
  expect(union([1, 2, 2, 3], [2, 3])).toEqual([1, 2, 3])
})

// 去空
test('compact', () => {
  // 过滤掉空值
  expect(compact(people.concat(undefined))).toEqual(people)
})

// 数组合并，去掉重复项
test('insert', () => {
  // 合并两个数组，去掉重复项
  expect(insert(people, 1, { age: 30, name: 'burning', sex: 'man' })).toEqual([
    { name: 'Rick', age: 30, sex: 'man' },
    { name: 'burning', age: 30, sex: 'man' },
    { name: 'Lucy', age: 24, sex: 'woman' },
    { name: 'Lily', age: 40, sex: 'woman' },
  ])
})

// 交换数组中的两项
test('exchange', () => {
  // 过滤掉空值
  expect(exchange([1, 2, 3, 4, 5], 1, 2)).toEqual([1, 3, 2, 4, 5])
})

// 求平均数
test('average', () => {
  // 求平均数
  expect(average([1, 2, 3, 4, 5])).toEqual(3)
})

// 根据函数求输入值平均数
test('averageDynmic', () => {
  // 求10 与 10 * 10的平均数
  expect(averageDynmic(n => [n, n * n])(10)).toEqual(55)
})

// 使用参数传递的默认值填充函数参数并执行函数
test('fillnull', () => {
  // 求数组每一项的乘积
  const nums = [null, 'hello', null, 'world']
  const initValue = 'Hi,'
  const defaultItemValue = ' '
  // reduce会循环nums数组，第一项初始值是null，用'Hi,'来代替，之后叠加每一项，遇到空用空格代替
  expect(nums.reduce(fillnull((total, n) => total + n, initValue, defaultItemValue))).toEqual('Hi,hello world')
})

// 补充项key为空的情况
test('defaults', () => {
  const peoples = [{ age: 30 }, { age: 27 }, { age: 33 }, null, { age: 30 }, {}]
  const lookup = defaults({ age: 20 })
  expect(peoples.reduce((total, item) => {
    return total + lookup(item, 'age')
  }, 0)).toEqual(160)
})

// 数组链式操作
test('chain', () => {
  const data = ['name ', ' age', '', ' sex', 'hobby ']
  // 过滤掉数组中空值，去掉首位空格
  expect(chain({ filter: item => !!item, map: item => item.trim() })(data)).toEqual(['name', 'age', 'sex', 'hobby'])
})
