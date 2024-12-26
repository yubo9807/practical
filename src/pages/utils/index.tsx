import { parse } from '@babel/parser'
import { h, useEffect, useMemo, useRef, useState } from "pl-react"
import { Link, PageProps, useRouteMonitor } from "pl-react/router"
import CodeEdit, { CodeEditFoldProps } from "@/components/CodeEdit/flod";
import { CodeConversion } from "@/source/tools/codeConversion";
import '@/source/tools/codeConversion/index.scss'
import { copyToBoard, scrollTo } from "@/source/utils/browser";
import { CodeEditExpose } from "@/components/CodeEdit";
import { getUtilsSourceCode } from "@/utils/source"
import style from './style.module.scss';

export default (props: PageProps) => {

  const [list, setList] = useState<string[]>([]);
  const [content, setContent] = useState<string>('');

  const utilsSource = useMemo(getUtilsSourceCode, []);
  useEffect(() => useRouteMonitor(async to => {
    const key = to.path + '.ts';
    const { keys, body } = await utilsSource;
    !list.length && setList(keys);
    const query = keys.find(val => val === key);
    setContent(body[query || keys[0]]);
  }), []);


  // #region 代码块内容解析（内容折叠）
  type Line = CodeEditFoldProps['lines'][number];
  interface Item extends Line {
    name: string
  }
  const data = useMemo(() => {
    const ast = parse(content, {
      sourceType: 'module',
      plugins: ['typescript']
    })

    const result: Item[] = [];
    for (const node of ast.program.body) {
      if (node.type === 'ExportNamedDeclaration') {
        if (['FunctionDeclaration', 'ClassDeclaration'].includes(node.declaration.type)) {
          const { loc, declaration } = node;
          const { start, end } = loc;
          // @ts-ignore
          result.push({ start: start.line, end: end.line, name: declaration.id.name });
        }
      }
    }
    return result;
  }, [content]);
  // #endregion


  // 代码高亮转换
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

  const codeEditRef = useRef<CodeEditExpose>();

  function queryElement(line: number) {
    const childs = codeEditRef.current.getEl().getElementsByClassName('row-num')[0].childNodes;
    for (const child of childs) {
      const label = (child as HTMLElement).getElementsByTagName('label')[0];
      if (label.textContent === line + '') {
        scrollTo(child);
        break;
      }
    }
  }

  return <div className={style.pageUtils}>
    <aside className={style.navigation}>
      <ul>{
        ...list.map(val => {
          const name = val.split('/')[2].replace('.ts', '');
          return <li>
            <Link to={val.split('.')[0]}>{name}</Link>
          </li>
        })
      }</ul>
    </aside>
    <section className={style.content}>
      <CodeEdit ref={codeEditRef} value={content} lines={data} toHtml={(val) => conversion.output(val)} isEdit={false} copyText="复制" onCopy={copyToBoard} />
    </section>
    <aside className={style.outline}>
      <ul>{
        ...data.map(val => <li onclick={() => queryElement(val.start)}>{val.name}</li>)
      }</ul>
      <div className={style.total}>total: {data.length}</div>
    </aside>
  </div>
}