const util = require('../lib/index').default

const { map } = util

console.log(map({ name: 'ant', age: 13 }, (value, key) => `my ${key} is ${value}`))