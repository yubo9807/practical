import { ChartWait } from ".";

export default () => {
  const container = document.getElementById('container');
  const wait = new ChartWait({
    el: container,
    percentage: 30,
    size: 300,
  })
  wait._canvas.style.borderRadius = '50%';

  setInterval(() => {
    const num = Math.random() * 100;
    wait.option.percentage = num;
    wait.option.color = num > 60 ? '#ffaa00' : '#0080ff';
  }, 2000)
}
