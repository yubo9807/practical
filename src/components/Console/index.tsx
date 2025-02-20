import { h, useEffect, useImperativeHandle, useReducer, useState } from "pl-react"
import { RefItem } from "pl-react/hooks";
import './index.scss'
import { reduceer } from "./utils";

export type ConsoleExpose = {
  log: (...msgs: any[]) => void
  clear: () => void
}
type Props = {
  ref?: RefItem<ConsoleExpose>
  value?: string
}
export default (props: Props) => {
  const [list, dispatch] = useReducer(reduceer, []);

  function log(...msgs: any[]) {
    dispatch({ type: 'log', plaload: msgs });
  }
  function clear() {
    dispatch({ type: 'clear' });
  }


  // 重写 console.log
  useEffect(() => {
    const backupLog = console.log;
    console.log = (...msgs: any[]) => {
      log(...msgs);
      backupLog(...msgs);
    }
    return () => {
      console.log = backupLog;
    }
  }, [])

  useImperativeHandle<ConsoleExpose>(props.ref, () => {
    return {
      log,
      clear,
    }
  })


  const [value, setValue] = useState('');
  useEffect(() => {
    props.value && setValue(props.value || '');
  }, [props.value])
  useEffect(() => {  // 去除前后空格
    const target = value.trim();
    if (value !== target) {
      setValue(target);
    }
  }, [value])
  function onOnput(e: Event) {
    setValue((e.target as HTMLInputElement).value);
  }

  const [logs, setLogs] = useState<string[]>([]);
  const [index, setIndex] = useState(logs.length);
  function inputEnter(e: KeyboardEvent) {
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
      let i = 0;
      if (e.key === 'ArrowUp') {
        i = Math.max(0, index - 1);
      } else {
        i = Math.min(logs.length, index + 1);
      }
      setIndex(i);
      setValue(logs[index] || '');
      return;
    }

    if (!e.shiftKey && e.key === 'Enter') {
      const value = (e.target as HTMLInputElement).value.replace(/\n|(\n')$/, '');
      if (!value) return;
      setLogs([...logs, value]);
      setValue('');
      try {
        const result = new Function('return ' + value)();
        log(result);
      } catch (e) {
        log(e);
      }
    }
  }

  return <div className='console'>
    <ul>
      {...list.map(item => <li>
        <span className='result'>&lt;</span>&nbsp;
        {...item}
      </li>)}
    </ul>
    <div className='last-line'>
      <span className='input'>&gt;</span>&nbsp;
      <textarea value={value} oninput={onOnput} rows={1} placeholder="console..." onkeydown={inputEnter} />
    </div>
    <div className="btns">
      <span onclick={clear}>clear</span>
    </div>
  </div>
}

