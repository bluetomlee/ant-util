/*
 * 函数操作
 * */
import { existy } from './object'

const translate = string => new Function(`return ${string}`)()

const compose = (first, ...last) => (...initArgs) => last.reduce((composed, func) => func(composed), first(...initArgs))

const concat = (...funcs) => (...args) => funcs.reduce((returns, func) => [...returns, func(...args)], [])

const switcher = map => (type, ...args) => map[type] !== undefined ? map[type](...args) : undefined

const some = (...funs) => (...args) => funs.reduce((last, fun) => last === undefined ? fun(...args) : last, undefined)

const execer = (condition, action) => (...args) => existy(condition) ? action(...args) : undefined

const divider = actions => (...args) => actions.map(({ condition, action, name }) => ({ name, value: execer(condition, action)(...args) }))

const all = (...funs) => condition => funs.reduce((truth, fun) => (truth && fun() === condition), true)

const any = (...funs) => condition => funs.reduce((truth, fun) => (truth || fun() === condition), false)

const propExecer = (target, name) => (...args) => {
  const action = target[name]
  return execer(action, () => {
    return typeof action === 'function' ? action.apply(target, args) : action
  })()
}

export {
  translate,
  compose,
  concat,
  switcher,
  some,
  execer,
  divider,
  all,
  any,
  propExecer,
}
