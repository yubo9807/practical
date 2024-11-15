import { Fragment, h, useEffect, useState } from "pl-react"
import { Link, Router, Route, useRouter } from "pl-react/lib/router"
import env from '~/config/env'
import style from './style.module.scss';
import Home from '@/pages/home'
import Tools from '@/pages/tools'
import Utils from '@/pages/utils'

export default () => {

  const [open, setOpen] = useState(false);

  useEffect(() => {
    useRouter(to => {
      setOpen(false);
    })
  }, []);

  return <>
    <header className={style.header}>
      <div>
        <span className={[style.iconMenu, open && style.active]} onclick={() => setOpen(!open)}>
          <span></span>
        </span>
        <Link className={style.title} to='/'>{env.PROJECT_NAME}</Link>
      </div>

      <nav className={open && style.active}>
        <Link to='/'>简介</Link>
        <Link to='/tools'>工具类</Link>
        <Link to='/utils'>工具函数</Link>
      </nav>
    </header>
    <main className={['leayer', style.main]}>
      <Router>
        <Route path="/" element={Home} />
        <Route path="/tools" element={Tools} exact={false} />
        <Route path="/utils" element={Utils} exact={false} />
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