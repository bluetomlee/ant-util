import util from '../src/index'

const {
  reduce,
  filter,
  map,
  map2Array,
  omit,
  pick,
  walk,
  zip,
  each,
  removeItem,
} = util

// 与数组reduce相同
test('reduce', () => {
  const test = {
    test: { test: 1 },
  }

  expect(reduce(test, (last, value) => {
    last.push(value)
    return last
  }, [])).toEqual([{ test: 1 }])
})
