import { createNum } from "~/core/utils/generator"
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
