import { isType } from "./judge";
import { AnyObj, BanType } from "./type";

declare const FormData: any;

/**
 * 深度克隆
 * @param target 
 * @returns 
 */
export function deepClone2<T>(target: T): Promise<T> {
  return new Promise(resolve => {
    const { port1, port2 } = new MessageChannel();
    port1.postMessage(target);
    port2.onmessage = msg => {
      resolve(msg.data);
    }
  })
}

/**
 * 深度克隆
 * @param origin 被克隆对象
 */
export function deepClone<T>(origin: T) {
  const cache = new WeakMap();
  const noCloneTypes = ['null', 'weakset', 'weakmap'];

  const specialClone = {
    set(set: Set<any>) {
      const collect = new Set();
      for (const value of set) {
        collect.add(_deepClone(value));
      }
      return collect;
    },
    map(map: Map<any, any>) {
      const collect = new Map();
      for (const [key, val] of map.entries()) {
        collect.set(key, _deepClone(val));
      }
      return collect;
    },
  }

  function _deepClone<T>(origin: T) {
    const type = isType(origin);
    if (typeof origin !== 'object' || noCloneTypes.includes(type)) {
      return origin;
    }

    // 防止环形引用问题（已经克隆过的对象不再进行克隆）
    if (cache.has(origin)) {
      return cache.get(origin);
    }

    // 特殊类型克隆处理
    if (specialClone[type]) {
      return specialClone[type](origin);
    }

    // 创建一个新的对象
    const target: AnyObj = Array.isArray(origin) ? [] : {};
    Object.setPrototypeOf(target, Object.getPrototypeOf(origin));

    // 设置缓存，该对象已经被克隆过
    cache.set(origin, target);

    for (const key in origin) {
      target[key] = _deepClone(origin[key]);
    }
    return target as T;
  }

  return _deepClone(origin);
}

/**
 * 扁平化对象
 * @param obj
 * @param prefix  无需传递
 * @param collect 无需传递
 * @returns 
 */
export function flatObject(obj: object, prefix = '', collect: Record<string, BanType<any, object | any[]>> = {}) {
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === 'object') {
      flatObject(value, prefix + '.' + key, collect);
    } else {
      const path = (prefix + '.' + key).replace(/\./, '');
      collect[path] = value;
    }
  }
  return collect;
}

/**
 * 获取对象的 value 值
 * @param obj 要查询的对象
 * @param name 对象的 key 值 “a.b”
 * @call getValue({a: 1, b: {c: 3}}, 'b.c')  //--> 3
 */
export function getValue(obj: any, name: string) {
  if (!obj) return;
  let nameList = name.split('.');
  let temp = obj;
  for (let i = 0; i < nameList.length; i++) {
    if (temp[nameList[i]]) {
      temp = temp[nameList[i]];
    } else {
      return void 0;
    }
  }
  return temp;
}

/**
 * 设置对象 value 值
 * @param obj  PS: {}
 * @param propPath 要改变的 key 值  PS: a 或 b.c
 * @param value 设置 value
 * @call const obj = {} setNestedPropertyValue(obj, 'a.b', 3)  //--> obj={a: {b: 3}}
 */
export function setNestedPropertyValue(obj: AnyObj, propPath: string | string[], value: any) {
  if (typeof propPath === 'string') {
    propPath = propPath.split('.');
  }

  if (propPath.length > 1) {
    const prop = propPath.shift();
    obj[prop] = obj[prop] || {};
    setNestedPropertyValue(obj[prop], propPath, value);
  } else {
    obj[propPath[0]] = value;
  }
}

/**
 * 创建一个可连续赋值的对象
 * @returns 
 * @call const obj = createAnyObject(); obj.a.b.c = 123
 */
export function createAnyObject(target = {}) {
  let nowKey = '';
  return new Proxy(deepClone(target), {
    get(target, key, receiver) {
      if (typeof key !== 'string') {
        throw new TypeError('key 类型错误');
      }
      nowKey += '.' + key;
      setNestedPropertyValue(target, nowKey.slice(1), {});
      return receiver;
    },
    set(target, key, value, receiver) {
      if (typeof key !== 'string') {
        throw new TypeError('key 类型错误');
      }
      nowKey += '.' + key;
      setNestedPropertyValue(target, nowKey.slice(1), value);
      return receiver;
    }
  })
}

/**
 * 优先考虑对象
 * @param target 
 * @param source 通常用于设置默认值 
 * @returns 
 */
export function priorityObject<T extends object, S extends object>(target: T, source: S): T & S {
  const p = new Proxy(target, {
    get(target, key) {
      const value = target[key];
      if (typeof value === 'object') {
        if (Array.isArray(target) && !source[key]) {
          return priorityObject(value, source[0]);
        }
        return priorityObject(value, source[key]);
      }
      if (value === void 0) {
        return source[key];
      }
      return value;
    }
  })
  return p as T & S;
}


/**
 * 获取一个对象的字节大小
 * @param obj 
 * @returns 
 */
export function getLSUsedSpace(obj: any) {

  const length = Object.keys(obj).reduce((total, curKey) => {
    if (!obj.hasOwnProperty(curKey)) return total;

    if (typeof obj[curKey] === 'string') total += obj[curKey].length + curKey.length;
    else total += JSON.stringify(obj[curKey]).replace(/"/g, '').length + curKey.length;

    return total;
  }, 0);

  const symbolLen = Object.getOwnPropertySymbols(obj).reduce((total, curKey) => {
    if (!obj.hasOwnProperty(curKey)) return total;

    if (typeof obj[curKey] === 'string') total += obj[curKey].length;
    else total += JSON.stringify(obj[curKey]).replace(/"/g, '').length;

    return total;
  }, 0);

  return length + symbolLen;
}
