import util from '../src/index'

// 数组API
const {
  getCookie,
} = util.plugins.dom

// 测试 cookie 的获取
test('get cookie ', () => {
  document.cookie = 'a=1b'
  document.cookie = 'b=2c'
  document.cookie = 'c=3d'

  expect(getCookie('a')).toEqual('1b')
  expect(getCookie('b')).toEqual('2c')
  expect(getCookie('c')).toEqual('3d')
})

