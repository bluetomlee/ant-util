// 动态作用域，任何JS核心引擎中，有个全局查找表
const globals = {}

const makeBind = resolver => (name, val) => {
  const stack = globals[name] || []
  globals[name] = resolver(stack, val)
  return globals
}

const stackBinder = makeBind((stack, val) => {
  stack.push(val)
  return stack
})

const stackUnBinder = makeBind((stack) => {
  stack.pop()
  return stack
})

const dynmicLookup = (name) => {
  const slot = globals[name] || []
  return last(slot)
}

export {
  stackBinder,
  stackUnBinder,
  dynmicLookup,
}
