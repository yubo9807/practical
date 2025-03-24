import { randomNum } from "./number";

type Color = [number, number, number];

/**
 * 生成随机颜色
 */
export function randomColor(min = '000000', max = 'ffffff') {
  const minNumber = parseInt(min, 16), maxNumber = parseInt(max, 16);
  return '#' + randomNum(maxNumber, minNumber).toString(16);
}


/**
 * @description: 16进制颜色转换成rgb
 */
export function colorToRGB(color: string): string {
  const hex = color.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `${r}, ${g}, ${b}`
}


/**
 * 将 rgb 颜色灰度化（基于光感加权平均）
 * @param r 
 * @param g 
 * @param b 
 * @returns 
 */
export function grayColor(r: number, g: number, b: number) {
  return .2126 * r + .7152 * g + .0722 * b;
}

/**
 * 获取两个颜色的中间色（rgba 不在考虑范围内）
 * @param startColor 开始颜色 (长度为3的数组)
 * @param endColor   结束颜色 (长度为3的数组)
 * @param num        需要多少个
 * @returns rgb list
 */
export function getMiddleColorList(startColor: Color, endColor: Color, num: number): Color[] {
  const rStep = (endColor[0] - startColor[0]) / num;
  const gStep = (endColor[1] - startColor[1]) / num;
  const bStep = (endColor[2] - startColor[2]) / num;

  const gradientColorArr = [];
  for (let i = 0; i < num; i++) {
    gradientColorArr.push([
      Math.round(startColor[0] + i * rStep),
      Math.round(startColor[1] + i * gStep),
      Math.round(startColor[2] + i * bStep)
    ])
  }
  return gradientColorArr;
}

/**
 * 合并颜色
 * @param a 
 * @param b 
 * @returns 
 */
export function mergeColor(a: string, b: string) {
  if (!/^#[0-9A-F]{6}$/i.test(a) || !/^#[0-9A-F]{6}$/i.test(b)) {
    throw new Error('Invalid hex color format');
  }

  // 解析颜色值并转换成十进制数
  const colorA = parseInt(a.slice(1), 16);
  const colorB = parseInt(b.slice(1), 16);

  // 计算每个颜色通道的平均值
  const red = Math.floor((colorA >> 16) + (colorB >> 16)) / 2;
  const green = Math.floor(((colorA >> 8) & 0xff) + ((colorB >> 8) & 0xff)) / 2;
  const blue = Math.floor((colorA & 0xff) + (colorB & 0xff)) / 2;

  // 将平均值转换回十六进制，并保证输出字符串格式为 #RRGGBB
  const mergedColor = `#${(red << 16 | green << 8 | blue).toString(16).padStart(6, '0')}`;

  return mergedColor;
}
