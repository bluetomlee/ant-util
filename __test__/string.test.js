import util from '../src/index'

const {
  capitalize,
  uniqueString,
  uniquePrefix,
  indexGenerator,
  replace,
} = util

test('capitalize', () => {
  expect(capitalize('hello')).toEqual('Hello')
})

test('uniqueString', () => {
  console.log(uniqueString(10))
})

test('uniquePrefix', () => {
  console.log(uniquePrefix('ghosts'))
  console.log(uniquePrefix('turkey'))
})

test('indexGenerator', () => {
  const g = indexGenerator('1', 'b')
  expect(g()).toEqual('b1')
  expect(g('a')).toEqual('a2')
})

test('replace', () => {
  const r = replace('hello')
  expect(r(/^[a-z]/, n => n.toUpperCase())).toEqual('Hello')
  expect(r(/[a-z]$/, n => n.toUpperCase())).toEqual('hellO')
})
