import util from '../src/plugins/url'

const { parseQuery, stringifyQuery } = util

test('parseQuery', () => {
  expect(parseQuery('?a=%E4%BD%A0%E5%A5%BD&b=true&c=abc')).toEqual({
    a: '你好',
    b: 'true',
    c: 'abc',
  })
})

test('stringifyQuery', () => {
  expect(stringifyQuery({
    a: '你好',
    b: true,
    c: 'abc',
  })).toEqual('a=%E4%BD%A0%E5%A5%BD&b=true&c=abc')
})
