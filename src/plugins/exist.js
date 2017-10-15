import { map, isNull, setDefault } from '../core/object'

const reg = /\.(?![^[\]]*\])|\[['"]?|['"]?\]/

const get = (obj, path, defaultValue, sep) => {
  const paths = Array.isArray(path) ? path : path.split(sep || reg)
  const result = paths.reduce((last, path) => last && path ? last[path] : last, setDefault(obj, {}))
  return isNull(result) ? defaultValue || result : result
}

const gets = (obj, defaultValues = {}, sep = '.') => modelPaths => map(modelPaths, (modelPath, modelName) => get(obj, modelPath, defaultValues[modelName], sep))

export { get, gets }

