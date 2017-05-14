/*
 * 数组操作
 * */
import { reduce, map, pick, pairs, rename } from './object'

const chainArray = actions => datas => reduce(actions, (last, handle, action) => last[action](handle), datas)

const removeItem = (datas, item) => datas.includes(item) && datas.splice(datas.indexOf(item), 1)

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

const findWhere = (datas, handle) => datas.filter(data => handle(data))

const findEqual = (datas, where) => {
  const wheres = pairs(where)
  return datas.filter(data => wheres.every(([key, value]) => data[key] === value))
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
  removeItem,
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
  findWhere,
  findEqual,
  defaults,
}
