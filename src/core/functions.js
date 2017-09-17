/*
 * 函数操作
 * */
import { exist } from './object'

/* 加工 */
const translate = (fun, ...args) => new Function(...args, `return ${fun}`)()

/* 生成器 */
const always = value => () => value

/* 绑定 */
const binds = (origin, methods, target) => methods.forEach(methodName => origin[methodName] = origin[methodName].bind(target || origin))

/* 执行 */
const exec = (condition, handle, defaultValue) => (...args) => exist(condition) ? handle(...args) : defaultValue

const exer = (target, name) => (...args) => {
  const cleat = target[name] || target
  return typeof cleat === 'function' ? exec(cleat, cleat)(...args) : cleat
}

const run = (hundle, ...args) => hundle(...args)

const invoke = (obj, fun, ...args) => obj[fun] !== undefined ? obj[fun](...args) : undefined

const invoker = name => (target, ...args) => {
  const targetMethod = target[name]
  return exec(targetMethod, targetMethod.bind(target))(...args)
}

const match = actions => (...args) => actions.map(({ condition, action }) => (exec(condition, action)(...args)))

/* 判断 */
const all = (...funs) => (condition, ...args) => funs.reduce((truth, fun) => (truth && exer(fun)(...args) === condition), true)

const any = (...funs) => (condition, ...args) => funs.reduce((truth, fun) => (truth || exer(fun)(...args) === condition), false)

/* 柯里化 */
const compose = (first, ...last) => (...initArgs) => last.reduce((composed, func) => func(composed), first(...initArgs))

const concat = (...funs) => (...args) => funs.reduce((returns, fun) => [...returns, fun(...args)], [])

const some = (...funs) => (...args) => funs.reduce((last, fun) => last === undefined ? fun(...args) : last, undefined)

const curry = fun => (...args) => fun.call(this, ...args)

const curry1 = fun => middle => fun(middle)

const curry2 = fun => last => first => fun(first, last)

const curryless = (fun) => {
  const args = []
  const handle = (arg) => {
    args.push(arg)
    handle.done = () => fun(...args.reverse())
    return handle
  }
  return handle
}

const grund = (checker, handle, errorHandle) => (...args) => exer(checker)(...args) ? handle(...args) : errorHandle(...args)

const partial = (fun, ...argv) => (...rest) => fun.call(this, ...rest, ...argv)

const partialLeft = (fun, ...argv) => (...rest) => fun.call(this, ...argv, ...rest)

const inject = (fun, createArgsToInject, spread = false) => (...args) => {
  const injectArgs = createArgsToInject(...args)
  return spread ? fun(...injectArgs, ...args) : fun(injectArgs, ...args)
}

const complement = fun => (...args) => !fun(...args)

export {
  translate,
  always,
  binds,
  exec,
  exer,
  run,
  invoke,
  invoker,
  match,
  all,
  any,
  compose,
  concat,
  some,
  curry,
  curry1,
  curry2,
  curryless,
  grund,
  partial,
  partialLeft,
  inject,
  complement,
}
