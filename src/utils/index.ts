import { Component, ref, useComponent } from 'pl-vue';
import { AnyObj } from 'pl-vue/lib/utils';

export * from './number';
export * from './string';
export * from './array';
export * from './type';
export * from './async';
export * from './optimize';
export * from './math';

/**
 * 简化 useComponent
 * @param Comp 
 * @param props 
 * @returns 
 */
export function simplifyUseComponent<P extends AnyObj, E extends AnyObj>(Comp: Component, props: P) {
  const compRef = ref();
  const node = useComponent(Comp, { ...(props as {}), ref: compRef });
  return [node, compRef.value] as [HTMLElement, E];
}
