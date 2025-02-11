import { parse } from '@babel/parser'
import { h, useEffect, useMemo, useRef, useState, useStore } from "pl-react"
import { Link, PageProps, useRouter } from "pl-react/router";
import { nextTick } from "pl-react/utils";
import Dialog from '~/core/comp/Dialog';
import CodePreview from "../CodePreview";
import Markdown from "../Markdown";
import Console, { ConsoleExpose } from "../Console";
import Container from "../Container";
import { defineStoreVariable } from "@/store/variable";
import { defineStoreSuspension } from "@/store/suspension";
import { getToolsSourceCode } from "@/utils/source";
import { tsToJs } from "@/utils/code-convert";
import style from './style.module.scss';

type Props = PageProps & {
  getSource: typeof getToolsSourceCode;
}
export default (props: Props) => {

  const storeVariable = useStore(defineStoreVariable);
  const [list, setList] = useState<{ name: string, title: string }[]>([]);
  const [body, setBody] = useState({
    code: '',
    demo: '',
    readme: '',
  });

  /**
   * 去除默认导出
   * @param code 
   * @returns 
   */
  function removeExportDefaultDeclaration(code: string) {
    const ast = parse(code, {
      sourceType: 'module',
      plugins: ['typescript'],
    });
    const find = ast.program.body.find(val => val.type === 'ExportDefaultDeclaration');
    if (!find) return code;

    const start = find.loc.start.line - 1, end = find.loc.end.line - 1;
    let result = '';
    const arr = code.split('\n');
    for (let i = 0; i < arr.length; i++) {
      if ([start, end].includes(i)) continue;
      result += arr[i].replace(/\s\s/, '') + '\n';
    }
    return result;
  }

  const consoleRef = useRef<ConsoleExpose>();

  const toolsSource = useMemo(props.getSource, []);
  async function change(key: string) {
    const result = await toolsSource;
    !list.length && setList(result.map(val => ({ name: val.name, title: val.title })));

    const query = result.find(val => val.name === key) || result[0];
    const { exec, code, demo, readme } = query;

    const body = {
      code,
      demo: removeExportDefaultDeclaration(demo),
      readme,
    }
    if (storeVariable.state.codeLanguage === 'js') {
      body.code = tsToJs(code);
      body.demo = tsToJs(body.demo);
    }
    setBody(body);

    // 等组件渲染完后再操作 dom，不影响框架本身的节点对比
    nextTick(() => {
      // console.clear();
      consoleRef.current.clear();
      const el = document.getElementById('container');
      el.innerHTML = '';
      el.setAttribute('style', '');

      exec && exec();
    })
  }

  const router = useRouter();
  useEffect(() => router.monitor(async (to) => {
    if (!to.path.startsWith(props.path)) return;
    const key = to.path.replace(props.path + '/', '');
    change(key);
  }), [])

  const [isFrist, setIsFirst] = useState(true);
  useEffect(() => {
    if (isFrist) {
      setIsFirst(false);
      return;
    }
    const key = router.current.path.replace(props.path + '/', '');
    change(key);
  }, [storeVariable.state.codeLanguage])

  const [dialogOpen, setDialogOpen] = useState(false);

  const getMenu = () => <ul className={style.navigation}>
    {...list.map(val => <li>
      <Link className='text-ellipsis' to={`${props.path}/${val.name}`}>{val.title || val.name}</Link>
    </li>)}
  </ul>
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

  return <Container className={style.sourceCodeDemo}>
    <aside>
      {getMenu()}
    </aside>
    <section className={style.content}>
      <h2>Preview</h2>
      <div className={style.preview}>
        <div id="container"></div>
        <Console ref={consoleRef} />
      </div>
      <Dialog open={dialogOpen} onClose={setDialogOpen} title="源码实现" style='width: 1000px'>
        <CodePreview value={body.code} />
      </Dialog>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h2>Use</h2>
        <a onclick={() => setDialogOpen(true)}>源码实现</a>
      </div>
      <CodePreview value={body.demo} />
      <h2></h2>
      <Markdown text={body.readme} />
    </section>
  </Container>
}