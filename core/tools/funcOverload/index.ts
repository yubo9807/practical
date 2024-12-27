interface JSTypeMap {
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
      throw new Error(`no implementation for ${key}`);
    }
    return fn.apply(this, args);
  }

}
