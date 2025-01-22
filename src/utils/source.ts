
const CORE_PREFIX_URL = '/core';

export function formatUrl(url: string) {
  return url.replace(CORE_PREFIX_URL, '');
}

export function getUtilsSourceCode() {
  const result = {
    keys: [] as string[],
    body: {} as Record<string, string>,
  };

  // @ts-ignore
  const obj: Record<string, string> = import.meta.glob('~/core/utils/*.ts', { as: 'raw', eager: true });

  for (const key in obj) {
    const k = formatUrl(key);
    result.keys.push(k);
    result.body[k] = obj[key];
  }
  return result;
}

/**
 * 获取所有 utils
 * @returns 
 */
export function getUtilsFuncs() {
  // @ts-ignore
  const o = import.meta.glob('~/core/utils/*.ts', { eager: true });
  const utils = {};
  for (const key in o) {
    const k = key.split('/').pop().replace('.ts', '')
    utils[k] = o[key];
  }
  return utils;
}

type CommonOption = {
  codeObj:   Record<string, string>
  demoObj:   Record<string, string>
  execObj:   Record<string, { default: Function }>
  readmeObj: Record<string, string>
  path:       string
}
function commonHandle(option: CommonOption) {
  const { codeObj, demoObj, execObj, readmeObj, path } = option;
  type Item = {
    name:   string
    title:  string
    code:   string
    exec:   Function
    demo:   string
    readme: string
  }
  const result: Item[] = [];

  for (const key in codeObj) {
    const name = formatUrl(key).split('/')[2];
    const readme = readmeObj[`${path}${name}/readme.md`] || '';
    result.push({
      name,
      title: readme.match(/# (.*)/)?.[1],
      code: codeObj[key],
      exec: execObj[`${path}${name}/demo.ts`]?.default,
      demo: demoObj[`${path}${name}/demo.ts`] || '',
      readme: readme.replace(/# (.*)/, ''),
    });
  }

  return result;
}

export function getToolsSourceCode() {
  // @ts-ignore
  const codeObj: Record<string, string> = import.meta.glob('~/core/tools/*/index.ts', { as: 'raw', eager: true });
  // @ts-ignore
  const demoObj: Record<string, string> = import.meta.glob('~/core/tools/*/demo.ts', { as: 'raw', eager: true });
  // @ts-ignore
  const execObj: Record<string, { default: Function }> = import.meta.glob('~/core/tools/*/demo.ts', { eager: true });
  // @ts-ignore
  const readmeObj: Record<string, string> = import.meta.glob('~/core/tools/*/readme.md', { as: 'raw', eager: true });

  return commonHandle({
    codeObj,
    demoObj,
    execObj,
    readmeObj,
    path: `${CORE_PREFIX_URL}/tools/`
  });
}

export function getCanvasSourceCode() {
  // @ts-ignore
  const codeObj: Record<string, string> = import.meta.glob('~/core/canvas/*/index.ts', { as: 'raw', eager: true });
  // @ts-ignore
  const demoObj: Record<string, string> = import.meta.glob('~/core/canvas/*/demo.ts', { as: 'raw', eager: true });
  // @ts-ignore
  const execObj: Record<string, { default: Function }> = import.meta.glob('~/core/canvas/*/demo.ts', { eager: true });
  // @ts-ignore
  const readmeObj: Record<string, string> = import.meta.glob('~/core/canvas/*/readme.md', { as: 'raw', eager: true });

  return commonHandle({
    codeObj,
    demoObj,
    execObj,
    readmeObj,
    path: `${CORE_PREFIX_URL}/canvas/`
  });
}