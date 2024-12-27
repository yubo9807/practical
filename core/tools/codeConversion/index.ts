import { OptionalDeep } from "../../utils/type";

type Option = {
  keywords:          string[]  // 关键字
  multiRowComment:   RegExp    // 多行注释
  singleLineComment: RegExp    // 单行注释
  string:            RegExp    // 字符串
  constant:          RegExp    // 常量
  number:            RegExp    // 数字
  methods:           RegExp    // 方法
  object:            RegExp    // 对象取值
}

type CodeConversionOption = OptionalDeep<Option>

export class CodeConversion {
  _option: Option;
  _textList: { content: string }[];
  constructor(option: CodeConversionOption = {}) {
    this._option = Object.assign({
      keywords: ['import', 'null', 'true', 'false'],  
      multiRowComment: /\/\*.*?\*\//gs,
      singleLineComment: /\/\/[^\n]+\n?/g,
      string: /"[^"]*"|'[^']*'/g,
      constant: /(?<=\s|\(|\[|{|,|:|=)[A-Z][\w|\d]+/g,
      number: /(?<=\s|\(|\[|{|,|:|=|\+|-|\*|\/|\%|<|>)\d*\.?\d+/g,
      methods: /\w+(?=\()/g,
      object: /\w*\./sg,
    }, option);
  }

  /**
   * 公共方法，截断匹配到的正则，处理后重新赋值给 this.textList
   * @param {RegExp} reg 匹配正则
   * @param {String} className 添加类名
   * @param {Null | Array} splice 长度为3的数组，对匹配后的值进行修改（与数组方法 splice 一致）
   */
  _commonDealWith(reg: RegExp, className = '', splice = null) {
    const arr = Object.assign([], this._textList);
    const record = [];
    arr.forEach((val, index) => {
      if (val.delaWith) return;
      
      const noMatching = val.content.split(reg).map(val => ({ content: val }));
      const matching = val.content.match(reg);
      if (!matching) return;

      let insert = 1;
      matching.forEach(val => {
        const content = `<span class="${className}">${splice ? val.slice(splice[0], splice[1]): val}</span>${splice ? splice[2] : ''}`;
        noMatching.splice(insert, 0, { delaWith: true, content });
        insert += 2;
      })

      record.push([index, noMatching.length, noMatching]);
    })
    record.forEach((val, index, self) => {
      if (index > 0) {
        const len = self[index - 1][1] - 1;
        val[0] = val[0] + len;
        val[1] = val[1] + len;
      }
      arr.splice(val[0], 1, ...val[2]);
    })
    this._textList = arr;
    return this;
  }

  /**
   * 处理关键字
   */
  _keyword(words) {
    const arr = Object.assign([], this._textList);
    const record = [];
    arr.forEach((val, index) => {
      if (val.delaWith) return;
      
      const reg = eval(`/(${words.join('|')})(?=\\s)/g`);
      const newArr = val.content.split(reg);
      newArr.forEach((val, index) => words.includes(val) && newArr.splice(index, 1));
      const noMatching = newArr.map(val => ({ content: val }));

      const matching = val.content.match(reg);
      if (!matching) return;

      let insert = 1;
      matching.forEach(val => {
        noMatching.splice(insert, 0, { delaWith: true, content: `<span class="keyword">${val}</span>` });
        insert = insert + 2;
      })

      record.push([index, noMatching.length, noMatching]);
    })
    record.forEach((val, index, self) => {
      if (index > 0) {
        const len = self[index - 1][1] - 1;
        val[0] = val[0] + len;
        val[1] = val[1] + len;
      }
      arr.splice(val[0], 1, ...val[2]);
    })

    this._textList = arr;
    return this;
  }

  /**
   * 合并成html
   */
  _merge() {
    const html = this._textList.map(val => val.content).join('');
    return `<div class="code-highlight-container">${html}</div>`;
  }

  /**
   * 输出
   * @param text 
   * @returns 
   */
  output(text: string) {
    this._textList = [{ content: text.replace(/</g, '&lt;').replace(/>/g, '&gt;') }];
    const option = this._option;

    return this
      ._commonDealWith(option.multiRowComment, 'block-comment')
      ._commonDealWith(option.singleLineComment, 'line-comment')
      ._commonDealWith(option.string, 'string')
      ._commonDealWith(option.number, 'number')
      ._commonDealWith(option.constant, 'constant')
      ._keyword(option.keywords)
      ._commonDealWith(option.methods, 'methods')
      ._commonDealWith(option.object, 'object')
      ._merge();
  }

}
