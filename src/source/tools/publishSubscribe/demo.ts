import { PublishSubscribe } from "."

export default () => {
  const pubSub = new PublishSubscribe();

  const container = document.getElementById('container');
  const messages = document.createElement('div');
  pubSub.on('test', (data) => {
    messages.innerText += data + '\n';
  })

  const button = document.createElement('button');
  button.innerText = '发送事件';
  button.addEventListener('click', () => {
    pubSub.emit('test', 'hello world');
  });

  container.appendChild(button);
  container.appendChild(messages);
}
