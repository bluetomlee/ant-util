/*
 * 函数操作
 * */
import { existy } from './object'

/* 加工 */
const translate = fun => new Function(`return ${fun}`)()

/* 执行 */
const compose = (first, ...last) => (...initArgs) => last.reduce((composed, func) => func(composed), first(...initArgs))

const concat = (...funs) => (...args) => funs.reduce((returns, fun) => [...returns, fun(...args)], [])

const some = (...funs) => (...args) => funs.reduce((last, fun) => last === undefined ? fun(...args) : last, undefined)

const invoke = (obj, fun, ...args) => obj[fun] !== undefined ? obj[fun](...args) : undefined

/* 判断 */
const all = (...funs) => condition => funs.reduce((truth, fun) => (truth && fun() === condition), true)

const any = (...funs) => condition => funs.reduce((truth, fun) => (truth || fun() === condition), false)

/* 绑定 */
const binds = (origin, methods, target) => methods.forEach(methodName => origin[methodName] = origin[methodName].bind(target || origin))

/* 执行 */
const exec = (condition, handle) => (...args) => existy(condition) ? handle(...args) : undefined

const match = actions => (...args) => actions.map(({ condition, action }) => (exec(condition, action)(...args)))

const exer = (origin, name) => (...args) => {
  const action = origin[name]
  return exec(action, () => typeof action === 'function' ? action(...args) : action)()
}

/* 柯里化 */
const sep = fun => (...args) => fun.call(this, ...args)

const inject = (fun, createArgsToInject, spread = false) => (...args) => {
  const injectArgs = createArgsToInject(...args)
  return spread ? fun(...injectArgs, ...args) : fun(injectArgs, ...args)
}

const grund = (checker, handle, errorCallback = args => args) => (...args) => {
  const result = checker(...args)
  if (result.length) {
    errorCallback(result)
  } else {
    return handle(...args)
  }
}

const partial = (fun, ...rest) => (...argv) => fun.call(this, ...argv, ...rest)

const partialLeft = (fun, ...rest) => (...argv) => fun.call(this, ...rest, ...argv)

export {
  translate,
  compose,
  concat,
  some,
  invoke,
  all,
  any,
  binds,
  exec,
  match,
  exer,
  sep,
  inject,
  grund,
  partial,
  partialLeft,
}
