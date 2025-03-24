import { delay } from "../../utils/async";
import { VoiceTextSplit } from "."

export default async () => {
  const container = document.getElementById('container');
  const content = document.createElement('pre');

  const arr = [];
  function render() {
    content.innerHTML = JSON.stringify(arr, null, 2);
  }

  const voiceSplit = new VoiceTextSplit({
    rouseKeywords: ['你好小肚', '小肚，小肚'],
    endKeywords: ['结束', '完了'],
    onRouseStart(str) {
      arr.push({ type: 'rouse', text: str });
      arr.push({ type: 'reply', text: '哎，俺在！' });
      arr.push({ type: 'talk', text: '' });
      render();
    },
    onMessage(str, normal) {
      if (!arr.length) return;
      const lastItem = arr[arr.length - 1];
      lastItem.text += str;
      if (normal) {
        lastItem.text = lastItem.text.replace(normal, '');
      }
      render();
    },
  })

  async function talk() {
    if (voiceSplit.status === 'running') return;  // 收录过程中
    voiceSplit.start();
    const str = '这是个语音合成的文字哈。你好小肚，我是你爸爸，小肚，小肚，乃鼻窦了一天天是，叫你也不吭个气。说完了小杂毛，';
    for (const v of str) {
      await delay(100);
      voiceSplit.add(v);
    }
  }
  talk();

  const startBtn = document.createElement('button');
  startBtn.innerText = '开始收录';
  startBtn.onclick = talk;
  const endBtn = document.createElement('button');
  endBtn.innerText = '停止收录';
  endBtn.onclick = () => voiceSplit.stop();
  container.append(startBtn, endBtn, content);
}