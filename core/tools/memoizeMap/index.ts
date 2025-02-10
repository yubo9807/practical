
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
