import * as array from './core/array'
import * as functions from './core/functions'
import * as object from './core/object'
import * as string from './core/string'

import * as async from './plugins/async'
import * as history from './plugins/history'
import * as middleware from './plugins/middleware'

export default { ...array, ...async, ...functions, ...history, ...middleware, ...object, ...string }
