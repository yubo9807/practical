import { TaskScheduling } from ".";
import { delay } from "../../utils/async";

export default () => {
  const task = new TaskScheduling(3);

  const start = Date.now();
  task.onEnd = () => {
    console.log('总耗时：', Date.now() - start);
  }

  task.add(func(100));
  task.add(func(200));
  task.add(func(150));
  task.add(func(250)).then(res => console.log('task'));
  task.add(func(180));
  task.add(func(200));
  task.add(func(300));

  function func(num: number) {
    return async () => {
      await delay(num);
      console.log(num);
      return num;
    }
  }
}