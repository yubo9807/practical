
/**
 * 创建动画函数
 * @param scrollStart 滚动条开始位置
 * @param scrollEnd   滚动条结束位置
 * @param valueStart  开始值
 * @param valueEnd    结束值
 * @returns 
 */
export function createAnimation(scrollStart: number, scrollEnd: number, valueStart: number, valueEnd: number) {
  return (scroll: number) => {
    if (scroll <= scrollStart) return valueStart;
    if (scroll >= scrollEnd) return valueEnd;

    return valueStart + (valueEnd - valueStart) * (scroll - scrollStart) / (scrollEnd - scrollStart);
  }
}

type Option = {
  scrollEl:   Element
  direction?: 'x' | 'y'
}
type Value = {
  [k in keyof CSSStyleDeclaration]?: (scroll: number) => string | number
}
export class ScrollAnimation {

  option: Partial<Option> = {
    direction: 'y',
  }
  constructor(option: Option) {
    Object.assign(this.option, option);
  }

  animationMap = new Map();
  set(dom: Element, value: Value) {
    this.animationMap.set(dom, value);
  }

  updateStyles() {
    const { option, animationMap } = this;
    const scroll = option.scrollEl[option.direction === 'y' ? 'scrollTop' : 'scrollLeft'];
    for (const [ dom, value ] of animationMap) {
      for (const cssProps in value) {
        dom.style[cssProps] = value[cssProps](scroll);
      }
    }
  }

}