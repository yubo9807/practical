import { indexCorrect } from "../../utils/number";

type Record = {
  origin: string
  target: string
  start:  number
  end:    number
  append: string
}
type Option = {
  text: string
  onInsert?: (record: Record) => void
  onReset?: (item: { target: string, start: number, end: number, origin: string }) => void
}
export class TextInsert {
  constructor(option: Option) {
    this.option = option;
    this.text = option.text;
    this.records = [{ start: 0, end: 0, append: option.text, origin: '', target: option.text }];
    option.onInsert?.(this.records[0]);
  }
  option: Option
  records: Record[]
  text: string

  /**
   * 插入文本
   * @param content 
   * @param start 
   * @param end 
   * @returns 
   */
  insert(content: string, start: number | ((t: string) => number), end?: number | ((t: string) => number)) {
    const t = this.text;
    start = typeof start === 'function' ? start(t) : start;
    end = typeof end === 'function' ? end(t) : end ?? start;
    const target = t.slice(0, start) + content + t.slice(end);
    const len = this.text.length - 1;
    const item: Record = {
      target,
      origin: this.text,
      start: indexCorrect(len, start),
      end: indexCorrect(len, end),
      append: content,
    }
    this.records.push(item);
    this.text = target;
    this.option.onInsert?.(item);
    return this.records.length - 1;
  }

  /**
   * 向前插入内容
   * @param content 
   * @param reg 
   * @returns 
   */
  insertFirst(content: string, reg: RegExp) {
    return this.insert(content, t => t.search(reg));
  }

  /**
   * 向后插入内容
   * @param content 
   * @param reg 
   * @returns 
   */
  insertLast(content: string, reg: RegExp) {
    return this.insert(content, t => {
      const matched = t.match(reg);
      if (!matched) return 0;
      return matched.index + matched[0].length;
    });
  }

  /***
   * 重置到指定位置
   * @param last
   */
  reset(index?: number) {
    const last = indexCorrect(this.records.length - 1, index) + 1;
    const item = this.records[last];
    const start = item.start, end = start + item.append.length;
    this.option.onReset?.({
      target: item.origin,
      origin: this.text,
      start,
      end,
    });
    this.text = item.origin;
    this.records.length = last;
    return [start, end];
  }
}
