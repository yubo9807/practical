import { TaskSchedulings } from ".";
import { delay } from "../../utils/async";

export default () => {
  const task = new TaskSchedulings([3, 3, 1], true);
  console.time('task');
  task.add(func(1000));
  task.add(func(2000));
  task.add(func(1500));
  task.add(func(2500)).then(res => console.timeEnd('task'));
  task.add(func(1800));
  task.add(func(200));
  task.add(func(300));

  const container = document.getElementById('container');
  function func(num: number) {
    return async () => {
      await delay(num);
      const p = document.createElement('p');
      p.innerText = `delay: ${num}`;
      container.appendChild(p);
      return num;
    }
  }
}