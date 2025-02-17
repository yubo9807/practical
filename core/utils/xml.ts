
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
// stringToVirtualDOM('<div class="wrap">hello world <span>!</span></div>');


/**
 * 去除 xml 标签
 * @param str 
 */
export function removeXMLTag(str: string) {
  return str.replace(/<[^>]+>/g, '');
}
// removeXMLTag('<div class="wrap">hello world</div>'); // hello world