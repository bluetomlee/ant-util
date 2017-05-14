import { isAsyncFn } from './functions'

/*
 * 异步函数操作
 * */
const promiseChain = (currentPromise, ...nextPromise) =>
  Promise.resolve(currentPromise && currentPromise().then(() => nextPromise.length > 0 && promiseChain(...nextPromise)))


const decorate = (decorator, fn) => {
  if (isAsyncFn(fn)) {
    return async function asyncDecoratedFn(context, payload) {
      // CAUTION 临时解决 babel 处理 async 参数时的 bug
      if (typeof decorator === 'function') decorator(context, payload)
      return await fn(context, payload)
    }
  }

  return (...arg) => {
    if (typeof decorator === 'function') decorator(...arg)
    return fn(...arg)
  }
}

export { promiseChain, decorate}