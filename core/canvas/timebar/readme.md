# 时间轴过滤

## Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| el* | 绑定元素 | `HTMLElement` | - | - |
| xAxis* | 横坐标配置 | `object` | - | - |
| series* | 数据配置 | `object` | - | - |
| width | 指定宽度 | `number` | - | - |
| height | 指定高度 | `number` | - | - |
| slider | 滑块配置 | `object` | - | - |
| isPoint | 是否显示点 | `boolean` | true | - |
| playSpeed | 播放速度 | `number` | 4 | - |
| onSliderIndexChange | 滑块内索引变化 | `(start: number, end: number) => void` | - | - |

## Enevt

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| refresh | 一般在容器大小改变后调用 | - |
| play | 播放 | fiexd 是否固定滑块大小 |
| puase | 暂停播放 | |
