/*
 * 数组操作
 * */
import { reduce, identity, pick, pairs, rename } from './object'

// 查找一个
const first = datas => datas[0]

const last = datas => datas[datas.length - 1]

const max = (data, compare = item => item) => data.reduce((maxer, next) => compare(maxer) > compare(next) ? maxer : next)

const find = (data, need, compare) => data.reduce((last, next) => compare(last) === need(compare(last), compare(next)) ? last : next)

const finder = (data, need) => data.reduce((last, next) => need(last, next) ? last : next)

// 萃取
const pluck = (datas, propertyName) => datas.map(data => data[propertyName])

// 重命名
const asname = (table, newNames) => table.map(data => rename(data, newNames))

// 查找
const findColumn = (datas, columns) => datas.map(data => pick(data, columns))

const findWhere = (datas, handle) => datas.filter(data => handle(data))

const findEqual = (datas, where) => {
  const wheres = pairs(where)
  return datas.filter(data => wheres.every(([key, value]) => data[key] === value))
}

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

// 高级查找
const sortBy = (datas, fn) => datas.sort((d1, d2) => fn(d1) - fn(d2))

const countBy = (datas, fn) => datas.reduce((last, data) => ({ ...last, [`${fn(data)}`]: (last[fn(data)] ? ++last[fn(data)] : 1) }), {})

const indexBy = (datas, key) => datas.reduce((last, data) => ({ ...last, [`${data[key]}`]: [...(last[data[key]] || []), data] }), {})

const groupBy = (datas, fn) => datas.reduce((last, data) => ({ ...last, [`${fn(data)}`]: (last[fn(data)] || []).concat(data) }), {})

// 转换
const toObject = (datas, pluck = value => value) => datas.reduce((last, next) => ({ ...last, [pluck(next)]: next }), {})

const cat = (...args) => {
  const [head, ...rest] = args
  return head.concat(...rest)
}

// 对比
const diff = (arr1, arr2) => arr1.length === arr2.length && arr1.every(value => arr2.includes(value))

// 去重
const unique = (arr) => {
  if (arr.length < 1) return arr
  arr.sort()
  const ret = [arr[0]]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== ret[ret.length - 1]) {
      ret.push(arr[i])
    }
  }
  return ret
}

const union = (a, b) => a.reduce((output, item) => (output.includes(item) ? output : output.concat([item])), b.slice(0))

// 操作
const insert = (datas, index, item) => datas.slice(0, index).concat(item).concat(datas.slice(index))

const compact = datas => datas.filter(data => data) // 去掉空值

const connect = (head, ...rest) => cat([head], ...rest) // 连接

// 求值
const average = array => array.reduce((prev, next) => prev + next) / array.length

const averageDynmic = fun => n => average(connect(n, ...fun(n)))
// averageDynmic(n => [n*n, n*n*n])(10)

// 赋值
const fillnull = (handle, ...defaults) => (...args) => handle(...args.map((arg, i) => arg || defaults[i]))

const defaults = defaultValue => (item, key) => item && fillnull(identity, defaultValue[key])

// 执行
const chain = actions => datas => reduce(actions, (last, handle, action) => last[action](handle), datas)

const subtract = (all, some) => all.reduce((output, name) => (!some.includes(name) ? output.concat(name) : output), []) // 删除部分

const exchange = (arr, start, end) => {     // 交换
  const next = arr[end]
  arr[end] = arr[start]
  arr[start] = next
  return arr
}

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
  range,
  repeat,
  repeatness,
  iterate,
  sortBy,
  groupBy,
  countBy,
  indexBy,
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
}
