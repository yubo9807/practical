import { Fragment, h, useEffect, useState } from "pl-react"
import { Link, Router, Route, useRouter } from "pl-react/router"
import env from '~/config/env'
import style from './style.module.scss';
import Home from '@/pages/home'
import Nav from "./components/nav";

export default () => {

  const [open, setOpen] = useState(false);

  const router = useRouter();
  useEffect(() => {
    router.monitor(to => {
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

      <Nav open={open} />
    </header>
    <main className={['leayer', style.main]}>
      <Router>
        <Route path="/" element={Home} />
        <Route path="/binary" element={import('@/pages/binary')} />
        <Route path="/canvas" element={import('@/pages/canvas')} exact={false} />
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