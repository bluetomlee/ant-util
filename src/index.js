import * as array from './core/array'
import * as functions from './core/functions'
import * as object from './core/object'
import * as string from './core/string'

import * as async from './plugins/async'
import * as history from './plugins/history'
import * as middleware from './plugins/middleware'
import * as dom from './plugins/dom'

export default {
  ...array,
  ...functions,
  ...object,
  ...string,
  plugins: {
    async,
    history,
    middleware,
    dom,
  },
}
