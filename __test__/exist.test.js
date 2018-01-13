import util from '../src/index'

// 数组API
const {
  get,
  gets,
  set,
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

const objKeys = {
  abc: {
    'bc.de': [
      {
        fg: 1,
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

  expect(get(objInline, "a['b.c']")).toEqual([{ d: 1 }])
  expect(get(objInline, 'a["b.c"][0].d')).toEqual(1)
  expect(get(objInline, "a.b['c'][2].d.e")).toEqual(undefined)
  expect(get(objInline, "a['b.c'][0]/d", null, '/')).toEqual(1)

  expect(get(objKeys, "abc['bc.de']")).toEqual([{ fg: 1 }])

  expect(get(objnull, 'a.b')).toEqual(undefined)
  expect(get(objnull, ['a', 'b'])).toEqual(undefined)
  expect(get(objnull, '')).toEqual({})
  expect(get(objnull, 'a.b.c.d')).toEqual(undefined)
  expect(get(objnull, 'a.b.c.d', 'default')).toEqual('default')
})

// 批量获取
test('gets', () => {
  expect(gets(obj, { y: 'default' })({
    x: 'a',
    y: 'a.b.c.d',
  })).toEqual({ x: { b: { c: { d: null } } }, y: 'default' })

  expect(gets(objInline)({
    x: "a['b.c'][0]",
    y: "a['b.c'][1].d",
  })).toEqual({ x: { d: 1 }, y: undefined })
})

// 设置数据
test('set', () => {
  const objClone = Object.assign({}, obj)
  set(objClone, 'a.b.c.d.e', 'test')
  expect(objClone).toEqual({
    a: {
      b: {
        c: {
          d: {
            e: 'test',
          },
        },
      },
    },
  })
})

