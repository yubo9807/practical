import { Fragment, h, useMemo } from "pl-react"
import CodeEdit, { CodeEditFoldProps } from "~/core/comp/CodeEditFold"
import { CodeConversion } from "~/core/tools/codeConversion";
import "~/core/tools/codeConversion/index.scss";
import { copy } from "@/utils/string";
import './index.scss';

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

type Line = CodeEditFoldProps['lines'][number] & { comment: string }
interface Props {
  value:  string
  lines?: Line[],
  ref?:   CodeEditFoldProps['ref'],
}
export default (props: Props) => {

  const conversion = useMemo(() => new CodeConversion2());

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
    onFlodDbClick={row => {
      const query = props.lines.find(val => val.start === row.start + 1);
      copy('/*' + query.comment + '*/\n' + row.source);
    }}
  />
}