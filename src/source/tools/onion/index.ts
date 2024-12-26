
type Next = () => any
type Middleware<C> = (ctx?: C, next?: null | Next) => void

export class Onion<C> {

  /**
   * 洋葱皮中间件
   * @param context 
   */
  constructor(context: C) {
    this.ctx = context;
  }

  ctx: C
  #performList: Middleware<C>[] = [];  // 执行函数数组

  /**
   * 使用一个中间件
   * @param func 
   */
  use(func: Middleware<C>) {
    this.#performList.push(func);
  }

  /**
   * 回调
   */
  async callback() {
    return await this.#compose(this.#performList, this.ctx, () => {});
  }

  /**
   * 中间件执行队列处理
   * @param middlewareList 中间件list
   * @param ctx 
   * @param next 
   * @returns 
   */
  #compose(middlewareList: Middleware<C>[], ctx: C, next: Next) {
    function dispatch(i: number) {
      let fn = middlewareList[i];
      if (i === middlewareList.length) fn = next;
      return Promise.resolve(fn(ctx, dispatch.bind(null, ++i)));
    }
    return dispatch(0);
  }
}