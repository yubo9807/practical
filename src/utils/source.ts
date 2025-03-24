
export const CORE_PREFIX_URL = '/core';

export function formatUrl(url: string) {
  return url.replace(CORE_PREFIX_URL, '');
}

type CommonOption = {
  codeObj:   Record<string, string>
  demoObj:   Record<string, string>
  execObj:   Record<string, { default: Function }>
  readmeObj: Record<string, string>
  path:       string
}
export function commonHandle(option: CommonOption) {
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
