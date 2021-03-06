/**
 * The operator of function include:
 * @module function
 * @see examples: {@link https://github.com/antgod/ant-util/blob/master/__test__/functions.test.js}
 */
import { finder } from './array'
import { exist, identity } from './object'

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

 /**
 * High-level functions used to get a group of judgment.It can also replace any conditional statement(eg: if/switch)
 * @function match
 * @param {Array} actions - an json array include two key: condition,action.
 * @return {Function} an handle need to pass arguments to every action
 *
 * @example
 * const mapCreator = code => [
 *   { condition: code === 1, action: fns.first },
 *   { condition: code === 2, action: fns.second },
 *   { condition: code > 1, action: fns.third },
 * ]
 * match(mapCreator(2))(arguments) => [undefined, fns.second(arguments), undefined]
 */
const match = actions => (...args) => actions.map(({ condition, action }) => (exec(condition, action)(...args)))

const matchOne = actions => (...args) => finder(match(actions)(...args), identity)

/* 判断 */
const all = (...funs) => (condition, ...args) => funs.reduce((truth, fun) => (truth && exer(fun)(...args) === condition), true)

const any = (...funs) => (condition, ...args) => funs.reduce((truth, fun) => (truth || exer(fun)(...args) === condition), false)

const allness = (...conditions) => conditions.reduce((truth, condition) => (truth && condition), true)

const anyness = (...conditions) => conditions.reduce((truth, condition) => (truth || condition), false)

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

const choose = (...conditions) => (...values) => values.find((val, index) => exist(conditions[index]))

const guard = (checker, handle, errorHandle) => (...args) => exer(checker)(...args) ? handle(...args) : errorHandle(...args)

const grund = (...args) => {
  console.warn('`grund` is deprecated, please use `guard`.')
  return guard(...args)
}

const partial = (fun, ...argv) => (...rest) => fun.call(this, ...rest, ...argv)

const partialLeft = (fun, ...argv) => (...rest) => fun.call(this, ...argv, ...rest)

const inject = (fun, createArgsToInject, spread = false) => (...args) => {
  const injectArgs = createArgsToInject(...args)
  return spread ? fun(...injectArgs, ...args) : fun(injectArgs, ...args)
}

const not = fun => (...args) => !fun(...args)

const complement = (...args) => {
  console.warn('`complement` is deprecated, please use `not`.')
  return not(...args)
}

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
  matchOne,
  all,
  any,
  allness,
  anyness,
  compose,
  concat,
  some,
  curry,
  curry1,
  curry2,
  curryless,
  choose,
  grund,
  guard,
  partial,
  partialLeft,
  inject,
  not,
  complement,
}
