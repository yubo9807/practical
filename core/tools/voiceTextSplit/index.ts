
type VoiceTextSplitOption = {
  rouseKeywords: string[]          // 唤醒关键词
  endKeywords?:  string[]          // 结束关键词
  autoEndTime?:  number | false    // 自动结束时间
  onMessage:     (str: string, normal?: string) => void  // 消息回调
  onComplete?:   (str: string) => void  // 完整的消息回调
  onRouseStart?: (str: string) => void  // 唤醒开始回调
  onRouseStop?:  (str: string) => void  // 唤醒停止回调
  onAutoStop?:   (str: string) => void  // 自动结束回调
}
export class VoiceTextSplit {
  constructor(option: VoiceTextSplitOption) {
    Object.assign(this.option, option);
    this.regRouse = new RegExp(`(${option.rouseKeywords.join('|')})`, 'g');
    if (this.option.endKeywords) {
      this.regEnd = new RegExp(`(${this.option.endKeywords.join('|')})`, 'g');
    }
  }
  option = {
    autoEndTime: 3000,
  } as VoiceTextSplitOption

  status: 'running' | 'finish' = 'finish';
  regRouse: RegExp
  regEnd: RegExp
  text = '';
  _count = 0;
  _timer: ReturnType<typeof setTimeout>

  add(str: string) {
    const { status, _count, regRouse, regEnd, option } = this;
    if (status === 'finish') return;

    clearTimeout(this._timer);  // 清除定时器
    this.text += str;
    const rouseMatched = this.text.match(regRouse);
    if (!rouseMatched) return;

    // 匹配到唤醒词
    if (rouseMatched.length > _count) {
      const normal = rouseMatched[rouseMatched.length - 1];
      const index = this.text.search(normal);
      const content = this.text.slice(index);
      option.onMessage(_count === 0 ? content : str, normal);
      option.onRouseStart?.(content);
      if (_count > 0) {
        option.onComplete?.(this.text.slice(0, index));
      }
      this.text = this.text.slice(index);
      this._count = rouseMatched.length;
    } else {
      option.onMessage(str);

      // 匹配到结束词
      if (regEnd) {
        const endMatched = this.text.match(regEnd);
        if (endMatched) {
          option.onRouseStop?.(this.text);
          this.stop();
          return;
        }
      }
    }

    // 长时间无录入，自动结束
    if (option.autoEndTime) {
      this._timer = setTimeout(() => {
        option.onAutoStop?.(this.text);
        this.stop();
      }, option.autoEndTime);  // 超过设定时间自动结束
    }
  }

  start() {
    this.status = 'running';
  }

  stop() {
    if (this._count > 0) {
      this.option.onComplete?.(this.text);
    }
    this.status = 'finish';
    this.text = '';
    this._count = 0;
    clearTimeout(this._timer);
  }
}