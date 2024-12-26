import { h } from "pl-react"
import CodeEdit from "../CodeEdit"
import { CodeConversion } from "@/source/tools/codeConversion";
import { copyToBoard } from "@/source/utils/browser";

interface Props {
  value: string
}
export default (props: Props) => {

  const conversion = new CodeConversion({
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

  function copy(value: string) {
    copyToBoard(value);
  }

  return <CodeEdit value={props.value} toHtml={(val) => conversion.output(val)} isEdit={false} copyText='复制' onCopy={copy} />
}