import { map2Array, exist, truthy } from '../core/object'

const parseQuery = (search = '') => search ?
  search.replace(/\?/, '').split('&').reduce((query, expression) => {
    const [key, value = ''] = expression.split('=')
    return exist(key) ? { ...query, [key]: decodeURIComponent(value) } : query
  }, {}) : {}

const stringifyQuery = (query = {}) => truthy(query) ? map2Array(query, (value, key) => `${key}=${encodeURIComponent(value)}`).join('&') : ''

export {
  parseQuery,
  stringifyQuery,
}
