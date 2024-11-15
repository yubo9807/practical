
/**
 * 节流
 * @param handler 
 * @param wait 
 * @returns 
 */
export function throttle<A extends any[], R>(handler: (...args: A) => R, wait: number) {
  let lastTime = 0;
  return function (...args: A) {
    let nowTime = new Date().getTime();
    if (nowTime - lastTime > wait) {
      handler.apply(this, ...args);
      lastTime = nowTime;
    }
  }
}

/**
 * 防抖
 * @param handler 
 * @param delay 
 * @returns 
 */
export function debounce<A extends any[], R>(handler: (...args: A) => R, delay: number) {
  let timer = null;
  return function (...args: A) {
    let _self = this;
    clearTimeout(timer);
    timer = setTimeout(function () {
      handler.apply(_self, ...args);
    }, delay);
  }
}
