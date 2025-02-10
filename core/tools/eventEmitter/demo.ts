import { EventEmitter } from ".";

export default () => {
  const container = document.getElementById('container');
  const em = new EventEmitter();

  // 订阅发布事件
  const button = document.createElement('button');
  button.innerText = 'send';
  button.addEventListener('click', () => {
    em.emit('send', 'hello world!');
  })
  container.appendChild(button);

  em.on('send', (e: CustomEvent) => {
    console.log(e.detail);
  })


  // 等待事件触发
  const button2 = document.createElement('button');
  button2.innerText = 'wait event';
  const btn = EventEmitter.wait(button2);
  container.appendChild(button2);
  (async function() {
    while (1) {
      const e = await btn.waitClick;
      console.log(e);
    }
  }())
}