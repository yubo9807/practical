/**
 * 检测密码强度（最强为 4 级）
 * @param str 
 */
export function checkPasswordLevel(str: string) {
  var lv = 0;
  if (str.length < 6) return lv;
  /[0-9]/.test(str) && lv++;
  /[a-z]/.test(str) && lv++;
  /[A-Z]/.test(str) && lv++;
  /[\.|-|_]/.test(str) && lv++;
  return lv;
}

/**
 * 去除 xml 标签
 * @param str 
 */
export function removeXMLTag(str: string) {
  return str.replace(/<[^>]+>/g, '');
}

/**
 * 是否符合两位浮点数
 * @param str 
 * @returns 
 */
export function isFixed2Float(str: string) {
  const reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
  return reg.test(str);
}
