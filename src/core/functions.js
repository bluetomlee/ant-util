/*
 * 函数操作
 * */
import { exist } from './object'

/* 加工 */
const translate = (fun, ...args) => new Function(...args, `return ${fun}`)()

/* 生成器 */
const always = value => () => value

/* 执行 */
const compose = (first, ...last) => (...initArgs) => last.reduce((composed, func) => func(composed), first(...initArgs))

const concat = (...funs) => (...args) => funs.reduce((returns, fun) => [...returns, fun(...args)], [])

const some = (...funs) => (...args) => funs.reduce((last, fun) => last === undefined ? fun(...args) : last, undefined)

const invoke = (obj, fun, ...args) => obj[fun] !== undefined ? obj[fun](...args) : undefined

/* 判断 */
const all = (...funs) => (condition, ...args) => funs.reduce((truth, fun) => (truth && fun(...args) === condition), true)

const any = (...funs) => (condition, ...args) => funs.reduce((truth, fun) => (truth || fun(...args) === condition), false)

/* 绑定 */
const binds = (origin, methods, target) => methods.forEach(methodName => origin[methodName] = origin[methodName].bind(target || origin))

/* 执行 */
const exec = (condition, handle) => (...args) => exist(condition) ? handle(...args) : undefined

const exer = (origin, name) => (...args) => {
  const action = origin[name]
  return exec(action, () => typeof action === 'function' ? action(...args) : action)()
}

const match = actions => (...args) => actions.map(({ condition, action }) => (exec(condition, action)(...args)))

/* 柯里化 */
const curry = fun => (...args) => fun.call(this, ...args)

const inject = (fun, createArgsToInject, spread = false) => (...args) => {
  const injectArgs = createArgsToInject(...args)
  return spread ? fun(...injectArgs, ...args) : fun(injectArgs, ...args)
}

const grund = (checker, handle, errorHandle) => (...args) => checker(...args) ? handle(...args) : errorHandle(...args)

const partial = (fun, ...argv) => (...rest) => fun.call(this, ...argv, ...rest)

const partialRight = (fun, ...argv) => (...rest) => fun.call(this, ...rest, ...argv)

export {
  translate,
  always,
  compose,
  concat,
  some,
  invoke,
  all,
  any,
  binds,
  exec,
  exer,
  match,
  curry,
  inject,
  grund,
  partial,
  partialRight,
}
