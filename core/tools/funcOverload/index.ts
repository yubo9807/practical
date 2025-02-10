import { isType } from "~/core/utils/judge"

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
      throw new Error(`No implementation for ${key}`);
    }
    return fn.apply(this, args);
  }

}
