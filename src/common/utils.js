export {debounce,throttle}
// 防抖函数
function debounce(func,delay) {
  let timer = null
  return function() {
    clearTimeout(timer)
    timer = setTimeout(()=>{
      func(...arguments)
    },delay)
  }
}

// 节流函数
function throttle(func, delay) {
  let timer = null
  return function() {
    let that = this
    let _args = arguments
    if(!timer) {
      timer = setTimeout(() => {
        func.apply(that, _args)
        timer = null
      }, delay)
    }
  }
}