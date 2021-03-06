import { map, isNull, setDefault, rename } from '../core/object'
import { last } from '../core/array'

const CHAR_SEP = ''
const PATH_SEP = '.'
const QUOTE_REG = /['"[\]]/
const COMPLEX_START = '['
const COMPLEX_END = ']'

const parser = () => {
  let isComplex = false
  const expr = []

  const checkers = {
    isNormal: (isComplex, char, sep, isEnd) => !isComplex && char !== sep && char !== COMPLEX_START && !isEnd,
    isNormalEnd: (isComplex, isEnd) => !isComplex && isEnd,
    isSep: (isComplex, char, sep) => !isComplex && char === sep,
    isComplex: (isComplex, char) => isComplex && !QUOTE_REG.test(char),
  }

  const handles = {
    pushExpr: (expr, char) => expr.push(char),
    concatPaths: (paths, expr) => {
      const expression = expr.join(CHAR_SEP)
      const newPaths = paths.concat(expression || [])
      expr.length = 0
      return newPaths
    },
  }

  return (pathsString, sep = PATH_SEP) => {
    const pathArray = pathsString.split(CHAR_SEP)

    const finalPaths = pathArray.reduce((paths, char, index) => {
      const isEnd = index === pathArray.length - 1
      if (checkers.isNormal(isComplex, char, sep, isEnd)) {
        handles.pushExpr(expr, char)
      } else if (checkers.isSep(isComplex, char, sep)) {
        return handles.concatPaths(paths, expr)
      } else if (checkers.isNormalEnd(isComplex, isEnd)) {
        handles.pushExpr(expr, char)
        return handles.concatPaths(paths, expr)
      } else if (checkers.isComplex(isComplex, char)) {
        handles.pushExpr(expr, char)
      } else if (char === COMPLEX_START) {
        isComplex = true
        return handles.concatPaths(paths, expr)
      } else if (char === COMPLEX_END) {
        isComplex = false
        return handles.concatPaths(paths, expr)
      }
      return paths
    }, [])

    expr.length = 0
    isComplex = false
    return finalPaths
  }
}

const transformer = parser()

// const reg = /\.(?![^[\]]*\])|\[['"]?|['"]?\]/

const get = (obj, pathsString = '', defaultValue, sep) => {
  const paths = Array.isArray(pathsString) ? pathsString : transformer(pathsString, sep)
  const result = paths.reduce((last, path) => last && path ? last[path] : last, setDefault(obj, {}))
  return isNull(result) && defaultValue !== undefined ? defaultValue : result
}

const gets = (obj, defaultValues = {}, sep) => modelPaths =>
  map(modelPaths, (modelPath, modelName) =>
    get(obj, modelPath, defaultValues[modelName], sep))

const set = (obj, pathsString = '', value, sep) => {
  const paths = Array.isArray(pathsString) ? pathsString : transformer(pathsString, sep)
  paths.reduce((last, path, index) => {
    let partical = last && last[path]
    // 如果当前遍历不是最后节点，且当前节点为空
    if (index < paths.length - 1 && (typeof partical !== 'object' || partical === null)) {
      last[path] = isNaN(paths[index + 1]) ? {} : []
      partical = last[path]
    } else if (index === paths.length - 1) {
      last[path] = value
    }
    return partical
  }, obj || {})
}

const walkFunction = (obj, handler, parentPath = [], i = 0) => {
  handler(obj, parentPath, i)
  Object.keys(obj).forEach((key, index) => (typeof obj[key] === 'object' || typeof obj[key] === 'function') && (walkFunction(obj[key], handler, parentPath.concat(key), index)))
}

const getsMap = (obj, json, isPlain = false) => {
  const result = {}
  walkFunction(json, (strategy, path) => {
    if (typeof strategy === 'function') {
      const { as, dv, rn, val } = strategy(get(obj, path))
      if (isPlain) {
        result[as || last(path)] = val !== undefined ? val : rename(get(obj, path, dv), rn)
      } else {
        set(result, as ? path.slice(0, path.length - 1).concat(as) : path, val !== undefined ? val : rename(get(obj, path, dv), rn))
      }
    }
  })
  return result
}

export { get, gets, getsMap, set }
