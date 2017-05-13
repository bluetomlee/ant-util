/*
 * 对象操作
 * */
const keys = Object.keys
const identity = value => value

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

const existy = obj => !!obj

const truthy = obj => existy(obj) && (typeof obj === 'object' ? !!Object.keys(obj).length : true)

const zip = (zipKeys, zipValues) => zipKeys.reduce((last, key, index) => ({ ...last, [key]: zipValues[index] }), {})

const walk = (obj, childrenName, handler, i = 0, parentPath = []) => {
  const customPath = handler(obj, i, parentPath)
  if (obj[childrenName] !== undefined && Array.isArray(obj[childrenName])) {
    obj[childrenName].forEach((child, index) =>
      walk(child, childrenName, handler, index, parentPath.concat(customPath)))
  }
}

/* 返回对象新列名 */
const rename = (data, newNames) =>
  reduce(newNames, (last, newName, oldName) => {
    if (data[oldName] !== undefined) {
      last[newName] = data[oldName]
      delete last[oldName]
    }
    return last
  }, { ...data })

export {
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
  existy,
  truthy,
  zip,
  remove,
  rename,
}

