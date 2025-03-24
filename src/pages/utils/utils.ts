import { formatUrl } from "@/utils/source";

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