import { Tree } from "pl-vue"

/**
 * 将类型改为可选（深度）
 */
export type OptionalDeep<T extends Record<string|symbol, any>> = {
  [K in keyof T]?: OptionalDeep<T[K]>
}

/**
 * 将可选属性转为必填属性
 */
export type RequiredType<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>

/**
 * 异步函数
 */
export type PromiseFn = (...args: any[]) => Promise<any>

/**
 * 排除对象中的某个 key
 */
export type ExcludeKey<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
// type A = { a: number, b: number, c: string }
// type B = ExcludeKey<A, 'a'>

export type Mount = (el: HTMLElement) => void
export type ChildMount = Mount | Tree | string | number
