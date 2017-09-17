const assert = (codication, error, handle = console.log) => !codication && handle(error)

export { assert }
