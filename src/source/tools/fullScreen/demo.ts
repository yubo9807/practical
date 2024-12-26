import { FullScreen } from '.';

export default () => {
  const container = document.getElementById('container');
  const fullScreen = new FullScreen();
  const list = [
    { name: '进入全屏', handler: () => fullScreen.enter(), },
    { name: '退出全屏', handler: () => fullScreen.exit(), },
    { name: '进入/退出全屏', handler: () => fullScreen.toggle(), },
    { name: '是否处于全屏状态全屏', handler: () => console.log(fullScreen.isFull()), },
    { name: '指定元素进入/退出全屏', handler: () => fullScreen.toggle(container), },
  ]

  const wrap = document.createElement('div');
  list.forEach(val => {
    const button = document.createElement('button');
    button.innerText = val.name;
    button.addEventListener('click', () => {
      val.handler();
    });
    wrap.appendChild(button);
  })

  container.appendChild(wrap);
}