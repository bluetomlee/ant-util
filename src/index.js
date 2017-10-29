import * as array from './core/array'
import * as functions from './core/functions'
import * as object from './core/object'
import * as string from './core/string'

import * as dom from './plugins/dom'
import * as url from './plugins/url'
import * as exist from './plugins/exist'

export default {
  ...array,
  ...functions,
  ...object,
  ...string,
  plugins: {
    dom,
    url,
    exist,
  },
}
