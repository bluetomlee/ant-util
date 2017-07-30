const capitalize = str => str === undefined || str.length === 0 ? str : `${str[0].toUpperCase()}${str.slice(1)}`

const unique = len => Math.random().toString(36).substr(2, len)
// console.log(uniqueString(10))
const uniquePrefix = prefix => [prefix, new Date().getTime()].join('')
// console.log(uniquePrefix('ghosts'))
// console.log(uniquePrefix('turkey'))

const indexGenerator = (counter, prefix) => (pre = prefix) => [pre, counter++].join('')
// const g1 = indexGenerator(0, 'prefix')
// console.log(g1())
// console.log(g1())
// console.log(g1('new'))

export {
  capitalize,
  unique,
  uniquePrefix,
  indexGenerator,
}

