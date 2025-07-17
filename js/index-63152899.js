var A=Object.defineProperty;var W=(o,n,t)=>n in o?A(o,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[n]=t;var a=(o,n,t)=>(W(o,typeof n!="symbol"?n+"":n,t),t),M=(o,n,t)=>{if(!n.has(o))throw TypeError("Cannot "+t)};var u=(o,n,t)=>(M(o,n,"read from private field"),t?t.call(o):n.get(o)),f=(o,n,t)=>{if(n.has(o))throw TypeError("Cannot add the same private member more than once");n instanceof WeakSet?n.add(o):n.set(o,t)};var T=(o,n,t)=>(M(o,n,"access private method"),t);import{C as N,i as C,c as P,g as z}from"./index-eeb30e17.js";import{c as O,d as k,i as S}from"./async-325209f7.js";import{h as B}from"./pl-react-532112ff.js";import{S as D}from"./index-0e385236.js";import{c as K,C as J}from"./source-8f9735e3.js";import"./marked-c333d169.js";import"./@babel-d1fe47a8.js";import"./debug-207d77b3.js";import"./ms-f6814399.js";import"./@jridgewell-873a78ab.js";import"./jsesc-4cfd8464.js";import"./picocolors-cddfbdbe.js";import"./js-tokens-bc2e8ff2.js";import"./basic-343393ce.js";const $=`
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
`,H=`import { OptionalDeep } from "../../utils/type";

type Option = {
  keywords:          string[]  // 关键字
  multiRowComment:   RegExp    // 多行注释
  singleLineComment: RegExp    // 单行注释
  string:            RegExp    // 字符串
  regexp:            RegExp    // 正则
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
      regexp: /\\/[^\\/|\\n]+\\//g,
      constant: /(?<=\\s|\\(|\\[|{|,|:|=)[A-Z][\\w|\\d]+/g,
      number: /(?<=\\s|\\(|\\[|{|,|:|=|\\+|-|\\*|\\/|\\%|<|>)\\d*\\.?\\d+/g,
      methods: /\\w+(?=\\()/g,
      object: /\\w+\\./sg,
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
      ._commonDealWith(option.regexp, 'regexp')
      ._commonDealWith(option.number, 'number')
      ._commonDealWith(option.constant, 'constant')
      ._keyword(option.keywords)
      ._commonDealWith(option.methods, 'methods')
      ._commonDealWith(option.object, 'object')
      ._merge();
  }

}
`,V=`type Callback = (e: CustomEvent) => void
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
`,X=`import { createArray } from "../../utils/array"

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
`,G=`
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
`,U=`import { isType } from "~/core/utils/judge"

interface JSTypeMap {
  String:    string
  Number:    number
  Boolean:   boolean
  Symbol:    symbol
  Bigint:    bigint
  Undefined: undefined
  Null:      null
  RegExp:    RegExp
  Date:      Date
  Array:     Array<any>
  Object:    object
  Function:  Function
  Promise:   Promise<any>
  Set:       Set<any>
  Map:       Map<any, any>
  WeakSet:   WeakSet<any>
  WeakMap:   WeakMap<any, any>
  WeakRef:   WeakRef<any>
  Error:     Error
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

  _map = new Map();

  addImpl<T extends JSTypeName[]>(...args: [...T, (...args: ArgsTppe<T>) => any]) {
    const fn = args.pop();
    if (isType(fn) !== 'Function') {
      throw new Error('Last argument must be a function');
    }

    const key = args.join(',');
    this._map.set(key, fn);
  }

  overload(...args: any[]) {
    const key = args.map(it => isType(it)).join(',')
    const fn = this._map.get(key);
    if (!fn) {
      throw new Error(\`No implementation for \${key}\`);
    }
    return fn.apply(this, args);
  }

}
`,q=`export class Inlay {
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
`,Z=`
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
      return this._weakMap.get(key);
    }
    return this._map.get(key);
  }

  has(key: K) {
    if (this._isObject(key)) {
      this._weakMap.has(key);
    } else {
      this._map.has(key);
    }
  }
}
`,Y=`
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
}`,Q=`
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
`,nn=`
/**
 * 创建动画函数
 * @param scrollStart 滚动条开始位置
 * @param scrollEnd   滚动条结束位置
 * @param valueStart  开始值
 * @param valueEnd    结束值
 * @returns 
 */
export function createAnimation(scrollStart: number, scrollEnd: number, valueStart: number, valueEnd: number) {
  return (scroll: number) => {
    if (scroll <= scrollStart) return valueStart;
    if (scroll >= scrollEnd) return valueEnd;

    return valueStart + (valueEnd - valueStart) * (scroll - scrollStart) / (scrollEnd - scrollStart);
  }
}

type Option = {
  scrollEl:   Element
  direction?: 'x' | 'y'
}
type Value = {
  [k in keyof CSSStyleDeclaration]?: (scroll: number) => string | number
}
export class ScrollAnimation {

  option: Partial<Option> = {
    direction: 'y',
  }
  constructor(option: Option) {
    Object.assign(this.option, option);
  }

  animationMap = new Map();
  set(dom: Element, value: Value) {
    this.animationMap.set(dom, value);
  }

  updateStyles() {
    const { option, animationMap } = this;
    const scroll = option.scrollEl[option.direction === 'y' ? 'scrollTop' : 'scrollLeft'];
    for (const [ dom, value ] of animationMap) {
      for (const cssProps in value) {
        dom.style[cssProps] = value[cssProps](scroll);
      }
    }
  }

}`,tn=`import { createNum } from "~/core/utils/generator"
import { getLSUsedSpace } from "~/core/utils/object"

type Key = string | number | symbol
interface Item {
  createTime: number
  value:      any
  overTime:   number
  count:      number
}

export class CacheBasic {
  map = new Map<Key, Item>();
  #iter = createNum();

  /**
   * 设置缓存数据
   * @param {string | symbol} key 如果不想覆盖此属性，请将 key 设置为 Symbol 类型
   * @param {*} value 
   * @param {number} overTime 过期时间，单位（ms）
   */
  set(key: Key, value: Item['value'], overTime: Item['overTime'] = Infinity) {
    if (key === null || key === undefined || key === '') return;
    this.map.set(key, {
      createTime: Date.now(),
      value,
      overTime: overTime,
      count: this.#iter.next().value as number,  // 同一毫秒内可能存很多数据，记录一个索引，越小则证明存放时间越早
    })
  }

  /**
   * 获取数据（过期后不会返回）
   * @param key
   * @returns 
   */
  get(key: Key) {
    const value = this.map.get(key);
    if (value == null) return;

    if (Date.now() - value.createTime > value.overTime) {
      this.delete(key);
    }
    const newValue = this.map.get(key);
    return newValue && newValue.value;
  }

  /**
   * 检测数据是否过期
   * @param key 
   * @returns 
   */
  isExpire(key: Key) {
    const value = this.map.get(key);
    if (value == null) return true;
    if (Date.now() - value.createTime > value.overTime) {
      return true;
    }
    return false;
  }

  /**
   * 删除数据
   * @param key 
   */
  delete(key: Key) {
    this.map.delete(key);
  }

  /**
   * 清空所有数据
   */
  clear() {
    this.map.clear();
  }

  /**
   * 获取缓存数据长度
   * @returns 
   */
  length() {
    return this.map.size;
  }

  /**
   * 获取缓存数据大小
   * @returns 
   */
  get size() {
    return getLSUsedSpace(this.gainAll());
  }

  /**
   * 获取所有缓存数据
   * @returns 
   */
  gainAll() {
    const result = {};
    for (const [k, v] of this.map) {
      result[k] = v.value;
    }
    return result;
  }
}

interface SortItem extends Item {
  key: Key
}

export class SimulateRedis extends CacheBasic {
  /**
   * 模拟 Redis 缓存场景
   * @param maxSize 最大储存大小
   */
  constructor(maxSize = 1024 * 1024 * 2) {
    super();
    this.maxSize = maxSize;
  }
  maxSize: number

  /**
   * 存/取 数据一体，如果已经存在并且没有过期你会直接获取到该数据
   * @param key      设置存放数据的键
   * @param value    是一个函数时(必须返回数据)：可以进行数据请求，有缓存时并不会执行；其他类型：直接将数据存放进去
   * @param overTime 过期时间，为 -1 时数据不过期。设置更小的数无意义
   * @param cover    强制覆盖数据
   * @returns 返回设置的 value
   */
  async deposit<V>(key: Key, value?: V | (() => V | Promise<V>), overTime: Item['overTime'] = -1, cover: boolean = false): Promise<V> {
    if (overTime === -1) overTime = Infinity;  // 设置过期时间正无穷，使数据永久不会过期

    if (cover) {
      // @ts-ignore
      typeof value === 'function' ? value = await value() : value;
      this.set(key, value, overTime);
      return this.get(key);
    }

    const data = this.get(key)
    if (data) return data;

    // @ts-ignore
    typeof value === 'function' ? value = await value() : value;
    this.set(key, value, overTime);  // 先存数据后清内存，防止溢出

    this.deleteOverValue();
    this.clearCache();

    return this.get(key);
  }

  /**
   * 清除已过期数据
   * @returns 
   */
  clearCache() {
    if (this.size < this.maxSize) return;

    const arr: SortItem[] = [];
    for (const [k, v] of Object.entries(this.map)) {
      if (v.overTime === Infinity) continue;  // 跳过设置不过期数据
      arr.push({key: k, ...v});
    }
    const newArr = choiceSort(arr);
    this.deleteFristValue(newArr);
  }

  /**
   * 删除过期的数据
   */
  deleteOverValue() {
    const curTime = Date.now();
    for (const [k, v] of Object.entries(this.map)) {
      const createTime = v.createTime;
      const overTime = v.overTime;
      if (curTime - createTime > overTime) {
        this.delete(k);
      }
    }
  }

  /**
   * 删除最早缓存的数据
   * @param arr 
   * @returns 
   */
  deleteFristValue(arr: SortItem[]) {
    const key = arr[0].key;
    arr.shift();
    this.delete(key);

    if (this.size <= this.maxSize) return;
    this.deleteFristValue(arr);  // 如果容器内存依然大于设定内存，继续删
  }
}

/**
 * 数据排序算法
 * @param arr 
 * @returns 
 */
function choiceSort(arr: SortItem[]) {
  const len = arr.length;
  if (arr == null || len === 0) return [];
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1; j++) {
      const minValue = arr[j];
      if (minValue.count > arr[j + 1].count) {
        [arr[j], arr[j + 1]] = [arr[j + 1], minValue];  // 调换位置
      }
    }
  }
  return arr;
}
`,en=`
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
`,on=`import { PromiseFn } from "../../utils/type"

type TaskItem = {
  task:    PromiseFn
  resolve: Function
  reject:  Function
}

export class TaskScheduling {
  _parallelCount: number  // 并行执行任务数
  _runingCount = 0;       // 执行任务计数
  _currentIndex = 0;      // 当前执行索引
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
   * 结束任务
   */
  onEnd: Function

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
          this._currentIndex ++;
          if (this._currentIndex === this.tasks.length) {
            this.onEnd && this.onEnd();
          }
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
`,rn=`import { indexCorrect } from "../../utils/number";

type Record = {
  origin: string
  target: string
  start:  number
  end:    number
  append: string
}
type Option = {
  text: string
  onInsert?: (record: Record) => void
  onReset?: (item: { target: string, start: number, end: number, origin: string }) => void
}
export class TextInsert {
  constructor(option: Option) {
    this.option = option;
    this.text = option.text;
    this.records = [{ start: 0, end: 0, append: option.text, origin: '', target: option.text }];
    option.onInsert?.(this.records[0]);
  }
  option: Option
  records: Record[]
  text: string

  /**
   * 插入文本
   * @param content 
   * @param start 
   * @param end 
   * @returns 
   */
  insert(content: string, start: number | ((t: string) => number), end?: number | ((t: string) => number)) {
    const t = this.text;
    start = typeof start === 'function' ? start(t) : start;
    end = typeof end === 'function' ? end(t) : end ?? start;
    const target = t.slice(0, start) + content + t.slice(end);
    const len = this.text.length - 1;
    const item: Record = {
      target,
      origin: this.text,
      start: indexCorrect(len, start),
      end: indexCorrect(len, end),
      append: content,
    }
    this.records.push(item);
    this.text = target;
    this.option.onInsert?.(item);
    return this.records.length - 1;
  }

  /**
   * 向前插入内容
   * @param content 
   * @param reg 
   * @returns 
   */
  insertFirst(content: string, reg: RegExp) {
    return this.insert(content, t => t.search(reg));
  }

  /**
   * 向后插入内容
   * @param content 
   * @param reg 
   * @returns 
   */
  insertLast(content: string, reg: RegExp) {
    return this.insert(content, t => {
      const matched = t.match(reg);
      if (!matched) return 0;
      return matched.index + matched[0].length;
    });
  }

  /***
   * 重置到指定位置
   * @param last
   */
  reset(index?: number) {
    const last = indexCorrect(this.records.length - 1, index) + 1;
    const item = this.records[last];
    const start = item.start, end = start + item.append.length;
    this.option.onReset?.({
      target: item.origin,
      origin: this.text,
      start,
      end,
    });
    this.text = item.origin;
    this.records.length = last;
    return [start, end];
  }
}
`,sn=`
type VoiceTextSplitOption = {
  rouseKeywords: string[]          // 唤醒关键词
  endKeywords?:  string[]          // 结束关键词
  autoEndTime?:  number | false    // 自动结束时间
  onMessage:     (str: string, normal?: string) => void  // 消息回调
  onComplete?:   (str: string) => void  // 完整的消息回调
  onRouseStart?: (str: string) => void  // 唤醒开始回调
  onRouseStop?:  (str: string) => void  // 唤醒停止回调
  onAutoStop?:   (str: string) => void  // 自动结束回调
}
export class VoiceTextSplit {
  constructor(option: VoiceTextSplitOption) {
    Object.assign(this.option, option);
    this.regRouse = new RegExp(\`(\${option.rouseKeywords.join('|')})\`, 'g');
    if (this.option.endKeywords) {
      this.regEnd = new RegExp(\`(\${this.option.endKeywords.join('|')})\`, 'g');
    }
  }
  option = {
    autoEndTime: 3000,
  } as VoiceTextSplitOption

  status: 'running' | 'finish' = 'finish';
  regRouse: RegExp
  regEnd: RegExp
  text = '';
  _count = 0;
  _timer: ReturnType<typeof setTimeout>

  add(str: string) {
    const { status, _count, regRouse, regEnd, option } = this;
    if (status === 'finish') return;

    clearTimeout(this._timer);  // 清除定时器
    this.text += str;
    const rouseMatched = this.text.match(regRouse);
    if (!rouseMatched) return;

    // 匹配到唤醒词
    if (rouseMatched.length > _count) {
      const normal = rouseMatched[rouseMatched.length - 1];
      const index = this.text.search(normal);
      const content = this.text.slice(index);
      option.onMessage(_count === 0 ? content : str, normal);
      option.onRouseStart?.(content);
      if (_count > 0) {
        option.onComplete?.(this.text.slice(0, index));
      }
      this.text = this.text.slice(index);
      this._count = rouseMatched.length;
    } else {
      option.onMessage(str);

      // 匹配到结束词
      if (regEnd) {
        const endMatched = this.text.match(regEnd);
        if (endMatched) {
          option.onRouseStop?.(this.text);
          this.stop();
          return;
        }
      }
    }

    // 长时间无录入，自动结束
    if (option.autoEndTime) {
      this._timer = setTimeout(() => {
        option.onAutoStop?.(this.text);
        this.stop();
      }, option.autoEndTime);  // 超过设定时间自动结束
    }
  }

  start() {
    this.status = 'running';
  }

  stop() {
    if (this._count > 0) {
      this.option.onComplete?.(this.text);
    }
    this.status = 'finish';
    this.text = '';
    this._count = 0;
    clearTimeout(this._timer);
  }
}`,an=`import { BloomFilter } from ".";

export default () => {
  const bloom = new BloomFilter(1024 * 8, 32);
  bloom.add('foo');
  bloom.add("bar");

  console.log('foo:', bloom.has('foo'));
  console.log('bar:', bloom.has('bar'));
  console.log('baz:', bloom.has('baz'));
}
`,ln=`import { CodeConversion } from '.';

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
}`,cn=`import { EventEmitter } from ".";

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
    console.log(e.detail);
  })


  // 等待事件触发
  const button2 = document.createElement('button');
  button2.innerText = 'wait event';
  const btn = EventEmitter.wait(button2);
  container.appendChild(button2);
  (async function() {
    while (1) {
      const e: PointerEvent = await btn.waitClick;
      console.log(e.detail);
    }
  }())
}`,un=`import { Fulls } from ".";

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
`,mn=`import { FullScreen } from '.';

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
}`,dn=`import { FuncOverload } from "."

export default () => {
  const f = new FuncOverload();

  f.addImpl('Number', 'Number', (a, b) => {
    return a + b
  })
  const sum = f.overload(1, 2);
  console.log(sum);

  f.addImpl('String', 'String', (a, b) => {
    return 'str: ' + a + b
  })
  const str = f.overload('a', 'b');
  console.log(str);
}`,pn=`import { Inlay } from ".";

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
}`,hn=`import { MemoizeMap } from '.'

export default () => {
  const m = new MemoizeMap();
  m.set('a', 1);
  m.set({}, 2);

  console.log(m.get('a'));
}`,gn=`import { Onion } from '.'

export default () => {
  const onion = new Onion({
    a: 123,
  });

  onion.use((ctx, next) => {
    console.log('中间件1：', ctx.a);
    ctx.a = 456;
    next();
    console.log('中间件1：end');
    return ctx;
  });

  onion.use((ctx, next) => {
    console.log('中间件2：', ctx.a);
    next();
    console.log('中间件2：end');
  });

  onion.callback().then(res => {
    console.log('result: ', res);
  });
}
`,fn=`import { PublishSubscribe } from "."

export default () => {
  const pubSub = new PublishSubscribe();

  const container = document.getElementById('container');
  pubSub.on('test', (data) => {
    console.log(data);
  })

  const button = document.createElement('button');
  button.innerText = '发送事件';
  button.addEventListener('click', () => {
    pubSub.emit('test', 'hello world');
  });

  container.appendChild(button);
}
`,_n=`import { createAnimation, ScrollAnimation } from ".";

export default () => {
  const container = document.getElementById('container');
  container.style.height = '500px';
  container.style.position = 'relative';

  const htmlStr = \`<div class='scroll-animation-wrap' style='height: 1100px;'>
    <div class='carry-off' style='margin-top: 300px; height: 500px; border: 1px dashed;'>
      <div class='remain' style='position: sticky; top: 0; height: 300px; border: 1px solid orange;'>
        <div class='box' style='width: 200px; height: 200px; background: red; position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto;'></div>
      </div>
    </div>
  </div>\`
  const domparser = new DOMParser();
  const dom = domparser.parseFromString(htmlStr, 'text/html').body.firstChild;
  container.appendChild(dom);

  const absorb = new ScrollAnimation({
    scrollEl: container,
  });

  absorb.set(document.querySelector('.scroll-animation-wrap .box'), {
    opacity(scroll) {
      return createAnimation(100, 400, 0, 1)(scroll);
    },
    transform(scroll) {
      const ani = createAnimation(100, 300, -100, 0);
      return \`translateX(\${ani(scroll)}px)\`;
    }
  })

  absorb.updateStyles();
  container.addEventListener('scroll', (e) => {
    absorb.updateStyles();
  })
}`,xn=`import { SimulateRedis } from "."

export default async () => {
  const redis = new SimulateRedis();
  const r1 = await redis.deposit(1, () => {
    console.log('缓存数据');
    return 123;
  }, 100);  // 100ms后过期
  console.log('r1', r1);

  setTimeout(async () => {
    const r2 = await redis.deposit(1, () => {
      console.log('已缓存过，不会执行');
      return 456;
    });
    console.log('r2', r2); // 123
  }, 50);

  setTimeout(async () => {
    const r3 = await redis.deposit(1, () => {
      console.log('重新缓存数据');
      return 789;
    }, 100);
    console.log('r3', r3); // 123
  }, 200);
}`,bn=`import { StreamSplit } from ".";
import { delay } from "../../utils/async";

export default () => {
  const container = document.getElementById('container');
  const stream = new StreamSplit({
    onMessage(msg) {
      const json = JSON.parse(msg);
      console.log(json);
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
}`,yn=`import { TaskScheduling } from ".";
import { delay } from "../../utils/async";

export default () => {
  const task = new TaskScheduling(3);

  const start = Date.now();
  task.onEnd = () => {
    console.log('总耗时：', Date.now() - start);
  }

  task.add(func(100));
  task.add(func(200));
  task.add(func(150));
  task.add(func(250)).then(res => console.log('task'));
  task.add(func(180));
  task.add(func(200));
  task.add(func(300));

  function func(num: number) {
    return async () => {
      await delay(num);
      console.log(num);
      return num;
    }
  }
}`,vn=`import { TextInsert } from "."

export default () => {
  const pre = document.createElement('pre');
  document.getElementById('container').appendChild(pre);

  const ti = new TextInsert({
    text: \`class Car {\\n  constructor(name: string) {\\n  }\\n}\`,
    onInsert(item) {
      pre.textContent = item.target;
    },
    onReset(item) {
      pre.textContent = item.target;
    }
  })

  ti.insertLast(\`\\n  name = 'hello';\\n\`, /constructor\\(.+\\)\\s?\\{\\n.*\\}\\n/);
  ti.insert(\`\\n  fn () {
    console.log(this.name);
  }\\n\`, -1)
  ti.insertFirst(\`\\n  age = 18;\`, /\\n  name = /);
  ti.insertFirst(\`\\n  age = 20;\`, /\\n  name = /);
  ti.reset(-1);  // 向前回退，撤回
}`,wn=`import { delay } from "../../utils/async";
import { VoiceTextSplit } from "."

export default async () => {
  const container = document.getElementById('container');
  const content = document.createElement('pre');

  const arr = [];
  function render() {
    content.innerHTML = JSON.stringify(arr, null, 2);
  }

  const voiceSplit = new VoiceTextSplit({
    rouseKeywords: ['你好小肚', '小肚，小肚'],
    endKeywords: ['结束', '完了'],
    onRouseStart(str) {
      arr.push({ type: 'rouse', text: str });
      arr.push({ type: 'reply', text: '哎，俺在！' });
      arr.push({ type: 'talk', text: '' });
      render();
    },
    onMessage(str, normal) {
      if (!arr.length) return;
      const lastItem = arr[arr.length - 1];
      lastItem.text += str;
      if (normal) {
        lastItem.text = lastItem.text.replace(normal, '');
      }
      render();
    },
  })

  async function talk() {
    if (voiceSplit.status === 'running') return;  // 收录过程中
    voiceSplit.start();
    const str = '这是个语音合成的文字哈。你好小肚，我是你爸爸，小肚，小肚，乃鼻窦了一天天是，叫你也不吭个气。说完了小杂毛，';
    for (const v of str) {
      await delay(100);
      voiceSplit.add(v);
    }
  }
  talk();

  const startBtn = document.createElement('button');
  startBtn.innerText = '开始收录';
  startBtn.onclick = talk;
  const endBtn = document.createElement('button');
  endBtn.innerText = '停止收录';
  endBtn.onclick = () => voiceSplit.stop();
  container.append(startBtn, endBtn, content);
}`;class Sn{constructor(n=1024**2*8,t=16){a(this,"m");a(this,"k");a(this,"buckets");a(this,"_locations");const e=Math.ceil(n/32);let r=-1;if(this.m=n=e*32,this.k=t,typeof ArrayBuffer<"u"){const s=1<<Math.ceil(Math.log(Math.ceil(Math.log(n)/Math.LN2/8))/Math.LN2),i=s===1?Uint8Array:s===2?Uint16Array:Uint32Array,l=new ArrayBuffer(s*t),c=this.buckets=new Int32Array(e);if(n)for(;++r<e;)c[r]=n[r];this._locations=new i(l)}else{const s=this.buckets=[];if(n)for(;++r<e;)s[r]=n[r];else for(;++r<e;)s[r]=0;this._locations=[]}}locations(n){const t=this.k,e=this.m,r=this._locations,s=j(n),i=j(n,1576284489);let l=s%e;for(let c=0;c<t;++c)r[c]=l<0?l+e:l,l=(l+i)%e;return r}add(n){const t=this.locations(n);for(let e=0;e<this.k;++e)this.buckets[Math.floor(t[e]/32)]|=1<<t[e]%32}has(n){let t=this.locations(n);for(let e=0;e<this.k;++e){let r=t[e];if(!(this.buckets[Math.floor(r/32)]&1<<r%32))return!1}return!0}delete(n){const t=this.locations(n);for(let e=0;e<this.k;++e){let r=t[e];this.buckets[Math.floor(r/32)]&=~(1<<r%32)}}clear(){this.buckets.fill(0)}get size(){const n=this.buckets,t=n.length,e=this.m,r=this.k;let s=0;for(let i=0,l=t;i<l;++i)s+=kn(n[i]);return-e*Math.log(1-s/e)/r}}function kn(o){return o-=o>>1&1431655765,o=(o&858993459)+(o>>2&858993459),(o+(o>>4)&252645135)*16843009>>24}function j(o,n=0){let t=2166136261^n;for(let e=0,r=o.length;e<r;++e){let s=o.charCodeAt(e),i=s&65280;i&&(t=I(t^i>>8)),t=I(t^s&255)}return En(t)}function I(o){return o+(o<<1)+(o<<4)+(o<<7)+(o<<8)+(o<<24)}function En(o){return o+=o<<13,o^=o>>>7,o+=o<<3,o^=o>>>17,o+=o<<5,o&4294967295}const Mn=()=>{const o=new Sn(8192,32);o.add("foo"),o.add("bar"),console.log("foo:",o.has("foo")),console.log("bar:",o.has("bar")),console.log("baz:",o.has("baz"))},Tn=Object.freeze(Object.defineProperty({__proto__:null,default:Mn},Symbol.toStringTag,{value:"Module"})),Cn=()=>{const o=`
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
`,t=new N({keywords:["rule","end","knowledgebase","knowledge","reg","require","prohibit","and","or","in","true","false"]}).output(o);document.getElementById("container").innerHTML=`<pre>${t}</pre>`},On=Object.freeze(Object.defineProperty({__proto__:null,default:Cn},Symbol.toStringTag,{value:"Module"}));class F extends EventTarget{constructor(){super(...arguments);a(this,"emit",(t,e)=>{this.dispatchEvent(new CustomEvent(t,{detail:e}))});a(this,"on",this.addEventListener);a(this,"once",(t,e)=>{this.on(t,e,{once:!0,capture:!0})});a(this,"off",this.removeEventListener)}static wait(t){return new Proxy(t,{get(r,s){if(!s.startsWith("wait"))return;const i=s.replace("wait","").toLowerCase();return new Promise(l=>{r.addEventListener(i,l,{once:!0})})}})}}const jn=()=>{const o=document.getElementById("container"),n=new F,t=document.createElement("button");t.innerText="send",t.addEventListener("click",()=>{n.emit("send","hello world!")}),o.appendChild(t),n.on("send",s=>{console.log(s.detail)});const e=document.createElement("button");e.innerText="wait event";const r=F.wait(e);o.appendChild(e),async function(){for(;;){const s=await r.waitClick;console.log(s.detail)}}()},In=Object.freeze(Object.defineProperty({__proto__:null,default:jn},Symbol.toStringTag,{value:"Module"}));class Fn{constructor(n={}){a(this,"option");a(this,"_matrix");const{column:t,rowGap:e,colGap:r,el:s}=n;if(this.option={column:t||5,rowGap:e||20,colGap:r||14},!s)return;s.style.position="relative";const i=[...s.children],l=i.map(d=>d.offsetHeight),{itemWidth:c,positions:m,wrapHeight:h}=this.compute(s.clientWidth,l);i.forEach((d,g)=>{d.style.position="absolute",d.style.width=c+"px",d.style.top=m[g].top+"px",d.style.left=m[g].left+"px"}),s.style.height=h+"px"}compute(n,t){const e=this.computeItemWidth(n),r=this.computeItemPosition(t,e),s=this.computeWrapHeight();return{itemWidth:e,positions:r,wrapHeight:s}}computeItemWidth(n){return(n-this.option.rowGap*(this.option.column-1))/this.option.column}computeItemPosition(n,t){this._matrix=O(this.option.column,[0]);const e=[];for(let r=0;r<n.length;r++){const s=this._queryColumn("min"),i=this._matrix[s].reduce((l,c)=>l+c);e.push({top:i+this.option.colGap*(this._matrix[s].length-1),left:s*(t+this.option.rowGap)}),this._matrix[s].push(n[r])}return e}computeWrapHeight(){const n=this._queryColumn("max");return this._matrix[n].reduce((t,e)=>t+e+this.option.rowGap)-this.option.rowGap}_queryColumn(n){const t=O(this._matrix.length,0);for(let r=0;r<this._matrix.length;r++)t[r]=this._matrix[r].reduce((s,i)=>s+i);const e=Math[n].apply(null,t);return t.indexOf(e)}}const Rn=()=>{const o=document.createElement("div");[200,300,270,100,400,100,200,300,100,140].forEach((t,e)=>{const r=document.createElement("div");r.innerText=e+"",r.style.height=`${t}px`,r.style.background="#eee",o.appendChild(r)}),document.getElementById("container").appendChild(o),new Fn({el:o,column:Math.max(Math.trunc(o.offsetWidth/200),2)})},Ln=Object.freeze(Object.defineProperty({__proto__:null,default:Rn},Symbol.toStringTag,{value:"Module"}));class _{constructor(){a(this,"enterFullScreenName");a(this,"exitFullScreenName");a(this,"fullScreenName");this.enterFullScreenName=_.getPropertyName(["requestFullscreen","mozRequestFullScreen","webkitRequestFullScreen","msRequestFullScreen"],document.documentElement),this.exitFullScreenName=_.getPropertyName(["exitFullscreen","mozCancelFullScreen","webkitExitFullScreen","msExitFullScreen"],document),this.fullScreenName=_.getPropertyName(["fullscreenElement","mozFullScreenElement","webkitFullScreenElement","msFullScreenElement"],document)}static getPropertyName(n,t){return n.find(e=>e in t)}enter(n=document.documentElement){this.enterFullScreenName&&n[this.enterFullScreenName]()}exit(){this.isFull()&&this.exitFullScreenName&&document[this.exitFullScreenName]()}isFull(){return!!this.getEl()}toggle(n=document.documentElement){this.isFull()?this.exit():this.enter(n)}getEl(){return document[this.fullScreenName]||null}}const An=()=>{const o=document.getElementById("container"),n=new _,t=[{name:"进入全屏",handler:()=>n.enter()},{name:"退出全屏",handler:()=>n.exit()},{name:"进入/退出全屏",handler:()=>n.toggle()},{name:"是否处于全屏状态全屏",handler:()=>console.log(n.isFull())},{name:"指定元素进入/退出全屏",handler:()=>n.toggle(o)}],e=document.createElement("div");t.forEach(r=>{const s=document.createElement("button");s.innerText=r.name,s.addEventListener("click",()=>{r.handler()}),e.appendChild(s)}),o.appendChild(e)},Wn=Object.freeze(Object.defineProperty({__proto__:null,default:An},Symbol.toStringTag,{value:"Module"}));class Nn{constructor(){a(this,"_map",new Map)}addImpl(...n){const t=n.pop();if(C(t)!=="Function")throw new Error("Last argument must be a function");const e=n.join(",");this._map.set(e,t)}overload(...n){const t=n.map(r=>C(r)).join(","),e=this._map.get(t);if(!e)throw new Error(`No implementation for ${t}`);return e.apply(this,n)}}const Pn=()=>{const o=new Nn;o.addImpl("Number","Number",(e,r)=>e+r);const n=o.overload(1,2);console.log(n),o.addImpl("String","String",(e,r)=>"str: "+e+r);const t=o.overload("a","b");console.log(t)},zn=Object.freeze(Object.defineProperty({__proto__:null,default:Pn},Symbol.toStringTag,{value:"Module"}));var y;class Bn{constructor(){f(this,y,new Map);const n=u(this,y);return new Proxy(this,{get(t,e){return n.has(e)?n.get(e):(Reflect.set(t,e,function(r,...s){if(!r){console.warn(`[${e.toString()}] is empty`);return}let i="";for(let l=0;l<s.length;l++)i+=r[l],i+=s[l];return i+=r[r.length-1],n.set(e,i),r[0]}),t[e])}})}}y=new WeakMap;const Dn=()=>{const o=document.getElementById("container");o.innerText="hello";const n=new Bn;n.text`
    --color: red;
    color: var(--color);
  `,o.style=n.text},Kn=Object.freeze(Object.defineProperty({__proto__:null,default:Dn},Symbol.toStringTag,{value:"Module"}));class Jn{constructor(){a(this,"_map",new Map);a(this,"_weakMap",new WeakMap)}_isObject(n){return typeof n=="object"&&n!==null}set(n,t){this._isObject(n)?this._weakMap.set(n,t):this._map.set(n,t)}get(n){return this._isObject(n)?this._weakMap.get(n):this._map.get(n)}has(n){this._isObject(n)?this._weakMap.has(n):this._map.has(n)}}const $n=()=>{const o=new Jn;o.set("a",1),o.set({},2),console.log(o.get("a"))},Hn=Object.freeze(Object.defineProperty({__proto__:null,default:$n},Symbol.toStringTag,{value:"Module"}));var x,v,L;class Vn{constructor(n){f(this,v);a(this,"ctx");f(this,x,[]);this.ctx=n}use(n){u(this,x).push(n)}async callback(){return await T(this,v,L).call(this,u(this,x),this.ctx,()=>{})}}x=new WeakMap,v=new WeakSet,L=function(n,t,e){function r(s){let i=n[s];return s===n.length&&(i=e),Promise.resolve(i(t,r.bind(null,++s)))}return r(0)};const Xn=()=>{const o=new Vn({a:123});o.use((n,t)=>(console.log("中间件1：",n.a),n.a=456,t(),console.log("中间件1：end"),n)),o.use((n,t)=>{console.log("中间件2：",n.a),t(),console.log("中间件2：end")}),o.callback().then(n=>{console.log("result: ",n)})},Gn=Object.freeze(Object.defineProperty({__proto__:null,default:Xn},Symbol.toStringTag,{value:"Module"})),{warn:b}=console;var p;class Un{constructor(){f(this,p,new Map)}on(n,t){u(this,p).has(n)&&b(`${n} already exists`),u(this,p).set(n,{fn:t})}once(n,t){if(u(this,p).has(n)){b(`${n} already exists`);return}u(this,p).set(n,{fn:t,once:!0})}emit(n,...t){const e=u(this,p).get(n);if(!e){b(`no implementation for ${n}`);return}const r=e.fn(...t);return e.once&&u(this,p).delete(n),r}off(n){u(this,p).delete(n)}offAll(){u(this,p).clear()}reset(n,t,e=!1){if(!u(this,p).has(n)){b(`${n} not exists`);return}u(this,p).set(n,{fn:t,once:e})}}p=new WeakMap;const qn=()=>{const o=new Un,n=document.getElementById("container");o.on("test",e=>{console.log(e)});const t=document.createElement("button");t.innerText="发送事件",t.addEventListener("click",()=>{o.emit("test","hello world")}),n.appendChild(t)},Zn=Object.freeze(Object.defineProperty({__proto__:null,default:qn},Symbol.toStringTag,{value:"Module"}));function R(o,n,t,e){return r=>r<=o?t:r>=n?e:t+(e-t)*(r-o)/(n-o)}class Yn{constructor(n){a(this,"option",{direction:"y"});a(this,"animationMap",new Map);Object.assign(this.option,n)}set(n,t){this.animationMap.set(n,t)}updateStyles(){const{option:n,animationMap:t}=this,e=n.scrollEl[n.direction==="y"?"scrollTop":"scrollLeft"];for(const[r,s]of t)for(const i in s)r.style[i]=s[i](e)}}const Qn=()=>{const o=document.getElementById("container");o.style.height="500px",o.style.position="relative";const n=`<div class='scroll-animation-wrap' style='height: 1100px;'>
    <div class='carry-off' style='margin-top: 300px; height: 500px; border: 1px dashed;'>
      <div class='remain' style='position: sticky; top: 0; height: 300px; border: 1px solid orange;'>
        <div class='box' style='width: 200px; height: 200px; background: red; position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto;'></div>
      </div>
    </div>
  </div>`,e=new DOMParser().parseFromString(n,"text/html").body.firstChild;o.appendChild(e);const r=new Yn({scrollEl:o});r.set(document.querySelector(".scroll-animation-wrap .box"),{opacity(s){return R(100,400,0,1)(s)},transform(s){return`translateX(${R(100,300,-100,0)(s)}px)`}}),r.updateStyles(),o.addEventListener("scroll",s=>{r.updateStyles()})},nt=Object.freeze(Object.defineProperty({__proto__:null,default:Qn},Symbol.toStringTag,{value:"Module"}));var w;class tt{constructor(){a(this,"map",new Map);f(this,w,P())}set(n,t,e=1/0){n==null||n===""||this.map.set(n,{createTime:Date.now(),value:t,overTime:e,count:u(this,w).next().value})}get(n){const t=this.map.get(n);if(t==null)return;Date.now()-t.createTime>t.overTime&&this.delete(n);const e=this.map.get(n);return e&&e.value}isExpire(n){const t=this.map.get(n);return t==null||Date.now()-t.createTime>t.overTime}delete(n){this.map.delete(n)}clear(){this.map.clear()}length(){return this.map.size}get size(){return z(this.gainAll())}gainAll(){const n={};for(const[t,e]of this.map)n[t]=e.value;return n}}w=new WeakMap;class et extends tt{constructor(t=1024*1024*2){super();a(this,"maxSize");this.maxSize=t}async deposit(t,e,r=-1,s=!1){if(r===-1&&(r=1/0),s)return typeof e=="function"&&(e=await e()),this.set(t,e,r),this.get(t);const i=this.get(t);return i||(typeof e=="function"&&(e=await e()),this.set(t,e,r),this.deleteOverValue(),this.clearCache(),this.get(t))}clearCache(){if(this.size<this.maxSize)return;const t=[];for(const[r,s]of Object.entries(this.map))s.overTime!==1/0&&t.push({key:r,...s});const e=ot(t);this.deleteFristValue(e)}deleteOverValue(){const t=Date.now();for(const[e,r]of Object.entries(this.map)){const s=r.createTime,i=r.overTime;t-s>i&&this.delete(e)}}deleteFristValue(t){const e=t[0].key;t.shift(),this.delete(e),!(this.size<=this.maxSize)&&this.deleteFristValue(t)}}function ot(o){const n=o.length;if(o==null||n===0)return[];for(let t=0;t<n-1;t++)for(let e=0;e<n-1;e++){const r=o[e];r.count>o[e+1].count&&([o[e],o[e+1]]=[o[e+1],r])}return o}const rt=async()=>{const o=new et,n=await o.deposit(1,()=>(console.log("缓存数据"),123),100);console.log("r1",n),setTimeout(async()=>{const t=await o.deposit(1,()=>(console.log("已缓存过，不会执行"),456));console.log("r2",t)},50),setTimeout(async()=>{const t=await o.deposit(1,()=>(console.log("重新缓存数据"),789),100);console.log("r3",t)},200)},st=Object.freeze(Object.defineProperty({__proto__:null,default:rt},Symbol.toStringTag,{value:"Module"}));class it{constructor(n={}){a(this,"option",{normal:/data:(.+)?\n\n/});a(this,"_text","");Object.assign(this.option,n)}add(n){this._text+=n;const{normal:t,onMessage:e}=this.option,r=[];for(;;){const s=this._text.match(t);if(!s)break;const i=s[1];r.push(i),this._text=this._text.slice(s[0].length),e&&e(i)}return r}}const at=()=>{const o=document.getElementById("container"),n=new it({onMessage(t){const e=JSON.parse(t);console.log(e);const r=document.createTextNode(e.data);o.appendChild(r)}});(async function(){const t=["hello",", ","world","!"];for(const e of t){const r={data:e,time:Date.now()};n.add(`data:${JSON.stringify(r)}

`),await k(100)}})()},lt=Object.freeze(Object.defineProperty({__proto__:null,default:at},Symbol.toStringTag,{value:"Module"}));class ct{constructor(n=5){a(this,"_parallelCount");a(this,"_runingCount",0);a(this,"_currentIndex",0);a(this,"tasks",[]);a(this,"onEnd");this._parallelCount=n}add(n){const t=new Promise((e,r)=>{this.tasks.push({task:n,resolve:e,reject:r})});return this._run(),t}_run(){for(;this.tasks.length>this._runingCount&&this._runingCount<this._parallelCount;){const{task:n,resolve:t,reject:e}=this.tasks[this._runingCount];this._runingCount++,n().then(r=>t(r)).catch(r=>e(r)).finally(()=>{this._continue(),this._currentIndex++,this._currentIndex===this.tasks.length&&this.onEnd&&this.onEnd()})}}_continue(){this._parallelCount++,this._run()}}const ut=()=>{const o=new ct(3),n=Date.now();o.onEnd=()=>{console.log("总耗时：",Date.now()-n)},o.add(t(100)),o.add(t(200)),o.add(t(150)),o.add(t(250)).then(e=>console.log("task")),o.add(t(180)),o.add(t(200)),o.add(t(300));function t(e){return async()=>(await k(e),console.log(e),e)}},mt=Object.freeze(Object.defineProperty({__proto__:null,default:ut},Symbol.toStringTag,{value:"Module"}));class dt{constructor(n){a(this,"option");a(this,"records");a(this,"text");var t;this.option=n,this.text=n.text,this.records=[{start:0,end:0,append:n.text,origin:"",target:n.text}],(t=n.onInsert)==null||t.call(n,this.records[0])}insert(n,t,e){var c,m;const r=this.text;t=typeof t=="function"?t(r):t,e=typeof e=="function"?e(r):e??t;const s=r.slice(0,t)+n+r.slice(e),i=this.text.length-1,l={target:s,origin:this.text,start:S(i,t),end:S(i,e),append:n};return this.records.push(l),this.text=s,(m=(c=this.option).onInsert)==null||m.call(c,l),this.records.length-1}insertFirst(n,t){return this.insert(n,e=>e.search(t))}insertLast(n,t){return this.insert(n,e=>{const r=e.match(t);return r?r.index+r[0].length:0})}reset(n){var i,l;const t=S(this.records.length-1,n)+1,e=this.records[t],r=e.start,s=r+e.append.length;return(l=(i=this.option).onReset)==null||l.call(i,{target:e.origin,origin:this.text,start:r,end:s}),this.text=e.origin,this.records.length=t,[r,s]}}const pt=()=>{const o=document.createElement("pre");document.getElementById("container").appendChild(o);const n=new dt({text:`class Car {
  constructor(name: string) {
  }
}`,onInsert(t){o.textContent=t.target},onReset(t){o.textContent=t.target}});n.insertLast(`
  name = 'hello';
`,/constructor\(.+\)\s?\{\n.*\}\n/),n.insert(`
  fn () {
    console.log(this.name);
  }
`,-1),n.insertFirst(`
  age = 18;`,/\n  name = /),n.insertFirst(`
  age = 20;`,/\n  name = /),n.reset(-1)},ht=Object.freeze(Object.defineProperty({__proto__:null,default:pt},Symbol.toStringTag,{value:"Module"}));class gt{constructor(n){a(this,"option",{autoEndTime:3e3});a(this,"status","finish");a(this,"regRouse");a(this,"regEnd");a(this,"text","");a(this,"_count",0);a(this,"_timer");Object.assign(this.option,n),this.regRouse=new RegExp(`(${n.rouseKeywords.join("|")})`,"g"),this.option.endKeywords&&(this.regEnd=new RegExp(`(${this.option.endKeywords.join("|")})`,"g"))}add(n){var c,m,h;const{status:t,_count:e,regRouse:r,regEnd:s,option:i}=this;if(t==="finish")return;clearTimeout(this._timer),this.text+=n;const l=this.text.match(r);if(l){if(l.length>e){const d=l[l.length-1],g=this.text.search(d),E=this.text.slice(g);i.onMessage(e===0?E:n,d),(c=i.onRouseStart)==null||c.call(i,E),e>0&&((m=i.onComplete)==null||m.call(i,this.text.slice(0,g))),this.text=this.text.slice(g),this._count=l.length}else if(i.onMessage(n),s&&this.text.match(s)){(h=i.onRouseStop)==null||h.call(i,this.text),this.stop();return}i.autoEndTime&&(this._timer=setTimeout(()=>{var d;(d=i.onAutoStop)==null||d.call(i,this.text),this.stop()},i.autoEndTime))}}start(){this.status="running"}stop(){var n,t;this._count>0&&((t=(n=this.option).onComplete)==null||t.call(n,this.text)),this.status="finish",this.text="",this._count=0,clearTimeout(this._timer)}}const ft=async()=>{const o=document.getElementById("container"),n=document.createElement("pre"),t=[];function e(){n.innerHTML=JSON.stringify(t,null,2)}const r=new gt({rouseKeywords:["你好小肚","小肚，小肚"],endKeywords:["结束","完了"],onRouseStart(c){t.push({type:"rouse",text:c}),t.push({type:"reply",text:"哎，俺在！"}),t.push({type:"talk",text:""}),e()},onMessage(c,m){if(!t.length)return;const h=t[t.length-1];h.text+=c,m&&(h.text=h.text.replace(m,"")),e()}});async function s(){if(r.status==="running")return;r.start();const c="这是个语音合成的文字哈。你好小肚，我是你爸爸，小肚，小肚，乃鼻窦了一天天是，叫你也不吭个气。说完了小杂毛，";for(const m of c)await k(100),r.add(m)}s();const i=document.createElement("button");i.innerText="开始收录",i.onclick=s;const l=document.createElement("button");l.innerText="停止收录",l.onclick=()=>r.stop(),o.append(i,l,n)},_t=Object.freeze(Object.defineProperty({__proto__:null,default:ft},Symbol.toStringTag,{value:"Module"})),xt=`# 布隆过滤器

## Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| m | 比特位大小 | \`number\` | 1024*\\*2\\*8 | - |
| k | hash 次数 | \`number\` | 16 | - |

## Methods

| 方法名 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| add | 添加内容 | \`string\` | - |
| has | 查看有无添加过该内容 | \`string\` | - |
| delete | 删除内容 | \`string\` | - |
| clear | 清空布隆过滤器 | - | - |
| *static* size | 获取当前布隆过滤器的大小 | - | - |

## 说明

为解决数据量太大，导致内存占用过大的问题。

1. 布隆过滤器是一种空间效率高的概率数据结构，用于判断一个元素是否在一个集合中；
2. 可以用来判断一个元素是否在一个集合中，但不能保证100%准确，但是可以保证百分之99.99的准确率。
`,bt=`# 自定义代码高亮

## Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| keywords | 关键字 | \`string[]\` | - | - |
| multiRowComment | 多行注释 | \`regexp\` | - | - |
| singleLineComment | 单行注释 | \`regexp\` | - | - |
| string | 字符串 | \`regexp\` | - | - |
| regexp | 正则 | \`regexp\` | - | - |
| constant | 常量 | \`regexp\` | - | - |
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
`,yt=`# 事件触发形式

## Methods

| 方法名 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| on | 接收消息 | \`(type, callback)\` | - |
| off | 关闭接收消息通道 | \`(type)\` | - |
| emit | 发送消息 | \`(type, data)\` | - |
| once | 只接收一次消息 | \`(type, callback)\` | - |
| *static* wait | 给元素注册等待事件 | \`(ele)\` | - |
`,vt=`# 瀑布流布局

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
`,wt=`# 全屏控制

## Methods

| 方法名 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| enter | 进入全屏 | \`HTMLElement\` | - |
| exit | 退出全屏 | - | - |
| isFull | 是否处于全屏状态 | - | - |
| toggle | 进入/退出全屏 | \`HTMLElement\` | - |

## 说明

该 API 对原生事件做了兼容处理，iPhone 设备受系统影响不支持
`,St=`# 函数重载

## Methods

| 方法名 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| addImpl | 添加重载函数 | \`(...args)\` | 最后一个参数为函数 |
| overload | 调用已注册的重载函数 | \`(...args)\` | 对应注册时参数类型 |
`,kt="",Et=`# 记忆 Map
`,Mt=`# 洋葱皮式中间件

## Options

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| context | 上下文 | \`object\` | - | - |

## Methods

| 方法名 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| use | 使用一个中间件 | \`function\` | - |
| callback | 执行回调 | - | - |
`,Tt=`# 发布订阅

## Methods

| 方法名 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| on | 注册事件 | \`( name: string, fn: (...args: any[]) => void )\` | |
| once | 注册一次性事件 | \`( name: string, fn: (...args: any[]) => void )\` | |
| emit | 发送事件 | \`( name: string, ...args: any[]) => void)\` | |
| off | 关闭事件 | \`( name: string, fn: (...args: any[]) => void )\` | |
| offAll | 关闭所有事件 | | |
| reset | 重置已注册的事件 | \`( name: string, fn: (...args: any[]) => void, once: boolen )\` | |
`,Ct=`# 滚动控制


## Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| scrollEl* | 有滚动条的元素 | \`Element\` | - | - |
| direction | 方向 | \`x \\| y\` | y | - |


## Methods

| 方法名 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| set | 设置元素动画样式 | \`dom, value\` | - |
| updateStyles | 更新样式状态 | - | - |
`,Ot=`# 模拟 Redis 数据缓存

## SimulateRedis

### Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| maxSize | 最大储存大小 | \`number\` | \`1024 * 1024 * 2\` | - |

### Methods

| 方法名 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| deposit | 存/取 数据 | \`key, value, overTime, cover\` | - |
| clearCache | 清除已过期数据 | - | - |
| deleteOverValue | 删除过期的数据 | - | - |
| deleteFristValue | 删除最早缓存的数据 | - | - |

## CacheBasic

### Methods

| 方法名 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| set | 设置缓存数据 | \`key, value, overTime\` | - |
| get | 获取数据（过期后不会返回） | \`key\` | - |
| isExpire | 检测数据是否过期 | \`key\` | - |
| delete | 删除数据 | \`key\` | - |
| clear | 清空所有数据 | - | - |
| gainAll | 获取所有缓存数据 | - | - |
| length | 获取缓存数据长度 | - | - |
| *static* size | 获取缓存数据大小 | - | - |

\`\`\`ts
import { CacheBasic, SimulateRedis } from "."

const cache = new CacheBasic();
cache.set('a', 123, 100);
setTimeout(() => {
  console.log(cache.get('a'));  //--> undefined
}, 200)
\`\`\`
`,jt=`# 事件流切割

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
`,It=`# 任务队列控制

异步任务队列控制，在队列中有空闲时执行下一个任务。

## TaskScheduling

### Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| parallelCount* | 队列中最多可同时执行几个任务 | \`number\` | - | - |

### Methods

| 方法名 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| add | 添加任务 | \`task\` | - |

## TaskSchedulings

### Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| parallelCountList* | 按数组中规定的个数挨个同时执行任务 | \`number[]\` | - | - |
| isAwait | 是否等待每个规定的数字任务 | \`boolean\` | \`false\` | - |

`,Ft=`# 文本插入

## Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| *text | 默认文本 | \`string\` | - | - |
| onInsert | 插入文本回调 | \`(record) => void\` | - | - |
| onReset | 撤回回调 | \`(reset) => void\` | - | - |

## Methods

| 方法名 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| insert | 插入文本 | \`content, start, end\` | - |
| insertFirst | 向前插入内容 | \`content, reg\` | - |
| insertLast | 向后插入内容 | \`content, reg\` | - |
| reset | 重置到指定位置 | \`index\` | - |
`,Rt=`# 语音文字切割

## Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| *rouseKeywords | 唤醒关键词 | \`string[]\` | - | - |
| endKeywords | 结束关键词 | \`string[]\` | - | - |
| autoEndTime | 自动结束时间 | \`number \\| false\` | - | - |
| onMessage | 消息回调 | \`(str: string, normal?: string) => void\` | - | - |
| onComplete | 完整的消息回调 | \`(str: string) => void\` | - | - |
| onRouseStart | 唤醒开始回调 | \`(str: string) => void\` | - | - |
| onRouseStop | 唤醒停止回调 | \`(str: string) => void\` | - | - |
| onAutoStop | 自动结束回调 | \`(str: string) => void\` | - | - |

## Methods

| 方法名 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| start | 开始监听 | - | - |
| add | 添加流内容 | \`string\` | - |
| stop | 结束监听 | - | - |
`;function Lt(){return K({codeObj:Object.assign({"/core/tools/bloomFilter/index.ts":$,"/core/tools/codeConversion/index.ts":H,"/core/tools/eventEmitter/index.ts":V,"/core/tools/falls/index.ts":X,"/core/tools/fullScreen/index.ts":G,"/core/tools/funcOverload/index.ts":U,"/core/tools/inlay/index.ts":q,"/core/tools/memoizeMap/index.ts":Z,"/core/tools/onion/index.ts":Y,"/core/tools/publishSubscribe/index.ts":Q,"/core/tools/scrollAnimation/index.ts":nn,"/core/tools/simulateRedis/index.ts":tn,"/core/tools/streamSplit/index.ts":en,"/core/tools/taskScheduling/index.ts":on,"/core/tools/textInsert/index.ts":rn,"/core/tools/voiceTextSplit/index.ts":sn}),demoObj:Object.assign({"/core/tools/bloomFilter/demo.ts":an,"/core/tools/codeConversion/demo.ts":ln,"/core/tools/eventEmitter/demo.ts":cn,"/core/tools/falls/demo.ts":un,"/core/tools/fullScreen/demo.ts":mn,"/core/tools/funcOverload/demo.ts":dn,"/core/tools/inlay/demo.ts":pn,"/core/tools/memoizeMap/demo.ts":hn,"/core/tools/onion/demo.ts":gn,"/core/tools/publishSubscribe/demo.ts":fn,"/core/tools/scrollAnimation/demo.ts":_n,"/core/tools/simulateRedis/demo.ts":xn,"/core/tools/streamSplit/demo.ts":bn,"/core/tools/taskScheduling/demo.ts":yn,"/core/tools/textInsert/demo.ts":vn,"/core/tools/voiceTextSplit/demo.ts":wn}),execObj:Object.assign({"/core/tools/bloomFilter/demo.ts":Tn,"/core/tools/codeConversion/demo.ts":On,"/core/tools/eventEmitter/demo.ts":In,"/core/tools/falls/demo.ts":Ln,"/core/tools/fullScreen/demo.ts":Wn,"/core/tools/funcOverload/demo.ts":zn,"/core/tools/inlay/demo.ts":Kn,"/core/tools/memoizeMap/demo.ts":Hn,"/core/tools/onion/demo.ts":Gn,"/core/tools/publishSubscribe/demo.ts":Zn,"/core/tools/scrollAnimation/demo.ts":nt,"/core/tools/simulateRedis/demo.ts":st,"/core/tools/streamSplit/demo.ts":lt,"/core/tools/taskScheduling/demo.ts":mt,"/core/tools/textInsert/demo.ts":ht,"/core/tools/voiceTextSplit/demo.ts":_t}),readmeObj:Object.assign({"/core/tools/bloomFilter/readme.md":xt,"/core/tools/codeConversion/readme.md":bt,"/core/tools/eventEmitter/readme.md":yt,"/core/tools/falls/readme.md":vt,"/core/tools/fullScreen/readme.md":wt,"/core/tools/funcOverload/readme.md":St,"/core/tools/inlay/readme.md":kt,"/core/tools/memoizeMap/readme.md":Et,"/core/tools/onion/readme.md":Mt,"/core/tools/publishSubscribe/readme.md":Tt,"/core/tools/scrollAnimation/readme.md":Ct,"/core/tools/simulateRedis/readme.md":Ot,"/core/tools/streamSplit/readme.md":jt,"/core/tools/taskScheduling/readme.md":It,"/core/tools/textInsert/readme.md":Ft,"/core/tools/voiceTextSplit/readme.md":Rt}),path:`${J}/tools/`})}function qt(o){return B(D,{...o,getSource:Lt})}export{qt as default};
