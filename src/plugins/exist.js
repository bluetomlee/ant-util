import { map, isNull, setDefault } from '../core/object'

/*
// 字符分隔符
const charSep = ''
// []表达式正则
const quotesReg = /['"[\]]/

const parser = () => {
  const setComplexState = (memory, state) => memory.isComplex = state
  const clearExpression = memory => memory.expression.length = 0

  const memory = {
    isComplex: false,
    expression: [],
  }

  return (pathSet, sep = '.') => pathSet.split(charSep).reduce((paths, char) => {
    if (char === '[') {
      setComplexState(memory, true)
    } else if (char === ']') {
      const newPaths = paths.concat(memory.expression.join(charSep))
      clearExpression(memory)
      setComplexState(memory, false)
      return newPaths
    } else if (!memory.isComplex && char === sep) {
      const newPaths = paths.concat(memory.expression.join(charSep))
      clearExpression(memory)
      return newPaths
    } else if (!memory.isComplex && char !== sep) {
      memory.expression.push(char)
    } else if (memory.isComplex && !quotesReg.test(char)) {
      memory.expression.push(char)
    }
    return paths
  }, [])
}

const transformer = parser()
*/
const reg = /\.(?![^[\]]*\])|\[['"]?|['"]?\]/

const get = (obj, pathSet = '', defaultValue, sep) => {
  const paths = Array.isArray(pathSet) ? pathSet : pathSet.split(sep || reg)
  const result = paths.reduce((last, path) => last && path ? last[path] : last, setDefault(obj, {}))
  return isNull(result) ? defaultValue || result : result
}

const gets = (obj, defaultValues = {}, sep) => modelPaths =>
  map(modelPaths, (modelPath, modelName) =>
    get(obj, modelPath, defaultValues[modelName], sep))

export { get, gets }

