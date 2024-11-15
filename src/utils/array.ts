import { deepClone } from "pl-vue/lib/utils";
import { calculateAngle } from "./number";

/**
 * 创建一个指定长度的数组，并填入内容
 * 与 new Array(len).fill() 的不同是写入的每一项不会出现同一引用地址
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