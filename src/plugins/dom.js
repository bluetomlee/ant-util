function offsetTop(el) {
  let top = el.offsetTop
  let parent = el.offsetParent
  while (parent !== null) {
    top += parent.offsetTop
    parent = parent.offsetParent
  }
  return top
}

function offsetLeft(el) {
  let left = el.offsetLeft
  let parent = el.offsetParent
  while (parent !== null) {
    left += parent.offsetLeft
    parent = parent.offsetParent
  }
  return left
}

function addEvent(el, event, handler) {
  if (!el) return
  if (el.attachEvent) {
    el.attachEvent(`on${event}`, handler)
  } else if (el.addEventListener) {
    el.addEventListener(event, handler, true)
  } else {
    el[`on${event}`] = handler
  }
}

function removeEvent(el, event, handler) {
  if (!el) return
  if (el.detachEvent) {
    el.detachEvent(`on${event}`, handler)
  } else if (el.removeEventListener) {
    el.removeEventListener(event, handler, true)
  } else {
    el[`on${event}`] = null
  }
}

function getBrowserPrefix() {
  if (typeof window === 'undefined') return ''
  const styles = window.getComputedStyle(document.documentElement, '')
  const pre = (Array.prototype.slice
    .call(styles)
    .join('')
    .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
  )[1]
  if (pre === 'ms') return pre
  return pre.slice(0, 1).toUpperCase() + pre.slice(1)
}


/**
 * 获取url问号后边的变量相对应的值
 * @param {String} key
 * @return {String}
 */
function getQuery(key) {
  const reg = new RegExp(`(^|&)${key.toLowerCase()}=([^&]*)(&|$)`, 'i')
  const r = window.location.search.substr(1).match(reg)
  return r ? decodeURI(r[2]) : ''
}


function debounce(fn, wait = 200) {
  let timeout
  let timestamp
  let lastArgs = []
  let context = null

  function later() {
    const last = Date.now() - timestamp
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      fn.call(context, ...lastArgs)
      timeout = null
      lastArgs = []
    }
  }

  return function debounced(...args) {
    lastArgs = args
    context = this
    timestamp = Date.now()
    if (!timeout) {
      setTimeout(later, wait)
    }
  }
}

function safeDecodeURIComponent(str) {
  try {
    return decodeURIComponent(str)
  } catch (e) {
    return str
  }
}

const openWindow = (url = '') => {
  if (url.indexOf('#') === 0) {
    location.hash = url
  } else {
    window.open(url, '_blank')
  }
}

const skipWindow = (url) => {
  location.href = url
}

const go = path => history.go(path)

const getCookie = (key) => {
  const m = new RegExp(`\\b${key}\\=([^]+)`).exec(document.cookie)
  return m ? m[1] : ''
}

const nextTick = (callback, delay = 0) => window.setTimeout(callback, delay)

export {
  offsetTop,
  offsetLeft,
  addEvent,
  removeEvent,
  getBrowserPrefix,
  getQuery,
  debounce,
  safeDecodeURIComponent,
  openWindow,
  skipWindow,
  go,
  getCookie,
  nextTick,
}
