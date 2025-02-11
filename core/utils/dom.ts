
/**
 * 创建自定义元素
 * @param name 
 * @param content 
 */
export function createTemplate(name: string, content: string | HTMLElement) {
  class Template extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      const template = document.createElement('template');
      if (typeof content === 'string') {
        template.innerHTML = content;
        shadowRoot.appendChild(template.content.cloneNode(true));
      } else {
        template.appendChild(content);
        for (const node of template.childNodes) {
          shadowRoot.appendChild(node);
        }
      }
    }
  }
  customElements.define(name, Template);
}
// createTemplate('my-component', `<div>
//   <h2>hello</h2>
//   <slot></slot>
// </div>`)

/**
 * 检查当前是否有元素处于焦点中
 * @param el 
 * @returns 
 */
export function elementIsInFocus(el: HTMLElement) {
  return el === document.activeElement;
}

/**
 * 节点转字符串
 * @param node 
 */
export function nodeToString(node: Node) {
  var tmpNode = document.createElement('div');
  tmpNode.appendChild(node.cloneNode(true));
  var str = tmpNode.innerHTML;
  tmpNode = node = null;
  return str;
}

/**
 * 查看第 n 层父元素节点
 * @param el 
 * @param n （不可为负值）
 */
export function lookupParent(el: HTMLElement, n: number) {
  while (el && n) {
    el = el.parentElement;  // IE 父元素节点选择
    n--;
  }
  return el;
}

/**
 * 返回元素的第 n 个兄弟元素节点
 * @param el 
 * @param n 正返回后面的兄弟元素节点，n为负返回前面的，n为0返回自己
 */
export function retSibling(el: any, n: number) {
  while (el && n) {
    if (n > 0) {
      if (el.nextElementSibling) {
        el = el.nextElementSibling;
      } else {
        for (el.nextSibling; el && el.nextSibling != 1; el = el.nextSibling);
      }  // 解决IE兼容性问题
      n--;
    } else {
      if (el.previousElementSibling) {
        el = el.previousElementSibling;
      } else {
        for (el.previousSibling; el && el.previousSibling != 1; el = el.previousSibling);
      }
      n++;
    }
  }
  return el;
}

/**
 * 获取元素样式属性
 * @param {*} el 
 * @param {string} prop CSS属性
 */
export const getStyle = (el: HTMLElement, prop: string) => {
  if (window.getComputedStyle) {
    return window.getComputedStyle(el, null)[prop];
  } else {
    return el.style[prop];
  }
}

/**
 * 阻止事件冒泡
 * @param {*} e 源事件中也需要传参
 */
export function stopBubble(e: Event) {
  e = e || window.event;
  if (e.stopPropagation) {
    e.stopPropagation();
  } else {
    e.cancelBubble = true;
  }
}

/**
 * 添加某个 class
 * @param el 
 * @param className 自定义 class 属性
 */
export function addClass(el: HTMLElement, className: string) {
  if (hasClassName(el, className)) return;
  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
}

/**
 * 移除某个 class
 * @param el 
 * @param className 自定义 class 属性
 */
export function removeClass(el: HTMLElement, className: string) {
  if (!hasClassName(el, className)) return;
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
  el.className = el.className.replace(reg, ' ');
}

/**
 * 是否包含某个 class
 * @param el 
 * @param className 
 */
export function hasClassName(el: HTMLElement, className: string) {
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className);
}

/**
 * 阻止默认事件
 * @param event 
 */
export function cancelHandler(e: Event) {
  e = e || window.event;
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    e.returnValue = false;
  }
}

/**
 * 鼠标拖拽
 * @param ele 所拖拽的元素
 * @param limit 限制移动范围的元素（为空时，不限制移动范围）
 */
export function mouseDrag(ele: HTMLElement, limit: any) {

  // 鼠标按下
  ele.addEventListener('mousedown', function (e) {
    // 距离初始位置左顶点的距离 = 鼠标按下的坐标 - 元素的坐标
    var disX = e.clientX - ele.offsetLeft,
      disY = e.clientY - ele.offsetTop;

    window.addEventListener('mousemove', mouseMove, false)

    window.addEventListener('mouseup', () => {
      window.removeEventListener('mousemove', mouseMove, false)
    }, false)

    function mouseMove(e) {
      // 定义元素的中心点 = 鼠标按下的坐标点 - 距离左顶点的距离
      ele.style.left = e.clientX - disX + 'px';
      ele.style.top = e.clientY - disY + 'px';

      if (limit === undefined) {
        return;
      } else {
        // 约束范围
        if (parseFloat(ele.style.top) < limit.offsetTop) {
          ele.style.top = limit.offsetTop + 'px';
        }
        if (parseFloat(ele.style.left) < limit.offsetLeft) {
          ele.style.left = limit.offsetLeft + 'px';
        }
        if (parseFloat(ele.style.left + ele.clientWidth) > limit.offsetLeft + limit.clientWidth - parseFloat(ele.clientWidth+'')) {
          ele.style.left = limit.offsetLeft + limit.clientWidth - parseFloat(ele.clientWidth+'') + 'px';
        }
        if (parseFloat(ele.style.top + ele.clientHeight) > limit.offsetTop + limit.clientHeight - parseFloat(ele.clientHeight+'')) {
          ele.style.top = limit.offsetTop + limit.clientHeight - parseFloat(ele.clientHeight+'') + 'px';
        }
      }
    }
  }, false)
}