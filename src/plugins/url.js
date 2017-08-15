import { map2Array } from '../core/object'

const parseQuery = (search = '') =>
  search.replace(/\?/, '').split('&').reduce((query, expression) => {
    const [key = '', value = ''] = expression.split('=')
    return { ...query, [key]: decodeURIComponent(value) }
  }, {})

const stringifyQuery = (query = {}) => map2Array(query, (value, key) => `${key}=${encodeURIComponent(value)}`).join('&')

export {
  parseQuery,
  stringifyQuery,
}
