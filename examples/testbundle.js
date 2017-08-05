/* eslint-disable */
const util = require('../dist/index').default
const { first, some, map, replace } = util

console.log('非插件函数', first, some, map, replace)

console.log('插件函数dom', util.plugins.dom)