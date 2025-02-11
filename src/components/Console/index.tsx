import { h, useEffect, useImperativeHandle, useState } from "pl-react"
import { RefItem } from "pl-react/hooks";
import './index.scss'
import { isType } from "~/core/utils/judge";

export type ConsoleExpose = {
  log: (...msgs: any[]) => void
  clear: () => void
}
type Props = {
  ref?: RefItem<ConsoleExpose>
  value?: string
}
export default (props: Props) => {
  type Item = { type: ReturnType<typeof isType>, text: string, color: string }
  const [list, setList] = useState<Item[][]>([]);

  type Config = {
    [k in ReturnType<typeof isType>]: (v) => string
  }
  const config: Config = {
    Number(v: number) {
      return <span className='number'>{v}</span>
    },
    String(s: string) {
      return <span className='string'>{s}</span>
    },
    Boolean(b: boolean) {
      return <span className='boolean'>{b+''}</span>
    },
    Symbol(s: Symbol) {
      return <span className={'symbol'}>{s.toString()}</span>
    },
    Bigint(b: bigint) {
      return <span className={'bigint'}>{b+'n'}</span>
    },
    Undefined(u: undefined) {
      return <span className={'undefined'}>{u+''}</span>
    },
    Null(n: null) {
      return <span className={'null'}>{n+''}</span>
    },
    RegExp(r: RegExp) {
      return <span className={'regexp'}>{r.toString()}</span>
    },
    Date(d: Date) {
      return <span className={'date'}>{d.toString()}</span>
    },
    Object(o: object) {
      let str = '';
      for (const k in o) {
        str += `${k}: ${o[k]}, `;
      }
      return <span className='object'>{`{ ${str.slice(0, -2)} }`}</span>;
    },
    Array(a: Array<any>) {
      return <span className='array'>{`[${a.join(', ')}]`}</span>;
    },
    Function(f: Function) {
      return <span className='function'>{f.toString()}</span>
    },
    Promise(p: Promise<any>) {
      return <span className='promise'>{p.toString()}</span>
    },
    Set(s: Set<any>) {
      let str = '';
      for (const v of s) {
        str += `${v},`
      }
      return <span className='set'>{`Set {${str.slice(0, -1)}}'`}</span>
    },
    Map(m: Map<any, any>) {
      let str = '';
      for (const [k, v] of m) {
        str += `${this.value(k)}: ${this.value(v)}, `
      }
      return <span className='map'>{`Map {${str.slice(0, -2)}}`}</span>
    },
    WeakSet(s: WeakSet<any>) {
      return <span className='weakset'>{s.toString()}</span>
    },
    WeakMap(m: WeakMap<any, any>) {
      return <span className='weakmap'>{m.toString()}</span>
    },
    WeakRef(r: WeakRef<any>) {
      return <span className='weakref'>{r.toString()}</span>
    },
    Error(e: Error){
      return <span className='error'>{e.stack}</span>
    },
  }

  function append(...msgs: any[]) {
    if (msgs.length === 0) return;

    const result = [];
    for (const msg of msgs) {
      let type = isType(msg);
      const handle = config[type];
      if (!handle) {
        type = 'Object';
      }
      const jsx = config[type](msg);
      result.push(jsx);
    }
    return result;
  }

  const arr = [...list];
  function log(...msgs: any[]) {
    arr.push(append(...msgs));
    setList(arr);
  }
  function clear() {
    arr.length = 0;
    setList([]);
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
  })

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
        setList([...list, append(result)]);
      } catch (e) {
        setList([...list, append(e)]);
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

