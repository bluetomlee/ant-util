const capitalize = str => str === undefined || str.length === 0 ? str : `${str[0].toUpperCase()}${str.slice(1)}`

const upper = str => str === undefined || str.length === 0 ? str : `${str[0].toUpperCase()}${str.slice(1)}`

const lower = str => str === undefined || str.length === 0 ? str : `${str[0].toLowerCase()}${str.slice(1)}`

/* istanbul ignore next */
const uniqueString = len => Math.random().toString(36).substr(2, len)
// console.log(uniqueString(10))

/* istanbul ignore next */
const uniquePrefix = prefix => [prefix, new Date().getTime()].join('')
// console.log(uniquePrefix('ghosts'))
// console.log(uniquePrefix('turkey'))

const indexGenerator = (counter, prefix) => (pre = prefix) => [pre, counter++].join('')
// const g1 = indexGenerator(0, 'prefix')
// console.log(g1())
// console.log(g1())
// console.log(g1('new'))

const replace = content => (reg, handle) => content.replace(reg, handle)

export {
  capitalize,
  upper,
  lower,
  uniqueString,
  uniquePrefix,
  indexGenerator,
  replace,
}

