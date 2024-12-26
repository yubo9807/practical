import { StreamSplit } from ".";
import { delay } from "@/source/utils/async";

export default () => {
  const container = document.getElementById('container');
  const stream = new StreamSplit({
    onMessage(msg) {
      const json = JSON.parse(msg);
      const text = document.createTextNode(json.data);
      container.appendChild(text);
    }
  });

  // 模拟 EventSource 流数据
  (async function () {
    const arr = ['hello', ', ', 'world', '!'];
    for (const val of arr) {
      const data = {
        data: val,
        time: Date.now(),
      }
      stream.add(`data:${JSON.stringify(data)}\n\n`);
      await delay(1000);
    }
  })()
}