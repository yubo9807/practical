import { Fragment, h } from "pl-react"
import CodeEdit, { CodeEditFoldProps } from "~/core/comp/CodeEdit"
import { CodeConversion } from "~/core/tools/codeConversion";
import "~/core/tools/codeConversion/index.scss";
import { copyToBoard } from "~/core/utils/browser";
import './index.scss';

interface Props {
  value:  string
  lines?: CodeEditFoldProps['lines'],
  ref?:   CodeEditFoldProps['ref'],
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
        ._commonDealWith(option.regexp, 'regexp')
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
    ref={props.ref}
    value={props.value}
    toHtml={(val) => conversion.output(val)}
    isEdit={false}
    lines={props.lines || []}
    style={`--row-width: ${props.lines ? 44 : 30}px`}
    slotBtns={<>
      <span style='cursor: pointer;' onclick={() => copy(props.value)}>复制</span>
    </>}
  />
}