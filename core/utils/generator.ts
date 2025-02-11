
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
