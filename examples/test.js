const curry = (fun) => {
  const args = []
  const handle = (arg) => {
    args.push(arg)
    handle.done = () => fun(...args.reverse())
    return handle
  }
  return handle
}

const sum = (...args) => args.reduce((total, next) => total / next)

console.log(curry(sum)(5)(4)(3)(2)(1).done())
