import { customForEach } from "pl-react/utils";

type FileObj = Record<string, () => Promise<string>>
type Result = {
  utils: string[]
  tools: string[]
  body:  Record<string, string>
}

function formatUrl(url: string) {
  return url.replace('/src/source', '');
}

export let backupBody: Record<string, string>

/**
 * 获取源代码
 * @returns 
 */
export function getSourceCode() {
  return new Promise<Result>(resolve => {

    // @ts-ignore
    const toolsObj: FileObj = import.meta.glob('@/source/tools/**/*.(ts|md)', { as: 'raw' });
    const tools = Object.keys(toolsObj).map(formatUrl);

    // @ts-ignore
    const utilsObj: FileObj = import.meta.glob('@/source/utils/**/*.ts', { as: 'raw' });
    const utils = Object.keys(utilsObj).map(formatUrl);

    const keys = [...tools, ...utils];
    const funcs = Object.values(toolsObj).concat(Object.values(utilsObj)).map(val => val());

    const body: Record<string, string> = {}
    Promise.allSettled(funcs).then(res => {
      customForEach(res, (val, index) => {
        if (val.status === 'fulfilled') {
          body[keys[index]] = val.value;
        }
      })

      backupBody = body;
      resolve({
        utils,
        tools,
        body,
      })
    })
  })
}

export function getUtilsSourceCode() {
  type Result = {
    keys: string[],
    body: Record<string, string>
  }
  const result: Result = {
    keys: [],
    body: {}
  };
  return new Promise<Result>(async resolve => {
    // @ts-ignore
    const obj: FileObj = import.meta.glob('@/source/utils/*.ts', { as: 'raw' });
    const funcs: Promise<string>[] = [];
    customForEach(Object.entries(obj), ([key, value]) => {
      result.keys.push(formatUrl(key));
      funcs.push(value());
    })
    Promise.allSettled(funcs).then(res => {
      customForEach(res, (val, index) => {
        if (val.status === 'fulfilled') {
          result.body[result.keys[index]] = val.value;
        }
      })
      resolve(result);
    })
  })
}

export function getToolsSourceCode() {
  type Result = {
    names: string[]
    body: Record<string, string>
  }
  const result: Result = {
    names: [],
    body: {},
  }
  return new Promise<Result>(async resolve => {
    // @ts-ignore
    const obj: FileObj = import.meta.glob('@/source/tools/**/*.(ts|md)', { as: 'raw' });

    const keys: string[] = [];
    const funcs: Promise<string>[] = [];
    const set: Set<string> = new Set();
    customForEach(Object.entries(obj), ([ key, value ]) => {
      const k = formatUrl(key);
      keys.push(k);
      funcs.push(value());
      set.add(k.split('/')[2]);
    })
    result.names = Array.from(set);

    Promise.allSettled(funcs).then(res => {
      customForEach(res, (val, index) => {
        if (val.status === 'fulfilled') {
          result.body[keys[index]] = val.value;
        }
      })
      resolve(result);
    })
  })
}