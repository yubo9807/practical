import { h, useEffect, useLayoutEffect, useState, useStore } from "pl-react";
import { Link } from "pl-react/router";
import { Option, Select } from "@/components/Select";
import { defineStoreSuspension } from "@/store/suspension";
import { defineStoreVariable } from "@/store/variable";
import style from './index.module.scss'

type Props = {
  open: boolean
}
export default function(props: Props) {

  const storeVariable = useStore(defineStoreVariable);

  // #region 语言切换
  function codeLanguageChange(value: typeof storeVariable.state.codeLanguage) {
    storeVariable.dispatch({
      type: 'codeLanguageChange',
      payload: value,
    })
  }
  // #endregion


  const storeSuspension = useStore(defineStoreSuspension);
  // #region 菜单切换
  const [isMainMenu, setIsMainMenu] = useState(false);
  useEffect(() => {
    if (props.open) {
      setIsMainMenu(!storeSuspension.state.menu);  // 有数据，则前往子菜单
    }
  }, [props.open])
  // #endregion


  // #region 主题切换
  type Theme = typeof storeVariable.state.theme;
  function setTheme(value: Theme) {
    storeVariable.dispatch({
      type: 'setTheme',
      playload: value,
    })
  }
  const [isFirst, setIsFirst] = useState(true);
  const THEME_KEY = '__theme__';

  // 手动切换主题
  useLayoutEffect(() => {
    const theme = storeVariable.state.theme;
    const prefers = matchMedia('(prefers-color-scheme: dark)');
    const result = theme === 'OS' ? prefers.matches ? 'dark' : 'light' : theme;
    if (isFirst) {
      const theme = localStorage.getItem(THEME_KEY) as Theme || 'OS';
      setTheme(theme);
      setIsFirst(false);
    } else {
      localStorage.setItem(THEME_KEY, storeVariable.state.theme);
    }
    document.documentElement.dataset.theme = result;
  }, [storeVariable.state.theme])

  // 系统自动切换主题
  useLayoutEffect(() => {
    const prefers = matchMedia('(prefers-color-scheme: dark)');
    function followOS() {
      const cacheTheme = localStorage.getItem(THEME_KEY);
      if (cacheTheme !== 'OS') return;
      document.documentElement.dataset.theme = prefers.matches ? 'dark' : 'light';
    }
    prefers.addEventListener('change', followOS);
    return () => {
      prefers.removeEventListener('change', followOS);
    }
  }, [])
  // #endregion



  return <nav className={[style.nav, props.open && style.active]}>
    {isMainMenu ? '' : <span className={style.return} onclick={() => setIsMainMenu(!isMainMenu)}>回到主菜单</span>}
    <div className={style.box} style={`--translate-x: ${isMainMenu ? 0 : -50}%`}>
      <div className={style.navigation}>
        <Select active={storeVariable.state.theme} onChange={setTheme}>
          <Option value="OS">跟随系统</Option>
          <Option value="light">亮色主题</Option>
          <Option value="dark">暗色主题</Option>
        </Select>
        <Select active={storeVariable.state.codeLanguage} onChange={codeLanguageChange}>
          <Option value="ts">TypeScript</Option>
          <Option value="js">JavaScript</Option>
        </Select>
        <Link to='/tools'>Class</Link>
        <Link to='/utils'>Func</Link>
        <Link to='/canvas'>Canvas</Link>
        <Link to='/binary'>Binary</Link>
      </div>
      <div className={style.subMenu}>
        {storeSuspension.state.menu}
      </div>
    </div>
  </nav>
}