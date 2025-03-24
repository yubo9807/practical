# 语音文字切割

## Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| *rouseKeywords | 唤醒关键词 | `string[]` | - | - |
| endKeywords | 结束关键词 | `string[]` | - | - |
| autoEndTime | 自动结束时间 | `number \| false` | - | - |
| onMessage | 消息回调 | `(str: string, normal?: string) => void` | - | - |
| onComplete | 完整的消息回调 | `(str: string) => void` | - | - |
| onRouseStart | 唤醒开始回调 | `(str: string) => void` | - | - |
| onRouseStop | 唤醒停止回调 | `(str: string) => void` | - | - |
| onAutoStop | 自动结束回调 | `(str: string) => void` | - | - |

## Methods

| 方法名 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| start | 开始监听 | - | - |
| add | 添加流内容 | `string` | - |
| stop | 结束监听 | - | - |
