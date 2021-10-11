/**
 * @desc 函数 防抖 false/节流 true
  * @param fn 函数
  * @param wait 函数执行间隔时间毫秒数 默认1s Number
  * @param immediate 是否立即执行 Boolean
  */
export function debounce (fn, wait, immediate) {
  wait = wait || 1000
  let timer
  return function () {
    if (timer && immediate) return
    const args = arguments
    if (timer && !immediate) {
      clearTimeout(timer)
    }
    if (immediate) fn.apply(this, args)
    timer = setTimeout(() => {
      timer = null
      if (!immediate) fn.apply(this, args)
    }, wait)
  }
}
