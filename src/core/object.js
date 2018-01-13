/*
 * 对象操作
 * */
import { upper } from './string'
import { asname } from './array'

const keys = Object.keys
const toString = Object.prototype.toString

const identity = value => value

const typeChecker = data => type => (!type || toString.call(data) === `[object ${upper(type)}]`)

const typeGetter = data => toString.call(data).match(/\s(.[^\]]*)/)[1]

const plucker = prop => item => item[prop]

// 遍历
const each = (obj, fn) => keys(obj).forEach((key, index) => (fn && fn(obj[key], key, index)))

const reduce = (obj, handler, initial = {}) => keys(obj).reduce((last, key, index) => handler(last, obj[key], key, index), initial)

const filter = (obj, handler) => reduce(obj, (last, value, key, index) => (handler(value, key, index) ? { ...last, [key]: value } : last))

const mapKey = (obj, keymap) => reduce(obj, (last, value, key) => ({ ...last, [keymap[key] ? keymap[key] : key]: value }))

const map = (obj, handler) => reduce(obj, (last, value, key, index) => ({ ...last, [key]: handler(value, key, index) }))

const map2Array = (obj, handler) => keys(obj).map((key, index) => handler(obj[key], key, index))

const values = obj => map2Array(obj, identity)

const pairs = arr => arr.reduce((last, [key, value]) => ({ ...last, [key]: value }), {})

const unpairs = obj => map2Array(obj, (value, key) => ([key, value]))

const zip = ([zipKeys, zipValues]) => zipKeys.reduce((last, key, index) => ({ ...last, [key]: zipValues[index] }), {})

const unzip = obj => [keys(obj), values(obj)]

const invert = obj => reduce(obj, (last, value, key) => ({ ...last, [value]: key }))

// 萃取
const omit = (obj, names) => filter(obj, (value, key) => !names.includes(key))

const pick = (obj, names) => filter(obj, (value, key) => names.includes(key))

// 校验
const isNull = obj => obj === undefined || obj === null

const truthy = obj => !!obj && (typeof obj === 'object' ? !!Object.keys(obj).length : true)

const exist = (obj, type = 0) => {
  if (type === 0) return !!obj
  if (type === null) return obj !== undefined && obj !== null
  if (type) return !!obj && (typeof obj === 'object' ? !!keys(obj).length : true)
}

// 默认值
const setDefault = (current, defaultValue) => current || defaultValue

const mergeDefault = (object, defaultValue) => ({ ...defaultValue, ...object })

// 比较
const different = (a, b) => reduce(b, (last, value, key) => (value !== a[key] ? last.concat({ key, value }) : last), [])

const shallowEqual = (a, b) => different(a, b).length === 0

// 取返
const against = obj => !obj

// 操作
const removeItem = (obj, item) => {
  if (Array.isArray(obj)) {
    let flag = obj.indexOf(item) > -1
    while (flag) {
      obj.splice(obj.indexOf(item), 1)
      flag = obj.indexOf(item) > -1
    }
  } else {
    Object.keys(obj).forEach((k) => {
      if (obj[k] === item) {
        delete obj[k]
      }
    })
  }
}

// 递归
const deepEach = (obj, fn) =>
  Object.keys(obj).forEach((k) => {
    fn(obj[k], k)
    if (typeof obj[k] === 'object') {
      deepEach(obj[k], fn)
    }
  })

// 递归指定的键
const walk = (obj, childrenName, handler, i = 0, parentPath = []) => {
  const customPath = handler(obj, i, parentPath)
  if (obj[childrenName] !== undefined && Array.isArray(obj[childrenName])) {
    obj[childrenName].forEach((child, index) =>
      walk(child, childrenName, handler, index, parentPath.concat(childrenName, customPath)))
  }
}

// 递归所有的键
const walkAll = (obj, handler, parentPath = [], i = 0) => {
  handler(obj, parentPath, i)
  Object.keys(obj).forEach((key, index) => typeof obj[key] === 'object' && (walkAll(obj[key], handler, parentPath.concat(key), index)))
}

// 重命名
const rename = (value, rn) => {
  if (rn === undefined || typeof value !== 'object') {
    return value
  } else if (Array.isArray(value)) {
    return asname(value, rn)
  }
  return mapKey(value, rn)
}

export {
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
  isNull,
  truthy,
  exist,
  setDefault,
  mergeDefault,
  different,
  shallowEqual,
  against,
  removeItem,
  deepEach,
  walk,
  walkAll,
  rename,
}

