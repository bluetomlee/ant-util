import util from '../src/index'

// 数组API
const {
  get,
  gets,
} = util.plugins.exist

const obj = {
  a: {
    b: {
      c: {
        d: null,
      },
    },
  },
}

const objnull = null

// 获取数据
test('get', () => {
  expect(get(obj, 'a.b')).toEqual({ c: { d: null } })
  expect(get(obj, ['a', 'b'])).toEqual({ c: { d: null } })
  expect(get(obj, '')).toEqual({ a: { b: { c: { d: null } } } })
  expect(get(obj, 'a.b.c.d')).toEqual(null)
  expect(get(obj, 'a.b.c.d', 'default')).toEqual('default')
  expect(get(obj, 'a/b/c', undefined, '/')).toEqual({ d: null })

  expect(get(objnull, 'a.b')).toEqual(undefined)
  expect(get(objnull, ['a', 'b'])).toEqual(undefined)
  expect(get(objnull, '')).toEqual({})
  expect(get(objnull, 'a.b.c.d')).toEqual(undefined)
  expect(get(objnull, 'a.b.c.d', 'default')).toEqual('default')
})

// 批量批量获取
test('gets', () => {
  expect(gets(obj)({
    x: 'a',
    y: 'a.b.c.d',
  })).toEqual({ x: { b: { c: { d: null } } }, y: null })
})
