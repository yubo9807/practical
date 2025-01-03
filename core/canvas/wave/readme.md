# 波浪百分比

## Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| el* | 挂载元素 | `HTMLElement` | - | - |
| percentage* | 百分比 | `number` | 0 | 取值范围：0-100 |
| radian | 波浪弧度 | `number` | 1 | - |
| color | 颜色 | `string` | #0080ff | 仅支持 16 进制 |
| size | 容器的大小 | `number \| [number, number]` | 父元素宽度 | 单位（px） |
| noTransition | 刷新时不过渡 | `boolean` | false | - |
| speed | 动画速度 | `number` | 1 | - |

## Enevt

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| refresh | 一般在容器大小改变后调用 | - |

```ts
const wait = new ChartWait()
window.addEventListener('resize', () => {
  wait.refresh();
})
```
