export function debounce(fn: Function, delay = 300) {
  let timer: any = null
  return (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
