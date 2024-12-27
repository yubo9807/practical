# 瀑布流布局

## Option

| 属性名 | 说明 | 类型 | 默认值 | 备注 |
| --- | --- | --- | --- | --- |
| el | 可操作节点 | HTMLElement | - | 该节点下必须具有子节点，不传递时可调用内置方法进行计算 |
| column | 列数 | number | 3 | - |
| rowGap | 横向间距 | number | 20 | 单位（px） |
| colGap | 纵向间距 | number | 14 | 单位（px） |

## Methods

| 方法名 | 说明 | 参数 | 备注 |
| --- | --- | --- | --- |
| compute | 计算 每一项宽度 / 定位 / 容器高度 | `(wrapWidth, heights)` | - |

## 自行计算

```ts
const wrapWidth = 1000;  // 容器宽度
const heights = [200, 300, 270, 100, 400, 100, 200, 300, 100, 140];  // 每一项的高度

const fulls = new Fulls();
const { itemWidth, positions, wrapHeight } = fulls.compute(wrapWidth, heights);
console.log(
  itemWidth,   // 每一项的宽度
  positions,   // 每一项的定位
  wrapHeight,  // 容器的高度
);
//--> 184 (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}] 540
```
