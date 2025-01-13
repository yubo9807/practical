
/**
 * 不能是某种类型
*/
export type BanType<T, E> = T extends E ? never : T
// function fn<T>(a: BanType<T, Date>) {}


// export type GetOptional<T> = {
//   [K in keyof T as K extends Required<K> ? never : K]: T[K]
// }

/**
 * 排除对象中的某个 key
 */
export type ExcludeKey<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
// type A = { a: number, b: number, c: string }
// type B = ExcludeKey<A, 'a'>


/**
 * 将某些类型转为可选类型
*/
export type OptionalType<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
// type A = { a: number, b: number }
// type B = OptionalType<A, 'a'>


/**
 * 将可选属性转为必填属性
*/
export type RequiredType<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>
// type A = { a?: number, b?: number }
// type B = RequiredType<A, 'a'>


/**
 * 联合类型转交叉类型
*/
export type UnionToIntersection<T extends Record<string|symbol, any>> =
  (T extends any ? (x: T) => any : never) extends
  (x: infer R) => any ? R : never
// type A = { a: string } | { b: number }
// type B = UnionToIntersection<A>


/**
 * 任意类型对象
 */
export type AnyObj = Record<string|symbol, any>

/**
 * 比较宽泛的类
 */
export type WideClass = new (...args: any[]) => AnyObj

/**
 * 异步函数
 */
export type PromiseFn = (...args: any[]) => Promise<any>

/**
 * 得到 Promise 返回类型
 */
export type PromiseType<T> = T extends Promise<infer K> ? K : T
// type Pt = PromiseType<Promise<string>>

/**
 * 数组中每一项的类型
 */
export type ArrayType<T> = T extends (infer I)[] ? I : T
// type ItemType = ArrayType<[1, 'a']>


type Curried<A, R> = A extends []
  ? () => R
  : A extends [infer ARG]
  ? (param: ARG) => R
  : A extends [infer ARG, ...infer REST]
  ? (param: ARG) => Curried<REST, R>
  : never

/**
 * 柯理化函数推导
 * @param fn 
 */
export declare function curry<A extends any[], R>(
  fn: (...args: A) => R
): Curried<A, R>
// function sum(a: string, b: number, c: object) {
//   return 123;
// }
// const currySum = curry(sum);
// currySum('')(1)({})

/**
 * 将类型改为可选（深度）
 */
export type OptionalDeep<T extends Record<string|symbol, any>> = {
  [K in keyof T]?: OptionalDeep<T[K]>
}
// type A = OptionalDeep<{ a: 1, b: { c: 2 } }>

/**
 * 将类型改为可写（深度）
 */
export type WritableDeep<T extends Record<string|symbol, any>> = {
  -readonly [K in keyof T]: WritableDeep<T[K]>
}
// type A = WritableDeep<{ a: 1 }>

/**
 * 类数组
 */
export type ClassArray = Iterable<unknown> | ArrayLike<unknown>
