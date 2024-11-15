/**
 * 金额大写转换
 * @param num 字符串类型数字
 * @returns 
 */
export function amountUppercase(num: string = '') {
  if (num === '') return '';
  if (/[^\d|\.]/gs.test(num)) {
    throw new Error('无效金额字符');
  }
  if (num.length > 80) {
    throw new Error('金额过大，无法计算');
  }

  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const minUnits = ['', '拾', '佰', '仟'];
  const maxUnits = ['', '万', '亿', '兆', '京', '垓', '杼', '穰', '沟', '涧', '正', '载', '极', '恒河沙', '阿僧祇', '那由它', '不可思议', '无量', '大数', '古戈尔'];
  const floatUnits = ['角', '分', '厘', '毫', '丝'];
  let money = '', small = '';

  let int = '', float = '';
  if (/\./.test(num)) {
    int = num.split('.')[0];  // 整数位
    float = num.split('.')[1].slice(0, floatUnits.length);  // 浮点数位

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
