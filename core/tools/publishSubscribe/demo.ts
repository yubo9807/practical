import { PublishSubscribe } from "."

export default () => {
  const pubSub = new PublishSubscribe();

  const container = document.getElementById('container');
  pubSub.on('test', (data) => {
    console.log(data);
  })

  const button = document.createElement('button');
  button.innerText = '发送事件';
  button.addEventListener('click', () => {
    pubSub.emit('test', 'hello world');
  });

  container.appendChild(button);
}
