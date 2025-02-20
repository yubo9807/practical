import { h } from "pl-react";
import { isType } from "~/core/utils/judge";


type Item = { type: ReturnType<typeof isType>, text: string, color: string }

type Action
= { type: 'log', plaload: any[] }
| { type: 'clear' }

export function reduceer(state: Item[][], action: Action) {
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

  switch (action.type) {
    case 'log':
      return [...state, append(...action.plaload)]
    case 'clear':
      return []
    default:
      return state;
  }
}