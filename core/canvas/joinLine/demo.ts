import { JoinLine } from ".";

export default () => {
  const container = document.getElementById('container');
  const joinLine = new JoinLine({
    el: container,
    leftLen: 3,
    rightLen: 2,
    width: 300,
    type: 'single-multi'
  })

  const btn = document.createElement('button');
  btn.innerText = '获取连线数据';
  btn.addEventListener('click', () => {
    const data = joinLine.getRelations();
    console.log(data);
  })
  container.appendChild(btn);
}