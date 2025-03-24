/**
 * 程序阻塞多长时间
 * @param time 
 */
export function choke(time = 1000) {
  setTimeout(() => {
    console.log('long time fun ...');
    const start = Date.now();
    while (Date.now() - start < time) { }
  }, 0);
}


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


type Curried<A, R> = A extends []
  ? () => R
  : A extends [infer ARG]
  ? (param: ARG) => R
  : A extends [infer ARG, ...infer REST]
  ? (param: ARG) => Curried<REST, R>
  : never
/**
 * 函数柯理化
 * @param fn 
 * @param args 
 * @returns 
 */
export function currying<A extends any[], R>(fn: (...args: A) => R, ...args: any[]) {
  return function (...rest) {
    const allArgs = [...args, ...rest];
    if (allArgs.length >= fn.length) {
      return fn.apply(this, allArgs);
    }
    return currying(fn, ...allArgs);
  } as Curried<A, R>
}
// function sum(a: string, b: number, c: object) {
//   return a + b + c;
// }
// const currySum = currying(sum);
// currySum('1')(2)({});  //--> 12[object Object]


type Scheduler = (scheduler: (isGoOn: () => boolean) => void) => void
/**
 * 执行耗时任务队列
 * @param tasks 
 * @param scheduler 
 * @returns 
 */
export function performTask(tasks: Function[], scheduler: Scheduler) {
  if (!tasks.length) return;
  let index = 0;
  function _run() {
    scheduler(isGoOn => {
      while (index < tasks.length && isGoOn()) {
        tasks[index++]();
      }
      if (index < tasks.length) _run();
    })
  }
  _run();
}
// const tasks = new Array(20).fill(0).map((_, i) => () => console.log(i));
// performTask(tasks, scheduler => {
//   let count = 0;
//   setTimeout(() => {
//     scheduler(() => count++ < 2)
//   }, 1000)
// })


/**
 * 执行耗时任务队列，requestIdleCallback
 * @param tasks 
 * @returns 
 */
export function idlePerformTask(tasks: Function[]) {
  return performTask(tasks, scheduler => {
    requestIdleCallback(idle => {
      scheduler(() => idle.timeRemaining() > 0);
    })
  })
}
// const tasks = new Array(20).fill(0).map((_, i) => () => console.log(i));
// idlePerformTask(tasks);

// requestIdleCallback
// MessageChannel
// requestAnimationFrame
// function runTask(task: Function, callback: Function) {
//   const start = Date.now();
//   requestAnimationFrame(() => {
//     if (Date.now() - start <= 16.6) {
//       task();
//       callback();
//     } else {
//       runTask(task, callback);
//     }
//   })
// }


// 将 script 变为异步加载
export function loadScript(url: string, cb: Function, isMoudule: boolean) {
  const script = document.createElement('script');
  script.src = url;
  // @ts-ignore
  if (cb) script.onload = cb;
  if (isMoudule) script.type = 'module';
  script.async = true;
  document.body.appendChild(script);
}


window.addEventListener('load', () => {
  setTimeout(() => {
    const timing = window.performance.timing, loadObj = {};
    const paint = window.performance.getEntriesByType('paint');

    loadObj['DNS查询耗时'] = timing.domainLookupEnd - timing.domainLookupStart;
    loadObj['TCP链接耗时'] = timing.connectEnd - timing.connectStart;
    loadObj['request耗时'] = timing.responseEnd - timing.responseStart;
    loadObj['解析DOM树耗时'] = timing.domComplete - timing.domInteractive;
    loadObj['白屏时间'] = timing.domLoading - timing.fetchStart;
    loadObj['domready'] = timing.domContentLoadedEventEnd - timing.fetchStart;
    loadObj['onload'] = timing.loadEventEnd - timing.fetchStart;

    loadObj['首次绘制时间(FC)'] = paint[0].startTime;
    loadObj['首次内容绘制时间(FCP)'] = paint[1].startTime;

    console.log(loadObj);
  }, 0);
})


// 采集JS Error
window.onerror = (errorMsg, url, lineNumber, columnNumber, errorObj) => {
  let errorStack = errorObj ? errorObj.stack : null;
  // 这里进行上报
  console.log(errorMsg, url, lineNumber, columnNumber, errorStack)
};
window.onunhandledrejection = (e) => {
  let errorMsg = "", errorStack = "";
  if (typeof e.reason === "object") {
    errorMsg = e.reason.message;
    errorStack = e.reason.stack;
  } else {
    errorMsg = e.reason;
  }
  // 这里进行上报
  console.log(errorMsg, errorStack)
}
