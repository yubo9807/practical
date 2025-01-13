import { parse } from '@babel/parser'
import { h, useEffect, useMemo, useRef, useState, useStore } from "pl-react"
import { Link, PageProps, useRouter } from "pl-react/router"
import { CodeEditFoldProps } from "~/core/comp/CodeEdit";
import '~/core/tools/codeConversion/index.scss'
import { scrollTo } from "~/core/utils/browser";
import { CodeEditExpose } from "~/core/comp/CodeEdit/basic";
import { getUtilsSourceCode } from "@/utils/source"
import style from './style.module.scss';
import { defineStoreVariable } from '@/store/variable';
import { tsToJs } from '@/utils/code-convert';
import CodePreview from '@/components/CodePreview';
import { defineStoreSuspension } from '@/store/suspension';

export default (props: PageProps) => {

  const storeVariable = useStore(defineStoreVariable);
  const [list, setList] = useState<string[]>([]);
  const [content, setContent] = useState<string>('');

  const getSourceCode = useMemo(getUtilsSourceCode, []);
  async function change(key: string) {
    const { keys, body } = await getSourceCode;
    !list.length && setList(keys);
    const query = keys.find(val => val === key);

    let result = body[query || keys[0]];
    if (storeVariable.state.codeLanguage === 'js') {
      result = tsToJs(result);
    }
    setContent(result);
  }

  const router = useRouter();
  useEffect(() => router.monitor(async to => {
    if (!to.path.startsWith(props.path)) return;
    const key = to.path + '.ts';
    change(key);
  }), []);

  const [isFrist, setIsFirst] = useState(true);
  useEffect(() => {
    if (isFrist) {
      setIsFirst(false);
      return;
    }
    const key = router.current.path + '.ts';
    change(key);
  }, [storeVariable.state.codeLanguage])


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

  const getMenu = () => <ul className={style.navigation}>{
    ...list.map(val => {
      const name = val.split('/')[2].replace('.ts', '');
      return <li>
        <Link to={val.split('.')[0]}>{name}</Link>
      </li>
    })
  }</ul>

  const storeSuspension = useStore(defineStoreSuspension);
  useEffect(() => {
    if (!list.length) return;
    storeSuspension.dispatch({
      type: 'menuSet',
      payload: getMenu(),
    })
  }, [list])
  useEffect(() => () => {
    storeSuspension.dispatch({ type: 'menuClear' });
  }, [])

  return <div className={style.pageUtils}>
    <aside>
      {getMenu()}
    </aside>
    <section className={style.content}>
      <CodePreview ref={codeEditRef} value={content} lines={data} />
    </section>
    <aside className={style.outline}>
      <ul>{
        ...data.map(val => <li onclick={() => queryElement(val.start)}>{val.name}</li>)
      }</ul>
      <div className={style.total}>total: {data.length}</div>
    </aside>
  </div>
}