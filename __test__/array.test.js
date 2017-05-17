import util from '../src/index'

const {
  chainArray,
  diffArray,
  sortBy,
  groupBy,
} = util

// 数组链式操作
test('chainArray', () => {
  const data = ['name ', ' age', '', ' sex', 'hobby ']
  const rets = ['name', 'age', 'sex', 'hobby']

  expect(chainArray({ filter: item => !!item, map: item => item.trim() })(data)).toEqual(rets)
})

// 数组对比
test('chainArray', () => {
  const arr1 = ['name', 'age', '', 'sex', 'hobby']
  const arr2 = ['name', 'age', 'sex', 'hobby']
  const arr3 = arr1.concat()

  expect(diffArray(arr1, arr2)).toEqual(false)
  expect(diffArray(arr1, arr3)).toEqual(true)
})

// 数组对比
test('sortBy', () => {
  const data = [{ age: 20 }, { age: 30 }, { age: 10 }]
  const handle = item => item.age
  const rets = [{ age: 10 }, { age: 20 }, { age: 30 }]

  expect(sortBy(data, handle)).toEqual(rets)
})

// 数组分组
test('groupBy', () => {
  const data = [{ age: 20, sex: 'male' }, { age: 30, sex: 'female' }, { age: 10, sex: 'female' }]
  const handle = item => item.sex
  const rets = {
    male: [{ age: 20, sex: 'male' }],
    female: [{ age: 30, sex: 'female' }, { age: 10, sex: 'female' }],
  }

  expect(groupBy(data, handle)).toEqual(rets)
})
