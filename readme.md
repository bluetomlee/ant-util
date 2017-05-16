## Ant Util

an javascript function expressions util and includes some practical function used in dom.

### document

```
coding...
```

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

* array
* async
* dom
* functions
* histroy
* middleware
* object
* string
