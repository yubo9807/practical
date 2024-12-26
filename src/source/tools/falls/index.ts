import { createArray } from "../../utils/array"

export type Option = {
  el?:     HTMLElement  // 挂载的节点
  column?: number       // 列数
  rowGap?: number       // 横向间距
  colGap?: number       // 纵向间距
}

export class Fulls {

  option: Option
  constructor(option: Option = {}) {
    const { column, rowGap, colGap, el } = option;
    this.option = {
      column: column || 5,
      rowGap: rowGap || 20,
      colGap: colGap || 14,
    }

    if (!el) return;
    el.style.position = 'relative';
    const children = [...el.children];
    const heights = children.map((val: HTMLElement) => val.offsetHeight);
    const { itemWidth, positions, wrapHeight } = this.compute(el.clientWidth, heights);
    children.forEach((val: HTMLElement, i) => {
      val.style.position = 'absolute';
      val.style.width = itemWidth + 'px';
      val.style.top = positions[i].top + 'px';
      val.style.left = positions[i].left + 'px';
    })
    el.style.height = wrapHeight + 'px';
  }

  /**
   * 计算 每一项宽度 / 定位 / 容器高度
   * @param wrapWidth 
   * @param heights 
   * @returns 
   */
  compute(wrapWidth: number, heights: number[]) {
    const itemWidth = this.computeItemWidth(wrapWidth);
    const positions = this.computeItemPosition(heights, itemWidth);
    const wrapHeight = this.computeWrapHeight();
    return {
      itemWidth,
      positions,
      wrapHeight,
    }
  }

  /**
   * 计算每一项的宽度
   * @note 计算设备像素过于精确也容易出现横向滚动条，重写此方法或设置 overflow-x: hidden
   * @param wrapWidth 容器宽度
   * @returns 
   */
  computeItemWidth(wrapWidth: number) {
    const usableWidth = wrapWidth - this.option.rowGap * (this.option.column - 1);
    return usableWidth / this.option.column;
  }

  _matrix: [number][]

  /**
   * 计算每一项的定位
   * @param heightList 
   * @param itemWidth 
   * @returns 
   */
  computeItemPosition(heightList: number[], itemWidth: number) {
    this._matrix = createArray(this.option.column, [0]);
    const result: { top: number, left: number }[] = [];

    for (let i = 0; i < heightList.length; i++) {
      const nowColumn = this._queryColumn('min');
      const top = this._matrix[nowColumn].reduce((a, b) => a + b);
      result.push({
        top: top + this.option.colGap * (this._matrix[nowColumn].length - 1),
        left: nowColumn * (itemWidth + this.option.rowGap),
      })
      this._matrix[nowColumn].push(heightList[i]);
    }

    return result;
  }

  /**
   * 计算容器的高度
   * @returns 
   */
  computeWrapHeight() {
    const maxColumn = this._queryColumn('max');
    return this._matrix[maxColumn].reduce((a, b) => a + b + this.option.rowGap) - this.option.rowGap;
  }

  /**
   * 查找列
   * @param arr 
   * @param type 
   * @returns 
   */
  _queryColumn(type: 'min' | 'max') {
    const collect = createArray(this._matrix.length, 0);
    for (let i = 0; i < this._matrix.length; i++) {
      collect[i] = this._matrix[i].reduce((a, b) => a + b);
    }
    const minNumber = Math[type].apply(null, collect);
    return collect.indexOf(minNumber);
  }

}
