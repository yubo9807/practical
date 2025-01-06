import { h, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'pl-react';
import { PropsType, StyleObject } from 'pl-react/types';
import { RefItem } from 'pl-react/hooks';
import './basic.scss';

export type CodeEditExpose = {
  getEl: () => HTMLElement
}
export interface CodeEditProps extends PropsType {
  value:        string
  isEdit?:      boolean                     // 是否可以进行编辑
  toHtml?:      (val: string) => string     // 将结果转为 html
  onKeyDown?:   (e: KeyboardEvent) => void  // 按键按下事件
  className?:   string | string[]
  style?:       string | StyleObject
  slotRowItem?: (i: number) => JSX.IntrinsicElements
  slotBtns?:    JSX.IntrinsicElements
  ref?:         RefItem<CodeEditExpose>
}
export default function(props: CodeEditProps) {

  // 内容
  const [model, setModel] = useState('');
  useEffect(() => {
    setModel(props.value);
  }, [props.value])

  function input(e: InputEvent) {
    const value = (e.target as HTMLInputElement).value;
    setModel(value);
  }

  // 转换为 html
  const html = useMemo(() => props.toHtml ? props.toHtml(model) : model, [model])

  const elRef = useRef<HTMLElement>();
  useImperativeHandle<CodeEditExpose>(props.ref, () => ({
    getEl: () => elRef.current,
    setValue: setModel,
  }), [])

  return <div ref={elRef} className={['br-code-edit', ...[props.className].flat()]} style={props.style}>
    <ul className='row-num'>
      {...new Array(model.replace(/\r/g, '').split('\n').length).fill(1).map((_, i) => <li>{props.slotRowItem ? props.slotRowItem(i) : i + 1}</li>)}
    </ul>
    <div className='content'>
      <pre className='mark' innerHTML={html}></pre>
      {props.isEdit !== !1 && <textarea value={model} oninput={input} onkeydown={props.onKeyDown}></textarea>}
    </div>
    <div className='btns'>
      {props.slotBtns}
    </div>
  </div>
}
