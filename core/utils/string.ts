import { randomNum } from "./number";

/**
 * 敏感信息加密
 * @param str   手机号，银行卡号之类的字符
 * @param start 开始加密索引
 * @param end   结束加密索引
 */
export function encrypt(str: string, start = 3, end = -4) {
  let password = '';
  const startNum = str.slice(0, start);
  const encryptLen = str.slice(start, end).length;
  const endNum = str.slice(end);
  for (let i = 0; i < encryptLen; i++) {
    password += '*';
  }
  return startNum + password + endNum;
}

/**
 * 获取字符串码点长度
 * @param str 
 * @returns 
 */
export function pointLength(str: string) {
  let len = 0;
  for (let i = 0; i < str.length;) {
    len++;
    const point = str.codePointAt(i);
    i += point > 0xffff ? 2 : 1;
  }
  return len;
}

/**
 * 按码点获取字符串某一位
 * @param str 
 * @param index 
 * @returns 
 */
export function pointAt(str: string, index: number) {
  let curIndex = 0;
  for (let i = 0; i < str.length;) {
    if (curIndex === index) {
      const point = str.codePointAt(i);
      return String.fromCodePoint(point);
    }
    curIndex++;
    const point = str.codePointAt(i);
    i += point > 0xffff ? 2 : 1;
  }
}

/**
 * 按码点截取字符串
 * @param str 
 * @param start 
 * @param end 
 * @returns 
 */
export function pointSlice(str: string, start: number, end?: number) {
  end ??= pointLength(str);
  let result = '';
  const len = pointLength(str);
  for (let i = start; i < len && i < end; i++) {
    result += pointAt(str, i);
  }
  return result;
}

/**
 * 生成随机字符串
 * @param len 
 * @returns 
 */
export function randomString(len: number) {
  if (len <= 11) {
    return Math.random().toString(36).substring(2, 2 + len).padEnd(len, '0');
  } else {
    return randomString(11) + randomString(len - 11);
  }
}

/**
 * 生成随机颜色
 */
export function randomColor(min = '000000', max = 'ffffff') {
  const minNumber = parseInt(min, 16), maxNumber = parseInt(max, 16);
  return '#' + randomNum(maxNumber, minNumber).toString(16);
}

/**
 * 获取 url query
 * @param url 
 * @returns 
 */
export function parseQuery(url: string) {
  const query = {};
  url.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (query[k] = v));
  return query;
}

/**
 * 生成重复字符串
 * @param str 传入字符串
 * @param n 重复次数
 */
export function cerateRepeatStr(str: string, n: number = 1) {
  let num = Math.abs(n), res = '';  // 防止传入负数，造成死循环
  while (num) {
    num % 2 === 1 && (res += str);
    num > 1 && (str += str);

    num >>= 1;  // 左位移1位
  }
  return res;
}

/**
 * 计算字符串字节长度
 * @param str 传入字符串
 */
export function strBytesLength(str: string) {
  let len = str.length, i = 0;
  while (i < len) {
    str.charCodeAt(i) > 255 && len++;  // .charCodeAt() 返回指定位置的字符的 Unicode 编码
    i++;
  }
  return len;
}

/**
 * 求一个字符串的 ascll 总和
 * @param str 
 */
export function ascllSum(str: string) {
  const arr = str.split('');
  let num = 0;
  arr.forEach(val => {
    num += val.charCodeAt(0);
  })
  return num;
}

/**
 * 版本号比较
 * @param v1 版本号1
 * @param v2 版本号2
 * @returns 如果版本号相等，返回 0, 如果第一个版本号低于第二个返回 -1，否则返回 1
 */
export const compareVersion = (v1: string, v2: string) => {
  if (!v1 && !v2) return 0;
  if (!v1) return -1;
  if (!v2) return 1;
  const v1Stack = v1.split('.');
  const v2Stack = v2.split('.');
  const maxLen = Math.max(v1Stack.length, v2Stack.length);
  for (let i = 0; i < maxLen; i++) {
    // 必须转整，否则按照字符顺序比较大小
    const prevVal = ~~v1Stack[i];
    const currVal = ~~v2Stack[i];
    if (prevVal > currVal) return 1;
    if (prevVal < currVal) return -1;
  }
  return 0;
}

/**
 * 金额大写转换
 * @param num 字符串类型数字
 * @returns 
 */
export function digitUppercase(num: string = '') {
  if (num === '') return '';
  if (isNaN(Number(num))) return '无效金额字符';
  if (num.length > 80) return '金额过大';

  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const minUnits = ['', '拾', '佰', '仟'];
  const maxUnits = ['', '万', '亿', '兆', '京', '垓', '杼', '穰', '沟', '涧', '正', '载', '极', '恒河沙', '阿僧祇', '那由它', '不可思议', '无量', '大数', '古戈尔'];
  const floatUnits = ['角', '分', '厘', '毫', '丝'];
  let money = '', small = '';

  let int = '', float = '';
  if (/\./.test(num)) {
    int = num.split('.')[0];  // 整数位
    float = num.split('.')[1].slice(0, 5);  // 浮点数位，只取前 5 位

    // 处理小数部分
    Array(...float).forEach((val, index) => {
      if (val === '0') small += digit[val];
      else small += digit[val] + floatUnits[index];
    })
    small = small.replace(/零+/, '零');  // 替换 '零...'
    small = small.replace(/零$/, '');  // 去掉以 '零' 结尾字符
  } else {
    int = num;
  }

  int = int.replace(/^0+/, '');  // 去掉以 '0...' 开头的数字

  const reg = /(?=(\B)(\d{4})+$)/g;  // 每 4 位为一组，用 ',' 隔开
  const arr = int.replace(reg, ',').split(',');
  const len = arr.length;
  arr.forEach((item, i) => {
    let str = '';

    if (/^0000$/.test(item)) return money;  // 都是 0 的情况下啥都不管

    const length = item.length;

    item = item.replace(/0+$/, '');  // 去除尾部0， 1200 -> 12

    Array(...item).forEach((val, index) => {
      if (val === '0') str += digit[val];  // 为 0 时后面不加单位
      else str += digit[val] + minUnits[length - index - 1];
    })
    str = str.replace(/零+/, '零');  // '零零...' 替换为 '零'

    money += str + maxUnits[len - i - 1];  // 把每一项加起来
    money ||= '零'
  })

  if (small) {
    return money + '元' + small;
  } else {
    return money + '元整';
  }
}

/**
 * HTML 转 AST 语法树
 * @param html
 * @returns 返回 AST 语法树
 */
export function stringToVirtualDOM(html: string = '') {
  // 创建一个虚拟 DOM 对象
  const virtualDOM: any = {};

  // 解析标签名称
  const tagRegExp = /<([a-z]+)\s*[^>]*>/;
  const match = html.match(tagRegExp);
  if (match) {
    virtualDOM.tag = match[1];
  }

  // 解析属性
  const attrRegExp = /\s*([^=\s]+)\s*=\s*['"]?([^'"\s]+)['"]?/g;
  let attrMatch;
  const attrs = {};
  while ((attrMatch = attrRegExp.exec(html))) {
    attrs[attrMatch[1]] = attrMatch[2];
  }
  virtualDOM.attrs = attrs;

  // 解析子节点
  const childrenRegExp = />(.*)<\/[a-z]+>/s;
  const childrenMatch = html.match(childrenRegExp);
  if (childrenMatch) {
    const childrenStr = childrenMatch[1].trim();
    if (childrenStr.length > 0) {
      virtualDOM.children = childrenStr.split('\n').map((childStr) => {
        if (tagRegExp.test(childStr)) {
          return stringToVirtualDOM(childStr);
        } else {
          return childStr;
        }
      });
    }
  }

  return virtualDOM;
}


/**
 * 生成随机id
 * @param length
 * @param chars
 */
export function uuid(length = 8, chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
  let result = '';
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

/**
 * 评分
 * @param r 
 * @returns 
 * @call rate(3) --> 11100
 */
export function rate(r: number) {
  return '1111100000'.slice(5 - r, 10 - r);
}
