import { h, useEffect, useImperativeHandle, useState } from "pl-react"
import type { PropsType, StyleObject } from "pl-react/types"
import './module.scss';

export interface LoadingProps extends PropsType {
  visible:    boolean
  className?: string | string[]
  style?:     StyleObject
  childIcon?: any
  childTips?: any
}
export default function Loading(props: LoadingProps) {

  const [modle, setModel] = useState(props.visible);
  useEffect(() => {
    setModel(props.visible);
  }, [props.visible])

  useImperativeHandle(props.ref, () => ({
    show() {
      setModel(true);
    },
    hide() {
      setModel(false);
    },
  }), [])

  return <div
    className={["br-loading", ...[props.className].flat()]}
    style={{
      ...(props.style || {}),
      display: modle ? 'block' : 'none',
    }}
  >
    <div className='wrap'>
      <div className='box'>{props.childIcon}</div>
      <div className='tips'>{props.childTips}</div>
    </div>
  </div>
}
