import { randomNum } from "./number";

/**
 * 劫持粘贴板
 * @param text 需要复制的字符
 */
export function copyToBoard(text: string) {
  if (typeof navigator.clipboard === 'object') {
    navigator.clipboard.writeText(text);
  } else {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }
}

/**
 * 提取字符串中的数字
 * @param str 
 * @returns 
 */
export function extractNumber(str: string) {
  const matches = str.match(/[+-]?\d+(\.\d+)?/g);
  return matches && Number(matches[0]);
}

/**
 * 生成随机颜色
 */
export function randomColor(min = '000000', max = 'ffffff') {
  const minNumber = parseInt(min, 16), maxNumber = parseInt(max, 16);
  return '#' + randomNum(maxNumber, minNumber).toString(16);
}