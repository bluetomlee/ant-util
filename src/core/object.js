/*
 * 对象操作
 * */
const keys = Object.keys
const toString = Object.prototype.toString
const identity = value => value

const typeChecker = data => type => (!type || toString.call(data) === `[object ${type}]`)

const plucker = prop => item => item[prop]

const reduce = (obj, handler, initial = {}) => keys(obj).reduce((last, key) => handler(last, obj[key], key), initial)

const filter = (obj, handler) => reduce(obj, (last, value, key) => (handler(value, key) ? { ...last, [key]: value } : last))

const map = (obj, handler) => reduce(obj, (last, value, key) => ({ ...last, [key]: handler(value, key) }))

const map2Array = (obj, handler) => keys(obj).map((key, index) => handler(obj[key], key, index))

const values = obj => map2Array(obj, identity)

const pairs = obj => map2Array(obj, (value, key) => ([key, value]))

const invert = obj => reduce(obj, (last, value, key) => ({ ...last, [value]: key }))

const omit = (obj, names) => filter(obj, (value, key) => !names.includes(key))

const pick = (obj, names) => filter(obj, (value, key) => names.includes(key))

const remove = (obj, item) => Object.keys(obj).forEach(k => obj[k] === item && delete obj[k])

const each = (obj, fn) => keys(obj).forEach(k => (fn && fn(obj[k], k)))

const against = obj => !obj

const exist = obj => !!obj

const truthy = obj => exist(obj) && (typeof obj === 'object' ? !!Object.keys(obj).length : true)

const zip = (zipKeys, zipValues) => zipKeys.reduce((last, key, index) => ({ ...last, [key]: zipValues[index] }), {})

const mergeDefault = (object, defaultValue) => ({ ...defaultValue, ...object })

const different = (a, b) => reduce(b, (last, value, key) =>
  (value !== a[key] ? last.concat({ key, value }) : last), [])

const shallowEqual = (a, b) => different(a, b).length === 0

const walk = (obj, childrenName, handler, i = 0, parentPath = []) => {
  const customPath = handler(obj, i, parentPath)
  if (obj[childrenName] !== undefined && Array.isArray(obj[childrenName])) {
    obj[childrenName].forEach((child, index) =>
      walk(child, childrenName, handler, index, parentPath.concat(customPath)))
  }
}

const rename = (data, newNames) =>
  reduce(newNames, (last, newName, oldName) => {
    if (data[oldName] !== undefined) {
      last[newName] = data[oldName]
      delete last[oldName]
    }
    return last
  }, { ...data })

const deepEach = (obj, fn) =>
  Object.keys(obj).forEach((k) => {
    fn(obj[k], k)
    if (typeof obj[k] === 'object') {
      deepEach(obj[k], fn)
    }
  })

const removeItem = (obj, item) => {
  if (Array.isArray(obj)) {
    obj.splice(obj.indexOf(item), 1)
  }
  Object.keys(obj).forEach((k) => {
    if (obj[k] === item) {
      delete obj[k]
    }
  })
}

export {
  keys,
  identity,
  typeChecker,
  plucker,
  each,
  reduce,
  filter,
  map,
  map2Array,
  values,
  pairs,
  invert,
  omit,
  pick,
  walk,
  mergeDefault,
  different,
  shallowEqual,
  against,
  exist,
  truthy,
  zip,
  remove,
  rename,
  removeItem,
}

