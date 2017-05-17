## Ant Util

an javascript function expressions util and includes some practical function used in dom.

### document

[ant-util document][1]

*文档持续建设中...*

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

$ git clone https://github.com/antgod/ant-util.git
$ cd ant-util && npm install

### Catalog

* [array][2]
* [async][3]
* [dom][4]
* [functions][5]
* [histroy][6]
* [middleware][7]
* [object][8]
* [string][9]


  [1]: https://antgod.gitbooks.io/ant-util/
  [2]: https://antgod.gitbooks.io/ant-util/array.html
  [3]: https://antgod.gitbooks.io/ant-util/async.html
  [4]: https://antgod.gitbooks.io/ant-util/dom.html
  [5]: https://antgod.gitbooks.io/ant-util/functions.html
  [6]: https://antgod.gitbooks.io/ant-util/history.html
  [7]: https://antgod.gitbooks.io/ant-util/middleware
  [8]: https://antgod.gitbooks.io/ant-util/object.html
  [9]: https://antgod.gitbooks.io/ant-util/string.html