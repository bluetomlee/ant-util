import * as array from './core/array'
import * as functions from './core/functions'
import * as object from './core/object'
import * as string from './core/string'

import * as async from './plugins/async'
import * as dom from './plugins/dom'
import * as url from './plugins/url'
import * as exist from './plugins/exist'
import * as assert from './plugins/assert'

export default {
  ...array,
  ...functions,
  ...object,
  ...string,
  plugins: {
    async,
    dom,
    url,
    exist,
    assert,
  },
}
