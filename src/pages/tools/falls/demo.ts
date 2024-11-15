import { Fulls } from "./code";

const wrap = document.createElement('div');

const arr = [200, 300, 270, 100, 400, 100, 200, 300, 100, 140];
arr.forEach((val, i) => {
  const div = document.createElement('div');
  div.innerText = i+'';
  div.style.height = `${val}px`;
  div.style.background = '#eee';
  wrap.appendChild(div);
})

document.getElementById('container').appendChild(wrap);

new Fulls({
  el: wrap,
  column: Math.max(Math.trunc(wrap.offsetWidth / 200), 2),
})
