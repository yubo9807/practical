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
  useLayoutEffect(() => {
    storeVariable.dispatch({ type: 'initTheme' });
  }, [])
  type Theme = typeof storeVariable.state.theme;
  function setTheme(value: Theme) {
    storeVariable.dispatch({
      type: 'setTheme',
      playload: value,
    })
  }
  // #endregion


  return <nav className={[style.nav, props.open && style.active]}>
    {isMainMenu ? '' : <span className={style.return} onclick={() => setIsMainMenu(!isMainMenu)}>回到主菜单</span>}
    <div className={style.box} style={`--translate-x: ${isMainMenu ? 0 : -50}%`}>
      <div className={style.navigation}>
        <Link to='/tools'>Class</Link>
        <Link to='/utils'>Func</Link>
        <Link to='/canvas'>Canvas</Link>
        <Link to='/binary'>Binary</Link>
        <details className={style.more}>
          <summary>更多</summary>
          <ul className={style.wrap}>
            <li>
              <a href="https://github.com/yubo9807/practical" target="_blank">GitHub</a>
            </li>
            <li>
              <Select active={storeVariable.state.codeLanguage} onChange={codeLanguageChange}>
                <Option value="ts">TypeScript</Option>
                <Option value="js">JavaScript</Option>
              </Select>
            </li>
            <li>
              <Select active={storeVariable.state.theme} onChange={setTheme}>
                <Option value="OS">跟随系统</Option>
                <Option value="light">亮色主题</Option>
                <Option value="dark">暗色主题</Option>
              </Select>
            </li>
          </ul>
        </details>
      </div>
      <div className={style.subMenu}>
        {storeSuspension.state.menu}
      </div>
    </div>
  </nav>
}