import { Fragment, h, useEffect, useState, useStore } from "pl-react"
import { Link, Router, Route, useRouter } from "pl-react/router"
import env from '~/config/env'
import style from './style.module.scss';
import Home from '@/pages/home'
import { storeVariable } from "@/store/variable";

export default () => {

  const [open, setOpen] = useState(false);

  const router = useRouter();
  useEffect(() => {
    router.monitor(to => {
      setOpen(false);
    })
  }, []);


  const [state, dispatch] = useStore(storeVariable);
  function selectChange(e) {
    dispatch({
      type: 'codeLanguageChange',
      payload: e.target.value,
    })
  }

  return <>
    <header className={style.header}>
      <div>
        <span className={[style.iconMenu, open && style.active]} onclick={() => setOpen(!open)}>
          <span></span>
        </span>
        <Link className={style.title} to='/'>{env.PROJECT_NAME}</Link>
      </div>

      <nav className={open && style.active}>
        <select onchange={selectChange}>
          <option value="ts" selected={state.codeLanguage === 'ts'}>TypeScript</option>
          <option value="js" selected={state.codeLanguage === 'js'}>JavaScript</option>
        </select>
        <Link to='/'>简介</Link>
        <Link to='/tools'>工具类</Link>
        <Link to='/utils'>工具函数</Link>
      </nav>
    </header>
    <main className={['leayer', style.main]}>
      <Router>
        <Route path="/" element={Home} />
        <Route path="/tools" element={import('@/pages/tools')} exact={false} />
        <Route path="/utils" element={import('@/pages/utils')} exact={false} />
      </Router>
    </main>
    <footer className={style.footer}>
      <div className="leayer">
        <p style='color: #999'>暂未发布正式版本，敬请期待！</p>
        <p>
          技术支持：
          <a href='https://github.com/yubo9807/pl-react' target='_blank'>Pl React</a>
        </p>
      </div>
    </footer>
  </>
}