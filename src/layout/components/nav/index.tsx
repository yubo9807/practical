import { h, useEffect, useState, useStore } from "pl-react";
import style from './index.module.scss'
import { Link } from "pl-react/router";
import { defineStoreSuspension } from "@/store/suspension";
import { defineStoreVariable } from "@/store/variable";

type Props = {
  open: boolean
}
export default function(props: Props) {

  const storeVariable = useStore(defineStoreVariable);
  function selectChange(e) {
    storeVariable.dispatch({
      type: 'codeLanguageChange',
      payload: e.target.value,
    })
  }

  const storeSuspension = useStore(defineStoreSuspension);
  const [isMainMenu, setIsMainMenu] = useState(false);

  useEffect(() => {
    if (props.open) {
      setIsMainMenu(!storeSuspension.state.menu);  // 有数据，则前往子菜单
    }
  }, [props.open])

  return <nav className={[style.nav, props.open && style.active]}>
    {isMainMenu ? '' : <span className={style.return} onclick={() => setIsMainMenu(!isMainMenu)}>回到主菜单</span>}
    <div className={style.box} style={`--translate-x: ${isMainMenu ? 0 : -50}%`}>
      <div className={style.navigation}>
        <select onchange={selectChange}>
          <option value="ts" selected={storeVariable.state.codeLanguage === 'ts'}>TypeScript</option>
          <option value="js" selected={storeVariable.state.codeLanguage === 'js'}>JavaScript</option>
        </select>
        <Link to='/canvas'>Canvas</Link>
        <Link to='/tools'>Class</Link>
        <Link to='/utils'>Func</Link>
        <Link to='/binary'>Binary</Link>
      </div>
      <div className={style.subMenu}>
        {storeSuspension.state.menu}
      </div>
    </div>
  </nav>
}