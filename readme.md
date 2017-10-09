## Ant Util

a javascript function expressions util and includes practical function used in dom.

### Features

* an javascript util handle function,object,array,etc.
* written in function expressions style.
* simple test case ant rich api document.

### Environment Support
* Browser: Modern browsers support ecmascript 5

### Install
```
npm install ant-util --save
```
### Usage
```
import util from 'ant-util'
const { map } = util

map({ name: 'ant', age: 13 }, (value, key) => `my ${key} is ${value}`)

// => {name: 'my name is ant', age: 'my age is 13'}
```

Ant import style manually:
```
import { map } from 'ant-util/lib/object'
```

### Development
```
$ git clone https://github.com/antgod/ant-util.git
$ cd ant-util && npm install
```
### API Usage（Document is building, please waiting）

* [functions][2]
* [array][3]
* [object][4]
* [string][5]
* [exist][6]
* [dom][7]
* [url][8]
* [assert][9]
* [if][10]

  [1]: https://github.com/antgod/ant-util/
  [2]: https://github.com/antgod/ant-util/blob/master/__test__/functions.test.js
  [3]: https://github.com/antgod/ant-util/blob/master/__test__/array.test.js
  [4]: https://github.com/antgod/ant-util/blob/master/__test__/object.test.js
  [5]: https://github.com/antgod/ant-util/blob/master/__test__/string.test.js
  [6]: https://github.com/antgod/ant-util/blob/master/__test__/exist.test.js
  [7]: https://github.com/antgod/ant-util/blob/master/__test__/dom.test.js
  [8]: https://github.com/antgod/ant-util/blob/master/__test__/url.test.js
  [9]: https://github.com/antgod/ant-util/blob/master/__test__/assert.test.js
  [10]: https://github.com/antgod/ant-util/blob/master/__test__/if.test.js