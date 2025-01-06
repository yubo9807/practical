var J=Object.defineProperty;var G=(o,n,e)=>n in o?J(o,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[n]=e;var u=(o,n,e)=>(G(o,typeof n!="symbol"?n+"":n,e),e),K=(o,n,e)=>{if(!n.has(o))throw TypeError("Cannot "+e)};var x=(o,n,e)=>(K(o,n,"read from private field"),e?e.call(o):n.get(o)),M=(o,n,e)=>{if(n.has(o))throw TypeError("Cannot add the same private member more than once");n instanceof WeakSet?n.add(o):n.set(o,e)},W=(o,n,e,t)=>(K(o,n,"write to private field"),t?t.call(o,e):n.set(o,e),e);var q=(o,n,e)=>(K(o,n,"access private method"),e);import{c as useState,e as useEffect,m as useMemo,u as useRef,a as useImperativeHandle,h}from"./pl-react-f16e3da5.js";import{p as parse_1,t as traverse,_ as _default}from"./@babel-cd739a4a.js";const index="";function CodeEdit(o){const[n,e]=useState("");useEffect(()=>{e(o.value)},[o.value]);function t(s){const a=s.target.value;e(a)}const r=useMemo(()=>o.toHtml?o.toHtml(n):n,[n]),i=useRef();return useImperativeHandle(o.ref,()=>({getEl:()=>i.current,setValue:e}),[]),h("div",{ref:i,className:["br-code-edit",...[o.className].flat()],style:o.style},h("ul",{className:"row-num"},...new Array(n.replace(/\r/g,"").split(`
`).length).fill(1).map((s,a)=>h("li",null,o.slotRowItem?o.slotRowItem(a):a+1))),h("div",{className:"content"},h("pre",{className:"mark",innerHTML:r}),o.isEdit!==!1&&h("textarea",{value:n,oninput:t,onkeydown:o.onKeyDown})),h("div",{className:"btns"},o.slotBtns))}class CodeConversion{constructor(o={}){u(this,"_option");u(this,"_textList");this._option=Object.assign({keywords:["import","null","true","false"],multiRowComment:/\/\*.*?\*\//gs,singleLineComment:/\/\/[^\n]+\n?/g,string:/"[^"]*"|'[^']*'/g,constant:new RegExp("(?<=\\s|\\(|\\[|{|,|:|=)[A-Z][\\w|\\d]+","g"),number:new RegExp("(?<=\\s|\\(|\\[|{|,|:|=|\\+|-|\\*|\\/|\\%|<|>)\\d*\\.?\\d+","g"),methods:/\w+(?=\()/g,object:/\w*\./sg},o)}_commonDealWith(o,n="",e=null){const t=Object.assign([],this._textList),r=[];return t.forEach((i,s)=>{if(i.delaWith)return;const a=i.content.split(o).map(m=>({content:m})),l=i.content.match(o);if(!l)return;let c=1;l.forEach(m=>{const d=`<span class="${n}">${e?m.slice(e[0],e[1]):m}</span>${e?e[2]:""}`;a.splice(c,0,{delaWith:!0,content:d}),c+=2}),r.push([s,a.length,a])}),r.forEach((i,s,a)=>{if(s>0){const l=a[s-1][1]-1;i[0]=i[0]+l,i[1]=i[1]+l}t.splice(i[0],1,...i[2])}),this._textList=t,this}_keyword(words){const arr=Object.assign([],this._textList),record=[];return arr.forEach((val,index)=>{if(val.delaWith)return;const reg=eval(`/(${words.join("|")})(?=\\s)/g`),newArr=val.content.split(reg);newArr.forEach((o,n)=>words.includes(o)&&newArr.splice(n,1));const noMatching=newArr.map(o=>({content:o})),matching=val.content.match(reg);if(!matching)return;let insert=1;matching.forEach(o=>{noMatching.splice(insert,0,{delaWith:!0,content:`<span class="keyword">${o}</span>`}),insert=insert+2}),record.push([index,noMatching.length,noMatching])}),record.forEach((o,n,e)=>{if(n>0){const t=e[n-1][1]-1;o[0]=o[0]+t,o[1]=o[1]+t}arr.splice(o[0],1,...o[2])}),this._textList=arr,this}_merge(){return`<div class="code-highlight-container">${this._textList.map(n=>n.content).join("")}</div>`}output(o){this._textList=[{content:o.replace(/</g,"&lt;").replace(/>/g,"&gt;")}];const n=this._option;return this._commonDealWith(n.multiRowComment,"block-comment")._commonDealWith(n.singleLineComment,"line-comment")._commonDealWith(n.string,"string")._commonDealWith(n.number,"number")._commonDealWith(n.constant,"constant")._keyword(n.keywords)._commonDealWith(n.methods,"methods")._commonDealWith(n.object,"object")._merge()}}function scrollTo(o={},n=0){const e=o.offsetTop||0;window.scrollTo({top:e+n,behavior:"smooth"})}function copyToBoard(o){if(typeof navigator.clipboard=="object")navigator.clipboard.writeText(o);else{const n=document.createElement("textarea");document.body.appendChild(n),n.value=o,n.select(),document.execCommand("copy"),document.body.removeChild(n)}}function tsToJs(o){const n=parse_1(o,{sourceType:"module",plugins:["typescript"]});return traverse(n,{TSTypeAliasDeclaration(e){e.remove()},TSInterfaceDeclaration(e){e.remove()},TSTypeAnnotation(e){e.remove()},TSTypeParameterDeclaration(e){e.remove()}}),_default(n).code}const __vite_glob_0_0=`import { randomNum } from './number';\r
import { deepClone } from "./object";\r
\r
\r
/**\r
 * 创建一个指定长度的数组，并填入内容\r
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
/**\r
 * 对数组数据进行归类\r
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
\r
/**\r
 * 转换为二维数组\r
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
\r
/**\r
 * 检查两个数组各项是否相等\r
 * @param a 数组1\r
 * @param b 数组2\r
 * @returns \r
 * @call isArrayEqual([6, 5, 2, 4, 1, 3], [1, 2, 3, 4, 5, 6])  //--> true\r
 */\r
export function isArrayEqual(a: any[], b: any[]) {\r
  if (a.length !== b.length) return false;\r
  if (a.find(x => !b.includes(x))) return false;\r
  return true\r
}\r
\r
/**\r
 * 两个数组的 交集\r
 * @param a 数组1\r
 * @param b 数组2\r
 * @returns \r
 * @call intersectionArray(['a', 2, 6, 7], ['a', 2, 9, 'b'])  //--> [6, 7]\r
 */\r
export function intersectionArray(a: any[], b: any[]) {\r
  const s = new Set(b);\r
  let arr = a.filter(x => !s.has(x));\r
  return arr;\r
}\r
\r
/**\r
 * 两个数组的 并集\r
 * @param a \r
 * @param b \r
 * @returns \r
 * @call unionArr([1, 2, 6, 7], [1, 2, 9, 5])  //--> [1, 2]\r
 */\r
export function union(a: any[], b: any[]) {\r
  const s = new Set(b);\r
  return a.filter(x => s.has(x));\r
}\r
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
\r
/**\r
 * 找出数组中只出现一次的数字\r
 * @param arr \r
 * @returns \r
 */\r
export function querySingle(arr: number[]) {\r
  return arr.reduce((a, b) => a ^ b, 0);\r
}\r
\r
/**\r
 * 数组排列，看有多少种情况\r
 * @param arr\r
 * @returns \r
 * @call permute([1, 2])  //--> [[1, 2], [2, 1]]\r
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
`,__vite_glob_0_1=`import { PromiseType } from "./type";

/**
 * 延迟
 * @param ms 
 * @returns 
 */
export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
`,__vite_glob_0_2=`import { AnyObj } from "./type";\r
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
declare const cookieStore;\r
/**\r
 * 获取 cookie 指定参数\r
 * @param {*} key 要获取的 key\r
 * @returns \r
 */\r
export async function getCookie(key: string) {\r
  if (typeof cookieStore === 'object') {\r
    const obj = await cookieStore.get(key);\r
    return obj?.value;\r
  }\r
  const cookie = document.cookie;\r
  const str = cookie.replace(/\\s/g, '');\r
  const obj = {}\r
  str.split(';').forEach((val: string) => {\r
    obj[val.split('=')[0]] = val.split('=')[1];\r
  })\r
  return obj[key];\r
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
 * 生成 formData 表单\r
 * @param {*} obj\r
 * @returns\r
 */\r
export function createFormData(obj: AnyObj) {\r
  const data = Object.assign({}, obj);\r
  const formData = new FormData();\r
  for (const key in data) {\r
    formData.append(key, data[key]);\r
  }\r
  return formData;\r
}\r
\r
\r
// 资源请求错误，更换地址重试\r
// let count = 0;\r
// window.addEventListener('error', (e) => {\r
//   const tag = e.target;\r
//   if (tag.nodeName === 'SCRIPT' && !(e instanceof ErrorEvent)) {\r
//     if (count > 2) return;\r
//     const url = new URL(tag.src);\r
//     url.host = 'hpyyb.cn';\r
//     url.port = '80';\r
//     const script = document.createElement('script');\r
//     script.src = url;\r
//     document.write(\`<script src="\${url.toString()}">\\<\\/script>\`);\r
//     // document.head.insertBefore(script, tag);\r
//     count++;\r
//   }\r
// }, true)\r
`,__vite_glob_0_3=`import { WideClass } from "./type";

/**
 * 将类变为单例
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
`,__vite_glob_0_4=`
type Color = [number, number, number];

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
`,__vite_glob_0_5=`
type WideDate = number | string | Date

/**
 * 检查当前是否为工作日
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
export function dateFormater(t: WideDate = new Date(), formater: string = 'YYYY-MM-DD hh:mm:ss') {
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


const intiailObj = {
  day: 0,
  hours: 0,
  minute: 0,
  second: 0,
}

/**
 * 计算距离当前时间的时间差
 * @param diff 时间差
 * @param obj
 */
export function getTimeDistance(diff = 0, obj = intiailObj) {
  if (diff < 60) {
    obj.second = diff;
  } else if (diff < 3600) {
    const num = 60;
    const month = Math.floor(diff / num);
    const remain = diff - num * month;
    obj.minute = month
    if (remain > 0) getTimeDistance(remain, obj);
  } else if (diff < 3600 * 24) {
    const num = 3600;
    const hours = Math.floor(diff / num);
    const remain = diff - num * hours;
    obj.hours = hours
    if (remain > 0) getTimeDistance(remain, obj);
  } else {
    const num = 3600 * 24;
    const day = Math.floor(diff / num);
    const remain = diff - num * day;
    obj.day = day;
    if (remain > 0) getTimeDistance(remain, obj);
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
`,__vite_glob_0_6=`\r
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
export const elementIsInFocus = (el: any) => (el === document.activeElement);\r
\r
/**\r
 * 节点转字符串\r
 * @param {*} event \r
 */\r
export const nodeToString = (node: any) => {\r
  var tmpNode = document.createElement('div');\r
  tmpNode.appendChild(node.cloneNode(true));\r
  var str = tmpNode.innerHTML;\r
  tmpNode = node = null;\r
  return str;\r
}\r
\r
/**\r
 * 查看第 n 层父元素节点\r
 * @param {*} elem \r
 * @param {number} n （不可为负值）\r
 */\r
export const lookupParent = (elem: any, n: number) => {\r
  while (elem && n) {\r
    elem = elem.parentElement;  // IE 父元素节点选择\r
    n--;\r
  }\r
  return elem;\r
}\r
\r
/**\r
 * 返回当前元素的元素子节点\r
 */\r
export const myChildren = (ele: any) => function () {\r
  var child = ele.childNodes;  // 获得 body 子元素集合\r
  var len = child.length;\r
  var arr: any[] = [];\r
  for (var i = 0; i < len; i++) {\r
    if (child[i].nodeType == 1) {\r
      arr.push(child[i]);\r
    }\r
  }\r
  return arr;\r
}\r
\r
/**\r
 * 返回元素的第 n 个兄弟元素节点\r
 * @param {*} elem \r
 * @param {number} n 正返回后面的兄弟元素节点，n为负返回前面的，n为0返回自己\r
 */\r
export const retSibling = (elem: any, n: number) => {\r
  while (elem && n) {\r
    if (n > 0) {\r
      if (elem.nextElementSibling) {\r
        elem = elem.nextElementSibling;\r
      } else {\r
        for (elem.nextSibling; elem && elem.nextSibling != 1; elem = elem.nextSibling);\r
      }  // 解决IE兼容性问题\r
      n--;\r
    } else {\r
      if (elem.previousElementSibling) {\r
        elem = elem.previousElementSibling;\r
      } else {\r
        for (elem.previousSibling; elem && elem.previousSibling != 1; elem = elem.previousSibling);\r
      }\r
      n++;\r
    }\r
  }\r
  return elem;\r
}\r
\r
/**\r
 * 获取元素样式属性\r
 * @param {*} elem \r
 * @param {string} prop CSS属性\r
 */\r
export const getStyle = (elem: any, prop: string) => {\r
  if (window.getComputedStyle) {\r
    return window.getComputedStyle(elem, null)[prop];\r
  } else {\r
    return elem.currentStyle[prop];\r
  }\r
}\r
\r
/**\r
 * 阻止事件冒泡\r
 * @param {*} e 源事件中也需要传参\r
 */\r
export const stopBubble = (e: any) => {\r
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
export const addClass = (el: any, className: string) => {\r
  if (isIncludeClassName(el, className)) return;\r
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
export const removeClass = (el: any, className: string) => {\r
  if (!isIncludeClassName(el, className)) return;\r
  let reg = new RegExp('(^|\\\\s)' + className + '(\\\\s|$)', 'g');\r
  el.className = el.className.replace(reg, ' ');\r
}\r
\r
/**\r
 * 是否包含某个 class\r
 * @param el \r
 * @param className \r
 */\r
export const isIncludeClassName = (el: any, className: string) => {\r
  const reg = new RegExp('(^|\\\\s)' + className + '(\\\\s|$)');\r
  return reg.test(el.className);\r
}\r
\r
/**\r
 * 阻止默认事件\r
 * @param {*} event \r
 */\r
export const cancelHandler = (e: any) => {\r
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
 * @param {Element} ele 所拖拽的元素\r
 * @param {Element} limit 限制移动范围的元素（为空时，不限制移动范围）\r
 */\r
export const mouseDrag = (ele: any, limit: any) => {\r
\r
  // 鼠标按下\r
  ele.addEventListener('mousedown', function (e) {\r
    e = e || window.event;\r
\r
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
        if (parseFloat(ele.style.left + ele.clientWidth) > limit.offsetLeft + limit.clientWidth - parseFloat(ele.clientWidth)) {\r
          ele.style.left = limit.offsetLeft + limit.clientWidth - parseFloat(ele.clientWidth) + 'px';\r
        }\r
        if (parseFloat(ele.style.top + ele.clientHeight) > limit.offsetTop + limit.clientHeight - parseFloat(ele.clientHeight)) {\r
          ele.style.top = limit.offsetTop + limit.clientHeight - parseFloat(ele.clientHeight) + 'px';\r
        }\r
      }\r
    }\r
  }, false)\r
}`,__vite_glob_0_7=`/**
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
export function base64ToHex(base64) {
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
`,__vite_glob_0_8=`
/**
 * 数字生成器
 * @call const iter = createNum(); iter.next().value;
 */
export function* createNum(n = 0) {
  while (true) {
    yield n;
    n++;
  }
}

/**
 * 数组生成器
 * @param arr 
 */
export function* generateArray<T>(arr: T[]) {
  for (const item of arr) {
    yield item;
  }
}


export function* generateObject<T extends object>(obj: T) {
  for (const key in obj) {
    yield { key, value: obj[key]};
  }
}`,__vite_glob_0_9=`
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

function createChunk(file: File, index: number, chunkSize: number) {
  return new Promise(resovle => {
    const start = index * chunkSize;
    const end = start + chunkSize;
    // const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();
    const blob = file.slice(start, end);
    fileReader.onload = (e) => {
      // spark.append(e.target?.result as ArrayBuffer);
      resovle({
        start,
        end,
        index,
        // hash: spark.end(),
        blob,
      });
    }
    fileReader.readAsArrayBuffer(blob);
  })
}

onmessage = async (e) => {
  const {
    file,
    chunkSize,
    startChunkIndex: start,
    endChunkIndex: end,
  } = e.data;
  const paoms = [];
  for (let i = start; i < end; i++) {
    paoms.push(createChunk(file, i, chunkSize));
  }
  const chunks = await Promise.all(paoms);
  postMessage(chunks);
}

/**
 * 文件分片
 * @param file 
 * @param chunkSize 
 * @returns 
 */
export function cutFile(file: File, chunkSize = 1024*1024*5) {
  return new Promise(resovle => {
    const chunkCount = Math.ceil(file.size / chunkSize);
    const THREAD_COUNT = navigator.hardwareConcurrency || 4;
    const threadChunkCount = Math.ceil(chunkCount / THREAD_COUNT);
    const result = [];
    let finisCount = 0;
    for (let i = 0; i < chunkCount; i++) {
      const worker = new Worker('./worker.js', { type: 'module' });
      const start = i + threadChunkCount;
      let end = (i + 1) * chunkSize;
      if (end > chunkCount) {
        end = chunkCount;
      }
      worker.postMessage({ 
        file,
        chunkSize,
        startChunkIndex: start,
        endChunkIndex: end,
      })
      worker.onmessage = (e) => {
        for (let i = start; i < end; i ++) {
          result[i] = e.data[i - start];
        }
        worker.terminate();
        finisCount ++;
        if (finisCount === THREAD_COUNT) {
          resovle(result);
        }
      }
    }
  })
}
`,__vite_glob_0_10=`
export type Type = 'string'    | 'number'  | 'boolean' |
                   'symbol'    | 'bigint'  |
                   'undefined' | 'null'    |
                   'regexp'    | 'date'    |
                   'array'     | 'object'  |
                   'function'  | 'promise' |
                   'set'       | 'map'     |
                   'weakset'   | 'weakmap' | 'weakref'
/**
 * 判断数据是什么类型
 * @param o 
 * @returns 
 */
export function isType(o: any): Type {
  return Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
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
`,__vite_glob_0_11=`
/**
 * 判断数字是否是一个基数
 * @param num 
 * @returns 
 */
export function isOdd(num: number) {
  // -3 / 2 = -1.5
  return num / 2 === 1 || num % 2 === -1;
}

/**
 * 判断一个数是否为偶数
 * @param num
 * @returns
 */
export function isEven(num: number) {
  const c = num / 2;
  return c / Math.floor(c) === 1 || c === 0;
}

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
`,__vite_glob_0_12=`/**\r
 * 生成随机数\r
 * @param max 最大值（取不到，只可取正整数）\r
 * @param min 最小值\r
 */\r
export function randomNum(max: number, min: number = 0) {\r
  return ~~(Math.random() * (max - min) + min);\r
}\r
\r
/**\r
 * 数字求和\r
 * @param args\r
 */\r
export function sum(...args: number[]) {\r
  return args.reduce((s, e) => s + e, 0);\r
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
`,__vite_glob_0_13=`import { isType } from "./judge";\r
import { AnyObj, BanType } from "./type";\r
\r
declare const FormData: any;\r
\r
/**\r
 * 深度克隆\r
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
\r
/**\r
 * 获取对象的 value 值\r
 * @param obj 要查询的对象\r
 * @param name 对象的 key 值 “a.b”\r
 * @call getValue({a: 1, b: {c: 3}}, 'b.c')  //--> 3\r
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
\r
/**\r
 * 设置对象 value 值\r
 * @param obj  PS: {}\r
 * @param propPath 要改变的 key 值  PS: a 或 b.c\r
 * @param value 设置 value\r
 * @call const obj = {} setNestedPropertyValue(obj, 'a.b', 3)  //--> obj={a: {b: 3}}\r
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
\r
/**\r
 * 创建一个可连续赋值的对象\r
 * @returns \r
 * @call const obj = createAnyObject(); obj.a.b.c = 123\r
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
\r
\r
/**\r
 * 获取一个对象的字节大小\r
 * @param obj \r
 * @returns \r
 */\r
export function getLSUsedSpace(obj: any) {\r
\r
  const length = Object.keys(obj).reduce((total, curKey) => {\r
    if (!obj.hasOwnProperty(curKey)) return total;\r
\r
    if (typeof obj[curKey] === 'string') total += obj[curKey].length + curKey.length;\r
    else total += JSON.stringify(obj[curKey]).replace(/"/g, '').length + curKey.length;\r
\r
    return total;\r
  }, 0);\r
\r
  const symbolLen = Object.getOwnPropertySymbols(obj).reduce((total, curKey) => {\r
    if (!obj.hasOwnProperty(curKey)) return total;\r
\r
    if (typeof obj[curKey] === 'string') total += obj[curKey].length;\r
    else total += JSON.stringify(obj[curKey]).replace(/"/g, '').length;\r
\r
    return total;\r
  }, 0);\r
\r
  return length + symbolLen;\r
}\r
\r
/**\r
 * 判断数据有没有发生变化\r
 * @param x \r
 * @param y \r
 * @returns \r
 */\r
export function hasChange(x: any, y: any) {\r
  if (x === y) {\r
    return x === 0 && 1 / x !== 1 / y;\r
  } else {\r
    return x === x || y === y;\r
  }\r
}\r
`,__vite_glob_0_14=`
declare const window: any, document: any;
const { log: c } = console;

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

    window.load = loadObj;
  }, 0);
})


// 采集JS Error
window.onerror = (errorMsg, url, lineNumber, columnNumber, errorObj) => {
  let errorStack = errorObj ? errorObj.stack : null;
  // 这里进行上报
  c(errorMsg, url, lineNumber, columnNumber, errorStack)
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
  c(errorMsg, errorStack)
}

// 将 script 变为异步加载
export function loadScript(url: string, cb: Function, isMoudule: boolean) {
  var script = document.createElement('script');
  script.src = url;
  if (cb) script.onload = cb;
  if (isMoudule) script.type = 'module';
  script.async = true;
  document.body.appendChild(script);
}

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
 * 延时
 * @param time 
 * @returns 
 */
export function delay(time = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  })
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

/**
 * 函数柯理化
 * @param fn 
 * @param args 
 * @returns 
 */
export function currying(fn: Function, ...args: any[]) {
  return function (...rest: any[]) {
    const allArgs = [...args, ...rest];
    if (allArgs.length >= fn.length) {
      return fn.apply(this, allArgs);
    }
    return currying(fn, ...allArgs);
  }
}

export function runTask(task: Function, callback: Function) {
  // requestIdleCallback(deadline => {
  // 	if (deadline) {
  // 		task();
  // 		callback();
  // 	} else {
  // 		runTask(task, callback);
  // 	}
  // })

  // MessageChannel

  const start = Date.now();
  requestAnimationFrame(() => {
    if (Date.now() - start <= 16.6) {
      task();
      callback();
    } else {
      runTask(task, callback);
    }
  })
}
`,__vite_glob_0_15=`import { PromiseFn } from "./type";

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
`,__vite_glob_0_16=`/**\r
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
\r
/**\r
 * 去除 xml 标签\r
 * @param str \r
 */\r
export function removeXMLTag(str: string) {\r
  return str.replace(/<[^>]+>/g, '');\r
}\r
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
`,__vite_glob_0_17=`import { randomNum } from "./number";\r
\r
/**\r
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
/**\r
 * 生成随机颜色\r
 */\r
export function randomColor(min = '000000', max = 'ffffff') {\r
  const minNumber = parseInt(min, 16), maxNumber = parseInt(max, 16);\r
  return '#' + randomNum(maxNumber, minNumber).toString(16);\r
}\r
\r
/**\r
 * 获取 url query\r
 * @param url \r
 * @returns \r
 */\r
export function parseQuery(url: string) {\r
  const query = {};\r
  url.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (query[k] = v));\r
  return query;\r
}\r
\r
/**\r
 * 生成重复字符串\r
 * @param str 传入字符串\r
 * @param n 重复次数\r
 */\r
export function cerateRepeatStr(str: string, n: number = 1) {\r
  let num = Math.abs(n), res = '';  // 防止传入负数，造成死循环\r
  while (num) {\r
    num % 2 === 1 && (res += str);\r
    num > 1 && (str += str);\r
\r
    num >>= 1;  // 左位移1位\r
  }\r
  return res;\r
}\r
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
\r
/**\r
 * 版本号比较\r
 * @param v1 版本号1\r
 * @param v2 版本号2\r
 * @returns 如果版本号相等，返回 0, 如果第一个版本号低于第二个返回 -1，否则返回 1\r
 */\r
export const compareVersion = (v1: string, v2: string) => {\r
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
\r
/**\r
 * 依次获取版本号值\r
 * @param str 版本号\r
 * @call const iter = walkVersion('1.0.0');\r
 */\r
export function* walkVersion(str: string) {\r
  const terminals = ['.', '-'];\r
  let part = '';\r
  for (let i = 0; i < str.length; i++) {\r
    const value = str[i];\r
    if (terminals.includes(value)) {\r
      yield part;\r
      part = '';\r
    } else {\r
      part += value;\r
    }\r
  }\r
  if (part) yield part;\r
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
\r
/**\r
 * HTML 转 AST 语法树\r
 * @param html\r
 * @returns 返回 AST 语法树\r
 */\r
export function stringToVirtualDOM(html: string = '') {\r
  // 创建一个虚拟 DOM 对象\r
  const virtualDOM: any = {};\r
\r
  // 解析标签名称\r
  const tagRegExp = /<([a-z]+)\\s*[^>]*>/;\r
  const match = html.match(tagRegExp);\r
  if (match) {\r
    virtualDOM.tag = match[1];\r
  }\r
\r
  // 解析属性\r
  const attrRegExp = /\\s*([^=\\s]+)\\s*=\\s*['"]?([^'"\\s]+)['"]?/g;\r
  let attrMatch;\r
  const attrs = {};\r
  while ((attrMatch = attrRegExp.exec(html))) {\r
    attrs[attrMatch[1]] = attrMatch[2];\r
  }\r
  virtualDOM.attrs = attrs;\r
\r
  // 解析子节点\r
  const childrenRegExp = />(.*)<\\/[a-z]+>/s;\r
  const childrenMatch = html.match(childrenRegExp);\r
  if (childrenMatch) {\r
    const childrenStr = childrenMatch[1].trim();\r
    if (childrenStr.length > 0) {\r
      virtualDOM.children = childrenStr.split('\\n').map((childStr) => {\r
        if (tagRegExp.test(childStr)) {\r
          return stringToVirtualDOM(childStr);\r
        } else {\r
          return childStr;\r
        }\r
      });\r
    }\r
  }\r
\r
  return virtualDOM;\r
}\r
\r
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
\r
/**\r
 * 评分\r
 * @param r \r
 * @returns \r
 * @call rate(3) --> 11100\r
 */\r
export function rate(r: number) {\r
  return '1111100000'.slice(5 - r, 10 - r);\r
}\r
`,__vite_glob_0_18=`
// function fn<T>(a: BanType<T, Date>) {}
/**
 * 不能是某种类型
 */
export type BanType<T, E> = T extends E ? never : T


// export type GetOptional<T> = {
//   [K in keyof T as K extends Required<K> ? never : K]: T[K]
// }

// type A = { a: number, b: number, c: string }
// type B = ExcludeKey<A, 'a'>
/**
 * 排除对象中的某个 key
 */
export type ExcludeKey<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>


// type A = { a: number, b: number }
// type B = OptionalType<A, 'a'>
/**
 * 将某些类型转为可选类型
 */
export type OptionalType<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>


// type A = { a?: number, b?: number }
// type B = RequiredType<A, 'a'>
/**
 * 将可选属性转为必填属性
 */
export type RequiredType<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>


// type A = { a: string } | { b: number }
// type B = UnionToIntersection<A>
/**
 * 联合类型转交叉类型
 */
export type UnionToIntersection<T extends Record<string|symbol, any>> =
  (T extends any ? (x: T) => any : never) extends
  (x: infer R) => any ? R : never


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


type Curried<A, R> = A extends []
  ? () => R
  : A extends [infer ARG]
  ? (param: ARG) => R
  : A extends [infer ARG, ...infer REST]
  ? (param: ARG) => Curried<REST, R>
  : never

/**
 * 柯理化函数推导
 * @param fn 
 */
export declare function curry<A extends any[], R>(
  fn: (...args: A) => R
): Curried<A, R>
// function sum(a: string, b: number, c: object) {
//   return 123;
// }
// const currySum = curry(sum);
// currySum('')(1)({})

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
`,__vite_glob_0_19=`type Query = Record<string, string>

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
}`,__vite_glob_1_0=`
export class BloomFilter {

  m:          number
  k:          number
  buckets:    Int8Array | Int16Array | Int32Array | number[]
  _locations: ArrayBuffer | Int8Array | Int16Array | Int32Array | number[]

  /**
   * 布隆过滤器
   * @param m 比特位大小
   * @param k hash 次数
   */
  constructor(m = 1024**2*8, k = 16) {
    const n = Math.ceil(m / 32);
    let i = -1;
    this.m = m = n * 32;
    this.k = k;

    if (typeof ArrayBuffer !== "undefined") {
      const kbytes = 1 << Math.ceil(Math.log(Math.ceil(Math.log(m) / Math.LN2 / 8)) / Math.LN2);
      const UnitArr = kbytes === 1 ? Uint8Array : kbytes === 2 ? Uint16Array : Uint32Array;
      const kbuffer = new ArrayBuffer(kbytes * k);
      const buckets = this.buckets = new Int32Array(n);
      if (m) while (++i < n) buckets[i] = m[i];
      // @ts-ignore
      this._locations = new UnitArr(kbuffer);
    } else {
      const buckets = this.buckets = [];
      if (m) while (++i < n) buckets[i] = m[i];
      else while (++i < n) buckets[i] = 0;
      this._locations = [];
    }
  }

  locations(v: string) {
    const k = this.k,
          m = this.m,
          r = this._locations,
          a = fnv_1a(v),
          b = fnv_1a(v, 1576284489); // The seed value is chosen randomly
    let x = a % m;
    for (let i = 0; i < k; ++i) {
      r[i] = x < 0 ? (x + m) : x;
      x = (x + b) % m;
    }
    return r;
  }

  /**
   * 添加内容
   * @param v 
   */
  add(v: string) {
    const l = this.locations(v);
    for (let i = 0; i < this.k; ++i) {
      this.buckets[Math.floor(l[i] / 32)] |= 1 << (l[i] % 32);
    }
  }

  /**
   * 查看有无添加过该内容
   * @param v 
   * @returns 
   */
  has(v: string) {
    let l = this.locations(v);
    for (let i = 0; i < this.k; ++i) {
      let b = l[i];
      if ((this.buckets[Math.floor(b / 32)] & (1 << (b % 32))) === 0) {
        return false;
      }
    }
    return true;
  }

  /**
   * 删除内容
   * @param v 
   */
  delete(v: string) {
    const l = this.locations(v);
    for (let i = 0; i < this.k; ++i) {
      let b = l[i];
      this.buckets[Math.floor(b / 32)] &= ~(1 << (b % 32));
    }
  }

  /**
   * 清空布隆过滤器
   */
  clear() {
    this.buckets.fill(0);
  }

  /**
   * 获取当前布隆过滤器的大小，单位是bit
   * @returns 
   */
  get size() {
    const buckets = this.buckets,
          len = buckets.length,
          m = this.m,
          k = this.k;
    let bits = 0;
    for (let i = 0, n = len; i < n; ++i) bits += popcnt(buckets[i]);
    return -m * Math.log(1 - bits / m) / k;
  }
}

// http://graphics.stanford.edu/~seander/bithacks.html#CountBitsSetParallel
function popcnt(v: number) {
  v -= (v >> 1) & 0x55555555;
  v = (v & 0x33333333) + ((v >> 2) & 0x33333333);
  return ((v + (v >> 4) & 0xf0f0f0f) * 0x1010101) >> 24;
}

// Fowler/Noll/Vo hashing.
// Nonstandard variation: this function optionally takes a seed value that is incorporated
// into the offset basis. According to http://www.isthe.com/chongo/tech/comp/fnv/index.html
// "almost any offset_basis will serve so long as it is non-zero".
function fnv_1a(v: string, seed = 0) {
  let a = 2166136261 ^ seed;
  for (let i = 0, n = v.length; i < n; ++i) {
    let c = v.charCodeAt(i),
        d = c & 0xff00;
    if (d) a = fnv_multiply(a ^ d >> 8);
    a = fnv_multiply(a ^ c & 0xff);
  }
  return fnv_mix(a);
}

// a * 16777619 mod 2**32
function fnv_multiply(a: number) {
  return a + (a << 1) + (a << 4) + (a << 7) + (a << 8) + (a << 24);
}

// See https://web.archive.org/web/20131019013225/http://home.comcast.net/~bretm/hash/6.html
function fnv_mix(a: number) {
  a += a << 13;
  a ^= a >>> 7;
  a += a << 3;
  a ^= a >>> 17;
  a += a << 5;
  return a & 0xffffffff;
}
`,__vite_glob_1_1=`import { OptionalDeep } from "../../utils/type";

type Option = {
  keywords:          string[]  // 关键字
  multiRowComment:   RegExp    // 多行注释
  singleLineComment: RegExp    // 单行注释
  string:            RegExp    // 字符串
  constant:          RegExp    // 常量
  number:            RegExp    // 数字
  methods:           RegExp    // 方法
  object:            RegExp    // 对象取值
}

type CodeConversionOption = OptionalDeep<Option>

export class CodeConversion {
  _option: Option;
  _textList: { content: string }[];
  constructor(option: CodeConversionOption = {}) {
    this._option = Object.assign({
      keywords: ['import', 'null', 'true', 'false'],  
      multiRowComment: /\\/\\*.*?\\*\\//gs,
      singleLineComment: /\\/\\/[^\\n]+\\n?/g,
      string: /"[^"]*"|'[^']*'/g,
      constant: /(?<=\\s|\\(|\\[|{|,|:|=)[A-Z][\\w|\\d]+/g,
      number: /(?<=\\s|\\(|\\[|{|,|:|=|\\+|-|\\*|\\/|\\%|<|>)\\d*\\.?\\d+/g,
      methods: /\\w+(?=\\()/g,
      object: /\\w*\\./sg,
    }, option);
  }

  /**
   * 公共方法，截断匹配到的正则，处理后重新赋值给 this.textList
   * @param {RegExp} reg 匹配正则
   * @param {String} className 添加类名
   * @param {Null | Array} splice 长度为3的数组，对匹配后的值进行修改（与数组方法 splice 一致）
   */
  _commonDealWith(reg: RegExp, className = '', splice = null) {
    const arr = Object.assign([], this._textList);
    const record = [];
    arr.forEach((val, index) => {
      if (val.delaWith) return;
      
      const noMatching = val.content.split(reg).map(val => ({ content: val }));
      const matching = val.content.match(reg);
      if (!matching) return;

      let insert = 1;
      matching.forEach(val => {
        const content = \`<span class="\${className}">\${splice ? val.slice(splice[0], splice[1]): val}</span>\${splice ? splice[2] : ''}\`;
        noMatching.splice(insert, 0, { delaWith: true, content });
        insert += 2;
      })

      record.push([index, noMatching.length, noMatching]);
    })
    record.forEach((val, index, self) => {
      if (index > 0) {
        const len = self[index - 1][1] - 1;
        val[0] = val[0] + len;
        val[1] = val[1] + len;
      }
      arr.splice(val[0], 1, ...val[2]);
    })
    this._textList = arr;
    return this;
  }

  /**
   * 处理关键字
   */
  _keyword(words) {
    const arr = Object.assign([], this._textList);
    const record = [];
    arr.forEach((val, index) => {
      if (val.delaWith) return;
      
      const reg = eval(\`/(\${words.join('|')})(?=\\\\s)/g\`);
      const newArr = val.content.split(reg);
      newArr.forEach((val, index) => words.includes(val) && newArr.splice(index, 1));
      const noMatching = newArr.map(val => ({ content: val }));

      const matching = val.content.match(reg);
      if (!matching) return;

      let insert = 1;
      matching.forEach(val => {
        noMatching.splice(insert, 0, { delaWith: true, content: \`<span class="keyword">\${val}</span>\` });
        insert = insert + 2;
      })

      record.push([index, noMatching.length, noMatching]);
    })
    record.forEach((val, index, self) => {
      if (index > 0) {
        const len = self[index - 1][1] - 1;
        val[0] = val[0] + len;
        val[1] = val[1] + len;
      }
      arr.splice(val[0], 1, ...val[2]);
    })

    this._textList = arr;
    return this;
  }

  /**
   * 合并成html
   */
  _merge() {
    const html = this._textList.map(val => val.content).join('');
    return \`<div class="code-highlight-container">\${html}</div>\`;
  }

  /**
   * 输出
   * @param text 
   * @returns 
   */
  output(text: string) {
    this._textList = [{ content: text.replace(/</g, '&lt;').replace(/>/g, '&gt;') }];
    const option = this._option;

    return this
      ._commonDealWith(option.multiRowComment, 'block-comment')
      ._commonDealWith(option.singleLineComment, 'line-comment')
      ._commonDealWith(option.string, 'string')
      ._commonDealWith(option.number, 'number')
      ._commonDealWith(option.constant, 'constant')
      ._keyword(option.keywords)
      ._commonDealWith(option.methods, 'methods')
      ._commonDealWith(option.object, 'object')
      ._merge();
  }

}
`,__vite_glob_1_2=`type Callback = (e: CustomEvent) => void
type On = (type: string, callback: Callback, options?: boolean | AddEventListenerOptions) => void
type Off = (type: string) => void

type WaitEventType = Capitalize<keyof HTMLElementEventMap>
type WaitHTMLElement<T extends HTMLElement> = T & { [k in \`wait\${WaitEventType}\`]: Promise<undefined> }

// 改写事件触发形式
export class EventEmitter extends EventTarget {

  /**
   * 发布事件
   * @param type 
   * @param data 
   */
  emit = (type: string, data: any) => {
    this.dispatchEvent(new CustomEvent(type, { detail: data }));
  }

  /**
   * 订阅事件
   * @param type 
   * @param callback 
   */
  on = this.addEventListener as On;

  /**
   * 订阅事件，只触发一次
   * @param type 
   * @param callback 
   */
  once = (type: string, callback: Callback) => {
    this.on(type, callback, { once: true, capture: true });
  }

  /**
   * 取消订阅事件
   * @param type
   */
  off = this.removeEventListener as Off;

  /**
   * 等待事件触发
   * @param el 
   */
  static wait<T extends HTMLElement>(el: T): WaitHTMLElement<T> {
    const p = new Proxy(el, {
      get(target, key: string) {
        if (!key.startsWith('wait')) return;
        const event = key.replace('wait', '').toLowerCase();
        return new Promise((resolve) => {
          target.addEventListener(event, resolve, { once: true });
        })
      }
    })
    return p as WaitHTMLElement<T>;
  }
}
`,__vite_glob_1_3=`import { createArray } from "../../utils/array"

export type Option = {
  el?:     HTMLElement  // 挂载的节点
  column?: number       // 列数
  rowGap?: number       // 横向间距
  colGap?: number       // 纵向间距
}

export class Fulls {

  option: Option
  constructor(option: Option = {}) {
    const { column, rowGap, colGap, el } = option;
    this.option = {
      column: column || 5,
      rowGap: rowGap || 20,
      colGap: colGap || 14,
    }

    if (!el) return;
    el.style.position = 'relative';
    const children = [...el.children];
    const heights = children.map((val: HTMLElement) => val.offsetHeight);
    const { itemWidth, positions, wrapHeight } = this.compute(el.clientWidth, heights);
    children.forEach((val: HTMLElement, i) => {
      val.style.position = 'absolute';
      val.style.width = itemWidth + 'px';
      val.style.top = positions[i].top + 'px';
      val.style.left = positions[i].left + 'px';
    })
    el.style.height = wrapHeight + 'px';
  }

  /**
   * 计算 每一项宽度 / 定位 / 容器高度
   * @param wrapWidth 
   * @param heights 
   * @returns 
   */
  compute(wrapWidth: number, heights: number[]) {
    const itemWidth = this.computeItemWidth(wrapWidth);
    const positions = this.computeItemPosition(heights, itemWidth);
    const wrapHeight = this.computeWrapHeight();
    return {
      itemWidth,
      positions,
      wrapHeight,
    }
  }

  /**
   * 计算每一项的宽度
   * @note 计算设备像素过于精确也容易出现横向滚动条，重写此方法或设置 overflow-x: hidden
   * @param wrapWidth 容器宽度
   * @returns 
   */
  computeItemWidth(wrapWidth: number) {
    const usableWidth = wrapWidth - this.option.rowGap * (this.option.column - 1);
    return usableWidth / this.option.column;
  }

  _matrix: [number][]

  /**
   * 计算每一项的定位
   * @param heightList 
   * @param itemWidth 
   * @returns 
   */
  computeItemPosition(heightList: number[], itemWidth: number) {
    this._matrix = createArray(this.option.column, [0]);
    const result: { top: number, left: number }[] = [];

    for (let i = 0; i < heightList.length; i++) {
      const nowColumn = this._queryColumn('min');
      const top = this._matrix[nowColumn].reduce((a, b) => a + b);
      result.push({
        top: top + this.option.colGap * (this._matrix[nowColumn].length - 1),
        left: nowColumn * (itemWidth + this.option.rowGap),
      })
      this._matrix[nowColumn].push(heightList[i]);
    }

    return result;
  }

  /**
   * 计算容器的高度
   * @returns 
   */
  computeWrapHeight() {
    const maxColumn = this._queryColumn('max');
    return this._matrix[maxColumn].reduce((a, b) => a + b + this.option.rowGap) - this.option.rowGap;
  }

  /**
   * 查找列
   * @param arr 
   * @param type 
   * @returns 
   */
  _queryColumn(type: 'min' | 'max') {
    const collect = createArray(this._matrix.length, 0);
    for (let i = 0; i < this._matrix.length; i++) {
      collect[i] = this._matrix[i].reduce((a, b) => a + b);
    }
    const minNumber = Math[type].apply(null, collect);
    return collect.indexOf(minNumber);
  }

}
`,__vite_glob_1_4=`
export class FullScreen {
  enterFullScreenName: string
  exitFullScreenName:  string
  fullScreenName:      string

  constructor() {
    // 兼容性属性查询
    this.enterFullScreenName = FullScreen.getPropertyName([
      'requestFullscreen',
      'mozRequestFullScreen',
      'webkitRequestFullScreen',
      'msRequestFullScreen',
    ], document.documentElement);
    this.exitFullScreenName = FullScreen.getPropertyName([
      'exitFullscreen',
      'mozCancelFullScreen',
      'webkitExitFullScreen',
      'msExitFullScreen',
    ], document);
    this.fullScreenName = FullScreen.getPropertyName([
      'fullscreenElement',
      'mozFullScreenElement',
      'webkitFullScreenElement',
      'msFullScreenElement',
    ], document);
  }

  static getPropertyName(names: string[], target: object) {
    return names.find(name => name in target);
  }

  /**
   * 进入全屏
   * @param el 
   */
  enter(el = document.documentElement) {
    this.enterFullScreenName && el[this.enterFullScreenName]();
  }

  /**
   * 退出全屏
   */
  exit() {
    this.isFull() && this.exitFullScreenName && document[this.exitFullScreenName]();
  }

  /**
   * 是否处于全屏状态
   * @returns 
   */
  isFull() {
    return !!this.getEl();
  }

  /**
   * 进入/退出全屏
   */
  toggle(el = document.documentElement) {
    this.isFull() ? this.exit() : this.enter(el);
  }

  /**
   * 获取当前全屏元素
   * @returns 
   */
  getEl() {
    return document[this.fullScreenName] || null;
  }

}
`,__vite_glob_1_5=`interface JSTypeMap {
  string:    string
  number:    number
  boolean:   boolean
  object:    object
  function:  Function
  symbol:    symbol
  bigint:    bigint
  undefined: undefined
}
type JSTypeName = keyof JSTypeMap
type ArgsTppe<T extends JSTypeName[]> = {
  [I in keyof T]: JSTypeMap[T[I]]
}

export class FuncOverload {

  /**
   * 函数重载
   */
  constructor() {}

  #map = new Map();

  addImpl<T extends JSTypeName[]>(...args: [...T, (...args: ArgsTppe<T>) => any]) {
    const fn = args.pop();
    if (typeof fn !== 'function') {
      throw new Error('last argument must be a function');
    }

    const key = args.join(',');
    this.#map.set(key, fn);
  }

  overload(...args: any[]) {
    const key = args.map(it => typeof it).join(',')
    const fn = this.#map.get(key);
    if (!fn) {
      throw new Error(\`no implementation for \${key}\`);
    }
    return fn.apply(this, args);
  }

}
`,__vite_glob_1_6=`export class Inlay {
  #map = new Map();
  [k: string]: Function

  /**
   * 内置缓存
   * @call1 const style = new Inlay()
   * @call2 style.a\`color: red;\`
   * @call3 后续访问属性 style.a  ==> color: red;
   */
  constructor() {
    const map = this.#map; 

    return new Proxy(this, {
      get(target, key) {
        if (map.has(key)) return map.get(key);

        Reflect.set(target, key, function (first: string[], ...args: string[]) {
          if (!first) {
            console.warn(\`[\${key.toString()}] is empty\`);
            return;
          }
          let str = '';
          for (let i = 0; i < args.length; i++) {
            str += first[i];
            str += args[i];
          }
          str += first[first.length - 1];
          map.set(key, str);
          return first[0];
        })
        return target[key as string];
      }
    })

  }
}
`,__vite_glob_1_7=`
export class MemoizeMap<K = any, V = any> {
  _isObject(v: unknown): v is object {
    return typeof v === 'object' && v !== null;
  }
  _map     = new Map();
  _weakMap = new WeakMap();

  set(key: K, value: V) {
    if (this._isObject(key)) {
      this._weakMap.set(key, value);
    } else {
      this._map.set(key, value);
    }
  }

  get(key: K) {
    if (this._isObject(key)) {
      this._weakMap.get(key);
    } else {
      this._map.get(key);
    }
  }

  has(key: K) {
    if (this._isObject(key)) {
      this._weakMap.has(key);
    } else {
      this._map.has(key);
    }
  }
}
`,__vite_glob_1_8=`
type Next = () => any
type Middleware<C> = (ctx?: C, next?: null | Next) => void

export class Onion<C> {

  /**
   * 洋葱皮中间件
   * @param context 
   */
  constructor(context: C) {
    this.ctx = context;
  }

  ctx: C
  #performList: Middleware<C>[] = [];  // 执行函数数组

  /**
   * 使用一个中间件
   * @param func 
   */
  use(func: Middleware<C>) {
    this.#performList.push(func);
  }

  /**
   * 回调
   */
  async callback() {
    return await this.#compose(this.#performList, this.ctx, () => {});
  }

  /**
   * 中间件执行队列处理
   * @param middlewareList 中间件list
   * @param ctx 
   * @param next 
   * @returns 
   */
  #compose(middlewareList: Middleware<C>[], ctx: C, next: Next) {
    function dispatch(i: number) {
      let fn = middlewareList[i];
      if (i === middlewareList.length) fn = next;
      return Promise.resolve(fn(ctx, dispatch.bind(null, ++i)));
    }
    return dispatch(0);
  }
}`,__vite_glob_1_9=`
type BaseMap = {
  [k: string]: any[];
}
const { warn } = console;

export class PublishSubscribe<M extends BaseMap> {
  /**
   * 发布订阅
   */
  constructor() {}
  #map: Map<string, { fn: Function, once?: boolean }> = new Map();

  /**
   * 注册事件
   * @param name 
   * @param fn 
   */
  on<K extends keyof M & string>(name: K, fn: (...args: M[K]) => void) {
    if (this.#map.has(name)) {
      warn(\`\${name} already exists\`);
    }
    this.#map.set(name, { fn });
  }

  /**
   * 只订阅一次
   * @param name
   * @param fn
   */
  once<K extends keyof M & string>(name: K, fn: (...args: M[K]) => void) {
    if (this.#map.has(name)) {
      warn(\`\${name} already exists\`);
      return;
    }
    this.#map.set(name, { fn, once: true });
  }

  /**
   * 发送事件
   * @param name 
   * @param args 
   * @returns 
   */
  emit<K extends keyof M & string>(name: K, ...args: M[K]) {
    const val = this.#map.get(name);
    if (!val) {
      warn(\`no implementation for \${name}\`);
      return;
    }
    const result = val.fn(...args);
    if (val.once) {
      this.#map.delete(name);
    }
    return result;
  }

  /**
   * 取消订阅
   * @param name 
   */
  off<K extends keyof M & string>(name: K) {
    this.#map.delete(name);
  }

  /**
   * 取消所有订阅
   */
  offAll() {
    this.#map.clear();
  }

  /**
   * 重置事件
   * @param name 
   * @param fn 
   * @param once 
   */
  reset<K extends keyof M & string>(name: K, fn: (...args: M[K]) => void, once = false) {
    if (!this.#map.has(name)) {
      warn(\`\${name} not exists\`);
      return;
    }
    this.#map.set(name, { fn, once });
  }

}
`,__vite_glob_1_10=`
type StreamSplitOption = {
  normal?:    RegExp
  onMessage?: (str: string) => void
}

export class StreamSplit {
  option: StreamSplitOption = {
    normal: /data:(.+)?\\n\\n/,
  }
  /**
   * 事件流分割
   * @param option 
   */
  constructor(option: StreamSplitOption = {}) {
    Object.assign(this.option, option);
  }

  _text = '';

  /**
   * 追加字符
   * @param str 
   * @returns 匹配到的内容
   */
  add(str: string) {
    this._text += str;
    const { normal, onMessage } = this.option;
    const collect = [];  // 收集内容

    for (;;) {
      const matched = this._text.match(normal);
      if (!matched) break;
      const content = matched[1];
      collect.push(content);
      this._text = this._text.slice(matched[0].length);
      onMessage && onMessage(content);
    }

    return collect;
  }
}
`,__vite_glob_1_11=`import { PromiseFn } from "../../utils/type"

type TaskItem = {
  task:    PromiseFn
  resolve: Function
  reject:  Function
}

export class TaskScheduling {
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



export class TaskSchedulings extends TaskScheduling {
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
`,__vite_glob_2_0=`import { BloomFilter } from ".";

export default () => {
  const bloom = new BloomFilter(1024 * 8, 32);
  bloom.add('foo');
  bloom.add("bar");

  const wrap = document.getElementById('container');
  wrap.innerText += bloom.has('foo') + '\\n';
  wrap.innerText += bloom.has('bar') + '\\n';
  wrap.innerText += bloom.has('baz') + '\\n';
}
`,__vite_glob_2_1=`import { CodeConversion } from '.';

export default () => {
  const code = \`
/*
金融机构大额交易和可疑交易报告管理办法
第五条　金融机构应当报告下列大额交易：
*/

knowledgebase DEJY
knowledge regulatedContract = ["financialTransaction"];
knowledge functionWithoutReport = ["normalTransaction"];
knowledge XJSZ = ["XJJC", "XJZQ", "XJJSH", "XCDH", "XJHK", "XJPJJF"];
// 现金收支：现金缴存、现金支取、现金结售汇、现钞兑换、现金汇款、现金票据解付
end 

rule DEJY5
reg contract(tx.to).name in knowledgebase(DEJY).regulatedContract and tx.function in knowledgebase(DEJY).functionWithoutReport:
prohibit tx.args.txtype in knowledgebase(DEJY).XJSZ and 
    (tx.args.currency == "RMB" and tx.args.amount >= 50000) or (tx.args.currency == "USD" and tx.args.amount >= 10000);
prohibit (tx.args.txtype == "JNKXHZ" or tx.args.txtype == "KJKXHZ") and contract(tx.to).state.accountType[tx.args.account] == "Non-person" and 
    ((tx.args.currency == "RMB" and tx.args.amount >= 2000000) or (tx.args.currency == "USD" and tx.args.amount >= 200000));
prohibit tx.args.txtype == "JNKXHZ" and contract(tx.to).state.accountType[tx.args.account] == "Person" and 
    ((tx.args.currency == "RMB" and tx.args.amount >= 500000) or (tx.args.currency == "USD" and tx.args.amount >= 100000));
prohibit tx.args.txtype == "KJKXHZ" and contract(tx.to).state.accountType[tx.args.account] == "Person" and 
    ((tx.args.currency == "RMB" and tx.args.amount >= 200000) or (tx.args.currency == "USD" and tx.args.amount >= 10000));
end 
\`

  const conversion = new CodeConversion({
    keywords: ['rule', 'end', 'knowledgebase', 'knowledge', 'reg', 'require', 'prohibit', 'and', 'or', 'in', 'true', 'false'],
  });
  const html = conversion.output(code);

  document.getElementById('container').innerHTML = \`<pre>\${html}</pre>\`;
}`,__vite_glob_2_2=`import { EventEmitter } from ".";

export default () => {
  const container = document.getElementById('container');
  const em = new EventEmitter();

  // 订阅发布事件
  const button = document.createElement('button');
  button.innerText = 'send';
  button.addEventListener('click', () => {
    em.emit('send', 'hello world!');
  })
  container.appendChild(button);

  em.on('send', (e: CustomEvent) => {
    const p = document.createElement('p');
    p.innerText = e.detail;
    container.appendChild(p);
  })


  // 等待事件触发
  const button2 = document.createElement('button');
  button2.innerText = 'wait event';
  const btn = EventEmitter.wait(button2);
  container.appendChild(button2);
  (async function() {
    while (1) {
      const e = await btn.waitClick;
      console.log(e);
    }
  }())
}`,__vite_glob_2_3=`import { Fulls } from ".";

export default () => {
  const wrap = document.createElement('div');

  const arr = [200, 300, 270, 100, 400, 100, 200, 300, 100, 140];
  arr.forEach((val, i) => {
    const div = document.createElement('div');
    div.innerText = i+'';
    div.style.height = \`\${val}px\`;
    div.style.background = '#eee';
    wrap.appendChild(div);
  })

  document.getElementById('container').appendChild(wrap);

  new Fulls({
    el: wrap,
    column: Math.max(Math.trunc(wrap.offsetWidth / 200), 2),
  })
}
`,__vite_glob_2_4=`import { FullScreen } from '.';

export default () => {
  const container = document.getElementById('container');
  const fullScreen = new FullScreen();
  const list = [
    { name: '进入全屏', handler: () => fullScreen.enter(), },
    { name: '退出全屏', handler: () => fullScreen.exit(), },
    { name: '进入/退出全屏', handler: () => fullScreen.toggle(), },
    { name: '是否处于全屏状态全屏', handler: () => console.log(fullScreen.isFull()), },
    { name: '指定元素进入/退出全屏', handler: () => fullScreen.toggle(container), },
  ]

  const wrap = document.createElement('div');
  list.forEach(val => {
    const button = document.createElement('button');
    button.innerText = val.name;
    button.addEventListener('click', () => {
      val.handler();
    });
    wrap.appendChild(button);
  })

  container.appendChild(wrap);
}`,__vite_glob_2_5=`import { FuncOverload } from "."

export default () => {
  const f = new FuncOverload();

  f.addImpl('number', 'number', (a, b) => {
    return a + b
  })
  const sum = f.overload(1, 2);

  f.addImpl('string', 'string', (a, b) => {
    return 'str: ' + a + b
  })
  const str = f.overload('a', 'b');

  document.getElementById('container').innerHTML = \`\${sum}<br/>\${str}\`;
}`,__vite_glob_2_6=`import { Inlay } from ".";

export default () => {
  const container = document.getElementById('container');
  container.innerText = 'hello';

  const inlay = new Inlay();
  inlay.text\`
    --color: red;
    color: var(--color);
  \`

  // @ts-ignore
  container.style = inlay.text;
}`,__vite_glob_2_7=`import { MemoizeMap } from '.'

export default () => {
  const m = new MemoizeMap();
  m.set('a', 1);
  m.set({}, 2);
}`,__vite_glob_2_8=`import { Onion } from '.'

export default () => {
  const ctx = {
    a: 123,
    el: document.getElementById('container'),
  }
  const onion = new Onion(ctx);

  onion.use((ctx, next) => {
    ctx.el.innerText += ctx.a;
    ctx.a = 456;
    next();
    ctx.el.innerText += 'end';
  })

  onion.use((ctx, next) => {
    ctx.el.innerText += ctx.a;
  })

  onion.callback();
}
`,__vite_glob_2_9=`import { PublishSubscribe } from "."

export default () => {
  const pubSub = new PublishSubscribe();

  const container = document.getElementById('container');
  const messages = document.createElement('div');
  pubSub.on('test', (data) => {
    messages.innerText += data + '\\n';
  })

  const button = document.createElement('button');
  button.innerText = '发送事件';
  button.addEventListener('click', () => {
    pubSub.emit('test', 'hello world');
  });

  container.appendChild(button);
  container.appendChild(messages);
}
`,__vite_glob_2_10=`import { StreamSplit } from ".";
import { delay } from "../../utils/async";

export default () => {
  const container = document.getElementById('container');
  const stream = new StreamSplit({
    onMessage(msg) {
      const json = JSON.parse(msg);
      const text = document.createTextNode(json.data);
      container.appendChild(text);
    }
  });

  // 模拟 EventSource 流数据
  (async function () {
    const arr = ['hello', ', ', 'world', '!'];
    for (const val of arr) {
      const data = {
        data: val,
        time: Date.now(),
      }
      stream.add(\`data:\${JSON.stringify(data)}\\n\\n\`);
      await delay(100);
    }
  })()
}`,__vite_glob_2_11=`import { TaskSchedulings } from ".";
import { delay } from "../../utils/async";

export default () => {
  const task = new TaskSchedulings([3, 3, 1], true);
  console.time('task');
  task.add(func(1000));
  task.add(func(2000));
  task.add(func(1500));
  task.add(func(2500)).then(res => console.timeEnd('task'));
  task.add(func(1800));
  task.add(func(200));
  task.add(func(300));

  const container = document.getElementById('container');
  function func(num: number) {
    return async () => {
      await delay(num);
      const p = document.createElement('p');
      p.innerText = \`delay: \${num}\`;
      container.appendChild(p);
      return num;
    }
  }
}`;class BloomFilter{constructor(n=1024**2*8,e=16){u(this,"m");u(this,"k");u(this,"buckets");u(this,"_locations");const t=Math.ceil(n/32);let r=-1;if(this.m=n=t*32,this.k=e,typeof ArrayBuffer<"u"){const i=1<<Math.ceil(Math.log(Math.ceil(Math.log(n)/Math.LN2/8))/Math.LN2),s=i===1?Uint8Array:i===2?Uint16Array:Uint32Array,a=new ArrayBuffer(i*e),l=this.buckets=new Int32Array(t);if(n)for(;++r<t;)l[r]=n[r];this._locations=new s(a)}else{const i=this.buckets=[];if(n)for(;++r<t;)i[r]=n[r];else for(;++r<t;)i[r]=0;this._locations=[]}}locations(n){const e=this.k,t=this.m,r=this._locations,i=fnv_1a(n),s=fnv_1a(n,1576284489);let a=i%t;for(let l=0;l<e;++l)r[l]=a<0?a+t:a,a=(a+s)%t;return r}add(n){const e=this.locations(n);for(let t=0;t<this.k;++t)this.buckets[Math.floor(e[t]/32)]|=1<<e[t]%32}has(n){let e=this.locations(n);for(let t=0;t<this.k;++t){let r=e[t];if(!(this.buckets[Math.floor(r/32)]&1<<r%32))return!1}return!0}delete(n){const e=this.locations(n);for(let t=0;t<this.k;++t){let r=e[t];this.buckets[Math.floor(r/32)]&=~(1<<r%32)}}clear(){this.buckets.fill(0)}get size(){const n=this.buckets,e=n.length,t=this.m,r=this.k;let i=0;for(let s=0,a=e;s<a;++s)i+=popcnt(n[s]);return-t*Math.log(1-i/t)/r}}function popcnt(o){return o-=o>>1&1431655765,o=(o&858993459)+(o>>2&858993459),(o+(o>>4)&252645135)*16843009>>24}function fnv_1a(o,n=0){let e=2166136261^n;for(let t=0,r=o.length;t<r;++t){let i=o.charCodeAt(t),s=i&65280;s&&(e=fnv_multiply(e^s>>8)),e=fnv_multiply(e^i&255)}return fnv_mix(e)}function fnv_multiply(o){return o+(o<<1)+(o<<4)+(o<<7)+(o<<8)+(o<<24)}function fnv_mix(o){return o+=o<<13,o^=o>>>7,o+=o<<3,o^=o>>>17,o+=o<<5,o&4294967295}const demo$f=()=>{const o=new BloomFilter(8192,32);o.add("foo"),o.add("bar");const n=document.getElementById("container");n.innerText+=o.has("foo")+`
`,n.innerText+=o.has("bar")+`
`,n.innerText+=o.has("baz")+`
`},__vite_glob_3_0=Object.freeze(Object.defineProperty({__proto__:null,default:demo$f},Symbol.toStringTag,{value:"Module"})),demo$e=()=>{const o=`
/*
金融机构大额交易和可疑交易报告管理办法
第五条　金融机构应当报告下列大额交易：
*/

knowledgebase DEJY
knowledge regulatedContract = ["financialTransaction"];
knowledge functionWithoutReport = ["normalTransaction"];
knowledge XJSZ = ["XJJC", "XJZQ", "XJJSH", "XCDH", "XJHK", "XJPJJF"];
// 现金收支：现金缴存、现金支取、现金结售汇、现钞兑换、现金汇款、现金票据解付
end 

rule DEJY5
reg contract(tx.to).name in knowledgebase(DEJY).regulatedContract and tx.function in knowledgebase(DEJY).functionWithoutReport:
prohibit tx.args.txtype in knowledgebase(DEJY).XJSZ and 
    (tx.args.currency == "RMB" and tx.args.amount >= 50000) or (tx.args.currency == "USD" and tx.args.amount >= 10000);
prohibit (tx.args.txtype == "JNKXHZ" or tx.args.txtype == "KJKXHZ") and contract(tx.to).state.accountType[tx.args.account] == "Non-person" and 
    ((tx.args.currency == "RMB" and tx.args.amount >= 2000000) or (tx.args.currency == "USD" and tx.args.amount >= 200000));
prohibit tx.args.txtype == "JNKXHZ" and contract(tx.to).state.accountType[tx.args.account] == "Person" and 
    ((tx.args.currency == "RMB" and tx.args.amount >= 500000) or (tx.args.currency == "USD" and tx.args.amount >= 100000));
prohibit tx.args.txtype == "KJKXHZ" and contract(tx.to).state.accountType[tx.args.account] == "Person" and 
    ((tx.args.currency == "RMB" and tx.args.amount >= 200000) or (tx.args.currency == "USD" and tx.args.amount >= 10000));
end 
`,e=new CodeConversion({keywords:["rule","end","knowledgebase","knowledge","reg","require","prohibit","and","or","in","true","false"]}).output(o);document.getElementById("container").innerHTML=`<pre>${e}</pre>`},__vite_glob_3_1=Object.freeze(Object.defineProperty({__proto__:null,default:demo$e},Symbol.toStringTag,{value:"Module"}));class EventEmitter extends EventTarget{constructor(){super(...arguments);u(this,"emit",(e,t)=>{this.dispatchEvent(new CustomEvent(e,{detail:t}))});u(this,"on",this.addEventListener);u(this,"once",(e,t)=>{this.on(e,t,{once:!0,capture:!0})});u(this,"off",this.removeEventListener)}static wait(e){return new Proxy(e,{get(r,i){if(!i.startsWith("wait"))return;const s=i.replace("wait","").toLowerCase();return new Promise(a=>{r.addEventListener(s,a,{once:!0})})}})}}const demo$d=()=>{const o=document.getElementById("container"),n=new EventEmitter,e=document.createElement("button");e.innerText="send",e.addEventListener("click",()=>{n.emit("send","hello world!")}),o.appendChild(e),n.on("send",i=>{const s=document.createElement("p");s.innerText=i.detail,o.appendChild(s)});const t=document.createElement("button");t.innerText="wait event";const r=EventEmitter.wait(t);o.appendChild(t),async function(){for(;;){const i=await r.waitClick;console.log(i)}}()},__vite_glob_3_2=Object.freeze(Object.defineProperty({__proto__:null,default:demo$d},Symbol.toStringTag,{value:"Module"}));function isType(o){return Object.prototype.toString.call(o).slice(8,-1).toLowerCase()}function deepClone(o){const n=new WeakMap,e=["null","weakset","weakmap"],t={set(i){const s=new Set;for(const a of i)s.add(r(a));return s},map(i){const s=new Map;for(const[a,l]of i.entries())s.set(a,r(l));return s}};function r(i){const s=isType(i);if(typeof i!="object"||e.includes(s))return i;if(n.has(i))return n.get(i);if(t[s])return t[s](i);const a=Array.isArray(i)?[]:{};Object.setPrototypeOf(a,Object.getPrototypeOf(i)),n.set(i,a);for(const l in i)a[l]=r(i[l]);return a}return r(o)}function priorityObject(o,n){return new Proxy(o,{get(t,r){const i=t[r];return typeof i=="object"?Array.isArray(t)&&!n[r]?priorityObject(i,n[0]):priorityObject(i,n[r]):i===void 0?n[r]:i}})}function createArray(o,n=void 0){const e=new Array(o);let t=0;for(;t<e.length;)e[t]=deepClone(n),t++;return e}class Fulls{constructor(n={}){u(this,"option");u(this,"_matrix");const{column:e,rowGap:t,colGap:r,el:i}=n;if(this.option={column:e||5,rowGap:t||20,colGap:r||14},!i)return;i.style.position="relative";const s=[...i.children],a=s.map(d=>d.offsetHeight),{itemWidth:l,positions:c,wrapHeight:m}=this.compute(i.clientWidth,a);s.forEach((d,f)=>{d.style.position="absolute",d.style.width=l+"px",d.style.top=c[f].top+"px",d.style.left=c[f].left+"px"}),i.style.height=m+"px"}compute(n,e){const t=this.computeItemWidth(n),r=this.computeItemPosition(e,t),i=this.computeWrapHeight();return{itemWidth:t,positions:r,wrapHeight:i}}computeItemWidth(n){return(n-this.option.rowGap*(this.option.column-1))/this.option.column}computeItemPosition(n,e){this._matrix=createArray(this.option.column,[0]);const t=[];for(let r=0;r<n.length;r++){const i=this._queryColumn("min"),s=this._matrix[i].reduce((a,l)=>a+l);t.push({top:s+this.option.colGap*(this._matrix[i].length-1),left:i*(e+this.option.rowGap)}),this._matrix[i].push(n[r])}return t}computeWrapHeight(){const n=this._queryColumn("max");return this._matrix[n].reduce((e,t)=>e+t+this.option.rowGap)-this.option.rowGap}_queryColumn(n){const e=createArray(this._matrix.length,0);for(let r=0;r<this._matrix.length;r++)e[r]=this._matrix[r].reduce((i,s)=>i+s);const t=Math[n].apply(null,e);return e.indexOf(t)}}const demo$c=()=>{const o=document.createElement("div");[200,300,270,100,400,100,200,300,100,140].forEach((e,t)=>{const r=document.createElement("div");r.innerText=t+"",r.style.height=`${e}px`,r.style.background="#eee",o.appendChild(r)}),document.getElementById("container").appendChild(o),new Fulls({el:o,column:Math.max(Math.trunc(o.offsetWidth/200),2)})},__vite_glob_3_3=Object.freeze(Object.defineProperty({__proto__:null,default:demo$c},Symbol.toStringTag,{value:"Module"}));class FullScreen{constructor(){u(this,"enterFullScreenName");u(this,"exitFullScreenName");u(this,"fullScreenName");this.enterFullScreenName=FullScreen.getPropertyName(["requestFullscreen","mozRequestFullScreen","webkitRequestFullScreen","msRequestFullScreen"],document.documentElement),this.exitFullScreenName=FullScreen.getPropertyName(["exitFullscreen","mozCancelFullScreen","webkitExitFullScreen","msExitFullScreen"],document),this.fullScreenName=FullScreen.getPropertyName(["fullscreenElement","mozFullScreenElement","webkitFullScreenElement","msFullScreenElement"],document)}static getPropertyName(n,e){return n.find(t=>t in e)}enter(n=document.documentElement){this.enterFullScreenName&&n[this.enterFullScreenName]()}exit(){this.isFull()&&this.exitFullScreenName&&document[this.exitFullScreenName]()}isFull(){return!!this.getEl()}toggle(n=document.documentElement){this.isFull()?this.exit():this.enter(n)}getEl(){return document[this.fullScreenName]||null}}const demo$b=()=>{const o=document.getElementById("container"),n=new FullScreen,e=[{name:"进入全屏",handler:()=>n.enter()},{name:"退出全屏",handler:()=>n.exit()},{name:"进入/退出全屏",handler:()=>n.toggle()},{name:"是否处于全屏状态全屏",handler:()=>console.log(n.isFull())},{name:"指定元素进入/退出全屏",handler:()=>n.toggle(o)}],t=document.createElement("div");e.forEach(r=>{const i=document.createElement("button");i.innerText=r.name,i.addEventListener("click",()=>{r.handler()}),t.appendChild(i)}),o.appendChild(t)},__vite_glob_3_4=Object.freeze(Object.defineProperty({__proto__:null,default:demo$b},Symbol.toStringTag,{value:"Module"}));var D;class FuncOverload{constructor(){M(this,D,new Map)}addImpl(...n){const e=n.pop();if(typeof e!="function")throw new Error("last argument must be a function");const t=n.join(",");x(this,D).set(t,e)}overload(...n){const e=n.map(r=>typeof r).join(","),t=x(this,D).get(e);if(!t)throw new Error(`no implementation for ${e}`);return t.apply(this,n)}}D=new WeakMap;const demo$a=()=>{const o=new FuncOverload;o.addImpl("number","number",(t,r)=>t+r);const n=o.overload(1,2);o.addImpl("string","string",(t,r)=>"str: "+t+r);const e=o.overload("a","b");document.getElementById("container").innerHTML=`${n}<br/>${e}`},__vite_glob_3_5=Object.freeze(Object.defineProperty({__proto__:null,default:demo$a},Symbol.toStringTag,{value:"Module"}));var H;class Inlay{constructor(){M(this,H,new Map);const n=x(this,H);return new Proxy(this,{get(e,t){return n.has(t)?n.get(t):(Reflect.set(e,t,function(r,...i){if(!r){console.warn(`[${t.toString()}] is empty`);return}let s="";for(let a=0;a<i.length;a++)s+=r[a],s+=i[a];return s+=r[r.length-1],n.set(t,s),r[0]}),e[t])}})}}H=new WeakMap;const demo$9=()=>{const o=document.getElementById("container");o.innerText="hello";const n=new Inlay;n.text`
    --color: red;
    color: var(--color);
  `,o.style=n.text},__vite_glob_3_6=Object.freeze(Object.defineProperty({__proto__:null,default:demo$9},Symbol.toStringTag,{value:"Module"}));class MemoizeMap{constructor(){u(this,"_map",new Map);u(this,"_weakMap",new WeakMap)}_isObject(n){return typeof n=="object"&&n!==null}set(n,e){this._isObject(n)?this._weakMap.set(n,e):this._map.set(n,e)}get(n){this._isObject(n)?this._weakMap.get(n):this._map.get(n)}has(n){this._isObject(n)?this._weakMap.has(n):this._map.has(n)}}const demo$8=()=>{const o=new MemoizeMap;o.set("a",1),o.set({},2)},__vite_glob_3_7=Object.freeze(Object.defineProperty({__proto__:null,default:demo$8},Symbol.toStringTag,{value:"Module"}));var F,X,U;class Onion{constructor(n){M(this,X);u(this,"ctx");M(this,F,[]);this.ctx=n}use(n){x(this,F).push(n)}async callback(){return await q(this,X,U).call(this,x(this,F),this.ctx,()=>{})}}F=new WeakMap,X=new WeakSet,U=function(n,e,t){function r(i){let s=n[i];return i===n.length&&(s=t),Promise.resolve(s(e,r.bind(null,++i)))}return r(0)};const demo$7=()=>{const o={a:123,el:document.getElementById("container")},n=new Onion(o);n.use((e,t)=>{e.el.innerText+=e.a,e.a=456,t(),e.el.innerText+="end"}),n.use((e,t)=>{e.el.innerText+=e.a}),n.callback()},__vite_glob_3_8=Object.freeze(Object.defineProperty({__proto__:null,default:demo$7},Symbol.toStringTag,{value:"Module"})),{warn}=console;var C;class PublishSubscribe{constructor(){M(this,C,new Map)}on(n,e){x(this,C).has(n)&&warn(`${n} already exists`),x(this,C).set(n,{fn:e})}once(n,e){if(x(this,C).has(n)){warn(`${n} already exists`);return}x(this,C).set(n,{fn:e,once:!0})}emit(n,...e){const t=x(this,C).get(n);if(!t){warn(`no implementation for ${n}`);return}const r=t.fn(...e);return t.once&&x(this,C).delete(n),r}off(n){x(this,C).delete(n)}offAll(){x(this,C).clear()}reset(n,e,t=!1){if(!x(this,C).has(n)){warn(`${n} not exists`);return}x(this,C).set(n,{fn:e,once:t})}}C=new WeakMap;const demo$6=()=>{const o=new PublishSubscribe,n=document.getElementById("container"),e=document.createElement("div");o.on("test",r=>{e.innerText+=r+`
`});const t=document.createElement("button");t.innerText="发送事件",t.addEventListener("click",()=>{o.emit("test","hello world")}),n.appendChild(t),n.appendChild(e)},__vite_glob_3_9=Object.freeze(Object.defineProperty({__proto__:null,default:demo$6},Symbol.toStringTag,{value:"Module"}));class StreamSplit{constructor(n={}){u(this,"option",{normal:/data:(.+)?\n\n/});u(this,"_text","");Object.assign(this.option,n)}add(n){this._text+=n;const{normal:e,onMessage:t}=this.option,r=[];for(;;){const i=this._text.match(e);if(!i)break;const s=i[1];r.push(s),this._text=this._text.slice(i[0].length),t&&t(s)}return r}}function delay(o){return new Promise(n=>setTimeout(n,o))}const demo$5=()=>{const o=document.getElementById("container"),n=new StreamSplit({onMessage(e){const t=JSON.parse(e),r=document.createTextNode(t.data);o.appendChild(r)}});(async function(){const e=["hello",", ","world","!"];for(const t of e){const r={data:t,time:Date.now()};n.add(`data:${JSON.stringify(r)}

`),await delay(100)}})()},__vite_glob_3_10=Object.freeze(Object.defineProperty({__proto__:null,default:demo$5},Symbol.toStringTag,{value:"Module"}));class TaskScheduling{constructor(n=5){u(this,"_parallelCount");u(this,"_runingCount",0);u(this,"tasks",[]);this._parallelCount=n}add(n){const e=new Promise((t,r)=>{this.tasks.push({task:n,resolve:t,reject:r})});return this._run(),e}_run(){for(;this.tasks.length>this._runingCount&&this._runingCount<this._parallelCount;){const{task:n,resolve:e,reject:t}=this.tasks[this._runingCount];this._runingCount++,n().then(r=>e(r)).catch(r=>t(r)).finally(()=>{this._continue()})}}_continue(){this._parallelCount++,this._run()}}var B;class TaskSchedulings extends TaskScheduling{constructor(e,t=!1){e.forEach((r,i,s)=>{i!==0&&(s[i]=r+s[i-1])});super();u(this,"_parallelCountList");u(this,"_parallelListIndex",0);u(this,"_executeCount",0);u(this,"_isAwait");M(this,B,null);this._parallelCountList=e,this._isAwait=t,W(this,B,this._run),this._run=()=>{this._parallelCount=this._parallelCountList[this._parallelListIndex],x(this,B).call(this)}}_continue(){if(this._executeCount++,this._isAwait){if(this._executeCount===this._parallelCount){this._parallelListIndex++,this._run();return}}else this._runingCount===this._parallelCount&&(this._parallelListIndex++,this._run());this._parallelCount++,this._run()}}B=new WeakMap;const demo$4=()=>{const o=new TaskSchedulings([3,3,1],!0);console.time("task"),o.add(e(1e3)),o.add(e(2e3)),o.add(e(1500)),o.add(e(2500)).then(t=>console.timeEnd("task")),o.add(e(1800)),o.add(e(200)),o.add(e(300));const n=document.getElementById("container");function e(t){return async()=>{await delay(t);const r=document.createElement("p");return r.innerText=`delay: ${t}`,n.appendChild(r),t}}},__vite_glob_3_11=Object.freeze(Object.defineProperty({__proto__:null,default:demo$4},Symbol.toStringTag,{value:"Module"})),__vite_glob_4_0=`# 布隆过滤器

## Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| m | 比特位大小 | \`number\` | 1024*\\*2\\*8 | - |
| k | hash 次数 | \`number\` | 16 | - |

## 说明

为解决数据量太大，导致内存占用过大的问题。

1. 布隆过滤器是一种空间效率高的概率数据结构，用于判断一个元素是否在一个集合中；
2. 可以用来判断一个元素是否在一个集合中，但不能保证100%准确，但是可以保证百分之99.99的准确率。
`,__vite_glob_4_1=`# 自定义代码高亮

## Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| keywords | 关键字 | \`string[]\` | - | - |
| multiRowComment | 多行注释 | \`regexp\` | - | - |
| singleLineComment | 单行注释 | \`regexp\` | - | - |
| string | 字符串 | \`regexp\` | - | - |
| number | 单行注释 | \`regexp\` | - | - |
| methods | 方法调用 | \`regexp\` | - | - |
| object | 对象取值 | \`regexp\` | - | - |

## 说明

只是一个简单的代码高亮函数，没有对标签做高亮。
如有特殊情况请重写 output 方法

\`\`\`ts
class CodeConversion2 extends CodeConversion {
  constructor() {
    super(option);  // 自定义规则
  }
  output(text: string): string {
    this._textList = [{ content: text.replace(/</g, '&lt;').replace(/>/g, '&gt;') }];
    const option = this._option;

    // 调整调用顺序
    return this
      ._commonDealWith(option.string, 'string')
      ._commonDealWith(option.multiRowComment, 'block-comment')
      ._commonDealWith(option.singleLineComment, 'line-comment')
      ._commonDealWith(option.number, 'number')
      ._keyword(option.keywords)
      ._commonDealWith(option.methods, 'methods')
      ._commonDealWith(option.object, 'object')
      ._merge();
  }
}

const conversion = new CodeConversion2();
conversion.output(\`code\`)
\`\`\`
`,__vite_glob_4_2=`# 事件触发形式

## Methods

| 方法名 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| on | 接收消息 | \`(type, callback)\` | - |
| off | 关闭接收消息通道 | \`(type)\` | - |
| emit | 发送消息 | \`(type, data)\` | - |
| once | 只接收一次消息 | \`(type, callback)\` | - |
| static wait | 给元素注册等待事件 | \`(ele)\` | - |
`,__vite_glob_4_3=`# 瀑布流布局

## Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| el | 可操作节点 | HTMLElement | - | 该节点下必须具有子节点，不传递时可调用内置方法进行计算 |
| column | 列数 | number | 3 | - |
| rowGap | 横向间距 | number | 20 | 单位（px） |
| colGap | 纵向间距 | number | 14 | 单位（px） |

## Methods

| 方法名 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| compute | 计算 每一项宽度 / 定位 / 容器高度 | \`(wrapWidth, heights)\` | - |

## 自行计算

\`\`\`ts
const wrapWidth = 1000;  // 容器宽度
const heights = [200, 300, 270, 100, 400, 100, 200, 300, 100, 140];  // 每一项的高度

const fulls = new Fulls();
const { itemWidth, positions, wrapHeight } = fulls.compute(wrapWidth, heights);
console.log(
  itemWidth,   // 每一项的宽度
  positions,   // 每一项的定位
  wrapHeight,  // 容器的高度
);
//--> 184 (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}] 540
\`\`\`
`,__vite_glob_4_4=`# 全屏控制

## 说明

该 API 对原生事件做了兼容处理 
`,__vite_glob_4_5=`# 函数重载

## Methods

| 方法名 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| addImpl | 添加重载函数 | \`(...args)\` | 最后一个参数为函数 |
| overload | 调用已注册的重载函数 | \`(...args)\` | 对应注册时参数类型 |
`,__vite_glob_4_6="",__vite_glob_4_7=`# 记忆 Map
`,__vite_glob_4_8=`# 洋葱皮式中间件
`,__vite_glob_4_9=`# 发布订阅

## Methods

| 方法名 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| on | 注册事件 | \`( name: string, fn: (...args: any[]) => void )\` | |
| once | 注册一次性事件 | \`( name: string, fn: (...args: any[]) => void )\` | |
| emit | 发送事件 | \`( name: string, ...args: any[]) => void)\` | |
| off | 关闭事件 | \`( name: string, fn: (...args: any[]) => void )\` | |
| offAll | 关闭所有事件 | | |
| reset | 重置已注册的事件 | \`( name: string, fn: (...args: any[]) => void, once: boolen )\` | |
`,__vite_glob_4_10=`# 事件流切割

## Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| normal | 匹配内容 | \`RegExp\` | \`/data:(.+)?\\n\\n/\` | - |
| onMessage | 将匹配到的内容进行多次回调 | \`(str: string) => void\` | - | - |

## Methods

| 方法名 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| add | 添加流内容 | \`(str: string) => string[]\` | |

## 对 feath 请求 EventSource 数据流处理

> 在 fetch 请求 EventSource 接口时，如果两次结果返回过快，会导致数据流混乱，需要对数据流进行处理。

\`\`\`ts
fetch('/api/stream/sse', {
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'POST',
}).then(async res => {
  if (!res.ok) return;

  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader()
  const stream = new StreamSplit({
    onMessage(str) {
      console.log(str);
    }
  });

  while(1) {
    const { done, value } = await reader.read();
    if (done) break;
    stream.add(value);
  }
})
\`\`\`
`,__vite_glob_4_11=`# 任务队列控制
`,__vite_glob_5_0=`import { isPointInCircle } from "~/core/utils/math"

type Option = {
  el:           HTMLElement
  leftLen:      number
  rightLen:     number
  type?:        'single-single' | 'single-multi' | 'multi-single' | 'multi-multi'
  gap?:         number
  size?:        number
  fillStyle?:   string
  strokeStyle?: string
  lineWidth?:   number
  width?:       number
  height?:      number
}
export class JoinLine {
  constructor(option: Option) {
    Object.assign(this.option, option);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    this.ctx = ctx;
    this.refresh();
    option.el.appendChild(canvas);
  }
  option: Option = {
    el:          null,
    leftLen:     3,
    rightLen:    2,
    type:        'single-single',
    gap:         40,
    size:        8,
    fillStyle:   '#0C2972',
    lineWidth:   1,
  }
  ctx: CanvasRenderingContext2D
  _dpr = window.devicePixelRatio || 1;
  _prevMouseDownFunc = null;
  _connectingLines: [number, number][] = [];  // 连接点索引记录

  refresh() {
    const { ctx, option, _dpr } = this;
    const canvas = ctx.canvas;
    canvas.width = (option.width || option.el.offsetWidth) * _dpr;
    canvas.height = (option.height || option.el.offsetHeight) * _dpr;
    this._connectingLines.length = 0;
    ctx.scale(_dpr, _dpr);
    this.draw();
    canvas.style.width = \`\${canvas.width / _dpr}px\`;
    canvas.style.height = \`\${canvas.height / _dpr}px\`
  }

  draw() {
    const { _connectingLines, ctx, option, _dpr } = this;
    // _connectingLines.length = 0;
    ctx.fillStyle = option.fillStyle;
    ctx.strokeStyle = option.fillStyle;
    ctx.lineWidth = option.lineWidth;

    const collectLeftRedius: {x: number, y: number}[] = [];
    const collectRightRedius: {x: number, y: number}[] = [];
    const alreadyLins: {x1: number, y1: number, x2: number, y2: number}[] = [];  // 连接点

    const canvas = ctx.canvas;
    const width = canvas.width / _dpr;
    const [leftType, rightType] = option.type.split('-');

    /**
     * 绘制点数据
     */
    function drawPoint() {
      collectLeftRedius.length = 0;
      collectRightRedius.length = 0;

      ctx.beginPath();
      for (let i = 0; i < option.leftLen; i++) {
        const x = 14, y = i * option.gap + 14;
        collectLeftRedius.push({ x, y });
        ctx.arc(x, y, option.size, 0, 4 * Math.PI);
      }
      ctx.fill();
  
      ctx.beginPath();
      for (let i = 0; i < option.rightLen; i++) {
        const x = width - 14, y = i * option.gap + 14;
        collectRightRedius.push({ x, y });
        ctx.arc(x, y, option.size, 0, 4 * Math.PI);
      }
      ctx.fill();
    }
    /**
     * 连接线
     * @param x1 
     * @param y1 
     * @param x2 
     * @param y2 
     */
    function joinLine(x1: number, y1: number, x2: number, y2: number) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // 初始化渲染
    drawPoint();
    _connectingLines.forEach(val => {
      const [leftIndex, rightIndex] = val;
      const leftPoint = collectLeftRedius[leftIndex];
      const rightPoint = collectRightRedius[rightIndex];
      const x1 = leftPoint.x, y1 = leftPoint.y, x2 = rightPoint.x, y2 = rightPoint.y;
      alreadyLins.push({ x1, y1, x2, y2 });
      joinLine(x1, y1, x2, y2);
    })

    function resetDraw() {
      drawPoint();
      alreadyLins.forEach(val => {
        joinLine(val.x1, val.y1, val.x2, val.y2);
      })
    }

    // 清除前一次注册的事件，保证事件单一
    canvas.removeEventListener('mousedown', this._prevMouseDownFunc);

    // 拖拽点进行连接
    canvas.addEventListener('mousedown', mousedown);
    this._prevMouseDownFunc = mousedown;

    function mousedown(e: MouseEvent) {
      let startIndex = null, startX: number = null, startY: number = null;
      for (let i = 0; i < collectLeftRedius.length; i++) {
        const { x, y } = collectLeftRedius[i];
        if (isPointInCircle(e.offsetX, e.offsetY, x, y, option.size)) {
          startIndex = i;
          startX = x;
          startY = y;
          break;
        }
      }
      if (startIndex === null) return;  // 没有点中

      document.addEventListener('mousemove', mousemove);
      function mousemove(e: MouseEvent) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        resetDraw();
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
      }

      document.addEventListener('mouseup', mouseup);
      function mouseup(e: MouseEvent) {
        document.removeEventListener('mousemove', mousemove);

        let lastIndex: number = null, endX: number = null, endY: number = null;
        for (let i = 0; i < collectRightRedius.length; i++) {
          const { x, y } = collectRightRedius[i];
          if (isPointInCircle(e.offsetX, e.offsetY, x, y, option.size)) {
            endX = x;
            endY = y;
            lastIndex = i;
            break;
          }
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (lastIndex === null) {
          resetDraw();
          return;
        }

        // 线段已经存在
        for (let i = 0; i < alreadyLins.length;) {
          const { x1, y1, x2, y2 } = alreadyLins[i];
          // if ((x1 === startX && y1 === startY) || (x2 === endX && y2 === endY)) {
          const leftBool = leftType === 'single' && x1 === startX && y1 === startY;
          const rightBool = rightType === 'single' && x2 === endX && y2 === endY;
          if (leftBool || rightBool) {
            alreadyLins.splice(i, 1);  // 删除已连接过的线
            _connectingLines.splice(i, 1);
            continue;
          }
          i++;
        }

        // 添加连线数据
        alreadyLins.push({ x1: startX, y1: startY, x2: endX, y2: endY });
        _connectingLines.push([startIndex, lastIndex])
        resetDraw();

        document.removeEventListener('mouseup', mouseup);
      }
    }

  }

  _repeat = {
    leftIndexs:  [] as number[],
    rightIndexs: [] as number[],
  };
  joinLine(x: number, y: number) {
    const [leftType, rightType] = this.option.type.split('-');
    const { leftIndexs, rightIndexs } = this._repeat;
    const leftBool = leftType === 'single' && leftIndexs.includes(x);
    const rightBool = rightType === 'single' && rightIndexs.includes(y);
    if (leftBool || rightBool) {
      console.warn(\`连线 [\${x}, \${y}] 重复，当前模式：\${this.option.type}\`);
      return;
    }
    leftIndexs.push(x);
    rightIndexs.push(y);
    this._connectingLines.push([x, y]);
    this.draw();
  }

  /**
   * 获取连线关系（索引记录）
   * @returns 
   */
  getRelations() {
    return this._connectingLines;
  }
}`,__vite_glob_5_1=`import { computeControlPoint, filterExceed } from '../../utils/math'
import { priorityObject } from '../../utils/object'

type Serie = {
  data:    number[]
  smooth?: boolean
  line?:   {
    width?:  number
    stroke?: string
    fill?:   string
  },
  point?: {
    size?:        number
    stroke?:      string
    strokeWidth?: number
    fill?:        string
  }
}
export type ChartTimerBarOption = {
  el:         HTMLElement
  width?:     number
  height?:    number
  slider?: {
    width?:   number
    start?:   number
    end?:     number
    stroke?:  string
    color?:   string
  }
  xAxis: {
    show?:    boolean
    data:     string[]
    height?:  number
    font?: {
      size?:      string
      color?:     string
      textAlign?: 'left' | 'center' | 'right'
    }
    line?: {
      width?:  number
      stroke?: string
    },
    scale?: {
      stroke: string
    }
  }
  series:     Serie[]
  isPoint?:   boolean
  playSpeed?: number
  onPlayEnd?:           (isPlay: boolean) => void
  onSliderIndexChange?: (start: number, end: number) => void
}

export class ChartTimerBar {

  option: ChartTimerBarOption
  constructor(option: ChartTimerBarOption) {
    const defaultOption: ChartTimerBarOption = {
      el:     null,
      slider: {
        start:   .2,
        end:     .6,
        width:   2,
        stroke: '#5879d1',
        color:  '#5879d155',
      },
      playSpeed: 4,
      isPoint:   true,
      xAxis: {
        show: true,
        data: [],
        font: {
          size:      '12px',
          color:     '#666',
          textAlign: 'center',
        },
        line: {
          width:  1,
          stroke: '#5879d1',
        },
        scale: {
          stroke: '#5879d1',
        }
      },
      series: [{
        smooth: false,
        data:   [],
        line: {
          width:  1,
          stroke: '#5879d1',
          fill:   '#5879d155',
        },
        point: {
          size:        3,
          stroke:      '#5879d1',
          strokeWidth: 1,
          fill:        '#5879d155',
        }
      }]
    }
    this.option = priorityObject(option, defaultOption);

    this._init();
    option.el.appendChild(this.ctx.canvas);
    this.draw();
  }

  ctx: CanvasRenderingContext2D;

  _cfg = {
    slider: {
      left:  0,
      right: 0,
    },
    contentH: 0,
    gap: 0,
  }

  /**
   * 初始化
   */
  _init() {
    const canvas = document.createElement('canvas');
    this.ctx = canvas.getContext('2d');
    this._change();
    const sliderStyle = this.option.slider;
    this._cfg.slider = {
      left: sliderStyle.start * canvas.width,
      right: sliderStyle.end * canvas.width,
    };

    canvas.addEventListener('mousemove', e => {
      const x = e.offsetX, y = e.offsetY;
      if (this._inSlider(x, y)) {
        canvas.style.cursor = 'ew-resize';
      } else if (this._inRectangle(x, y)) {
        canvas.style.cursor = 'move';
      } else {
        canvas.style.cursor = 'default';
      }
    })

    canvas.addEventListener('mousedown', e => {
      const x = e.offsetX, y = e.offsetY;
      const self = this;
      const slider = self._cfg.slider;
      const poor = x - slider.left;
      const sloderW = Math.floor(slider.right - slider.left);

      /**
       * 移动滑块 
       * @param type 
       */
      function moveSlider(type: 'left' | 'right' | 'block') {
        const move = (e: MouseEvent) => {
          self.pause();

          if (type === 'block') {
            slider.left = Math.floor(e.offsetX - poor);
            slider.right = slider.left + sloderW;
          } else {
            slider[type] = e.offsetX;
          }

          if (slider.left >= slider.right) {
            slider.left = slider.right - 4;
          }
          if (slider.right <= slider.left) {
            slider.right = slider.left + 4;
          }

          // 两侧不能超出
          if (slider.left < 0) {
            slider.left = 0;
            slider.right = slider.left + sloderW;
          }
          if (slider.right > canvas.width) {
            slider.right = canvas.width;
            slider.left = slider.right - sloderW;
          }

          self.draw();
        }
        canvas.addEventListener('mousemove', move);
        const mouseup = (e: MouseEvent) => {
          canvas.removeEventListener('mousemove', move);
          document.removeEventListener('mouseup', mouseup);
        }
        document.addEventListener('mouseup', mouseup);
      }

      // 改变滑块大小/移动滑块  
      if (this._inSlider(x, y, 'left')) {
        moveSlider('left');
      } else if (this._inSlider(x, y, 'right')) {
        moveSlider('right');
      } else if (this._inRectangle(x, y)) {
        moveSlider('block');
      }
    })
  }

  /**
   * 容器发生变化，重置大小/数据
   */
  _change() {
    const w = this.option.width || this.option.el.offsetWidth;
    const h = this.option.height || this.option.el.offsetHeight;
    this.ctx.canvas.width = w;
    this.ctx.canvas.height = h;
    this._cfg.contentH = h - (this.option.xAxis.height || 24);
  }

  /**
   * 刷新
   */
  refresh() {
    this._change();
    this.draw();
  }

  /**
   * 绘制
   */
  draw() {
    const { width, height } = this.ctx.canvas;
    this.ctx.clearRect(0, 0, width, height);

    this.option.series.forEach(item => {
      this._drawData(item);
    })
    this._drawSlider();
    this._drawXAxisScaleLine();
    this._drawXAxisData();
  }

  /**
   * 绘制主体数据
   * @param data 
   */
  _drawData(serie: Serie) {
    const ctx = this.ctx;
    const { width } = ctx.canvas;
    const height = this._cfg.contentH;
    const data = serie.data;

    const max = Math.max(...data);
    const gap = width / (data.length - 1);
    this._cfg.gap = gap;

    // 线段
    // const lineStyle = Object.assign({
    //   width:  1,
    //   stroke: '#5879d1',
    //   fill:   '#5879d155',
    // }, serie.line);
    const lineStyle = serie.line;
    ctx.beginPath();
    ctx.lineWidth = lineStyle.width;
    ctx.strokeStyle = lineStyle.stroke;

    type Point = [number, number];
    const isSmooth = serie.smooth;
    const prev: Point = [0, Math.ceil(height - data[0] / max * height)];
    ctx.moveTo(prev[0], prev[1]);
    const collect: Point[] = [prev];
    for (let i = 1; i < data.length; i++) {
      const next: Point = [gap * i, Math.ceil(height - data[i] / max * height)];
      isSmooth ? collect.push(next) : ctx.lineTo(...next); 
    }
    if (isSmooth) {
      const points = computeControlPoint(collect, height / 300);
      for (let i = 1; i < collect.length; i++) {
        ctx.bezierCurveTo(...points[i - 1], ...collect[i]);
      }
    }
    ctx.stroke();
    ctx.strokeStyle = 'transparent';
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.fillStyle = lineStyle.fill;
    ctx.fill();

    // 绘制点
    const pointStyle = Object.assign({
      size:        3,
      stroke:     '#5879d1',
      strokeWidth: 1,
    }, serie.point);
    if (this.option.isPoint) {
      ctx.fillStyle = pointStyle.fill;
      ctx.strokeStyle = pointStyle.stroke;
      ctx.lineWidth = pointStyle.strokeWidth;
      for (let i = 0; i < data.length; i++) {
        ctx.beginPath();
        ctx.arc(gap * i, height - data[i] / max * height, pointStyle.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      }
    }
  }

  /**
   * 绘制刻度线
   */
  _drawXAxisScaleLine() {
    const ctx = this.ctx;
    const { width } = ctx.canvas;
    const height = this._cfg.contentH;
    const lineStyle = Object.assign({
      width:  .5,
      stroke: '#000',
    }, this.option.xAxis.scale);
    ctx.beginPath();
    ctx.strokeStyle = lineStyle.stroke;
    ctx.lineWidth = lineStyle.width;
    ctx.moveTo(0, height);
    ctx.lineTo(width, height);
    ctx.stroke();

    const data = this.option.xAxis.data;
    const gap = this._cfg.gap;
    const scaleStyle = Object.assign({
      stroke: '#000',
    })
    ctx.strokeStyle = scaleStyle.stroke;
    for (let i = 0; i < data.length; i++) {
      ctx.beginPath();
      ctx.moveTo(gap * i, height);
      ctx.lineTo(gap * i, height + 5);
      ctx.stroke();
    }
  }

  /**
   * 绘制时间轴
   */
  _drawXAxisData() {
    const ctx = this.ctx;
    const xAxis = this.option.xAxis;
    const fontStyle = xAxis.font;
    const data = filterExceed(xAxis.data, ctx.canvas.width, {
      fontSize: parseInt(fontStyle.size),
      last:     true,
    });
    const gap = this._cfg.gap;
    const contentHieght = this._cfg.contentH;
    if (xAxis.show) {
      ctx.beginPath();
      ctx.textAlign = fontStyle.textAlign;
      ctx.font = fontStyle.size + ' Arial';
      ctx.fillStyle = fontStyle.color;
      for (let i = 0; i < data.length; i++) {
        ctx.fillText(data[i], gap * i, contentHieght + 20);
      }
      ctx.stroke();
    }
  }

  /**
   * 绘制滑块
   */
  _drawSlider() {
    const ctx = this.ctx;
    const { left, right } = this._cfg.slider;
    const contentHieght = this._cfg.contentH;
    const sliderStyle = this.option.slider;
    
    // 滑块
    ctx.beginPath();
    ctx.fillStyle = sliderStyle.color;
    ctx.rect(left, 0, right - left, contentHieght);
    ctx.fill();

    // 滑块两侧拖拽条
    ctx.beginPath();
    ctx.lineWidth = sliderStyle.width;
    ctx.strokeStyle = sliderStyle.stroke;
    ctx.moveTo(left, 0);
    ctx.lineTo(left, contentHieght);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(right, 0);
    ctx.lineTo(right, contentHieght);
    ctx.stroke();

    this._getSliderData();
  }

  destroy() {
    this.ctx.canvas.remove();
  }

  _backupSilderIndex = new Array(2);

  /**
   * 获取滑块区间内的数据
   */
  _getSliderData() {
    const { left, right } = this._cfg.slider;
    const gap = this.ctx.canvas.width / (this.option.xAxis.data.length - 1);
    const start = Math.ceil(left / gap)
    const end = Math.floor(right / gap);
    if (this._backupSilderIndex[0] !== start || this._backupSilderIndex[1] !== end) {
      this._backupSilderIndex = [start, end];
      const onSliderIndexChange = this.option.onSliderIndexChange;
      onSliderIndexChange && onSliderIndexChange(start, end);
    }
  }

  /**
   * 是否在内容区域内
   * @param y 
   * @returns 
   */
  _inContent(y: number) {
    return y >= 0 && y <= this._cfg.contentH;
  }

  /**
   * 是否在滑块两侧的边上
   * @param x 
   * @param y 
   * @returns 
   */
  _inSlider(x: number, y: number, type: 'left' | 'right' | 'both' = 'both') {
    const { left: start, right: end } = this._cfg.slider;
    const section = this.option.slider.width;
    const inContent = this._inContent(y);
    const inLeftLine = x >= start - section && x <= start + section;
    if (type === 'left') {
      return inLeftLine && inContent;
    }
    const inRightLine = x >= end - section && x <= end + section;
    if (type === 'right') {
      return inRightLine && inContent;
    }
    const inLine = inLeftLine || inRightLine;
    return inLine && inContent;
  }

  /**
   * 是否在矩形内
   * @param x 
   * @param y 
   * @returns 
   */
  _inRectangle(x: number, y: number) {
    const { left: start, right: end } = this._cfg.slider;
    return x >= start && x <= end && this._inContent(y);
  }

  /**
   * 是否在点上
   * @param x 
   * @param y 
   */
  _inPoint(x: number, y: number) {
    if (!this.option.isPoint) return false;
    const gap = this._cfg.gap;
    const { series } = this.option;
    for (let i = 0; i < series.length; i++) {
      const data = series[i].data;
      for (let j = 0; j < data.length; j++) {
        console.log(gap * j, y);
      }
    }
  }


  _timer: NodeJS.Timeout;

  /**
   * 是否正在播放中
   * @returns 
   */
  get isPlay() {
    return !!this._timer;
  }

  /**
   * 播放
   */
  play(fixed = false) {
    if (this.isPlay) return;
    if (this._cfg.slider.right >= this.ctx.canvas.width) {
      this._cfg.slider.left = 0;
      this._cfg.slider.right = 2;
    }
    const playSpeed = this.option.playSpeed;
    this._timer = setInterval(() => {
      if (this._cfg.slider.right >= this.ctx.canvas.width) {
        clearInterval(this._timer);
        this._timer = null;
        const onPlayEnd = this.option.onPlayEnd;
        onPlayEnd && onPlayEnd(this.isPlay);
        return;
      }
      fixed && (this._cfg.slider.left += playSpeed);
      this._cfg.slider.right += playSpeed;
      this.draw();
    }, 16)
  }

  /**
   * 暂停
   */
  pause() {
    clearInterval(this._timer);
    this._timer = null;
  }

  /**
   * 播放/暂停
   */
  togglePlay(fixed = false) {
    this.isPlay ? this.pause() : this.play(fixed);
  }
}
`,__vite_glob_5_2=`import { isEven } from "../../utils/math"


type Option = {
  el:            HTMLElement                // 挂载节点
  percentage:    number                     // 百分比 0 ～ 100
  radian?:       number                     // 波浪弧度放大倍数  default: 1
  color?:        string                     // 波浪颜色
  size?:         number | [number, number]  // 容器大小
  noTransition?: boolean                    // 刷新时不过渡  default: false
  speed?:        number                     // 动画速度  default: 1
}


export class ChartWait {
  _canvas: HTMLCanvasElement
  _ctx:    CanvasRenderingContext2D
  option:  Option
  _dpr = window.devicePixelRatio || 1;

  #range  = 0;  // 贝塞尔曲线的弧度
  #height = 0;  // 波浪到画布顶部的高度
  #width  = 0;  // 贝塞尔曲线的宽度

  constructor(option: Option) {
    this.option = Object.assign({
      percentage:   0,
      radian:       1,
      color:        '#0080ff',
      noTransition: false,
      speed:        1,
    }, option);
    this.option.size ??= option.el.clientWidth;
    this.option.size = Array.isArray(this.option.size) ? this.option.size : [this.option.size, this.option.size];
    this._canvas = document.createElement('canvas');
    const width = this.option.size[0];
    const height = this.option.size[1];
    this._canvas.style.width = width + 'px';
    this._canvas.style.height = height + 'px';
    this._canvas.width = width * this._dpr;
    this._canvas.height = height * this._dpr;
    // this._canvas.style.borderRadius = '50%';
    option.el.appendChild(this._canvas);
    this._ctx = this._canvas.getContext('2d');
    this._ctx.scale(this._dpr, this._dpr);
    this.#width = this._canvas.width / 2;
    this.animation();
  }

  /**
   * 绘制一条波浪线
   * @param startX 起始横坐标 
   * @returns 
   */
  _drawWave(startX: number) {
    const ctx    = this._ctx,
          width  = this.#width,
          height = this.#height / this._dpr,
          range  = this.#range;

    /**
     * 创建一条弧度向上的二次贝塞尔曲线
     * @param i 第 i 个
     * @returns 结束点 x 坐标
     */
    function createWaveTop(i: number) {
      const endX = width * (i + 1) + startX;
      i === 0 ? ctx.moveTo(width * i + startX, height) : ctx.lineTo(width * i + startX, height);
      ctx.quadraticCurveTo(width * (i + 1) - width / 2 + startX, height + range, endX, height);
      return endX;
    }

    /**
     * 创建一条弧度向下的二次贝塞尔曲线
     * @param i 第 i 个
     * @returns 结束点 x 坐标
     */
    function createWaveBottom(i: number) {
      const endX = width * (i + 1) + startX;
      i === 0 ? ctx.moveTo(width * i + startX, height) : ctx.lineTo(width * i + startX, height)
      ctx.quadraticCurveTo(width * (i + 1) - width / 2 + startX, height * 2 - (height + range), endX, height);
      return endX;
    }

    let i = 0;
    return function createWave(n) {
      while (i <= n) {
        const endX = isEven(i) ? createWaveTop(i) : createWaveBottom(i);
        if (i === n) return endX;
        i++;
      }
    }
  }

  /**
   * 绘制为图
   */
  _graph(startX = 0, color = '#00f') {
    this._ctx.beginPath();
    const createWave = this._drawWave(startX);
    const num = this._canvas.width / this.#width * 2;
    const endX = createWave(num);
    this._ctx.lineTo(endX, this.#height);
    this._ctx.lineTo(endX, this._canvas.height);
    this._ctx.lineTo(startX, this._canvas.height);
    this._ctx.closePath();
    this._ctx.fillStyle = color;
    this._ctx.fill();
  }

  _animationId = null;

  /**
   * 执行动画
   */
  animation() {
    let k = -this._canvas.width;
    let i = -this._canvas.width;
    let j = -this._canvas.width;
    let backupPercentage = 0;  // 备份百分比

    const self = this;
    execute();
    function execute() {
      if (backupPercentage > self.option.percentage) backupPercentage --;
      if (backupPercentage < self.option.percentage) backupPercentage ++;
      
      self.#height = self._canvas.height - self._canvas.height * (backupPercentage / 100);
      const range = backupPercentage < 60 ? backupPercentage / 2 : (100 - backupPercentage) / 2 + 10;
      self.#range = range * self.option.radian * self._dpr;
      if (k > 0) k = -self._canvas.width;
      if (i > 0) i = -self._canvas.width;
      if (j > 0) j = -self._canvas.width;
      self._ctx.clearRect(0, 0, self._canvas.width, self._canvas.height);
      const color = self.option.color;
      self._graph(k, color + '33');
      self._graph(i, color + '55');
      self._graph(j, color);
      k += 4 * self.option.speed;
      i += 3 * self.option.speed;
      j += 2 * self.option.speed;
      self._animationId = requestAnimationFrame(execute);
    }
  }

  /**
   * 刷新（容器宽度改变时）
   * @returns 
   */
  refresh() {
    this.option.size ??= this.option.el.clientWidth;
    this.option.size = Array.isArray(this.option.size) ? this.option.size : [this.option.size, this.option.size];
    this._canvas.width = this.option.size[0];
    this._canvas.height = this.option.size[1];
    this.#width = this._canvas.width / 2;

    if (this.option.noTransition) return;
    let backupPercentage = 0;
    let requestId = null;
    const self = this;
    (function() {
      cancelAnimationFrame(self._animationId);    // 停止动画
      backupPercentage = self.option.percentage;  // 备份初始位置
      self.option.percentage = 0;
      increase();
      self.animation();
    }())

    /**
     * 回到初始位置
     */
    function increase() {
      if (self.option.percentage >= backupPercentage) {
        cancelAnimationFrame(requestId);
        return;
      }
      self.option.percentage ++;
      requestId = requestAnimationFrame(increase);
    }
  }

}
`,__vite_glob_5_3=`import { calculateCentroid, getCirclePoints, isPointInPolygon } from "../../utils/math"

type DataItem = { [k: string]: any } & {
  name?:   string
  offset?: [number, number]
  value?:  number
  handle?: () => void
}
type Control = {
  color?:            string
  background?:       string
  lineColor?:        string
  lineWidth?:        number
  activeBackground?: string
  outerSize:         number
  interSize:         number
  data:              DataItem[]
}
type ChartWheelDiscOption = {
  el:       HTMLElement
  width?:   number
  height?:  number
  controls: Control[]
}
export class ChartWheelDisc {

  option: ChartWheelDiscOption
  ctx:    CanvasRenderingContext2D
  dpr = window.devicePixelRatio || 1;

  constructor(option: ChartWheelDiscOption) {
    this.option = option;
    const canvas = document.createElement('canvas');
    const width = option.width || option.el.clientWidth;
    const height = option.height || option.el.clientHeight;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.width = width * this.dpr;
    canvas.height = height * this.dpr;
    this.ctx = canvas.getContext('2d');
    this.ctx.scale(this.dpr, this.dpr);
    option.el.appendChild(canvas);
    this.draw();
    this.event();
  }

  /**
   * 绘制画布
   * @param layer 
   * @param activeIndex 
   */
  draw(layer?: number, activeIndex?: number) {
    const { width, height } = this.ctx.canvas;
    this.ctx.clearRect(0, 0, width, height);
    const controls = this.option.controls;
    for (let i = 0; i < controls.length; i++) {
      this._drawControl(controls[i], layer === i && activeIndex);
    }
  }

  /**
   * 刷新画布
   */
  refresh() {
    this.draw();
  }

  _collectPolygons: { x: number, y: number }[][][] = [];

  /**
   * 绘制扇形
   * @param control 
   * @param activeIndex 
   */
  _drawControl(control: Control, activeIndex?: number) {
    const { width, height } = this.ctx.canvas;
    const ctx = this.ctx;

    const size = control.outerSize;                         // 圆盘大小
    const radius = size / 2;                                // 半径
    const interval = (size - (control.interSize || 0)) / 2; // 间隔
    let halve = 0;                                          // 切分数量

    const deleteIndexs = [];  // 需要删除项
    control.data.forEach(val => {
      if (val.value > 1) {
        const len = val.value - 1;
        const arr = [];
        for (let i = 1; i <= len; i++) {
          arr.push(halve + i)
        }
        deleteIndexs.push(...arr);
      }
      halve += val.value || 1;
    });

    // 中心点
    const centerX = size / 2 + (width / this.dpr - size) / 2;
    const centerY = size / 2 + (height / this.dpr - size) / 2;

    // 平均分布点
    let outerPoints = getCirclePoints(centerX, centerY, radius, halve);
    let interPoints = getCirclePoints(centerX, centerY, radius - interval, halve);

    // 切割数量 > 显示数量
    if (halve > control.data.length) {
      for (const index of deleteIndexs) {
        delete outerPoints[index];
        delete interPoints[index];
      }
      outerPoints = outerPoints.filter(Boolean);
      interPoints = interPoints.filter(Boolean);
    }

    ctx.textAlign = 'center';
    ctx.lineWidth = control.lineWidth || 3;
    let count = 0;
    const collectPolygon: { x: number, y: number }[][] = [];
    const len = outerPoints.length;
    for (let i = 0; i < len; i++) {
      const nextIndex = i === len - 1 ? 0 : i + 1;
      const inter1 = interPoints[i];
      const inter2 = interPoints[nextIndex];
      const outer1 = outerPoints[i];
      const outer2 = outerPoints[nextIndex];
      const points = [
        { x: inter1[0], y: inter1[1] },
        { x: inter2[0], y: inter2[1] },
        { x: outer2[0], y: outer2[1] },
        { x: outer1[0], y: outer1[1] },
      ]
      collectPolygon.push(points);

      ctx.strokeStyle = control.lineColor;
      ctx.beginPath();
      const item = Math.PI * 2 / halve;
      ctx.moveTo(points[0].x, points[0].y);
      ctx.lineTo(points[3].x, points[3].y);
      const number = control.data[i].value || 1;
      ctx.arc(centerX, centerY, radius - interval, item * count, item * (count + number));
      ctx.lineTo(points[1].x, points[1].y);
      ctx.arc(centerX, centerY, radius, item * (count + number), item * count, true);
      count += number;
      ctx.stroke();
      if (activeIndex === i && control.activeBackground) {
        ctx.fillStyle = control.activeBackground;
      } else {
        ctx.fillStyle = control.background;
      }
      ctx.fill();

      ctx.fillStyle = control.color;
      const centroid = calculateCentroid(points);  // 切割图形的中心点
      const texts = control.data[i].name.split('\\n');
      const offset = control.data[i].offset || [0, 0];
      texts.forEach((text, index) => {
        ctx.fillText(text, centroid.x + offset[0], centroid.y + offset[1] + index * 14);
      })
    }
    this._collectPolygons.push(collectPolygon);
  }

  queryPosition(x: number, y: number) {
    const collectPolygons = this._collectPolygons;
    let layer = -1, index = -1;
    tag: for (let i = 0; i < collectPolygons.length; i++) {
      const collectPolygon = collectPolygons[i];
      for (let j = 0; j < collectPolygon.length; j++) {
        const polygon = collectPolygon[j];
        const bool = isPointInPolygon(x, y, polygon);
        if (bool) {
          layer = i;
          index = j;
          break tag;
        }
      }
    }
    return { layer, index };
  }

  event() {
    const canvas = this.ctx.canvas;
    const { controls } = this.option;

    canvas.addEventListener('mousemove', (e) => {
      const { layer, index } = this.queryPosition(e.offsetX, e.offsetY);
      if ([layer, index].includes(-1)) {
        this.draw();
        canvas.style.cursor = 'default';
      } else {
        this.draw(layer, index);
        canvas.style.cursor = 'pointer';
      }
    });

    canvas.addEventListener('click', (e) => {
      const { layer, index } = this.queryPosition(e.offsetX, e.offsetY);
      if ([layer, index].includes(-1)) return;
      const { handle } = controls[layer].data[index];
      handle && handle();
    })
  }

}`,__vite_glob_6_0=`import { JoinLine } from ".";

export default () => {
  const container = document.getElementById('container');
  const line = new JoinLine({
    el: container,
    leftLen: 3,
    rightLen: 2,
    width: 300,
    type: 'single-multi'
  })
  line.joinLine(0, 1);

  const btn = document.createElement('button');
  btn.innerText = '获取连线数据';
  btn.addEventListener('click', () => {
    const data = line.getRelations();
    console.log(data);
  })
  container.appendChild(btn);
}`,__vite_glob_6_1=`import { ChartTimerBar } from ".";

export default () => {
  const container = document.getElementById('container');
  const timerBar = new ChartTimerBar({
    el: container,
    height: 200,
    xAxis: {
      data: ['2021', '2022', '2023', '2024', '2025', '2026'],
    },
    series: [
      {
        data: [120, 230, 220, 907, 150, 101],
      }
    ],
    onSliderIndexChange(start, end) {
      console.log(start, end)
    }
  })

  const btn = document.createElement('button');
  btn.innerText = 'play';
  btn.addEventListener('click', () => {
    timerBar._cfg.slider.left = 0;
    timerBar._cfg.slider.right = timerBar._cfg.gap;
    timerBar.play(true);
  })
  container.appendChild(btn);
}`,__vite_glob_6_2=`import { ChartWait } from ".";

export default () => {
  const container = document.getElementById('container');
  const wait = new ChartWait({
    el: container,
    percentage: 30,
    size: 300,
  })
  wait._canvas.style.borderRadius = '50%';

  setInterval(() => {
    const num = Math.random() * 100;
    wait.option.percentage = num;
    wait.option.color = num > 60 ? '#ffaa00' : '#0080ff';
  }, 2000)
}
`,__vite_glob_6_3=`import { ChartWheelDisc } from '.';

export default () => {
  const container = document.getElementById('container');
  new ChartWheelDisc({
    el: container,
    height: 300,
    controls: [
      {
        outerSize: 140,
        interSize: 40,
        color: 'white',
        background: '#475dbd',
        lineColor: '#D1D1D3',
        lineWidth: 3,
        data: [
          { name: '效果', value: 4, offset: [6, 8] },
          { name: '外部查询', value: 2, },
          { name: '布局', value: 3, },
          { name: '操作', value: 4, offset: [6, -8] },
        ]
      },
      {
        outerSize: 280,
        interSize: 144,
        color: 'white',
        background: '#65656C',
        lineColor: '#D1D1D3',
        lineWidth: 3,
        activeBackground: '#32325D',
        data: [
          {
            name: '隐藏', icon: '', handle() {
              console.log('隐藏')
            }
          },
          { name: '锁定', icon: '', handle() { } },
          { name: '固定', icon: '', },
          { name: '聚焦', icon: '', },
          { name: '恶意IP画像', icon: '', },
          { name: '路径搜索', icon: '', },
          { name: '横向布局', icon: '', },
          { name: '纵向布局', icon: '', },
          { name: '网格布局', icon: '', },
          { name: '扩展', icon: '', },
          { name: '收藏', icon: '', },
          { name: '标记', icon: '', },
          { name: '标签', icon: '', },
        ]
      },
    ]
  })
}
`;function isEven(o){const n=o/2;return n/Math.floor(n)===1||n===0}function calculateAngle(o,n,e,t){const r=o-e,i=n-t;return Math.atan2(i,r)*(180/Math.PI)}function computeControlPoint(o,n=.4){if(o.length<2)return[];const e=o[0],t=o[1],r=[],[i,s]=getMiddlePoint(e[0],t[0]),[a,l]=getMiddlePoint(e[1],t[1]);if(r.push([i,a,s,l]),o.length===2)return r;let c=o[1],m=c[1]-o[0][1];for(let d=2;d<o.length;d++){const f=o[d],[g,y]=getMiddlePoint(c[0],f[0]),[j,_]=getMiddlePoint(c[1],f[1]);if(r.push([g,j,y,_]),f[1]-c[1]!==m){r[d-2][3]=c[1],f[1]>c[1],r[d-1][1]=c[1];const v=calculateAngle(...c,...f),p=(180-Math.abs(v))*n;r[d-2][2]=Math.ceil(r[d-2][2]-p),r[d-1][0]=Math.ceil(r[d-1][0]+p)}m=f[1]-c[1],c=o[d]}return r}function getMiddlePoint(o,n){const e=(n-o)/4,t=e*3;return[e+o,t+o]}function filterExceed(o,n,e={}){const t={fontSize:12,gap:30,...e},r=[];for(let s=0;s<o.length;s++){const a=o[s];r.push(a.length*t.fontSize)}const i=Math.min(...r)+t.gap;if(i*o.length>n){const s=[],a=Math.floor(i*o.length/n);for(let l=0;l<o.length;l++)s.push(l%a===0?o[l]:"");if(e.last){const l=s.findLastIndex(c=>c!=="");o.length-l<a&&(s[l]=""),s[s.length-1]=o[o.length-1]}return s}return o}function getCirclePoints(o,n,e,t){const r=[],i=2*Math.PI/t;for(let s=0;s<t;s++){const a=s*i,l=o+e*Math.cos(a),c=n+e*Math.sin(a);r.push([l,c])}return r}function isPointInCircle(o,n,e,t,r){return Math.sqrt(Math.pow(o-e,2)+Math.pow(n-t,2))<=r}function isPointInPolygon(o,n,e){let t=!1;for(let r=0,i=e.length-1;r<e.length;i=r++){const s=e[r].x,a=e[r].y,l=e[i].x,c=e[i].y;a>n!=c>n&&o<(l-s)*(n-a)/(c-a)+s&&(t=!t)}return t}function calculateCentroid(o){let n=0,e=0;const t=o.length;for(let s=0;s<t;s++)n+=o[s].x,e+=o[s].y;const r=n/t,i=e/t;return{x:r,y:i}}class JoinLine{constructor(n){u(this,"option",{el:null,leftLen:3,rightLen:2,type:"single-single",gap:40,size:8,fillStyle:"#0C2972",lineWidth:1});u(this,"ctx");u(this,"_dpr",window.devicePixelRatio||1);u(this,"_prevMouseDownFunc",null);u(this,"_connectingLines",[]);u(this,"_repeat",{leftIndexs:[],rightIndexs:[]});Object.assign(this.option,n);const e=document.createElement("canvas"),t=e.getContext("2d");this.ctx=t,this.refresh(),n.el.appendChild(e)}refresh(){const{ctx:n,option:e,_dpr:t}=this,r=n.canvas;r.width=(e.width||e.el.offsetWidth)*t,r.height=(e.height||e.el.offsetHeight)*t,this._connectingLines.length=0,n.scale(t,t),this.draw(),r.style.width=`${r.width/t}px`,r.style.height=`${r.height/t}px`}draw(){const{_connectingLines:n,ctx:e,option:t,_dpr:r}=this;e.fillStyle=t.fillStyle,e.strokeStyle=t.fillStyle,e.lineWidth=t.lineWidth;const i=[],s=[],a=[],l=e.canvas,c=l.width/r,[m,d]=t.type.split("-");function f(){i.length=0,s.length=0,e.beginPath();for(let _=0;_<t.leftLen;_++){const p=_*t.gap+14;i.push({x:14,y:p}),e.arc(14,p,t.size,0,4*Math.PI)}e.fill(),e.beginPath();for(let _=0;_<t.rightLen;_++){const v=c-14,p=_*t.gap+14;s.push({x:v,y:p}),e.arc(v,p,t.size,0,4*Math.PI)}e.fill()}function g(_,v,p,k){e.beginPath(),e.moveTo(_,v),e.lineTo(p,k),e.stroke()}f(),n.forEach(_=>{const[v,p]=_,k=i[v],P=s[p],T=k.x,w=k.y,E=P.x,b=P.y;a.push({x1:T,y1:w,x2:E,y2:b}),g(T,w,E,b)});function y(){f(),a.forEach(_=>{g(_.x1,_.y1,_.x2,_.y2)})}l.removeEventListener("mousedown",this._prevMouseDownFunc),l.addEventListener("mousedown",j),this._prevMouseDownFunc=j;function j(_){let v=null,p=null,k=null;for(let w=0;w<i.length;w++){const{x:E,y:b}=i[w];if(isPointInCircle(_.offsetX,_.offsetY,E,b,t.size)){v=w,p=E,k=b;break}}if(v===null)return;document.addEventListener("mousemove",P);function P(w){e.clearRect(0,0,l.width,l.height),y(),e.beginPath(),e.moveTo(p,k),e.lineTo(w.offsetX,w.offsetY),e.stroke()}document.addEventListener("mouseup",T);function T(w){document.removeEventListener("mousemove",P);let E=null,b=null,L=null;for(let S=0;S<s.length;S++){const{x:A,y:I}=s[S];if(isPointInCircle(w.offsetX,w.offsetY,A,I,t.size)){b=A,L=I,E=S;break}}if(e.clearRect(0,0,l.width,l.height),E===null){y();return}for(let S=0;S<a.length;){const{x1:A,y1:I,x2:N,y2:$}=a[S];if(m==="single"&&A===p&&I===k||d==="single"&&N===b&&$===L){a.splice(S,1),n.splice(S,1);continue}S++}a.push({x1:p,y1:k,x2:b,y2:L}),n.push([v,E]),y(),document.removeEventListener("mouseup",T)}}}joinLine(n,e){const[t,r]=this.option.type.split("-"),{leftIndexs:i,rightIndexs:s}=this._repeat,a=t==="single"&&i.includes(n),l=r==="single"&&s.includes(e);if(a||l){console.warn(`连线 [${n}, ${e}] 重复，当前模式：${this.option.type}`);return}i.push(n),s.push(e),this._connectingLines.push([n,e]),this.draw()}getRelations(){return this._connectingLines}}const demo$3=()=>{const o=document.getElementById("container"),n=new JoinLine({el:o,leftLen:3,rightLen:2,width:300,type:"single-multi"});n.joinLine(0,1);const e=document.createElement("button");e.innerText="获取连线数据",e.addEventListener("click",()=>{const t=n.getRelations();console.log(t)}),o.appendChild(e)},__vite_glob_7_0=Object.freeze(Object.defineProperty({__proto__:null,default:demo$3},Symbol.toStringTag,{value:"Module"}));class ChartTimerBar{constructor(n){u(this,"option");u(this,"ctx");u(this,"_cfg",{slider:{left:0,right:0},contentH:0,gap:0});u(this,"_backupSilderIndex",new Array(2));u(this,"_timer");const e={el:null,slider:{start:.2,end:.6,width:2,stroke:"#5879d1",color:"#5879d155"},playSpeed:4,isPoint:!0,xAxis:{show:!0,data:[],font:{size:"12px",color:"#666",textAlign:"center"},line:{width:1,stroke:"#5879d1"},scale:{stroke:"#5879d1"}},series:[{smooth:!1,data:[],line:{width:1,stroke:"#5879d1",fill:"#5879d155"},point:{size:3,stroke:"#5879d1",strokeWidth:1,fill:"#5879d155"}}]};this.option=priorityObject(n,e),this._init(),n.el.appendChild(this.ctx.canvas),this.draw()}_init(){const n=document.createElement("canvas");this.ctx=n.getContext("2d"),this._change();const e=this.option.slider;this._cfg.slider={left:e.start*n.width,right:e.end*n.width},n.addEventListener("mousemove",t=>{const r=t.offsetX,i=t.offsetY;this._inSlider(r,i)?n.style.cursor="ew-resize":this._inRectangle(r,i)?n.style.cursor="move":n.style.cursor="default"}),n.addEventListener("mousedown",t=>{const r=t.offsetX,i=t.offsetY,s=this,a=s._cfg.slider,l=r-a.left,c=Math.floor(a.right-a.left);function m(d){const f=y=>{s.pause(),d==="block"?(a.left=Math.floor(y.offsetX-l),a.right=a.left+c):a[d]=y.offsetX,a.left>=a.right&&(a.left=a.right-4),a.right<=a.left&&(a.right=a.left+4),a.left<0&&(a.left=0,a.right=a.left+c),a.right>n.width&&(a.right=n.width,a.left=a.right-c),s.draw()};n.addEventListener("mousemove",f);const g=y=>{n.removeEventListener("mousemove",f),document.removeEventListener("mouseup",g)};document.addEventListener("mouseup",g)}this._inSlider(r,i,"left")?m("left"):this._inSlider(r,i,"right")?m("right"):this._inRectangle(r,i)&&m("block")})}_change(){const n=this.option.width||this.option.el.offsetWidth,e=this.option.height||this.option.el.offsetHeight;this.ctx.canvas.width=n,this.ctx.canvas.height=e,this._cfg.contentH=e-(this.option.xAxis.height||24)}refresh(){this._change(),this.draw()}draw(){const{width:n,height:e}=this.ctx.canvas;this.ctx.clearRect(0,0,n,e),this.option.series.forEach(t=>{this._drawData(t)}),this._drawSlider(),this._drawXAxisScaleLine(),this._drawXAxisData()}_drawData(n){const e=this.ctx,{width:t}=e.canvas,r=this._cfg.contentH,i=n.data,s=Math.max(...i),a=t/(i.length-1);this._cfg.gap=a;const l=n.line;e.beginPath(),e.lineWidth=l.width,e.strokeStyle=l.stroke;const c=n.smooth,m=[0,Math.ceil(r-i[0]/s*r)];e.moveTo(m[0],m[1]);const d=[m];for(let g=1;g<i.length;g++){const y=[a*g,Math.ceil(r-i[g]/s*r)];c?d.push(y):e.lineTo(...y)}if(c){const g=computeControlPoint(d,r/300);for(let y=1;y<d.length;y++)e.bezierCurveTo(...g[y-1],...d[y])}e.stroke(),e.strokeStyle="transparent",e.lineTo(t,r),e.lineTo(0,r),e.fillStyle=l.fill,e.fill();const f=Object.assign({size:3,stroke:"#5879d1",strokeWidth:1},n.point);if(this.option.isPoint){e.fillStyle=f.fill,e.strokeStyle=f.stroke,e.lineWidth=f.strokeWidth;for(let g=0;g<i.length;g++)e.beginPath(),e.arc(a*g,r-i[g]/s*r,f.size,0,2*Math.PI),e.fill(),e.stroke()}}_drawXAxisScaleLine(){const n=this.ctx,{width:e}=n.canvas,t=this._cfg.contentH,r=Object.assign({width:.5,stroke:"#000"},this.option.xAxis.scale);n.beginPath(),n.strokeStyle=r.stroke,n.lineWidth=r.width,n.moveTo(0,t),n.lineTo(e,t),n.stroke();const i=this.option.xAxis.data,s=this._cfg.gap,a=Object.assign({stroke:"#000"});n.strokeStyle=a.stroke;for(let l=0;l<i.length;l++)n.beginPath(),n.moveTo(s*l,t),n.lineTo(s*l,t+5),n.stroke()}_drawXAxisData(){const n=this.ctx,e=this.option.xAxis,t=e.font,r=filterExceed(e.data,n.canvas.width,{fontSize:parseInt(t.size),last:!0}),i=this._cfg.gap,s=this._cfg.contentH;if(e.show){n.beginPath(),n.textAlign=t.textAlign,n.font=t.size+" Arial",n.fillStyle=t.color;for(let a=0;a<r.length;a++)n.fillText(r[a],i*a,s+20);n.stroke()}}_drawSlider(){const n=this.ctx,{left:e,right:t}=this._cfg.slider,r=this._cfg.contentH,i=this.option.slider;n.beginPath(),n.fillStyle=i.color,n.rect(e,0,t-e,r),n.fill(),n.beginPath(),n.lineWidth=i.width,n.strokeStyle=i.stroke,n.moveTo(e,0),n.lineTo(e,r),n.stroke(),n.beginPath(),n.moveTo(t,0),n.lineTo(t,r),n.stroke(),this._getSliderData()}destroy(){this.ctx.canvas.remove()}_getSliderData(){const{left:n,right:e}=this._cfg.slider,t=this.ctx.canvas.width/(this.option.xAxis.data.length-1),r=Math.ceil(n/t),i=Math.floor(e/t);if(this._backupSilderIndex[0]!==r||this._backupSilderIndex[1]!==i){this._backupSilderIndex=[r,i];const s=this.option.onSliderIndexChange;s&&s(r,i)}}_inContent(n){return n>=0&&n<=this._cfg.contentH}_inSlider(n,e,t="both"){const{left:r,right:i}=this._cfg.slider,s=this.option.slider.width,a=this._inContent(e),l=n>=r-s&&n<=r+s;if(t==="left")return l&&a;const c=n>=i-s&&n<=i+s;return t==="right"?c&&a:(l||c)&&a}_inRectangle(n,e){const{left:t,right:r}=this._cfg.slider;return n>=t&&n<=r&&this._inContent(e)}_inPoint(n,e){if(!this.option.isPoint)return!1;const t=this._cfg.gap,{series:r}=this.option;for(let i=0;i<r.length;i++){const s=r[i].data;for(let a=0;a<s.length;a++)console.log(t*a,e)}}get isPlay(){return!!this._timer}play(n=!1){if(this.isPlay)return;this._cfg.slider.right>=this.ctx.canvas.width&&(this._cfg.slider.left=0,this._cfg.slider.right=2);const e=this.option.playSpeed;this._timer=setInterval(()=>{if(this._cfg.slider.right>=this.ctx.canvas.width){clearInterval(this._timer),this._timer=null;const t=this.option.onPlayEnd;t&&t(this.isPlay);return}n&&(this._cfg.slider.left+=e),this._cfg.slider.right+=e,this.draw()},16)}pause(){clearInterval(this._timer),this._timer=null}togglePlay(n=!1){this.isPlay?this.pause():this.play(n)}}const demo$2=()=>{const o=document.getElementById("container"),n=new ChartTimerBar({el:o,height:200,xAxis:{data:["2021","2022","2023","2024","2025","2026"]},series:[{data:[120,230,220,907,150,101]}],onSliderIndexChange(t,r){console.log(t,r)}}),e=document.createElement("button");e.innerText="play",e.addEventListener("click",()=>{n._cfg.slider.left=0,n._cfg.slider.right=n._cfg.gap,n.play(!0)}),o.appendChild(e)},__vite_glob_7_1=Object.freeze(Object.defineProperty({__proto__:null,default:demo$2},Symbol.toStringTag,{value:"Module"}));var z,R,O;class ChartWait{constructor(n){u(this,"_canvas");u(this,"_ctx");u(this,"option");u(this,"_dpr",window.devicePixelRatio||1);M(this,z,0);M(this,R,0);M(this,O,0);u(this,"_animationId",null);var r;this.option=Object.assign({percentage:0,radian:1,color:"#0080ff",noTransition:!1,speed:1},n),(r=this.option).size??(r.size=n.el.clientWidth),this.option.size=Array.isArray(this.option.size)?this.option.size:[this.option.size,this.option.size],this._canvas=document.createElement("canvas");const e=this.option.size[0],t=this.option.size[1];this._canvas.style.width=e+"px",this._canvas.style.height=t+"px",this._canvas.width=e*this._dpr,this._canvas.height=t*this._dpr,n.el.appendChild(this._canvas),this._ctx=this._canvas.getContext("2d"),this._ctx.scale(this._dpr,this._dpr),W(this,O,this._canvas.width/2),this.animation()}_drawWave(n){const e=this._ctx,t=x(this,O),r=x(this,R)/this._dpr,i=x(this,z);function s(c){const m=t*(c+1)+n;return c===0?e.moveTo(t*c+n,r):e.lineTo(t*c+n,r),e.quadraticCurveTo(t*(c+1)-t/2+n,r+i,m,r),m}function a(c){const m=t*(c+1)+n;return c===0?e.moveTo(t*c+n,r):e.lineTo(t*c+n,r),e.quadraticCurveTo(t*(c+1)-t/2+n,r*2-(r+i),m,r),m}let l=0;return function(m){for(;l<=m;){const d=isEven(l)?s(l):a(l);if(l===m)return d;l++}}}_graph(n=0,e="#00f"){this._ctx.beginPath();const t=this._drawWave(n),r=this._canvas.width/x(this,O)*2,i=t(r);this._ctx.lineTo(i,x(this,R)),this._ctx.lineTo(i,this._canvas.height),this._ctx.lineTo(n,this._canvas.height),this._ctx.closePath(),this._ctx.fillStyle=e,this._ctx.fill()}animation(){let n=-this._canvas.width,e=-this._canvas.width,t=-this._canvas.width,r=0;const i=this;s();function s(){r>i.option.percentage&&r--,r<i.option.percentage&&r++,W(i,R,i._canvas.height-i._canvas.height*(r/100));const a=r<60?r/2:(100-r)/2+10;W(i,z,a*i.option.radian*i._dpr),n>0&&(n=-i._canvas.width),e>0&&(e=-i._canvas.width),t>0&&(t=-i._canvas.width),i._ctx.clearRect(0,0,i._canvas.width,i._canvas.height);const l=i.option.color;i._graph(n,l+"33"),i._graph(e,l+"55"),i._graph(t,l),n+=4*i.option.speed,e+=3*i.option.speed,t+=2*i.option.speed,i._animationId=requestAnimationFrame(s)}}refresh(){var i;if((i=this.option).size??(i.size=this.option.el.clientWidth),this.option.size=Array.isArray(this.option.size)?this.option.size:[this.option.size,this.option.size],this._canvas.width=this.option.size[0],this._canvas.height=this.option.size[1],W(this,O,this._canvas.width/2),this.option.noTransition)return;let n=0,e=null;const t=this;(function(){cancelAnimationFrame(t._animationId),n=t.option.percentage,t.option.percentage=0,r(),t.animation()})();function r(){if(t.option.percentage>=n){cancelAnimationFrame(e);return}t.option.percentage++,e=requestAnimationFrame(r)}}}z=new WeakMap,R=new WeakMap,O=new WeakMap;const demo$1=()=>{const o=document.getElementById("container"),n=new ChartWait({el:o,percentage:30,size:300});n._canvas.style.borderRadius="50%",setInterval(()=>{const e=Math.random()*100;n.option.percentage=e,n.option.color=e>60?"#ffaa00":"#0080ff"},2e3)},__vite_glob_7_2=Object.freeze(Object.defineProperty({__proto__:null,default:demo$1},Symbol.toStringTag,{value:"Module"}));class ChartWheelDisc{constructor(n){u(this,"option");u(this,"ctx");u(this,"dpr",window.devicePixelRatio||1);u(this,"_collectPolygons",[]);this.option=n;const e=document.createElement("canvas"),t=n.width||n.el.clientWidth,r=n.height||n.el.clientHeight;e.style.width=t+"px",e.style.height=r+"px",e.width=t*this.dpr,e.height=r*this.dpr,this.ctx=e.getContext("2d"),this.ctx.scale(this.dpr,this.dpr),n.el.appendChild(e),this.draw(),this.event()}draw(n,e){const{width:t,height:r}=this.ctx.canvas;this.ctx.clearRect(0,0,t,r);const i=this.option.controls;for(let s=0;s<i.length;s++)this._drawControl(i[s],n===s&&e)}refresh(){this.draw()}_drawControl(n,e){const{width:t,height:r}=this.ctx.canvas,i=this.ctx,s=n.outerSize,a=s/2,l=(s-(n.interSize||0))/2;let c=0;const m=[];n.data.forEach(p=>{if(p.value>1){const k=p.value-1,P=[];for(let T=1;T<=k;T++)P.push(c+T);m.push(...P)}c+=p.value||1});const d=s/2+(t/this.dpr-s)/2,f=s/2+(r/this.dpr-s)/2;let g=getCirclePoints(d,f,a,c),y=getCirclePoints(d,f,a-l,c);if(c>n.data.length){for(const p of m)delete g[p],delete y[p];g=g.filter(Boolean),y=y.filter(Boolean)}i.textAlign="center",i.lineWidth=n.lineWidth||3;let j=0;const _=[],v=g.length;for(let p=0;p<v;p++){const k=p===v-1?0:p+1,P=y[p],T=y[k],w=g[p],E=g[k],b=[{x:P[0],y:P[1]},{x:T[0],y:T[1]},{x:E[0],y:E[1]},{x:w[0],y:w[1]}];_.push(b),i.strokeStyle=n.lineColor,i.beginPath();const L=Math.PI*2/c;i.moveTo(b[0].x,b[0].y),i.lineTo(b[3].x,b[3].y);const S=n.data[p].value||1;i.arc(d,f,a-l,L*j,L*(j+S)),i.lineTo(b[1].x,b[1].y),i.arc(d,f,a,L*(j+S),L*j,!0),j+=S,i.stroke(),e===p&&n.activeBackground?i.fillStyle=n.activeBackground:i.fillStyle=n.background,i.fill(),i.fillStyle=n.color;const A=calculateCentroid(b),I=n.data[p].name.split(`
`),N=n.data[p].offset||[0,0];I.forEach(($,Y)=>{i.fillText($,A.x+N[0],A.y+N[1]+Y*14)})}this._collectPolygons.push(_)}queryPosition(n,e){const t=this._collectPolygons;let r=-1,i=-1;n:for(let s=0;s<t.length;s++){const a=t[s];for(let l=0;l<a.length;l++){const c=a[l];if(isPointInPolygon(n,e,c)){r=s,i=l;break n}}}return{layer:r,index:i}}event(){const n=this.ctx.canvas,{controls:e}=this.option;n.addEventListener("mousemove",t=>{const{layer:r,index:i}=this.queryPosition(t.offsetX,t.offsetY);[r,i].includes(-1)?(this.draw(),n.style.cursor="default"):(this.draw(r,i),n.style.cursor="pointer")}),n.addEventListener("click",t=>{const{layer:r,index:i}=this.queryPosition(t.offsetX,t.offsetY);if([r,i].includes(-1))return;const{handle:s}=e[r].data[i];s&&s()})}}const demo=()=>{const o=document.getElementById("container");new ChartWheelDisc({el:o,height:300,controls:[{outerSize:140,interSize:40,color:"white",background:"#475dbd",lineColor:"#D1D1D3",lineWidth:3,data:[{name:"效果",value:4,offset:[6,8]},{name:"外部查询",value:2},{name:"布局",value:3},{name:"操作",value:4,offset:[6,-8]}]},{outerSize:280,interSize:144,color:"white",background:"#65656C",lineColor:"#D1D1D3",lineWidth:3,activeBackground:"#32325D",data:[{name:"隐藏",icon:"",handle(){console.log("隐藏")}},{name:"锁定",icon:"",handle(){}},{name:"固定",icon:""},{name:"聚焦",icon:""},{name:"恶意IP画像",icon:""},{name:"路径搜索",icon:""},{name:"横向布局",icon:""},{name:"纵向布局",icon:""},{name:"网格布局",icon:""},{name:"扩展",icon:""},{name:"收藏",icon:""},{name:"标记",icon:""},{name:"标签",icon:""}]}]})},__vite_glob_7_3=Object.freeze(Object.defineProperty({__proto__:null,default:demo},Symbol.toStringTag,{value:"Module"})),__vite_glob_8_0="# 数据连线\n\n## Option\n\n| 属性名 | 说明 | 类型 | 默认值 | 备注 |\n| --- | --- | --- | --- | --- |\n| el* | 绑定元素 | `HTMLElement` | - | - |\n| leftLen* | 左侧点个数 | `number` | - | - |\n| rightLen* | 右侧点个数 | `number` | - | - |\n| type | 连接类型 | `string` | single-single | 连接模式（一对一、一对多、多对一、多对多） |\n| width | 指定宽度 | `number` | el 的宽 | - |\n| height | 指定高度 | `number` | el 的高 | - |\n| gap | 每行点之间的间距 | `number` | 40 | - |\n| size | 点大小 | `number` | 8 | - |\n| fillStyle | 填充颜色 | `string` | #0C2972 | - |\n| lineWidth | 连线宽度 | `number` | 2 | - |\n",__vite_glob_8_1=`# 时间轴过滤

## Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| el* | 绑定元素 | \`HTMLElement\` | - | - |
| xAxis* | 横坐标配置 | \`object\` | - | - |
| series* | 数据配置 | \`object\` | - | - |
| width | 指定宽度 | \`number\` | - | - |
| height | 指定高度 | \`number\` | - | - |
| slider | 滑块配置 | \`object\` | - | - |
| isPoint | 是否显示点 | \`boolean\` | true | - |
| playSpeed | 播放速度 | \`number\` | 4 | - |
| onSliderIndexChange | 滑块内索引变化 | \`(start: number, end: number) => void\` | - | - |

## Enevt

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| refresh | 一般在容器大小改变后调用 | - |
| play | 播放 | fiexd 是否固定滑块大小 |
| puase | 暂停播放 | |
`,__vite_glob_8_2=`# 波浪百分比

## Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| el* | 挂载元素 | \`HTMLElement\` | - | - |
| percentage* | 百分比 | \`number\` | 0 | 取值范围：0-100 |
| radian | 波浪弧度 | \`number\` | 1 | - |
| color | 颜色 | \`string\` | #0080ff | 仅支持 16 进制 |
| size | 容器的大小 | \`number \\| [number, number]\` | 父元素宽度 | 单位（px） |
| noTransition | 刷新时不过渡 | \`boolean\` | false | - |
| speed | 动画速度 | \`number\` | 1 | - |

## Enevt

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| refresh | 一般在容器大小改变后调用 | - |

\`\`\`ts
const wait = new ChartWait()
window.addEventListener('resize', () => {
  wait.refresh();
})
\`\`\`
`,__vite_glob_8_3=`# 转盘菜单

## Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| el* | 挂载元素 | \`HTMLElement\` | - | - |
| width | 画布宽度 | \`number\` | 默认取父元素的宽度 | - |
| height | 画布高度 | \`number\` | 默认取父元素的高度 | - |
| controls | 圆盘配置 | \`Control[]\` | - | - |

## Enevt

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| refresh | 一般在容器大小改变后调用 | - |
`,PREFIX_URL="/core";function formatUrl(o){return o.replace(PREFIX_URL,"")}function getUtilsSourceCode(){const o={keys:[],body:{}},n=Object.assign({"/core/utils/array.ts":__vite_glob_0_0,"/core/utils/async.ts":__vite_glob_0_1,"/core/utils/browser.ts":__vite_glob_0_2,"/core/utils/class.ts":__vite_glob_0_3,"/core/utils/color.ts":__vite_glob_0_4,"/core/utils/date.ts":__vite_glob_0_5,"/core/utils/dom.ts":__vite_glob_0_6,"/core/utils/encoding.ts":__vite_glob_0_7,"/core/utils/generator.ts":__vite_glob_0_8,"/core/utils/image.ts":__vite_glob_0_9,"/core/utils/judge.ts":__vite_glob_0_10,"/core/utils/math.ts":__vite_glob_0_11,"/core/utils/number.ts":__vite_glob_0_12,"/core/utils/object.ts":__vite_glob_0_13,"/core/utils/optimize.ts":__vite_glob_0_14,"/core/utils/queue.ts":__vite_glob_0_15,"/core/utils/regexp.ts":__vite_glob_0_16,"/core/utils/string.ts":__vite_glob_0_17,"/core/utils/type.ts":__vite_glob_0_18,"/core/utils/url.ts":__vite_glob_0_19});for(const e in n){const t=formatUrl(e);o.keys.push(t),o.body[t]=n[e]}return o}function commonHandle(o){var a,l;const{codeObj:n,demoObj:e,execObj:t,readmeObj:r,path:i}=o,s=[];for(const c in n){const m=formatUrl(c).split("/")[2],d=r[`${i}${m}/readme.md`]||"";s.push({name:m,title:(a=d.match(/# (.*)/))==null?void 0:a[1],code:n[c],exec:(l=t[`${i}${m}/demo.ts`])==null?void 0:l.default,demo:e[`${i}${m}/demo.ts`]||"",readme:d.replace(/# (.*)/,"")})}return s}function getToolsSourceCode(){return commonHandle({codeObj:Object.assign({"/core/tools/bloomFilter/index.ts":__vite_glob_1_0,"/core/tools/codeConversion/index.ts":__vite_glob_1_1,"/core/tools/eventEmitter/index.ts":__vite_glob_1_2,"/core/tools/falls/index.ts":__vite_glob_1_3,"/core/tools/fullScreen/index.ts":__vite_glob_1_4,"/core/tools/funcOverload/index.ts":__vite_glob_1_5,"/core/tools/inlay/index.ts":__vite_glob_1_6,"/core/tools/memoizeMap/index.ts":__vite_glob_1_7,"/core/tools/onion/index.ts":__vite_glob_1_8,"/core/tools/publishSubscribe/index.ts":__vite_glob_1_9,"/core/tools/streamSplit/index.ts":__vite_glob_1_10,"/core/tools/taskScheduling/index.ts":__vite_glob_1_11}),demoObj:Object.assign({"/core/tools/bloomFilter/demo.ts":__vite_glob_2_0,"/core/tools/codeConversion/demo.ts":__vite_glob_2_1,"/core/tools/eventEmitter/demo.ts":__vite_glob_2_2,"/core/tools/falls/demo.ts":__vite_glob_2_3,"/core/tools/fullScreen/demo.ts":__vite_glob_2_4,"/core/tools/funcOverload/demo.ts":__vite_glob_2_5,"/core/tools/inlay/demo.ts":__vite_glob_2_6,"/core/tools/memoizeMap/demo.ts":__vite_glob_2_7,"/core/tools/onion/demo.ts":__vite_glob_2_8,"/core/tools/publishSubscribe/demo.ts":__vite_glob_2_9,"/core/tools/streamSplit/demo.ts":__vite_glob_2_10,"/core/tools/taskScheduling/demo.ts":__vite_glob_2_11}),execObj:Object.assign({"/core/tools/bloomFilter/demo.ts":__vite_glob_3_0,"/core/tools/codeConversion/demo.ts":__vite_glob_3_1,"/core/tools/eventEmitter/demo.ts":__vite_glob_3_2,"/core/tools/falls/demo.ts":__vite_glob_3_3,"/core/tools/fullScreen/demo.ts":__vite_glob_3_4,"/core/tools/funcOverload/demo.ts":__vite_glob_3_5,"/core/tools/inlay/demo.ts":__vite_glob_3_6,"/core/tools/memoizeMap/demo.ts":__vite_glob_3_7,"/core/tools/onion/demo.ts":__vite_glob_3_8,"/core/tools/publishSubscribe/demo.ts":__vite_glob_3_9,"/core/tools/streamSplit/demo.ts":__vite_glob_3_10,"/core/tools/taskScheduling/demo.ts":__vite_glob_3_11}),readmeObj:Object.assign({"/core/tools/bloomFilter/readme.md":__vite_glob_4_0,"/core/tools/codeConversion/readme.md":__vite_glob_4_1,"/core/tools/eventEmitter/readme.md":__vite_glob_4_2,"/core/tools/falls/readme.md":__vite_glob_4_3,"/core/tools/fullScreen/readme.md":__vite_glob_4_4,"/core/tools/funcOverload/readme.md":__vite_glob_4_5,"/core/tools/inlay/readme.md":__vite_glob_4_6,"/core/tools/memoizeMap/readme.md":__vite_glob_4_7,"/core/tools/onion/readme.md":__vite_glob_4_8,"/core/tools/publishSubscribe/readme.md":__vite_glob_4_9,"/core/tools/streamSplit/readme.md":__vite_glob_4_10,"/core/tools/taskScheduling/readme.md":__vite_glob_4_11}),path:`${PREFIX_URL}/tools/`})}function getCanvasSourceCode(){return commonHandle({codeObj:Object.assign({"/core/canvas/joinLine/index.ts":__vite_glob_5_0,"/core/canvas/timebar/index.ts":__vite_glob_5_1,"/core/canvas/wave/index.ts":__vite_glob_5_2,"/core/canvas/wheelDisc/index.ts":__vite_glob_5_3}),demoObj:Object.assign({"/core/canvas/joinLine/demo.ts":__vite_glob_6_0,"/core/canvas/timebar/demo.ts":__vite_glob_6_1,"/core/canvas/wave/demo.ts":__vite_glob_6_2,"/core/canvas/wheelDisc/demo.ts":__vite_glob_6_3}),execObj:Object.assign({"/core/canvas/joinLine/demo.ts":__vite_glob_7_0,"/core/canvas/timebar/demo.ts":__vite_glob_7_1,"/core/canvas/wave/demo.ts":__vite_glob_7_2,"/core/canvas/wheelDisc/demo.ts":__vite_glob_7_3}),readmeObj:Object.assign({"/core/canvas/joinLine/readme.md":__vite_glob_8_0,"/core/canvas/timebar/readme.md":__vite_glob_8_1,"/core/canvas/wave/readme.md":__vite_glob_8_2,"/core/canvas/wheelDisc/readme.md":__vite_glob_8_3}),path:`${PREFIX_URL}/canvas/`})}export{CodeEdit as C,getToolsSourceCode as a,CodeConversion as b,copyToBoard as c,deepClone as d,getUtilsSourceCode as e,getCanvasSourceCode as g,scrollTo as s,tsToJs as t};
