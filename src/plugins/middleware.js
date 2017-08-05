/*
 * 函数中间件操作
 * */
const concatMiddlewares = (defaultListeners, middlewares) => middlewares.reduce((listeners, middleware) => middleware(listeners), defaultListeners)

const createMiddleware = (handle, listeners) => (originListeners) => {
  return Object.keys(listeners).reduce((originListener, key) => {
    originListener[key] = handle(listeners[key], key)
    return originListener
  }, originListeners)
}

export {
  concatMiddlewares,
  createMiddleware,
}
