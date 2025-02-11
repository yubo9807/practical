import { randomNum } from './number';
import { deepClone } from "./object";

/**
 * 创建指定长度的数组，并填入内容
 * @note 与 new Array(len).fill() 的不同是写入的每一项不会出现同一引用地址
 * @param len 
 * @param item 
 * @returns 
 */
export function createArray(len: number, item: any = void 0) {
  const arr = new Array(len);
  let i = 0;
  while (i < arr.length) {
    arr[i] = deepClone(item);
    i++;
  }
  return arr;
}

/**
 * 创建指定长度的随机数的数组，且规定范围不重复
 * @param len 指定长度
 * @param max 最大值（取不到）
 * @param min 最小值
 */
export function createRandomArray(len: number, max: number = 10, min: number = 0) {
  let arr = new Array(len);
  const uniqueArr = (arr: number[]) => [...new Set(arr)];  // 数组去重
  // 生成数组
  (function produceArr() {
    let i = 0;
    while (i < arr.length) {
      arr[i] = randomNum(max, min);
      i++;
    }
    return uniqueArr(arr).length < len && produceArr();  // 去重后的数组小于数组的长度，再次生成数组
  }());
  return arr;
}

/**
 * 数组数据分组
 * @param arr 
 * @param generateKey 
 * @returns 
 */
export function groupBy<T extends object>(arr: T[], generateKey: string | ((item: T) => string)) {
  let newGenerateKey = generateKey as (item: T) => string;
  if (typeof generateKey === 'string') {
    newGenerateKey = item => item[generateKey];
  }
  const result = {};
  for (const person of arr) {
    let key = newGenerateKey(person);
    if (!key) continue;
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(person);
  }
  return result;
}

/**
 * 树形数据过滤（数组）
 * @param data     树形数据
 * @param filter   过滤函数
 * @param children 子集字段
 * @returns 
 */
export function treeArrayFilter<D extends any[]>(data: D, filter: (item: D[number]) => boolean, children = 'children') {
  if (!data.length) return [];

  const retain = [];  // 疫情报备、收集
  for (const item of data) {
    // 没有谎报疫情、确实有，封锁
    if (filter(item)) {
      retain.push(item);
      continue;
    }
    if (!item[children]) continue;

    // 没有疫情，继续查 区/社区
    const newRetain = treeArrayFilter(item[children], filter, children);
    // 但凡查出一例，区长、市长一起抓
    newRetain.length > 0 && retain.push({ ...item, [children]: newRetain });
  }
  return retain;  // 等着蹲小黑屋
}

/**
 * 扁平数组转为树形数据
 * @param list   数据
 * @param props  配置项 { parent: 父级键, children: 子集键 }
 * @param parent 父级默认值
 * @returns 
 */
export function arrayToTree(list: any[], props = { parent: 'parent', children: 'children' }, parent = null) {
  const newList = [], childrenList = [];
  list.forEach(val => {
    if (val.hasOwnProperty(props.parent)) {
      val[props.parent] === parent ? newList.push(val) : childrenList.push(val);
    } else {
      newList.push(val);
    }
  })
  list.forEach(val => {
    if (val[props.parent] === parent) {
      val[props.children] = arrayToTree(childrenList, props, val.id);
    };
  });
  return newList;
}

/**
 * 洗牌算法
 * @param numbers 
 * @returns 
 */
export function shuffle(numbers: number[]) {
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers;
}

/**
 * 查找数组中重复的数组段
 * @param array 
 * @param query 
 * @returns 
 */
export function findFragment(array: number[], query: any[]) {
  if (array.length < query.length) return null;

  query = [...query];
  const record = new Array(2) as [number, number];

  let i = 0;
  while (i < array.length) {
    if (array.length - i < query.length) break;

    const collect = new Array(query.length);
    for (let j = 0; j < query.length; j++) {
      if (array[i + j] === query[j]) {
        collect[j] = i + j;
      }
    }

    if (collect.filter(v => v !== void 0).length === query.length) {
      record[0] = collect[0];
      record[1] = collect[collect.length - 1];
      break;
    }
    i++;
  }

  return record.includes(void 0) ? null : record;
}

/**
 * 一维数组转换为二维数组
 * @param arr   数组
 * @param count 多少个数为一组
 */
export function multArray(arr: any[], count = 2) {
  const pages: any[] = [];
  arr.forEach((item, index) => {
    const page = Math.floor(index / count);
    !pages[page] && (pages[page] = []);
    pages[page].push(item);
  });
  return pages;
}

/**
 * 检查两个数组各项是否相等
 * @param a 数组1
 * @param b 数组2
 * @returns 
 */
export function isArrayEqual(a: any[], b: any[]) {
  if (a.length !== b.length) return false;
  if (a.find(x => !b.includes(x))) return false;
  return true
}
// isArrayEqual([6, 5, 2, 4, 1, 3], [1, 2, 3, 4, 5, 6])  //--> true

/**
 * 两个数组的 交集
 * @param a 数组1
 * @param b 数组2
 * @returns 
 */
export function intersectionArray(a: any[], b: any[]) {
  const s = new Set(b);
  let arr = a.filter(x => !s.has(x));
  return arr;
}
// intersectionArray(['a', 2, 6, 7], ['a', 2, 9, 'b'])  //--> [6, 7]

/**
 * 两个数组的 并集
 * @param a 
 * @param b 
 * @returns 
 */
export function union(a: any[], b: any[]) {
  const s = new Set(b);
  return a.filter(x => s.has(x));
}
// unionArr([1, 2, 6, 7], [1, 2, 9, 5])  //--> [1, 2]

/**
 * 数组对象去重
 * @param arr 数组
 * @param key 去重的对象属性值
 * @returns 
 */
export function uniqueArrayObject(arr: object[], key: string | number) {
  return arr.reduce((acc: any[], cur: object) => {
    const ids = acc.map(item => item[key]);
    return ids.includes(cur[key]) ? acc : [...acc, cur];
  }, []);
}

/**
 * 找出数组中只出现一次的数字
 * @param arr 
 * @returns 
 */
export function querySingle(arr: number[]) {
  return arr.reduce((a, b) => a ^ b, 0);
}

/**
 * 数组排列，看有多少种情况
 * @param arr
 * @returns 
 */
export function permute(arr: any[]) {
  let results: any[] = [];

  let go = (current: any[]) => {
    if (current.length === arr.length) {
      results.push(current);
      return;
    }
    arr.forEach(n => {
      if (!current.includes(n)) {
        go([...current, n]);
      }
    });
  }
  go([]);
  return results;
}
// permute([1, 2])  //--> [[1, 2], [2, 1]]
