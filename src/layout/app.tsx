import { Fragment, h, useEffect, useState, useStore } from "pl-react"
import { Link, Router, Route, useRouter } from "pl-react/router"
import env from '~/config/env'
import style from './style.module.scss';
import Home from '@/pages/home'
import Nav from "./components/nav";
import { defineStoreBtns } from "@/store/btns";
import { scrollTo } from "~/core/utils/browser";

export default () => {

  // #region 展开侧边栏（手机端有效）
  const [open, setOpen] = useState(false);

  const router = useRouter();
  useEffect(() => router.monitor(to => {
    setOpen(false);
  }), []);
  // #endregion


  // #region 悬浮按钮
  const storeBtns = useStore(defineStoreBtns);
  useEffect(() => {
    const id = Symbol('scrollToTop');
    const payload = { id, btn: <div onclick={() => scrollTo()}>⬆︎</div>, layer: 1, };

    function scrollFunc() {
      if (window.scrollY > 60) {
        storeBtns.dispatch({ type: 'btnAdd', payload });
      } else {
        storeBtns.dispatch({ type: 'btnRemove', payload: id });
      }
    }

    window.addEventListener('scroll', scrollFunc);
    return () => {
      window.removeEventListener('scroll', scrollFunc);
    }
  }, [])
  const btns = storeBtns.state.sort((a, b) => b.layer - a.layer);
  // #endregion


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
    <main className={style.main}>
      <Router>
        <Route path="/" element={Home} />
        <Route path="/tools" element={() => import('@/pages/tools')} exact={false} />
        <Route path="/utils" element={() => import('@/pages/utils')} exact={false} />
        <Route path="/canvas" element={() => import('@/pages/canvas')} exact={false} />
        <Route path="/binary" element={() => import('@/pages/binary')} />
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
    <ul className={style.btns}>{...btns.map(val => <li>{val.btn}</li>)}</ul>
  </>
}