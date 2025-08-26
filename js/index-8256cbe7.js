var de=Object.defineProperty;var fe=(e,n,r)=>n in e?de(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r;var b=(e,n,r)=>(fe(e,typeof n!="symbol"?n+"":n,r),r),ee=(e,n,r)=>{if(!n.has(e))throw TypeError("Cannot "+r)};var m=(e,n,r)=>(ee(e,n,"read from private field"),r?r.call(e):n.get(e)),L=(e,n,r)=>{if(n.has(e))throw TypeError("Cannot add the same private member more than once");n instanceof WeakSet?n.add(e):n.set(e,r)},w=(e,n,r,t)=>(ee(e,n,"write to private field"),t?t.call(e,r):n.set(e,r),r);var ne=(e,n,r,t)=>({set _(o){w(e,n,o,r)},get _(){return m(e,n,t)}});import{p as ge}from"./@babel-667fc88d.js";import{l as K,u as q,b as re,a as O,c as te,h as x,q as he,L as ye}from"./pl-react-532112ff.js";import{e as be,_ as xe,a as ve,b as _e,d as we,f as ke,h as Se,s as Te,j as Ce,k as je,l as Ae}from"./index-2aaa6a80.js";import{D as Me}from"./basic-343393ce.js";import{r as Le,_ as Pe,a as Ee,b as Oe}from"./async-9f157f3b.js";import{_ as Re}from"./math-c1d85691.js";import{f as Ne,a as Fe,t as Be}from"./source-b7a3e777.js";import"./debug-207d77b3.js";import"./ms-f6814399.js";import"./@jridgewell-d6b790c1.js";import"./jsesc-4cfd8464.js";import"./picocolors-cddfbdbe.js";import"./js-tokens-bc2e8ff2.js";import"./marked-c333d169.js";const De="page-utils-f86c23",Ie="navigation-62969b",Ue="content-bea58d",We="outline-690e4e",He="total-307071",I={"page-utils":"page-utils-f86c23",pageUtils:De,navigation:Ie,content:Ue,outline:We,total:He},ze=`import { randomNum } from './number';\r
import { deepClone } from "./object";\r
\r
/**\r
 * 创建指定长度的数组，并填入内容\r
 * @note 与 new Array(len).fill() 的不同是写入的每一项不会出现同一引用地址\r
 * @param len \r
 * @param item \r
 * @returns \r
 */\r
export function createArray(len: number, item: any = void 0) {\r
  const arr = new Array(len);\r
  let i = 0;\r
  while (i < arr.length) {\r
    arr[i] = deepClone(item);\r
    i++;\r
  }\r
  return arr;\r
}\r
// createArray(3, { a: 1 });\r
\r
\r
/**\r
 * 创建指定长度的随机数的数组，且规定范围不重复\r
 * @param len 指定长度\r
 * @param max 最大值（取不到）\r
 * @param min 最小值\r
 */\r
export function createRandomArray(len: number, max: number = 10, min: number = 0) {\r
  let arr = new Array(len);\r
  const uniqueArr = (arr: number[]) => [...new Set(arr)];  // 数组去重\r
  // 生成数组\r
  (function produceArr() {\r
    let i = 0;\r
    while (i < arr.length) {\r
      arr[i] = randomNum(max, min);\r
      i++;\r
    }\r
    return uniqueArr(arr).length < len && produceArr();  // 去重后的数组小于数组的长度，再次生成数组\r
  }());\r
  return arr;\r
}\r
\r
\r
/**\r
 * 数组数据分组\r
 * @param arr \r
 * @param generateKey \r
 * @returns \r
 */\r
export function groupBy<T extends object>(arr: T[], generateKey: string | ((item: T) => string)) {\r
  let newGenerateKey = generateKey as (item: T) => string;\r
  if (typeof generateKey === 'string') {\r
    newGenerateKey = item => item[generateKey];\r
  }\r
  const result = {};\r
  for (const person of arr) {\r
    let key = newGenerateKey(person);\r
    if (!key) continue;\r
    if (!result[key]) {\r
      result[key] = [];\r
    }\r
    result[key].push(person);\r
  }\r
  return result;\r
}\r
// const data = [{ name: 'Alice', age: 21 }, { name: 'Bob', age: 32 }]\r
// groupBy(data, 'name');  // 按键名分组\r
// groupBy(data, val => val.age > 30 ? '老年' : '小孩')  // 自定义规则分组\r
\r
\r
/**\r
 * 树形数据过滤（数组）\r
 * @param data     树形数据\r
 * @param filter   过滤函数\r
 * @param children 子集字段\r
 * @returns \r
 */\r
export function treeArrayFilter<D extends any[]>(data: D, filter: (item: D[number]) => boolean, children = 'children') {\r
  if (!data.length) return [];\r
\r
  const retain = [];  // 疫情报备、收集\r
  for (const item of data) {\r
    // 没有谎报疫情、确实有，封锁\r
    if (filter(item)) {\r
      retain.push(item);\r
      continue;\r
    }\r
    if (!item[children]) continue;\r
\r
    // 没有疫情，继续查 区/社区\r
    const newRetain = treeArrayFilter(item[children], filter, children);\r
    // 但凡查出一例，区长、市长一起抓\r
    newRetain.length > 0 && retain.push({ ...item, [children]: newRetain });\r
  }\r
  return retain;  // 等着蹲小黑屋\r
}\r
// const data = [\r
//   {\r
//     name: '1',\r
//     age: 21,\r
//     children: [\r
//       { name: '1-1', age: 32 }\r
//     ]\r
//   },\r
//   { name: '2', age: 20 }\r
// ]\r
// const result = treeArrayFilter(data, val => val.age > 30);\r
// console.log(result);  //=> [{ name: '1', age: 21, children: [{ name: '1-1', age: 32 }]}]\r
\r
\r
/**\r
 * 扁平数组转为树形数据\r
 * @param list   数据\r
 * @param props  配置项 { key: 父级键, parent: 父级键指向, children: 子集收纳 }\r
 * @param parent 父级默认值\r
 * @returns \r
 */\r
export function arrayToTree(list: any[], props = { key: 'id', parent: 'parent', children: 'children' }, parent = null) {\r
  const newList = [], childrenList = [];\r
  list.forEach(val => {\r
    if (val.hasOwnProperty(props.parent)) {\r
      val[props.parent] === parent ? newList.push(val) : childrenList.push(val);\r
    } else {\r
      newList.push(val);\r
    }\r
  })\r
  list.forEach(val => {\r
    if (val[props.parent] === parent) {\r
      val[props.children] = arrayToTree(childrenList, props, val[props.key]);\r
    };\r
  });\r
  return newList;\r
}\r
// const arr = [\r
//   { id: '1', name: 'aaa' parent: null },\r
//   { id: '2', name: 'bbb' parent: '1' },\r
//   { id: '3', name: 'ccc' parent: '1' },\r
//   { id: '4', name: 'ddd' parent: '2' },\r
//   { id: '5', name: 'eee' parent: '2' },\r
//   { id: '6', name: 'fff' parent: '3' },\r
// ]\r
// console.log(arrayToTree(arr))\r
\r
\r
/**\r
 * 洗牌算法\r
 * @param numbers \r
 * @returns \r
 */\r
export function shuffle(numbers: number[]) {\r
  for (let i = numbers.length - 1; i > 0; i--) {\r
    const j = Math.floor(Math.random() * (i + 1));\r
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];\r
  }\r
  return numbers;\r
}\r
// console.log(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))\r
\r
\r
/**\r
 * 查找数组中重复的数组段\r
 * @param array \r
 * @param query \r
 * @returns \r
 */\r
export function findFragment(array: number[], query: any[]) {\r
  if (array.length < query.length) return null;\r
\r
  query = [...query];\r
  const record = new Array(2) as [number, number];\r
\r
  let i = 0;\r
  while (i < array.length) {\r
    if (array.length - i < query.length) break;\r
\r
    const collect = new Array(query.length);\r
    for (let j = 0; j < query.length; j++) {\r
      if (array[i + j] === query[j]) {\r
        collect[j] = i + j;\r
      }\r
    }\r
\r
    if (collect.filter(v => v !== void 0).length === query.length) {\r
      record[0] = collect[0];\r
      record[1] = collect[collect.length - 1];\r
      break;\r
    }\r
    i++;\r
  }\r
\r
  return record.includes(void 0) ? null : record;\r
}\r
// findFragment([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [1, 2, 3, 4, 5]);  //--> [0, 4]\r
\r
\r
/**\r
 * 一维数组转换为二维数组\r
 * @param arr   数组\r
 * @param count 多少个数为一组\r
 */\r
export function multArray(arr: any[], count = 2) {\r
  const pages: any[] = [];\r
  arr.forEach((item, index) => {\r
    const page = Math.floor(index / count);\r
    !pages[page] && (pages[page] = []);\r
    pages[page].push(item);\r
  });\r
  return pages;\r
}\r
// multArray([1, 2, 3, 4, 5, 6, 7], 3);  //--> [[1, 2, 3], [4, 5, 6], [7]]\r
\r
\r
/**\r
 * 检查两个数组各项是否相等\r
 * @param a 数组1\r
 * @param b 数组2\r
 * @returns \r
 */\r
export function isArrayEqual(a: any[], b: any[]) {\r
  if (a.length !== b.length) return false;\r
  if (a.find(x => !b.includes(x))) return false;\r
  return true\r
}\r
// isArrayEqual([6, 5, 2, 4, 1, 3], [1, 2, 3, 4, 5, 6])  //--> true\r
\r
\r
/**\r
 * 两个数组的 交集\r
 * @param a 数组1\r
 * @param b 数组2\r
 * @returns \r
 */\r
export function intersectionArray(a: any[], b: any[]) {\r
  const s = new Set(b);\r
  let arr = a.filter(x => !s.has(x));\r
  return arr;\r
}\r
// intersectionArray(['a', 2, 6, 7], ['a', 2, 9, 'b'])  //--> [6, 7]\r
\r
\r
/**\r
 * 两个数组的 并集\r
 * @param a \r
 * @param b \r
 * @returns \r
 */\r
export function union(a: any[], b: any[]) {\r
  const s = new Set(b);\r
  return a.filter(x => s.has(x));\r
}\r
// unionArr([1, 2, 6, 7], [1, 2, 9, 5])  //--> [1, 2]\r
\r
\r
/**\r
 * 数组对象去重\r
 * @param arr 数组\r
 * @param key 去重的对象属性值\r
 * @returns \r
 */\r
export function uniqueArrayObject(arr: object[], key: string | number) {\r
  return arr.reduce((acc: any[], cur: object) => {\r
    const ids = acc.map(item => item[key]);\r
    return ids.includes(cur[key]) ? acc : [...acc, cur];\r
  }, []);\r
}\r
// uniqueArrayObject([{ id: 1 }, { id: 2 }, { id: 1 }], 'id')  //--> [{ id: 1 }, { id: 2 }]\r
\r
\r
/**\r
 * 找出数组中只出现一次的数字\r
 * @param arr \r
 * @returns \r
 */\r
export function querySingle(arr: number[]) {\r
  return arr.reduce((a, b) => a ^ b, 0);\r
}\r
// querySingle([1, 2, 2, 3, 1])  //--> 3\r
\r
/**\r
 * 数组排列，看有多少种情况\r
 * @param arr\r
 * @returns \r
 */\r
export function permute(arr: any[]) {\r
  let results: any[] = [];\r
\r
  let go = (current: any[]) => {\r
    if (current.length === arr.length) {\r
      results.push(current);\r
      return;\r
    }\r
    arr.forEach(n => {\r
      if (!current.includes(n)) {\r
        go([...current, n]);\r
      }\r
    });\r
  }\r
  go([]);\r
  return results;\r
}\r
// permute([1, 2])  //--> [[1, 2], [2, 1]]\r
`,qe=`import { PromiseType } from "./type";

/**
 * 延迟
 * @param ms 
 * @returns 
 */
export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// delay(1000).then(() => console.log('1s'))

/**
 * 格式化异步函数，以数组形式返回
 * @param promise 请求函数
 * @returns [err, res] 只有一项为 null
 */
export function asyncto<P extends Promise<unknown>>(promise: P): Promise<[unknown, PromiseType<P>]> {
  // @ts-ignore
  return promise
    .then(res => [null, res])
    .catch(err => [err, null]);
}
// const [err, res] = await asyncto(promise);

/**
 * 整合游散的回调，将完成事件和错误事件整合到同一个函数中，通过 .then | .catch 接收
 * @param func 
 * @returns 
 */
export function conformity<F extends (...args: any[]) => any, R = unknown, E = unknown>(func: F) {
  let curResolve: (value: R) => void, curReject: (reason?: E) => void;
  let result: ReturnType<F>;
  return {
    exec(...args: Parameters<F>) {
      return new Promise(async (resolve, reject) => {
        try {
          result = await func(...args);
        } catch (err) {
          reject(err);  // 函数在执行过程中出现错误
        }
        curResolve = resolve;
        curReject = reject;
      })
    },
    success(res?: R | ReturnType<F>) {
      curResolve(res || result);  // 触发回调，无参数时将函数执行的结果作为参数
    },
    fail(err?: E) {
      curReject(err);  // 自定义错误
    }
  }
}
/*
// 多用在框架组件事件传递上。如：
// 打开弹窗
const open = conformity((info) => {
  console.log('info,', info);
})
// 提交表单
setTimeout(() => {
  open.success(456);
}, 100)
// 打开弹窗
open.exec(123).then(res => {
  // 弹窗关闭，刷新列表
  console.log(res);
}) */
`,$e=`import { AnyObj } from "./type";\r
\r
/**\r
 * 执行 worker 代码\r
 * @param code \r
 * @returns \r
 */\r
export function execWorkerCode(code: string) {\r
  const blob = new Blob([code], { type: 'application/javascript' });\r
  const url = URL.createObjectURL(blob);\r
  return new Worker(url);\r
}\r
// execWorkerCode(\`console.log(1111)\`)\r
\r
\r
/**\r
 * 滚动条、锚链接（记得取消 a 标签默认事件）跳转过渡  默认回到顶部\r
 * @param el 元素节点\r
 */\r
export function scrollTo(el: any = {}, deviation = 0) {\r
  const num = el.offsetTop || 0;\r
  window.scrollTo({\r
    top: num + deviation,\r
    behavior: "smooth",\r
  });\r
}\r
\r
\r
/**\r
 * 劫持粘贴板\r
 * @param text 需要复制的字符\r
 */\r
export function copyToBoard(text: string) {\r
  if (typeof navigator.clipboard === 'object') {\r
    navigator.clipboard.writeText(text);\r
  } else {\r
    const dummy = document.createElement("textarea");\r
    document.body.appendChild(dummy);\r
    dummy.value = text;\r
    dummy.select();\r
    document.execCommand("copy");\r
    document.body.removeChild(dummy);\r
  }\r
}\r
\r
/**\r
 * 禁止右键复制\r
 * @param arr contextmenu：选择 selectstart：右键 copy：复制]\r
 */\r
export function prohibitCopy(arr: string[] = ['selectstart', 'copy']) {\r
  arr.forEach((ev: any) => {\r
    document.addEventListener(ev, (event: any) => {\r
      return event.returnValue = false;\r
    })\r
  });\r
}\r
\r
/**\r
 * 禁止某些键盘事件\r
 */\r
export function prohibitKeydown() {\r
  document.addEventListener('keydown', function (event: any) {\r
    return !(\r
      112 == event.keyCode ||  // F1\r
      123 == event.keyCode ||  // F12\r
      event.ctrlKey && 82 == event.keyCode ||  // ctrl + R\r
      event.ctrlKey && 78 == event.keyCode ||  // ctrl + N\r
      event.shiftKey && 121 == event.keyCode ||  // shift + F10\r
      event.altKey && 115 == event.keyCode ||  // alt + F4\r
      "A" == event.srcElement.tagName && event.shiftKey  // shift + 点击a标签\r
    ) || (event.returnValue = false)\r
  });\r
}\r
\r
\r
/**\r
 * 获取 cookie 指定参数\r
 * @param {*} key 要获取的 key\r
 * @returns \r
 */\r
export function getCookie(key: string) {\r
  const cookie = document.cookie;\r
  const str = cookie.replace(/\\s/g, '');\r
  const obj = {}\r
  str.split(';').forEach((val: string) => {\r
    obj[val.split('=')[0]] = val.split('=')[1];\r
  })\r
  return obj[key];\r
}\r
\r
declare const cookieStore;\r
/**\r
 * 异步获取 cookie 指定参数（需考虑兼容性）\r
 * @param key \r
 * @returns \r
 */\r
export async function asyncGetCookie(key: string) {\r
  if (typeof cookieStore === 'object') {\r
    const obj = await cookieStore.get(key);\r
    return obj?.value;\r
  }\r
}\r
\r
\r
/**\r
 * 返回浏览器视口尺寸\r
 */\r
export function getViewportOffset() {\r
  if (window.innerWidth) {\r
    return {\r
      x: window.innerWidth,\r
      y: window.innerHeight,\r
    }\r
  } else {\r
    if (document.compatMode === "BackCompt") {  // 混杂模式\r
      return {\r
        x: document.body.clientWidth,\r
        y: document.body.clientHeight,\r
      }\r
    } else {\r
      return {\r
        x: document.documentElement.clientWidth,\r
        y: document.documentElement.clientHeight,\r
      }\r
    }\r
  }\r
}\r
\r
/**\r
 * 检查当前浏览器是否在苹果设备上\r
 */\r
export function isAppleDevice() {\r
  return /Mac|iPod|iPhone|iPad/.test(navigator.platform);\r
}\r
\r
/**\r
 * 判断浏览器类型\r
 */\r
export function browserType() {\r
  var userAgent = window.navigator.userAgent; // 取得浏览器的userAgent字符串\r
  var isOpera = userAgent.indexOf("Opera") > -1;\r
  if (isOpera) {\r
    return "Opera"\r
  }; //判断是否Opera浏览器\r
  if (userAgent.indexOf("Firefox") > -1) {\r
    return "Firefox";\r
  } //判断是否Firefox浏览器\r
  if (userAgent.indexOf("Chrome") > -1) {\r
    return "Chrome";\r
  }\r
  if (userAgent.indexOf("Safari") > -1) {\r
    return "Safari";\r
  } //判断是否Safari浏览器\r
  if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {\r
    return "IE";\r
  }; //判断是否IE浏览器\r
}\r
\r
/**\r
 * 资源请求错误，更换地址重试\r
 */\r
export function assetsLoadError(newUrl: string) {\r
  let count = 0;\r
  window.addEventListener('error', (e) => {\r
    const tag = e.target as HTMLScriptElement;\r
    if (tag.nodeName === 'SCRIPT' && !(e instanceof ErrorEvent)) {\r
      if (count > 2) return;\r
      const script = document.createElement('script');\r
      // @ts-ignore\r
      script.src = newUrl;\r
      document.write(\`<script src="\${newUrl}">\\<\\/script>\`);\r
      // document.head.insertBefore(script, tag);\r
      count++;\r
    }\r
  }, true)\r
}\r
`,Ye=`import { WideClass } from "./type";

/**
 * 将类变为单例模式
 * @param classFn 
 * @returns 
 */
export function singleton(classFn: WideClass) {
  let ins = null;
  return new Proxy(classFn, {
    construct(target, args) {
      if (!ins) {
        ins = new target(...args)
      }
      return ins;
    }
  })
}
// const Cla = singleton(class {
//   a = 1;
// });
// const a = new Cla();
// const b = new Cla(); b.a = 3;
// console.log(a.a);  //--> 3
`,Ke=`import { randomNum } from "./number";

type Color = [number, number, number];

/**
 * 生成随机颜色
 */
export function randomColor(min = '000000', max = 'ffffff') {
  const minNumber = parseInt(min, 16), maxNumber = parseInt(max, 16);
  return '#' + randomNum(maxNumber, minNumber).toString(16);
}


/**
 * @description: 16进制颜色转换成rgb
 */
export function colorToRGB(color: string): string {
  const hex = color.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return \`\${r}, \${g}, \${b}\`
}


/**
 * 将 rgb 颜色灰度化（基于光感加权平均）
 * @param r 
 * @param g 
 * @param b 
 * @returns 
 */
export function grayColor(r: number, g: number, b: number) {
  return .2126 * r + .7152 * g + .0722 * b;
}

/**
 * 获取两个颜色的中间色（rgba 不在考虑范围内）
 * @param startColor 开始颜色 (长度为3的数组)
 * @param endColor   结束颜色 (长度为3的数组)
 * @param num        需要多少个
 * @returns rgb list
 */
export function getMiddleColorList(startColor: Color, endColor: Color, num: number): Color[] {
  const rStep = (endColor[0] - startColor[0]) / num;
  const gStep = (endColor[1] - startColor[1]) / num;
  const bStep = (endColor[2] - startColor[2]) / num;

  const gradientColorArr = [];
  for (let i = 0; i < num; i++) {
    gradientColorArr.push([
      Math.round(startColor[0] + i * rStep),
      Math.round(startColor[1] + i * gStep),
      Math.round(startColor[2] + i * bStep)
    ])
  }
  return gradientColorArr;
}

/**
 * 合并颜色
 * @param a 
 * @param b 
 * @returns 
 */
export function mergeColor(a: string, b: string) {
  if (!/^#[0-9A-F]{6}$/i.test(a) || !/^#[0-9A-F]{6}$/i.test(b)) {
    throw new Error('Invalid hex color format');
  }

  // 解析颜色值并转换成十进制数
  const colorA = parseInt(a.slice(1), 16);
  const colorB = parseInt(b.slice(1), 16);

  // 计算每个颜色通道的平均值
  const red = Math.floor((colorA >> 16) + (colorB >> 16)) / 2;
  const green = Math.floor(((colorA >> 8) & 0xff) + ((colorB >> 8) & 0xff)) / 2;
  const blue = Math.floor((colorA & 0xff) + (colorB & 0xff)) / 2;

  // 将平均值转换回十六进制，并保证输出字符串格式为 #RRGGBB
  const mergedColor = \`#\${(red << 16 | green << 8 | blue).toString(16).padStart(6, '0')}\`;

  return mergedColor;
}
`,Ve=`
type WideDate = number | string | Date

/**
 * 检查该时间是否为工作日
 * @param date 
 * @returns 
 */
export function isWeekday(date: Date) {
  return date.getDay() % 6 !== 0;
}

/**
 * 从一个日期获取时间
 * @param date 
 * @returns
 */
export function getDateTime(date: Date) {
  return date.toTimeString().slice(0, 8);
}

/**
 * 获取当前时间
 * @param t 
 * @returns object
 */
export function getCurrentDate(t: WideDate) {
  let date = t || t === 0 ? new Date(t) : new Date();
  return {
    year: date.getFullYear() + '',
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  }
}


/**
 * 格式化时间
 * @param formater 
 * @param t 
 * @returns
 */
export function dateFormater(t: WideDate, formater: string = 'YYYY-MM-DD hh:mm:ss') {
  if (!t && t !== 0) return '';
  const { year, month, day, hour, minute, second } = getCurrentDate(t);
  return formater.replace(/YYYY/g, year)
    .replace(/YY/g, year.substr(2, 2))
    .replace(/MM/g, (month < 10 ? '0' : '') + month)
    .replace(/DD/g, (day < 10 ? '0' : '') + day)
    .replace(/hh/g, (hour < 10 ? '0' : '') + hour)
    .replace(/mm/g, (minute < 10 ? '0' : '') + minute)
    .replace(/ss/g, (second < 10 ? '0' : '') + second);
}


const addZero = (v: number) => v < 10 ? '0' + v : v;

/**
 * 格林时间转为北京时间
 * @param time 
 * @return
 */
export function switchTimeFormat(time: Date | string) {
  const dateTime = new Date(time);
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const date = dateTime.getDate();
  const hour = dateTime.getHours();
  const minute = dateTime.getMinutes();
  const second = dateTime.getSeconds();
  return \`\${year}-\${addZero(month)}-\${addZero(date)} \${addZero(hour)}:\${addZero(minute)}:\${addZero(second)}\`;
}


/**
 * 计算距离当前时间的时间差
 * @param diff 时间差
 * @param obj
 */
export function timeDistance(diff = 0, obj = {
  day: 0,
  hours: 0,
  minute: 0,
  second: 0,
}) {
  if (diff < 60) {
    obj.second = diff;
  } else if (diff < 3600) {
    const num = 60;
    const month = Math.floor(diff / num);
    const remain = diff - num * month;
    obj.minute = month
    if (remain > 0) timeDistance(remain, obj);
  } else if (diff < 3600 * 24) {
    const num = 3600;
    const hours = Math.floor(diff / num);
    const remain = diff - num * hours;
    obj.hours = hours
    if (remain > 0) timeDistance(remain, obj);
  } else {
    const num = 3600 * 24;
    const day = Math.floor(diff / num);
    const remain = diff - num * day;
    obj.day = day;
    if (remain > 0) timeDistance(remain, obj);
  }
  return obj;
}

/**
 * 获取当天 0 点的时间戳
 * @param t
 */
export function getNowDayZeroTimestamp(t = new Date()) {
  return new Date(t.toDateString()).getTime();
}
`,Xe=`\r
/**\r
 * 创建自定义元素\r
 * @param name \r
 * @param content \r
 */\r
export function createTemplate(name: string, content: string | HTMLElement) {\r
  class Template extends HTMLElement {\r
    constructor() {\r
      super();\r
      const shadowRoot = this.attachShadow({ mode: 'open' });\r
      const template = document.createElement('template');\r
      if (typeof content === 'string') {\r
        template.innerHTML = content;\r
        shadowRoot.appendChild(template.content.cloneNode(true));\r
      } else {\r
        template.appendChild(content);\r
        for (const node of template.childNodes) {\r
          shadowRoot.appendChild(node);\r
        }\r
      }\r
    }\r
  }\r
  customElements.define(name, Template);\r
}\r
// createTemplate('my-component', \`<div>\r
//   <h2>hello</h2>\r
//   <slot></slot>\r
// </div>\`)\r
\r
/**\r
 * 检查当前是否有元素处于焦点中\r
 * @param el \r
 * @returns \r
 */\r
export function elementIsInFocus(el: HTMLElement) {\r
  return el === document.activeElement;\r
}\r
\r
/**\r
 * 节点转字符串\r
 * @param node \r
 */\r
export function nodeToString(node: Node) {\r
  var tmpNode = document.createElement('div');\r
  tmpNode.appendChild(node.cloneNode(true));\r
  var str = tmpNode.innerHTML;\r
  tmpNode = node = null;\r
  return str;\r
}\r
\r
/**\r
 * 查看第 n 层父元素节点\r
 * @param el \r
 * @param n （不可为负值）\r
 */\r
export function lookupParent(el: HTMLElement, n: number) {\r
  while (el && n) {\r
    el = el.parentElement;  // IE 父元素节点选择\r
    n--;\r
  }\r
  return el;\r
}\r
\r
/**\r
 * 返回元素的第 n 个兄弟元素节点\r
 * @param el \r
 * @param n 正返回后面的兄弟元素节点，n为负返回前面的，n为0返回自己\r
 */\r
export function retSibling(el: any, n: number) {\r
  while (el && n) {\r
    if (n > 0) {\r
      if (el.nextElementSibling) {\r
        el = el.nextElementSibling;\r
      } else {\r
        for (el.nextSibling; el && el.nextSibling != 1; el = el.nextSibling);\r
      }  // 解决IE兼容性问题\r
      n--;\r
    } else {\r
      if (el.previousElementSibling) {\r
        el = el.previousElementSibling;\r
      } else {\r
        for (el.previousSibling; el && el.previousSibling != 1; el = el.previousSibling);\r
      }\r
      n++;\r
    }\r
  }\r
  return el;\r
}\r
\r
/**\r
 * 获取元素样式属性\r
 * @param {*} el \r
 * @param {string} prop CSS属性\r
 */\r
export const getStyle = (el: HTMLElement, prop: string) => {\r
  if (window.getComputedStyle) {\r
    return window.getComputedStyle(el, null)[prop];\r
  } else {\r
    return el.style[prop];\r
  }\r
}\r
\r
/**\r
 * 阻止事件冒泡\r
 * @param {*} e 源事件中也需要传参\r
 */\r
export function stopBubble(e: Event) {\r
  e = e || window.event;\r
  if (e.stopPropagation) {\r
    e.stopPropagation();\r
  } else {\r
    e.cancelBubble = true;\r
  }\r
}\r
\r
/**\r
 * 添加某个 class\r
 * @param el \r
 * @param className 自定义 class 属性\r
 */\r
export function addClass(el: HTMLElement, className: string) {\r
  if (hasClassName(el, className)) return;\r
  let newClass = el.className.split(' ');\r
  newClass.push(className);\r
  el.className = newClass.join(' ');\r
}\r
\r
/**\r
 * 移除某个 class\r
 * @param el \r
 * @param className 自定义 class 属性\r
 */\r
export function removeClass(el: HTMLElement, className: string) {\r
  if (!hasClassName(el, className)) return;\r
  let reg = new RegExp('(^|\\\\s)' + className + '(\\\\s|$)', 'g');\r
  el.className = el.className.replace(reg, ' ');\r
}\r
\r
/**\r
 * 是否包含某个 class\r
 * @param el \r
 * @param className \r
 */\r
export function hasClassName(el: HTMLElement, className: string) {\r
  const reg = new RegExp('(^|\\\\s)' + className + '(\\\\s|$)');\r
  return reg.test(el.className);\r
}\r
\r
/**\r
 * 阻止默认事件\r
 * @param event \r
 */\r
export function cancelHandler(e: Event) {\r
  e = e || window.event;\r
  if (e.preventDefault) {\r
    e.preventDefault();\r
  } else {\r
    e.returnValue = false;\r
  }\r
}\r
\r
/**\r
 * 鼠标拖拽\r
 * @param ele 所拖拽的元素\r
 * @param limit 限制移动范围的元素（为空时，不限制移动范围）\r
 */\r
export function mouseDrag(ele: HTMLElement, limit: any) {\r
\r
  // 鼠标按下\r
  ele.addEventListener('mousedown', function (e) {\r
    // 距离初始位置左顶点的距离 = 鼠标按下的坐标 - 元素的坐标\r
    var disX = e.clientX - ele.offsetLeft,\r
      disY = e.clientY - ele.offsetTop;\r
\r
    window.addEventListener('mousemove', mouseMove, false)\r
\r
    window.addEventListener('mouseup', () => {\r
      window.removeEventListener('mousemove', mouseMove, false)\r
    }, false)\r
\r
    function mouseMove(e) {\r
      // 定义元素的中心点 = 鼠标按下的坐标点 - 距离左顶点的距离\r
      ele.style.left = e.clientX - disX + 'px';\r
      ele.style.top = e.clientY - disY + 'px';\r
\r
      if (limit === undefined) {\r
        return;\r
      } else {\r
        // 约束范围\r
        if (parseFloat(ele.style.top) < limit.offsetTop) {\r
          ele.style.top = limit.offsetTop + 'px';\r
        }\r
        if (parseFloat(ele.style.left) < limit.offsetLeft) {\r
          ele.style.left = limit.offsetLeft + 'px';\r
        }\r
        if (parseFloat(ele.style.left + ele.clientWidth) > limit.offsetLeft + limit.clientWidth - parseFloat(ele.clientWidth+'')) {\r
          ele.style.left = limit.offsetLeft + limit.clientWidth - parseFloat(ele.clientWidth+'') + 'px';\r
        }\r
        if (parseFloat(ele.style.top + ele.clientHeight) > limit.offsetTop + limit.clientHeight - parseFloat(ele.clientHeight+'')) {\r
          ele.style.top = limit.offsetTop + limit.clientHeight - parseFloat(ele.clientHeight+'') + 'px';\r
        }\r
      }\r
    }\r
  }, false)\r
}`,Ge=`/**
 * 十六进制 转 base64
 * @param hex 
 * @returns 
 */
export function hexToBase64(hex: string) {
  // 将十六进制字符串转换为字节数组
  const bytes = new Uint8Array(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
  
  // 将字节数组转换为字符串
  let binaryString = '';
  for (let byte of bytes) {
    binaryString += String.fromCharCode(byte);
  }

  // 使用 btoa 将字符串转换为 Base64
  return btoa(binaryString);
}

/**
 * base64 转 十六进制 
 * @param base64 
 * @returns 
 */
export function base64ToHex(base64: string) {
  // 去除Base64字符串中的URL安全字符（去掉可能出现的等号）
  const base64WithoutPadding = base64.replace(/=/g, '');

  // 解码Base64字符串为字节数组
  const decoded = atob(base64WithoutPadding);
  const bytes = new Uint8Array(decoded.length);
  for (let i = 0; i < decoded.length; i++) {
    bytes[i] = decoded.charCodeAt(i);
  }

  // 将字节数组转换为十六进制字符串
  let hexString = '';
  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[i];
    const hex = byte.toString(16).padStart(2, '0'); // 每个字节转换为两位十六进制
    hexString += hex;
  }

  return hexString;
}

/**
 * buffer 转 base64
 * @param buffer 
 * @returns 
 */
export function bufferToBase64(buffer: ArrayBuffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  for (var len = bytes.byteLength, i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * File 转 base64
 * @param {*} file 
 * @returns 
 */
export function fileToBase64(file: File) {
  const render = new FileReader();
  return new Promise((resovle, reject) => {
    render.readAsDataURL(file);
    render.addEventListener('load', e => {
      resovle(e.target.result);
    })
  })
}

/**
 * base64 转 File
 * @param {*} base64 
 * @param {*} fileName 
 * @param {*} fileType 
 * @returns 
 */
export function base64toFile(base64: string, fileName = 'filename', fileType = 'image/jpg') {
  var arr = base64.split(','),
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: fileType });
}


/**
 * base64 转 url
 * @param {*} base64String
 * @returns
 */
export function base64ToUrl(base64String: string) {
  const binaryData = atob(base64String);

  // 创建一个Uint8Array来存储二进制数据
  const uint8Array = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }

  const blob = new Blob([uint8Array]);
  return URL.createObjectURL(blob);
}
`,Qe=`import { execWorkerCode } from "./browser";

/**
 * blob 转 file
 * @param blob 
 * @param fileName 
 * @returns 
 */
export function blobToFile(blob: Blob, fileName: string) {
  return new Promise<File>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const file = new File([arrayBuffer], fileName);
      resolve(file);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });
}

/**
 * 文件转url
 * @param file 
 * @returns 
 */
export function fileToUrl(file: File | Blob) {
  return URL.createObjectURL(file);
}

/**
 * 下载文件
 * @param url 文件地址
 * @param fileName 
 */
export function fileDownload(url: string, fileName: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  a.remove();
}

/**
 * 文件分片
 * @param file 
 * @param chunkSize 
 * @returns 
 */
export function fileFragment(file: File, chunkSize = 1024*1024*5) {
  type Item = { start: number, end: number, index: number, blob: Blob };
  return new Promise<Item[]>(async resovle => {
    const total = Math.ceil(file.size / chunkSize);  // 总共分片数

    const code = \`
function createChunk(file, index, chunkSize) {
  return new Promise(resovle => {
    const start = index * chunkSize;
    const end = start + chunkSize;
    const fileReader = new FileReader();
    const blob = file.slice(start, end);
    fileReader.onload = (e) => {
      resovle({ start, end, index, blob });
    }
    fileReader.readAsArrayBuffer(blob);
  })
}

onmessage = async (e) => {
  const { file, chunkSize, start, end } = e.data;
  const paoms = [];
  for (let i = start; i < end; i++) {
    const chunk = createChunk(file, i, chunkSize);
    paoms.push(chunk);
  }
  const chunks = await Promise.all(paoms);
  postMessage(chunks);
}
\`;

    const worker = execWorkerCode(code);
    worker.postMessage({ file, chunkSize, start: 0, end: total });
    worker.onmessage = (e) => {
      worker.terminate();
      resovle(e.data);
    }
  })
}
`,Ze=`
/**
 * 数字生成器
 */
export function* createNum(n = 0) {
  while (true) {
    yield n;
    n++;
  }
}
// const iter = createNum(); iter.next().value;

/**
 * 依次获取版本号值
 * @param str 版本号
 */
export function* walkVersion(str: string) {
  const terminals = ['.', '-'];
  let part = '';
  for (let i = 0; i < str.length; i++) {
    const value = str[i];
    if (terminals.includes(value)) {
      yield part;
      part = '';
    } else {
      part += value;
    }
  }
  if (part) yield part;
}
// const iter = walkVersion('1.0.0');
// iter.next().value;  //--> 1

/**
 * 依次获取数组每一项
 * @param arr 
 */
export function* walkArray<T>(arr: T[]) {
  for (const item of arr) {
    yield item;
  }
}

/**
 * 依次获取对象每一项
 * @param obj 
 */
export function* walkObject<T extends object>(obj: T) {
  for (const key in obj) {
    yield { key, value: obj[key]};
  }
}
`,Je=`import { execWorkerCode } from "./browser"

type ImageCompressOption = {
  ratio?:     number
  sizeLimit?: {
    width?:   number
    height?:  number
  }
  rigid?:     boolean
}

/**
 * 图片压缩
 * @param base64 
 * @param option 
 * @returns 
 */
export async function imageCompress(base64: string, option: ImageCompressOption = {}) {
  const format = base64.match(/image\\/.+;/)[0].slice(6, -1).toLocaleLowerCase();
  option = Object.assign({
    ratio: .8,  // 压缩比例
    sizeLimit: {  // 大小限制
      width: 800,
      height: 800,
    },
    rigid: true,  // 是否进行硬性压缩
  }, option);

  const image = new Image();
  image.src = base64;

  return new Promise((resovle, reject) => {
    image.addEventListener('load', async e => {
      const { naturalWidth, naturalHeight } = image;
      let maxW = 0, maxH = 0;
      let radio = 0;
      const { sizeLimit } = option;

      if (sizeLimit) {
        maxW = sizeLimit.width;
        maxH = sizeLimit.height;

        // 宽比高长
        if (naturalWidth > naturalHeight) {
          if (naturalWidth > maxW) {  // 宽超出
            radio = naturalWidth / maxW;
            maxH = naturalHeight / radio;
          } else {
            radio = naturalHeight / maxH;
            maxW = naturalWidth / radio;
          }
        }

        // 高比宽长
        if (naturalHeight > naturalWidth) {
          if (naturalHeight > maxH) {  // 高超出
            radio = naturalHeight / maxH;
            maxW = naturalWidth / radio;
          } else {
            radio = naturalWidth / maxW;
            maxH = naturalHeight / radio;
          }
        }

        // 高 && 宽都未超出
        if (naturalWidth < maxW && naturalHeight < maxH) {
          maxW = naturalWidth;
          maxH = naturalHeight;
        }

      } else {
        maxW = naturalWidth;
        maxH = naturalHeight;
      }

      // 创建 canvas
      const canvas = document.createElement('canvas');
      canvas.width = maxW;
      canvas.height = maxH;
      canvas.style.visibility = 'hidden';
      document.body.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, maxW, maxH);
      ctx.drawImage(image, 0, 0, maxW, maxH);

      // 压缩
      const newBase64 = canvas.toDataURL(\`image/\${format}\`, option.ratio);

      // 返回最小的 base64
      const minBase64 = base64.length > newBase64.length ? newBase64 : base64;
      canvas.remove();
      console.log(base64.length, newBase64.length)

      // png 属于无损压缩，所以只能在尺寸上做手脚
      // if (option.rigid && ['png', 'gif'].includes(format)) {
      //   const newBase642 = await imageRigidCompress(minBase64, option.ratio);
      //   console.log(newBase64.length, newBase642.length)
      //   return resovle(newBase642);
      // }

      return resovle(minBase64);

    })
  })
}

/**
 * 硬性压缩图片（缩小尺寸）
 * @param {*} base64 
 * @param {*} ratio 压缩比例
 * @returns 
 */
async function imageRigidCompress(base64: string, ratio: number) {
  const format = base64.match(/image\\/.+;/)[0].slice(6, -1).toLocaleLowerCase();
  const image = new Image();
  image.src = base64;

  return new Promise((resovle, reject) => {
    image.addEventListener('load', () => {
      const { naturalWidth, naturalHeight } = image;
      const canvas = document.createElement('canvas');
      const width = naturalWidth * ratio;
      const height = naturalHeight * ratio;
      canvas.width = width;
      canvas.height = height;
      canvas.style.visibility = 'hidden';
      document.body.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(image, 0, 0, width, height);
      const newBase64 = canvas.toDataURL(\`image/\${format}\`);

      return resovle(newBase64);
    })
  })
}
`,en=`
type Type = 'String'    | 'Number'  | 'Boolean' |
            'Symbol'    | 'Bigint'  |
            'Undefined' | 'Null'    |
            'RegExp'    | 'Date'    |
            'Array'     | 'Object'  |
            'Function'  | 'Promise' |
            'Set'       | 'Map'     |
            'WeakSet'   | 'WeakMap' | 'WeakRef' |
            'Error'
/**
 * 判断数据是什么类型
 * @param o 
 * @returns 
 */
export function isType(o: any): Type {
  return Object.prototype.toString.call(o).slice(8, -1);
}

/**
 * 判断该函数是否标记了 async
 * @param func 一个普通函数或 async 函数
 * @returns 
 */
export function isAsync(func: Function): boolean {
  return func[Symbol.toStringTag] === 'AsyncFunction';
}

/**
 * 是否属于一个 Promise 对象
 * @param result 
 * @returns 
 */
export function isPromise(result: any): boolean {
  return typeof result === 'object' && result[Symbol.toStringTag] === 'Promise';
}

/**
 * 是否属于一个 PromiseLike
 * @param value 
 * @returns 
 */
export function isPromiseLike(value: any) {
  return (typeof value === 'object' || typeof value === 'function') && typeof value.then === 'function';
}

/**
 * 判断数据有没有发生变化
 * @param x 
 * @param y 
 * @returns 
 */
export function isChange(x: any, y: any) {
  if (x === y) {
    return x === 0 && 1 / x !== 1 / y;
  } else {
    return x === x || y === y;
  }
}

/**
 * 判断两个值是否相等
 * @param val1 
 * @param val2 
 * @returns 
 */
export function isEquals(val1: any, val2: any) {
  if (typeof val1 === 'object' && typeof val2 === 'object') {
    const keys1 = Object.keys(val1), keys2 = Object.keys(val2);
    if (keys1.length !== keys2.length) return false;
    for (const key of keys1) {
      if (!keys2.includes(key)) return false;
      return isEquals(val1[key], val2[key]);
    }
    return true;
  } else {
    return val1 === val2;
  }
}
`,nn=`
/**
 * 判断数字是否是一个基数
 * @param num 
 * @returns 
 */
export function isOdd(num: number) {
  // -3 / 2 = -1.5
  return num % 2 === 1 || num === -1;
}
// isOdd(-3);   //--> true
// isOdd(2.3);  //--> false

/**
 * 判断一个数是否为偶数
 * @param num
 * @returns
 */
export function isEven(num: number) {
  const c = num / 2;
  return c / Math.floor(c) === 1 || c === 0;
}
// isEven(-2);  //--> true
// isEven(2.4); //--> false

/**
 * 求模
 * @param x 
 * @param y 
 * @returns 
 */
export function mod(x: number, y: number) {
  // 在取余运算中，余数的符号和x（被除数）相同
  // 在取余运算中，余数的符号和x（除数）相同
  x = Math.abs(x);
  const c = Math.floor(x / Math.abs(y));
  const m = x - c * Math.abs(y);
  return y >= 0 ? m : -m;
}

/**
 * 判断 x 是否是 2 的 n 次方
 * @param x 
 * @returns 
 */
export function isPowerOf2(x: number) {
  if (x <= 0) return false;
  return (x & (x - 1)) === 0;
}
// isPowerOf2(8);  //--> true

/**
 * 计算两个点的角度
 * @param x1 
 * @param y1 
 * @param x2 
 * @param y2 
 * @returns 
 */
export function calculateAngle(x1: number, y1: number, x2: number, y2: number) {
  // 计算向量的dx和dy，即两点之间的横纵坐标差
  const dx = x1 - x2;
  const dy = y1 - y2;
  const radian = Math.atan2(dy, dx);
  return radian * (180 / Math.PI); 
}
// calculateAngle(0, 0, 1, 1);  //--> -135

/**
 * 计算两点之间的距离
 * @param x1 
 * @param y1 
 * @param x2 
 * @param y2 
 * @returns 
 */
export function count2Spotlength(x1: number, y1: number, x2: number, y2: number) {
  return Math.hypot(x2 - x1, y2 - y1);
}
// count2Spotlength(0, 0, 1, 1);  //--> 1.4142135623730951

/**
 * 计算一个点的角度（坐标轴中心：(0,0)）
 * @param x 基于象限的 x 坐标
 * @param y 基于象限的 y 坐标
 * @returns
 */
export function pointDegree(x: number, y: number) {
  if (y <= 0) {
    return Math.abs(Math.atan2(y, x) * 180 / Math.PI);
  } else {
    return Math.abs(Math.atan2(y, -x) * 180 / Math.PI) + 180;
  }
}
// pointDegree(0, 1);  //--> 270

/**
 * 计算元素中的一个点的角度（坐标轴中心即元素中心）
 * @param width  元素宽度（px） 
 * @param height 元素高度（px）
 * @param x      offsetX
 * @param y      offsetY
 * @returns
 */
export function elPointDegree(width: number, height: number, x: number, y: number) {
  return pointDegree(x - width / 2, y - height / 2);
}
// elPointDegree(100, 100, 50, 50);  //--> 0


type Point = [number, number]
/**
 * 计算三次贝塞尔曲线的控制点
 * @param points 点数据
 * @returns Array<[x1, y1, x2, y2]> 四个控制点
 */
export function computeControlPoint(points: Point[], smooth = .4) {
  if (points.length < 2) return [];
  const p1 = points[0];
  const p2 = points[1];

  const collect: [number, number, number, number][] = [];
  const [s1x, s2x] = getMiddlePoint(p1[0], p2[0]);
  const [s1y, s2y] = getMiddlePoint(p1[1], p2[1]);
  collect.push([s1x, s1y, s2x, s2y]);

  if (points.length === 2) {
    return collect;
  }

  let prev = points[1];
  let poor = prev[1] - points[0][1];
  for (let i = 2; i < points.length; i++) {
    const next = points[i];
    const [s1x, s2x] = getMiddlePoint(prev[0], next[0]);
    const [s1y, s2y] = getMiddlePoint(prev[1], next[1]);
    collect.push([s1x, s1y, s2x, s2y]);

    if (next[1] - prev[1] !== poor) {
      collect[i - 2][3] = prev[1];

      if (next[1] > prev[1]) {
        collect[i - 1][1] = prev[1];
      } else {
        collect[i - 1][1] = prev[1];
      }

      const angle = calculateAngle(...prev, ...next);
      const newSmooth = (180 - Math.abs(angle)) * smooth;
      collect[i - 2][2] = Math.ceil(collect[i - 2][2] - newSmooth);
      collect[i - 1][0] = Math.ceil(collect[i - 1][0] + newSmooth);
    }

    poor = next[1] - prev[1];
    prev = points[i];
  }

  return collect;
}

/**
 * 获取中间点
 * @param m1 
 * @param m2 
 * @returns 
 */
function getMiddlePoint(m1: number, m2: number) {
  const x1 = (m2 - m1) / 4;
  const x2 = x1 * 3;
  return [x1 + m1, x2 + m1];
}
// getMiddlePoint(0, 100);  //-> [25, 75]

type Option = {
  fontSize?: number
  gap?:      number
  last?:     boolean
}
/**
 * 过滤掉超出文本
 * @param arr 
 * @param width 
 * @returns 
 */
export function filterExceed(arr: string[], width: number, option: Option = {}) {
  const config: Option = {
    fontSize: 12,
    gap:      30,
    ...option,
  }
  const collect = [];
  for (let i = 0; i < arr.length; i++) {
    const str = arr[i];
    collect.push(str.length * config.fontSize);
  }
  const min = Math.min(...collect) + config.gap;

  if (min * arr.length > width) {
    const result = [];
    const count = Math.floor(min * arr.length / width);
    for (let i = 0; i < arr.length; i++) {
      result.push(i % count === 0 ? arr[i] : '');
    }
    if (option.last) {
      const last = result.findLastIndex(item => item !== '');
      if (arr.length - last < count) {
        result[last] = '';
      }
      result[result.length - 1] = arr[arr.length - 1];
    }
    return result;
  }

  return arr;
}

/**
 * 获取圆上的点
 * @param centerX 中心点 x
 * @param centerY 中心点 y
 * @param radius  半径
 * @param number  个数
 * @returns 
 */
export function getCirclePoints(centerX: number, centerY: number, radius: number, number: number) {
  const points: [number, number][] = [];
  const angleIncrement = (2 * Math.PI) / number;

  for (let i = 0; i < number; i++) {
    const angle = i * angleIncrement;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push([x, y]);
  }

  return points;
}
// getCirclePoints(0, 0, 20, 3);


/**
 * 是否为圆内的点
 * @param x 
 * @param y 
 * @param centerX 
 * @param centerY 
 * @param radius 
 * @returns 
 */
export function isPointInCircle(x: number, y: number, centerX: number, centerY: number, radius: number) {
  const distance = Math.sqrt(Math.pow((x - centerX), 2) + Math.pow((y - centerY), 2));
  return distance <= radius;
}
// isPointInCircle(10, 10, 0, 0, 20);  //--> true


/**
 * 是否在闭合图形内
 * @param x 
 * @param y 
 * @param polygon 
 * @returns 
 */
export function isPointInPolygon(x: number, y: number, polygon: { x: number, y: number }[]) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x, yi = polygon[i].y;
    const xj = polygon[j].x, yj = polygon[j].y;
    const intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}
// const arr = [{ x: 0, y: 0 }, { x: 20, y: 0 }, { x: 20, y: 20 }, { x: 0, y: 20 }]
// isPointInPolygon(10, 10, arr);  //--> true

/**
 * 获取点所在的象限
 * @param x 
 * @param y 
 * @param centerX 
 * @param centerY 
 * @returns 
 */
export function getPointQuadrant(x: number, y: number, centerX: number, centerY: number) {
  if (x >= centerX && y >= centerY) return 1;
  if (x <= centerX && y >= centerY) return 2;
  if (x <= centerX && y <= centerY) return 3;
  if (x >= centerX && y <= centerY) return 4;
}
// getPointQuadrant(10, 10, 0, 0); //--> 1

/**
 * 得到多边形的中心点
 * @param polygon 
 * @returns 
 */
export function calculateCentroid(polygon: { x: number, y: number }[]) {
  let sumX = 0;
  let sumY = 0;
  const numVertices = polygon.length;

  for (let i = 0; i < numVertices; i++) {
      sumX += polygon[i].x;
      sumY += polygon[i].y;
  }

  const centerX = sumX / numVertices;
  const centerY = sumY / numVertices;

  return { x: centerX, y: centerY };
}
// const arr = [{ x: 0, y: 0 }, { x: 20, y: 0 }, { x: 20, y: 20 }, { x: 0, y: 20 }]
// calculateCentroid(arr);  //--> { x: 10, y: 10 }
`,rn=`/**\r
 * 生成随机数（只可取正整数）\r
 * @param max 最大值（取不到）\r
 * @param min 最小值\r
 */\r
export function randomNum(max: number, min: number = 0) {\r
  return ~~(Math.random() * (max - min) + min);\r
}\r
\r
/**\r
 * 截取两位小数并进行银行计数转换\r
 * @param num 一个数\r
 * @param fixed 保留几位小数\r
 * @returns\r
 */\r
export function toFixed2AndBankCount(num: string | number = '', fixed = 2) {\r
  const str = String(num);\r
  const reg = /(?=(\\B)(\\d{3})+$)/g;\r
  if (str.includes('.')) {\r
    const index = str.indexOf('.');\r
    const int = str.slice(0, index);  // 整数部分\r
    const float = str.slice(index, index + fixed + 1);  // 浮点数部分\r
    return int.replace(reg, ',') + float;\r
  } else {\r
    return str.replace(reg, ',');\r
  }\r
}\r
// toFixed2AndBankCount(1234);       //--> 1,234\r
// toFixed2AndBankCount(1234.5678);  //--> 1,234.56\r
\r
/**\r
 * 小数转百分比\r
 * @param num \r
 * @param digit 保留小数位\r
 * @returns \r
 */\r
export function toPercentage(num: number, digit: number) {\r
  return Math.abs(num * 100).toFixed(digit) + '%';\r
}\r
// toPercentage(0.123456, 2);  //--> 12.35%\r
\r
/**\r
 * 反转整数\r
 * @param num 最大限制 9 位 + 1\r
 * @returns \r
 */\r
export function reverseInteger(num: number) {\r
  let result = 0;\r
  while (num !== 0) {\r
    result = result * 10 + num % 10;\r
    // Math.trunc() 方法会将数字的小数部分去掉，只保留整数部分\r
    num = Math.trunc(num / 10);\r
  }\r
\r
  if (result > 2 ** 31 || result < -(2 ** 31)) return 0;\r
  return result;\r
}\r
// reverseInteger(123);  //--> 321\r
\r
/**\r
 * 计算字节大小\r
 * @param {*} num\r
 * @param {*} utils\r
 * @returns\r
 */\r
export function calculateByte(num = 0, utils = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB', 'NB', 'DB', 'CB', 'EB', 'ZB', 'YB', 'BB']) {\r
  const len = utils.length;\r
  let str = '';\r
  if (num < 1024) str = num + utils[0];\r
  for (let i = 1; i < len; i++) {\r
    if (num > 1024 ** i) str = Math.ceil(num / (1024 ** i)) + utils[i];\r
  }\r
  return str;\r
}\r
// calculateByte(1024 * 3);  //--> 3KB\r
\r
/**\r
 * 整数转英文单词\r
 * @param num \r
 * @returns \r
 */\r
export function numberToWords(num: number) {\r
  function toHundreds(num: number) {\r
    const numbers = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",\r
      "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];\r
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];\r
    const result = Array(3).fill("");\r
    let a = Math.trunc(num / 100), b = num % 100, c = num % 10;\r
    result[0] = a > 0 && \`\${numbers[a]} Hundred\`;\r
    result[1] = b < 20 ? numbers[b] : tens[Math.trunc(b / 10)]\r
    result[2] = b >= 20 && \`\${numbers[c]}\`;\r
    return result.filter(Boolean).join(" ");\r
  }\r
\r
  let result = toHundreds(num % 1000);\r
  const bigNumbers = ["Thousand", "Million", "Billion"];\r
  for (let i = 0; i < 3; ++i) {\r
    num = Math.trunc(num / 1000);\r
    result = num % 1000 !== 0 ? [toHundreds(num % 1000), bigNumbers[i], result].filter(Boolean).join(" ") : result;\r
  }\r
  return result.length === 0 ? "Zero" : result;\r
}\r
// numberToWords(1004);  //--> One Thousand Four\r
\r
\r
type ChangeAnimationOptions = {\r
  from: number,\r
  to: number,\r
  duration: number,\r
  onProgress: (v: number) => void\r
}\r
/**\r
 * 数字变化动画\r
 * @param param0 \r
 */\r
export function changeAnimation({ from, to, duration, onProgress }: ChangeAnimationOptions) {\r
  let v = from;\r
  const start = Date.now();\r
  const steed = (to - from) / duration;\r
  // 让 v 变化一点\r
  function _run() {\r
    const t = Date.now() - start;\r
    if (t >= duration) {\r
      v = to;\r
      onProgress(v);\r
      return;\r
    }\r
    v = from + steed * t;\r
    onProgress(v);\r
    requestAnimationFrame(_run);\r
  }\r
  _run();\r
}\r
// changeAnimation({\r
//   from: 0,\r
//   to: 985,\r
//   duration: 1000,\r
//   onProgress: (v) => console.log(v),\r
// });\r
\r
/**\r
 * 分页索引计算\r
 * @param pageNumber \r
 * @param pageSize \r
 * @param index \r
 * @returns \r
 */\r
export function pagingIndex(pageNumber: number, pageSize: number, index: number) {\r
  return (pageNumber - 1) * pageSize + index + 1;\r
}\r
\r
/**\r
 * 数据分页\r
 * @param arr \r
 * @param pageNumber \r
 * @param pageSize \r
 * @returns \r
 */\r
export function pagingData<I>(arr: I[], pageNumber: number, pageSize: number) {\r
  return arr.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);\r
}\r
\r
/**\r
 * 分页计算\r
 * @param option \r
 * @returns \r
 */\r
export function pagingCompute(option: {\r
  total:     number  // 总条数\r
  size?:     number  // 每页条数\r
  current?:  number  // 当前页码\r
  blockNum?: number  // 中间部分需要的页码数量\r
  neat?:     boolean // 是否需要补齐\r
}) {\r
  const { total, current, size, blockNum, neat } = Object.assign({\r
    size:     10,\r
    current:  1,\r
    blockNum: 5,\r
    neat:     true,\r
  }, option);\r
  const maxCurrent = Math.ceil(total / size) - Math.floor(blockNum / 2);\r
  const newBlockNum = Math.min(blockNum, Math.ceil(total / size));\r
\r
  let middenStart = Math.max(1, Math.min(maxCurrent, current) - Math.floor(blockNum / 2));\r
  // const pageEnd = Math.min(pages, pageStart + blockNum - 1);\r
  if (neat) {\r
    middenStart = Math.max(middenStart, 2);\r
    middenStart = Math.min(middenStart, maxCurrent - newBlockNum + 2);\r
  }\r
\r
  const midden = new Array(newBlockNum).fill(0).map((_, i) => middenStart + i);\r
  const pages = Math.ceil(total / size);\r
  let start: number, end: number;\r
  if (middenStart > 1) {\r
    start = 1;\r
  }\r
  if (midden[midden.length - 1] < pages) {\r
    end = pages;\r
  }\r
\r
  return {\r
    start,\r
    midden,\r
    end,\r
    current: Math.min(current, pages),\r
  }\r
}\r
// pagingCompute({\r
//   total: 100,\r
//   current: 11,\r
//   neat: false,\r
// })  //--> {start: 1, midden: [6, 7, 8, 9, 10], end: undefined, current: 10}\r
\r
/**\r
 * 索引取正\r
 * @param total \r
 * @param index \r
 * @returns \r
 */\r
export function indexCorrect(total: number, index = 0) {\r
  if (index >= 0) return index;\r
  return total + index;\r
}`,tn=`import { isType } from "./judge";\r
import { AnyObj, BanType } from "./type";\r
\r
/**\r
 * 删除对象中的空值\r
 * @param obj\r
 * @param option 过滤哪些值\r
 */\r
export function deleteEmpty(obj: AnyObj, option = [null, undefined, '']) {\r
  const newObj = {}\r
  for (const prop in obj) {\r
    if (!option.includes(obj[prop])) {\r
      newObj[prop] = obj[prop];\r
    }\r
  }\r
  return newObj;\r
}\r
// deleteEmpty({ a: 1, b: null, c: '', d: undefined });  //--> {a: 1}\r
\r
/**\r
 * 深度克隆\r
 * @param origin 被克隆对象\r
 */\r
export function deepClone<T>(origin: T) {\r
  const cache = new WeakMap();\r
  const noCloneTypes = ['null', 'weakset', 'weakmap'];\r
\r
  const specialClone = {\r
    set(set: Set<any>) {\r
      const collect = new Set();\r
      for (const value of set) {\r
        collect.add(_deepClone(value));\r
      }\r
      return collect;\r
    },\r
    map(map: Map<any, any>) {\r
      const collect = new Map();\r
      for (const [key, val] of map.entries()) {\r
        collect.set(key, _deepClone(val));\r
      }\r
      return collect;\r
    },\r
  }\r
\r
  function _deepClone<T>(origin: T) {\r
    const type = isType(origin);\r
    if (typeof origin !== 'object' || noCloneTypes.includes(type)) {\r
      return origin;\r
    }\r
\r
    // 防止环形引用问题（已经克隆过的对象不再进行克隆）\r
    if (cache.has(origin)) {\r
      return cache.get(origin);\r
    }\r
\r
    // 特殊类型克隆处理\r
    if (specialClone[type]) {\r
      return specialClone[type](origin);\r
    }\r
\r
    // 创建一个新的对象\r
    const target: AnyObj = Array.isArray(origin) ? [] : {};\r
    Object.setPrototypeOf(target, Object.getPrototypeOf(origin));\r
\r
    // 设置缓存，该对象已经被克隆过\r
    cache.set(origin, target);\r
\r
    for (const key in origin) {\r
      target[key] = _deepClone(origin[key]);\r
    }\r
    return target as T;\r
  }\r
\r
  return _deepClone(origin);\r
}\r
\r
/**\r
 * 深度克隆（异步）\r
 * @param target \r
 * @returns \r
 */\r
export function deepClone2<T>(target: T): Promise<T> {\r
  return new Promise(resolve => {\r
    const { port1, port2 } = new MessageChannel();\r
    port1.postMessage(target);\r
    port2.onmessage = msg => {\r
      resolve(msg.data);\r
    }\r
  })\r
}\r
\r
/**\r
 * 扁平化对象\r
 * @param obj\r
 * @param prefix  无需传递\r
 * @param collect 无需传递\r
 * @returns \r
 */\r
export function flatObject(obj: object, prefix = '', collect: Record<string, BanType<any, object | any[]>> = {}) {\r
  for (const key in obj) {\r
    const value = obj[key];\r
    if (typeof value === 'object') {\r
      flatObject(value, prefix + '.' + key, collect);\r
    } else {\r
      const path = (prefix + '.' + key).replace(/\\./, '');\r
      collect[path] = value;\r
    }\r
  }\r
  return collect;\r
}\r
// flatObject({ a: { b: 1 } });  //--> {a.b: 1}\r
\r
/**\r
 * 获取对象的 value 值\r
 * @param obj 要查询的对象\r
 * @param name 对象的 key 值 “a.b”\r
 */\r
export function getValue(obj: any, name: string) {\r
  if (!obj) return;\r
  let nameList = name.split('.');\r
  let temp = obj;\r
  for (let i = 0; i < nameList.length; i++) {\r
    if (temp[nameList[i]]) {\r
      temp = temp[nameList[i]];\r
    } else {\r
      return void 0;\r
    }\r
  }\r
  return temp;\r
}\r
// getValue({a: 1, b: {c: 3}}, 'b.c')  //--> 3\r
\r
/**\r
 * 设置对象 value 值\r
 * @param obj  PS: {}\r
 * @param propPath 要改变的 key 值  PS: a 或 b.c\r
 * @param value 设置 value\r
 */\r
export function setNestedPropertyValue(obj: AnyObj, propPath: string | string[], value: any) {\r
  if (typeof propPath === 'string') {\r
    propPath = propPath.split('.');\r
  }\r
\r
  if (propPath.length > 1) {\r
    const prop = propPath.shift();\r
    obj[prop] = obj[prop] || {};\r
    setNestedPropertyValue(obj[prop], propPath, value);\r
  } else {\r
    obj[propPath[0]] = value;\r
  }\r
}\r
// const obj = {};\r
// setNestedPropertyValue(obj, 'a.b', 3)\r
// console.log(obj);  //--> {a: {b: 3}}\r
\r
/**\r
 * 创建一个可连续赋值的对象\r
 * @returns \r
 */\r
export function createAnyObject(target = {}) {\r
  let nowKey = '';\r
  return new Proxy(deepClone(target), {\r
    get(target, key, receiver) {\r
      if (typeof key !== 'string') {\r
        throw new TypeError('key 类型错误');\r
      }\r
      nowKey += '.' + key;\r
      setNestedPropertyValue(target, nowKey.slice(1), {});\r
      return receiver;\r
    },\r
    set(target, key, value, receiver) {\r
      if (typeof key !== 'string') {\r
        throw new TypeError('key 类型错误');\r
      }\r
      nowKey += '.' + key;\r
      setNestedPropertyValue(target, nowKey.slice(1), value);\r
      return receiver;\r
    }\r
  })\r
}\r
// const obj = createAnyObject();\r
// obj.a.b.c = 123\r
\r
/**\r
 * 优先考虑对象\r
 * @param target \r
 * @param source 通常用于设置默认值 \r
 * @returns \r
 */\r
export function priorityObject<T extends object, S extends object>(target: T, source: S): T & S {\r
  const p = new Proxy(target, {\r
    get(target, key) {\r
      const value = target[key];\r
      if (typeof value === 'object') {\r
        if (Array.isArray(target) && !source[key]) {\r
          return priorityObject(value, source[0]);\r
        }\r
        return priorityObject(value, source[key]);\r
      }\r
      if (value === void 0) {\r
        return source[key];\r
      }\r
      return value;\r
    }\r
  })\r
  return p as T & S;\r
}\r
// const config = priorityObject({ server: void 0 }, { server: { port: 8080 } });\r
// console.log(config.server.port);  // 8080\r
\r
\r
/**\r
 * 获取一个对象的字节大小\r
 * @param obj \r
 * @returns \r
 */\r
export function getLSUsedSpace(obj: object) {\r
\r
  function getSize(o: any) {\r
    if (typeof o === 'object' && o !== null) {\r
      let size = 0;\r
      for (const k in o) {\r
        const v = o[k];\r
        size += getSize(k) + getSize(v);\r
      }\r
      return size;\r
    }\r
    return o.toString().length;\r
  }\r
\r
  const symbolLen = Object.getOwnPropertySymbols(obj).reduce((total, key) => {\r
    return total += getSize(obj[key]);\r
  }, 0);\r
\r
  return getSize(obj) + symbolLen;\r
}\r
// const obj = { a: '111', [Symbol('b')]: '222' }\r
// getLSUsedSpace(obj);  //--> 7\r
`,on=`/**
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
`,an=`import { PromiseFn } from "./type";

type TaskItem = {
  task:    PromiseFn
  resolve: Function
  reject:  Function
}



export class ParallelTaskScheduling {
  _parallelCount: number  // 并行执行任务数
  _runingCount = 0;       // 执行任务计数
  tasks: TaskItem[] = [];

  /**
   * 并行任务调度
   * @param parallelCount 并行执行任务最大数
   */
  constructor(parallelCount = 5) {
    this._parallelCount = parallelCount;
  }

  /**
   * 添加一个任务
   * @param task 
   * @returns 
   */
  add(task: PromiseFn) {
    const promise = new Promise((resolve, reject) => {
      this.tasks.push({ task, resolve, reject });
    })
    this._run();
    return promise;
  }

  /**
   * 并行运行任务
   */
  _run() {
    while (this.tasks.length > this._runingCount && this._runingCount < this._parallelCount) {
      const { task, resolve, reject } = this.tasks[this._runingCount];
      this._runingCount ++;
      task()
        .then(res => resolve(res))
        .catch(err => reject(err))
        .finally(() => {
          this._continue();
        });
    }
  }

  /**
   * 继续执行下个任务
   */
  _continue() {
    this._parallelCount ++;  // 将并行执行数调大，保证能再次进入循环
    this._run();             // 执行完递归执行剩余任务
  }
}



export class ParallelTaskSchedulings extends ParallelTaskScheduling {
  _parallelCountList: number[];
  _parallelListIndex = 0;  // 并行执行任务数索引
  _executeCount = 0;       // 任务执行计数
  _isAwait: boolean;
  #originRun = null;

  /**
   * 并行任务调度（按指定的并行执行数执行）
   * @param parallelCountList 并行执行队列 LIST
   * @param isAwait true: 队列清空后再执行剩余任务  false: 队列有空间即执行剩余任务
   */
  constructor(parallelCountList: number[], isAwait = false) {
    parallelCountList.forEach((val, i, self) => {
      if (i === 0) return;
      self[i] = val + self[i - 1];
    })

    super();
    this._parallelCountList = parallelCountList;
    this._isAwait = isAwait;
    this.#originRun = this._run;
    this._run = () => {
      this._parallelCount = this._parallelCountList[this._parallelListIndex];
      this.#originRun();
    }
  }

  /**
   * 继续执行下个任务
   */
  _continue() {
    this._executeCount ++;
    if (this._isAwait) {  // 等待队列执行结束完
      if (this._executeCount === this._parallelCount) {
        this._parallelListIndex ++;
        this._run();
        return;
      }
    } else {  // 不等了，继续往下执行
      if (this._runingCount === this._parallelCount) {
        this._parallelListIndex ++;
        this._run();
      }
    }
    this._parallelCount ++;
    this._run();
  }
}



export class SerialTaskScheduling extends ParallelTaskScheduling {
  #isContinue: boolean

  /**
   * 串行任务调度
   * @param isContinue 在失败后继续执行下个任务
   */
  constructor(isContinue = true) {
    super();
    this._parallelCount = 1;
    this.#isContinue = isContinue;
  }

  _run() {
    while (this.tasks.length > this._runingCount && this._runingCount < this._parallelCount) {
      const { task, resolve, reject } = this.tasks[this._runingCount];
      this._runingCount ++;
      task()
        .then(res => {
          resolve(res);
          this._continue();
        })
        .catch(err => {
          reject(err);
          this.#isContinue && this._continue();
        })
    }
  }
}



export class PausingSerialTasks {

  readonly START_FAILURE = Symbol('startFailure');  // 任务队列被提前回收，启动失败
  readonly ILLEGAL_CALL  = Symbol('illegalCall');   // 非法调用，任务队列正在执行中
  readonly NOT_TASK      = Symbol('notTask');       // 没有任务可执行

  #isRuning  = false;  // 队列正在执行中
  #isExecute = false;  // 是否执行队列
  #tasks     = null;   // 任务队列
  #i         = 0;      // 执行队列下标

  /**
   * 可暂停的串行任务队列
   * 如果其中一个任务失败，返回失败结果，后续任务都不会执行
   * 在执行过程中或执行前可追加任务
   * 若在整个执行结束后追加了任务，请重新执行 start
   * @param tasks ...args 任务队列
   */
  constructor(...tasks: Array<PromiseFn>) {
    this.#tasks = tasks;
  }

  /**
   * 开始/继续 执行任务
   * @returns 暂停～开始～暂停/结束 的每项任务的返回结果
   */
  start = async () => {
    if (this.#isRuning) {
      console.warn('非法调用！任务队列正在执行中，无法重新执行');
      return Promise.reject(this.ILLEGAL_CALL);
    }

    // 超出执行队列长度
    if (this.#i > this.#tasks.length - 1) {
      console.warn('没有任务可以继续执行');
      return Promise.resolve(this.NOT_TASK);
    }

    this.#isRuning  = true;
    this.#isExecute = true;
    const promise   = await this.#execute();
    this.#isRuning  = false;
    return promise;
  }

  /**
   * 递归执行队列
   * @param results 收集返回值
   * @returns 
   */
  #execute = async (results = []) => {
    if (!this.#isExecute) return;
    const len = this.#tasks.length;
    if (this.#i === len - 1) this.#isExecute = false;  // 执行到最后一个任务，暂停任务

    const result = this.#tasks[this.#i]();
    this.#i ++;
    return await result.then(async res => {
      return await handleResult.call(this, res);
    }).catch(err => {
      this.#isExecute = false;
      return Promise.reject(err);
    });

    async function handleResult(res) {
      results.push(res);
      if (this.#tasks.length > len) {
        this.#isExecute = true;  // 发现中途有队列推送，继续递归执行
        return await this.#execute(results);
      }
      if (!this.#isExecute) {
        return Promise.resolve(results);
      } else {
        return await this.#execute(results);
      }
    }
  }

  /**
   * 暂停 任务执行
   * @returns 当前暂停的任务下标
   */
  pause = () => {
    this.#isExecute = false;
    return this.#i - 1;
  }

  /**
   * 追加任务
   * @param fn 
   */
  add = (fn: PromiseFn) => {
    this.#tasks && this.#tasks.push(fn);
  }

}
`,sn=`/**\r
 * 敏感信息加密\r
 * @param str   手机号，银行卡号之类的字符\r
 * @param start 开始加密索引\r
 * @param end   结束加密索引\r
 */\r
export function encrypt(str: string, start = 3, end = -4) {\r
  let password = '';\r
  const startNum = str.slice(0, start);\r
  const encryptLen = str.slice(start, end).length;\r
  const endNum = str.slice(end);\r
  for (let i = 0; i < encryptLen; i++) {\r
    password += '*';\r
  }\r
  return startNum + password + endNum;\r
}\r
// encrypt('1234567890', 3, -4);  //--> 123****7890\r
\r
\r
/**\r
 * 获取字符串码点长度\r
 * @param str \r
 * @returns \r
 */\r
export function pointLength(str: string) {\r
  let len = 0;\r
  for (let i = 0; i < str.length;) {\r
    len++;\r
    const point = str.codePointAt(i);\r
    i += point > 0xffff ? 2 : 1;\r
  }\r
  return len;\r
}\r
// pointLength('🤣');  //--> 1\r
// pointLength('🅰️');  //--> 2\r
\r
/**\r
 * 按码点获取字符串某一位\r
 * @param str \r
 * @param index \r
 * @returns \r
 */\r
export function pointAt(str: string, index: number) {\r
  let curIndex = 0;\r
  for (let i = 0; i < str.length;) {\r
    if (curIndex === index) {\r
      const point = str.codePointAt(i);\r
      return String.fromCodePoint(point);\r
    }\r
    curIndex++;\r
    const point = str.codePointAt(i);\r
    i += point > 0xffff ? 2 : 1;\r
  }\r
}\r
// pointAt('hello 🅰️ world', 6);  //--> 🅰\r
\r
/**\r
 * 按码点截取字符串\r
 * @param str \r
 * @param start \r
 * @param end \r
 * @returns \r
 */\r
export function pointSlice(str: string, start: number, end?: number) {\r
  end ??= pointLength(str);\r
  let result = '';\r
  const len = pointLength(str);\r
  for (let i = start; i < len && i < end; i++) {\r
    result += pointAt(str, i);\r
  }\r
  return result;\r
}\r
// pointSlice('hello 🅰️ world', 6, 10);  //--> 🅰️ w\r
\r
/**\r
 * 计算字符串字节长度\r
 * @param str 传入字符串\r
 */\r
export function strBytesLength(str: string) {\r
  let len = str.length, i = 0;\r
  while (i < len) {\r
    str.charCodeAt(i) > 255 && len++;  // .charCodeAt() 返回指定位置的字符的 Unicode 编码\r
    i++;\r
  }\r
  return len;\r
}\r
// strBytesLength('h');   //--> 1\r
// strBytesLength('哈');  //--> 2\r
// strBytesLength('🅰️');  //--> 6\r
\r
/**\r
 * 求一个字符串的 ascll 总和\r
 * @param str \r
 */\r
export function ascllSum(str: string) {\r
  const arr = str.split('');\r
  let num = 0;\r
  arr.forEach(val => {\r
    num += val.charCodeAt(0);\r
  })\r
  return num;\r
}\r
// ascllSum('hello world');  //--> 1116\r
\r
/**\r
 * 生成随机字符串\r
 * @param len \r
 * @returns \r
 */\r
export function randomString(len: number) {\r
  if (len <= 11) {\r
    return Math.random().toString(36).substring(2, 2 + len).padEnd(len, '0');\r
  } else {\r
    return randomString(11) + randomString(len - 11);\r
  }\r
}\r
\r
\r
/**\r
 * 检测密码强度（最强为 4 级）\r
 * @param str \r
 */\r
export function checkPasswordLevel(str: string) {\r
  var lv = 0;\r
  if (str.length < 6) return lv;\r
  /[0-9]/.test(str) && lv++;\r
  /[a-z]/.test(str) && lv++;\r
  /[A-Z]/.test(str) && lv++;\r
  /[\\.|-|_]/.test(str) && lv++;\r
  return lv;\r
}\r
// checkPasswordLevel('123456');  //--> 1\r
// checkPasswordLevel('abc123');  //--> 2\r
// checkPasswordLevel('Abc123');  //--> 3\r
// checkPasswordLevel('Abc12.');  //--> 4\r
\r
/**\r
 * 是否符合两位浮点数\r
 * @param str \r
 * @returns \r
 */\r
export function isFixed2Float(str: string) {\r
  const reg = /^(([1-9][0-9]*)|(([0]\\.\\d{1,2}|[1-9][0-9]*\\.\\d{1,2})))$/;\r
  return reg.test(str);\r
}\r
// isFixed2Float('1.1');  //--> true\r
\r
\r
/**\r
 * 生成重复字符串 (String.repeat)\r
 * @param str 传入字符串\r
 * @param n 重复次数\r
 */\r
export function repeatStr(str: string, n: number = 1) {\r
  let num = Math.abs(n), res = '';  // 防止传入负数，造成死循环\r
  while (num) {\r
    num % 2 === 1 && (res += str);\r
    num > 1 && (str += str);\r
\r
    num >>= 1;  // 左位移1位\r
  }\r
  return res;\r
}\r
// repeatStr('a', 3);  //--> 'aaa'\r
\r
/**\r
 * 版本号比较\r
 * @param v1 版本号1\r
 * @param v2 版本号2\r
 * @returns 如果版本号相等，返回 0, 如果第一个版本号低于第二个返回 -1，否则返回 1\r
 */\r
export function compareVersion(v1: string, v2: string) {\r
  if (!v1 && !v2) return 0;\r
  if (!v1) return -1;\r
  if (!v2) return 1;\r
  const v1Stack = v1.split('.');\r
  const v2Stack = v2.split('.');\r
  const maxLen = Math.max(v1Stack.length, v2Stack.length);\r
  for (let i = 0; i < maxLen; i++) {\r
    // 必须转整，否则按照字符顺序比较大小\r
    const prevVal = ~~v1Stack[i];\r
    const currVal = ~~v2Stack[i];\r
    if (prevVal > currVal) return 1;\r
    if (prevVal < currVal) return -1;\r
  }\r
  return 0;\r
}\r
// compareVersion('1.2.3', '1.2.3');  //--> 0\r
// compareVersion('1.2.3', '1.2.4');  //--> -1\r
// compareVersion('1.2.3', '1.2.2');  //--> 1\r
\r
/**\r
 * 获取最大版本号\r
 * @param versions \r
 * @returns \r
 */\r
export function getMaxVersion(versions: string[]) {\r
  return versions.sort(compareVersion).pop();\r
}\r
\r
/**\r
 * 金额大写转换\r
 * @param num 字符串类型数字\r
 * @returns \r
 */\r
export function digitUppercase(num: string = '') {\r
  if (num === '') return '';\r
  if (isNaN(Number(num))) return '无效金额字符';\r
  if (num.length > 80) return '金额过大';\r
\r
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];\r
  const minUnits = ['', '拾', '佰', '仟'];\r
  const maxUnits = ['', '万', '亿', '兆', '京', '垓', '杼', '穰', '沟', '涧', '正', '载', '极', '恒河沙', '阿僧祇', '那由它', '不可思议', '无量', '大数', '古戈尔'];\r
  const floatUnits = ['角', '分', '厘', '毫', '丝'];\r
  let money = '', small = '';\r
\r
  let int = '', float = '';\r
  if (/\\./.test(num)) {\r
    int = num.split('.')[0];  // 整数位\r
    float = num.split('.')[1].slice(0, 5);  // 浮点数位，只取前 5 位\r
\r
    // 处理小数部分\r
    Array(...float).forEach((val, index) => {\r
      if (val === '0') small += digit[val];\r
      else small += digit[val] + floatUnits[index];\r
    })\r
    small = small.replace(/零+/, '零');  // 替换 '零...'\r
    small = small.replace(/零$/, '');  // 去掉以 '零' 结尾字符\r
  } else {\r
    int = num;\r
  }\r
\r
  int = int.replace(/^0+/, '');  // 去掉以 '0...' 开头的数字\r
\r
  const reg = /(?=(\\B)(\\d{4})+$)/g;  // 每 4 位为一组，用 ',' 隔开\r
  const arr = int.replace(reg, ',').split(',');\r
  const len = arr.length;\r
  arr.forEach((item, i) => {\r
    let str = '';\r
\r
    if (/^0000$/.test(item)) return money;  // 都是 0 的情况下啥都不管\r
\r
    const length = item.length;\r
\r
    item = item.replace(/0+$/, '');  // 去除尾部0， 1200 -> 12\r
\r
    Array(...item).forEach((val, index) => {\r
      if (val === '0') str += digit[val];  // 为 0 时后面不加单位\r
      else str += digit[val] + minUnits[length - index - 1];\r
    })\r
    str = str.replace(/零+/, '零');  // '零零...' 替换为 '零'\r
\r
    money += str + maxUnits[len - i - 1];  // 把每一项加起来\r
    money ||= '零'\r
  })\r
\r
  if (small) {\r
    return money + '元' + small;\r
  } else {\r
    return money + '元整';\r
  }\r
}\r
// digitUppercase('1004.01'); //--> 壹仟零肆元零壹分\r
\r
/**\r
 * 评分\r
 * @param r \r
 * @returns \r
 */\r
export function rate(r: number) {\r
  return '1111100000'.slice(5 - r, 10 - r);\r
}\r
// rate(3) --> 11100\r
\r
/**\r
 * 生成随机id\r
 * @param length\r
 * @param chars\r
 */\r
export function uuid(length = 8, chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {\r
  let result = '';\r
  for (let i = length; i > 0; --i)\r
    result += chars[Math.floor(Math.random() * chars.length)];\r
  return result;\r
}\r
// uuid(32);\r
// crypto.randomUUID();\r
`,ln=`
/**
 * 不能是某种类型
*/
export type BanType<T, E> = T extends E ? never : T
// function fn<T>(a: BanType<T, Date>) {}


// export type GetOptional<T> = {
//   [K in keyof T as K extends Required<K> ? never : K]: T[K]
// }

/**
 * 排除对象中的某个 key
 */
export type ExcludeKey<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
// type A = { a: number, b: number, c: string }
// type B = ExcludeKey<A, 'a'>


/**
 * 将某些类型转为可选类型
*/
export type OptionalType<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
// type A = { a: number, b: number }
// type B = OptionalType<A, 'a'>


/**
 * 将可选属性转为必填属性
*/
export type RequiredType<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>
// type A = { a?: number, b?: number }
// type B = RequiredType<A, 'a'>


/**
 * 联合类型转交叉类型
*/
export type UnionToIntersection<T extends Record<string|symbol, any>> =
  (T extends any ? (x: T) => any : never) extends
  (x: infer R) => any ? R : never
// type A = { a: string } | { b: number }
// type B = UnionToIntersection<A>


/**
 * 任意类型对象
 */
export type AnyObj = Record<string|symbol, any>

/**
 * 比较宽泛的类
 */
export type WideClass = new (...args: any[]) => AnyObj

/**
 * 异步函数
 */
export type PromiseFn = (...args: any[]) => Promise<any>

/**
 * 得到 Promise 返回类型
 */
export type PromiseType<T> = T extends Promise<infer K> ? K : T
// type Pt = PromiseType<Promise<string>>

/**
 * 数组中每一项的类型
 */
export type ArrayType<T> = T extends (infer I)[] ? I : T
// type ItemType = ArrayType<[1, 'a']>


/**
 * 将类型改为可选（深度）
 */
export type OptionalDeep<T extends Record<string|symbol, any>> = {
  [K in keyof T]?: OptionalDeep<T[K]>
}
// type A = OptionalDeep<{ a: 1, b: { c: 2 } }>

/**
 * 将类型改为可写（深度）
 */
export type WritableDeep<T extends Record<string|symbol, any>> = {
  -readonly [K in keyof T]: WritableDeep<T[K]>
}
// type A = WritableDeep<{ a: 1 }>

/**
 * 类数组
 */
export type ClassArray = Iterable<unknown> | ArrayLike<unknown>
`,un=`type Query = Record<string, string>

/**
 * 解析 url query
 * @param url 
 * @returns 
 */
export function parseQuery(url: string) {
  const query: Query = {};
  url.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (query[k] = v));
  return query;
}
// parseQuery("/path?a=1&b=2");  //--> {a: '1', b: '2'}

/**
 * 组装 url query
 * @param query 
 * @returns 
 */
export function stringifyQuery(query: Query) {
  return Object.keys(query)
    .map((key) => \`\${key}=\${query[key]}\`)
    .join("&");
}
// stringifyQuery({a: '1', b: '2'});  //--> "a=1&b=2"

/**
 * 解析 url
 * @param url 
 * @returns 
 */
export function parseUrl(url: string) {
  const newUrl = new URL('http://0.0.0.0' + url);
  return {
    fullPath: newUrl.href.replace(newUrl.origin, ''),
    path: newUrl.pathname,
    query: parseQuery(newUrl.search),
    hash: newUrl.hash.slice(1),
  }
}
// parseUrl("/path?a=1&b=2#hash");  //--> {fullPath: '/path?a=1&b=2#hash', path: '/path', query: {a: '1', b: '2'}, hash: 'hash'}


interface BaseRoute {
  path?: string
  query?: Query
  hash?: string
}
/**
 * 组装 url
 * @param option 
 * @returns 
 */
export function stringifyUrl(option: BaseRoute) {
  let url = '';
  const { path, query, hash } = option;
  path && (url += path);
  Object.keys(query).length > 0 && (url += \`?\${stringifyQuery(query)}\`);
  hash && (url += \`#\${hash}\`);
  return url;
}
// stringifyUrl({path: '/path', query: {a: '1', b: '2'}, hash: 'hash'});  //--> "/path?a=1&b=2#hash"

/**
 * 根据完整路径解析相对路径
 * @param integrity 完整的路径
 * @param path      相对路径
 * @returns 
 */
export function resolvePath(integrity: string, path: string) {
  const index = path.lastIndexOf('./') + 1;
  const first = path.slice(0, index);
  if (first === '.') {
    const i = integrity.lastIndexOf('/');
    return integrity.slice(0, i) + path.slice(index);
  }

  const layer = first.split('/').length + 1;
  const arr = integrity.split('/').slice(0, -layer);
  return arr.join('/') + path.slice(index);
}
// resolvePath('/path/to', './a/b/c');  //--> "/path/to/a/b/c"`,cn=`
/**
 * HTML 转 AST 语法树
 * @param html
 * @returns 返回 AST 语法树
 */
export function stringToVirtualDOM(html: string = '') {
  // 创建一个虚拟 DOM 对象
  const virtualDOM: any = {};

  // 解析标签名称
  const tagRegExp = /<([a-z]+)\\s*[^>]*>/;
  const match = html.match(tagRegExp);
  if (match) {
    virtualDOM.tag = match[1];
  }

  // 解析属性
  const attrRegExp = /\\s*([^=\\s]+)\\s*=\\s*['"]?([^'"\\s]+)['"]?/g;
  let attrMatch;
  const attrs = {};
  while ((attrMatch = attrRegExp.exec(html))) {
    attrs[attrMatch[1]] = attrMatch[2];
  }
  virtualDOM.attrs = attrs;

  // 解析子节点
  const childrenRegExp = />(.*)<\\/[a-z]+>/s;
  const childrenMatch = html.match(childrenRegExp);
  if (childrenMatch) {
    const childrenStr = childrenMatch[1].trim();
    if (childrenStr.length > 0) {
      virtualDOM.children = childrenStr.split('\\n').map((childStr) => {
        if (tagRegExp.test(childStr)) {
          return stringToVirtualDOM(childStr);
        } else {
          return childStr;
        }
      });
    }
  }

  return virtualDOM;
}
// stringToVirtualDOM('<div class="wrap">hello world <span>!</span></div>');


/**
 * 去除 xml 标签
 * @param str 
 */
export function removeXMLTag(str: string) {
  return str.replace(/<[^>]+>/g, '');
}
// removeXMLTag('<div class="wrap">hello world</div>'); // hello world`;function mn(e){let n=null;return new Proxy(e,{construct(r,t){return n||(n=new r(...t)),n}})}const pn=Object.freeze(Object.defineProperty({__proto__:null,singleton:mn},Symbol.toStringTag,{value:"Module"}));function dn(e="000000",n="ffffff"){const r=parseInt(e,16),t=parseInt(n,16);return"#"+Le(t,r).toString(16)}function fn(e){const n=e.replace("#",""),r=parseInt(n.substring(0,2),16),t=parseInt(n.substring(2,4),16),o=parseInt(n.substring(4,6),16);return`${r}, ${t}, ${o}`}function gn(e,n,r){return .2126*e+.7152*n+.0722*r}function hn(e,n,r){const t=(n[0]-e[0])/r,o=(n[1]-e[1])/r,a=(n[2]-e[2])/r,i=[];for(let s=0;s<r;s++)i.push([Math.round(e[0]+s*t),Math.round(e[1]+s*o),Math.round(e[2]+s*a)]);return i}function yn(e,n){if(!/^#[0-9A-F]{6}$/i.test(e)||!/^#[0-9A-F]{6}$/i.test(n))throw new Error("Invalid hex color format");const r=parseInt(e.slice(1),16),t=parseInt(n.slice(1),16),o=Math.floor((r>>16)+(t>>16))/2,a=Math.floor((r>>8&255)+(t>>8&255))/2,i=Math.floor((r&255)+(t&255))/2;return`#${(o<<16|a<<8|i).toString(16).padStart(6,"0")}`}const bn=Object.freeze(Object.defineProperty({__proto__:null,colorToRGB:fn,getMiddleColorList:hn,grayColor:gn,mergeColor:yn,randomColor:dn},Symbol.toStringTag,{value:"Module"}));function xn(e){return e.getDay()%6!==0}function vn(e){return e.toTimeString().slice(0,8)}function oe(e){let n=e||e===0?new Date(e):new Date;return{year:n.getFullYear()+"",month:n.getMonth()+1,day:n.getDate(),hour:n.getHours(),minute:n.getMinutes(),second:n.getSeconds()}}function _n(e,n="YYYY-MM-DD hh:mm:ss"){if(!e&&e!==0)return"";const{year:r,month:t,day:o,hour:a,minute:i,second:s}=oe(e);return n.replace(/YYYY/g,r).replace(/YY/g,r.substr(2,2)).replace(/MM/g,(t<10?"0":"")+t).replace(/DD/g,(o<10?"0":"")+o).replace(/hh/g,(a<10?"0":"")+a).replace(/mm/g,(i<10?"0":"")+i).replace(/ss/g,(s<10?"0":"")+s)}const U=e=>e<10?"0"+e:e;function wn(e){const n=new Date(e),r=n.getFullYear(),t=n.getMonth()+1,o=n.getDate(),a=n.getHours(),i=n.getMinutes(),s=n.getSeconds();return`${r}-${U(t)}-${U(o)} ${U(a)}:${U(i)}:${U(s)}`}function $(e=0,n={day:0,hours:0,minute:0,second:0}){if(e<60)n.second=e;else if(e<3600){const t=Math.floor(e/60),o=e-60*t;n.minute=t,o>0&&$(o,n)}else if(e<3600*24){const t=Math.floor(e/3600),o=e-3600*t;n.hours=t,o>0&&$(o,n)}else{const t=Math.floor(e/86400),o=e-86400*t;n.day=t,o>0&&$(o,n)}return n}function kn(e=new Date){return new Date(e.toDateString()).getTime()}const Sn=Object.freeze(Object.defineProperty({__proto__:null,dateFormater:_n,getCurrentDate:oe,getDateTime:vn,getNowDayZeroTimestamp:kn,isWeekday:xn,switchTimeFormat:wn,timeDistance:$},Symbol.toStringTag,{value:"Module"}));function Tn(e,n){class r extends HTMLElement{constructor(){super();const o=this.attachShadow({mode:"open"}),a=document.createElement("template");if(typeof n=="string")a.innerHTML=n,o.appendChild(a.content.cloneNode(!0));else{a.appendChild(n);for(const i of a.childNodes)o.appendChild(i)}}}customElements.define(e,r)}function Cn(e){return e===document.activeElement}function jn(e){var n=document.createElement("div");n.appendChild(e.cloneNode(!0));var r=n.innerHTML;return n=e=null,r}function An(e,n){for(;e&&n;)e=e.parentElement,n--;return e}function Mn(e,n){for(;e&&n;)if(n>0){if(e.nextElementSibling)e=e.nextElementSibling;else for(e.nextSibling;e&&e.nextSibling!=1;e=e.nextSibling);n--}else{if(e.previousElementSibling)e=e.previousElementSibling;else for(e.previousSibling;e&&e.previousSibling!=1;e=e.previousSibling);n++}return e}const Ln=(e,n)=>window.getComputedStyle?window.getComputedStyle(e,null)[n]:e.style[n];function Pn(e){e=e||window.event,e.stopPropagation?e.stopPropagation():e.cancelBubble=!0}function En(e,n){if(G(e,n))return;let r=e.className.split(" ");r.push(n),e.className=r.join(" ")}function On(e,n){if(!G(e,n))return;let r=new RegExp("(^|\\s)"+n+"(\\s|$)","g");e.className=e.className.replace(r," ")}function G(e,n){return new RegExp("(^|\\s)"+n+"(\\s|$)").test(e.className)}function Rn(e){e=e||window.event,e.preventDefault?e.preventDefault():e.returnValue=!1}function Nn(e,n){e.addEventListener("mousedown",function(r){var t=r.clientX-e.offsetLeft,o=r.clientY-e.offsetTop;window.addEventListener("mousemove",a,!1),window.addEventListener("mouseup",()=>{window.removeEventListener("mousemove",a,!1)},!1);function a(i){e.style.left=i.clientX-t+"px",e.style.top=i.clientY-o+"px",n!==void 0&&(parseFloat(e.style.top)<n.offsetTop&&(e.style.top=n.offsetTop+"px"),parseFloat(e.style.left)<n.offsetLeft&&(e.style.left=n.offsetLeft+"px"),parseFloat(e.style.left+e.clientWidth)>n.offsetLeft+n.clientWidth-parseFloat(e.clientWidth+"")&&(e.style.left=n.offsetLeft+n.clientWidth-parseFloat(e.clientWidth+"")+"px"),parseFloat(e.style.top+e.clientHeight)>n.offsetTop+n.clientHeight-parseFloat(e.clientHeight+"")&&(e.style.top=n.offsetTop+n.clientHeight-parseFloat(e.clientHeight+"")+"px"))}},!1)}const Fn=Object.freeze(Object.defineProperty({__proto__:null,addClass:En,cancelHandler:Rn,createTemplate:Tn,elementIsInFocus:Cn,getStyle:Ln,hasClassName:G,lookupParent:An,mouseDrag:Nn,nodeToString:jn,removeClass:On,retSibling:Mn,stopBubble:Pn},Symbol.toStringTag,{value:"Module"}));function Bn(e){const n=new Uint8Array(e.match(/.{1,2}/g).map(t=>parseInt(t,16)));let r="";for(let t of n)r+=String.fromCharCode(t);return btoa(r)}function Dn(e){const n=e.replace(/=/g,""),r=atob(n),t=new Uint8Array(r.length);for(let a=0;a<r.length;a++)t[a]=r.charCodeAt(a);let o="";for(let a=0;a<t.length;a++){const s=t[a].toString(16).padStart(2,"0");o+=s}return o}function In(e){for(var n="",r=new Uint8Array(e),t=r.byteLength,o=0;o<t;o++)n+=String.fromCharCode(r[o]);return btoa(n)}function Un(e){const n=new FileReader;return new Promise((r,t)=>{n.readAsDataURL(e),n.addEventListener("load",o=>{r(o.target.result)})})}function Wn(e,n="filename",r="image/jpg"){for(var t=e.split(","),o=atob(t[1]),a=o.length,i=new Uint8Array(a);a--;)i[a]=o.charCodeAt(a);return new File([i],n,{type:r})}function Hn(e){const n=atob(e),r=new Uint8Array(n.length);for(let o=0;o<n.length;o++)r[o]=n.charCodeAt(o);const t=new Blob([r]);return URL.createObjectURL(t)}const zn=Object.freeze(Object.defineProperty({__proto__:null,base64ToHex:Dn,base64ToUrl:Hn,base64toFile:Wn,bufferToBase64:In,fileToBase64:Un,hexToBase64:Bn},Symbol.toStringTag,{value:"Module"}));function qn(e,n){return new Promise((r,t)=>{const o=new FileReader;o.onload=()=>{const a=o.result,i=new File([a],n);r(i)},o.onerror=t,o.readAsArrayBuffer(e)})}function $n(e){return URL.createObjectURL(e)}function Yn(e,n){const r=document.createElement("a");r.href=e,r.download=n,r.click(),r.remove()}function Kn(e,n=1024*1024*5){return new Promise(async r=>{const t=Math.ceil(e.size/n),a=be(`
function createChunk(file, index, chunkSize) {
  return new Promise(resovle => {
    const start = index * chunkSize;
    const end = start + chunkSize;
    const fileReader = new FileReader();
    const blob = file.slice(start, end);
    fileReader.onload = (e) => {
      resovle({ start, end, index, blob });
    }
    fileReader.readAsArrayBuffer(blob);
  })
}

onmessage = async (e) => {
  const { file, chunkSize, start, end } = e.data;
  const paoms = [];
  for (let i = start; i < end; i++) {
    const chunk = createChunk(file, i, chunkSize);
    paoms.push(chunk);
  }
  const chunks = await Promise.all(paoms);
  postMessage(chunks);
}
`);a.postMessage({file:e,chunkSize:n,start:0,end:t}),a.onmessage=i=>{a.terminate(),r(i.data)}})}const Vn=Object.freeze(Object.defineProperty({__proto__:null,blobToFile:qn,fileDownload:Yn,fileFragment:Kn,fileToUrl:$n},Symbol.toStringTag,{value:"Module"}));async function Xn(e,n={}){const r=e.match(/image\/.+;/)[0].slice(6,-1).toLocaleLowerCase();n=Object.assign({ratio:.8,sizeLimit:{width:800,height:800},rigid:!0},n);const t=new Image;return t.src=e,new Promise((o,a)=>{t.addEventListener("load",async i=>{const{naturalWidth:s,naturalHeight:u}=t;let p=0,c=0,d=0;const{sizeLimit:f}=n;f?(p=f.width,c=f.height,s>u&&(s>p?(d=s/p,c=u/d):(d=u/c,p=s/d)),u>s&&(u>c?(d=u/c,p=s/d):(d=s/p,c=u/d)),s<p&&u<c&&(p=s,c=u)):(p=s,c=u);const y=document.createElement("canvas");y.width=p,y.height=c,y.style.visibility="hidden",document.body.appendChild(y);const k=y.getContext("2d");k.clearRect(0,0,p,c),k.drawImage(t,0,0,p,c);const M=y.toDataURL(`image/${r}`,n.ratio),E=e.length>M.length?M:e;return y.remove(),console.log(e.length,M.length),o(E)})})}const Gn=Object.freeze(Object.defineProperty({__proto__:null,imageCompress:Xn},Symbol.toStringTag,{value:"Module"}));function Qn(e=1e3){setTimeout(()=>{console.log("long time fun ...")},0)}function Zn(e,n){let r=0;return function(...t){let o=new Date().getTime();o-r>n&&(e.apply(this,...t),r=o)}}function Jn(e,n){let r=null;return function(...t){let o=this;clearTimeout(r),r=setTimeout(function(){e.apply(o,...t)},n)}}function ae(e,...n){return function(...r){const t=[...n,...r];return t.length>=e.length?e.apply(this,t):ae(e,...t)}}function ie(e,n){if(!e.length)return;let r=0;function t(){n(o=>{for(;r<e.length&&o();)e[r++]();r<e.length&&t()})}t()}function er(e){return ie(e,n=>{requestIdleCallback(r=>{n(()=>r.timeRemaining()>0)})})}function nr(e,n,r){const t=document.createElement("script");t.src=e,n&&(t.onload=n),r&&(t.type="module"),t.async=!0,document.body.appendChild(t)}window.addEventListener("load",()=>{setTimeout(()=>{const e=window.performance.timing,n={},r=window.performance.getEntriesByType("paint");n.DNS查询耗时=e.domainLookupEnd-e.domainLookupStart,n.TCP链接耗时=e.connectEnd-e.connectStart,n.request耗时=e.responseEnd-e.responseStart,n.解析DOM树耗时=e.domComplete-e.domInteractive,n.白屏时间=e.domLoading-e.fetchStart,n.domready=e.domContentLoadedEventEnd-e.fetchStart,n.onload=e.loadEventEnd-e.fetchStart,n["首次绘制时间(FC)"]=r[0].startTime,n["首次内容绘制时间(FCP)"]=r[1].startTime,console.log(n)},0)});window.onerror=(e,n,r,t,o)=>{let a=o?o.stack:null;console.log(e,n,r,t,a)};window.onunhandledrejection=e=>{let n="",r="";typeof e.reason=="object"?(n=e.reason.message,r=e.reason.stack):n=e.reason,console.log(n,r)};const rr=Object.freeze(Object.defineProperty({__proto__:null,choke:Qn,currying:ae,debounce:Jn,idlePerformTask:er,loadScript:nr,performTask:ie,throttle:Zn},Symbol.toStringTag,{value:"Module"}));class Q{constructor(n=5){b(this,"_parallelCount");b(this,"_runingCount",0);b(this,"tasks",[]);this._parallelCount=n}add(n){const r=new Promise((t,o)=>{this.tasks.push({task:n,resolve:t,reject:o})});return this._run(),r}_run(){for(;this.tasks.length>this._runingCount&&this._runingCount<this._parallelCount;){const{task:n,resolve:r,reject:t}=this.tasks[this._runingCount];this._runingCount++,n().then(o=>r(o)).catch(o=>t(o)).finally(()=>{this._continue()})}}_continue(){this._parallelCount++,this._run()}}var W;class tr extends Q{constructor(r,t=!1){r.forEach((o,a,i)=>{a!==0&&(i[a]=o+i[a-1])});super();b(this,"_parallelCountList");b(this,"_parallelListIndex",0);b(this,"_executeCount",0);b(this,"_isAwait");L(this,W,null);this._parallelCountList=r,this._isAwait=t,w(this,W,this._run),this._run=()=>{this._parallelCount=this._parallelCountList[this._parallelListIndex],m(this,W).call(this)}}_continue(){if(this._executeCount++,this._isAwait){if(this._executeCount===this._parallelCount){this._parallelListIndex++,this._run();return}}else this._runingCount===this._parallelCount&&(this._parallelListIndex++,this._run());this._parallelCount++,this._run()}}W=new WeakMap;var H;class or extends Q{constructor(r=!0){super();L(this,H,void 0);this._parallelCount=1,w(this,H,r)}_run(){for(;this.tasks.length>this._runingCount&&this._runingCount<this._parallelCount;){const{task:r,resolve:t,reject:o}=this.tasks[this._runingCount];this._runingCount++,r().then(a=>{t(a),this._continue()}).catch(a=>{o(a),m(this,H)&&this._continue()})}}}H=new WeakMap;var F,T,C,P,B;class ar{constructor(...n){b(this,"START_FAILURE",Symbol("startFailure"));b(this,"ILLEGAL_CALL",Symbol("illegalCall"));b(this,"NOT_TASK",Symbol("notTask"));L(this,F,!1);L(this,T,!1);L(this,C,null);L(this,P,0);b(this,"start",async()=>{if(m(this,F))return console.warn("非法调用！任务队列正在执行中，无法重新执行"),Promise.reject(this.ILLEGAL_CALL);if(m(this,P)>m(this,C).length-1)return console.warn("没有任务可以继续执行"),Promise.resolve(this.NOT_TASK);w(this,F,!0),w(this,T,!0);const n=await m(this,B).call(this);return w(this,F,!1),n});L(this,B,async(n=[])=>{if(!m(this,T))return;const r=m(this,C).length;m(this,P)===r-1&&w(this,T,!1);const t=m(this,C)[m(this,P)]();return ne(this,P)._++,await t.then(async a=>await o.call(this,a)).catch(a=>(w(this,T,!1),Promise.reject(a)));async function o(a){return n.push(a),m(this,C).length>r?(w(this,T,!0),await m(this,B).call(this,n)):m(this,T)?await m(this,B).call(this,n):Promise.resolve(n)}});b(this,"pause",()=>(w(this,T,!1),m(this,P)-1));b(this,"add",n=>{m(this,C)&&m(this,C).push(n)});w(this,C,n)}}F=new WeakMap,T=new WeakMap,C=new WeakMap,P=new WeakMap,B=new WeakMap;const ir=Object.freeze(Object.defineProperty({__proto__:null,ParallelTaskScheduling:Q,ParallelTaskSchedulings:tr,PausingSerialTasks:ar,SerialTaskScheduling:or},Symbol.toStringTag,{value:"Module"}));function sr(e,n=3,r=-4){let t="";const o=e.slice(0,n),a=e.slice(n,r).length,i=e.slice(r);for(let s=0;s<a;s++)t+="*";return o+t+i}function V(e){let n=0;for(let r=0;r<e.length;){n++;const t=e.codePointAt(r);r+=t>65535?2:1}return n}function se(e,n){let r=0;for(let t=0;t<e.length;){if(r===n){const a=e.codePointAt(t);return String.fromCodePoint(a)}r++;const o=e.codePointAt(t);t+=o>65535?2:1}}function lr(e,n,r){r??(r=V(e));let t="";const o=V(e);for(let a=n;a<o&&a<r;a++)t+=se(e,a);return t}function ur(e){let n=e.length,r=0;for(;r<n;)e.charCodeAt(r)>255&&n++,r++;return n}function cr(e){const n=e.split("");let r=0;return n.forEach(t=>{r+=t.charCodeAt(0)}),r}function X(e){return e<=11?Math.random().toString(36).substring(2,2+e).padEnd(e,"0"):X(11)+X(e-11)}function mr(e){var n=0;return e.length<6||(/[0-9]/.test(e)&&n++,/[a-z]/.test(e)&&n++,/[A-Z]/.test(e)&&n++,/[\.|-|_]/.test(e)&&n++),n}function pr(e){return/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(e)}function dr(e,n=1){let r=Math.abs(n),t="";for(;r;)r%2===1&&(t+=e),r>1&&(e+=e),r>>=1;return t}function le(e,n){if(!e&&!n)return 0;if(!e)return-1;if(!n)return 1;const r=e.split("."),t=n.split("."),o=Math.max(r.length,t.length);for(let a=0;a<o;a++){const i=~~r[a],s=~~t[a];if(i>s)return 1;if(i<s)return-1}return 0}function fr(e){return e.sort(le).pop()}function gr(e=""){if(e==="")return"";if(isNaN(Number(e)))return"无效金额字符";if(e.length>80)return"金额过大";const n=["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"],r=["","拾","佰","仟"],t=["","万","亿","兆","京","垓","杼","穰","沟","涧","正","载","极","恒河沙","阿僧祇","那由它","不可思议","无量","大数","古戈尔"],o=["角","分","厘","毫","丝"];let a="",i="",s="",u="";/\./.test(e)?(s=e.split(".")[0],u=e.split(".")[1].slice(0,5),Array(...u).forEach((f,y)=>{f==="0"?i+=n[f]:i+=n[f]+o[y]}),i=i.replace(/零+/,"零"),i=i.replace(/零$/,"")):s=e,s=s.replace(/^0+/,"");const p=/(?=(\B)(\d{4})+$)/g,c=s.replace(p,",").split(","),d=c.length;return c.forEach((f,y)=>{let k="";if(/^0000$/.test(f))return a;const M=f.length;f=f.replace(/0+$/,""),Array(...f).forEach((E,z)=>{E==="0"?k+=n[E]:k+=n[E]+r[M-z-1]}),k=k.replace(/零+/,"零"),a+=k+t[d-y-1],a||(a="零")}),i?a+"元"+i:a+"元整"}function hr(e){return"1111100000".slice(5-e,10-e)}function yr(e=8,n="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"){let r="";for(let t=e;t>0;--t)r+=n[Math.floor(Math.random()*n.length)];return r}const br=Object.freeze(Object.defineProperty({__proto__:null,ascllSum:cr,checkPasswordLevel:mr,compareVersion:le,digitUppercase:gr,encrypt:sr,getMaxVersion:fr,isFixed2Float:pr,pointAt:se,pointLength:V,pointSlice:lr,randomString:X,rate:hr,repeatStr:dr,strBytesLength:ur,uuid:yr},Symbol.toStringTag,{value:"Module"})),xr=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));function ue(e){const n={};return e.replace(/([^?&=]+)=([^&]+)/g,(r,t,o)=>n[t]=o),n}function ce(e){return Object.keys(e).map(n=>`${n}=${e[n]}`).join("&")}function vr(e){const n=new URL("http://0.0.0.0"+e);return{fullPath:n.href.replace(n.origin,""),path:n.pathname,query:ue(n.search),hash:n.hash.slice(1)}}function _r(e){let n="";const{path:r,query:t,hash:o}=e;return r&&(n+=r),Object.keys(t).length>0&&(n+=`?${ce(t)}`),o&&(n+=`#${o}`),n}function wr(e,n){const r=n.lastIndexOf("./")+1,t=n.slice(0,r);if(t==="."){const i=e.lastIndexOf("/");return e.slice(0,i)+n.slice(r)}const o=t.split("/").length+1;return e.split("/").slice(0,-o).join("/")+n.slice(r)}const kr=Object.freeze(Object.defineProperty({__proto__:null,parseQuery:ue,parseUrl:vr,resolvePath:wr,stringifyQuery:ce,stringifyUrl:_r},Symbol.toStringTag,{value:"Module"}));function me(e=""){const n={},r=/<([a-z]+)\s*[^>]*>/,t=e.match(r);t&&(n.tag=t[1]);const o=/\s*([^=\s]+)\s*=\s*['"]?([^'"\s]+)['"]?/g;let a;const i={};for(;a=o.exec(e);)i[a[1]]=a[2];n.attrs=i;const s=/>(.*)<\/[a-z]+>/s,u=e.match(s);if(u){const p=u[1].trim();p.length>0&&(n.children=p.split(`
`).map(c=>r.test(c)?me(c):c))}return n}function Sr(e){return e.replace(/<[^>]+>/g,"")}const Tr=Object.freeze(Object.defineProperty({__proto__:null,removeXMLTag:Sr,stringToVirtualDOM:me},Symbol.toStringTag,{value:"Module"}));function Cr(){const e={keys:[],body:{}},n=Object.assign({"/core/utils/array.ts":ze,"/core/utils/async.ts":qe,"/core/utils/browser.ts":$e,"/core/utils/class.ts":Ye,"/core/utils/color.ts":Ke,"/core/utils/date.ts":Ve,"/core/utils/dom.ts":Xe,"/core/utils/encoding.ts":Ge,"/core/utils/file.ts":Qe,"/core/utils/generator.ts":Ze,"/core/utils/image.ts":Je,"/core/utils/judge.ts":en,"/core/utils/math.ts":nn,"/core/utils/number.ts":rn,"/core/utils/object.ts":tn,"/core/utils/optimize.ts":on,"/core/utils/queue.ts":an,"/core/utils/string.ts":sn,"/core/utils/type.ts":ln,"/core/utils/url.ts":un,"/core/utils/xml.ts":cn});for(const r in n){const t=Ne(r);e.keys.push(t),e.body[t]=n[r]}return e}function jr(){const e=Object.assign({"/core/utils/array.ts":Pe,"/core/utils/async.ts":Ee,"/core/utils/browser.ts":xe,"/core/utils/class.ts":pn,"/core/utils/color.ts":bn,"/core/utils/date.ts":Sn,"/core/utils/dom.ts":Fn,"/core/utils/encoding.ts":zn,"/core/utils/file.ts":Vn,"/core/utils/generator.ts":ve,"/core/utils/image.ts":Gn,"/core/utils/judge.ts":_e,"/core/utils/math.ts":Re,"/core/utils/number.ts":Oe,"/core/utils/object.ts":we,"/core/utils/optimize.ts":rr,"/core/utils/queue.ts":ir,"/core/utils/string.ts":br,"/core/utils/type.ts":xr,"/core/utils/url.ts":kr,"/core/utils/xml.ts":Tr}),n={};for(const r in e){const t=r.split("/").pop().replace(".ts","");n[t]=e[r]}return n}function zr(e){const n=K(Ce),[r,t]=q([]),[o,a]=q({name:"",content:""}),i=re(Cr,[]);async function s(l){const{keys:g,body:_}=await i;!r.length&&t(g);const v=g.find(h=>h===l)||g[0];let j=_[v];n.state.codeLanguage==="js"&&(j=Be(j)),a({name:v,content:j})}const u=he(),[p,c]=q(!0);O(()=>{if(p){c(!1);return}const l=u.current.path+".ts";s(l)},[n.state.codeLanguage]);const d=re(()=>{const l=ge(o.content,{sourceType:"module",plugins:["typescript"]});function g(S){const v={start:null,title:null};if(!S)return v;const j=S[S.length-1],{type:h,value:R,loc:D}=j;if(v.start=D.start.line,h==="CommentBlock"){const N=R.match(/\*(.)+(\n|\r\n)/);if(!N)return v;v.title=N[0].replace(/\*/g,"").trim()}else v.title=R.replace(/\/\//,"").trim();return v}const _=[];for(const S of l.program.body)if(S.type==="ExportNamedDeclaration"){if(["FunctionDeclaration","ClassDeclaration"].includes(S.declaration.type)){const{loc:v,declaration:j,leadingComments:h}=S,{start:R,end:D}=v,{start:N,title:Y}=g(h),A=h==null?void 0:h[h.length-1];_.push({start:R.line,end:D.line,name:j.id.name,title:Y,comment:(A==null?void 0:A.type)==="CommentBlock"?A.value:"",commentStart:N})}}else if(S.type==="FunctionDeclaration"){const{loc:v,id:j,leadingComments:h}=S,{start:R,end:D}=v,{start:N,title:Y}=g(h),A=h==null?void 0:h[h.length-1];_.push({start:R.line,end:D.line,name:j.name,title:Y,comment:(A==null?void 0:A.type)==="CommentBlock"?A.value:"",commentStart:N})}return _},[o.content]);O(()=>u.monitor(async(l,g)=>{if(!l.path.startsWith(e.path))return;const _=l.path+".ts";s(_)}),[]),O(()=>{if(!d.length)return;const l=u.current.query.name;if(!l)return;const g=d.find(_=>_.name===l);g&&setTimeout(()=>{y(g.commentStart)})},[d]);const f=te();function y(l){const g=f.current.getEl().getElementsByClassName("row-num")[0].childNodes;for(const _ of g)if(_.getElementsByTagName("i")[0].textContent===l+""){Te(_);break}}const k=()=>x("ul",{className:I.navigation},...r.map(l=>{const g=l.split("/")[2].replace(".ts","");return x("li",null,x(ye,{to:l.split(".")[0]},g))})),M=K(je);O(()=>{r.length&&M.dispatch({type:"menuSet",payload:k()})},[r]),O(()=>()=>{M.dispatch({type:"menuClear"})},[]),O(()=>{const l="$utils";return window[l]=jr(),()=>{delete window[l]}},[]);const[E,z]=q(!1),Z=te(),pe=(()=>{const l=o.name.split("/")[2];return l?"$utils."+l.replace(".ts",""):"$utils."})(),J=K(Ae);return O(()=>{const l=Symbol("utilsConsole"),g={id:l,btn:x("div",{onclick:()=>z(!0)},"C"),layer:2};return J.dispatch({type:"btnAdd",payload:g}),()=>{J.dispatch({type:"btnRemove",payload:l})}},[]),x(Se,{className:I.pageUtils},x("aside",null,k()),x("section",{className:I.content},x(ke,{ref:f,value:o.content,lines:d})),x("aside",{className:I.outline},x("ul",null,...d.map(l=>x("li",{className:"text-ellipsis",onclick:()=>{y(l.commentStart||l.start),u.replace({path:o.name.replace(".ts",""),query:{name:l.name}})}},l.title||l.name))),x("div",{className:I.total},"total: ",d.length)),x(Me,{visible:E,onClose:()=>{Z.current.clear(),z(!1)},style:"width: 500px"},x(Fe,{ref:Z,value:pe})))}export{zr as default};
