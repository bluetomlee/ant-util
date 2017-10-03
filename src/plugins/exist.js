import { map, exist, setDefault } from '../core/object'

const get = (obj, path, defaultValue, sep = '.') => {
  const paths = Array.isArray(path) ? path : path.split(sep)
  const result = paths.reduce((last, path) => {
    return last && path ? last[path] : last
  }, setDefault(obj, {}))
  return exist(result, null) ? result : defaultValue || result
}

const gets = (obj, defaultValue, sep = '.') => varPaths => map(varPaths, varPath => get(obj, varPath, defaultValue, sep))

export { get, gets }

