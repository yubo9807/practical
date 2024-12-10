import { customForEach } from "pl-react/utils";

type FileObj = Record<string, () => Promise<string>>
type Result = {
  utils: string[]
  tools: string[]
  body:  Record<string, string>
}

export let backupBody: Record<string, string>

/**
 * 获取源代码
 * @returns 
 */
export function getSourceCode() {
  return new Promise<Result>(resolve => {

    function formatUrl(url: string) {
      return url.replace('/src/source', '');
    }

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
