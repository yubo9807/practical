
type StreamSplitOption = {
  normal?:    RegExp
  onMessage?: (str: string) => void
}

export class StreamSplit {
  option: StreamSplitOption = {
    normal: /data:(.+)?\n\n/,
  }
  /**
   * 事件流分割
   * @param option 
   */
  constructor(option: StreamSplitOption = {}) {
    Object.assign(this.option, option);
  }

  _text = '';

  /**
   * 追加字符
   * @param str 
   * @returns 匹配到的内容
   */
  add(str: string) {
    this._text += str;
    const { normal, onMessage } = this.option;
    const collect = [];  // 收集内容

    for (;;) {
      const matched = this._text.match(normal);
      if (!matched) break;
      const content = matched[1];
      collect.push(content);
      this._text = this._text.slice(matched[0].length);
      onMessage && onMessage(content);
    }

    return collect;
  }
}
