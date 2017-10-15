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

const objInline = {
  a: {
    'b.c': [
      {
        d: 1,
      },
    ],
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

  // 注意：这种key里有特殊符号，如.的实现，不再支持传入分隔符（'/'）
  expect(get(objInline, "a['b.c']")).toEqual([{ d: 1 }])
  expect(get(objInline, 'a["b.c"][0].d')).toEqual(1)
  expect(get(objInline, "a['b.c'][2].d.e")).toEqual(undefined)

  expect(get(objnull, 'a.b')).toEqual(undefined)
  expect(get(objnull, ['a', 'b'])).toEqual(undefined)
  expect(get(objnull, '')).toEqual({})
  expect(get(objnull, 'a.b.c.d')).toEqual(undefined)
  expect(get(objnull, 'a.b.c.d', 'default')).toEqual('default')
})

// 批量批量获取
test('gets', () => {
  expect(gets(obj, { y: 'default' })({
    x: 'a',
    y: 'a.b.c.d',
  })).toEqual({ x: { b: { c: { d: null } } }, y: 'default' })
})
