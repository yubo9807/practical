# 事件流切割

## Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| normal | 匹配内容 | `RegExp` | `/data:(.+)?\n\n/` | - |
| onMessage | 将匹配到的内容进行多次回调 | `(str: string) => void` | - | - |

## Methods

| 方法名 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| add | 添加流内容 | `(str: string) => string[]` | |

## 对 feath 请求 EventSource 数据流处理

> 在 fetch 请求 EventSource 接口时，如果两次结果返回过快，会导致数据流混乱，需要对数据流进行处理。

```ts
fetch('/api/stream/sse', {
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'POST',
}).then(async res => {
  if (!res.ok) return;

  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader()
  const stream = new StreamSplit({
    onMessage(str) {
      console.log(str);
    }
  });

  while(1) {
    const { done, value } = await reader.read();
    if (done) break;
    stream.add(value);
  }
})
```
