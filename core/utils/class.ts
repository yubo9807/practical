import { WideClass } from "./type";

/**
 * 将类变为单例模式
 * @param classFn 
 * @returns 
 */
export function singleton(classFn: WideClass) {
  let ins = null;
  return new Proxy(classFn, {
    construct(target, args) {
      if (!ins) {
        ins = new target(...args)
      }
      return ins;
    }
  })
}
// const Cla = singleton(class {
//   a = 1;
// });
// const a = new Cla();
// const b = new Cla(); b.a = 3;
// console.log(a.a);  //--> 3
