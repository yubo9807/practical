import { AnyObj } from "./type";
declare const cookieStore;

/**
 * 获取 cookie 指定参数
 * @param {*} key 要获取的 key
 * @returns 
 */
export async function getCookie(key: string) {
  if (typeof cookieStore === 'object') {
    const obj = await cookieStore.get(key);
    return obj?.value;
  }
  const cookie = document.cookie;
  const str = cookie.replace(/\s/g, '');
  const obj = {}
  str.split(';').forEach((val: string) => {
    obj[val.split('=')[0]] = val.split('=')[1];
  })
  return obj[key];
}

/**
 * 返回浏览器视口尺寸
 */
export function getViewportOffset() {
  if (window.innerWidth) {
    return {
      x: window.innerWidth,
      y: window.innerHeight,
    }
  } else {
    if (document.compatMode === "BackCompt") {  // 混杂模式
      return {
        x: document.body.clientWidth,
        y: document.body.clientHeight,
      }
    } else {
      return {
        x: document.documentElement.clientWidth,
        y: document.documentElement.clientHeight,
      }
    }
  }
}

/**
 * 滚动条、锚链接（记得取消 a 标签默认事件）跳转过渡  默认回到顶部
 * @param el 元素节点
 */
export function scrollTo(el: any = {}, deviation = 0) {
  const num = el.offsetTop || 0;
  window.scrollTo({
    top: num + deviation,
    behavior: "smooth",
  });
}

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
 * 禁止右键复制
 * @param arr contextmenu：选择 selectstart：右键 copy：复制]
 */
export function prohibitCopy(arr: string[] = ['selectstart', 'copy']) {
  arr.forEach((ev: any) => {
    document.addEventListener(ev, (event: any) => {
      return event.returnValue = false;
    })
  });
}

/**
 * 禁止某些键盘事件
 */
export function prohibitKeydown() {
  document.addEventListener('keydown', function (event: any) {
    return !(
      112 == event.keyCode ||  // F1
      123 == event.keyCode ||  // F12
      event.ctrlKey && 82 == event.keyCode ||  // ctrl + R
      event.ctrlKey && 78 == event.keyCode ||  // ctrl + N
      event.shiftKey && 121 == event.keyCode ||  // shift + F10
      event.altKey && 115 == event.keyCode ||  // alt + F4
      "A" == event.srcElement.tagName && event.shiftKey  // shift + 点击a标签
    ) || (event.returnValue = false)
  });
}


/**
 * 检查当前浏览器是否在苹果设备上
 */
export function isAppleDevice() {
  return /Mac|iPod|iPhone|iPad/.test(navigator.platform);
}

/**
 * 判断浏览器类型
 */
export function browserType() {
  var userAgent = window.navigator.userAgent; // 取得浏览器的userAgent字符串
  var isOpera = userAgent.indexOf("Opera") > -1;
  if (isOpera) {
    return "Opera"
  }; //判断是否Opera浏览器
  if (userAgent.indexOf("Firefox") > -1) {
    return "Firefox";
  } //判断是否Firefox浏览器
  if (userAgent.indexOf("Chrome") > -1) {
    return "Chrome";
  }
  if (userAgent.indexOf("Safari") > -1) {
    return "Safari";
  } //判断是否Safari浏览器
  if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
    return "IE";
  }; //判断是否IE浏览器
}

/**
 * 生成 formData 表单
 * @param {*} obj
 * @returns
 */
export function createFormData(obj: AnyObj) {
  const data = Object.assign({}, obj);
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return formData;
}


// 资源请求错误，更换地址重试
// let count = 0;
// window.addEventListener('error', (e) => {
//   const tag = e.target;
//   if (tag.nodeName === 'SCRIPT' && !(e instanceof ErrorEvent)) {
//     if (count > 2) return;
//     const url = new URL(tag.src);
//     url.host = 'hpyyb.cn';
//     url.port = '80';
//     const script = document.createElement('script');
//     script.src = url;
//     document.write(`<script src="${url.toString()}">\<\/script>`);
//     // document.head.insertBefore(script, tag);
//     count++;
//   }
// }, true)
