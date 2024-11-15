
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
