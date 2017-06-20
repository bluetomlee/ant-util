/*
 * 数组操作
 * */
import { reduce, map, pick, pairs, rename } from './object'

const chainArray = actions => datas => reduce(actions, (last, handle, action) => last[action](handle), datas)

const diffArray = (arr1, arr2) => arr1.length === arr2.length && arr1.every(value => arr2.includes(value))

const sortBy = (datas, fn) => datas.sort((d1, d2) => fn(d1) - fn(d2))

const groupBy = (datas, fn) => datas.reduce((last, data) => ({ ...last, [`${fn(data)}`]: (last[fn(data)] || []).concat(data) }), {})

const countBy = (datas, fn) => datas.reduce((last, data) => ({ ...last, [`${fn(data)}`]: (last[fn(data)] ? ++last[fn(data)] : 1) }), {})

const pluck = (datas, propertyName) => datas.map(data => data[propertyName])

const object = datas => datas.reduce((last, [key, value]) => ({ ...last, [key]: value }), {})

const findColumn = (datas, columns) => datas.map(data => pick(data, columns))

const asname = (table, newNames) => table.map(data => rename(data, newNames))

const last = datas => datas[datas.length - 1]

const average = array => array.reduce((prev, next) => prev + next) / array.length

const averageDynmic = fun => n => average([n].concat(fun(n)))

const insert = (datas, index, item) => datas.slice(0, index).concat(item).concat(datas.slice(index))

const compact = datas => datas.filter(data => data)

const union = (a, b) => a.reduce((output, item) => (output.includes(item) ? output : output.concat([item])), b.slice(0))

const findWhere = (datas, handle) => datas.filter(data => handle(data))

const findEqual = (datas, where) => {
  const wheres = pairs(where)
  return datas.filter(data => wheres.every(([key, value]) => data[key] === value))
}

const exchange = (arr, start, end) => {
  const next = arr[end]
  arr[end] = arr[start]
  arr[start] = next
  return arr
}

const indexBy = (arr, indexKey) =>
  arr.reduce((output, current) => {
    output[current[indexKey]] = current
    return output
  }, {})

const subtract = (all, some) => all.reduce((output, name) => (!some.includes(name) ? output.concat(name) : output), [])

const unique = (arr) => {
  arr.sort()
  if (arr.length < 1) {
    return arr
  }
  const ret = [arr[0]]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== ret[ret.length - 1]) {
      ret.push(arr[i])
    }
  }
  return ret
}

const defaults = (datas, misses) => datas.map((data) => {
  const finalData = { ...data }
  map(misses, (value, key) => {
    if (finalData[key] === undefined) {
      finalData[key] = value
    }
  })
  return finalData
})

export {
  diffArray,
  chainArray,
  sortBy,
  groupBy,
  countBy,
  pluck,
  object,
  findColumn,
  asname,
  last,
  averageDynmic,
  average,
  insert,
  compact,
  union,
  findWhere,
  findEqual,
  exchange,
  indexBy,
  subtract,
  unique,
  defaults,
}
