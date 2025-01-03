import { JoinLine } from ".";

export default () => {
  const container = document.getElementById('container');
  const line = new JoinLine({
    el: container,
    leftLen: 3,
    rightLen: 2,
    width: 300,
    type: 'single-multi'
  })
  line.joinLine(0, 1);

  const btn = document.createElement('button');
  btn.innerText = '获取连线数据';
  btn.addEventListener('click', () => {
    const data = line.getRelations();
    console.log(data);
  })
  container.appendChild(btn);
}