import util from '../src/index'

const { always } = util

// 数组API
const {
  get,
  gets,
  set,
  getsMap,
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

const testDeepObject = {
  a1: [{
    x1: [{
      x2: {
        success: false,
        errorMessage: '网络异常，请稍后再试',
        userElement: {
          userName: 'lhj',
          userPass: 'a111111',
        },
      },
    }],
  }],
  b1: {
    c1: {
      success: true,
      errorMessage: '网络异常，请稍后',
      userList: [{
        userName: 'lhj',
        userPass: 'a111111',
      }],
    },
  },
}

const mapper = {
  a1: [{
    x1: [{
      x2: {
        success: (item) => {
          console.log(item)
          return {
            val: {
              test: 'you are the best',
            },
          }
        },
        errorMessage: always({ as: 'resultMsg' }),
        success1: always({ dv: 'success1' }),
        success2: always({ dv: [{ s: 's2' }], rn: { s: 's2' } }),
      },
    }],
  }],
}

// 根据json声明获取数据
test('getsMap', () => {
  expect(getsMap(testDeepObject, mapper, true)).toEqual({
    success: { test: 'you are the best' },
    resultMsg: '网络异常，请稍后再试',
    success1: 'success1',
    success2: [{ s2: 's2' }],
  })

  expect(getsMap(testDeepObject, mapper)).toEqual({
    a1: [{
      x1: [{
        x2: {
          success: {
            test: 'you are the best',
          },
          resultMsg: '网络异常，请稍后再试',
          success1: 'success1',
          success2: [{
            s2: 's2',
          }],
        },
      }],
    }],
  })
})

