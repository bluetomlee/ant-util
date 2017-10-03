import util from '../src/index'

const {
  assert,
} = util.plugins.assert

// 获取数据
test('assert', () => {
  assert(false, 'error message')
  assert(false, 'error message', console.error)
  assert(false, 'error message', (message) => {
    console.log('此处可抛出异常', message)
    // throw new Error(message)
  })
})

