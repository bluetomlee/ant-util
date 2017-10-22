import { map, isNull, setDefault } from '../core/object'

// 字符分隔符
const charSep = ''
// []表达式正则
const quotesReg = /['"[\]]/

const parser = () => {
  const setComplexState = (complex, state) => complex.isComplex = state
  const clearComplex = complex => complex.expression.length = 0

  const complexCache = {
    isComplex: false,
    expression: [],
  }

  return (pathSet, sep = '.') => pathSet.split(charSep).reduce((paths, char) => {
    if (char === '[') {
      setComplexState(complexCache, true)
    } else if (char === ']') {
      const newPaths = paths.concat(complexCache.expression.join(charSep))
      clearComplex(complexCache)
      setComplexState(complexCache, false)
      return newPaths
    } else if (!complexCache.isComplex && char !== sep) {
      return paths.concat(char)
    } else if (complexCache.isComplex && !quotesReg.test(char)) {
      complexCache.expression.push(char)
    }
    return paths
  }, [])
}

const transformer = parser()

const get = (obj, pathSet = '', defaultValue, sep) => {
  const paths = Array.isArray(pathSet) ? pathSet : transformer(pathSet, sep)
  const result = paths.reduce((last, path) => last && path ? last[path] : last, setDefault(obj, {}))
  return isNull(result) ? defaultValue || result : result
}

const gets = (obj, defaultValues = {}, sep) => modelPaths =>
  map(modelPaths, (modelPath, modelName) =>
    get(obj, modelPath, defaultValues[modelName], sep))

export { get, gets }

