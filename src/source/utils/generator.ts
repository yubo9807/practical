
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
}