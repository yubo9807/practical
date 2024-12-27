import { Fragment, h } from "pl-react"
import CodeEdit from "../CodeEdit"
import { CodeConversion } from "~/core/tools/codeConversion";
import { copyToBoard } from "~/core/utils/browser";

interface Props {
  value: string
}
export default (props: Props) => {

  class CodeConversion2 extends CodeConversion {
    constructor() {
      super({
        keywords: [
          'import', 'export', 'default', 'from',
          'const', 'let', 'var',
          'function', 'this', 'arguments', 'return', 'eval',
          'class', 'constructor', 'new', 'extends', 'super',
          'async', 'await', 'yield',
          'if', 'else', 'switch', 'case',
          'try', 'catch', 'finally', 'throw',
          'for', 'in', 'of', 'while', 'do',  'break', 'continue',
          'debugger', 'delete', 'typeof', 'void', 'instanceof',
          'true', 'false', 'null', 'undefined',
          'NaN', 'Infinity',
        ],
      });
    }
    output(text: string): string {
      this._textList = [{ content: text.replace(/</g, '&lt;').replace(/>/g, '&gt;') }];
      const option = this._option;
  
      return this
        ._commonDealWith(/`[^`]*`/g, 'string')
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
  const conversion = new CodeConversion2();

  function copy(value: string) {
    copyToBoard(value);
  }

  return <CodeEdit
    value={props.value}
    toHtml={(val) => conversion.output(val)}
    isEdit={false}
    slotBtns={<>
      <span style='cursor: pointer;' onclick={() => copy(props.value)}>复制</span>
    </>}
  />
}