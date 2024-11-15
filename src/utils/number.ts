/**
 * 判断一个数是否为偶数
 * @param num
 * @returns
 */
export function isEven(num: number) {
  const c = num / 2;
  return c / Math.floor(c) === 1 || c === 0;
}

/**
 * 计算两个点的角度
 * @param x1 
 * @param y1 
 * @param x2 
 * @param y2 
 * @returns 
 */
export function calculateAngle(x1: number, y1: number, x2: number, y2: number) {
  // 计算向量的dx和dy，即两点之间的横纵坐标差
  const dx = x1 - x2;
  const dy = y1 - y2;
  const radian = Math.atan2(dy, dx);
  return radian * (180 / Math.PI); 
}

/**
 * 生成随机数
 * @param max 最大值（取不到，只可取正整数）
 * @param min 最小值
 */
export function randomNum(max: number, min: number = 0) {
  return ~~(Math.random() * (max - min) + min);
}