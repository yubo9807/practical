
type BaseMap = {
  [k: string]: any[];
}
const { warn } = console;

export class PublishSubscribe<M extends BaseMap> {
  /**
   * 发布订阅
   */
  constructor() {}
  #map: Map<string, { fn: Function, once?: boolean }> = new Map();

  /**
   * 注册事件
   * @param name 
   * @param fn 
   */
  on<K extends keyof M & string>(name: K, fn: (...args: M[K]) => void) {
    if (this.#map.has(name)) {
      warn(`${name} already exists`);
    }
    this.#map.set(name, { fn });
  }

  /**
   * 只订阅一次
   * @param name
   * @param fn
   */
  once<K extends keyof M & string>(name: K, fn: (...args: M[K]) => void) {
    if (this.#map.has(name)) {
      warn(`${name} already exists`);
      return;
    }
    this.#map.set(name, { fn, once: true });
  }

  /**
   * 发送事件
   * @param name 
   * @param args 
   * @returns 
   */
  emit<K extends keyof M & string>(name: K, ...args: M[K]) {
    const val = this.#map.get(name);
    if (!val) {
      warn(`no implementation for ${name}`);
      return;
    }
    const result = val.fn(...args);
    if (val.once) {
      this.#map.delete(name);
    }
    return result;
  }

  /**
   * 取消订阅
   * @param name 
   */
  off<K extends keyof M & string>(name: K) {
    this.#map.delete(name);
  }

  /**
   * 取消所有订阅
   */
  offAll() {
    this.#map.clear();
  }

  /**
   * 重置事件
   * @param name 
   * @param fn 
   * @param once 
   */
  reset<K extends keyof M & string>(name: K, fn: (...args: M[K]) => void, once = false) {
    if (!this.#map.has(name)) {
      warn(`${name} not exists`);
      return;
    }
    this.#map.set(name, { fn, once });
  }

}
