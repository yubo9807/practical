type Callback = (e: CustomEvent) => void
type On = (type: string, callback: Callback, options?: boolean | AddEventListenerOptions) => void
type Off = (type: string) => void

type WaitEventType = Capitalize<keyof HTMLElementEventMap>
type WaitHTMLElement<T extends HTMLElement> = T & { [k in `wait${WaitEventType}`]: Promise<undefined> }

// 改写事件触发形式
export class EventEmitter extends EventTarget {

  /**
   * 发布事件
   * @param type 
   * @param data 
   */
  emit = (type: string, data: any) => {
    this.dispatchEvent(new CustomEvent(type, { detail: data }));
  }

  /**
   * 订阅事件
   * @param type 
   * @param callback 
   */
  on = this.addEventListener as On;

  /**
   * 订阅事件，只触发一次
   * @param type 
   * @param callback 
   */
  once = (type: string, callback: Callback) => {
    this.on(type, callback, { once: true, capture: true });
  }

  /**
   * 取消订阅事件
   * @param type
   */
  off = this.removeEventListener as Off;

  /**
   * 等待事件触发
   * @param el 
   */
  static wait<T extends HTMLElement>(el: T): WaitHTMLElement<T> {
    const p = new Proxy(el, {
      get(target, key: string) {
        if (!key.startsWith('wait')) return;
        const event = key.replace('wait', '').toLowerCase();
        return new Promise((resolve) => {
          target.addEventListener(event, resolve, { once: true });
        })
      }
    })
    return p as WaitHTMLElement<T>;
  }
}
