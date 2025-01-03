import { ChartTimerBar } from ".";

export default () => {
  const container = document.getElementById('container');
  const timerBar = new ChartTimerBar({
    el: container,
    height: 200,
    xAxis: {
      data: ['2021', '2022', '2023', '2024', '2025', '2026'],
    },
    series: [
      {
        data: [120, 230, 220, 907, 150, 101],
      }
    ],
    onSliderIndexChange(start, end) {
      console.log(start, end)
    }
  })

  const btn = document.createElement('button');
  btn.innerText = 'play';
  btn.addEventListener('click', () => {
    timerBar._cfg.slider.left = 0;
    timerBar._cfg.slider.right = timerBar._cfg.gap;
    timerBar.play(true);
  })
  container.appendChild(btn);
}