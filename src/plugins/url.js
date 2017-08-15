import { map2Array } from '../core/object'

// const  = util

export default {
  parseQuery: (search = '') =>
    search.replace(/\?/, '').split('&').reduce((query, expression) => {
      const [key = '', value = ''] = expression.split('=')
      return { ...query, [key]: decodeURIComponent(value) }
    }, {}),

  stringifyQuery: (query = {}) => map2Array(query, (value, key) => `${key}=${encodeURIComponent(value)}`).join('&'),
}
