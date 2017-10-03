import util from '../src/index'

const {
  parseQuery,
  stringifyQuery,
} = util.plugins.url


test('parseQuery', () => {
  expect(parseQuery('?a=%E4%BD%A0%E5%A5%BD&b=true&c=abc')).toEqual({
    a: '你好',
    b: 'true',
    c: 'abc',
  })

  expect(parseQuery('?=%E4%BD%A0%E5%A5%BD&b=&c=abc')).toEqual({
    b: '',
    c: 'abc',
  })

  expect(parseQuery('')).toEqual({})
  expect(parseQuery(undefined)).toEqual({})
})

test('stringifyQuery', () => {
  expect(stringifyQuery({
    a: '你好',
    b: true,
    c: 'abc',
  })).toEqual('a=%E4%BD%A0%E5%A5%BD&b=true&c=abc')

  expect(stringifyQuery({})).toEqual('')
  expect(stringifyQuery(undefined)).toEqual('')
})
