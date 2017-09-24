import { map, exist, setDefault } from '../core/object'

const get = (obj, path, defaultValue, sep = '.') => {
  const paths = Array.isArray(path) ? path : path.split(sep)
  const result = paths.reduce((last, path) => {
    return last && path ? last[path] : last
  }, setDefault(obj, {}))
  return exist(result, null) ? result : defaultValue || result
}

const gets = (obj, defaultValue, sep = '.') => varPaths => map(varPaths, varPath => get(obj, varPath, defaultValue, sep))

const set = (obj, path, value, sep = '.') => {
  const paths = Array.isArray(path) ? path : path.split(sep)
  paths.reduce((last, path, index) => {
    const current = last && path ? last[path] : last
    if (index === paths.length - 1) {
      last[path] = value
    } else if (!current) {
      last[path] = {}
    }
    return current
  }, setDefault(obj, {}))
  return obj
}

export { get, gets, set }

