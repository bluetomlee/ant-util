/*
 * 数组操作
 * */
import { reduce, identity, pick, unpairs, mapKey } from './object'

// 查找元素
const first = datas => datas[0]

const last = datas => datas[datas.length - 1]

const max = (data, compare = item => item) => data.reduce((maxer, next) => compare(maxer) > compare(next) ? maxer : next)

const find = (data, need, compare) => data.reduce((last, next) => compare(last) === need(compare(last), compare(next)) ? last : next)

const finder = (data, need) => data.reduce((last, next) => need(last, next) ? last : next)

// 萃取
const pluck = (datas, propertyName) => datas.map(data => data[propertyName])

// 重命名
const asname = (table, newNames) => table.map(data => mapKey(data, newNames))

// 查找表格
const findColumn = (datas, columns) => datas.map(data => pick(data, columns))

const findWhere = (datas, handle) => datas.filter(data => handle(data))

const findEqual = (datas, where) => {
  const wheres = unpairs(where)
  return datas.filter(data => wheres.every(([key, value]) => data[key] === value))
}

// 高级查找
const sortBy = (datas, fn) => datas.slice(0).sort((d1, d2) => fn(d1) - fn(d2))

const countBy = (datas, fn) => datas.reduce((last, data) => ({ ...last, [`${fn(data)}`]: (last[fn(data)] ? ++last[fn(data)] : 1) }), {})

const indexBy = (datas, key) => datas.reduce((last, data) => ({ ...last, [`${data[key]}`]: [...(last[data[key]] || []), data] }), {})

const groupBy = (datas, fn) => datas.reduce((last, data) => ({ ...last, [`${fn(data)}`]: (last[fn(data)] || []).concat(data) }), {})

// 创建
const range = (times) => {
  const ranges = []
  for (let idx = 0; idx < times; idx++) {
    ranges.push(idx)
  }
  return ranges
}

const repeat = (times, value) => {
  return range(times).map(() => value)
}

const repeatness = (createValue, time) => range(time).map((value, index) => createValue(index))

const iterate = (valueCreator, checker, init) => {
  const results = []
  let result = valueCreator(init)
  while (checker(result)) {
    results.push(result)
    result = valueCreator(result)
  }
  return results
}

// 转换
const toObject = (datas, pluck = value => value) => datas.reduce((last, next) => ({ ...last, [pluck(next)]: next }), {})

// 对比
const diff = (arr1, arr2) => arr1.length === arr2.length && arr1.every(value => arr2.includes(value)) && arr2.every(value => arr1.includes(value))

const subtract = (all, some) => all.reduce((output, name) => (!some.includes(name) ? output.concat(name) : output), [])

// 合并
const cat = (...args) => {
  const [head, ...rest] = args
  return head.slice(0).concat(...rest)
}

const connect = (head, ...rest) => cat([head], ...rest)

const connectmap = (coll, fun) => connect(...coll.map(fun))

// 去重
const unique = array => array.reduce((last, arr) => last.includes(arr) ? last : [...last, arr], [])

// const unique = array => [...new Set(array)]
// const unique = array => array.filter((item, i) => i === array.indexOf(item))

// 合并去重
const union = (a, b) => unique(cat(a, b))

// 去空
const compact = datas => datas.filter(data => data)

// 操作
const insert = (datas, index, item) => datas.slice(0, index).concat(item).concat(datas.slice(index))

const exchange = (arr, start, end) => {
  const next = arr[end]
  arr[end] = arr[start]
  arr[start] = next
  return arr
}

// 求值
const average = array => array.reduce((prev, next) => prev + next) / array.length

const averageDynmic = fun => n => average(connect(...fun(n)))

// 赋值
const fillnull = (handle, ...defaults) => (...args) => handle(...args.map((arg, i) => arg || defaults[i]))

const defaults = defaultValue => (item, key) => fillnull(identity, defaultValue[key])((item || defaultValue)[key])

// 链式操作
const chain = actions => datas => reduce(actions, (last, handle, action) => last[action](handle), datas)

export {
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
  groupBy,
  countBy,
  indexBy,

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
}
