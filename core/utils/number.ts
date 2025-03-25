/**
 * 生成随机数（只可取正整数）
 * @param max 最大值（取不到）
 * @param min 最小值
 */
export function randomNum(max: number, min: number = 0) {
  return ~~(Math.random() * (max - min) + min);
}

/**
 * 截取两位小数并进行银行计数转换
 * @param num 一个数
 * @param fixed 保留几位小数
 * @returns
 */
export function toFixed2AndBankCount(num: string | number = '', fixed = 2) {
  const str = String(num);
  const reg = /(?=(\B)(\d{3})+$)/g;
  if (str.includes('.')) {
    const index = str.indexOf('.');
    const int = str.slice(0, index);  // 整数部分
    const float = str.slice(index, index + fixed + 1);  // 浮点数部分
    return int.replace(reg, ',') + float;
  } else {
    return str.replace(reg, ',');
  }
}
// toFixed2AndBankCount(1234);       //--> 1,234
// toFixed2AndBankCount(1234.5678);  //--> 1,234.56

/**
 * 小数转百分比
 * @param num 
 * @param digit 保留小数位
 * @returns 
 */
export function toPercentage(num: number, digit: number) {
  return Math.abs(num * 100).toFixed(digit) + '%';
}
// toPercentage(0.123456, 2);  //--> 12.35%

/**
 * 反转整数
 * @param num 最大限制 9 位 + 1
 * @returns 
 */
export function reverseInteger(num: number) {
  let result = 0;
  while (num !== 0) {
    result = result * 10 + num % 10;
    // Math.trunc() 方法会将数字的小数部分去掉，只保留整数部分
    num = Math.trunc(num / 10);
  }

  if (result > 2 ** 31 || result < -(2 ** 31)) return 0;
  return result;
}
// reverseInteger(123);  //--> 321

/**
 * 计算字节大小
 * @param {*} num
 * @param {*} utils
 * @returns
 */
export function calculateByte(num = 0, utils = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB', 'NB', 'DB', 'CB', 'EB', 'ZB', 'YB', 'BB']) {
  const len = utils.length;
  let str = '';
  if (num < 1024) str = num + utils[0];
  for (let i = 1; i < len; i++) {
    if (num > 1024 ** i) str = Math.ceil(num / (1024 ** i)) + utils[i];
  }
  return str;
}
// calculateByte(1024 * 3);  //--> 3KB

/**
 * 整数转英文单词
 * @param num 
 * @returns 
 */
export function numberToWords(num: number) {
  function toHundreds(num: number) {
    const numbers = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
      "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const result = Array(3).fill("");
    let a = Math.trunc(num / 100), b = num % 100, c = num % 10;
    result[0] = a > 0 && `${numbers[a]} Hundred`;
    result[1] = b < 20 ? numbers[b] : tens[Math.trunc(b / 10)]
    result[2] = b >= 20 && `${numbers[c]}`;
    return result.filter(Boolean).join(" ");
  }

  let result = toHundreds(num % 1000);
  const bigNumbers = ["Thousand", "Million", "Billion"];
  for (let i = 0; i < 3; ++i) {
    num = Math.trunc(num / 1000);
    result = num % 1000 !== 0 ? [toHundreds(num % 1000), bigNumbers[i], result].filter(Boolean).join(" ") : result;
  }
  return result.length === 0 ? "Zero" : result;
}
// numberToWords(1004);  //--> One Thousand Four


type ChangeAnimationOptions = {
  from: number,
  to: number,
  duration: number,
  onProgress: (v: number) => void
}
/**
 * 数字变化动画
 * @param param0 
 */
export function changeAnimation({ from, to, duration, onProgress }: ChangeAnimationOptions) {
  let v = from;
  const start = Date.now();
  const steed = (to - from) / duration;
  // 让 v 变化一点
  function _run() {
    const t = Date.now() - start;
    if (t >= duration) {
      v = to;
      onProgress(v);
      return;
    }
    v = from + steed * t;
    onProgress(v);
    requestAnimationFrame(_run);
  }
  _run();
}
// changeAnimation({
//   from: 0,
//   to: 985,
//   duration: 1000,
//   onProgress: (v) => console.log(v),
// });

/**
 * 分页计算
 * @param option 
 * @returns 
 */
export function pagingCompute(option: {
  total:     number  // 总条数
  size?:     number  // 每页条数
  current?:  number  // 当前页码
  blockNum?: number  // 中间部分需要的页码数量
  neat?:     boolean // 是否需要补齐
}) {
  const { total, current, size, blockNum, neat } = Object.assign({
    size:     10,
    current:  1,
    blockNum: 5,
    neat:     true,
  }, option);
  const maxCurrent = Math.ceil(total / size) - Math.floor(blockNum / 2);
  const newBlockNum = Math.min(blockNum, Math.ceil(total / size));

  let middenStart = Math.max(1, Math.min(maxCurrent, current) - Math.floor(blockNum / 2));
  // const pageEnd = Math.min(pages, pageStart + blockNum - 1);
  if (neat) {
    middenStart = Math.max(middenStart, 2);
    middenStart = Math.min(middenStart, maxCurrent - newBlockNum + 2);
  }

  const midden = new Array(newBlockNum).fill(0).map((_, i) => middenStart + i);
  const pages = Math.ceil(total / size);
  let start: number, end: number;
  if (middenStart > 1) {
    start = 1;
  }
  if (midden[midden.length - 1] < pages) {
    end = pages;
  }

  return {
    start,
    midden,
    end,
    current: Math.min(current, pages),
  }
}
// pagingCompute({
//   total: 100,
//   current: 11,
//   neat: false,
// })  //--> {start: 1, midden: [6, 7, 8, 9, 10], end: undefined, current: 10}
