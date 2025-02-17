import { parse } from '@babel/parser'
import { Comment } from '@babel/types';
import { h, useEffect, useMemo, useRef, useState, useStore } from "pl-react"
import { Link, PageProps, useRouter } from "pl-react/router"
import style from './style.module.scss';
import { defineStoreVariable } from '@/store/variable';
import { defineStoreSuspension } from '@/store/suspension';
import { CodeEditFoldProps } from "~/core/comp/CodeEdit";
import '~/core/tools/codeConversion/index.scss'
import { CodeEditExpose } from "~/core/comp/CodeEdit/basic";
import Dialog from '~/core/comp/Dialog/basic';
import CodePreview from '@/components/CodePreview';
import Container from '@/components/Container';
import { scrollTo } from "~/core/utils/browser";
import { getUtilsFuncs, getUtilsSourceCode } from "@/utils/source"
import { tsToJs } from '@/utils/code-convert';
import { defineStoreBtns } from '@/store/btns';
import Console, { ConsoleExpose } from '@/components/Console';

export default (props: PageProps) => {

  const storeVariable = useStore(defineStoreVariable);
  const [list, setList] = useState<string[]>([]);
  const [current, setCurrent] = useState<{ name: string, content: string }>({ name: '', content: '' });

  // #region 数据获取
  const getSourceCode = useMemo(getUtilsSourceCode, []);
  async function change(key: string) {
    const { keys, body } = await getSourceCode;
    !list.length && setList(keys);
    const query = keys.find(val => val === key);

    const name = query || keys[0];
    let result = body[name];
    if (storeVariable.state.codeLanguage === 'js') {
      result = tsToJs(result);
    }
    setCurrent({ name, content: result });
  }
  // #endregion


  const router = useRouter();
  


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
    title?: string
    commentStart?: number
  }
  const data = useMemo(() => {
    const ast = parse(current.content, {
      sourceType: 'module',
      plugins: ['typescript']
    })

    function getTitle(comments: Comment[]) {
      const result = { start: null, title: null }
      if (!comments) return result;
      const comment = comments[comments.length - 1];
      const { type, value, loc } = comment;
      result.start = loc.start.line;
      if (type === 'CommentBlock') {
        const mathed = value.match(/\*(.)+(\n|\r\n)/);
        if (!mathed) return result;
        result.title = mathed[0].replace(/\*/g, '').trim();
      } else {
        result.title = value.replace(/\/\//, '').trim();
      }
      return result;
    }

    const result: Item[] = [];
    for (const node of ast.program.body) {
      if (node.type === 'ExportNamedDeclaration') {
        if (['FunctionDeclaration', 'ClassDeclaration'].includes(node.declaration.type)) {
          const { loc, declaration, leadingComments } = node;
          const { start, end } = loc;
          const { start: commentStart, title } = getTitle(leadingComments);
          // @ts-ignore
          result.push({ start: start.line, end: end.line, name: declaration.id.name, title, commentStart });
        }
      } else if (node.type === 'FunctionDeclaration') {
        const { loc, id, leadingComments } = node;
        const { start, end } = loc;
        const { start: commentStart, title } = getTitle(leadingComments);
        result.push({ start: start.line, end: end.line, name: id.name, title, commentStart });
      }
    }
    return result;
  }, [current.content]);
  // #endregion


  // #region 路由监听
  useEffect(() => router.monitor(async (to, from) => {
    if (!to.path.startsWith(props.path)) return;
    const key = to.path + '.ts';
    change(key);
  }), []);

  // 初始位置滚动
  useEffect(() => {
    if (!data.length) return;
    const name = router.current.query.name;
    if (!name) return;
    const query = data.find(val => val.name === name);
    query && setTimeout(() => {
      queryElement(query.commentStart);
    })
  }, [data])
  // #endregion



  const codeEditRef = useRef<CodeEditExpose>();

  /**
   * 根据行号滚动到相应位置
   * @param line 
   */
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


  // #region 菜单位置
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
  // #endregion



  // #region 控制台测试
  useEffect(() => {
    const KEY = '$utils';
    window[KEY] = getUtilsFuncs();
    return () => {
      delete window[KEY];
    }
  }, [])

  const [open, setOpen] = useState(false);
  const consoleRef = useRef<ConsoleExpose>();
  const consoleValue = (() => {
    const item = current.name.split('/')[2];
    if (!item) return '$utils.';
    return '$utils.' + item.replace('.ts', '');
  })();
  const storeBtns = useStore(defineStoreBtns);
  useEffect(() => {
    const id = Symbol('utilsConsole');
    const payload = { id, btn: <div onclick={() => setOpen(true)}>C</div>, layer: 2 }
    storeBtns.dispatch({ type: 'btnAdd', payload });
    return () => {
      storeBtns.dispatch({ type: 'btnRemove', payload: id });
    }
  }, [])
  // #endregion



  return <Container className={style.pageUtils}>
    <aside>
      {getMenu()}
    </aside>
    <section className={style.content}>
      <CodePreview ref={codeEditRef} value={current.content} lines={data} />
    </section>
    <aside className={style.outline}>
      <ul>{
        ...data.map(val => <li className='text-ellipsis' onclick={() => {
          queryElement(val.commentStart || val.start);
          router.replace({ path: current.name.replace('.ts', ''), query: { name: val.name }});
        }}>{val.title || val.name}</li>)
      }</ul>
      <div className={style.total}>total: {data.length}</div>
    </aside>
    <Dialog open={open} onClose={() => {
      consoleRef.current.clear();
      setOpen(false);
    }} style='width: 500px'>
      <Console ref={consoleRef} value={consoleValue} />
    </Dialog>
  </Container>
}